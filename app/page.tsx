import { HeroSection } from "@/components/hero/hero-section";
import { RosterGrid } from "@/components/roster/roster-grid";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_5%,rgba(239,68,68,0.18),transparent_25%),radial-gradient(circle_at_90%_30%,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(168,85,247,0.14),transparent_32%)]" />
      <HeroSection />
      <RosterGrid />
    </main>
  );
}
