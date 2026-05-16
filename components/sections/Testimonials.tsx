"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-transparent px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-4"
        >
          WHAT PEOPLE SAY
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-16"
        >
          My clients do the talking.
        </motion.h2>

        <div className="relative min-h-52">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5 }}
              className="glass-card-dark rounded-2xl p-5 sm:p-8 md:p-10"
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 leading-snug mb-8">
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand-orange/40 flex-shrink-0">
                  <Image
                    src={TESTIMONIALS[current].avatar}
                    alt={TESTIMONIALS[current].author}
                    fill
                    className="object-cover object-top"
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{TESTIMONIALS[current].author}</p>
                  <p className="text-xs text-brand-gray-text">{TESTIMONIALS[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                current === i ? "bg-brand-orange w-8" : "bg-brand-orange/20 w-4"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
