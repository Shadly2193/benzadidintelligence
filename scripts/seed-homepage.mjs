import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fiunnnblaihdpupunijs.supabase.co",
  process.env.SR_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const SECTIONS = {
  hero: {
    label: "[BENZADID INTELLIGENCE]",
    headline: ["Everyone Talks AI.", "I Deliver It."],
    glitchWord: "AI",
    subtext: "Your Website. Your Agents. Your AI Strategy. Sorted.",
    subsubtext: "Websites. Automation. Agents. Mentorship. — For professionals tired of average results.",
    cta1: { label: "Let Me Show You Something Different", href: "/work" },
    cta2: { label: "Get In Touch With Me", href: "/contact" },
    microtag: "Ex-Dentist · AI Generalist · AI Builder · AI Instructor",
  },
  trust_stats: {
    items: [
      { number: 1100, prefix: "", suffix: "+", label: "Professionals Mentored in AI" },
      { number: 20, prefix: "", suffix: "+", label: "Professional Website Built" },
      { number: 500, prefix: "$", suffix: "/mo", label: "Saved Per Client" },
      { number: 200, prefix: "", suffix: "+ hrs", label: "Eliminated Annually" },
    ],
  },
  pain_hook: {
    lines: ["You're brilliant at what you do.", "Your online presence doesn't show it.", "That ends here."],
    subtext:
      "Doctors. Engineers. Architects. Business owners.\nThe most qualified people in the room — often with the weakest digital presence.\nNot because they don't care. Because they never had time.\nI fix that.",
  },
  what_i_do: {
    label: "[IN A NUTSHELL]",
    pairs: [
      { problem: "If your website looks nothing like your expertise —", solution: "I'll build one that does." },
      { problem: "If your team is drowning in the same tasks every day —", solution: "I'll automate them." },
      { problem: "If you need visuals and videos but can't afford a studio —", solution: "I'll create them with AI." },
      { problem: "If your company uses AI tools but nothing has improved —", solution: "I'll audit it and consult on the fix." },
      { problem: "If your people need real AI direction —", solution: "I'll mentor them into confident users." },
    ],
    tags: ["AI Website", "AI Agents & Automation", "AI Content Creation", "AI Audit & Consultancy", "Mentorship"],
    subtext: "One person. Five solutions. Built for professionals who are serious about AI.",
  },
  about_snippet: {
    label: "THE PERSON BEHIND THE BUILD",
    lines: ["I went all in on AI.", "Built.", "Trained.", "Delivered.", "Now I build for you."],
    body: "I spent years as a dental surgeon — building precision, discipline, and a deep understanding of how professionals work.\n\nThen in 2022, AI changed everything. I went all in: prompting, agents, automation, content, websites.\n\nI trained 1,100+ students, built automation systems saving clients $500/month, and never looked back.\n\nNow I build AI-powered solutions for professionals who know AI matters — and want someone who gets their world.",
    cta: { label: "Read My Full Story →", href: "/about" },
  },
  tools: {
    items: ["ChatGPT", "Claude", "Gemini", "n8n", "Make", "Zapier", "Airtable", "VAPI", "Relevance AI", "Blotato", "Kling", "Veo 3.1", "Sora", "Higgsfield", "Reve", "Grok", "Freepik", "Next.js", "Supabase"],
  },
  final_cta: {
    bigText: ["The question isn't", "whether AI matters.", "It's whether you'll", "use it before your", "competitors do."],
    subtext: "I help professionals move first.",
    options: [
      { title: "Need an AI Website?", description: "Premium site built for your profession", href: "/services/website", cta: "Hire Me →" },
      { title: "Need AI Automation?", description: "Save 200+ hrs/year with agents", href: "/services/automation", cta: "Automate It →" },
      { title: "Need AI Content?", description: "Images & videos, no studio needed", href: "/services/content", cta: "See Examples →" },
      { title: "Need AI Consultancy?", description: "Audit the gaps and plan the rollout", href: "/services/audit", cta: "Get Consulted →" },
      { title: "Need Mentorship?", description: "1-on-1, group, or staff AI training", href: "/services/guidance", cta: "Start Mentorship →" },
    ],
  },
};

async function run() {
  for (const [section, content] of Object.entries(SECTIONS)) {
    const { error } = await supabase
      .from("page_content")
      .upsert({ page: "home", section, content }, { onConflict: "page,section" });
    console.log(section, error ? "ERROR: " + error.message : "OK");
  }
}

run();
