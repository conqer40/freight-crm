'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Environment, Text } from '@react-three/drei';

function CargoBox(props: any) {
    const mesh = useRef<any>(null);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // useFrame((state, delta) => (mesh.current.rotation.x += delta * 0.2));

    return (
        <Box
            {...props}
            ref={mesh}
            args={[1, 1, 1]}
            scale={active ? 1.1 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <meshStandardMaterial color={hovered ? props.hoverColor || 'hotpink' : props.color || 'orange'} />
        </Box>
    );
}

function ContainerFrame() {
    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
                <planeGeometry args={[12, 4]} />
                <meshStandardMaterial color="#334155" side={2} />
            </mesh>

            {/* Open Frame Visualization (Wireframe-ish) */}
            {/* Simplified Container Walls */}
            <mesh position={[0, 1.5, -2]} receiveShadow>
                <boxGeometry args={[12, 4, 0.1]} />
                <meshStandardMaterial color="#475569" transparent opacity={0.5} />
            </mesh>
            <mesh position={[-6, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <boxGeometry args={[4, 4, 0.1]} />
                <meshStandardMaterial color="#475569" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

export default function CargoPlanner() {
    return (
        <div className="w-full h-[500px] bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-700">
            <div className="absolute top-4 left-4 z-10 bg-slate-800/80 backdrop-blur p-4 rounded-xl border border-white/10">
                <h3 className="text-white font-bold mb-1">Cargo Tetris (Smart Load) 🧱</h3>
                <p className="text-slate-400 text-xs">AI Container Optimization v1.0</p>
                <div className="mt-4 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                        <span>Heavy Cargo (Bottom)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                        <span>Fragile (Top)</span>
                    </div>
                </div>
            </div>

            <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                <ContainerFrame />

                {/* Simulated Stacked Cargo */}
                <group position={[-4, 0, -1]}>
                    <CargoBox position={[0, 0, 0]} color="#f97316" />
                    <CargoBox position={[1.1, 0, 0]} color="#f97316" />
                    <CargoBox position={[2.2, 0, 0]} color="#f97316" />
                    <CargoBox position={[0, 1.1, 0]} color="#3b82f6" hoverColor="#60a5fa" />
                    <CargoBox position={[1.1, 1.1, 0]} color="#3b82f6" hoverColor="#60a5fa" />
                </group>

                <group position={[-4, 0, 0.5]}>
                    <CargoBox position={[0, 0, 0]} color="#10b981" />
                    <CargoBox position={[1.1, 0, 0]} color="#10b981" />
                </group>

                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
