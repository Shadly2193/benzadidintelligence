"use client";
import { useState } from "react";
import DecryptText from "@/components/ui/DecryptText";

type Platform = "youtube" | "linkedin" | "instagram";

interface ContentItem {
  platform: Platform;
  title: string;
  href: string;
  videoId?: string;
  localSrc?: string;
}

const COMMERCIAL_ADS: ContentItem[] = [
  {
    platform: "linkedin",
    title: "AI-Generated Sprite Commercial",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7372253096200110080/",
    localSrc: "/videos/sprite-ad.mp4",
  },
  {
    platform: "linkedin",
    title: "AI-Generated Ice Cream Ad",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7374736708522672129/",
    localSrc: "/videos/icecream-ad.mp4",
  },
  {
    platform: "instagram",
    title: "AI Orange Juice Commercial",
    href: "https://www.instagram.com/reel/DOjP097glsB/",
    localSrc: "/videos/orange-juice-ad.mp4",
  },
  {
    platform: "instagram",
    title: "AI Brand Commercial — Black & Orange",
    href: "https://www.instagram.com/reel/DPA1ce_CASV/",
    localSrc: "/videos/black-orange-ad.mp4",
  },
  {
    platform: "youtube",
    title: "The Next Level of Advertising: 100% AI Earbuds Commercial",
    href: "https://www.youtube.com/watch?v=FIMeNgEDQ9o",
    videoId: "FIMeNgEDQ9o",
  },
  {
    platform: "youtube",
    title: "KitKat AI Commercial",
    href: "https://www.youtube.com/",
    localSrc: "/videos/kitkat-commercial.mp4",
  },
];

const STORYTELLING: ContentItem[] = [
  {
    platform: "youtube",
    title: "The 5 Monkeys & The Banana Experiment",
    href: "https://youtu.be/q_-P6ni581A",
    videoId: "q_-P6ni581A",
  },
  {
    platform: "youtube",
    title: "I Almost Cried Making This AI Film 'Ababil'",
    href: "https://youtu.be/-OIixVWHhmA",
    videoId: "-OIixVWHhmA",
  },
  {
    platform: "youtube",
    title: "Bizarre Dental Care — AI Storytelling",
    href: "https://www.youtube.com/",
    localSrc: "/videos/bizarre-dental-care.mp4",
  },
];

const PLATFORM_STYLES: Record<Platform, { bg: string; label: string; icon: string }> = {
  youtube: {
    bg: "linear-gradient(135deg, #1a0a0a 0%, #2d0a0a 100%)",
    label: "YouTube",
    icon: "▶",
  },
  linkedin: {
    bg: "linear-gradient(135deg, #061526 0%, #0a2540 100%)",
    label: "LinkedIn",
    icon: "in",
  },
  instagram: {
    bg: "linear-gradient(135deg, #1a0a1a 0%, #2d0820 100%)",
    label: "Instagram",
    icon: "◉",
  },
};

function ContentCard({ item }: { item: ContentItem }) {
  const [hovered, setHovered] = useState(false);
  const style = PLATFORM_STYLES[item.platform];

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="rounded-xl overflow-hidden border border-white/8 relative"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="aspect-video relative">
          {item.localSrc ? (
            <video
              src={item.localSrc}
              autoPlay={hovered}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : item.platform === "youtube" && item.videoId ? (
            hovered ? (
              <iframe
                src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&rel=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full absolute inset-0"
              />
            ) : (
              <>
                <img
                  src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-brand-orange/90 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl ml-1">▶</span>
                  </div>
                </div>
              </>
            )
          ) : (
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3"
                style={{ background: style.bg }}
              >
                <span className="text-4xl font-black text-white/20">{style.icon}</span>
                <span className="text-xs font-bold tracking-widest text-white/40 uppercase">{style.label}</span>
                <div className="mt-2 px-4 py-1.5 rounded-full border border-white/20 text-xs text-white/70 group-hover:bg-white/10 transition-colors">
                  Watch on {style.label} →
                </div>
              </div>
            </a>
          )}

          {/* Play overlay for local videos when not hovered */}
          {item.localSrc && !hovered && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-brand-orange/90 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl ml-1">▶</span>
              </div>
            </div>
          )}
        </div>

        {/* Platform badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 text-xs font-bold rounded-full"
            style={{
              background:
                item.platform === "youtube"
                  ? "rgba(255,0,0,0.8)"
                  : item.platform === "linkedin"
                  ? "rgba(0,119,181,0.8)"
                  : "rgba(193,53,132,0.8)",
              color: "#fff",
            }}
          >
            {style.label}
          </span>
        </div>
      </div>

      <div className="mt-3 px-1 flex items-start justify-between gap-2">
        <p className="text-white/80 text-sm font-medium leading-snug flex-1">{item.title}</p>
        {item.platform !== "youtube" && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-orange text-xs font-semibold shrink-0 hover:underline mt-0.5"
          >
            Watch →
          </a>
        )}
      </div>
    </div>
  );
}

export default function WorkAIContent() {
  return (
    <section className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-6">
          <DecryptText text="[AI CONTENT CREATION]" />
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
          From Concept to Commercial.
          <br />
          <span className="text-brand-orange text-glow-orange">No Studio. No Budget.</span>
        </h2>
        <p className="text-brand-gray-text text-base mb-16">
          Every frame, every scene — generated with AI. Hover to watch.
        </p>

        {/* Commercial Ads */}
        <div className="mb-14">
          <p className="text-xs font-black tracking-[0.3em] text-brand-orange/60 uppercase mb-6">
            Commercial AI Ads
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMERCIAL_ADS.map((item, i) => (
              <ContentCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* AI Storytelling */}
        <div>
          <p className="text-xs font-black tracking-[0.3em] text-brand-orange/60 uppercase mb-6">
            AI Storytelling
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STORYTELLING.map((item, i) => (
              <ContentCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
