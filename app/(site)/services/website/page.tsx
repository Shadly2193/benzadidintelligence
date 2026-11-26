import { pageMetadata, getWebsiteFaq } from "@/lib/seo";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import WebsiteServicePageClient from "@/components/sections/WebsiteServicePageClient";
import { getService, getPortfolioVideosForService, getWebsitePricing } from "@/lib/data/services";

export async function generateMetadata() {
  return pageMetadata("website");
}

export default async function WebsiteServicePage() {
  const [service, videos, pricing, faq] = await Promise.all([
    getService("website"),
    getPortfolioVideosForService(),
    getWebsitePricing(),
    getWebsiteFaq(),
  ]);

  return (
    <>
    <FaqJsonLd items={faq} />
    <WebsiteServicePageClient
      service={service}
      videos={videos}
      tiers={pricing.tiers as any}
      comparisonRows={pricing.comparisonRows}
      customPlanPoints={pricing.customPlanPoints.map((p: any) => p.point)}
      config={pricing.config}
      faq={faq}
    />
    </>
  );
}
