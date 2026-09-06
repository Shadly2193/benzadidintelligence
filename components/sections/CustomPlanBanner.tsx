"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const POINTS = [
  "Patient data tracking & management systems",
  "Payment gateway integration",
  "Custom features built around your exact workflow",
  "Hospital / multi-department / software-based platforms",
];

export default function CustomPlanBanner() {
  return (
    <section className="px-6 -mt-4 mb-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(255,106,0,0.3)",
        }}
      >
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-orange/10 border border-brand-orange/30">
            <Sparkles className="w-5 h-5 text-brand-orange" />
          </div>
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest uppercase text-brand-orange mb-1">
            Need Something Custom?
          </p>
          <h4 className="text-lg sm:text-xl font-black text-white mb-2">
            For hospitals, clinics, and healthcare software platforms that need more than a website.
          </h4>
          <p className="text-sm text-brand-gray-text leading-relaxed mb-3 max-w-2xl">
            Patient data tracking, payment integration, or systems that talk to your existing
            software — that's a different conversation, and it deserves a proper one.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-1">
            {POINTS.map((p, i) => (
              <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                <span className="text-brand-orange mt-0.5">•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-2">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold btn-outline whitespace-nowrap"
          >
            Book a Requirements Call →
          </Link>
          <p className="text-[11px] text-brand-gray-text">Custom quotation within 7 days</p>
        </div>
      </motion.div>
    </section>
  );
}
