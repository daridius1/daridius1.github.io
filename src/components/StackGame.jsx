import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import 'poly-decomp';

export default function StackGame() {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const [mode, setMode] = useState('vasos'); // 'vasos' or 'tazas'
    const [count, setCount] = useState(0);

    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 600;
    const WALL_THICKNESS = 60;
    const ZONE_WIDTH = 340; // Wider
    const ZONE_HEIGHT = 360; // Taller

    const [leftZoneCount, setLeftZoneCount] = useState(0);
    const [rightZoneCount, setRightZoneCount] = useState(0);

    useEffect(() => {
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
        const ground = Bodies.rectangle(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 30, CANVAS_WIDTH, WALL_THICKNESS, {
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
            context.fillRect(0, 0, WALL_THICKNESS / 2, CANVAS_HEIGHT); // Half width because center is 0
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

                    // Left Zone (0 to ZONE_WIDTH) - Only 'taza'
                    // Check full containment: min and max x inside width, min y inside height range
                    const inLeft = min.x >= 0 && max.x <= ZONE_WIDTH &&
                        min.y >= (CANVAS_HEIGHT - ZONE_HEIGHT);

                    if (body.label === 'taza' && inLeft) {
                        lCount++;
                    }

                    // Right Zone (CANVAS_WIDTH - ZONE_WIDTH to CANVAS_WIDTH) - Only 'vaso'
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
    }, []);

    const createCup = (x, y) => {
        const Bodies = Matter.Bodies;
        const Body = Matter.Body;

        // Vaso térmico: Even Wider + High Taper
        const thickness = 6;
        const width = 90;   // Even Wider
        const height = 80;
        const taper = 35;   // Taper to keep the bottom reasonable

        const leftWall = Bodies.rectangle(x - width / 2 + taper / 2, y, thickness, height, {
            angle: -0.25, // More open angle
            render: { fillStyle: '#3b82f6' }
        });

        const rightWall = Bodies.rectangle(x + width / 2 - taper / 2, y, thickness, height, {
            angle: 0.25, // More open angle
            render: { fillStyle: '#3b82f6' }
        });

        const bottom = Bodies.rectangle(x, y + height / 2 - 5, width - taper - 10, thickness, {
            render: { fillStyle: '#3b82f6' }
        });

        const cup = Body.create({
            parts: [leftWall, rightWall, bottom],
            friction: 0.5,
            restitution: 0.05,
            density: 0.01,
            inertia: Infinity, // PREVENTS ROTATION
            label: 'vaso'
        });

        return cup;
    };

    const createMug = (x, y) => {
        const Bodies = Matter.Bodies;
        const Body = Matter.Body;

        // Taza: Hollow Cylinder (Parallel walls) + Loop Handle
        const thickness = 6;
        const width = 60;
        const height = 70;

        // Walls (Vertical, parallel)
        const leftWall = Bodies.rectangle(x - width / 2, y, thickness, height, {
            render: { fillStyle: '#a855f7' }
        });

        const rightWall = Bodies.rectangle(x + width / 2, y, thickness, height, {
            render: { fillStyle: '#a855f7' }
        });

        const bottom = Bodies.rectangle(x, y + height / 2 - 5, width, thickness, {
            render: { fillStyle: '#a855f7' }
        });

        // Handle (C-shape attached to right wall)
        // Top strut
        const handleTop = Bodies.rectangle(x + width / 2 + 12, y - 15, 20, thickness, {
            render: { fillStyle: '#9333ea' }
        });
        // Bottom strut
        const handleBottom = Bodies.rectangle(x + width / 2 + 12, y + 15, 20, thickness, {
            render: { fillStyle: '#9333ea' }
        });
        // Outer vertical part
        const handleOuter = Bodies.rectangle(x + width / 2 + 20, y, thickness, 40, {
            render: { fillStyle: '#9333ea' }
        });

        const mug = Body.create({
            parts: [leftWall, rightWall, bottom, handleTop, handleBottom, handleOuter],
            restitution: 0.05,
            friction: 0.8,
            density: 0.01,
            inertia: Infinity, // PREVENTS ROTATION
            label: 'taza'
        });

        return mug;
    };

    const spawnObject = (type) => {
        if (!engineRef.current) return;

        const x = CANVAS_WIDTH / 2;
        const y = 80;

        let body;
        if (type === 'vaso') {
            body = createCup(x, y);
        } else {
            body = createMug(x, y);
        }

        Matter.Composite.add(engineRef.current.world, body);
        setCount(c => c + 1);
    };

    const clearWorld = () => {
        if (!engineRef.current) return;
        const world = engineRef.current.world;
        const bodies = Matter.Composite.allBodies(world);
        // Remove only dynamic bodies (keep walls)
        const toRemove = bodies.filter(b => !b.isStatic);
        Matter.Composite.remove(world, toRemove);
        setCount(0);
        setLeftZoneCount(0);
        setRightZoneCount(0);
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="relative group bg-[#404040] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Zones Layer - Behind Canvas */}
                <div className="absolute inset-0 z-0 flex justify-between items-end pointer-events-none">
                    {/* Left Zone Group */}
                    <div className="flex flex-col items-center">
                        <div className="mb-4 text-white font-black uppercase text-2xl tracking-tighter transform -translate-y-2">
                            {leftZoneCount} Tazas
                        </div>
                        <div
                            className="bg-purple-500/10 border-r border-t border-purple-500/20"
                            style={{ width: ZONE_WIDTH, height: ZONE_HEIGHT }}
                        />
                    </div>

                    {/* Right Zone Group */}
                    <div className="flex flex-col items-center">
                        <div className="mb-4 text-white font-black uppercase text-2xl tracking-tighter transform -translate-y-2">
                            {rightZoneCount} Vasos
                        </div>
                        <div
                            className="bg-blue-500/10 border-l border-t border-blue-500/20"
                            style={{ width: ZONE_WIDTH, height: ZONE_HEIGHT }}
                        />
                    </div>
                </div>

                {/* Physics Canvas Layer - On Top */}
                <div
                    ref={sceneRef}
                    className="cursor-grab active:cursor-grabbing relative z-10"
                />

                {/* Top Controls Overlay */}
                <div className="absolute top-6 left-0 right-0 z-30 flex justify-center gap-4">
                    <button
                        onClick={() => spawnObject('taza')}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <span className="text-xl">+</span> Taza
                    </button>
                    <button
                        onClick={() => spawnObject('vaso')}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <span className="text-xl">+</span> Vaso
                    </button>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <span className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md">
                        Arrastra para ordenar
                    </span>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={clearWorld}
                    className="text-white/30 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
                >
                    Limpiar Todo
                </button>
            </div>

            <p className="text-white/50 text-sm max-w-lg text-center">
                Mira la diferencia: los vasos se apilan perfectamente mientras las tazas colapsan en el caos.
            </p>
        </div>
    );
}
