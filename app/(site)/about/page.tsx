import AboutPageClient from "@/components/sections/AboutPageClient";
import { getAboutSection } from "@/lib/data/about";

export default async function AboutPage() {
  const [intro, timeline, philosophy, quickFacts] = await Promise.all([
    getAboutSection("intro"),
    getAboutSection("timeline"),
    getAboutSection("philosophy"),
    getAboutSection("quick_facts"),
  ]);

  return (
    <AboutPageClient intro={intro} timeline={timeline} philosophy={philosophy} quickFacts={quickFacts} />
  );
}
