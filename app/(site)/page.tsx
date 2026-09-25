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
import {
  getHomeSection,
  getHomepagePortfolioVideos,
  getClientLogos,
  getTestimonials,
} from "@/lib/data/home";

export default async function HomePage() {
  const [
    hero,
    trustStats,
    painHook,
    whatIDo,
    aboutSnippet,
    tools,
    finalCta,
    portfolioVideos,
    workedWithLogos,
    trustedByLogos,
    testimonials,
  ] = await Promise.all([
    getHomeSection("hero"),
    getHomeSection("trust_stats"),
    getHomeSection("pain_hook"),
    getHomeSection("what_i_do"),
    getHomeSection("about_snippet"),
    getHomeSection("tools"),
    getHomeSection("final_cta"),
    getHomepagePortfolioVideos(),
    getClientLogos("worked_with"),
    getClientLogos("trusted_by"),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection data={hero} />
      <TrustStrip data={trustStats} />
      <WorkedWith data={workedWithLogos} />
      <AIContentSupport data={trustedByLogos} />
      <PainHook data={painHook} />
      <WhatIDoSummary data={whatIDo} />
      <AboutSnippet data={aboutSnippet} />
      <VideoShowcase data={portfolioVideos} />
      <ToolsStrip data={tools} />
      <Testimonials data={testimonials} />
      <YouTubeSection />
      <FinalCTA data={finalCta} />
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
