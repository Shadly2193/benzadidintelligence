"use client";
import { useMemo, useRef, useState } from "react";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import ServiceVideoGrid from "@/components/ui/ServiceVideoGrid";
import WebsitePricingTiers, { Tier, DbTier } from "@/components/sections/WebsitePricingTiers";
import CustomPlanBanner from "@/components/sections/CustomPlanBanner";
import PricingComparisonTable, { DbComparisonRow } from "@/components/sections/PricingComparisonTable";
import type { ServiceData } from "@/lib/data/services";
import type { PricingConfig } from "@/lib/pricingConfig";

interface PortfolioVideo {
  video_url: string | null;
  youtube_id: string | null;
  facebook_url: string | null;
  title: string;
  tag: string | null;
  live_link: string | null;
  tier: Tier | null;
}

interface Props {
  service: ServiceData;
  videos: PortfolioVideo[];
  tiers: DbTier[];
  comparisonRows: DbComparisonRow[];
  customPlanPoints: string[];
  config: PricingConfig;
}

export default function WebsiteServicePageClient({ service, videos, tiers, comparisonRows, customPlanPoints, config }: Props) {
  const [activeTier, setActiveTier] = useState<Tier | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const WEBSITE_VIDEOS = videos.map((v) => ({
    src: v.video_url ?? undefined,
    youtubeId: v.youtube_id ?? undefined,
    facebookUrl: v.facebook_url ?? undefined,
    title: v.title,
    tag: v.tag ?? "",
    link: v.live_link ?? undefined,
    tier: v.tier ?? undefined,
  }));

  const filteredVideos = useMemo(() => {
    if (!activeTier) return WEBSITE_VIDEOS;
    return WEBSITE_VIDEOS.filter((v) => v.tier === activeTier);
  }, [activeTier, videos]);

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
          tiers={tiers}
          config={config}
          activeTier={activeTier}
          onSelectTier={handleSelectTier}
          onViewAll={() => setActiveTier(null)}
        />
      }
      afterAllSlot={
        <>
          <CustomPlanBanner points={customPlanPoints} custom={config.custom} />
          <PricingComparisonTable rows={comparisonRows} bonusRowIds={config.bonusRowIds} />
        </>
      }
    />
  );
}
