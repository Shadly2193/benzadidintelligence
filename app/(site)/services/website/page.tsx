import WebsiteServicePageClient from "@/components/sections/WebsiteServicePageClient";
import { getService, getPortfolioVideosForService, getWebsitePricing } from "@/lib/data/services";

export default async function WebsiteServicePage() {
  const [service, videos, pricing] = await Promise.all([
    getService("website"),
    getPortfolioVideosForService(),
    getWebsitePricing(),
  ]);

  return (
    <WebsiteServicePageClient
      service={service}
      videos={videos}
      tiers={pricing.tiers as any}
      comparisonRows={pricing.comparisonRows}
      customPlanPoints={pricing.customPlanPoints.map((p: any) => p.point)}
      config={pricing.config}
    />
  );
}
