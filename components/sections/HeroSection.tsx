"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO } from "@/lib/content";
import DecryptText from "@/components/ui/DecryptText";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text fade-out on scroll
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "center top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      // Parallax: image moves up slower than scroll (depth effect)
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          y: "-18%",
          ease: "none",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const lineVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-20" style={{ isolation: "isolate" }}>
      {/* Full-screen background image — zoomed, right-anchored for face visibility */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/images/hero-bg.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full pointer-events-none z-0 hero-bg-img"
        fetchPriority="high"
        decoding="async"
        style={{
          height: "130%",
          top: "-15%",
          objectFit: "cover",
        }}
      />

      {/* Futuristic corner accents */}
      <div className="absolute top-20 left-6 w-12 h-12 border-l-2 border-t-2 border-brand-orange/30 pointer-events-none z-[3]" />
      <div className="absolute bottom-20 right-6 w-12 h-12 border-r-2 border-b-2 border-brand-orange/30 pointer-events-none z-[3]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 gap-4 items-center">
        {/* Glass board — blurry transparent card behind text */}
        <motion.div
          ref={textRef}
          className="py-8 px-5 sm:py-10 sm:px-8 md:py-12 md:px-10 rounded-2xl"
          style={{
            background: "rgba(8, 0, 16, 0.22)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            border: "1px solid rgba(200, 50, 5, 0.12)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
            maxWidth: "780px",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={lineVariants}
            className="section-label mb-8"
          >
            <DecryptText text={HERO.label} />
          </motion.p>

          <motion.h1
            variants={lineVariants}
            className="text-[clamp(2.5rem,4.5vw,5.2rem)] font-black text-white leading-[0.95] mb-8 tracking-tight"
          >
            {HERO.headline.map((line, i) => (
              <span key={i} className="block">
                {line.includes("AI") ? (
                  <>
                    {line.split("AI").map((part, j, arr) => (
                      <span key={j}>
                        {part}
                        {j < arr.length - 1 && (
                          <span className="glitch text-glow-orange text-brand-orange" data-text="AI">
                            AI
                          </span>
                        )}
                      </span>
                    ))}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>

          <motion.div variants={lineVariants} className="red-divider mb-6" />

          <motion.p
            variants={lineVariants}
            className="text-[clamp(1.1rem,2.5vw,1.6rem)] font-semibold text-white mb-4 leading-tight"
          >
            {HERO.subtext}
          </motion.p>

          <motion.p
            variants={lineVariants}
            className="text-[clamp(0.9rem,1.8vw,1.15rem)] text-brand-gray-text mb-12 max-w-lg leading-relaxed"
          >
            {HERO.subsubtext}
          </motion.p>

          <motion.div variants={lineVariants} className="flex flex-wrap gap-4 mb-10">
            <Link
              href={HERO.cta1.href}
              className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold btn-gradient"
            >
              {HERO.cta1.label}
            </Link>
            <Link
              href={HERO.cta2.href}
              className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold btn-outline"
            >
              {HERO.cta2.label}
            </Link>
          </motion.div>

          <motion.p
            variants={lineVariants}
            className="text-xs tracking-[0.25em] uppercase text-brand-gray-text flex items-center gap-3"
          >
            <span className="w-4 h-px bg-brand-orange/40" />
            {HERO.microtag}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-brand-gray-text">scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-brand-orange/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
