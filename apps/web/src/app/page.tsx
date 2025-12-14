import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/features/HeroSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { StatsSection } from "@/components/features/StatsSection";
import { CTASection } from "@/components/features/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen scifi-bg neural-bg">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
