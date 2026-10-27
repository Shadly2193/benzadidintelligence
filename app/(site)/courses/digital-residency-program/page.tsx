import type { Metadata } from "next";
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

export default function DigitalResidencyPage() {
  return (
    <div className="dr-page">
      <Hero />
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
