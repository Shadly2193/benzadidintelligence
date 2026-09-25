"use client";

interface Logo { logo_url: string; name: string; no_invert: boolean }

export default function WorkedWith({ data }: { data: Logo[] }) {
  const LOGOS = data.map((l) => ({ src: l.logo_url, alt: l.name, noInvert: l.no_invert }));
  return (
    <section className="bg-transparent py-8 border-b border-white/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-5">
        <p className="section-label w-full text-center" style={{ justifyContent: "center" }}>I&apos;ve Worked With</p>
      </div>

      <div className="overflow-hidden">
        <div className="marquee-track">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-10 flex items-center justify-center"
              style={{ width: "180px", height: "80px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  maxHeight: "68px",
                  maxWidth: "165px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  filter: logo.noInvert ? "none" : "brightness(0) invert(1)",
                  opacity: 0.55,
                  background: "transparent",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
