import DecisionJourney from "@/components/landing/DecisionJourney";
import FinalCTA from "@/components/landing/FinalCTA";
import HeroFrame from "@/components/landing/HeroFrame";
import MemoryField from "@/components/landing/MemoryField";
import MemoryMorph from "@/components/landing/MemoryMorph";
import MissingYears from "@/components/landing/MissingYears";
import PillarComposition from "@/components/landing/PillarComposition";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf9f9] text-[#1b1c1c] selection:bg-black selection:text-white">
      <HeroFrame />
      <MemoryMorph />
      <DecisionJourney />
      <MissingYears />
      <MemoryField />
      <PillarComposition />
      <FinalCTA />
    </main>
  );
}
