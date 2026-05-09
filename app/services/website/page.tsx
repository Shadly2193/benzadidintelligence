import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import ServiceVideoGrid from "@/components/ui/ServiceVideoGrid";
import { SERVICES } from "@/lib/content";

const WEBSITE_VIDEOS = [
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

const videoSlot = (
  <ServiceVideoGrid
    label="REAL WORK"
    headline="This is what a professional's website should look like."
    subtext="These aren't mockups. Real websites — built and deployed for real professionals."
    videos={WEBSITE_VIDEOS}
    columns={2}
  />
);

export default function WebsiteServicePage() {
  const service = SERVICES.find((s) => s.slug === "website")!;
  return (
    <ServicePageTemplate
      service={service}
      afterHeroSlot={videoSlot}
      whatYouGetHeadline="Everything your practice needs to dominate online."
    />
  );
}
