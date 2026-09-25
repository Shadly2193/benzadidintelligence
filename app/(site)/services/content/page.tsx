import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import ServiceVideoGrid from "@/components/ui/ServiceVideoGrid";
import { getService, getContentVideos } from "@/lib/data/services";

export default async function ContentPage() {
  const [service, contentVideos] = await Promise.all([getService("content"), getContentVideos()]);

  const toItem = (row: (typeof contentVideos)[number]) => ({
    src: row.video_url ?? undefined,
    youtubeId: row.youtube_id ?? undefined,
    title: row.title,
    tag: row.platform ? `${row.platform[0].toUpperCase()}${row.platform.slice(1)} Ad` : "Ad",
  });

  const AD_VIDEOS = contentVideos.filter((v) => v.category === "ad").map(toItem);
  const STORY_VIDEOS = contentVideos.filter((v) => v.category === "storytelling").map(toItem);

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

  return (
    <ServicePageTemplate
      service={service}
      afterHeroSlot={videoSlot}
      beforeWhatYouGetSlot={storytellingSlot}
      whatYouGetHeadline="Content that stops the scroll - built to perform."
    />
  );
}
