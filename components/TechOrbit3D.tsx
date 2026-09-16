"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export interface TechItem {
  name: string;
  category: "Mobile" | "Web" | "Language" | "Database" | "Design" | "Video" | "Creative";
  level: string;
  color: string;
  iconText: string;
}

export const TECH_ITEMS: TechItem[] = [
  { name: "Flutter", category: "Mobile", level: "65%", color: "#0284c7", iconText: "FL" },
  { name: "React Native", category: "Mobile", level: "60%", color: "#38bdf8", iconText: "RN" },
  { name: "Next.js / React", category: "Web", level: "75%", color: "#60a5fa", iconText: "NX" },
  { name: "TypeScript", category: "Language", level: "68%", color: "#3b82f6", iconText: "TS" },
  { name: "Tailwind CSS", category: "Design", level: "95%", color: "#06b6d4", iconText: "TW" },
  { name: "Node.js", category: "Web", level: "70%", color: "#22c55e", iconText: "JS" },
  { name: "Firebase / Supabase", category: "Database", level: "65%", color: "#f59e0b", iconText: "DB" },
  { name: "DaVinci Resolve", category: "Video", level: "62%", color: "#a855f7", iconText: "DR" },
  { name: "Three.js / 3D", category: "Creative", level: "60%", color: "#ec4899", iconText: "3D" },
  { name: "Framer Motion", category: "Design", level: "80%", color: "#f43f5e", iconText: "FM" },
  { name: "Git & GitHub", category: "Language", level: "85%", color: "#e11d48", iconText: "GIT" },
  { name: "C# / Python", category: "Language", level: "65%", color: "#8b5cf6", iconText: "DEV" },
];

// Helper to calculate coordinates on a Fibonacci sphere
function getSphereCoordinates(index: number, total: number, radius: number): [number, number, number] {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  const x = radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(phi);
  return [x, y, z];
}

// Single floating 3D tech badge
function TechNode({
  item,
  position,
  onSelect,
  isSelected,
}: {
  item: TechItem;
  position: [number, number, number];
  onSelect: (item: TechItem) => void;
  isSelected: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* 3D Anchor sphere */}
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={item.color}
          emissive={item.color}
          emissiveIntensity={hovered || isSelected ? 2.5 : 1}
        />
      </mesh>

      {/* Interactive HTML Billboard Badge */}
      <Html
        distanceFactor={11}
        center
        style={{
          transition: "all 0.25s ease-out",
          transform: hovered || isSelected ? "scale(1.15)" : "scale(1)",
          pointerEvents: "auto",
        }}
      >
        <button
          type="button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onSelect(item)}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border transition-all cursor-pointer whitespace-nowrap select-none shadow-xl ${
            isSelected
              ? "bg-blue-600/40 border-blue-400 text-white shadow-blue-500/40 ring-2 ring-blue-500/50"
              : hovered
              ? "bg-neutral-900/90 border-blue-500/70 text-white shadow-blue-500/20"
              : "bg-neutral-950/75 border-neutral-800 text-neutral-300 hover:border-neutral-700"
          }`}
          style={{
            borderColor: hovered || isSelected ? item.color : undefined,
          }}
        >
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black font-mono shrink-0 shadow"
            style={{
              backgroundColor: `${item.color}33`,
              color: item.color,
              border: `1px solid ${item.color}66`,
            }}
          >
            {item.iconText}
          </span>
          <span className="text-xs font-semibold tracking-tight">{item.name}</span>
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ml-0.5"
            style={{
              backgroundColor: `${item.color}22`,
              color: item.color,
            }}
          >
            {item.level}
          </span>
        </button>
      </Html>
    </group>
  );
}

// Center Glowing Core & Orbital Rings
function OrbitalCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.25;
      ringRef1.current.rotation.x += delta * 0.15;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.2;
      ringRef2.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <group>
      {/* Central Holographic Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.8, 0.012, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.35} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// Generate star field positions deterministically outside component
function createStaticStarPositions(count: number): Float32Array {
  const coords = new Float32Array(count * 3);
  let seed = 73;
  for (let i = 0; i < count * 3; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    coords[i] = (rnd - 0.5) * 14;
  }
  return coords;
}

const STATIC_STAR_POSITIONS = createStaticStarPositions(400);

// Background Star Particle Field
function TechStars() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[STATIC_STAR_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#93c5fd"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D Orbit Scene
export default function TechOrbit3D({
  onSelectSkill,
  selectedSkill,
  activeFilter,
}: {
  onSelectSkill: (item: TechItem) => void;
  selectedSkill: TechItem | null;
  activeFilter: string;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return TECH_ITEMS;
    return TECH_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const nodes = useMemo(() => {
    return filteredItems.map((item, idx) => {
      const position = getSphereCoordinates(idx, filteredItems.length, 3.2);
      return { item, position };
    });
  }, [filteredItems]);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden bg-neutral-950/70 border border-neutral-800 shadow-2xl">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#60a5fa" />

        <OrbitalCore />
        <TechStars />

        {nodes.map(({ item, position }) => (
          <TechNode
            key={item.name}
            item={item}
            position={position}
            onSelect={onSelectSkill}
            isSelected={selectedSkill?.name === item.name}
          />
        ))}

        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.8}
          rotateSpeed={0.6}
          dampingFactor={0.06}
        />
      </Canvas>

      {/* Floating Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-700/60 backdrop-blur-md text-[11px] font-mono text-neutral-400">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span>Click & drag to rotate 3D orbit</span>
      </div>
    </div>
  );
}
