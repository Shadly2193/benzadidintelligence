export const SITE_NAME = "Benzadid Intelligence";
export const SITE_TAGLINE = "Building AI-powered futures for professionals — one system at a time.";
export const CONTACT_EMAIL = "benzadidintelligence@gmail.com";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AI Website", href: "/services/website" },
      { label: "AI Agents & Automation", href: "/services/automation" },
      { label: "AI Content Creation", href: "/services/content" },
      { label: "AI Audit & Consultancy", href: "/services/audit" },
      { label: "Mentorship", href: "/services/guidance" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@benzadidintelligence", icon: "youtube" },
  { label: "Facebook", href: "https://www.facebook.com/Mr.Benzadid/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/benzadidintelligence/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-shadly-benzadid-5b3402193", icon: "linkedin" },
  { label: "Twitter/X", href: "https://x.com/Benzadidintel", icon: "twitter" },
  { label: "Pinterest", href: "https://www.pinterest.com/benzadidintelligence/", icon: "pinterest" },
  { label: "TikTok", href: "https://www.tiktok.com/@benzadid.intelligence", icon: "tiktok" },
];

export const HERO = {
  label: "[BENZADID INTELLIGENCE]",
  headline: ["Everyone Talks AI.", "I Deliver It."],
  glitchWord: "AI",
  subtext: "Your Website. Your Agents. Your AI Strategy. Sorted.",
  subsubtext: "Websites. Automation. Agents. Mentorship. — For professionals tired of average results.",
  cta1: { label: "Let Me Show You Something Different", href: "/work" },
  cta2: { label: "Get In Touch With Me", href: "/contact" },
  microtag: "Ex-Dentist · AI Generalist · AI Builder · AI Instructor",
};

export const TRUST_STATS = [
  { number: 1100, suffix: "+", label: "Professionals Mentored in AI" },
  { number: 20, suffix: "+", label: "Professional Website Built" },
  { number: 500, prefix: "$", suffix: "/mo", label: "Saved Per Client" },
  { number: 200, suffix: "+ hrs", label: "Eliminated Annually" },
];

export const PAIN_HOOK = {
  lines: [
    "You're brilliant at what you do.",
    "Your online presence doesn't show it.",
    "That ends here.",
  ],
  subtext:
    "Doctors. Engineers. Architects. Business owners.\nThe most qualified people in the room — often with the weakest digital presence.\nNot because they don't care. Because they never had time.\nI fix that.",
};

export const WHAT_I_DO = {
  label: "[IN A NUTSHELL]",
  pairs: [
    {
      problem: "If your website looks nothing like your expertise —",
      solution: "I'll build one that does.",
    },
    {
      problem: "If your team is drowning in the same tasks every day —",
      solution: "I'll automate them.",
    },
    {
      problem: "If you need visuals and videos but can't afford a studio —",
      solution: "I'll create them with AI.",
    },
    {
      problem: "If your company uses AI tools but nothing has improved —",
      solution: "I'll audit it and consult on the fix.",
    },
    {
      problem: "If your people need real AI direction —",
      solution: "I'll mentor them into confident users.",
    },
  ],
  tags: ["AI Website", "AI Agents & Automation", "AI Content Creation", "AI Audit & Consultancy", "Mentorship"],
  subtext: "One person. Five solutions. Built for professionals who are serious about AI.",
};

export const ABOUT_SNIPPET = {
  label: "THE PERSON BEHIND THE BUILD",
  bigLines: ["I went all in on AI.", "Built. Trained. Delivered.", "Now I build for you."],
  body: "I spent years as a dental surgeon — building precision, discipline, and a deep understanding of how professionals work.\n\nThen in 2022, AI changed everything. I went all in: prompting, agents, automation, content, websites.\n\nI trained 1,100+ students, built automation systems saving clients $500/month, and never looked back.\n\nNow I build AI-powered solutions for professionals who know AI matters — and want someone who gets their world.",
  cta: { label: "Read My Full Story →", href: "/about" },
};

