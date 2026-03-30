"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AvengersLogo } from "@/components/hero/avengers-logo";

export function AvengersHeroCanvas() {
  const modelPath = "/models/avengers-logo.glb";
  const [hasModel, setHasModel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let active = true;

    const probeModel = async () => {
      try {
        const response = await fetch(modelPath, { method: "HEAD" });
        if (active) {
          setHasModel(response.ok);
        }
      } catch {
        if (active) {
          setHasModel(false);
        }
      }
    };

    probeModel();
    return () => {
      active = false;
    };
  }, [modelPath]);

  return (
    <div
      data-cursor="hover"
      className="relative h-[380px] w-full overflow-hidden border-4 border-black bg-[#040404] md:h-[540px]"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setPointer({ x: 0, y: 0 });
      }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const normalizedX = (event.clientX - bounds.left) / bounds.width;
        const normalizedY = (event.clientY - bounds.top) / bounds.height;
        setPointer({
          x: (normalizedX - 0.5) * 2,
          y: (normalizedY - 0.5) * 2,
        });
      }}
    >
      <Canvas camera={{ position: [0, 0.8, 4], fov: 52 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.2} />
        <directionalLight color="#f8fafc" intensity={1.9} position={[2.2, 4.2, 2.4]} />
        <spotLight
          color="#f8fafc"
          intensity={42}
          angle={0.28}
          penumbra={0.7}
          distance={10}
          position={[-2.4, 2.8, 3.2]}
        />
        <pointLight color="#ef4444" intensity={18} decay={2} distance={8} position={[-1.7, 0.9, 2]} />
        <pointLight color="#3b82f6" intensity={8} decay={2} distance={9} position={[2, -0.8, 2.8]} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <AvengersLogo
            useModel={hasModel}
            pointer={pointer}
            isHovered={isHovered}
            modelPath={modelPath}
          />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_54%),radial-gradient(circle_at_15%_30%,rgba(239,68,68,0.20),transparent_40%),radial-gradient(circle_at_85%_70%,rgba(59,130,246,0.18),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_2px,transparent_4px)] opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,0,0,0.14),transparent_12%),radial-gradient(circle_at_100%_0%,rgba(0,102,255,0.14),transparent_14%),radial-gradient(circle_at_0%_100%,rgba(0,102,255,0.12),transparent_14%),radial-gradient(circle_at_100%_100%,rgba(255,0,0,0.12),transparent_14%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
