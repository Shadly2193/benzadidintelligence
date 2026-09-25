import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fiunnnblaihdpupunijs.supabase.co",
  process.env.SR_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const SERVICES = [
  {
    slug: "website", number: "01", title: "AI-Powered Website",
    big_headline: ["Your expertise deserves", "a website that shows it."],
    pain: "Doctors — you spent a decade becoming world-class.\nBut your website looks like it was made in 2009.\nYour website is your digital asset, your own digital chamber.\nIf you don't decorate it beautifully, what was the point of building it?",
    description: "I build custom, modern websites — specifically designed for high-skilled professionals.\nFast. Beautiful. Built to convert visitors into clients.",
    cta_label: "See Examples →", cta_href: "/services/website",
    features: ["Custom design built for your profession", "Booking & appointment integrations", "Mobile-first, fast, SEO-ready", "Lead capture & contact system", "Social + YouTube connected", "Optimised for conversions, not just looks"],
    pricing: "Starting from $550", best_for: "Doctors · Dentists · Architects · Engineers · Consultants", sort_order: 1,
  },
  {
    slug: "automation", number: "02", title: "AI Agents & Automation",
    big_headline: ["Your time is too valuable", "for repetitive tasks."],
    pain: "Responding to the same emails. Posting content manually. Answering calls one by one.\nYou didn't build your business to babysit workflows. Let AI handle it.",
    description: "I design and deploy AI agents that work while you sleep — handling emails, calls, posts, content, and more.\nMy clients recover an average of 200+ hours per year.",
    cta_label: "See How It Works →", cta_href: "/services/automation",
    features: ["Voice AI Receptionist (100+ calls/day)", "Social Media Agent (200+ posts/month)", "Email Handler (500+ emails/week)", "Content Creation Pipeline", "Customer Support Bot (24/7)", "Custom workflow for your process"],
    pricing: "Starting from $400", best_for: "Businesses · Clinics · Agencies · Content teams", sort_order: 2,
  },
  {
    slug: "content", number: "03", title: "AI Content Creation",
    big_headline: ["Studio-quality visuals.", "Zero production budget."],
    pain: "Great content wins attention. But hiring photographers, videographers, and editors is slow and expensive.\nAI can produce premium images and videos — if you know how to wield it.",
    description: "I produce AI-generated images and videos for brands, ads, and social media — using the most powerful tools in the world.\nFrom static visuals to full video ads, delivered fast and built to perform.",
    cta_label: "See the Work →", cta_href: "/services/content",
    features: ["AI image generation (Reve, Grok, Gemini, Freepik)", "AI video ads (Kling, Veo 3.1, Sora, Higgsfield)", "Brand-consistent visual identity", "Social media content packs", "Ad creatives optimised for CTR", "Fast turnaround — no production delays"],
    pricing: "Starting from $200", best_for: "Brands · Businesses · Agencies · Content creators", sort_order: 3,
  },
  {
    slug: "audit", number: "04", title: "AI Audit & Consultancy",
    big_headline: ["You're using AI.", "But is it actually working?"],
    pain: "Most companies say they 'use AI.' But their tools are scattered, their team is confused, and the results don't match the investment.\nThat's not an AI problem. That's a strategy problem.",
    description: "I audit your current AI setup, identify the gaps, and consult on a practical rollout plan your team can actually follow.\nFrom scattered tools to a clear AI operating system.",
    cta_label: "Get an AI Audit →", cta_href: "/services/audit",
    features: ["Review all AI tools currently in use", "Identify what's working, wasted, or missing", "Map gaps between AI potential and output", "Deliver clear audit report + action plan", "Consult on tool selection, workflows, and rollout", "Ongoing advisory support available after the audit"],
    pricing: "Starting from $100", best_for: "Companies with 5–100+ staff · Leadership teams · Scaling businesses", sort_order: 4,
  },
  {
    slug: "guidance", number: "05", title: "Mentorship",
    big_headline: ["You don't need more AI noise.", "You need direction."],
    pain: "YouTube taught you the tools. Courses gave you certificates. But your next move still feels unclear.\nWhether you're learning alone or trying to upskill a team, AI only matters when people know how to use it in real work.",
    description: "I mentor professionals, groups, and teams with practical AI guidance — from 1-on-1 sessions to group training and staff capacity development.\nNo generic syllabus. We build confidence around your goals, your tools, and your actual workflow.",
    cta_label: "Start Mentorship →", cta_href: "/services/guidance",
    features: ["1-on-1 AI mentorship for professionals", "Group training for teams and departments", "Staff capacity development on practical AI use", "ChatGPT mastery, prompting, and tool workflows", "Profession-specific AI roadmap", "Session resources, recordings, and action plan"],
    pricing: "From $49 / session", best_for: "Professionals · Teams · Companies building AI capacity · Anyone who tried courses but still feels lost", sort_order: 5,
  },
];