export const SERVICES = [
  {
    number: "01",
    slug: "website",
    title: "AI-Powered Website",
    bigHeadline: ["Your expertise deserves", "a website that shows it."],
    pain: "Doctors and engineers spend a decade becoming world-class.\nThen their website looks like it was made in 2009. On a lunch break.",
    description:
      "I build custom, modern websites — specifically designed for high-skilled professionals.\nFast. Beautiful. Built to convert visitors into clients.",
    cta: { label: "See Examples →", href: "/services/website" },
    features: [
      "Custom design built for your profession",
      "Booking & appointment integrations",
      "Mobile-first, fast, SEO-ready",
      "Lead capture & contact system",
      "Social + YouTube connected",
      "Optimised for conversions, not just looks",
    ],
    pricing: "Starting from ৳30,000",
    bestFor: "Doctors · Dentists · Architects · Engineers · Consultants",
  },
  {
    number: "02",
    slug: "automation",
    title: "AI Agents & Automation",
    bigHeadline: ["Your time is too valuable", "for repetitive tasks."],
    pain: "Responding to the same emails. Posting content manually. Answering calls one by one.\nYou didn't build your business to babysit workflows. Let AI handle it.",
    description:
      "I design and deploy AI agents that work while you sleep — handling emails, calls, posts, content, and more.\nMy clients recover an average of 200+ hours per year.",
    cta: { label: "See How It Works →", href: "/services/automation" },
    features: [
      "Voice AI Receptionist (100+ calls/day)",
      "Social Media Agent (200+ posts/month)",
      "Email Handler (500+ emails/week)",
      "Content Creation Pipeline",
      "Customer Support Bot (24/7)",
      "Custom workflow for your process",
    ],
    pricing: "Starting from ৳40,000",
    bestFor: "Businesses · Clinics · Agencies · Content teams",
  },
  {
    number: "03",
    slug: "content",
    title: "AI Content Creation",
    bigHeadline: ["Studio-quality visuals.", "Zero production budget."],
    pain: "Great content wins attention. But hiring photographers, videographers, and editors is slow and expensive.\nAI can produce premium images and videos — if you know how to wield it.",
    description:
      "I produce AI-generated images and videos for brands, ads, and social media — using the most powerful tools in the world.\nFrom static visuals to full video ads, delivered fast and built to perform.",
    cta: { label: "See the Work →", href: "/services/content" },
    features: [
      "AI image generation (Reve, Grok, Gemini, Freepik)",
      "AI video ads (Kling, Veo 3.1, Sora, Higgsfield)",
      "Brand-consistent visual identity",
      "Social media content packs",
      "Ad creatives optimised for CTR",
      "Fast turnaround — no production delays",
    ],
    pricing: "Starting from ৳15,000",
    bestFor: "Brands · Businesses · Agencies · Content creators",
  },
  {
    number: "04",
    slug: "audit",
    title: "AI Audit & Consultancy",
    bigHeadline: ["You're using AI.", "But is it actually working?"],
    pain: "Most companies say they 'use AI.' But their tools are scattered, their team is confused, and the results don't match the investment.\nThat's not an AI problem. That's a strategy problem.",
    description:
      "I audit your current AI setup, identify the gaps, and consult on a practical rollout plan your team can actually follow.\nFrom scattered tools to a clear AI operating system.",
    cta: { label: "Get an AI Audit →", href: "/services/audit" },
    features: [
      "Review all AI tools currently in use",
      "Identify what's working, wasted, or missing",
      "Map gaps between AI potential and output",
      "Deliver clear audit report + action plan",
      "Consult on tool selection, workflows, and rollout",
      "Ongoing advisory support available after the audit",
    ],
    pricing: "Starting from ৳5,000",
    bestFor: "Companies with 5–100+ staff · Leadership teams · Scaling businesses",
  },
  {
    number: "05",
    slug: "guidance",
    title: "Mentorship",
    bigHeadline: ["You don't need more AI noise.", "You need direction."],
    pain: "YouTube taught you the tools. Courses gave you certificates. But your next move still feels unclear.\nWhether you're learning alone or trying to upskill a team, AI only matters when people know how to use it in real work.",
    description:
      "I mentor professionals, groups, and teams with practical AI guidance — from 1-on-1 sessions to group training and staff capacity development.\nNo generic syllabus. We build confidence around your goals, your tools, and your actual workflow.",
    cta: { label: "Start Mentorship →", href: "/services/guidance" },
    features: [
      "1-on-1 AI mentorship for professionals",
      "Group training for teams and departments",
      "Staff capacity development on practical AI use",
      "ChatGPT mastery, prompting, and tool workflows",
      "Profession-specific AI roadmap",
      "Session resources, recordings, and action plan",
    ],
    pricing: "From ৳3,000 / session",
    bestFor: "Professionals · Teams · Companies building AI capacity · Anyone who tried courses but still feels lost",
  },
];

export const CASE_STUDIES = [
  {
    id: 1,
    title: "Sports Content Automation System",
    category: "AI Agents",
    problem:
      "A sports media client needed content pulled from their app and posted on Twitter/X — daily, automatically, with zero manual work.",
    solution:
      "Built a full n8n pipeline: app connection, data filtering, AI caption generation, Airtable tracking, Slack approval loop, auto-publishing via Blotato.",
    results: ["50+ posts/week", "Fully automated", "Zero manual effort"],
    tools: ["n8n", "Airtable", "Blotato", "Slack API", "AI Agents"],
    href: "/services/automation",
    cta: "See the system →",
  },
  {
    id: 2,
    title: "Full AI Agent Suite — Purplebot LLC",
    category: "AI Agents",
    problem: "Client needed a complete set of AI agents to handle multiple business operations simultaneously.",
    solution:
      "Built 7 specialized agents: Voice AI Receptionist, Social Media Agent, Content Creation Agent, Email Handler, FB Auto-Reply Agent, Gmail Handler, and Sports News Agent.",
    results: ["200+ hrs/year saved", "$500/mo per client", "7 agents running 24/7"],
    tools: ["n8n", "VAPI", "Relevance AI", "Make", "Airtable"],
    href: "/services/automation",
    cta: "See the system →",
  },
  {
    id: 3,
    title: "AI Visual & Video Ad Campaign",
    category: "Content",
    problem: "Client needed high-quality advertising visuals and video content without traditional production costs.",
    solution:
      "Full AI content pipeline — static visuals using Reve, Grok, Gemini; video ads using Kling, Veo 3.1, Sora, and Higgsfield.",
    results: ["5,000+ impressions", "One ad hit 10,000+ views", "Improved client CTR"],
    tools: ["Kling", "Veo 3.1", "Sora", "Higgsfield", "Reve", "Grok", "Gemini"],
    href: "/services/content",
    cta: "See the work →",
  },
];

