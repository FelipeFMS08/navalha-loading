"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function makePoleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const stripeW = canvas.width / 4;
  const colors = ["#ffffff", "#ff1f2e", "#ffffff", "#1960ff"];
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(i * stripeW, 0, stripeW, canvas.height);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 3);
  return tex;
}

function BarberPole() {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const texture = useMemo(() => makePoleTexture(), []);
  const textureOffset = useRef(0);

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat || !mat.map) return;
    textureOffset.current -= delta * 0.35;
    mat.map.offset.x = textureOffset.current;
  });

  return (
    <group>
      {/* Top cap */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.12, 32]} />
        <meshStandardMaterial
          color="#d9b871"
          metalness={1}
          roughness={0.15}
        />
      </mesh>
      {/* Top sphere */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color="#d9b871"
          metalness={1}
          roughness={0.15}
        />
      </mesh>
      {/* Glass tube with stripes */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.36, 0.36, 3, 64, 1, true]} />
        <meshStandardMaterial
          ref={matRef}
          map={texture}
          metalness={0.2}
          roughness={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Glass overlay */}
      <mesh>
        <cylinderGeometry args={[0.38, 0.38, 3.02, 64, 1, true]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.18}
          roughness={0.02}
          transmission={1}
          thickness={0.5}
          clearcoat={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -1.55, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.12, 32]} />
        <meshStandardMaterial
          color="#d9b871"
          metalness={1}
          roughness={0.15}
        />
      </mesh>
      {/* Bottom sphere */}
      <mesh position={[0, -1.7, 0]} castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color="#d9b871"
          metalness={1}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

function FloatingRazor({
  position,
}: {
  position: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.7) * 0.3;
    groupRef.current.rotation.y += 0.005;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={groupRef} position={position}>
        {/* Handle */}
        <mesh castShadow>
          <boxGeometry args={[0.1, 1.1, 0.1]} />
          <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Blade */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[0.16, 0.7, 0.02]} />
          <meshStandardMaterial
            color="#e6e6e8"
            metalness={1}
            roughness={0.1}
          />
        </mesh>
        {/* Accent */}
        <mesh position={[0, 0.15, 0.055]}>
          <boxGeometry args={[0.08, 0.5, 0.01]} />
          <meshStandardMaterial
            color="#ff5b1a"
            emissive="#ff5b1a"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x += 0.002;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} position={[2.4, -1.2, -1]}>
        <icosahedronGeometry args={[0.55, 2]} />
        <MeshDistortMaterial
          color="#ff5b1a"
          emissive="#ff1f6b"
          emissiveIntensity={0.35}
          metalness={0.5}
          roughness={0.15}
          distort={0.4}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

export function BarberScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 38 }}
      shadows
      dpr={[1, 2]}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        position={[-4, 4, 3]}
        angle={0.6}
        penumbra={0.8}
        intensity={1.8}
        color="#ffe14d"
      />
      <pointLight position={[0, -3, 2]} intensity={0.6} color="#ff5b1a" />

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <group rotation={[0, 0.2, 0]}>
          <BarberPole />
        </group>
      </Float>

      <FloatingRazor position={[-2.4, 1.2, -0.5]} />
      <GlowOrb />

      <Environment preset="city" />
    </Canvas>
  );
}
