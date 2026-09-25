"use client";
import { useState } from "react";

interface Tutorial {
  videoId: string;
  title: string;
  tag: string;
}



function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  const [hovered, setHovered] = useState(false);

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
          {hovered ? (
            <iframe
              src={`https://www.youtube.com/embed/${tutorial.videoId}?autoplay=1&mute=1&rel=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full absolute inset-0"
            />
          ) : (
            <>
              <img
                src={`https://i.ytimg.com/vi/${tutorial.videoId}/hqdefault.jpg`}
                alt={tutorial.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-orange/90 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg ml-0.5">▶</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 px-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2 py-0.5 text-xs font-bold rounded bg-brand-orange/10 border border-brand-orange/20 text-brand-orange">
            {tutorial.tag}
          </span>
        </div>
        <p className="text-white/80 text-sm font-medium leading-snug">{tutorial.title}</p>
      </div>
    </div>
  );
}

export default function WorkLearnFromMe({ data }: { data: { youtube_id: string; title: string; tag: string | null }[] }) {
  const TUTORIALS: Tutorial[] = data.map((t) => ({ videoId: t.youtube_id, title: t.title, tag: t.tag ?? "" }));
  return (
    <section className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-6">[LEARN FROM ME]</p>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
          I Teach What
          <br />
          <span className="text-brand-orange text-glow-orange">I Practice.</span>
        </h2>
        <p className="text-brand-gray-text text-base mb-12">
          Free tutorials — real tools, real methods. No theory. Hover to watch.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {TUTORIALS.map((tutorial) => (
            <TutorialCard key={tutorial.videoId} tutorial={tutorial} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@benzadidintelligence"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold btn-red"
          >
            Visit My YouTube Channel →
          </a>
        </div>
      </div>
    </section>
  );
}
