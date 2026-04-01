"use client";

import type { Avenger } from "@/constants/avengers";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Shield, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ThreeDHero } from "@/components/hero/three-d-hero";

type AvengerCardProps = {
  avenger: Avenger;
  onSelect: (avenger: Avenger) => void;
  priority?: boolean;
};

export function AvengerCard({ avenger, onSelect, priority = false }: AvengerCardProps) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.25 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      ref={cardRef}
      type="button"
      data-cursor="hover"
      layoutId={`card-${avenger.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: `8px 8px 0 #000, 0 0 36px ${avenger.themeColor}`,
      }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onClick={() => onSelect(avenger)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex min-h-[390px] w-full flex-col justify-between overflow-hidden border-4 border-black bg-white p-5 text-left"
      style={{
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 10% 15%, ${avenger.themeColor}55, transparent 45%)`,
        }}
      />

      <div className="relative overflow-hidden border-2 border-black bg-black">
        <div className="relative aspect-[16/9] w-full bg-black">
          {!isLoaded && <Skeleton className="absolute inset-0" />}
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.18),rgba(0,0,0,0.95))]">
              <p className="border-4 border-black bg-white px-5 py-3 text-3xl font-black tracking-wide text-black">
                A
              </p>
            </div>
          ) : (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={avenger.portraitImage}
                alt={`${avenger.alias} portrait`}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover object-top transition duration-500 grayscale saturate-40 contrast-110 group-hover:grayscale-0 group-hover:saturate-150"
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                  setHasError(true);
                  setIsLoaded(true);
                }}
              />
            </motion.div>
          )}
          {isInView ? (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ThreeDHero
                modelPath="/models/avengers-logo.glb"
                isHovered={isHovered}
                themeColor={avenger.themeColor}
              />
            </div>
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_12px_rgba(0,0,0,0.85)]" />
        </div>
      </div>

      <div className="relative flex items-center justify-between">
        <p className="text-[10px] font-black tracking-[0.24em] uppercase text-zinc-600">Avenger File</p>
        <Shield className="h-4 w-4 text-black" />
      </div>
      <div className="relative mt-8 space-y-3">
        <motion.h3
          layoutId={`alias-${avenger.id}`}
          className="text-2xl leading-tight font-black tracking-tight text-black md:text-3xl"
        >
          {avenger.alias}
        </motion.h3>
        <p className="translate-y-3 text-sm font-bold tracking-wide text-zinc-800 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {avenger.realName}
        </p>
      </div>
      <div className="relative mt-4 flex items-center justify-between border-t-2 border-black pt-4">
        <p className="text-xs font-black tracking-[0.2em] uppercase text-zinc-600">Tap to inspect</p>
        <Sparkles className="h-4 w-4 text-black" />
      </div>
    </motion.button>
  );
}
