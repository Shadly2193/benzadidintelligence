"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHAT_I_DO } from "@/lib/content";
import DecryptText from "@/components/ui/DecryptText";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDoSummary() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const pairsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tagsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });

      pairsRef.current.forEach((el) => {
        tl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.2");
      });

      tl.fromTo(tagsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.2");
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center bg-transparent px-6 grid-bg"
    >
      <div className="max-w-5xl mx-auto w-full py-24">
        <p ref={labelRef} className="section-label mb-12 opacity-0">
          <DecryptText text={WHAT_I_DO.label} />
        </p>

        <div className="space-y-8 mb-16">
          {WHAT_I_DO.pairs.map((pair, i) => (
            <div
              key={i}
              ref={(el) => { pairsRef.current[i] = el; }}
              className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 opacity-0"
            >
              <p className="text-base sm:text-xl md:text-3xl font-semibold text-brand-gray-text">
                {pair.problem}
              </p>
              <p className="text-base sm:text-xl md:text-3xl font-black text-brand-orange">
                {pair.solution}
              </p>
            </div>
          ))}
        </div>

        <div ref={tagsRef} className="flex flex-wrap gap-3 opacity-0">
          {WHAT_I_DO.tags.map((tag) => (
            <span
              key={tag}
              className="px-5 py-2 rounded-full text-sm font-semibold text-brand-orange border border-brand-orange/20 bg-brand-orange/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
