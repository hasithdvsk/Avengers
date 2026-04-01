"use client";

import { Suspense, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Outlines, useAnimations, useGLTF } from "@react-three/drei";
import { Group, MathUtils, Mesh, MeshBasicMaterial, MeshToonMaterial, type Object3D } from "three";
import { cn } from "@/lib/utils";

type ThreeDHeroProps = {
  modelPath?: string;
  isHovered: boolean;
  themeColor: string;
  className?: string;
};

const modelAvailabilityCache = new Map<string, boolean>();
const modelAvailabilityPending = new Set<string>();
const modelAvailabilityListeners = new Set<() => void>();

function subscribeModelAvailability(listener: () => void) {
  modelAvailabilityListeners.add(listener);
  return () => {
    modelAvailabilityListeners.delete(listener);
  };
}

function emitModelAvailability() {
  modelAvailabilityListeners.forEach((listener) => listener());
}

function getModelAvailability(path: string) {
  return modelAvailabilityCache.get(path) ?? false;
}

function requestModelAvailability(path: string) {
  if (modelAvailabilityCache.has(path) || modelAvailabilityPending.has(path)) {
    return;
  }

  modelAvailabilityPending.add(path);
  fetch(path, { method: "HEAD" })
    .then((response) => {
      modelAvailabilityCache.set(path, response.ok);
      modelAvailabilityPending.delete(path);
      emitModelAvailability();
    })
    .catch(() => {
      modelAvailabilityCache.set(path, false);
      modelAvailabilityPending.delete(path);
      emitModelAvailability();
    });
}

function SkeletonLoader() {
  return (
    <Html center>
      <div className="h-14 w-14 animate-pulse rounded-full border-2 border-black bg-white/80" />
    </Html>
  );
}

function StylizedFallbackAvatar({
  isHovered,
  themeColor,
}: {
  isHovered: boolean;
  themeColor: string;
}) {
  const armRef = useRef<Mesh>(null);
  const avatarRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!avatarRef.current || !armRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const targetY = isHovered ? elapsed * 1.2 : elapsed * 0.35;
    avatarRef.current.rotation.y = MathUtils.lerp(avatarRef.current.rotation.y, targetY, 0.08);
    armRef.current.rotation.z = MathUtils.lerp(
      armRef.current.rotation.z,
      isHovered ? Math.sin(elapsed * 9) * 0.55 : 0.22,
      0.12,
    );
  });

  return (
    <group ref={avatarRef} position={[0, -0.4, 0]}>
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshToonMaterial color="#f3f4f6" />
        <Outlines thickness={0.08} color="#000000" />
      </mesh>

      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[0.58, 0.62, 0.36]} />
        <meshToonMaterial color={themeColor} />
        <Outlines thickness={0.08} color="#000000" />
      </mesh>

      <mesh ref={armRef} position={[0.42, 0.12, 0]} rotation={[0, 0, 0.22]}>
        <boxGeometry args={[0.18, 0.46, 0.18]} />
        <meshToonMaterial color="#e5e7eb" />
        <Outlines thickness={0.08} color="#000000" />
      </mesh>

      <mesh position={[-0.42, 0.08, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.18, 0.46, 0.18]} />
        <meshToonMaterial color="#e5e7eb" />
        <Outlines thickness={0.08} color="#000000" />
      </mesh>
    </group>
  );
}

function applyToonMaterial(root: Object3D, themeColor: string) {
  root.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      const name = child.name.toLowerCase();
      const isAccent = name.includes("ring") || name.includes("arrow") || name.includes("accent");
      child.material = new MeshToonMaterial({
        color: isAccent ? themeColor : "#e5e7eb",
      });
    }
  });
}

function applyOutlineHull(root: Object3D) {
  root.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = false;
      child.receiveShadow = false;
      child.material = new MeshBasicMaterial({ color: "#000000", side: 1 });
    }
  });
}

function AnimatedHeroModel({
  modelPath,
  isHovered,
  themeColor,
}: {
  modelPath: string;
  isHovered: boolean;
  themeColor: string;
}) {
  const groupRef = useRef<Group>(null);
  const [localHover, setLocalHover] = useState(false);
  const { scene, animations } = useGLTF(modelPath);
  const hoverActive = localHover || isHovered;

  const toonScene = useMemo(() => {
    const clone = scene.clone(true);
    applyToonMaterial(clone, themeColor);
    return clone;
  }, [scene, themeColor]);

  const outlineScene = useMemo(() => {
    const clone = scene.clone(true);
    applyOutlineHull(clone);
    return clone;
  }, [scene]);

  const { actions, names } = useAnimations(animations, groupRef);
  const idleName = useMemo(
    () => names.find((name) => /idle/i.test(name)) ?? names[0] ?? "",
    [names],
  );
  const waveName = useMemo(
    () => names.find((name) => /wave|greet|hello/i.test(name)) ?? names[1] ?? idleName,
    [names, idleName],
  );

  useEffect(() => {
    const idleAction = idleName ? actions[idleName] : undefined;
    if (!idleAction) {
      return;
    }
    idleAction.reset().fadeIn(0.5).play();
    return () => {
      idleAction.fadeOut(0.2);
    };
  }, [actions, idleName]);

  useEffect(() => {
    const idleAction = idleName ? actions[idleName] : undefined;
    const waveAction = waveName ? actions[waveName] : undefined;
    if (!idleAction) {
      return;
    }

    if (hoverActive && waveAction && waveAction !== idleAction) {
      idleAction.fadeOut(0.3);
      waveAction.reset().fadeIn(0.3).play();
    } else {
      waveAction?.fadeOut(0.3);
      idleAction.reset().fadeIn(0.3).play();
    }
  }, [actions, hoverActive, idleName, waveName]);

  useFrame((_state, delta) => {
    if (!groupRef.current) {
      return;
    }
    if (!actions[waveName] || waveName === idleName) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -0.62, 0]}
      onPointerOver={() => setLocalHover(true)}
      onPointerOut={() => setLocalHover(false)}
    >
      <primitive object={outlineScene} scale={1.035} />
      <primitive object={toonScene} scale={1.01} />
    </group>
  );
}

export function ThreeDHero({
  modelPath = "/models/avengers-logo.glb",
  isHovered,
  themeColor,
  className,
}: ThreeDHeroProps) {
  const canUseModel = useSyncExternalStore(
    subscribeModelAvailability,
    () => getModelAvailability(modelPath),
    () => getModelAvailability(modelPath),
  );

  useEffect(() => {
    requestModelAvailability(modelPath);
  }, [modelPath]);

  return (
    <div className={cn("pointer-events-auto absolute inset-0", className)}>
      <Canvas
        shadows
        dpr={[1, 1.35]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0.35, 2.25], fov: 38 }}
      >
        <ambientLight intensity={0.42} />
        <spotLight
          intensity={26}
          angle={0.32}
          penumbra={0.65}
          color="#ffffff"
          position={[1.6, 2.8, 2.6]}
          castShadow
        />
        <pointLight intensity={7.5} color={themeColor} distance={5} position={[-1.5, 0.8, 1.8]} />
        <Suspense fallback={<SkeletonLoader />}>
          {canUseModel ? (
            <AnimatedHeroModel modelPath={modelPath} isHovered={isHovered} themeColor={themeColor} />
          ) : (
            <StylizedFallbackAvatar isHovered={isHovered} themeColor={themeColor} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
