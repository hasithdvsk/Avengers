import { AvengersHeroCanvas } from "@/components/hero/avengers-hero-canvas";

export function HeroSection() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-12 md:px-8 md:pt-16">
      <div className="relative border-4 border-black bg-white p-6 md:p-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(239,68,68,0.4),transparent_36%),radial-gradient(circle_at_75%_70%,rgba(59,130,246,0.36),transparent_45%)] blur-2xl" />
        <p className="mb-3 text-xs font-black tracking-[0.35em] uppercase text-zinc-700">
          Earth&apos;s Mightiest
        </p>
        <h1 className="text-4xl font-black tracking-tight text-black md:text-6xl">
          AVENGERS
          <span className="block text-xl md:text-3xl">Cinematic Roster Archive</span>
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed font-semibold text-zinc-700 md:text-base">
          Step into a stylized dossier of heroes forged through conflict, sacrifice, and myth.
          Explore deep lore, signature arsenals, and kinetic visuals crafted in a graphic-novel
          inspired interface.
        </p>
      </div>
      <AvengersHeroCanvas />
    </section>
  );
}
