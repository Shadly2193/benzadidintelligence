import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import WorkedWith from "@/components/sections/WorkedWith";
import AIContentSupport from "@/components/sections/AIContentSupport";
import PainHook from "@/components/sections/PainHook";
import WhatIDoSummary from "@/components/sections/WhatIDoSummary";
import AboutSnippet from "@/components/sections/AboutSnippet";
import ServicesOverview from "@/components/sections/ServicesOverview";
import VideoShowcase from "@/components/sections/VideoShowcase";
import ProofOfWork from "@/components/sections/ProofOfWork";
import ToolsStrip from "@/components/sections/ToolsStrip";
import Testimonials from "@/components/sections/Testimonials";
import YouTubeSection from "@/components/sections/YouTubeSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <WorkedWith />
      <AIContentSupport />
      <PainHook />
      <WhatIDoSummary />
      <AboutSnippet />
      <ServicesOverview />
      <VideoShowcase />
      <ProofOfWork />
      <ToolsStrip />
      <Testimonials />
      <YouTubeSection />
      <FinalCTA />
    </>
  );
}
