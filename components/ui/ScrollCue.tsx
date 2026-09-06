"use client";
import { useEffect, useRef, useState } from "react";

interface ScrollCueProps {
  containerRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export default function ScrollCue({ containerRef, className = "" }: ScrollCueProps) {
  const [entered, setEntered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (!entered || dismissed) return;

    const dismiss = () => setDismissed(true);
    window.addEventListener("wheel", dismiss, { passive: true, once: true });
    window.addEventListener("touchmove", dismiss, { passive: true, once: true });
    dismissTimerRef.current = setTimeout(dismiss, 4500);

    return () => {
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, [entered, dismissed]);

  const visible = entered && !dismissed;

  return (
    <div
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700 z-20 ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <span className="text-xs tracking-[0.3em] uppercase text-brand-gray-text">Scroll Down</span>
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-brand-orange animate-bounce"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
