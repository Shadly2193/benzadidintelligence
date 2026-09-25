import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fiunnnblaihdpupunijs.supabase.co",
  process.env.SR_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Homepage shows 4 of these (flagged homepage:true); Work page + Website service page show all 13.
const PORTFOLIO_VIDEOS = [
  { src: "/videos/sikder-dental-point.mp4", title: "Sikder Dental Point", tag: "Healthcare", link: "https://sikdar-dental-site.vercel.app/", tier: "premium", homepage: true },
  { src: "/videos/fouzia-dental-care.mp4", title: "Fouzia Dental Care", tag: "Healthcare", link: "https://fouziadentalcare.com/", tier: "premium", homepage: true },
  { src: "/videos/dr-rajarshi-nag-orthopedic.mp4", title: "Dr. Rajarshi Nag — Orthopedic Surgeon", tag: "Healthcare", link: "https://dr-rajarshi-nag-website.vercel.app/", tier: "premium", homepage: true },
  { src: "/videos/dr-ibrahim-khalil-dental.mp4", title: "Dr. Ibrahim Khalil — Dental Surgeon", tag: "Healthcare", link: null, tier: "premium", homepage: false },
  { src: "/videos/dr-nahal-ophthalmologist.mp4", title: "Dr. Nahal — Ophthalmologist", tag: "Healthcare", link: null, tier: "premium", homepage: true },
  { src: "/videos/dr-arif-endovascular-surgeon.mp4", title: "Dr. Arif — Endovascular Surgeon", tag: "Healthcare", link: "https://www.drarifvascularsurgeon.com/", tier: "premium", homepage: false },
  { src: "/videos/dr-rayhan-hepatobiliary-surgeon.mp4", title: "Dr. Rayhan — Hepatobiliary Surgeon", tag: "Healthcare", link: "https://www.drrayhanhpb.com/", tier: "premium", homepage: false },
  { src: "/videos/dr-towhid-medicine-specialist.mp4", title: "Dr. Towhid — Medicine Specialist", tag: "Healthcare", link: "https://dr-hanif-ahmed-towhid.vercel.app/", tier: "essential", homepage: false },
  { src: "/videos/dr-ehsan-website.mp4", title: "Dr. Ehsan — Professional Website", tag: "Healthcare", link: null, tier: "essential", homepage: false },
  { src: "/videos/digital-dental-zone-dr-nusrat.mp4", title: "Digital Dental Zone — Dr. Nusrat", tag: "Healthcare", link: "https://digital-dental-zone.vercel.app/", tier: "essential", homepage: false },
  { src: "/videos/tooth-castle-dental-dr-arafat.mp4", title: "Tooth Castle Dental — Dr. Arafat", tag: "Healthcare", link: "https://toothcastlewebsite.vercel.app/", tier: "essential", homepage: false },
  { src: "/videos/dental-surgeon-website.mp4", title: "Dental Surgeon — Professional Website", tag: "Healthcare", link: null, tier: null, homepage: false },
  { src: "/videos/orthopedic-surgeon-website.mp4", title: "Orthopedic Surgeon — Professional Website", tag: "Healthcare", link: null, tier: null, homepage: false },
];

const CLIENT_LOGOS = {
  worked_with: [
    { name: "PBD", logo: "/images/logos/pbd.png" },
    { name: "HMBD Foundation", logo: "/images/logos/hmbd.png" },
    { name: "360 Academy", logo: "/images/logos/360academy.png" },
    { name: "NGO Forum", logo: "/images/logos/ngoforum.png" },
    { name: "NSU", logo: "/images/logos/nsu.png" },
    { name: "CNRS", logo: "/images/logos/cnrs.png" },
  ],
  trusted_by: [
    { name: "PRAN", logo: "/images/logos/pran.png" },
    { name: "Taste Terminal", logo: "/images/logos/taste-terminal.png" },
    { name: "BRAC EPL", logo: "/images/logos/brac-epl.png" },
    { name: "11Plus", logo: "/images/logos/11plus.png" },
    { name: "Vision EM", logo: "/images/logos/vision-em.png" },
    { name: "Medix", logo: "/images/logos/medix.png" },
    { name: "Regal Furniture", logo: "/images/logos/regal-furniture.png" },
    { name: "Bizli", logo: "/images/logos/bizli.png" },
    { name: "Shamadhan", logo: "/images/logos/shamadhan.png" },
    { name: "UCB", logo: "/images/logos/ucb.png" },
  ],
};

