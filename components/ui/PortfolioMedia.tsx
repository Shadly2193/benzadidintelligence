"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  videoUrl?: string | null;
  youtubeId?: string | null;
  facebookUrl?: string | null;
  className?: string;
  title?: string;
  /** Lazily load + autoplay uploaded video once it nears the viewport (feed/grid use). */
  lazy?: boolean;
  /** Play immediately (used inside hover-driven cards that already control visibility). */
  autoPlay?: boolean;
}

export default function PortfolioMedia({
  videoUrl,
  youtubeId,
  facebookUrl,
  className,
  title,
  lazy = false,
  autoPlay = true,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (!shouldLoad || !videoUrl || !autoPlay) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.load();
    el.play().catch(() => {
      el.addEventListener("canplay", () => el.play().catch(() => {}), { once: true });
    });
  }, [shouldLoad, videoUrl, autoPlay]);

  if (videoUrl) {
    return (
      <div ref={wrapperRef} className={className}>
        {shouldLoad && (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay={autoPlay}
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  if (youtubeId) {
    return (
      <div ref={wrapperRef} className={className}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1&controls=0&modestbranding=1&rel=0`}
          allow="autoplay; encrypted-media"
          className="w-full h-full border-0"
          title={title}
        />
      </div>
    );
  }

  if (facebookUrl) {
    const src = `https://www.facebook.com/plugins/video.php?height=314&href=${encodeURIComponent(
      facebookUrl
    )}&show_text=false&autoplay=false&mute=true`;
    return (
      <div ref={wrapperRef} className={className}>
        <iframe
          src={src}
          className="w-full h-full border-0"
          scrolling="no"
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ background: "linear-gradient(135deg, rgba(255,106,0,0.08), rgba(0,0,0,0.2))" }}
    />
  );
}
