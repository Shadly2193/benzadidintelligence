"use client";

const ROW1 = [
  { src: "/images/logos/pran.png", alt: "Pran", noInvert: true },
  { src: "/images/logos/taste-terminal.png", alt: "Taste Terminal" },
  { src: "/images/logos/brac-epl.png", alt: "BRAC EPL" },
  { src: "/images/logos/11plus.png", alt: "11+" },
  { src: "/images/logos/vision-em.png", alt: "Vision Em" },
];

const ROW2 = [
  { src: "/images/logos/medix.png", alt: "Medix" },
  { src: "/images/logos/regal-furniture.png", alt: "Regal Furniture" },
  { src: "/images/logos/bizli.png", alt: "Bizli" },
  { src: "/images/logos/shamadhan.png", alt: "Shamadhan" },
  { src: "/images/logos/ucb.png", alt: "UCB" },
];

type Logo = { src: string; alt: string; noInvert?: boolean };

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

export default function AIContentSupport() {
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
