import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import GuidanceTutorialGrid from "@/components/sections/GuidanceTutorialGrid";
import { getService, getTutorials } from "@/lib/data/services";

export default async function MentorshipServicePage() {
  const [service, tutorials] = await Promise.all([getService("guidance"), getTutorials()]);
  return (
    <ServicePageTemplate
      service={service}
      afterHeroSlot={<GuidanceTutorialGrid tutorials={tutorials} />}
      whatYouGetHeadline={
        <>
          YouTube gets you started.<br />
          <span style={{ color: "#FF6A00" }}>This gets you there.</span>
        </>
      }
    />
  );
}
