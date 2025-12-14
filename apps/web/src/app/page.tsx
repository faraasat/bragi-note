import { HeroSection } from "@/components/features/HeroSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { StatsSection } from "@/components/features/StatsSection";
import { CTASection } from "@/components/features/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
