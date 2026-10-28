import type { Metadata } from "next";
import BeforeAfter from "@/components/course/BeforeAfter";
import ChromeUI from "@/components/course/ChromeUI";
import Countdown from "@/components/course/Countdown";
import Demo from "@/components/course/Demo";
import Faq from "@/components/course/Faq";
import Final from "@/components/course/Final";
import FreeClass from "@/components/course/FreeClass";
import Hero from "@/components/course/Hero";
import HowItWorks from "@/components/course/HowItWorks";
import Instructor from "@/components/course/Instructor";
import Join from "@/components/course/Join";
import Price from "@/components/course/Price";
import Problem from "@/components/course/Problem";
import Proof from "@/components/course/Proof";
import Roadmap from "@/components/course/Roadmap";
import Walkaway from "@/components/course/Walkaway";
import WhoFor from "@/components/course/WhoFor";
import "@/components/course/course.css";
import { CourseProvider } from "@/lib/course/content";
import { mergeCourse } from "@/lib/course/defaults";
import { createClient } from "@/lib/supabase/server";

const SLUG = "digital-residency-program";

const SECTIONS: Record<string, React.ComponentType> = {
  top: Hero,
  problem: Problem,
  future: BeforeAfter,
  demo: Demo,
  proof: Proof,
  free: FreeClass,
  road: Roadmap,
  how: HowItWorks,
  who: WhoFor,
  inst: Instructor,
  price: Price,
  clock: Countdown,
  value: Walkaway,
  join: Join,
  faq: Faq,
  final: Final,
};

/** Published content for everyone; `?preview=1` shows the draft, but only to a logged-in admin (RLS). */
async function loadContent(preview: boolean) {
  const supabase = await createClient();
  if (preview) {
    const { data } = await supabase.from("course_pages").select("draft").eq("slug", SLUG).maybeSingle();
    if (data) return { content: mergeCourse(data.draft), preview: true };
  }
  const { data } = await supabase.from("course_pages_public").select("published").eq("slug", SLUG).maybeSingle();
  return { content: mergeCourse(data?.published), preview: false };
}

export const metadata: Metadata = {
  title: "Digital Residency Program",
  description:
    "A 16-week live program for Bangladeshi doctors and medical students. Learn to build your own brand, videos and website with AI. Built only for doctors, by a doctor.",
  openGraph: {
    title: "Digital Residency Program",
    description: "Learn to build your own brand, videos and website with AI. Built only for doctors, by a doctor.",
    // TODO: replace with the real Open Graph image
    images: ["/images/logo.png"],
  },
};

export default async function DigitalResidencyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { preview: p } = await searchParams;
  const { content, preview } = await loadContent(p === "1");
  return (
    <CourseProvider value={content}>
      {preview && <div className="dr-preview-bar">PREVIEW: this is your unpublished draft. Visitors still see the published page.</div>}
      <div className="dr-page">
        {content.sections
          .filter((s) => !content.hidden.includes(s.id) && SECTIONS[s.id])
          .map((s) => {
            const Section = SECTIONS[s.id];
            return <Section key={s.id} />;
          })}
        <ChromeUI />
      </div>
    </CourseProvider>
  );
}
