import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import WorkedWith from "@/components/sections/WorkedWith";
import AIContentSupport from "@/components/sections/AIContentSupport";
import PainHook from "@/components/sections/PainHook";
import WhatIDoSummary from "@/components/sections/WhatIDoSummary";
import AboutSnippet from "@/components/sections/AboutSnippet";
import VideoShowcase from "@/components/sections/VideoShowcase";
import ToolsStrip from "@/components/sections/ToolsStrip";
import Testimonials from "@/components/sections/Testimonials";
import YouTubeSection from "@/components/sections/YouTubeSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Link from "next/link";

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
      <VideoShowcase />
      <ToolsStrip />
      <Testimonials />
      <YouTubeSection />
      <FinalCTA />
      <div className="flex justify-center py-16 bg-transparent">
        <Link
          href="/contact"
          className="inline-flex items-center px-10 py-4 rounded-full text-sm font-bold btn-gradient"
        >
          Get In Touch With Me →
        </Link>
      </div>
    </>
  );
}
