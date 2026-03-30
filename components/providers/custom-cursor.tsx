"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { damping: 30, stiffness: 320, mass: 0.28 });
  const cursorY = useSpring(mouseY, { damping: 30, stiffness: 320, mass: 0.28 });

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));

    const onPointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const hoveringInteractive = !!target?.closest(INTERACTIVE_SELECTOR);
      setIsHovering(hoveringInteractive);
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [mouseX, mouseY]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[120] hidden h-7 w-7 rounded-full border-2 border-black mix-blend-screen md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isHovering ? "rgba(239, 68, 68, 0.78)" : "rgba(255, 255, 255, 0.9)",
          scale: isHovering ? 1.75 : 1,
          boxShadow: isHovering
            ? "0 0 42px rgba(239, 68, 68, 0.8)"
            : "0 0 24px rgba(255, 255, 255, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
    </AnimatePresence>
  );
}
