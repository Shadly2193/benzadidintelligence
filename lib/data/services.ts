import { createClient } from "@/lib/supabase/server";
import { mergePricingConfig } from "@/lib/pricingConfig";

export interface ServiceData {
  number: string;
  slug: string;
  title: string;
  bigHeadline: string[];
  pain: string;
  description: string;
  cta: { label: string; href: string };
  features: string[];
  pricing: string;
  bestFor: string;
}

export async function getService(slug: string): Promise<ServiceData> {
  const supabase = await createClient();
  const { data } = await supabase.from("services").select("*").eq("slug", slug).single();
  return {
    number: data?.number ?? "",
    slug: data?.slug ?? slug,
    title: data?.title ?? "",
    bigHeadline: data?.big_headline ?? [],
    pain: data?.pain ?? "",
    description: data?.description ?? "",
    cta: { label: data?.cta_label ?? "Learn More →", href: data?.cta_href ?? "/contact" },
    features: data?.features ?? [],
    pricing: data?.pricing ?? "",
    bestFor: data?.best_for ?? "",
  };
}

export async function getPortfolioVideosForService() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_videos")
    .select("*")
    .eq("published", true)
    .contains("placement", ["service_website"])
    .order("sort_order");
  return data ?? [];
}

export async function getWebsitePricing() {
  const supabase = await createClient();
  const [tiersRes, rowsRes, pointsRes, configRes] = await Promise.all([
    supabase.from("pricing_tiers").select("*, pricing_tier_features(*)").eq("service_slug", "website").order("sort_order"),
    supabase.from("comparison_rows").select("*").eq("service_slug", "website").order("sort_order"),
    supabase.from("custom_plan_points").select("*").eq("service_slug", "website").order("sort_order"),
    supabase.from("page_content").select("content").eq("page", "website_pricing").eq("section", "config").maybeSingle(),
  ]);
  return {
    tiers: tiersRes.data ?? [],
    comparisonRows: rowsRes.data ?? [],
    customPlanPoints: pointsRes.data ?? [],
    config: mergePricingConfig(configRes.data?.content),
  };
}

export async function getContentVideos() {
  const supabase = await createClient();
  const { data } = await supabase.from("content_videos").select("*").eq("published", true).order("sort_order");
  return data ?? [];
}

export async function getTutorials() {
  const supabase = await createClient();
  const { data } = await supabase.from("tutorials").select("*").eq("published", true).order("sort_order");
  return data ?? [];
}
