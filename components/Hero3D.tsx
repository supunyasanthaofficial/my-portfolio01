"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create floating geometries
    const geometries = [
      new THREE.IcosahedronGeometry(2, 4),
      new THREE.OctahedronGeometry(2),
      new THREE.TorusGeometry(2, 0.8, 16, 100),
    ];

    const materials = [
      new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        emissive: 0x1e40af,
        wireframe: false,
        shininess: 100,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xa855f7,
        emissive: 0x6d28d9,
        wireframe: false,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x06b6d4,
        emissive: 0x0e7490,
        wireframe: false,
      }),
    ];

    const meshes: THREE.Mesh[] = [];

    geometries.forEach((geo, i) => {
      const mesh = new THREE.Mesh(geo, materials[i]);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      scene.add(mesh);
      meshes.push(mesh);
    });

    meshesRef.current = meshes;

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation loop
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      meshesRef.current.forEach((mesh, i) => {
        mesh.rotation.x += 0.002 + i * 0.0005;
        mesh.rotation.y += 0.003 + i * 0.0008;
        mesh.position.y += Math.sin(Date.now() * 0.0005 + i) * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      geometries.forEach((geo) => geo.dispose());
      materials.forEach((mat) => mat.dispose());
      rendererRef.current?.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}