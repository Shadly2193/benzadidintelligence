"use client";
import { useMemo, useRef, useState } from "react";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import ServiceVideoGrid from "@/components/ui/ServiceVideoGrid";
import WebsitePricingTiers, { Tier } from "@/components/sections/WebsitePricingTiers";
import CustomPlanBanner from "@/components/sections/CustomPlanBanner";
import PricingComparisonTable from "@/components/sections/PricingComparisonTable";
import { SERVICES } from "@/lib/content";

const WEBSITE_VIDEOS: { src: string; title: string; tag: string; link?: string; tier?: Tier }[] = [
  {
    src: "/videos/sikder-dental-point.mp4",
    title: "Sikder Dental Point",
    tag: "Healthcare",
    link: "https://sikdar-dental-site.vercel.app/",
    tier: "premium",
  },
  {
    src: "/videos/fouzia-dental-care.mp4",
    title: "Fouzia Dental Care",
    tag: "Healthcare",
    link: "https://fouziadentalcare.com/",
    tier: "premium",
  },
  {
    src: "/videos/dr-rajarshi-nag-orthopedic.mp4",
    title: "Dr. Rajarshi Nag — Orthopedic Surgeon",
    tag: "Healthcare",
    link: "https://dr-rajarshi-nag-website.vercel.app/",
    tier: "premium",
  },
  {
    src: "/videos/dr-ibrahim-khalil-dental.mp4",
    title: "Dr. Ibrahim Khalil — Dental Surgeon",
    tag: "Healthcare",
    tier: "premium",
  },
  {
    src: "/videos/dr-nahal-ophthalmologist.mp4",
    title: "Dr. Nahal — Ophthalmologist",
    tag: "Healthcare",
    tier: "premium",
  },
  {
    src: "/videos/dr-arif-endovascular-surgeon.mp4",
    title: "Dr. Arif — Endovascular Surgeon",
    tag: "Healthcare",
    link: "https://www.drarifvascularsurgeon.com/",
    tier: "premium",
  },
  {
    src: "/videos/dr-rayhan-hepatobiliary-surgeon.mp4",
    title: "Dr. Rayhan — Hepatobiliary Surgeon",
    tag: "Healthcare",
    link: "https://www.drrayhanhpb.com/",
    tier: "premium",
  },
  {
    src: "/videos/dr-towhid-medicine-specialist.mp4",
    title: "Dr. Towhid — Medicine Specialist",
    tag: "Healthcare",
    link: "https://dr-hanif-ahmed-towhid.vercel.app/",
    tier: "essential",
  },
  {
    src: "/videos/dr-ehsan-website.mp4",
    title: "Dr. Ehsan — Professional Website",
    tag: "Healthcare",
    tier: "essential",
  },
  {
    src: "/videos/digital-dental-zone-dr-nusrat.mp4",
    title: "Digital Dental Zone — Dr. Nusrat",
    tag: "Healthcare",
    link: "https://digital-dental-zone.vercel.app/",
    tier: "essential",
  },
  {
    src: "/videos/tooth-castle-dental-dr-arafat.mp4",
    title: "Tooth Castle Dental — Dr. Arafat",
    tag: "Healthcare",
    link: "https://toothcastlewebsite.vercel.app/",
    tier: "essential",
  },
  {
    src: "/videos/dental-surgeon-website.mp4",
    title: "Dental Surgeon — Professional Website",
    tag: "Healthcare",
  },
  {
    src: "/videos/orthopedic-surgeon-website.mp4",
    title: "Orthopedic Surgeon — Professional Website",
    tag: "Healthcare",
  },
];

export default function WebsiteServicePage() {
  const service = SERVICES.find((s) => s.slug === "website")!;
  const [activeTier, setActiveTier] = useState<Tier | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredVideos = useMemo(() => {
    if (!activeTier) return WEBSITE_VIDEOS;
    return WEBSITE_VIDEOS.filter((v) => v.tier === activeTier);
  }, [activeTier]);

  const handleSelectTier = (tier: Tier) => {
    setActiveTier(tier);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const videoSlot = (
    <div ref={gridRef}>
      <ServiceVideoGrid
        label="REAL WORK"
        headline="This is what a professional's website should look like."
        subtext={
          activeTier
            ? `Showing ${activeTier === "premium" ? "Premium" : "Essential"} tier examples — real client work.`
            : "These aren't mockups. Real websites — built and deployed for real professionals."
        }
        videos={filteredVideos}
        columns={2}
      />
    </div>
  );

  return (
    <ServicePageTemplate
      service={service}
      afterHeroSlot={videoSlot}
      whatYouGetOverride={
        <WebsitePricingTiers
          activeTier={activeTier}
          onSelectTier={handleSelectTier}
          onViewAll={() => setActiveTier(null)}
        />
      }
      afterAllSlot={
        <>
          <CustomPlanBanner />
          <PricingComparisonTable />
        </>
      }
    />
  );
}
