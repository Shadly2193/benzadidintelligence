"use client";
import { motion } from "framer-motion";

export default function FaceShowcase() {
  return (
    <section className="relative overflow-hidden bg-transparent py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="section-label mb-8">THE PERSON BEHIND THE WORK</p>
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-black text-white leading-[1.05] mb-6 tracking-tight">
            Not a tool.<br />
            <span className="neon-text">A thinking partner.</span>
          </h2>
          <div className="red-divider mb-6" />
          <p className="text-[clamp(0.9rem,1.6vw,1.1rem)] text-brand-gray-text leading-relaxed max-w-2xl">
            From running a dental clinic to leading AI transformations — every solution I build
            carries a practitioner&apos;s eye for what actually works in the real world.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
