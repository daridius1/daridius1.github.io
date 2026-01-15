import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import 'poly-decomp';

export default function StackGame() {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const [dimensions, setDimensions] = useState(null);

    const [leftZoneCount, setLeftZoneCount] = useState(0);
    const [rightZoneCount, setRightZoneCount] = useState(0);

    // Initialize dimensions on mount
    useEffect(() => {
        const updateDimensions = () => {
            const availableWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
            const baseWidth = 800;
            // More aggressive margin use for mobile
            const width = Math.min(availableWidth - 16, baseWidth);
            const scale = width / baseWidth;

            // Make it more square-ish on mobile, but keep enough height for stacking
            // On desktop (800px width), height is 600 (0.75 ratio)
            // On mobile (350px width), let's try to keep it compact, maybe 1:1.2 or similar
            const height = Math.min(600, width * 1.3);

            // Make walls thinner on mobile to maximize play area
            const wallThickness = Math.max(20, 60 * scale);

            setDimensions({
                width,
                height,
                wallThickness,
                scale, // Store scale to resize objects
                zoneWidth: width * 0.45, // Proportional zones
                zoneHeight: scale > 0.8 ? height * 0.65 : height * 0.4 // Taller zones on desktop
            });
        };

        updateDimensions();
        // Add resize listener just in case
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (!dimensions) return;

        const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT, wallThickness: WALL_THICKNESS, zoneWidth: ZONE_WIDTH, zoneHeight: ZONE_HEIGHT } = dimensions;

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
                background: 'transparent',
                wireframes: false,
                showAngleIndicator: false
            }
        });

        // Walls (Container)
        const ground = Bodies.rectangle(CANVAS_WIDTH / 2, CANVAS_HEIGHT - WALL_THICKNESS / 2, CANVAS_WIDTH, WALL_THICKNESS, {
            isStatic: true,
            render: { fillStyle: '#1a1a1a', opacity: 1 }
        });
        const leftWall = Bodies.rectangle(0, CANVAS_HEIGHT / 2, WALL_THICKNESS, CANVAS_HEIGHT, {
            isStatic: true,
            render: { fillStyle: '#1a1a1a', opacity: 1 }
        });
        const rightWall = Bodies.rectangle(CANVAS_WIDTH, CANVAS_HEIGHT / 2, WALL_THICKNESS, CANVAS_HEIGHT, {
            isStatic: true,
            render: { fillStyle: '#1a1a1a', opacity: 1 }
        });

        Composite.add(engine.world, [ground, leftWall, rightWall]);

        // Mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Run the engine
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Custom render loop to draw walls on top
        Events.on(render, 'afterRender', () => {
            const context = render.context;
            context.fillStyle = '#1a1a1a';

            // Draw walls manually to ensure they are on top
            // Ground
            context.fillRect(0, CANVAS_HEIGHT - WALL_THICKNESS, CANVAS_WIDTH, WALL_THICKNESS);
            // Left
            context.fillRect(0, 0, WALL_THICKNESS / 2, CANVAS_HEIGHT);
            // Right
            context.fillRect(CANVAS_WIDTH - WALL_THICKNESS / 2, 0, WALL_THICKNESS / 2, CANVAS_HEIGHT);
        });

        // Counter Logic
        let frameCount = 0;
        Events.on(engine, 'afterUpdate', () => {
            frameCount++;
            if (frameCount % 10 === 0) { // Check every 10 frames
                const bodies = Composite.allBodies(engine.world);
                let lCount = 0;
                let rCount = 0;

                bodies.forEach(body => {
                    if (body.isStatic) return;

                    const { min, max } = body.bounds;

                    const inLeft = min.x >= 0 && max.x <= ZONE_WIDTH &&
                        min.y >= (CANVAS_HEIGHT - ZONE_HEIGHT);

                    if (body.label === 'taza' && inLeft) {
                        lCount++;
                    }

                    const inRight = min.x >= (CANVAS_WIDTH - ZONE_WIDTH) && max.x <= CANVAS_WIDTH &&
                        min.y >= (CANVAS_HEIGHT - ZONE_HEIGHT);

                    if (body.label === 'vaso' && inRight) {
                        rCount++;
                    }
                });

                setLeftZoneCount(lCount);
                setRightZoneCount(rCount);
            }
        });

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            Composite.clear(engine.world);
            Engine.clear(engine);
            Events.off(engine);
        };
    }, [dimensions]);

    const createCup = (x, y, scale = 1) => {
        const Bodies = Matter.Bodies;
        const Body = Matter.Body;

        // scaled dimensions
        const thickness = 6 * scale;
        const width = 90 * scale;
        const height = 80 * scale;
        const taper = 35 * scale;

        const leftWall = Bodies.rectangle(x - width / 2 + taper / 2, y, thickness, height, {
            angle: -0.25,
            render: { fillStyle: '#3b82f6' }
        });

        const rightWall = Bodies.rectangle(x + width / 2 - taper / 2, y, thickness, height, {
            angle: 0.25,
            render: { fillStyle: '#3b82f6' }
        });

        const bottom = Bodies.rectangle(x, y + height / 2 - 5 * scale, width - taper - 10 * scale, thickness, {
            render: { fillStyle: '#3b82f6' }
        });

        const cup = Body.create({
            parts: [leftWall, rightWall, bottom],
            friction: 0.5,
            restitution: 0.05,
            density: 0.01,
            inertia: Infinity,
            label: 'vaso'
        });

        return cup;
    };

    const createMug = (x, y, scale = 1) => {
        const Bodies = Matter.Bodies;
        const Body = Matter.Body;

        const thickness = 6 * scale;
        const width = 60 * scale;
        const height = 70 * scale;

        const leftWall = Bodies.rectangle(x - width / 2, y, thickness, height, {
            render: { fillStyle: '#a855f7' }
        });

        const rightWall = Bodies.rectangle(x + width / 2, y, thickness, height, {
            render: { fillStyle: '#a855f7' }
        });

        const bottom = Bodies.rectangle(x, y + height / 2 - 5 * scale, width, thickness, {
            render: { fillStyle: '#a855f7' }
        });

        // Handle
        const handleTop = Bodies.rectangle(x + width / 2 + 12 * scale, y - 15 * scale, 20 * scale, thickness, {
            render: { fillStyle: '#9333ea' }
        });
        const handleBottom = Bodies.rectangle(x + width / 2 + 12 * scale, y + 15 * scale, 20 * scale, thickness, {
            render: { fillStyle: '#9333ea' }
        });
        const handleOuter = Bodies.rectangle(x + width / 2 + 20 * scale, y, thickness, 40 * scale, {
            render: { fillStyle: '#9333ea' }
        });

        const mug = Body.create({
            parts: [leftWall, rightWall, bottom, handleTop, handleBottom, handleOuter],
            restitution: 0.05,
            friction: 0.8,
            density: 0.01,
            inertia: Infinity,
            label: 'taza'
        });

        return mug;
    };

    const spawnObject = (type) => {
        if (!engineRef.current || !dimensions) return;

        const x = dimensions.width / 2;
        const y = 80;

        let body;
        if (type === 'vaso') {
            body = createCup(x, y, dimensions.scale * 1.2); // Slightly boost scale for better visibility if needed, or keep 1.0
        } else {
            body = createMug(x, y, dimensions.scale * 1.2);
        }

        Matter.Composite.add(engineRef.current.world, body);
    };

    const clearWorld = () => {
        if (!engineRef.current) return;
        const world = engineRef.current.world;
        const bodies = Matter.Composite.allBodies(world);
        const toRemove = bodies.filter(b => !b.isStatic);
        Matter.Composite.remove(world, toRemove);
        setLeftZoneCount(0);
        setRightZoneCount(0);
    };

    if (!dimensions) {
        return <div className="text-white/50">Cargando juego...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="relative group bg-[#404040] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Zones Layer - Behind Canvas */}
                <div className="absolute inset-0 z-0 flex justify-between items-end pointer-events-none">
                    {/* Left Zone Group */}
                    <div className="flex flex-col items-center">
                        <div className="mb-4 text-white font-black uppercase text-xl sm:text-2xl tracking-tighter transform -translate-y-2">
                            {leftZoneCount} Tazas
                        </div>
                        <div
                            className="bg-purple-500/10 border-r border-t border-purple-500/20"
                            style={{ width: dimensions.zoneWidth, height: dimensions.zoneHeight }}
                        />
                    </div>

                    {/* Right Zone Group */}
                    <div className="flex flex-col items-center">
                        <div className="mb-4 text-white font-black uppercase text-xl sm:text-2xl tracking-tighter transform -translate-y-2">
                            {rightZoneCount} Vasos
                        </div>
                        <div
                            className="bg-blue-500/10 border-l border-t border-blue-500/20"
                            style={{ width: dimensions.zoneWidth, height: dimensions.zoneHeight }}
                        />
                    </div>
                </div>

                {/* Physics Canvas Layer - On Top */}
                <div
                    ref={sceneRef}
                    className="cursor-grab active:cursor-grabbing relative z-10"
                />

                {/* Top Controls Overlay */}
                <div className="absolute top-6 left-0 right-0 z-30 flex flex-col items-center gap-3">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => spawnObject('taza')}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg shadow-purple-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm sm:text-base"
                        >
                            <span className="text-xl">+</span> Taza
                        </button>
                        <button
                            onClick={() => spawnObject('vaso')}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm sm:text-base"
                        >
                            <span className="text-xl">+</span> Vaso
                        </button>
                    </div>
                    <button
                        onClick={clearWorld}
                        className="bg-white/10 hover:bg-white/20 text-white/80 text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-lg backdrop-blur-md transition-all"
                    >
                        Reiniciar
                    </button>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <span className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md">
                        Arrastra para ordenar
                    </span>
                </div>
            </div>
        </div>
    );
}

