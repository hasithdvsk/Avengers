"use client";

import { Text3D, useGLTF } from "@react-three/drei";
import type { FontData } from "@react-three/drei/core/useFont";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  BackSide,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
} from "three";
import helvetikerBold from "three/examples/fonts/helvetiker_bold.typeface.json";

type TiltPointer = {
  x: number;
  y: number;
};

type AvengersLogoProps = {
  useModel: boolean;
  pointer: TiltPointer;
  isHovered: boolean;
  modelPath: string;
};

const helvetikerBoldFont = helvetikerBold as unknown as FontData;

function tintModel(root: Object3D) {
  root.traverse((child) => {
    if (child instanceof Mesh) {
      const partName = child.name.toLowerCase();
      const isRingPart = partName.includes("ring") || partName.includes("arrow");
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new MeshStandardMaterial({
        color: isRingPart ? "#b91c1c" : "#d1d5db",
        metalness: 0.9,
        roughness: 0.2,
      });
    }
  });
}

function buildOutline(root: Object3D) {
  root.traverse((child) => {
    if (child instanceof Mesh) {
      child.material = new MeshBasicMaterial({
        color: "#000000",
        side: BackSide,
      });
      child.castShadow = false;
      child.receiveShadow = false;
    }
  });
}

function AvengersModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);

  const stylizedModel = useMemo(() => {
    const clone = scene.clone(true);
    tintModel(clone);
    return clone;
  }, [scene]);

  const outlineModel = useMemo(() => {
    const clone = scene.clone(true);
    buildOutline(clone);
    return clone;
  }, [scene]);

  return (
    <group scale={1.58} position={[0, -0.2, 0]}>
      <primitive object={outlineModel} scale={1.03} />
      <primitive object={stylizedModel} />
    </group>
  );
}

function AvengersTextFallback() {
  return (
    <group position={[0, -0.15, 0]}>
      <Text3D
        font={helvetikerBoldFont}
        size={1.62}
        height={0.34}
        bevelEnabled
        bevelThickness={0.035}
        bevelSize={0.02}
        curveSegments={12}
        scale={[1.05, 1.05, 1.05]}
        position={[-0.58, -0.82, -0.05]}
      >
        A
        <meshBasicMaterial color="#000000" side={BackSide} />
      </Text3D>

      <Text3D
        font={helvetikerBoldFont}
        size={1.62}
        height={0.34}
        bevelEnabled
        bevelThickness={0.035}
        bevelSize={0.02}
        curveSegments={12}
        position={[-0.58, -0.82, 0]}
      >
        A
        <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.2} />
      </Text3D>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.08, -0.08]} scale={1.04}>
        <torusGeometry args={[1.16, 0.11, 48, 220]} />
        <meshBasicMaterial color="#000000" side={BackSide} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <torusGeometry args={[1.16, 0.11, 48, 220]} />
        <meshStandardMaterial color="#b91c1c" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function AvengersLogo({ useModel, pointer, isHovered, modelPath }: AvengersLogoProps) {
  const rootRef = useRef<Group>(null);

  useFrame((state) => {
    if (!rootRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const targetX = isHovered ? pointer.y * 0.28 : Math.sin(elapsed * 0.45) * 0.04;
    const targetY = elapsed * 0.32 + pointer.x * 0.34;

    rootRef.current.rotation.x = MathUtils.lerp(rootRef.current.rotation.x, targetX, 0.08);
    rootRef.current.rotation.y = MathUtils.lerp(rootRef.current.rotation.y, targetY, 0.08);
    rootRef.current.position.y = MathUtils.lerp(
      rootRef.current.position.y,
      isHovered ? 0.1 : 0,
      0.06,
    );
  });

  return (
    <group ref={rootRef}>
      {useModel ? <AvengersModel modelPath={modelPath} /> : <AvengersTextFallback />}
    </group>
  );
}
