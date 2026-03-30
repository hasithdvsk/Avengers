"use client";

import { useMemo, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { AVENGERS, type Avenger } from "@/constants/avengers";
import { AvengerCard } from "@/components/roster/avenger-card";
import { AvengerDetailModal } from "@/components/roster/avenger-detail-modal";

export function RosterGrid() {
  const [selected, setSelected] = useState<Avenger | null>(null);
  const roster = useMemo(() => AVENGERS, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-8">
      <div className="mb-8 flex items-end justify-between border-b-4 border-white/25 pb-4">
        <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">Avengers Roster</h2>
        <p className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400">
          Classified Profiles
        </p>
      </div>

      <LayoutGroup>
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          initial={false}
          animate={{ opacity: 1 }}
        >
          {roster.map((avenger, index) => (
            <AvengerCard
              key={avenger.id}
              avenger={avenger}
              onSelect={setSelected}
              priority={index < 4}
            />
          ))}
        </motion.div>
        <AvengerDetailModal avenger={selected} onClose={() => setSelected(null)} />
      </LayoutGroup>
    </section>
  );
}