const TUTORIALS = [
  { videoId: "YxNGS6qKyKk", title: "This Dental Website Looks Developer-Built — I Made It With AI", tag: "Website" },
  { videoId: "iaaRB8i2EUs", title: "Best AI Tools for Content Creation", tag: "Content" },
  { videoId: "BZSlrHejrLo", title: "AI Image Style Guide | 20+ Styles for Beginners", tag: "Image AI" },
  { videoId: "FRWbN-RBGEU", title: "AI Camera Shot Guide | Full Tutorial", tag: "Image AI" },
  { videoId: "_N4vorm9I0o", title: "The Secret Formula for AI Image Prompting", tag: "Prompting" },
  { videoId: "3ZJD91RWaqA", title: "How To Make Commercial AI Images", tag: "Content" },
  { videoId: "9YdvE5SHvkg", title: "Google AI Studio — More Powerful Than You Think", tag: "Tools" },
  { videoId: "0xlGr_3AdYg", title: "I Made a Full Annual Report in 10 Minutes With AI", tag: "Productivity" },
  { videoId: "suNIannuMRw", title: "What Is an API — And Why Your AI Agent Needs It", tag: "AI Agents" },
  { videoId: "fL5wrhGTg3c", title: "What Is an AI Agent? Super Simple Explanation", tag: "AI Agents" },
];

const CONTENT_VIDEOS = [
  { title: "AI-Generated Sprite Commercial", category: "ad", platform: "linkedin", video_url: "/videos/sprite-ad.mp4", youtube_id: null, href: "https://www.linkedin.com/feed/update/urn:li:activity:7372253096200110080/" },
  { title: "AI-Generated Ice Cream Ad", category: "ad", platform: "linkedin", video_url: "/videos/icecream-ad.mp4", youtube_id: null, href: "https://www.linkedin.com/feed/update/urn:li:activity:7374736708522672129/" },
  { title: "AI Orange Juice Commercial", category: "ad", platform: "instagram", video_url: "/videos/orange-juice-ad.mp4", youtube_id: null, href: "https://www.instagram.com/reel/DOjP097glsB/" },
  { title: "AI Brand Commercial — Black & Orange", category: "ad", platform: "instagram", video_url: "/videos/black-orange-ad.mp4", youtube_id: null, href: "https://www.instagram.com/reel/DPA1ce_CASV/" },
  { title: "The Next Level of Advertising: 100% AI Earbuds Commercial", category: "ad", platform: "youtube", video_url: null, youtube_id: "FIMeNgEDQ9o", href: "https://www.youtube.com/watch?v=FIMeNgEDQ9o" },
  { title: "KitKat AI Commercial", category: "ad", platform: "youtube", video_url: "/videos/kitkat-commercial.mp4", youtube_id: null, href: "https://www.youtube.com/" },
  { title: "The 5 Monkeys & The Banana Experiment", category: "storytelling", platform: "youtube", video_url: null, youtube_id: "q_-P6ni581A", href: "https://youtu.be/q_-P6ni581A" },
  { title: "I Almost Cried Making This AI Film 'Ababil'", category: "storytelling", platform: "youtube", video_url: null, youtube_id: "-OIixVWHhmA", href: "https://youtu.be/-OIixVWHhmA" },
  { title: "Bizarre Dental Care — AI Storytelling", category: "storytelling", platform: "youtube", video_url: "/videos/bizarre-dental-care.mp4", youtube_id: null, href: "https://www.youtube.com/" },
];

async function run() {
  console.log("Clearing existing portfolio_videos/client_logos/tutorials/content_videos...");
  await supabase.from("portfolio_videos").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("client_logos").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("tutorials").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("content_videos").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("Seeding portfolio videos...");
  const pvRows = PORTFOLIO_VIDEOS.map((v, i) => ({
    title: v.title,
    tag: v.tag,
    video_url: v.src,
    youtube_id: null,
    live_link: v.link,
    tier: v.tier,
    placement: v.homepage ? ["homepage", "work_page", "service_website"] : ["work_page", "service_website"],
    sort_order: i,
    published: true,
  }));
  { const { error } = await supabase.from("portfolio_videos").insert(pvRows); if (error) console.error("  error:", error.message); }

  console.log("Seeding client logos...");
  const logoRows = [];
  CLIENT_LOGOS.worked_with.forEach((l, i) => logoRows.push({ name: l.name, logo_url: l.logo, group_name: "worked_with", sort_order: i, published: true }));
  CLIENT_LOGOS.trusted_by.forEach((l, i) => logoRows.push({ name: l.name, logo_url: l.logo, group_name: "trusted_by", sort_order: i, published: true }));
  { const { error } = await supabase.from("client_logos").insert(logoRows); if (error) console.error("  error:", error.message); }

  console.log("Seeding tutorials...");
  const tutRows = TUTORIALS.map((t, i) => ({ title: t.title, tag: t.tag, youtube_id: t.videoId, sort_order: i, published: true }));
  { const { error } = await supabase.from("tutorials").insert(tutRows); if (error) console.error("  error:", error.message); }

  console.log("Seeding content videos...");
  const cvRows = CONTENT_VIDEOS.map((c, i) => ({ ...c, sort_order: i, published: true }));
  { const { error } = await supabase.from("content_videos").insert(cvRows); if (error) console.error("  error:", error.message); }

  console.log("Done.");
}

run();
