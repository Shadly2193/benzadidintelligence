"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FINAL_CTA } from "@/lib/content";

export default function FinalCTA() {

  return (
    <section className="py-24 bg-transparent px-6 overflow-hidden relative grid-bg">
      {/* Purple gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/8 via-transparent to-brand-orange/4 pointer-events-none" />
      <div className="absolute top-8 left-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-l-2 border-t-2 border-brand-orange/30 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-r-2 border-b-2 border-brand-orange/30 pointer-events-none" />
      {/* Brand icon watermark */}
      <img
        src="/images/logo-icon.png"
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", top: "16px", right: "16px", height: "clamp(48px, 8vw, 96px)", width: "auto", opacity: 0.08, pointerEvents: "none", userSelect: "none" }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Big text */}
        <div className="mb-16">
          <p className="section-label mb-8">THE BOTTOM LINE</p>
          {FINAL_CTA.bigText.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight"
            >
              {line}
            </motion.div>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-lg text-white/50"
          >
            {FINAL_CTA.subtext}
          </motion.p>
        </div>

        {/* Question */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label text-white/40 mb-8"
        >
          WHAT DO YOU NEED?
        </motion.p>

        {/* Choice cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {FINAL_CTA.options.map((option, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={option.href}
                className="group block w-full text-left glass-card-dark rounded-2xl p-5 transition-all duration-300 cyber-corner hover:border-brand-orange/60 hover:bg-brand-orange/12 hover:shadow-[0_0_30px_rgba(200,50,5,0.18)]"
              >
                <p className="text-sm font-black text-white mb-2 leading-snug">{option.title}</p>
                <p className="text-xs text-white/40 leading-relaxed mb-4">{option.description}</p>
                <p className="text-xs font-bold tracking-widest text-white/20 group-hover:text-brand-orange transition-colors">
                  {option.cta.toUpperCase()}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
