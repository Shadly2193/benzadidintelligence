"use client";
import DecryptText from "@/components/ui/DecryptText";

export default function WorkWebsiteShowcase() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-6">
          <DecryptText text="[WEBSITE WORK]" />
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
          Websites That Look
          <br />
          <span className="text-brand-orange text-glow-orange">Developer-Built.</span>
        </h2>
        <p className="text-brand-gray-text text-base mb-12">
          Built with AI. Looks like a six-figure agency made it. Judge for yourself.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              src: "/videos/dental-surgeon-website.mp4",
              title: "Dental Surgeon Website",
              tag: "Healthcare · AI Build",
            },
            {
              src: "/videos/orthopedic-surgeon-website.mp4",
              title: "Orthopedic Surgeon Website",
              tag: "Healthcare · AI Build",
            },
          ].map((v) => (
            <div key={v.src} className="group">
              <div
                className="rounded-2xl overflow-hidden border border-white/8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 4px 40px rgba(0,0,0,0.4)",
                }}
              >
                <video
                  src={v.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-video object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <p className="text-white font-semibold text-sm">{v.title}</p>
                <span className="text-xs text-brand-orange/70 font-medium">{v.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
