"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_SNIPPET } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSnippet() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null); // "I went all in on AI."
  const line2Ref = useRef<HTMLDivElement>(null); // "Built."
  const line3Ref = useRef<HTMLDivElement>(null); // "Trained."
  const line4Ref = useRef<HTMLDivElement>(null); // "Delivered."
  const line5Ref = useRef<HTMLDivElement>(null); // "Now I build for you."
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=420%",
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
        },
      });

      const step = { duration: 1, ease: "power2.out" };
      const from = { opacity: 0, y: 40 };
      const to = { opacity: 1, y: 0 };

      tl.fromTo(labelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo(line1Ref.current, from, { ...to, ...step }, "-=0.1")
        .fromTo(line2Ref.current, from, { ...to, ...step }, "+=0.3")
        .fromTo(line3Ref.current, from, { ...to, ...step }, "+=0.3")
        .fromTo(line4Ref.current, from, { ...to, ...step }, "+=0.3")
        .fromTo(line5Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "+=0.3")
        .fromTo(cardRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }, "+=0.3")
        .fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "+=0.2");
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center bg-transparent overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-[1fr_420px] gap-5 md:gap-10 items-center">

        {/* Left: sequential text */}
        <div>
          <p ref={labelRef} className="section-label mb-10 opacity-0">
            {ABOUT_SNIPPET.label}
          </p>

          <div ref={line1Ref} className="font-black leading-none mb-3 opacity-0 text-white text-[clamp(2.2rem,4.5vw,4.5rem)]">
            I went all in on AI.
          </div>
          <div ref={line2Ref} className="font-black leading-none mb-3 opacity-0 text-white text-[clamp(2.2rem,4.5vw,4.5rem)]">
            Built.
          </div>
          <div ref={line3Ref} className="font-black leading-none mb-3 opacity-0 text-white text-[clamp(2.2rem,4.5vw,4.5rem)]">
            Trained.
          </div>
          <div ref={line4Ref} className="font-black leading-none mb-3 opacity-0 text-white text-[clamp(2.2rem,4.5vw,4.5rem)]">
            Delivered.
          </div>
          <div ref={line5Ref} className="font-black leading-none mb-10 opacity-0 text-brand-orange text-glow-orange text-[clamp(2.5rem,5vw,5rem)]">
            Now I build for you.
          </div>

          <div ref={ctaRef} className="opacity-0">
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold btn-red"
            >
              {ABOUT_SNIPPET.cta.label}
            </Link>
          </div>
        </div>

        {/* Right: glass card */}
        <div ref={cardRef} className="opacity-0">
          <div
            className="rounded-2xl p-5 md:p-8"
            style={{
              background: "rgba(200, 50, 5, 0.15)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 106, 0, 0.25)",
              boxShadow: "0 4px 32px rgba(200,50,5,0.1)",
            }}
          >
            {ABOUT_SNIPPET.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-white/80 leading-relaxed mb-5 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
