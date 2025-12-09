// src/components/hero/PekkaCanvas.tsx
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function PekkaModel() {
  const groupRef = useRef<any>(null);
  const { scene } = useGLTF("/models/pekka.glb");

  const baseY = 0.1; // vertical baseline

  // 🫁 Breathing idle animation only
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = baseY + Math.sin(t * 1.4) * 0.08;
  });

  return (
    <group
      ref={groupRef}
      position={[0, baseY, 0]}
      rotation={[-0.3, 0, 0]}   // 👈 tilt slightly upward
      scale={[1.3, 1.3, 1.3]}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function PekkaCanvas() {
  return (
    <div className="w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px]">
      <Canvas
        camera={{ position: [0, 1.4, 4], fov: 40 }}
        gl={{ toneMappingExposure: 1.6 }}
      >
        {/* Lights */}
        <ambientLight intensity={1.6} />
        <directionalLight position={[0, 2, 5]} intensity={3} />
        <directionalLight position={[3, 2, -2]} intensity={1.6} />
        <directionalLight position={[-3, 2, 2]} intensity={1.4} />

        <PekkaModel />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/pekka.glb");
