"use client";
import DecryptText from "@/components/ui/DecryptText";
import AutoPlayVideo from "@/components/ui/AutoPlayVideo";

interface PortfolioVideo {
  video_url: string | null;
  title: string;
  tag: string | null;
  live_link: string | null;
}

export default function WorkWebsiteShowcase({ data }: { data: PortfolioVideo[] }) {
  const WEBSITES = data.map((v) => ({
    src: v.video_url ?? "",
    title: v.title,
    tag: v.tag ? `${v.tag} · AI Build` : "AI Build",
    link: v.live_link ?? undefined,
  }));

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
          {WEBSITES.map((v) => {
            const inner = (
              <>
                <div
                  className="relative rounded-2xl overflow-hidden border border-white/8"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 4px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  {v.link && (
                    <div
                      className="absolute top-3 right-3 z-10 flex items-center gap-1.5 text-xs font-bold tracking-wide px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "rgba(255,106,0,0.85)",
                        color: "#0a0603",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      Click to Watch the Website
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth={2.5}>
                        <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <AutoPlayVideo
                    src={v.src}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="text-white font-semibold text-sm">{v.title}</p>
                  <span className="text-xs text-brand-orange/70 font-medium">{v.tag}</span>
                </div>
              </>
            );

            return v.link ? (
              <a
                key={v.src}
                href={v.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {inner}
              </a>
            ) : (
              <div key={v.src} className="group">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