export const TOOLS = [
  "n8n", "Relevance AI", "VAPI", "Make", "Lovable", "Bolt", "Cursor",
  "Kling", "Veo 3.1", "Sora", "Higgsfield", "Reve", "Grok", "Gemini",
  "ChatGPT", "Airtable", "Slack", "Blotato", "Freepik",
];

export const TESTIMONIALS = [
  {
    quote:
      "Before this course, I had no idea prompting was a skill in itself. As a clinician, I thought AI was something for tech people. Shadly changed that completely. Within weeks I was writing prompts that actually worked — for research, for writing, for daily tasks. One of the most practical learning experiences I've had outside of medicine.",
    author: "Dr. Asaduz Zaman Sarwar",
    role: "Asst. Professor, Endodontics, BSMMU",
    avatar: "/images/testimonial-asaduz-zaman.jpg",
  },
  {
    quote:
      "The course materials were incredibly well-structured. Shadly has a rare ability to explain AI concepts in plain language without dumbing it down. I came in skeptical and left with a complete understanding of how prompting actually works. The way he teaches — methodical, clear, practical — made all the difference.",
    author: "Dr. Mirza Asif Adnan",
    role: "Project Lead, Cox's Bazar FDMN Camp · HMBD Foundation",
    avatar: "/images/testimonial-mirza-asif.png",
  },
  {
    quote:
      "Shadly is one of the most dedicated people I've worked with in the AI space. His contribution to our content creation at Purplebot has been consistently excellent — insightful, on-brand, and ahead of the curve. He doesn't just understand AI tools, he knows how to make them work for real business outcomes.",
    author: "Ifteker Mahmud",
    role: "CEO, Purplebot",
    avatar: "/images/testimonial-ifteker.jpg",
  },
];

export const FINAL_CTA = {
  bigText: ["The question isn't", "whether AI matters.", "It's whether you'll", "use it before your", "competitors do."],
  subtext: "I help professionals move first.",
  options: [
    {
      title: "Need an AI Website?",
      description: "Premium site built for your profession",
      href: "/services/website",
      cta: "Hire Me →",
    },
    {
      title: "Need AI Automation?",
      description: "Save 200+ hrs/year with agents",
      href: "/services/automation",
      cta: "Automate It →",
    },
    {
      title: "Need AI Content?",
      description: "Images & videos, no studio needed",
      href: "/services/content",
      cta: "See Examples →",
    },
    {
      title: "Need AI Consultancy?",
      description: "Audit the gaps and plan the rollout",
      href: "/services/audit",
      cta: "Get Consulted →",
    },
    {
      title: "Need Mentorship?",
      description: "1-on-1, group, or staff AI training",
      href: "/services/guidance",
      cta: "Start Mentorship →",
    },
  ],
};

export const ABOUT_PAGE = {
  bigLines: ["From learner to builder.", "From builder to educator.", "This is my story."],
  subtext: "My path wasn't straight. But every step sharpened what I do now.",
  timeline: [
    {
      period: "2013–2017",
      role: "Dental Surgeon → AI Generalist",
      body: "Graduated with a BDS from Sher-e-Bangla Medical College. Treated patients. Won the Pepsodent Merit Award. Learned what precision, patience, and working under pressure really means.",
    },
    {
      period: "Late 2022",
      role: "The Shift",
      body: "ChatGPT launched. I was hooked — not as a casual user, but as a builder. I spent months going deep: prompting, image generation, video, automation, agents. I saw what most professionals were missing. And I knew I could bridge that gap.",
    },
    {
      period: "2023–Now",
      role: "AI Practitioner & Builder",
      body: "Created a ChatGPT mastery course — 1,100+ students trained. Joined Purplebot LLC as AI Prompt Engineer. Built automation systems, AI agents, visual content pipelines. Now I build complete AI solutions for professionals who are ready for what's next.",
    },
  ],
  philosophy: {
    big: ["AI doesn't replace experts.", "It multiplies them."],
    sub: "A doctor with AI sees more patients.\nAn architect with AI explores more designs.\nA business with AI serves more people.\nMy job is to build that multiplier — for you.",
  },
};
