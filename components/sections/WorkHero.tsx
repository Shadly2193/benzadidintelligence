"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WorkHero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Background — solid base colour */}
      <div className="absolute inset-0" style={{ background: "#0a0603" }} />

      {/* Mobile-only: full-cover background image */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: "url('/images/work-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
        }}
      />

      {/* Desktop-only: character image pinned to right edge */}
      <img
        src="/images/work-hero.jpg"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="hidden md:block"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "auto",
          maxWidth: "none",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Mobile gradient — darkens image so text is readable */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to right, rgba(10,6,3,0.88) 0%, rgba(10,6,3,0.65) 55%, rgba(10,6,3,0.45) 100%), linear-gradient(to top, rgba(10,6,3,0.7) 0%, transparent 50%)",
        }}
      />

      {/* Desktop gradient — dark left, fades to transparent right */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, #0a0603 0%, rgba(10,6,3,0.88) 30%, rgba(10,6,3,0.55) 55%, rgba(10,6,3,0.10) 78%, transparent 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28"
        style={{ background: "linear-gradient(to top, #0a0603, transparent)" }}
      />

      {/* Content — glass board left side */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          {/* Glass board */}
          <div
            className="rounded-2xl p-6 sm:p-8 md:p-10"
            style={{
              background: "rgba(10, 6, 3, 0.45)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              border: "1px solid rgba(255, 106, 0, 0.18)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.35)",
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="section-label mb-8"
            >
              [THE WORK]
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-black leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              <span className="text-white block">Don&apos;t hire anyone</span>
              <span className="text-brand-orange text-glow-orange block">
                until you&apos;ve seen this.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-white/85 text-base leading-relaxed mb-3"
            >
              Websites. AI Agents. Content. Every result on this page came from real client work —
              not mockups, not demos, not inflated numbers.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-brand-gray-text text-sm leading-relaxed mb-10"
            >
              I built each one. I documented each one. Scroll through — and decide
              whether you&apos;re looking at someone worth working with.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#work-start"
                className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-bold btn-red"
              >
                Show Me The Work ↓
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-semibold border border-white/20 text-white/80 hover:border-brand-orange/50 hover:text-white transition-all"
              >
                Get In Touch With Me
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
