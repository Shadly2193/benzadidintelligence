"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { SERVICES } from "@/lib/content";

const TUTORIALS = [
  { videoId: "YxNGS6qKyKk", title: "This Dental Website Looks Developer-Built — I Made It With AI", tag: "Website" },
  { videoId: "iaaRB8i2EUs", title: "Best AI Tools for Content Creation", tag: "Content" },
  { videoId: "BZSlrHejrLo", title: "AI Image Style Guide | 20+ Styles for Beginners", tag: "Image AI" },
  { videoId: "FRWbN-RBGEU", title: "AI Camera Shot Guide | Full Tutorial", tag: "Image AI" },
  { videoId: "_N4vorm9I0o", title: "The Secret Formula for AI Image Prompting", tag: "Prompting" },
  { videoId: "3ZJD91RWaqA", title: "How To Make Commercial AI Images", tag: "Content" },
  { videoId: "9YdvE5SHvkg", title: "Google AI Studio — More Powerful Than You Think", tag: "Tools" },
  { videoId: "0xlGr_3AdYg", title: "I Made a Full Annual Report in 10 Minutes With AI", tag: "Productivity" },
  { videoId: "suNIannuMRw", title: "What Is an API — And Why Your AI Agent Needs It", tag: "AI Agents" },
  { videoId: "fL5wrhGTg3c", title: "What Is an AI Agent? Super Simple Explanation", tag: "AI Agents" },
];

function TutorialGrid() {
  return (
    <section className="py-24 bg-transparent px-6">
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-6">LEARN FROM ME — FREE</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
        >
          Start learning before you spend a penny.
        </motion.h2>
        <p className="text-brand-gray-text mb-4 max-w-xl">
          Every video below is free. Watch, learn, implement. If these help you — imagine what a personal session can do.
        </p>

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <a
            href="https://www.youtube.com/@benzadidintelligence"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold btn-red"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
            </svg>
            Subscribe to My YouTube Channel →
          </a>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TUTORIALS.map((t, i) => (
            <motion.a
              key={i}
              href={`https://www.youtube.com/watch?v=${t.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group block rounded-2xl overflow-hidden video-glass-border"
            >
              <div className="relative" style={{ aspectRatio: "16/9" }}>
                {/* YouTube thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${t.videoId}/mqdefault.jpg`}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-brand-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,106,0,0.25)", border: "1px solid rgba(255,106,0,0.6)" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand-orange ml-0.5" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-md"
                    style={{ background: "rgba(10,6,3,0.7)", border: "1px solid rgba(255,106,0,0.3)", color: "#FF6A00" }}
                  >
                    {t.tag}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-white leading-snug group-hover:text-brand-orange transition-colors duration-200">
                  {t.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Personal guidance CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 rounded-2xl p-8 md:p-12 text-center"
          style={{
            background: "rgba(255,106,0,0.06)",
            border: "1px solid rgba(255,106,0,0.2)",
          }}
        >
          <p className="section-label mb-4 justify-center">READY FOR MORE?</p>
          <h3 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
            Free content takes you far.<br />
            <span className="text-brand-orange">Personal guidance takes you further.</span>
          </h3>
          <p className="text-brand-gray-text max-w-lg mx-auto mb-8 text-sm md:text-base">
            If you need a clear direction for your AI journey, 1-on-1 mentorship tailored to your profession,
            or structured capacity building for your team — I&apos;m available.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold btn-red"
          >
            I want personal guidance from you →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function MentorshipServicePage() {
  const service = SERVICES.find((s) => s.slug === "guidance")!;
  return (
    <ServicePageTemplate
      service={service}
      afterHeroSlot={<TutorialGrid />}
      whatYouGetHeadline={
        <>
          YouTube gets you started.<br />
          <span style={{ color: "#FF6A00" }}>This gets you there.</span>
        </>
      }
    />
  );
}
