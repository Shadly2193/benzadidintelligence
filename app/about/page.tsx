"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_PAGE } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const timelineImages = [
  { src: "/images/about-walking-confidently.png", alt: "Shadly walking confidently" },
  { src: "/images/about-style-1.png", alt: "Shadly in AI builder style" },
  { src: "/images/about-talking-with-clients.png", alt: "Shadly talking with clients" },
];

const HERO_SENTENCES = [
  { text: "I spent a decade trying to heal the world.", accent: false },
  { text: "Dental surgeon. Public health researcher. Nine published papers.", accent: false },
  { text: "Six years in humanitarian aid — on the ground, in the field.", accent: false },
  { text: "Then in 2022, AI walked in. And everything shifted.", accent: false },
  { text: "1,100 students. Bangladesh's top AI agency. No going back.", accent: false },
  { text: "Now I build what the future runs on.", accent: true },
];

export default function AboutPage() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero pinned scroll reveal (sentences appear one by one) ──
      const sentences = heroSectionRef.current?.querySelectorAll<HTMLElement>(".hero-sentence");
      if (sentences && sentences.length > 0) {
        // Hide all sentences initially except the first
        sentences.forEach((s, i) => {
          gsap.set(s, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40, position: "absolute", top: 0, left: 0, right: 0 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: `+=${sentences.length * 70}%`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        });

        for (let i = 1; i < sentences.length; i++) {
          tl.to(sentences[i - 1], { opacity: 0, y: -30, duration: 0.4 }, "+=0.5")
            .to(sentences[i], { opacity: 1, y: 0, duration: 0.5 }, "-=0.1");
        }
        tl.to({}, { duration: 1.0 });
      }

      // ── Timeline pinned scroll reveal ──
      const entries = timelineRef.current?.querySelectorAll<HTMLElement>(".timeline-entry");
      if (entries && entries.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top top",
            end: `+=${entries.length * 120}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(entries[0], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });

        for (let i = 1; i < entries.length; i++) {
          tl.to(entries[i - 1], { opacity: 0, y: -30, duration: 0.6 }, "+=0.4")
            .fromTo(entries[i], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=0.2");
        }
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div className="pt-20">

      {/* ── Hero ── */}
      <section ref={heroSectionRef} className="relative overflow-hidden" style={{ height: "100vh" }}>

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
        />
        {/* Dark gradient veil — heavier on edges, clear in center */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(10,6,3,0.75) 0%, rgba(10,6,3,0.15) 35%, rgba(10,6,3,0.15) 65%, rgba(10,6,3,0.75) 100%)"
        }} />
        <div className="absolute inset-0 bg-brand-black/20" />

        {/* Left — story sentences (floating, no panel) */}
        <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-[36%] flex-col justify-center px-10 md:px-14">
          <p className="section-label mb-10">THE STORY BEHIND BENZADID</p>
          {/* Sentence container — fixed height so layout doesn't shift */}
          <div className="relative" style={{ height: "clamp(120px, 18vw, 200px)" }}>
            {HERO_SENTENCES.map((s, i) => (
              <div key={i} className="hero-sentence">
                <p className={`font-black leading-tight text-[clamp(1.6rem,3vw,2.8rem)] ${s.accent ? "text-brand-orange" : "text-white"}`}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-sm md:text-base text-brand-gray-text leading-relaxed max-w-xs"
          >
            {ABOUT_PAGE.subtext}
          </motion.p>
        </div>

        {/* Right — quick facts (floating, no panel) */}
        <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-[30%] flex-col justify-center px-8 md:px-12">
          <p className="section-label mb-8">QUICK FACTS</p>
          <div className="space-y-5">
            {[
              { label: "Background", value: "Dental Surgeon → AI Generalist" },
              { label: "Students Mentored", value: "1,100+" },
              { label: "Professional Website Built", value: "20+" },
              { label: "Focus", value: "AI Vibe-coding & AI Agent Automation" },
            ].map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="border-l-2 border-brand-orange/40 pl-4"
              >
                <p className="text-xs font-bold tracking-widest text-brand-orange/60 uppercase mb-0.5">{fact.label}</p>
                <p className="text-sm md:text-base text-white font-semibold">{fact.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile hero content — shown only on mobile since sidebars are hidden */}
        <div className="md:hidden absolute inset-0 flex flex-col justify-center px-6 pt-8">
          <p className="section-label mb-6">THE STORY BEHIND BENZADID</p>
          <p className="font-black text-2xl text-white leading-tight mb-2">
            From clinic to code.
          </p>
          <p className="font-black text-2xl text-brand-orange leading-tight mb-6">
            AI changed everything.
          </p>
          <p className="text-sm text-brand-gray-text leading-relaxed mb-8 max-w-xs">
            {ABOUT_PAGE.subtext}
          </p>
          <div className="space-y-3">
            {[
              { label: "Background", value: "Dental Surgeon → AI Generalist" },
              { label: "Students Mentored", value: "1,100+" },
              { label: "Focus", value: "AI Vibe-coding & AI Agents" },
            ].map((fact, i) => (
              <div key={i} className="border-l-2 border-brand-orange/40 pl-3">
                <p className="text-xs font-bold tracking-widest text-brand-orange/60 uppercase mb-0.5">{fact.label}</p>
                <p className="text-sm text-white font-semibold">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <p className="text-xs tracking-widest text-white/30 uppercase">Scroll</p>
          <div className="w-px h-10 bg-gradient-to-b from-brand-orange/50 to-transparent" />
        </motion.div>
      </section>

      {/* ── Pinned Timeline Scroll Reveal ── */}
      <section
        ref={timelineRef}
        className="relative bg-transparent px-6 grid-bg"
        style={{ height: "100vh" }}
      >
        <p className="absolute top-10 left-1/2 -translate-x-1/2 section-label z-10">MY JOURNEY</p>

        <div className="max-w-6xl mx-auto h-full relative">
          {ABOUT_PAGE.timeline.map((entry, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className="timeline-entry absolute inset-0 flex items-center opacity-0"
              >
                <div
                  className={`w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center ${
                    isEven ? "" : "md:[direction:rtl]"
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative h-[45vh] min-h-[240px] md:h-[calc(100vh-7rem)] md:min-h-[620px] overflow-visible group ${
                      isEven ? "" : "md:[direction:ltr]"
                    }`}
                  >
                    <Image
                      src={timelineImages[i]?.src || "/images/about.png"}
                      alt={timelineImages[i]?.alt || entry.role}
                      fill
                      className="object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="600px"
                    />
                    <div className="absolute bottom-4 left-4 glass-card-dark rounded-xl px-4 py-2">
                      <p className="text-xs font-bold tracking-widest text-brand-orange uppercase">{entry.period}</p>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={isEven ? "" : "md:[direction:ltr]"}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-3 h-3 rounded-full bg-brand-orange neon-dot flex-shrink-0" />
                      <div className="h-px flex-1 bg-gradient-to-r from-brand-orange/40 to-transparent" />
                    </div>
                    <p className="section-label mb-4">{entry.period}</p>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                      {entry.role}
                    </h3>
                    <div className="glass-card-dark rounded-2xl p-6 cyber-corner">
                      <p className="text-base text-white/75 leading-relaxed">{entry.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Who I am now ── */}
      <section className="relative min-h-screen bg-transparent px-6 overflow-hidden flex items-center">
        <Image
          src="/images/about-today-work-page.jpeg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,760px)_minmax(340px,440px)] gap-10 lg:gap-14 items-center justify-between py-24">
          <div className="glass-card-dark cyber-corner rounded-2xl p-7 md:p-9 max-w-[760px]">
            <p className="section-label mb-8">TODAY</p>
            {ABOUT_PAGE.philosophy.big.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 }}
                className="text-[clamp(1.5rem,3vw,3.25rem)] font-black text-white mb-3 leading-[1.08] md:whitespace-nowrap"
              >
                {line}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="space-y-5 max-w-[440px] lg:justify-self-end"
          >
            {ABOUT_PAGE.philosophy.sub.split("\n").map((line, i) => (
              <div key={i} className="border-l-2 border-brand-orange/40 pl-4">
                <p className="text-sm md:text-base text-white font-semibold leading-relaxed">
                  {line}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-transparent px-6 text-center grid-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/8 to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight"
          >
            Ready to work together?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/services/website" className="px-8 py-4 rounded-full text-sm font-bold btn-red">
              See Services →
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full text-sm font-bold btn-outline"
            >
              Book a Call →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
