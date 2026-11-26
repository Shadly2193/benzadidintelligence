import { pageMetadata, getAboutMore, getAboutPhoto } from "@/lib/seo";
import AboutPageClient from "@/components/sections/AboutPageClient";
import AboutMore from "@/components/sections/AboutMore";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import { getAboutSection } from "@/lib/data/about";

export async function generateMetadata() {
  return pageMetadata("about");
}

export default async function AboutPage() {
  const [intro, timeline, philosophy, quickFacts, more, photo] = await Promise.all([
    getAboutSection("intro"),
    getAboutSection("timeline"),
    getAboutSection("philosophy"),
    getAboutSection("quick_facts"),
    getAboutMore(),
    getAboutPhoto(),
  ]);

  return (
    <>
      <FaqJsonLd items={more.faq} />
      <AboutPageClient
        intro={intro}
        timeline={timeline}
        philosophy={philosophy}
        quickFacts={quickFacts}
        beforeCta={<AboutMore data={more} photo={photo} />}
      />
    </>
  );
}
