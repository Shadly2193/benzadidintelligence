import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import ServiceVideoGrid from "@/components/ui/ServiceVideoGrid";
import { SERVICES } from "@/lib/content";

const WEBSITE_VIDEOS = [
  {
    src: "/videos/sikder-dental-point.mp4",
    title: "Sikder Dental Point",
    tag: "Healthcare",
  },
  {
    src: "/videos/fouzia-dental-care.mp4",
    title: "Fouzia Dental Care",
    tag: "Healthcare",
  },
  {
    src: "/videos/dr-rajarshi-nag-orthopedic.mp4",
    title: "Dr. Rajarshi Nag — Orthopedic Surgeon",
    tag: "Healthcare",
  },
  {
    src: "/videos/dr-ibrahim-khalil-dental.mp4",
    title: "Dr. Ibrahim Khalil — Dental Surgeon",
    tag: "Healthcare",
  },
  {
    src: "/videos/dr-nahal-ophthalmologist.mp4",
    title: "Dr. Nahal — Ophthalmologist",
    tag: "Healthcare",
  },
  {
    src: "/videos/dr-arif-endovascular-surgeon.mp4",
    title: "Dr. Arif — Endovascular Surgeon",
    tag: "Healthcare",
  },
  {
    src: "/videos/dr-rayhan-hepatobiliary-surgeon.mp4",
    title: "Dr. Rayhan — Hepatobiliary Surgeon",
    tag: "Healthcare",
  },
  {
    src: "/videos/dr-towhid-medicine-specialist.mp4",
    title: "Dr. Towhid — Medicine Specialist",
    tag: "Healthcare",
  },
  {
    src: "/videos/dr-ehsan-website.mp4",
    title: "Dr. Ehsan — Professional Website",
    tag: "Healthcare",
  },
  {
    src: "/videos/digital-dental-zone-dr-nusrat.mp4",
    title: "Digital Dental Zone — Dr. Nusrat",
    tag: "Healthcare",
  },
  {
    src: "/videos/tooth-castle-dental-dr-arafat.mp4",
    title: "Tooth Castle Dental — Dr. Arafat",
    tag: "Healthcare",
  },
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
