"use client";
import Link from "next/link";
import WorkHero from "@/components/sections/WorkHero";
import WorkWebsiteShowcase from "@/components/sections/WorkWebsiteShowcase";
import WorkAIContent from "@/components/sections/WorkAIContent";
import WorkClientAgent from "@/components/sections/WorkClientAgent";
import WorkLearnFromMe from "@/components/sections/WorkLearnFromMe";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <WorkHero />

      <div id="work-start">
        <WorkWebsiteShowcase />
      <WorkAIContent />
      <WorkClientAgent />
      <WorkLearnFromMe />
      </div>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-brand-gray-text mb-4 text-lg">Seen enough?</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white mb-8">
            Let&apos;s build something
            <br />
            <span className="text-brand-orange">for you.</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-5 rounded-full text-base font-bold btn-red"
          >
            Get In Touch With Me →
          </Link>
        </div>
      </section>
    </div>
  );
}
