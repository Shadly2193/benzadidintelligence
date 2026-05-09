"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { TRUST_STATS, CASE_STUDIES } from "@/lib/content";
import DecryptText from "@/components/ui/DecryptText";

export default function ProofOfWork() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 purple-gradient-bg px-6">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-4"
        >
          <DecryptText text="[PROOF OF WORK]" />
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-white mb-16 leading-tight"
        >
          Built. Shipped.
          <br />
          Measured.
        </motion.h2>

        {/* Count-up stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {TRUST_STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-orange">
                <CountUpNumber target={stat.number} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-brand-gray-text mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Case study carousel */}
        <div className="relative overflow-hidden rounded-2xl min-h-80">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card-dark rounded-2xl p-5 sm:p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <p className="text-xs font-bold tracking-widest text-brand-orange uppercase mb-2">
                    {CASE_STUDIES[current].category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                    {CASE_STUDIES[current].title}
                  </h3>
                  <p className="text-sm text-brand-gray-text leading-relaxed mb-4">
                    <span className="font-semibold text-white">Challenge: </span>
                    {CASE_STUDIES[current].problem}
                  </p>
                  <p className="text-sm text-brand-gray-text leading-relaxed mb-6">
                    <span className="font-semibold text-white">Solution: </span>
                    {CASE_STUDIES[current].solution}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {CASE_STUDIES[current].tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 text-xs font-medium bg-brand-orange/8 rounded-full text-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  {CASE_STUDIES[current].href && (
                    <Link
                      href={CASE_STUDIES[current].href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold btn-red"
                    >
                      {CASE_STUDIES[current].cta ?? "Explore this service →"}
                    </Link>
                  )}
                </div>
                <div className="md:w-64 flex flex-col justify-center gap-3">
                  <p className="text-xs font-bold tracking-widest uppercase text-brand-gray-text mb-2">
                    Results
                  </p>
                  {CASE_STUDIES[current].results.map((result) => (
                    <div
                      key={result}
                      className="px-4 py-2 bg-brand-orange/8 border border-brand-orange/20 rounded-xl text-sm font-bold text-brand-orange text-center"
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {CASE_STUDIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    current === i ? "bg-brand-orange w-8" : "bg-brand-orange/20 w-4"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrent((p) => (p - 1 + CASE_STUDIES.length) % CASE_STUDIES.length)}
                className="w-9 h-9 rounded-full glass-card-dark flex items-center justify-center text-white hover:border-brand-orange/30 transition-all text-sm"
              >
                ←
              </button>
              <button
                onClick={() => setCurrent((p) => (p + 1) % CASE_STUDIES.length)}
                className="w-9 h-9 rounded-full glass-card-dark flex items-center justify-center text-white hover:border-brand-orange/30 transition-all text-sm"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
