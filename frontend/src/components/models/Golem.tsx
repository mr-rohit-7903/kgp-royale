// src/components/hero/GolemCanvas.tsx
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function GolemModel() {
  const groupRef = useRef<any>(null);
  const { scene } = useGLTF("/models/golem.glb");

  const baseY = 0.1;
  const [hovered, setHovered] = useState(false);

  // 🫁 Idle + hover rotation logic
  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // idle breathing
    groupRef.current.position.y = baseY + Math.sin(t * 1.4) * 0.08;

    // horizontal rotation range
    const MIN_ROT = -0.3;
    const MAX_ROT = 0.3;

    if (hovered) {
      // Slight rotation based on mouse X position
      const mouseX = state.pointer.x; // range [-1, 1]
      const targetRot = mouseX * 0.25; // rotation strength
      groupRef.current.rotation.y =
        Math.max(MIN_ROT, Math.min(MAX_ROT, targetRot));
    } else {
      // Return to center smoothly when not hovered
      groupRef.current.rotation.y *= 0.9;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, baseY, 0]}
      rotation={[-0.3, 0, 0]}
      scale={[1.3, 1.3, 1.3]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function GolemCanvas() {
  return (
    <div className="w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px]">
      <Canvas
        camera={{ position: [0, 1.4, 4], fov: 40 }}
        gl={{ toneMappingExposure: 1.6 }}
      >
        {/* Lights */}
        <ambientLight intensity={1.6} />
        <directionalLight position={[0, 2, 5]} intensity={0.6} />
        <directionalLight position={[3, 2, -2]} intensity={0.2} />
        <directionalLight position={[-3, 2, 2]} intensity={1.3} />

        <GolemModel />

        {/* Disable horizontal rotation completely */}
        <OrbitControls
          enableZoom={false}
          enablePan={false} // ❗ important
          minPolarAngle={Math.PI / 2.5}     // lock vertical rotation
          maxPolarAngle={Math.PI / 2}     // lock vertical rotation
          enableDamping={true}            // smoother rotation, prevents sticking
          dampingFactor={0.05}
          rotateSpeed={1.2}  
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/golem.glb");
