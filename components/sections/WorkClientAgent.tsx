"use client";
import DecryptText from "@/components/ui/DecryptText";

export default function WorkClientAgent() {
  return (
    <section className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-6">
          <DecryptText text="[CLIENT WORK]" />
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
          Real AI Automation.
          <br />
          <span className="text-brand-orange text-glow-orange">Real Results.</span>
        </h2>
        <p className="text-brand-gray-text text-base mb-12">
          A full AI agent system, live and running. This is what "automation" actually looks like.
        </p>

        <div
          className="rounded-2xl overflow-hidden border border-white/8"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/rD1RuVPIpQE?rel=0"
              title="How I Cracked This Trickiest AI Automation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="mt-5 px-1">
          <p className="text-white font-semibold">How I Cracked This Trickiest AI Automation</p>
          <p className="text-brand-gray-text text-sm mt-1">Client project · AI Agent System</p>
        </div>
      </div>
    </section>
  );
}
