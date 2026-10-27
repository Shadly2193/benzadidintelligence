import type { Metadata } from "next";
import WorkedWith from "@/components/sections/WorkedWith";
import BeforeAfter from "@/components/course/BeforeAfter";
import ChromeUI from "@/components/course/ChromeUI";
import Demo from "@/components/course/Demo";
import Faq from "@/components/course/Faq";
import Final from "@/components/course/Final";
import Hero from "@/components/course/Hero";
import HowItWorks from "@/components/course/HowItWorks";
import Instructor from "@/components/course/Instructor";
import Join from "@/components/course/Join";
import Price from "@/components/course/Price";
import Problem from "@/components/course/Problem";
import Proof from "@/components/course/Proof";
import Roadmap from "@/components/course/Roadmap";
import Walkaway from "@/components/course/Walkaway";
import WhoFor from "@/components/course/WhoFor";
import { getClientLogos } from "@/lib/data/home";
import "@/components/course/course.css";

export const metadata: Metadata = {
  title: "Digital Residency Program",
  description:
    "A 16-week live program for Bangladeshi doctors and medical students. Learn to build your own brand, videos and website with AI. Built only for doctors, by a doctor.",
  openGraph: {
    title: "Digital Residency Program",
    description: "Learn to build your own brand, videos and website with AI. Built only for doctors, by a doctor.",
    // TODO: replace with the real Open Graph image
    images: ["/images/logo.png"],
  },
};

export default async function DigitalResidencyPage() {
  const workedWithLogos = await getClientLogos("worked_with");

  return (
    <div className="dr-page">
      <Hero
        logos={
          <div className="dr-embed">
            <WorkedWith data={workedWithLogos} />
          </div>
        }
      />
      <Problem />
      <BeforeAfter />
      <Demo />
      <Proof />
      <Roadmap />
      <HowItWorks />
      <WhoFor />
      <Instructor />
      <Price />
      <Walkaway />
      <Join />
      <Faq />
      <Final />
      <ChromeUI />
    </div>
  );
}
