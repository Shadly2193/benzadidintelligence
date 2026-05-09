"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const YOUTUBE_CHANNEL = "https://www.youtube.com/@benzadidintelligence";

const videos = [
  { id: "rD1RuVPIpQE", title: "How I Build AI Agents with n8n" },
  { id: "suNIannuMRw", title: "My Explanation on AI Agents" },
  { id: "YxNGS6qKyKk", title: "This Should Be A Dental Surgeon's Website Design" },
];

export default function YouTubeSection() {
  return (
    <section className="py-24 purple-gradient-bg px-6">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          LEARN FOR FREE FIRST
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white mb-4 leading-tight"
        >
          I teach what I practice.
          <br />
          <span className="text-brand-orange text-glow-orange">Watch before you hire.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base text-brand-gray-text mb-14 max-w-xl"
        >
          Every video is a real technique I use in client work. No padding. No recycled advice. Just what works.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-dark rounded-2xl overflow-hidden cyber-corner"
            >
              <div className="video-glass-border rounded-none border-0">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=1&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-white/80">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Link
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold btn-red gap-2"
        >
          Visit My YouTube Channel →
        </Link>
      </div>
    </section>
  );
}
