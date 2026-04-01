"use client";

import type { Avenger, AvengerWeapon } from "@/constants/avengers";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

type AvengerDetailModalProps = {
  avenger: Avenger | null;
  onClose: () => void;
};

type IntelTab = "origin" | "strengths" | "weapons";

const TAB_ITEMS: { key: IntelTab; label: string }[] = [
  { key: "origin", label: "Origin Story" },
  { key: "strengths", label: "Strengths" },
  { key: "weapons", label: "Weapons" },
];

function WeaponsTab({
  weapons,
  themeColor,
}: {
  weapons: AvengerWeapon[];
  themeColor: string;
}) {
  const [activeWeapon, setActiveWeapon] = useState(weapons[0]?.name ?? "");

  return (
    <motion.div
      className="border-2 border-black bg-white p-4"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delayChildren: 0.2,
            staggerChildren: 0.09,
          },
        },
      }}
    >
      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 },
        }}
      >
        {weapons.map((weapon) => {
          const isActive = activeWeapon === weapon.name;
          return (
            <motion.button
              key={weapon.name}
              type="button"
              data-cursor="hover"
              onClick={() => setActiveWeapon(weapon.name)}
              className="group relative overflow-hidden border-2 border-black bg-white text-left"
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: `0 0 30px ${themeColor}`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="relative h-28 w-full border-b-2 border-black bg-[linear-gradient(145deg,#f4f4f5_0%,#d4d4d8_52%,#f4f4f5_100%)]">
                <Image
                  src={weapon.image}
                  alt={`${weapon.name} icon`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain p-3 drop-shadow-[0_10px_10px_rgba(0,0,0,0.35)]"
                />
              </div>

              <div className="relative p-3">
                <p className="text-xs font-black tracking-[0.14em] uppercase text-zinc-700">{weapon.name}</p>
                <p className="mt-2 text-xs font-semibold text-zinc-700">{weapon.iconicAppearance}</p>
                <p className="mt-2 line-clamp-2 text-xs text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100">
                  {weapon.description}
                </p>
              </div>

              {isActive ? (
                <motion.span
                  layoutId="weaponCardHighlight"
                  className="absolute right-2 bottom-1 left-2 h-[3px] bg-black"
                />
              ) : null}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function IntelTabs({ avenger }: { avenger: Avenger }) {
  const [activeTab, setActiveTab] = useState<IntelTab>("origin");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = TAB_ITEMS.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = TAB_ITEMS[nextIndex];
    setActiveTab(nextTab.key);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Avenger intel tabs"
        className="inline-flex w-full items-center justify-start gap-2 border-2 border-black bg-zinc-900 p-2"
      >
        {TAB_ITEMS.map((tab, index) => {
          const isActive = activeTab === tab.key;
          const tabId = `tab-${avenger.id}-${tab.key}`;
          const panelId = `panel-${avenger.id}-${tab.key}`;

          return (
            <motion.button
              key={tab.key}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={tabId}
              aria-controls={panelId}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              whileHover={{ y: -2 }}
              onClick={() => setActiveTab(tab.key)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`relative border-2 border-black px-4 py-2 text-xs font-black tracking-[0.18em] uppercase transition-colors ${
                isActive ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {tab.label}
              {isActive ? (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute right-1 bottom-0 left-1 h-[2px] bg-white"
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 min-h-44">
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "origin" ? (
            <motion.div
              key="origin"
              role="tabpanel"
              id={`panel-${avenger.id}-origin`}
              aria-labelledby={`tab-${avenger.id}-origin`}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="border-2 border-black bg-white p-4 text-sm leading-relaxed font-semibold text-zinc-800"
            >
              {avenger.biography}
            </motion.div>
          ) : null}

          {activeTab === "strengths" ? (
            <motion.div
              key="strengths"
              role="tabpanel"
              id={`panel-${avenger.id}-strengths`}
              aria-labelledby={`tab-${avenger.id}-strengths`}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="border-2 border-black bg-white p-4"
            >
              <ul className="space-y-2 text-sm font-semibold text-zinc-800">
                {avenger.strengths.map((strength) => (
                  <li key={strength} className="border-l-4 border-black pl-3">
                    {strength}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}

          {activeTab === "weapons" ? (
            <motion.div
              key="weapons"
              role="tabpanel"
              id={`panel-${avenger.id}-weapons`}
              aria-labelledby={`tab-${avenger.id}-weapons`}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="p-0"
            >
              <WeaponsTab weapons={avenger.weapons} themeColor={avenger.themeColor} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AvengerDetailModal({ avenger, onClose }: AvengerDetailModalProps) {
  return (
    <AnimatePresence>
      {avenger ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/80 p-3 backdrop-blur-sm md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            layoutId={`card-${avenger.id}`}
            className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden border-4 border-black bg-zinc-100"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              data-cursor="hover"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 border-2 border-black bg-white p-2 text-black transition hover:bg-zinc-300"
              aria-label="Close detail view"
            >
              <X className="h-4 w-4" />
            </button>

            <div
              className="absolute inset-0 opacity-80"
              style={{
                background: `radial-gradient(circle at 0% 0%, ${avenger.themeColor}55, transparent 45%),
                  radial-gradient(circle at 100% 100%, ${avenger.themeColor}4A, transparent 48%)`,
              }}
            />
            <div className="absolute inset-0">
              <Image
                src={avenger.actionImage}
                alt={`${avenger.alias} action scene`}
                fill
                sizes="100vw"
                className="object-cover opacity-28 grayscale contrast-110"
                priority
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,transparent_10%,rgba(0,0,0,0.65)_70%)]" />
            </div>

            <div className="relative overflow-y-auto p-6 md:p-8">
              <motion.h3
                layoutId={`alias-${avenger.id}`}
                className="max-w-3xl text-4xl leading-none font-black tracking-tight text-black md:text-6xl"
              >
                {avenger.alias}
              </motion.h3>
              <p className="mt-3 text-sm font-black tracking-[0.2em] uppercase text-zinc-700">
                {avenger.realName}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="border-2 border-black bg-white p-4">
                  <p className="text-[11px] font-black tracking-[0.22em] uppercase text-zinc-600">
                    First Appearance
                  </p>
                  <p className="mt-2 text-sm font-bold text-black">
                    {avenger.firstAppearance.comic} ({avenger.firstAppearance.year})
                  </p>
                </div>
                <div className="border-2 border-black bg-white p-4">
                  <p className="text-[11px] font-black tracking-[0.22em] uppercase text-zinc-600">
                    MCU Highlight
                  </p>
                  <p className="mt-2 text-sm font-bold text-black">{avenger.highlightMovie}</p>
                </div>
              </div>

              <IntelTabs key={avenger.id} avenger={avenger} />
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
