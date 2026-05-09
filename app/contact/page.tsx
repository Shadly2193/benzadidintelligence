"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CONTACT_EMAIL, SOCIAL_LINKS, SERVICES } from "@/lib/content";

const SVG_ICONS: Record<string, string> = {
  youtube: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z",
  linkedin: "M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z",
  facebook: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
};

const SHOW_SOCIALS = ["youtube", "linkedin", "facebook", "instagram"];

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [calLoaded, setCalLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("on", { action: "__routeChanged", callback: () => setCalLoaded(true) });
      cal("on", { action: "linkReady", callback: () => setCalLoaded(true) });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#FF6A00" } },
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: {
            "cal-bg":              "#ffffff",
            "cal-bg-emphasis":     "#f7f7f7",
            "cal-bg-subtle":       "#f3f4f6",
            "cal-bg-muted":        "#e5e7eb",
            "cal-brand":           "#FF6A00",
            "cal-brand-emphasis":  "#C83205",
            "cal-brand-text":      "#ffffff",
            "cal-text":            "#111827",
            "cal-text-emphasis":   "#000000",
            "cal-text-subtle":     "#6b7280",
            "cal-border":          "rgba(255,106,0,0.25)",
            "cal-border-subtle":   "rgba(255,106,0,0.12)",
            "cal-border-emphasis": "rgba(255,106,0,0.5)",
          },
          dark: {
            "cal-bg":              "#110800",
            "cal-bg-emphasis":     "#1f0e00",
            "cal-bg-subtle":       "#1a0a00",
            "cal-bg-muted":        "#150900",
            "cal-brand":           "#FF6A00",
            "cal-brand-emphasis":  "#C83205",
            "cal-brand-text":      "#ffffff",
            "cal-text":            "#FFF0E0",
            "cal-text-emphasis":   "#ffffff",
            "cal-text-subtle":     "#C8906A",
            "cal-border":          "rgba(255,106,0,0.25)",
            "cal-border-subtle":   "rgba(255,106,0,0.12)",
            "cal-border-emphasis": "rgba(255,106,0,0.5)",
          },
        },
      });
    })();
  }, []);

  const visibleSocials = SOCIAL_LINKS.filter((s) => SHOW_SOCIALS.includes(s.icon));

  return (
    <div className="pt-20 min-h-screen bg-transparent grid-bg">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* ── HEADER ── */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label mb-5">
            GET IN TOUCH
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-4"
          >
            Ready to move forward?<br />
            <span className="text-brand-orange">Let&apos;s talk — it&apos;s free.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base text-brand-gray-text mb-16 max-w-xl"
          >
            Select what you&apos;re interested in, pick a time that works for you, and I&apos;ll come prepared.
          </motion.p>

          {/* ── PRE-BOOKING FIELDS ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-4 sm:p-6 mb-6"
            style={{ background: "rgba(255,106,0,0.04)", border: "1px solid rgba(255,106,0,0.15)" }}
          >
            <p className="section-label mb-5">BEFORE YOU BOOK</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-brand-gray-text uppercase tracking-widest block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rahman"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
                  style={{ background: "rgba(10,6,3,0.7)", border: "1px solid rgba(255,106,0,0.2)" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,106,0,0.55)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,106,0,0.2)")}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-gray-text uppercase tracking-widest block mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
                  style={{ background: "rgba(10,6,3,0.7)", border: "1px solid rgba(255,106,0,0.2)" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,106,0,0.55)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,106,0,0.2)")}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-gray-text uppercase tracking-widest block mb-2">
                  I&apos;m interested in
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-colors"
                  style={{ background: "rgba(10,6,3,0.7)", border: "1px solid rgba(255,106,0,0.2)" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,106,0,0.55)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,106,0,0.2)")}
                  value={selectedService ?? ""}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="" disabled>Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug} style={{ background: "#1a0a03" }}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other" style={{ background: "#1a0a03" }}>Not sure — I need guidance</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* ── CAL.COM CALENDAR ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl overflow-hidden mb-6 relative"
            style={{
              border: "1px solid rgba(255,106,0,0.3)",
              boxShadow: "0 0 40px rgba(255,106,0,0.08)",
              minHeight: "600px",
            }}
          >
            {/* Loading skeleton — shown until Cal iframe signals ready */}
            {!calLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
                style={{ background: "rgba(10,6,3,0.95)" }}>
                <div className="w-8 h-8 rounded-full border-2 border-brand-orange/30 border-t-brand-orange animate-spin" />
                <p className="text-sm text-brand-gray-text">Loading calendar…</p>
              </div>
            )}
            <Cal
              namespace="30min"
              calLink="benzadid-intelligence/30min"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view" }}
            />
          </motion.div>

          {/* Hint */}
          <p className="text-xs text-brand-gray-text text-center mb-16" style={{ opacity: 0.5 }}>
            🔒 I do not take unscheduled calls. Once next steps are clear, we move to a scheduled call or client workspace.
          </p>

          {/* ── SOCIAL + EMAIL ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex gap-3 flex-wrap">
              {visibleSocials.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-gray-text transition-all duration-200"
                  style={{ background: "rgba(255,106,0,0.06)", border: "1px solid rgba(255,106,0,0.15)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,106,0,0.14)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,106,0,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#FF6A00";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,106,0,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,106,0,0.15)";
                    (e.currentTarget as HTMLElement).style.color = "#C8906A";
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
                    <path d={SVG_ICONS[s.icon] ?? ""} />
                  </svg>
                  {s.label}
                </a>
              ))}
            </div>
            <p className="text-xs text-brand-gray-text">
              Or email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-orange hover:underline font-semibold">
                {CONTACT_EMAIL}
              </a>
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