const TIER_FEATURES = {
  essential: [
    ["Bilingual site (English + Bangla)", "Speak to every patient, in the language they trust"],
    ["Fully custom admin panel", "Update your own bio, services, and photos — anytime"],
    ["5 SEO blog articles", "Start showing up when patients Google your specialty"],
    ["Google Business Profile setup", "Get found on Google Maps and local search from day one"],
    ["Unique, modern, beautiful design", "A website that finally matches the trust you've earned"],
    ["Booking & lead capture system", "Turn visitors into booked appointments, automatically"],
    ["Mobile-first, fast, SEO-ready", "Built for how patients actually search, on their phone"],
    ["Personally built by me, 75–90 days", "No agency hand-offs, no outsourcing"],
    ["Pay in 3 installments", "Spread the cost across the build, zero pressure upfront"],
  ],
  premium: [
    ["Bilingual site (English + Bangla)", "Speak to every patient, in the language they trust"],
    ["Fully custom admin panel", "Update your own bio, services, and photos — anytime"],
    ["10 SEO blog articles", "Double the content, double the ways patients discover you"],
    ["Google Business Profile setup", "Get found on Google Maps and local search from day one"],
    ["3D & scroll-triggered animations", "A site that moves and reacts as patients scroll"],
    ["Eye-catching, animated hero section", "The first 3 seconds that make a patient stay"],
    ["High-end, agency-level visual design", "The kind of website patients screenshot to friends"],
    ["Booking & lead capture system", "Turn visitors into booked appointments, automatically"],
    ["Mobile-first, fast, SEO-ready", "Built for how patients actually search, on their phone"],
    ["FREE 5–6 session personal guidance", "I coach you on social media & digital growth, alongside the build"],
    ["Personally built by me, 75–90 days", "No agency hand-offs, no outsourcing"],
    ["Pay in 3 installments", "Spread the cost across the build, zero pressure upfront"],
  ],
};

const COMPARISON_ROWS = [
  { feature: "Bilingual site (English + Bangla)", essential_value: "true", premium_value: "true", premium_only: false },
  { feature: "Fully custom admin panel", essential_value: "true", premium_value: "true", premium_only: false },
  { feature: "Google Business Profile setup", essential_value: "true", premium_value: "true", premium_only: false },
  { feature: "Booking & lead capture system", essential_value: "true", premium_value: "true", premium_only: false },
  { feature: "Mobile-first, fast, SEO-ready", essential_value: "true", premium_value: "true", premium_only: false },
  { feature: "Personally built by me, 75–90 days", essential_value: "true", premium_value: "true", premium_only: false },
  { feature: "Pay in 3 installments", essential_value: "true", premium_value: "true", premium_only: false },
  { feature: "SEO blog articles", essential_value: "5 articles", premium_value: "10 articles", premium_only: true },
  { feature: "Design style", essential_value: "Modern & beautiful", premium_value: "3D & scroll-animated", premium_only: true },
  { feature: "Hero section", essential_value: "Clean, professional", premium_value: "Eye-catching, animated", premium_only: true },
  { feature: "Video / 3D video animation", essential_value: "false", premium_value: "true", premium_only: true },
  { feature: "Visual finish", essential_value: "Modern", premium_value: "Agency-level, premium", premium_only: true },
  { feature: "Personal guidance (marketing & social growth)", essential_value: "false", premium_value: "FREE 5–6 sessions", premium_only: true },
];

const CUSTOM_PLAN_POINTS = [
  "Patient data tracking & management systems",
  "Payment gateway integration",
  "Custom features built around your exact workflow",
  "Hospital / multi-department / software-based platforms",
];

async function run() {
  console.log("Seeding services...");
  for (const s of SERVICES) {
    const { error } = await supabase.from("services").upsert(s, { onConflict: "slug" });
    if (error) console.error("  services error:", s.slug, error.message);
  }

  console.log("Seeding pricing tiers...");
  const tierIds = {};
  for (const key of ["essential", "premium"]) {
    const row = {
      service_slug: "website",
      key,
      name: key === "essential" ? "Essential" : "Premium",
      price: key === "essential" ? 550 : 800,
      best_for:
        key === "essential"
          ? "Professionals who want a clean, modern presence — fast and beautiful."
          : "Doctors who want to look like the #1 choice in their field — not just \"a good option.\"",
      recommended: key === "premium",
      sort_order: key === "essential" ? 1 : 2,
    };
    const { data, error } = await supabase
      .from("pricing_tiers")
      .upsert(row, { onConflict: "service_slug,key" })
      .select()
      .single();
    if (error) { console.error("  tier error:", key, error.message); continue; }
    tierIds[key] = data.id;
  }

  console.log("Seeding tier features...");
  for (const [key, features] of Object.entries(TIER_FEATURES)) {
    const tierId = tierIds[key];
    if (!tierId) continue;
    await supabase.from("pricing_tier_features").delete().eq("tier_id", tierId);
    const rows = features.map(([label, sub], i) => ({ tier_id: tierId, label, sub, sort_order: i }));
    const { error } = await supabase.from("pricing_tier_features").insert(rows);
    if (error) console.error("  features error:", key, error.message);
  }

  console.log("Seeding comparison rows...");
  await supabase.from("comparison_rows").delete().eq("service_slug", "website");
  const compRows = COMPARISON_ROWS.map((r, i) => ({ ...r, service_slug: "website", sort_order: i }));
  { const { error } = await supabase.from("comparison_rows").insert(compRows); if (error) console.error("  comparison error:", error.message); }

  console.log("Seeding custom plan points...");
  await supabase.from("custom_plan_points").delete().eq("service_slug", "website");
  const cpRows = CUSTOM_PLAN_POINTS.map((point, i) => ({ service_slug: "website", point, sort_order: i }));
  { const { error } = await supabase.from("custom_plan_points").insert(cpRows); if (error) console.error("  custom plan error:", error.message); }

  console.log("Done.");
}

run();
