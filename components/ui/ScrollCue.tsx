"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ScrollCueProps {
  containerRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export default function ScrollCue({ containerRef, className = "" }: ScrollCueProps) {
  const [entered, setEntered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  // Robust "is this section on screen" check — measured directly via
  // getBoundingClientRect on scroll/resize instead of IntersectionObserver,
  // since GSAP ScrollTrigger's pin:true reparents the element into a
  // pin-spacer and can make IntersectionObserver misfire during that reflow.
  useEffect(() => {
    const check = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
      if (inView) setEntered(true);
    };

    check();
    const onScrollOrResize = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        check();
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    const retryTimer = setTimeout(check, 300); // catch late layout (GSAP pin-spacer insertion)

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      clearTimeout(retryTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  // Dismiss only on an actual user scroll/touch gesture — no timer.
  // A fixed timeout was hiding the cue before real-world page load +
  // hydration delay even gave the visitor a chance to notice it.
  useEffect(() => {
    if (!entered || dismissed) return;

    const dismiss = () => setDismissed(true);
    window.addEventListener("wheel", dismiss, { passive: true, once: true });
    window.addEventListener("touchmove", dismiss, { passive: true, once: true });
    window.addEventListener("keydown", dismiss, { once: true });

    return () => {
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, [entered, dismissed]);

  const visible = entered && !dismissed;

  if (!mounted) return null;

  // Rendered via portal straight into <body> — GSAP ScrollTrigger's pin:true
  // applies a CSS transform to the pinned section (its default "transform"
  // pinType), and any transformed ancestor creates a new containing block
  // for position:fixed descendants. Without the portal, this cue would be
  // fixed relative to the pinned section instead of the real viewport,
  // landing it just off-screen below the fold.
  return createPortal(
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700 z-[9999] ${
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
    </div>,
    document.body
  );
}
