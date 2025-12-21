import { HeroSection } from "../components/HeroSection";
import { ScrollToCompileSection } from "../components/ScrollToCompileSection";
import { HorizontalStorySection } from "../components/HorizontalStorySection";
import { OutcomesSection } from "../components/OutcomesSection";
import { FinalSection } from "../components/FinalSection";
import { Navigation } from "../components/Navigation";
import { SocialLinks } from "../components/SocialLinks";

export function LandingPage() {
  return (
    <div className="relative bg-white min-h-screen">
      <Navigation />
      <SocialLinks />
      <HeroSection />
      <ScrollToCompileSection />
      <HorizontalStorySection />
      <OutcomesSection />
      <FinalSection />
    </div>
  );
}