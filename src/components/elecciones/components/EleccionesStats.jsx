const PieChart = ({ data, title, centerText, centerColor = "#374151" }) => {
    const total = data.reduce((acc, current) => acc + current.value, 0);
    const radius = 15.91549430918954; // Magic radius for a 100-unit perimeter

    let cumulativeValue = 0;

    return (
        <div className="flex flex-col items-center gap-1.5 md:gap-3 p-2 md:p-4 bg-white/60 backdrop-blur-md rounded-xl border border-white/20 shadow-lg group transition-all w-full min-w-[120px] md:min-w-[170px]">
            <h4 className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest text-center leading-none px-1">
                {title}
            </h4>
            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                <svg viewBox="0 0 42 42" className="transform -rotate-90 drop-shadow-sm w-full h-full">
                    <circle cx="21" cy="21" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="10"></circle>
                    {data.map((slice, index) => {
                        if (total === 0) return null;
                        const percentage = (slice.value / total) * 100;
                        const dashArray = `${percentage} ${100 - percentage}`;
                        const dashOffset = -cumulativeValue;
                        cumulativeValue += percentage;

                        return (
                            <circle
                                key={index}
                                cx="21"
                                cy="21"
                                r={radius}
                                fill="transparent"
                                stroke={slice.color}
                                strokeWidth="10"
                                strokeDasharray={dashArray}
                                strokeDashoffset={dashOffset}
                                className="transition-all duration-700 ease-in-out"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[72%] h-[72%] bg-white/95 rounded-full shadow-sm border border-white/50 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-[8px] md:text-[11px] font-black tabular-nums" style={{ color: centerColor }}>
                            {centerText}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-1 md:gap-2 w-full mt-1">
                {data.filter(s => s.value > 0).map((s, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 px-1">
                        <div className="flex items-center gap-1 md:gap-2 overflow-hidden">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                            <span className="text-[7px] md:text-[9px] font-extrabold text-slate-700 truncate">{s.label}</span>
                        </div>
                        <span className="text-[7px] md:text-[9px] font-black text-slate-600 tabular-nums whitespace-nowrap">
                            {total > 0 ? ((s.value / total) * 100).toFixed(0) : 0}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function EleccionesStats({ summary }) {
    const teamTotalVotes = summary.redVotes + summary.blueVotes;
    const neutralVotes = Math.max(0, summary.totalVotes - teamTotalVotes);

    // Logic for Chart 1: Bipolarity (R vs A)
    const margin1 = teamTotalVotes > 0
        ? (Math.abs(summary.redVotes - summary.blueVotes) / teamTotalVotes * 100).toFixed(1)
        : "0.0";
    const color1 = summary.redVotes > summary.blueVotes ? '#dc2626' : (summary.blueVotes > summary.redVotes ? '#2563eb' : '#64748b');

    // Logic for Chart 2: Total Weight (Margin relative to total election)
    const margin2 = summary.totalVotes > 0
        ? (Math.abs(summary.redVotes - summary.blueVotes) / summary.totalVotes * 100).toFixed(1)
        : "0.0";
    const color2 = summary.redVotes > summary.blueVotes ? '#dc2626' : (summary.blueVotes > summary.redVotes ? '#2563eb' : '#64748b');

    // Logic for Chart 3: Regions logic follows below after chart3Data definition

    const chart1Data = [
        { label: 'Rojo', value: summary.redVotes, color: '#dc2626' },
        { label: 'Azul', value: summary.blueVotes, color: '#2563eb' }
    ];

    const chart2Data = [
        { label: 'Rojo', value: summary.redVotes, color: '#dc2626' },
        { label: 'Azul', value: summary.blueVotes, color: '#2563eb' },
        { label: 'Otras / Indep.', value: neutralVotes, color: '#94a3b8' }
    ];

    const chart3Data = [
        { label: 'Rojo', value: summary.redRegions, color: '#dc2626' },
        { label: 'Azul', value: summary.blueRegions, color: '#2563eb' },
        { label: 'Neutral / Empate', value: summary.neutralRegions, color: '#94a3b8' },
        { label: 'Sin datos', value: summary.missingRegions, color: '#000000' }
    ];

    const totalReg = summary.redRegions + summary.blueRegions + summary.neutralRegions + summary.missingRegions;
    const margin3 = totalReg > 0
        ? (Math.abs(summary.redRegions - summary.blueRegions) / totalReg * 100).toFixed(1)
        : "0.0";
    const color3 = summary.redRegions > summary.blueRegions ? '#dc2626' : (summary.blueRegions > summary.redRegions ? '#2563eb' : '#94a3b8');

    return (
        <div className="flex flex-col gap-1 md:gap-4 pointer-events-auto z-30 shrink-0 py-4 max-h-full overflow-y-auto scrollbar-hide">
            <PieChart
                title="Bipolaridad (R vs A)"
                data={teamTotalVotes > 0 ? chart1Data : [{ value: 1, color: '#f1f5f9' }]}
                centerText={`+${margin1}%`}
                centerColor={color1}
            />
            <PieChart
                title="Peso en la Elección"
                data={summary.totalVotes > 0 ? chart2Data : [{ value: 1, color: '#f1f5f9' }]}
                centerText={`+${margin2}%`}
                centerColor={color2}
            />
            <PieChart
                title="Regiones Ganadas"
                data={totalReg > 0 ? chart3Data : [{ value: 1, color: '#f1f5f9' }]}
                centerText={`+${margin3}%`}
                centerColor={color3}
            />
        </div>
    );
}
