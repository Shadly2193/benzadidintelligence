"use client";
import { motion } from "framer-motion";
import AutoPlayVideo from "@/components/ui/AutoPlayVideo";

const videos = [
  {
    src: "/videos/sikder-dental-point.mp4",
    label: "AI WEBSITE BUILD",
    title: "Sikder Dental Point",
    desc: "A clean, fast dental practice website built to convert visitors into patients.",
    link: "https://sikdar-dental-site.vercel.app/",
  },
  {
    src: "/videos/fouzia-dental-care.mp4",
    label: "AI WEBSITE BUILD",
    title: "Fouzia Dental Care",
    desc: "Modern dental care website designed for trust and easy appointment booking.",
    link: "https://fouziadentalcare.com/",
  },
  {
    src: "/videos/dr-rajarshi-nag-orthopedic.mp4",
    label: "AI WEBSITE BUILD",
    title: "Dr. Rajarshi Nag — Orthopedic Surgeon",
    desc: "Professional orthopedic surgeon website built for patient confidence and clarity.",
    link: "https://dr-rajarshi-nag-website.vercel.app/",
  },
  {
    src: "/videos/dr-nahal-ophthalmologist.mp4",
    label: "AI WEBSITE BUILD",
    title: "Dr. Nahal — Ophthalmologist",
    desc: "Sleek ophthalmology website showcasing expertise and patient-first care.",
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
          {videos.map((video, i) => {
            const cardContent = (
              <>
                <div className="relative video-glass-border rounded-none border-0">
                  {video.link && (
                    <div
                      className="absolute top-3 right-3 z-10 flex items-center gap-1.5 text-xs font-bold tracking-wide px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "rgba(255,106,0,0.85)",
                        color: "#0a0603",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      Click to Watch the Website
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth={2.5}>
                        <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
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
              </>
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card-dark rounded-2xl overflow-hidden cyber-corner"
              >
                {video.link ? (
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className="group">{cardContent}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/services/website"
            className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold btn-red"
          >
            Watch More →
          </a>
        </div>
      </div>
    </section>
  );
}
