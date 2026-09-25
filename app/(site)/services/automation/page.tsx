import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import ServiceVideoGrid from "@/components/ui/ServiceVideoGrid";
import { getService } from "@/lib/data/services";

const AUTOMATION_VIDEOS = [
  {
    src: "/videos/automation.mp4",
    title: "AI Agents & Automation — Live System Demo",
    tag: "Live Demo",
  },
];

const videoSlot = (
  <ServiceVideoGrid
    label="SEE IT IN ACTION"
    headline="Real AI. Running in the background."
    subtext="Watch an actual AI automation system handle tasks your team wastes hours on every week."
    videos={AUTOMATION_VIDEOS}
    columns={1}
    featured
  />
);

export default async function AutomationServicePage() {
  const service = await getService("automation");
  return (
    <ServicePageTemplate
      service={service}
      afterHeroSlot={videoSlot}
      whatYouGetHeadline="Everything automated. Nothing left on your plate."
    />
  );
}
