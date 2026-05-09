"use client";
import { motion } from "framer-motion";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { TRUST_STATS } from "@/lib/content";

export default function TrustStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="bg-transparent py-6 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-black neon-text">
                  <CountUpNumber
                    target={stat.number}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-xs text-brand-gray-text mt-0.5 whitespace-nowrap">{stat.label}</p>
              </div>
              {i < TRUST_STATS.length - 1 && (
                <span className="hidden md:block w-px h-8 bg-brand-orange/15" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
