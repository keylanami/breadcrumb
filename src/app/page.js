import AboutCreator from "@/components/landing/AboutCreator";
import DecisionJourney from "@/components/landing/DecisionJourney";
import FinalCTA from "@/components/landing/FinalCTA";
import HeroFrame from "@/components/landing/HeroFrame";
import MemoryCursor from "@/components/landing/MemoryCursor";
import MemoryField from "@/components/landing/MemoryField";
import MemoryMorph from "@/components/landing/MemoryMorph";
import MissingYears from "@/components/landing/MissingYears";
import PillarComposition from "@/components/landing/PillarComposition";
import ProductPreview from "@/components/landing/ProductPreview";
import SmoothScroll from "@/components/landing/SmoothScroll";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf9f9] text-[#1b1c1c] selection:bg-black selection:text-white md:cursor-none">
      <SmoothScroll />
      <MemoryCursor />
      <HeroFrame />
      <ProductPreview />
      <MemoryMorph />
      <DecisionJourney />
      <MissingYears />
      <MemoryField />
      <PillarComposition />
      <AboutCreator />
      <FinalCTA />
    </main>
  );
}
