import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FeaturedSolutions from "@/components/sections/FeaturedSolutions";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TechStack from "@/components/sections/TechStack";
import AIShowcase from "@/components/sections/AIShowcase";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <WhyChooseUs />
      <FeaturedSolutions />
      <PortfolioSection />
      <ProcessSection />
      <TechStack />
      <AIShowcase />
    </main>
  );
}
