"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
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
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    t.current += delta;
    groupRef.current.rotation.z = Math.sin(t.current * 0.7) * 0.3;
    groupRef.current.rotation.y += delta * 0.3;
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
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x += delta * 0.12;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} position={[4.2, -1.8, -1]}>
        <icosahedronGeometry args={[0.6, 2]} />
        <MeshDistortMaterial
          color="#ff5b1a"
          emissive="#ff1f6b"
          emissiveIntensity={0.55}
          metalness={0.5}
          roughness={0.15}
          distort={0.4}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

function Comb() {
  const groupRef = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    t.current += delta;
    groupRef.current.rotation.z = Math.cos(t.current * 0.55) * 0.35;
    groupRef.current.rotation.x = Math.sin(t.current * 0.4) * 0.15;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.9}>
      <group ref={groupRef} position={[-2.8, -1.4, 0.2]}>
        {/* Spine */}
        <mesh castShadow>
          <boxGeometry args={[1.3, 0.12, 0.04]} />
          <meshStandardMaterial
            color="#111"
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
        {/* Teeth */}
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={i} position={[-0.6 + i * 0.085, -0.18, 0]} castShadow>
            <boxGeometry args={[0.03, 0.26, 0.04]} />
            <meshStandardMaterial
              color="#1a1a1f"
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        ))}
        {/* Accent strip */}
        <mesh position={[0, 0.08, 0.03]}>
          <boxGeometry args={[1.1, 0.02, 0.005]} />
          <meshStandardMaterial
            color="#ffe14d"
            emissive="#ffe14d"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

function AutoRotate({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    t.current += delta;
    ref.current.rotation.y = Math.sin(t.current * 0.15) * 0.08;
  });
  return <group ref={ref}>{children}</group>;
}

export function BarberScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      dpr={[1, 2]}
      className="!absolute inset-0"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 6, 4]} intensity={2.6} />
      <spotLight
        position={[-4, 4, 3]}
        angle={0.7}
        penumbra={0.9}
        intensity={2.6}
        color="#ffe14d"
      />
      <pointLight position={[2, -2, 2]} intensity={1.4} color="#ff5b1a" />
      <pointLight position={[-3, -1, 2]} intensity={0.8} color="#1960ff" />

      <AutoRotate>
        {/* Pole offset to the right so it doesn't clash with headline */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={[2.2, -0.1, 0]} rotation={[0, 0.2, 0]}>
            <BarberPole />
          </group>
        </Float>

        <FloatingRazor position={[-1.4, 1.8, -0.5]} />
        <Comb />
        <GlowOrb />

        {/* Ambient sparks filling the scene */}
        <Sparkles
          count={120}
          scale={[10, 6, 4]}
          size={2.6}
          speed={0.45}
          color="#ffe14d"
          opacity={0.9}
        />
        <Sparkles
          count={40}
          scale={[8, 5, 3]}
          size={4}
          speed={0.25}
          color="#ff5b1a"
          opacity={0.7}
          position={[0, -0.4, 0.5]}
        />
      </AutoRotate>

      <Environment preset="city" />
    </Canvas>
  );
}
