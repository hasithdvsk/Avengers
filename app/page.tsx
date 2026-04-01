import { HeroSection } from "@/components/hero/hero-section";
import { RosterGrid } from "@/components/roster/roster-grid";
import { CinematicBackground } from "@/components/background/cinematic-background";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] pb-16">
      <CinematicBackground />
      <div className="relative z-10">
        <HeroSection />
        <RosterGrid />
      </div>
    </main>
  );
}
