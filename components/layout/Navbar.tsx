"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, SITE_NAME, SERVICES } from "@/lib/content";

function pitchFor(href: string) {
  const slug = href.split("/").pop();
  const service = SERVICES.find((s) => s.slug === slug);
  return service?.description.split("\n")[0] ?? "";
}

function headlineWithUnderline(title: string) {
  const words = title.split(" ");
  const last = words.pop();
  return (
    <>
      {words.length > 0 && `${words.join(" ")} `}
      <span className="underline decoration-brand-orange decoration-2 underline-offset-8">{last}</span>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeChild, setActiveChild] = useState(0);

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
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 grid grid-cols-[110px_460px] rounded-2xl overflow-hidden shadow-2xl border border-brand-orange/20"
                        style={{
                          background: "rgba(12,7,4,0.98)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                        }}
                      >
                        {/* Left: serif numeral rail */}
                        <div className="py-6 border-r border-brand-orange/10">
                          {link.children.map((child, i) => (
                            <button
                              key={child.href}
                              onMouseEnter={() => setActiveChild(i)}
                              className={`block w-full text-left pl-7 py-2.5 font-serif text-[22px] font-bold transition-colors ${
                                activeChild === i ? "text-brand-orange" : "text-white/20 hover:text-white/50"
                              }`}
                            >
                              0{i + 1}
                            </button>
                          ))}
                        </div>

                        {/* Right: editorial headline panel — all pre-mounted, opacity toggles */}
                        <div className="relative p-9 min-h-[220px]">
                          {link.children.map((child, i) => (
                            <div
                              key={child.href}
                              className={`transition-opacity duration-300 ${
                                activeChild === i ? "opacity-100" : "absolute inset-9 opacity-0 pointer-events-none"
                              }`}
                            >
                              <p className="text-[11px] tracking-[0.25em] uppercase text-brand-gray-text mb-3">
                                Service 0{i + 1}
                              </p>
                              <h2 className="font-serif text-[32px] font-bold leading-[1.05] text-white mb-4">
                                {headlineWithUnderline(child.label)}
                              </h2>
                              <p className="text-sm text-brand-gray-text leading-relaxed max-w-[340px] mb-4">
                                {pitchFor(child.href)}
                              </p>
                              <Link
                                href={child.href}
                                className="text-xs font-bold tracking-wide text-brand-orange"
                              >
                                Explore This Service →
                              </Link>
                            </div>
                          ))}
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
                    {link.children.map((child, i) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-start gap-4 py-4 border-b border-white/6 last:border-b-0"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="font-serif text-2xl font-bold text-brand-orange/50 flex-shrink-0">
                          0{i + 1}
                        </span>
                        <span>
                          <span className="block font-serif text-base font-bold text-white mb-1">
                            {child.label}
                          </span>
                          <span className="block text-xs text-brand-gray-text leading-relaxed">
                            {pitchFor(child.href)}
                          </span>
                        </span>
                      </Link>
                    ))}
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
