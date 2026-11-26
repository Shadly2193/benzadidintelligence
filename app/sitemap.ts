import type { MetadataRoute } from "next";
import { SEO_PAGES, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.values(SEO_PAGES).map((p) => p.path), "/courses/digital-residency-program"];
  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/about" || path.startsWith("/courses") || path === "/services/website" ? 0.9 : 0.7,
  }));
}
