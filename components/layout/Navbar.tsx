"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ShieldCheck, Users } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/content";

interface Glimpse {
  kind: "video" | "icon";
  src?: string;
  icon?: "audit" | "mentor";
  label?: string;
}

const GLIMPSES: Record<string, Glimpse> = {
  "/services/website": { kind: "video", src: "/videos/sikder-dental-point.mp4" },
  "/services/automation": { kind: "video", src: "/videos/automation.mp4" },
  "/services/content": { kind: "video", src: "/videos/icecream-ad.mp4" },
  "/services/audit": { kind: "icon", icon: "audit", label: "AUDIT" },
  "/services/guidance": { kind: "icon", icon: "mentor", label: "MENTORSHIP" },
};

function GlimpsePanel({ href, title }: { href: string; title: string }) {
  const glimpse = GLIMPSES[href];
  if (!glimpse) return null;
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-brand-orange/20">
      {glimpse.kind === "video" ? (
        <video
          src={glimpse.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-3"
          style={{ background: "linear-gradient(135deg, rgba(255,106,0,0.14), rgba(200,50,5,0.06))" }}
        >
          {glimpse.icon === "audit" ? (
            <ShieldCheck className="w-8 h-8 text-brand-orange" />
          ) : (
            <Users className="w-8 h-8 text-brand-orange" />
          )}
          <span className="text-[11px] tracking-widest uppercase text-brand-gray-text">{glimpse.label}</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-sm font-bold text-white bg-gradient-to-t from-black/85 to-transparent">
        {title}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeChild, setActiveChild] = useState(0);
  const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0603]/85 backdrop-blur-md shadow-lg border-b border-white/8"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/images/logo.png"
              alt={SITE_NAME}
              style={{ height: "clamp(40px, 10vw, 58px)", width: "auto", display: "block" }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-[#FF6A00] transition-colors">
                    {link.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 grid grid-cols-[240px_360px] rounded-2xl overflow-hidden shadow-2xl border border-brand-orange/20"
                        style={{
                          background: "rgba(12,7,4,0.98)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                        }}
                      >
                        {/* Left: service list */}
                        <div className="py-3 border-r border-brand-orange/10">
                          {link.children.map((child, i) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onMouseEnter={() => setActiveChild(i)}
                              className={`flex items-center gap-3 px-6 py-3.5 text-sm font-semibold border-l-2 transition-all ${
                                activeChild === i
                                  ? "text-white bg-brand-orange/10 border-brand-orange"
                                  : "text-white/65 border-transparent hover:text-white hover:bg-brand-orange/5"
                              }`}
                            >
                              <span className={`text-[11px] font-bold ${activeChild === i ? "text-brand-orange" : "text-white/25"}`}>
                                0{i + 1}
                              </span>
                              {child.label}
                            </Link>
                          ))}
                        </div>

                        {/* Right: glimpse preview */}
                        <div className="p-5">
                          <div className="w-full h-full min-h-[220px]">
                            <GlimpsePanel
                              href={link.children[activeChild]?.href ?? link.children[0].href}
                              title={link.children[activeChild]?.label ?? link.children[0].label}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-[#FF6A00] transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold btn-red"
            >
              Get In Touch With Me
            </Link>
            <button
              className="md:hidden p-3 text-white/80"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0a0603]/92 backdrop-blur-md border-b border-white/8 shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-2">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label} className="mb-2">
                    <p className="text-xs font-bold tracking-widest text-brand-gray-text uppercase mb-2 px-1">
                      {link.label}
                    </p>
                    {link.children.map((child, i) => {
                      const isOpen = mobileAccordion === i;
                      return (
                        <div key={child.href} className="border-b border-white/6 last:border-b-0">
                          <button
                            className="w-full flex items-center justify-between py-3 pl-3 pr-1 text-sm font-semibold text-white/80"
                            onClick={() => setMobileAccordion(isOpen ? null : i)}
                          >
                            {child.label}
                            <ChevronDown
                              className={`w-4 h-4 text-brand-orange transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-3 pb-4">
                                  <div className="h-32 rounded-xl overflow-hidden mb-3">
                                    <GlimpsePanel href={child.href} title={child.label} />
                                  </div>
                                  <Link
                                    href={child.href}
                                    className="inline-flex items-center text-xs font-bold text-brand-orange"
                                    onClick={() => {
                                      setMobileOpen(false);
                                      setMobileAccordion(null);
                                    }}
                                  >
                                    View {child.label} →
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-base font-semibold text-white/80 hover:text-[#FF6A00] transition-colors py-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/contact"
                className="mt-2 inline-flex justify-center items-center px-5 py-3 rounded-full text-sm font-semibold btn-red"
                onClick={() => setMobileOpen(false)}
              >
                Get In Touch With Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
