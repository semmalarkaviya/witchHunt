import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, Suspense } from "react";
import * as THREE from "three";

function HolographicBrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.15;
      wireRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.35;
      coreRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.08} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 20, 20]} />
        <meshBasicMaterial color="#9D4EDD" transparent opacity={0.3} />
      </mesh>
      <pointLight color="#00D4FF" intensity={2} distance={10} />
      <pointLight color="#9D4EDD" intensity={1.5} distance={8} position={[2, 2, 0]} />
    </group>
  );
}

function OrbitingCubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
    }
  });

  const cubes = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3;
      return {
        position: [Math.cos(angle) * radius, Math.sin(i * 0.5) * 0.5, Math.sin(angle) * radius] as [number, number, number],
        color: i % 2 === 0 ? "#00D4FF" : "#9D4EDD",
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color={cube.color} wireframe transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitingCards() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = -t * 0.22;
      groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.1;
    }
  });

  const cards = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const angle = (i / 4) * Math.PI * 2;
      return {
        position: [Math.cos(angle) * 4.2, Math.sin(angle * 2) * 0.35, Math.sin(angle) * 4.2] as [number, number, number],
        rotation: [0.25, angle, 0.12] as [number, number, number],
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {cards.map((card, i) => (
        <mesh key={i} position={card.position} rotation={card.rotation}>
          <boxGeometry args={[0.85, 0.55, 0.03]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#00D4FF" : "#9D4EDD"} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 900;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00D4FF" size={0.03} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

function PurpleParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 600;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#9D4EDD" size={0.025} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <HolographicBrain />
      <OrbitingCubes />
      <OrbitingCards />
      <Particles />
      <PurpleParticles />
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0A0F2E, #1a1040)" }}>
      <div className="text-primary animate-glow-pulse text-lg font-display">Loading...</div>
    </div>
  );
}

export default function Background3D() {
  const [ready, setReady] = useState(false);

  return (
    <div className="fixed inset-0 z-0" style={{ background: "linear-gradient(135deg, #0A0F2E, #1a1040)" }}>
      {!ready && <LoadingScreen />}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        onCreated={() => setReady(true)}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.5s" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
