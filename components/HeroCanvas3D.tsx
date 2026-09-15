"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate points on a 3D sphere surface with slight perturbation
function generateSphereParticles(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = Math.random() * Math.PI * 2;
    // Add subtle jitter to radius for depth
    const r = radius + (Math.random() - 0.5) * 0.4;

    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

// Inner rotating wireframe geometric mesh with glowing lights
function GeometricCore({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35;
      meshRef.current.rotation.y += delta * 0.45;

      // Mouse influence
      if (mouse.current) {
        meshRef.current.rotation.x += (mouse.current.y * 0.5 - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.y += (mouse.current.x * 0.5 - meshRef.current.rotation.y) * 0.05;
      }
    }

    if (outerRef.current) {
      outerRef.current.rotation.x -= delta * 0.15;
      outerRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
    
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#2563eb"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

// Surrounding Particle Field
function ParticleCloud({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleData = useMemo(() => generateSphereParticles(900, 2.4), []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x += delta * 0.04;

      if (mouse.current) {
        pointsRef.current.rotation.y += (mouse.current.x * 0.3 - pointsRef.current.rotation.y) * 0.03;
        pointsRef.current.rotation.x += (-mouse.current.y * 0.3 - pointsRef.current.rotation.x) * 0.03;
      }
    }
  });

  return (
    <Points ref={pointsRef} positions={particleData} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#93c5fd"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// Main 3D Canvas Scene
export default function HeroCanvas3D() {
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    mouseRef.current = { x, y };
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="absolute inset-0 pointer-events-auto z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#60a5fa" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#93c5fd" />

        <GeometricCore mouse={mouseRef} />
        <ParticleCloud mouse={mouseRef} />
      </Canvas>
    </div>
  );
}
