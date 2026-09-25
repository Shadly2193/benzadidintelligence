import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fiunnnblaihdpupunijs.supabase.co",
  process.env.SR_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const SECTIONS = {
  intro: {
    subtext: "My path wasn't straight. But every step sharpened what I do now.",
    heroSentences: [
      { text: "I spent a decade trying to heal the world.", accent: false },
      { text: "Dental surgeon. Public health researcher. Nine published papers.", accent: false },
      { text: "Six years in humanitarian aid — on the ground, in the field.", accent: false },
      { text: "Then in 2022, AI walked in. And everything shifted.", accent: false },
      { text: "1,100 students. Bangladesh's top AI agency. No going back.", accent: false },
      { text: "Now I build what the future runs on.", accent: true },
    ],
    mobileHeadline: ["From clinic to code.", "AI changed everything."],
  },
  timeline: {
    items: [
      {
        period: "2013–2017",
        role: "Dental Surgeon → AI Generalist",
        body: "Graduated with a BDS from Sher-e-Bangla Medical College. Treated patients. Won the Pepsodent Merit Award. Learned what precision, patience, and working under pressure really means.",
        image: "/images/about-walking-confidently.png",
      },
      {
        period: "Late 2022",
        role: "The Shift",
        body: "ChatGPT launched. I was hooked — not as a casual user, but as a builder. I spent months going deep: prompting, image generation, video, automation, agents. I saw what most professionals were missing. And I knew I could bridge that gap.",
        image: "/images/about-style-1.png",
      },
      {
        period: "2023–Now",
        role: "AI Practitioner & Builder",
        body: "Created a ChatGPT mastery course — 1,100+ students trained. Joined Purplebot LLC as AI Prompt Engineer. Built automation systems, AI agents, visual content pipelines. Now I build complete AI solutions for professionals who are ready for what's next.",
        image: "/images/about-talking-with-clients.png",
      },
    ],
  },
  philosophy: {
    big: ["AI doesn't replace experts.", "It multiplies them."],
    sub: "A doctor with AI sees more patients.\nAn architect with AI explores more designs.\nA business with AI serves more people.\nMy job is to build that multiplier — for you.",
  },
  quick_facts: {
    items: [
      { label: "Background", value: "Dental Surgeon (BDS)" },
      { label: "Students Mentored", value: "1,100+" },
      { label: "Professional Website Built", value: "20+" },
      { label: "Focus", value: "AI Websites, Agents & Mentorship" },
    ],
  },
};

async function run() {
  for (const [section, content] of Object.entries(SECTIONS)) {
    const { error } = await supabase
      .from("page_content")
      .upsert({ page: "about", section, content }, { onConflict: "page,section" });
    console.log(section, error ? "ERROR: " + error.message : "OK");
  }
}

run();
