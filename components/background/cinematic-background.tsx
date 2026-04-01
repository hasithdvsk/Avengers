"use client";

import { Cpu, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Affiliation = "tech" | "magic" | "god";

type AffiliationConfig = {
  label: string;
  color: string;
  accent: string;
  Icon: typeof Cpu;
};

const AFFILIATION_CONFIG: Record<Affiliation, AffiliationConfig> = {
  tech: {
    label: "Tech",
    color: "#f59e0b",
    accent: "#ef4444",
    Icon: Cpu,
  },
  magic: {
    label: "Magic",
    color: "#22c55e",
    accent: "#14b8a6",
    Icon: Sparkles,
  },
  god: {
    label: "God",
    color: "#60a5fa",
    accent: "#a78bfa",
    Icon: Zap,
  },
};

function VfxSticker({ affiliation }: { affiliation: Affiliation }) {
  const { color, accent, Icon } = AFFILIATION_CONFIG[affiliation];

  return (
    <motion.div
      key={affiliation}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: [1, 1.05, 1] }}
      transition={{
        opacity: { duration: 0.35, ease: "easeOut" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      className="pointer-events-none absolute right-4 bottom-4 z-10 md:right-8 md:bottom-8"
    >
      <div
        className="relative flex h-20 w-20 items-center justify-center border-4 border-black bg-white md:h-24 md:w-24"
        style={{
          boxShadow: `0 0 28px ${color}88`,
          backgroundImage: `radial-gradient(circle at 30% 25%, ${accent}33, transparent 55%)`,
        }}
      >
        <div
          className="absolute inset-2 border-2 border-black"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,245,245,0.65) 45%, rgba(212,212,212,0.8))",
          }}
        />
        <Icon className="relative z-10 h-9 w-9 text-black md:h-10 md:w-10" />
      </div>
    </motion.div>
  );
}

function VfxParticles({ affiliation }: { affiliation: Affiliation }) {
  const [viewport, setViewport] = useState(() => ({
    w: typeof window === "undefined" ? 1 : window.innerWidth,
    h: typeof window === "undefined" ? 1 : window.innerHeight,
  }));
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const { color, accent } = AFFILIATION_CONFIG[affiliation];

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        id: index,
        x: ((index * 17 + 13) % 100) + 0.5,
        y: ((index * 29 + 7) % 100) + 0.5,
        size: 2 + (index % 4),
        duration: 6 + (index % 5),
        delay: (index % 6) * 0.25,
      })),
    [],
  );

  useEffect(() => {
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    let frame = 0;
    const handleMove = (event: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setMouse({ x: event.clientX, y: event.clientY });
        frame = 0;
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {particles.map((particle) => {
        const originX = (particle.x / 100) * viewport.w;
        const originY = (particle.y / 100) * viewport.h;
        const dx = originX - mouse.x;
        const dy = originY - mouse.y;
        const distance = Math.hypot(dx, dy) || 1;
        const influence = distance < 180 ? (1 - distance / 180) * 14 : 0;
        const shiftX = (dx / distance) * influence;
        const shiftY = (dy / distance) * influence;

        return (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: `translate(${shiftX}px, ${shiftY}px)`,
            }}
          >
            <motion.span
              className="block rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                background:
                  particle.id % 2 === 0
                    ? `radial-gradient(circle, ${color}, ${color}22)`
                    : `radial-gradient(circle, ${accent}, ${accent}22)`,
                boxShadow: `0 0 14px ${color}66`,
              }}
              animate={{ y: [0, -10, 0], opacity: [0.35, 0.85, 0.35] }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function CinematicBackground() {
  const [affiliation, setAffiliation] = useState<Affiliation>("tech");
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [saveDataEnabled] = useState(() => {
    if (typeof navigator === "undefined") {
      return false;
    }
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    return Boolean(nav.connection?.saveData);
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setShouldLoadVideo(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const canPlayVideo = shouldLoadVideo && !saveDataEnabled && !videoError;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          videoReady && canPlayVideo ? "opacity-40" : "opacity-100",
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(239,68,68,0.2), transparent 28%), radial-gradient(circle at 88% 25%, rgba(59,130,246,0.16), transparent 34%), radial-gradient(circle at 48% 85%, rgba(168,85,247,0.18), transparent 34%), url('/images/mcu-fallback.svg')",
          backgroundSize: "cover, cover, cover, cover",
          backgroundPosition: "center, center, center, center",
        }}
      />

      {canPlayVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            videoReady ? "opacity-100" : "opacity-0",
          )}
          style={{ filter: "brightness(0.3) grayscale(1) contrast(1.3)" }}
          onLoadedData={() => setVideoReady(true)}
          onError={() => {
            setVideoError(true);
            setVideoReady(false);
          }}
        >
          <source src="/videos/mcu-loop.webm" type="video/webm" />
          <source src="/videos/mcu-loop.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.3), rgba(0,0,0,0.75)), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 4px",
        }}
      />

      <VfxParticles affiliation={affiliation} />
      <VfxSticker affiliation={affiliation} />

      <div className="pointer-events-auto absolute top-4 left-4 z-20 border-4 border-black bg-white/95 p-2 md:top-8 md:left-8">
        <p className="mb-2 text-[10px] font-black tracking-[0.2em] text-zinc-700 uppercase">Affiliation</p>
        <div className="flex items-center gap-2">
          {(Object.keys(AFFILIATION_CONFIG) as Affiliation[]).map((key) => {
            const active = key === affiliation;
            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => setAffiliation(key)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "border-2 border-black px-3 py-1 text-xs font-black tracking-wide uppercase transition-colors",
                  active ? "bg-black text-white" : "bg-white text-black",
                )}
              >
                {AFFILIATION_CONFIG[key].label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

