"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { SERVICES } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const CARD_W = 480;
const CARD_GAP = 40;

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const numCards = SERVICES.length;
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const totalTravel = (numCards - 1) * (CARD_W + CARD_GAP);

      // Center first card on load
      const startX = window.innerWidth / 2 - CARD_W / 2;
      gsap.set(trackRef.current, { x: startX });

      // Initial scale state
      cards.forEach((card, i) => {
        gsap.set(card, {
          scale: i === 0 ? 1 : 0.82,
          opacity: i === 0 ? 1 : 0.45,
        });
      });

      gsap.to(trackRef.current, {
        x: startX - totalTravel,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalTravel}`,
          snap: {
            snapTo: 1 / (numCards - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: "power2.inOut",
          },
          onUpdate(self) {
            const activeFloat = self.progress * (numCards - 1);
            cards.forEach((card, i) => {
              const dist = Math.abs(i - activeFloat);
              const clamped = Math.min(dist, 1);
              gsap.set(card, {
                scale: 1 - clamped * 0.18,
                opacity: 1 - clamped * 0.55,
              });
            });
          },
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-transparent overflow-hidden grid-bg"
      style={{ height: "100vh" }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <p className="section-label mb-6">WHAT I DO</p>
        <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-white leading-tight">
          Five ways I help
          <br />
          you win with AI.
        </h2>
        <p className="mt-4 text-brand-gray-text text-base">
          Pick your path. Each one is a complete solution — not a side project.
        </p>
      </div>

      {/* Cards track */}
      <div
        className="overflow-visible"
        style={{ height: "calc(100vh - 260px)", display: "flex", alignItems: "center" }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            alignItems: "center",
            willChange: "transform",
          }}
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.slug}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="flex-shrink-0 glass-card-dark rounded-2xl p-8 border-t-2 border-t-brand-orange cyber-corner"
              style={{ width: `min(${CARD_W}px, 85vw)`, willChange: "transform, opacity" }}
            >
              <p className="text-xs font-black tracking-[0.3em] text-brand-orange/40 mb-6">
                {service.number}
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                {service.bigHeadline.map((l, j) => (
                  <span key={j} className="block">{l}</span>
                ))}
              </h3>
              <p className="text-sm text-brand-gray-text leading-relaxed mb-6">
                {service.pain.split("\n")[0]}
              </p>
              <p className="text-sm text-white/70 leading-relaxed mb-8">
                {service.description.split("\n")[0]}
              </p>
              <Link
                href={service.cta.href}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold btn-red"
              >
                {service.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-4">
        {SERVICES.map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-brand-orange/30"
          />
        ))}
      </div>
    </section>
  );
}
