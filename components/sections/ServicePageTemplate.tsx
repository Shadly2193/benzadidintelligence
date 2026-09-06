"use client";
import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import ScrollCue from "@/components/ui/ScrollCue";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  number: string;
  slug: string;
  title: string;
  bigHeadline: string[];
  pain: string;
  description: string;
  cta: { label: string; href: string };
  features: string[];
  pricing: string;
  bestFor: string;
}

interface ServicePageTemplateProps {
  service: Service;
  afterHeroSlot?: React.ReactNode;
  beforeWhatYouGetSlot?: React.ReactNode;
  whatYouGetHeadline?: React.ReactNode;
}

const PROCESS_STEPS = [
  "Discovery Call — I understand your goals (30 min, free)",
  "Blueprint — I design the approach and get your approval",
  "Build — I develop and integrate everything",
  "Review — Revisions and testing",
  "Launch — Handover with full documentation",
];

export default function ServicePageTemplate({
  service,
  afterHeroSlot,
  beforeWhatYouGetSlot,
  whatYouGetHeadline,
}: ServicePageTemplateProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(line1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(line2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.3");
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div className="pt-20">
      {/* Pinned pain hook */}
      <section
        ref={pinRef}
        className="relative min-h-screen flex items-center justify-center bg-transparent px-6 text-center grid-bg"
      >
        <div className="max-w-4xl">
          <p className="section-label mb-8 justify-center">
            {service.title.toUpperCase()}
          </p>
          {service.pain.split("\n").map((line, i) => (
            <div
              key={i}
              ref={i === 0 ? line1Ref : i === 1 ? line2Ref : undefined}
              className={`text-xl sm:text-2xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 opacity-0 ${
                i === 0 ? "text-white" : "text-brand-gray-text"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
        <ScrollCue containerRef={pinRef} />
      </section>

      {afterHeroSlot}

      {/* Big headline */}
      <section className="py-24 bg-transparent px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={heroRef}>
            {service.bigHeadline.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight"
              >
                {line}
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-lg text-brand-gray-text max-w-xl"
            >
              {service.description.split("\n")[0]}
            </motion.p>
          </div>
        </div>
      </section>

      {beforeWhatYouGetSlot}

      {/* What you get */}
      <section className="py-24 bg-transparent px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">
          <div>
            <p className="section-label mb-6">WHAT YOU GET</p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl md:text-5xl font-black text-white mb-8"
            >
                {whatYouGetHeadline ?? <>A system that works<br />as hard as you do.</>}
            </motion.h2>
            <p className="text-sm text-brand-gray-text leading-relaxed mb-6">
              Best for: <span className="font-semibold text-white">{service.bestFor}</span>
            </p>
            <div className="space-y-3">
              {service.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Process */}
            <GlassCard>
              <p className="section-label mb-4">PROCESS</p>
              <div className="space-y-3">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-sm text-white/70">{step}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Pricing CTA */}
            <GlassCard redTop className="text-center">
              <p className="text-3xl font-black text-white mb-2">{service.pricing}</p>
              <p className="text-sm text-brand-gray-text mb-6">
                Free 30-minute discovery call included
              </p>
              <Link
                href="/contact"
                className="inline-flex w-full justify-center items-center px-6 py-3.5 rounded-full text-sm font-bold btn-red"
              >
                Book Discovery Call →
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}
