import React, { useEffect, useState, useRef, useMemo } from 'react';
import { REGION_MAPPING } from '../../data/elecciones/index.js';

const interpolateColor = (color1, color2, factor) => {
    const f = Math.max(0, Math.min(1, factor));
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    const r = Math.round(r1 + (r2 - r1) * f);
    const g = Math.round(g1 + (g2 - g1) * f);
    const b = Math.round(b1 + (b2 - b1) * f);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const MapSVG = React.memo(({ svgContent, regionColors, onRegionHover, onRegionLeave }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!svgContent || !containerRef.current) return;

        // Apply colors to paths
        Object.entries(regionColors).forEach(([id, color]) => {
            const el = containerRef.current.querySelector(`#${id}`);
            if (el) el.style.fill = color;
        });

        const paths = containerRef.current.querySelectorAll('path');
        const handleEnter = (e) => onRegionHover(e.target.id);
        const handleLeave = () => onRegionLeave();
        const handleClick = (e) => {
            e.stopPropagation();
            onRegionHover(e.target.id);
        };

        paths.forEach(p => {
            p.addEventListener('mouseenter', handleEnter);
            p.addEventListener('mouseleave', handleLeave);
            p.addEventListener('click', handleClick);
        });

        return () => {
            paths.forEach(p => {
                p.removeEventListener('mouseenter', handleEnter);
                p.removeEventListener('mouseleave', handleLeave);
                p.removeEventListener('click', handleClick);
            });
        };
    }, [svgContent, regionColors, onRegionHover, onRegionLeave]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex justify-center items-center scale-[0.98] map-container"
            dangerouslySetInnerHTML={{ __html: svgContent || '...' }}
        />
    );
});

export default function EleccionesMap({ mapSrc, results }) {
    const [isMobile, setIsMobile] = useState(false);
    const [svgContent, setSvgContent] = useState(null);
    const [tooltipContent, setTooltipContent] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [hoveredRegionId, setHoveredRegionId] = useState(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const svgIdToDataId = useMemo(() =>
        Object.entries(REGION_MAPPING).reduce((acc, [k, v]) => { acc[v.id] = k; return acc; }, {}), []);

    useEffect(() => {
        if (mapSrc) fetch(mapSrc).then(res => res.text()).then(text => {
            setSvgContent(text.replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '').replace(/style="[^"]*"/, ''));
        });
    }, [mapSrc]);

    const regionColors = useMemo(() => {
        const colors = {};
        const NEUTRAL_COLOR = "#f3f4f6";
        const RED_COLOR = "#dc2626";
        const BLUE_COLOR = "#2563eb";
        const THRESHOLD = 0.30;

        Object.entries(results).forEach(([id, { redVotes, blueVotes, total }]) => {
            const teamTotal = redVotes + blueVotes;
            const svgId = REGION_MAPPING[id]?.id;
            if (!svgId) return;
            if (teamTotal === 0) { colors[svgId] = NEUTRAL_COLOR; return; }
            const diff = Math.abs(redVotes - blueVotes);
            const strength = Math.min((diff / teamTotal) / THRESHOLD, 1.0);
            colors[svgId] = redVotes > blueVotes ? interpolateColor(NEUTRAL_COLOR, RED_COLOR, strength) :
                blueVotes > redVotes ? interpolateColor(NEUTRAL_COLOR, BLUE_COLOR, strength) : NEUTRAL_COLOR;
        });
        return colors;
    }, [results]);

    const handleRegionHover = React.useCallback((id) => {
        const dataId = svgIdToDataId[id];
        if (dataId) setHoveredRegionId(dataId);
    }, [svgIdToDataId]);

    const handleRegionLeave = React.useCallback(() => {
        if (!isMobile) {
            setHoveredRegionId(null);
            setTooltipContent(null);
        }
    }, [isMobile]);

    useEffect(() => {
        if (hoveredRegionId && results[hoveredRegionId]) {
            const { redVotes, blueVotes, total } = results[hoveredRegionId];
            setTooltipContent({
                name: REGION_MAPPING[hoveredRegionId]?.name || "Desconocida",
                redP: total ? ((redVotes / total) * 100).toFixed(1) : "0.0",
                blueP: total ? ((blueVotes / total) * 100).toFixed(1) : "0.0",
                redVotes,
                blueVotes,
                total,
                winner: redVotes > blueVotes ? 'Rojo' : blueVotes > redVotes ? 'Azul' : 'Empate'
            });
        }
    }, [hoveredRegionId, results]);

    return (
        <div className="relative flex items-center justify-center overflow-hidden h-full grow min-w-0"
            onMouseMove={e => !isMobile && setTooltipPos({ x: e.clientX, y: e.clientY })}
            onClick={() => isMobile && setHoveredRegionId(null)}>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <MapSVG
                svgContent={svgContent}
                regionColors={regionColors}
                onRegionHover={handleRegionHover}
                onRegionLeave={handleRegionLeave}
            />

            {/* Premium Tooltip */}
            {tooltipContent && hoveredRegionId && (
                <div
                    style={isMobile ? {
                        top: '1rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'calc(100% - 2rem)',
                        maxWidth: '320px'
                    } : {
                        top: tooltipPos.y + 20,
                        left: tooltipPos.x + 20
                    }}
                    className="fixed z-50 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl p-3 md:p-4 border border-base-200 pointer-events-none flex flex-col gap-2 md:gap-3 transition-all duration-200 animate-in fade-in zoom-in-95"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                        <h3 className="text-[11px] md:text-xs font-black text-gray-800 leading-tight">
                            {tooltipContent.name}
                        </h3>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                        <div className="flex flex-col gap-0.5 md:gap-1">
                            <div className="flex justify-between text-[10px] md:text-[11px] font-bold">
                                <span className="text-red-600">Rojo ({tooltipContent.redP}%)</span>
                                <span className="text-gray-500 font-medium">{tooltipContent.redVotes.toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${tooltipContent.redP}%` }}></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5 md:gap-1">
                            <div className="flex justify-between text-[10px] md:text-[11px] font-bold">
                                <span className="text-blue-600">Azul ({tooltipContent.blueP}%)</span>
                                <span className="text-gray-500 font-medium">{tooltipContent.blueVotes.toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${tooltipContent.blueP}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="text-[8px] md:text-[9px] text-gray-400 font-medium text-center">
                        Total: <span className="text-gray-600 font-bold">{tooltipContent.total.toLocaleString()} v.</span>
                    </div>
                </div>
            )}

            <style>{`
                .map-container svg { height: 100%; width: 100%; max-height: 94vh; object-fit: contain; }
                .map-chile { stroke: #fff; stroke-width: 0.4px; transition: fill 0.4s ease; cursor: pointer; }
                .map-chile:hover { stroke: #000; stroke-width: 1px; brightness: 0.98; z-index: 10; }
            `}</style>
        </div>
    );
}
