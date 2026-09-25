"use client";

type Logo = { src: string; alt: string; noInvert?: boolean };
interface DbLogo { logo_url: string; name: string; no_invert: boolean }

function LogoRow({ logos, className }: { logos: Logo[]; className: string }) {
  const items = [...logos, ...logos];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div className={className}>
        {items.map((logo, i) => (
          <div
            key={i}
            style={{
              width: "150px",
              height: "60px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "40px",
              marginRight: "40px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              style={{
                maxHeight: "48px",
                maxWidth: "120px",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                filter: logo.noInvert
                  ? "grayscale(1) brightness(2)"
                  : "brightness(0) invert(1)",
                opacity: 0.55,
                background: "transparent",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AIContentSupport({ data }: { data: DbLogo[] }) {
  const logos: Logo[] = data.map((l) => ({ src: l.logo_url, alt: l.name, noInvert: l.no_invert }));
  const mid = Math.ceil(logos.length / 2);
  const ROW1 = logos.slice(0, mid);
  const ROW2 = logos.slice(mid);

  return (
    <section className="bg-transparent py-8 border-b border-white/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-5">
        <p className="section-label w-full text-center" style={{ justifyContent: "center" }}>
          I&apos;ve Provided AI Content Creation Support For
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <LogoRow logos={ROW1} className="marquee-track" />
        <LogoRow logos={ROW2} className="marquee-track-reverse" />
      </div>
    </section>
  );
}
