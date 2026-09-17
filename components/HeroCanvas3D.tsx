"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Shockwave state definition
interface Shockwave {
  id: number;
  x: number;
  y: number;
  time: number;
  duration: number;
}

// Deterministic star field generator for warp tunnel
function createWarpTunnelData(count: number) {
  const positions = new Float32Array(count * 3);
  let seed = 42;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < count; i++) {
    const angle = random() * Math.PI * 2;
    // Radius with distribution favoring outer cylinder
    const radius = 0.8 + Math.sqrt(random()) * 4.2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = -25 + random() * 30; // Spans from -25 to +5

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

const TOTAL_STARS = 1200;
const INITIAL_STAR_POSITIONS = createWarpTunnelData(TOTAL_STARS);

// Expanding 3D Shockwave Rings
function ShockwaveRings({ shockwaves }: { shockwaves: Shockwave[] }) {
  return (
    <group>
      {shockwaves.map((wave) => {
        const progress = wave.time / wave.duration;
        const currentRadius = progress * 4.8;
        const opacity = Math.max(0, (1 - progress) * 0.8);

        return (
          <group key={wave.id} position={[wave.x, wave.y, 0.2]}>
            {/* Primary Shockwave Ring */}
            <mesh>
              <ringGeometry args={[Math.max(0, currentRadius - 0.08), currentRadius, 64]} />
              <meshBasicMaterial
                color="#60a5fa"
                transparent
                opacity={opacity}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Secondary Outer Subtle Glow Ring */}
            <mesh>
              <ringGeometry
                args={[
                  Math.max(0, currentRadius * 0.95 - 0.04),
                  currentRadius * 0.95,
                  64,
                ]}
              />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={opacity * 0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Inner Geometric Core that reacts to mouse, scroll warp, and click
function GeometricCore({
  mouse,
  warpFactor,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  warpFactor: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // As user scrolls down and warp accelerates, core scales down into the distance
    const targetScale = Math.max(0.15, 1 - warpFactor * 0.85);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    const speedMultiplier = 1 + warpFactor * 4;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35 * speedMultiplier;
      meshRef.current.rotation.y += delta * 0.45 * speedMultiplier;

      if (mouse.current) {
        meshRef.current.rotation.x +=
          (mouse.current.y * 0.5 - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.y +=
          (mouse.current.x * 0.5 - meshRef.current.rotation.y) * 0.05;
      }
    }

    if (outerRef.current) {
      outerRef.current.rotation.x -= delta * 0.15 * speedMultiplier;
      outerRef.current.rotation.y += delta * 0.2 * speedMultiplier;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner Wireframe Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.8 + warpFactor * 1.5}
          wireframe
          transparent
          opacity={Math.max(0.2, 0.7 - warpFactor * 0.5)}
        />
      </mesh>

      {/* Outer Dodecahedron Shell */}
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#2563eb"
          emissiveIntensity={0.3 + warpFactor * 0.8}
          wireframe
          transparent
          opacity={Math.max(0.1, 0.3 - warpFactor * 0.2)}
        />
      </mesh>
    </group>
  );
}

// Warp Speed Particle Tunnel with Shockwave Displacement
function WarpTunnelStars({
  mouse,
  warpFactor,
  shockwaves,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  warpFactor: number;
  shockwaves: Shockwave[];
}) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;
    // Base speed + hyperspace warp acceleration
    const speed = (0.8 + warpFactor * 26.0) * delta;

    for (let i = 0; i < TOTAL_STARS; i++) {
      const idx = i * 3;
      // Move star forward along Z-axis toward camera
      positions[idx + 2] += speed;

      // When star passes the camera (z > 4.6), wrap it back into deep space
      if (positions[idx + 2] > 4.6) {
        positions[idx + 2] = -25;
      }

      // Check for active shockwave interaction
      for (let w = 0; w < shockwaves.length; w++) {
        const wave = shockwaves[w];
        const waveRadius = (wave.time / wave.duration) * 4.8;
        const dx = positions[idx] - wave.x;
        const dy = positions[idx + 1] - wave.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Displace particles near the wavefront
        if (Math.abs(dist - waveRadius) < 0.45) {
          const force = (1 - wave.time / wave.duration) * 0.08;
          positions[idx] += (dx / (dist || 1)) * force;
          positions[idx + 1] += (dy / (dist || 1)) * force;
        }
      }
    }

    // Gentle camera parallax influence from mouse
    if (mouse.current) {
      pointsRef.current.rotation.y +=
        (mouse.current.x * 0.2 - pointsRef.current.rotation.y) * 0.04;
      pointsRef.current.rotation.x +=
        (-mouse.current.y * 0.2 - pointsRef.current.rotation.x) * 0.04;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[INITIAL_STAR_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={warpFactor > 0.3 ? "#bfdbfe" : "#93c5fd"}
        size={warpFactor > 0.2 ? 0.045 : 0.035}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas3D() {
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [warpFactor, setWarpFactor] = useState(0);
  const [shockwaves, setShockwaves] = useState<Shockwave[]>([]);

  // Track window scroll progress for warp effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 800;
      // 0 at top of hero, 1 at full hero scroll height
      const progress = Math.min(Math.max(scrollY / (vh * 0.9), 0), 1);
      setWarpFactor(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update shockwave lifecycles
  useEffect(() => {
    if (shockwaves.length === 0) return;
    const interval = setInterval(() => {
      setShockwaves((prev) =>
        prev
          .map((wave) => ({ ...wave, time: wave.time + 0.035 }))
          .filter((wave) => wave.time < wave.duration)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [shockwaves]);

  // Track mouse coordinates
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    mouseRef.current = { x, y };
  };

  // Trigger 3D Shockwave on click/tap
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY, currentTarget } = e;
      const rect = currentTarget.getBoundingClientRect();
      // Map screen click to 3D world coordinates at z=0 (camera at z=4.5, fov=45)
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // 3D coordinates on plane z=0
      const worldX = nx * 2.6;
      const worldY = ny * 1.8;

      const newWave: Shockwave = {
        id: Date.now() + Math.random(),
        x: worldX,
        y: worldY,
        time: 0,
        duration: 0.9,
      };

      setShockwaves((prev) => [...prev.slice(-2), newWave]);
    },
    []
  );

  return (
    <div
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      className="absolute inset-0 pointer-events-auto z-0 overflow-hidden cursor-crosshair select-none"
      style={{ opacity: 0.9 }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#60a5fa" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#93c5fd" />

        <GeometricCore mouse={mouseRef} warpFactor={warpFactor} />
        <WarpTunnelStars
          mouse={mouseRef}
          warpFactor={warpFactor}
          shockwaves={shockwaves}
        />
        <ShockwaveRings shockwaves={shockwaves} />
      </Canvas>

      {/* Floating subtle hint at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-800 text-[10px] font-mono text-neutral-400 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
        <span>Click for 3D Shockwave • Scroll to Warp</span>
      </div>
    </div>
  );
}
