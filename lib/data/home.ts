import { createClient } from "@/lib/supabase/server";

export async function getHomeSection<T = any>(section: string): Promise<T | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("page_content")
    .select("content")
    .eq("page", "home")
    .eq("section", section)
    .single();
  return (data?.content as T) ?? null;
}

export async function getHomepagePortfolioVideos() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_videos")
    .select("*")
    .eq("published", true)
    .contains("placement", ["homepage"])
    .order("sort_order");
  return data ?? [];
}

export async function getClientLogos(group: "worked_with" | "trusted_by") {
  const supabase = await createClient();
  const { data } = await supabase
    .from("client_logos")
    .select("*")
    .eq("published", true)
    .eq("group_name", group)
    .order("sort_order");
  return data ?? [];
}

export async function getTestimonials() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  return data ?? [];
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const general = data?.find((d) => d.key === "general")?.value ?? {};
  const socials = data?.find((d) => d.key === "socials")?.value?.items ?? [];
  return { general, socials };
}
