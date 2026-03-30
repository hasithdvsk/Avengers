"use client";

import type { Avenger } from "@/constants/avengers";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

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

function IntelTabs({ avenger }: { avenger: Avenger }) {
  const [activeTab, setActiveTab] = useState<IntelTab>("origin");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    setActiveTab("origin");
  }, [avenger.id]);

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
              className="border-2 border-black bg-white p-4"
            >
              <ul className="space-y-2 text-sm font-semibold text-zinc-800">
                {avenger.weapons.map((weapon) => (
                  <li key={weapon} className="border-l-4 border-black pl-3">
                    {weapon}
                  </li>
                ))}
              </ul>
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

              <IntelTabs avenger={avenger} />
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
