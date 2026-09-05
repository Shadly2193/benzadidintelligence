"use client";
import { motion } from "framer-motion";
import AutoPlayVideo from "@/components/ui/AutoPlayVideo";

const videos = [
  {
    src: "/videos/automation.mp4",
    label: "AI AUTOMATION",
    title: "See the agents work in real-time",
    desc: "This is a live demo of the AI automation pipeline I built — from data input to auto-published content, zero manual work.",
  },
  {
    src: "/videos/website-show.mp4",
    label: "AI WEBSITE BUILD",
    title: "From blank canvas to live website",
    desc: "Watch how I vibe-code a professional website using AI tools — fast, precise, and built to convert.",
  },
];

export default function VideoShowcase() {
  return (
    <section className="py-24 px-6 bg-transparent grid-bg">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          SEE IT IN ACTION
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-white mb-14 leading-tight"
        >
          Don&apos;t take my word.
          <br />
          <span className="text-brand-gray-text">Watch me build it.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card-dark rounded-2xl overflow-hidden cyber-corner"
            >
              <div className="video-glass-border rounded-none border-0">
                <AutoPlayVideo
                  src={video.src}
                  className="w-full aspect-video object-cover"
                />
              </div>
              <div className="p-6">
                <p className="section-label mb-3">{video.label}</p>
                <h3 className="text-xl font-black text-white mb-2">{video.title}</h3>
                <p className="text-sm text-brand-gray-text leading-relaxed">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
