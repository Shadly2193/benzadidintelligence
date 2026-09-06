"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PAIN_HOOK } from "@/lib/content";
import ScrollCue from "@/components/ui/ScrollCue";

gsap.registerPlugin(ScrollTrigger);

export default function PainHook() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(line1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(line2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.3")
        .fromTo(line3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.3")
        .fromTo(subtextRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.2");
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-transparent px-6 text-center grid-bg"
    >
      <div className="max-w-4xl">
        <div
          ref={line1Ref}
          className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-black text-white mb-4 opacity-0"
        >
          {PAIN_HOOK.lines[0]}
        </div>
        <div
          ref={line2Ref}
          className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-black text-white mb-4 opacity-0"
        >
          <span className="text-brand-orange">But,</span> {PAIN_HOOK.lines[1]}
        </div>
        <div
          ref={line3Ref}
          className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-black text-brand-orange text-glow-orange mb-12 opacity-0"
        >
          {PAIN_HOOK.lines[2]}
        </div>
        <div ref={subtextRef} className="opacity-0">
          {PAIN_HOOK.subtext.split("\n").map((line, i) => (
            <p key={i} className="text-base md:text-lg text-brand-gray-text leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
      <ScrollCue containerRef={sectionRef} />
    </section>
  );
}
