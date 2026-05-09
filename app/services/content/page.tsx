import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import ServiceVideoGrid from "@/components/ui/ServiceVideoGrid";
import { SERVICES } from "@/lib/content";

const AD_VIDEOS = [
  { src: "/videos/sprite-ad.mp4", title: "AI Sprite Commercial", tag: "Brand Ad" },
  { src: "/videos/icecream-ad.mp4", title: "AI Ice Cream Ad", tag: "Brand Ad" },
  { src: "/videos/orange-juice-ad.mp4", title: "AI Orange Juice Commercial", tag: "Brand Ad" },
  { src: "/videos/black-orange-ad.mp4", title: "AI Brand Commercial", tag: "Brand Ad" },
  { src: "/videos/kitkat-commercial.mp4", title: "KitKat AI Commercial", tag: "Brand Ad" },
  { youtubeId: "FIMeNgEDQ9o", title: "100% AI Earbuds Commercial", tag: "Brand Ad" },
];

const STORY_VIDEOS = [
  { src: "/videos/bizarre-dental-care.mp4", title: "Bizarre Dental Care - AI Storytelling", tag: "Storytelling" },
  { youtubeId: "q_-P6ni581A", title: "The 5 Monkeys Experiment", tag: "Storytelling" },
  { youtubeId: "-OIixVWHhmA", title: "I Almost Cried Making This AI Film 'Ababil'", tag: "Storytelling" },
];

const videoSlot = (
  <ServiceVideoGrid
    label="THE WORK"
    headline="AI content that performs."
    subtext="From product commercials to brand films - all produced using AI tools. No studio. No crew. Just results."
    videos={AD_VIDEOS}
    columns={3}
  />
);

const storytellingSlot = (
  <ServiceVideoGrid
    label="AI STORYTELLING"
    headline="Stories that stop the scroll."
    subtext="AI-generated short films and narrative content. Emotional. Original. Built to make people feel something."
    videos={STORY_VIDEOS}
    columns={3}
  />
);

export default function ContentPage() {
  const service = SERVICES.find((s) => s.slug === "content")!;

  return (
    <ServicePageTemplate
      service={service}
      afterHeroSlot={videoSlot}
      beforeWhatYouGetSlot={storytellingSlot}
      whatYouGetHeadline="Content that stops the scroll - built to perform."
    />
  );
}
