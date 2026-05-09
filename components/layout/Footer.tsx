"use client";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_TAGLINE, SOCIAL_LINKS, CONTACT_EMAIL, NAV_LINKS } from "@/lib/content";

const SocialIcon = ({ icon }: { icon: string }) => {
  const map: Record<string, { label: string; svg: string }> = {
    youtube: {
      label: "YT",
      svg: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z",
    },
    facebook: {
      label: "FB",
      svg: "M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z",
    },
    instagram: {
      label: "IG",
      svg: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
    },
    linkedin: {
      label: "in",
      svg: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
    },
    twitter: {
      label: "𝕏",
      svg: "M18.24 0h3.55l-7.76 8.87L23.2 24h-7.15l-5.6-7.32L4.36 24H.8l8.31-9.5L0 0h7.33l5.06 6.7L18.24 0zm-1.24 21.56h1.97L7.1 2.04H4.98l12.02 19.52z",
    },
    pinterest: {
      label: "P",
      svg: "M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.44 7.63 11.22-.1-.96-.2-2.44.04-3.49.22-.93 1.47-6.24 1.47-6.24s-.38-.76-.38-1.88c0-1.76 1.02-3.07 2.28-3.07 1.08 0 1.6.81 1.6 1.78 0 1.08-.69 2.7-1.05 4.2-.3 1.26.62 2.28 1.85 2.28 2.22 0 3.71-2.87 3.71-6.27 0-2.58-1.73-4.53-4.9-4.53-3.57 0-5.81 2.67-5.81 5.65 0 1.03.3 1.75.77 2.32.22.26.25.36.17.66-.06.22-.19.74-.24.94-.08.31-.33.42-.6.31-1.67-.69-2.45-2.52-2.45-4.59 0-3.41 2.89-7.53 8.61-7.53 4.63 0 7.67 3.37 7.67 6.99 0 4.8-2.66 8.4-6.57 8.4-1.32 0-2.56-.71-2.98-1.51l-.81 3.12c-.3 1.12-.87 2.25-1.41 3.13C10.68 23.93 11.33 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z",
    },
    tiktok: {
      label: "TT",
      svg: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z",
    },
  };
  const item = map[icon];
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d={item?.svg ?? ""} />
    </svg>
  );
};

export default function Footer() {
  const quickLinks = NAV_LINKS.filter((l) => !l.children);

  return (
    <footer className="bg-transparent text-white relative overflow-hidden">
      {/* Decorative footer image */}
      <div className="absolute bottom-0 right-0 w-28 sm:w-36 md:w-72 opacity-10 pointer-events-none select-none">
        <Image
          src="/images/footer-shadly.png"
          alt=""
          width={300}
          height={400}
          className="object-contain object-bottom w-full"
        />
      </div>
      {/* Purple gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/images/logo.png"
                alt={SITE_NAME}
                style={{ height: "58px", width: "auto", display: "block" }}
              />
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">{SITE_TAGLINE}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-sm text-brand-orange hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Quick nav */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Quick Links</p>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/services" className="text-sm text-white/70 hover:text-white transition-colors">
                Services
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Follow Along</p>
            <div className="flex flex-nowrap gap-1.5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,106,0,0.07)",
                    border: "1px solid rgba(255,106,0,0.18)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: "rgba(255,255,255,0.6)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,106,0,0.18)";
                    el.style.border = "1px solid rgba(255,106,0,0.55)";
                    el.style.color = "#FF6A00";
                    el.style.boxShadow = "0 0 14px rgba(255,106,0,0.25)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,106,0,0.07)";
                    el.style.border = "1px solid rgba(255,106,0,0.18)";
                    el.style.color = "rgba(255,255,255,0.6)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© 2025 Md. Shadly Benzadid. All rights reserved.</p>
          <p className="text-xs text-white/40">{SITE_NAME} — AI Agency</p>
        </div>
      </div>
    </footer>
  );
}
