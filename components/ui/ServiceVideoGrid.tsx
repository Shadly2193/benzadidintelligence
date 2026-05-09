"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export interface VideoItem {
  src?: string;
  youtubeId?: string;
  title: string;
  tag?: string;
}

function VideoCard({ item, priority = false }: { item: VideoItem; priority?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playPromiseRef = useRef<Promise<void> | null>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      playPromiseRef.current = videoRef.current.play();
    }
  };
  const handleMouseLeave = () => {
    setHovered(false);
    const vid = videoRef.current;
    if (!vid) return;
    if (playPromiseRef.current) {
      playPromiseRef.current.then(() => {
        vid.pause();
        vid.currentTime = 0;
      }).catch(() => {});
      playPromiseRef.current = null;
    } else {
      vid.pause();
      vid.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl overflow-hidden video-glass-border cursor-pointer"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.src ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : item.youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=0&mute=1&controls=0&modestbranding=1&rel=0`}
          allow="autoplay; encrypted-media"
          className="w-full h-full border-0"
          title={item.title}
        />
      ) : null}

      {/* Overlay: always dark gradient at bottom, play icon when not hovered */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />

      {/* Play icon — shown when not hovered */}
      {item.src && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,106,0,0.18)",
              border: "1px solid rgba(255,106,0,0.5)",
              backdropFilter: "blur(4px)",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand-orange ml-0.5" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        <p className="text-sm font-semibold text-white leading-snug">{item.title}</p>
        {item.tag && (
          <span
            className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-md flex-shrink-0 ml-3"
            style={{
              background: "rgba(255,106,0,0.15)",
              border: "1px solid rgba(255,106,0,0.35)",
              color: "#FF6A00",
            }}
          >
            {item.tag}
          </span>
        )}
      </div>
    </motion.div>
  );
}

interface ServiceVideoGridProps {
  label: string;
  headline: string;
  subtext: string;
  videos: VideoItem[];
  columns?: 1 | 2 | 3;
  featured?: boolean;
}

export default function ServiceVideoGrid({
  label,
  headline,
  subtext,
  videos,
  columns = 3,
  featured = false,
}: ServiceVideoGridProps) {
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  if (featured && videos.length === 1) {
    return (
      <section className="py-24 bg-transparent px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-6">{label}</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
          >
            {headline}
          </motion.h2>
          <p className="text-brand-gray-text mb-12 max-w-xl">{subtext}</p>
          <div className="rounded-2xl overflow-hidden video-glass-border" style={{ aspectRatio: "16/9" }}>
            <VideoCard item={videos[0]} priority />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-transparent px-6">
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-6">{label}</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
        >
          {headline}
        </motion.h2>
        <p className="text-brand-gray-text mb-12 max-w-xl">{subtext}</p>
        <div className={`grid ${colClass} gap-6`}>
          {videos.map((v, i) => (
            <VideoCard key={i} item={v} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
