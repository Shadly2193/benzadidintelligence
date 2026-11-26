"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { AboutMore as AboutMoreData } from "@/lib/seo-defaults";

const up = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

function Accent({ text }: { text: string }) {
  // Last two words in brand orange, like the rest of the site's headings
  const words = text.split(" ");
  if (words.length < 3) return <>{text}</>;
  return (
    <>
      {words.slice(0, -2).join(" ")} <span className="text-brand-orange">{words.slice(-2).join(" ")}</span>
    </>
  );
}

function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const f = () => setD(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return d;
}

// Soft fade on every edge so the photo's black backdrop melts into the page
const fadeMask =
  "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 8%, #000 64%, transparent 100%)";

export default function AboutMore({ data, photo }: { data: AboutMoreData; photo?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const isDesktop = useIsDesktop();
  const wrapRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: wrapP } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const photoY = useTransform(wrapP, [0, 1], [-28, 28]);
  const { scrollYProgress: lineP } = useScroll({ target: journeyRef, offset: ["start 75%", "end 60%"] });
  const lineScale = useTransform(lineP, [0, 1], [0, 1]);

  const portrait = photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo}
      alt="Dr. Md. Shadly Benzadid — AI Generalist and Medical Website Developer"
      className="w-full h-full object-cover object-top"
      style={{ WebkitMaskImage: fadeMask, maskImage: fadeMask, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
      decoding="async"
    />
  ) : null;

  return (
    <div className="relative">
      {/* ── Who is + Journey, with the portrait beside it ── */}
      <section ref={wrapRef} className="px-4 sm:px-6 pt-10 pb-16 lg:py-24 overflow-x-clip">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-0 lg:gap-14">
          {/* Portrait */}
          {portrait && (
            <div className="relative lg:self-stretch">
              {/* The trigger sits on an unclipped wrapper: a fully clipped element never reports as "in view" */}
              <motion.div className="relative lg:sticky lg:top-24" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                <motion.div
                  variants={{
                    hidden: { clipPath: "inset(100% 0 0 0)", scale: 1.05 },
                    show: { clipPath: "inset(0% 0 0 0)", scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  style={isDesktop ? { y: photoY, mixBlendMode: "lighten" } : { mixBlendMode: "lighten" }}
                  className="relative mx-auto w-full max-w-[460px] lg:max-w-none aspect-[4/5] max-h-[70vh] lg:max-h-[calc(100vh-8rem)]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-[12%] top-[18%] bottom-[20%] rounded-full blur-3xl opacity-40"
                    style={{ background: "radial-gradient(circle at 70% 40%, rgba(255,106,0,0.55), transparent 65%)" }}
                  />
                  <div className="relative w-full h-full">{portrait}</div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Text column */}
          <div className={portrait ? "-mt-16 sm:-mt-24 lg:mt-0 relative z-10" : "lg:col-span-2"}>
            <motion.p {...up} className="section-label mb-4 lg:mb-6">ABOUT</motion.p>
            <motion.h2 {...up} className="text-[2rem] leading-[1.08] sm:text-4xl md:text-5xl font-black text-white mb-5 md:mb-6">
              <Accent text={data.whoTitle} />
            </motion.h2>
            <motion.p {...up} transition={{ ...up.transition, delay: 0.1 }} className="text-white/85 text-base md:text-lg leading-relaxed mb-4">
              {data.whoText}
            </motion.p>
            <motion.p {...up} transition={{ ...up.transition, delay: 0.2 }} className="text-brand-gray-text text-[15px] md:text-base leading-relaxed mb-8">
              {data.whoSub}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16 lg:mb-20">
              {data.facts.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
                  className="border-l-[3px] border-brand-orange bg-brand-orange/[0.06] rounded-r-xl px-4 py-3.5 md:px-5 md:py-4 sm:[&:last-child:nth-child(odd)]:col-span-2"
                >
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-brand-orange">{f.label}</p>
                  <p className="text-white text-sm md:text-base">{f.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Journey */}
            <motion.p {...up} className="section-label mb-4">THE JOURNEY</motion.p>
            <motion.h2 {...up} className="text-[2rem] leading-[1.08] sm:text-4xl md:text-5xl font-black text-white mb-8 md:mb-10">
              <Accent text={data.journeyTitle} />
            </motion.h2>
            <div ref={journeyRef} className="relative pl-7 md:pl-9">
              <div className="absolute left-[6px] md:left-[10px] top-0 bottom-0 w-[2px] bg-brand-orange/15" />
              <motion.div
                style={{ scaleY: lineScale, transformOrigin: "top" }}
                className="absolute left-[6px] md:left-[10px] top-0 bottom-0 w-[2px] bg-brand-orange shadow-[0_0_10px_#FF6A00]"
              />
              {data.journey.map((s, i) => (
                <motion.div key={i} {...up} className="relative mb-5 md:mb-6">
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0.3 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-35% 0px -35% 0px" }}
                    transition={{ duration: 0.4 }}
                    className="absolute -left-[27px] md:-left-[33px] top-7 w-3.5 h-3.5 rounded-full bg-brand-orange shadow-[0_0_14px_#FF6A00]"
                  />
                  <div className={`glass-card-dark rounded-2xl p-5 md:p-7 ${s.image ? "grid sm:grid-cols-[1fr_170px] gap-5 items-center" : ""}`}>
                    <div>
                      <p className="text-brand-orange text-xs font-bold tracking-[0.12em] uppercase">{s.period}</p>
                      <h3 className="text-xl md:text-2xl font-black text-white mt-1 mb-3">{s.title}</h3>
                      <ul className="space-y-1.5 text-brand-gray-text text-sm md:text-[15px] list-disc pl-5">
                        {s.points.map((pt, j) => (
                          <li key={j}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                    {s.image && (
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-brand-orange/30">
                        <Image src={s.image} alt={`${s.title} — Dr. Md. Shadly Benzadid`} fill className="object-cover" sizes="(max-width:640px) 100vw, 170px" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── What I do now ── */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.p {...up} className="section-label mb-4">WHAT I DO NOW</motion.p>
          <motion.h2 {...up} className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight">
            <Accent text={data.nowTitle} />
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.cards.map((c, i) => (
              <motion.div
                key={i}
                {...up}
                transition={{ ...up.transition, delay: i * 0.1 }}
                className="glass-card-dark rounded-2xl p-6 md:p-7 flex flex-col transition-transform hover:-translate-y-1"
              >
                <h3 className="text-lg md:text-xl font-black text-white mb-3">{c.title}</h3>
                <p className="text-brand-gray-text text-sm leading-relaxed mb-5 flex-1">{c.text}</p>
                <Link href={c.link} className="text-brand-orange text-sm font-bold">
                  {c.linkText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.numbers.map((n, i) => (
            <motion.div key={i} {...up} transition={{ ...up.transition, delay: i * 0.08 }} className="glass-card-dark rounded-2xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-black text-brand-orange leading-none mb-2">{n.value}</p>
              <p className="text-brand-gray-text text-xs md:text-sm">{n.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <motion.p {...up} className="section-label mb-4">FAQ</motion.p>
          <motion.h2 {...up} className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
            Questions people <span className="text-brand-orange">ask</span>
          </motion.h2>
          {data.faq.map((f, i) => (
            <motion.div key={i} {...up} className="glass-card-dark rounded-xl mb-3 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex justify-between items-center gap-4 text-left px-5 py-4 text-white font-bold"
              >
                <h3 className="text-base md:text-lg">{f.q}</h3>
                <span className="text-brand-orange text-2xl leading-none">{open === i ? "–" : "+"}</span>
              </button>
              {/* Answer stays in the HTML when closed so search engines can read it */}
              <div className={`px-5 text-brand-gray-text text-sm md:text-base leading-relaxed ${open === i ? "pb-5" : "hidden"}`}>{f.a}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
