"use client";
import { useEffect, useRef, useState } from "react";

interface AutoPlayVideoProps {
  src: string;
  className?: string;
}

// Loads and plays only once the video is near the viewport, instead of
// every instance on the page eagerly downloading simultaneously
// (preload="auto" on 10+ videos at once was saturating mobile bandwidth
// and none of them would finish loading — reported as "never appears").
export default function AutoPlayVideo({ src, className }: AutoPlayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.load();
    el.play().catch(() => {
      el.addEventListener("canplay", () => el.play().catch(() => {}), { once: true });
    });
  }, [shouldLoad, src]);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className ?? ""}`}
      style={{ background: "linear-gradient(135deg, rgba(255,106,0,0.08), rgba(0,0,0,0.2))" }}
    >
      {shouldLoad && (
        <video
          ref={ref}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
