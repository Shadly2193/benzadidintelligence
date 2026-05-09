"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/lib/content";

const CARD_W = 480;
const CARD_GAP = 40;
const STEP = CARD_W + CARD_GAP;

export default function ServicesOverview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function snapTo(index: number) {
    const clamped = Math.max(0, Math.min(index, SERVICES.length - 1));
    setActiveIndex(clamped);
    animate(x, -clamped * STEP, { type: "spring", stiffness: 300, damping: 35 });
  }

  function onDragEnd(_: unknown, info: { offset: { x: number } }) {
    const threshold = STEP / 4;
    if (info.offset.x < -threshold) snapTo(activeIndex + 1);
    else if (info.offset.x > threshold) snapTo(activeIndex - 1);
    else snapTo(activeIndex);
  }

  return (
    <section className="bg-transparent overflow-hidden grid-bg py-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
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

      {/* Drag carousel */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" style={{ paddingLeft: "max(24px, calc(50vw - 240px))" }}>
        <motion.div
          ref={trackRef}
          style={{ x, display: "flex", gap: `${CARD_GAP}px`, alignItems: "center" }}
          drag="x"
          dragConstraints={{ left: -(SERVICES.length - 1) * STEP, right: 0 }}
          dragElastic={0.08}
          onDragEnd={onDragEnd}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 35 }}
        >
          {SERVICES.map((service, i) => {
            const dist = useTransform(x, (v) => Math.abs(i + v / STEP));
            const scale = useTransform(dist, [0, 1], [1, 0.88]);
            const opacity = useTransform(dist, [0, 1], [1, 0.45]);

            return (
              <motion.div
                key={service.slug}
                style={{ width: `min(${CARD_W}px, 85vw)`, scale, opacity, flexShrink: 0 }}
                className="glass-card-dark rounded-2xl p-8 border-t-2 border-t-brand-orange cyber-corner"
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
                  onClick={(e) => e.stopPropagation()}
                >
                  {service.cta.label}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-8">
        {SERVICES.map((_, i) => (
          <button
            key={i}
            onClick={() => snapTo(i)}
            className="transition-all duration-300"
            style={{
              height: "6px",
              width: i === activeIndex ? "24px" : "6px",
              borderRadius: "9999px",
              background: i === activeIndex ? "#FF6A00" : "rgba(255,106,0,0.3)",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  );
}
