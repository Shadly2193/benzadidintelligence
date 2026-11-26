import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SEO_PAGES, DEFAULT_PROFILE, DEFAULT_ABOUT_MORE, DEFAULT_WEBSITE_FAQ } from "@/lib/seo-defaults";
import type { PageSeo, Profile, AboutMore, Faq } from "@/lib/seo-defaults";
export * from "@/lib/seo-defaults";

async function readSeoRow<T>(section: string): Promise<T | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("page_content")
      .select("content")
      .eq("page", "seo")
      .eq("section", section)
      .maybeSingle();
    return (data?.content as T) ?? null;
  } catch {
    return null;
  }
}

export async function getPageSeo(key: string): Promise<PageSeo> {
  const base = SEO_PAGES[key]?.seo ?? SEO_PAGES.home.seo;
  const saved = await readSeoRow<Partial<PageSeo>>(`page_${key}`);
  return {
    title: saved?.title?.trim() || base.title,
    description: saved?.description?.trim() || base.description,
  };
}

export async function getProfile(): Promise<Profile> {
  const saved = await readSeoRow<Partial<Profile>>("profile");
  return { ...DEFAULT_PROFILE, ...(saved ?? {}) } as Profile;
}

export async function pageMetadata(key: string): Promise<Metadata> {
  const { title, description } = await getPageSeo(key);
  const path = SEO_PAGES[key]?.path ?? "/";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: "Benzadid Intelligence", type: key === "about" ? "profile" : "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export async function getAboutMore(): Promise<AboutMore> {
  const saved = await readSeoRow<Partial<AboutMore>>("about_more");
  return { ...DEFAULT_ABOUT_MORE, ...(saved ?? {}) } as AboutMore;
}

export async function getWebsiteFaq(): Promise<Faq[]> {
  const saved = await readSeoRow<{ items: Faq[] }>("website_faq");
  return saved?.items?.length ? saved.items : DEFAULT_WEBSITE_FAQ;
}

// About page portrait: the admin's own About photo if set, otherwise the
// instructor photo from the published course page, so one upload updates both.
export async function getAboutPhoto(): Promise<string> {
  const saved = await readSeoRow<{ url?: string }>("about_photo");
  if (saved?.url?.trim()) return saved.url.trim();
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("course_pages_public").select("published").eq("slug", "digital-residency-program").maybeSingle();
    const url = (data?.published as any)?.instructor?.photoUrl;
    if (typeof url === "string" && url.trim()) return url.trim();
  } catch {}
  return "";
}
