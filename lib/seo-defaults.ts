// Everything here is a code default. Admin → SEO & Profile saves overrides in
// page_content (page = "seo"); a saved row always wins over these defaults.

export const SITE_URL = "https://www.benzadidintelligence.com";
export const PERSON_NAME = "Dr. Md. Shadly Benzadid";

export type PageSeo = { title: string; description: string };

export const SEO_PAGES: Record<string, { path: string; label: string; seo: PageSeo }> = {
  home: {
    path: "/",
    label: "Home",
    seo: {
      title: "Benzadid Intelligence by Dr. Md. Shadly Benzadid — AI Generalist & Medical Website Developer",
      description:
        "Dr. Md. Shadly Benzadid builds AI-powered websites for doctors and dental clinics, AI agents and automation, and coaches doctors in digital marketing.",
    },
  },
  about: {
    path: "/about",
    label: "About",
    seo: {
      title: "Dr. Md. Shadly Benzadid — AI Generalist, Medical Website Developer & Digital Marketing Coach for Doctors",
      description:
        "BDS (Sher-e-Bangla Medical College), MPH (North South University), PLOS ONE researcher and founder of Benzadid Intelligence. AI websites for doctors and digital marketing coaching.",
    },
  },
  website: {
    path: "/services/website",
    label: "Service: Website",
    seo: {
      title: "Websites for Doctors & Dental Clinics — Dr. Md. Shadly Benzadid",
      description:
        "Professional, bilingual, SEO-ready websites for doctors, dentists and clinics with an admin panel, appointment booking and Google Business Profile setup. From $550.",
    },
  },
  automation: {
    path: "/services/automation",
    label: "Service: Automation",
    seo: {
      title: "AI Agents & Automation for Clinics and Businesses — Dr. Md. Shadly Benzadid",
      description: "AI agents, chatbots and automation systems that save hours every week, built by Dr. Md. Shadly Benzadid at Benzadid Intelligence.",
    },
  },
  content: {
    path: "/services/content",
    label: "Service: Content",
    seo: {
      title: "AI Content Creation: Images, Ads & Video — Dr. Md. Shadly Benzadid",
      description: "AI-generated commercials, brand films and visuals without a studio, by Dr. Md. Shadly Benzadid at Benzadid Intelligence.",
    },
  },
  audit: {
    path: "/services/audit",
    label: "Service: Audit",
    seo: {
      title: "AI Audit & Consultancy — Dr. Md. Shadly Benzadid",
      description: "An AI audit of your tools and workflows with a clear plan to fix the gaps, by AI Generalist Dr. Md. Shadly Benzadid.",
    },
  },
  guidance: {
    path: "/services/guidance",
    label: "Service: Mentorship",
    seo: {
      title: "AI Mentorship & Training for Doctors and Teams — Dr. Md. Shadly Benzadid",
      description: "One-on-one, group and staff AI training from Dr. Md. Shadly Benzadid, who has trained 1,100+ learners.",
    },
  },
  work: {
    path: "/work",
    label: "Work",
    seo: {
      title: "Doctor Website Portfolio & AI Work — Dr. Md. Shadly Benzadid",
      description: "Real websites built for doctors and dental clinics, AI commercials and AI agent systems by Dr. Md. Shadly Benzadid.",
    },
  },
  contact: {
    path: "/contact",
    label: "Contact",
    seo: {
      title: "Contact Dr. Md. Shadly Benzadid — Benzadid Intelligence",
      description: "Book a free call with Dr. Md. Shadly Benzadid about a website for your chamber, AI automation, content or the digital marketing course for doctors.",
    },
  },
};

export type Profile = {
  name: string;
  alternateNames: string[];
  jobTitles: string[];
  knowsAbout: string[];
  sameAs: string[];
  image: string;
};

export const DEFAULT_PROFILE: Profile = {
  name: PERSON_NAME,
  alternateNames: ["Shadly Benzadid", "Md. Shadly Benzadid", "Mohammad Shadly Benzadid"],
  jobTitles: [
    "AI Generalist",
    "AI Medical Website Developer",
    "Digital Marketing Strategist for Doctors",
    "Founder, Benzadid Intelligence",
  ],
  knowsAbout: [
    "Websites for doctors",
    "Dental clinic websites",
    "Medical website development",
    "Digital marketing for doctors",
    "Personal branding for doctors",
    "SEO for doctors",
    "AI agents",
    "AI automation",
    "AI chatbots for clinics",
    "Prompt engineering",
    "AI content creation",
    "Public health",
    "Dentistry",
  ],
  sameAs: [
    "https://www.youtube.com/@benzadidintelligence",
    "https://www.facebook.com/Mr.Benzadid/",
    "https://www.linkedin.com/in/md-shadly-benzadid-5b3402193",
  ],
  image: "/images/about-today-work-page.jpeg",
};


export type Faq = { q: string; a: string };
export type AboutMore = {
  whoTitle: string;
  whoText: string;
  whoSub: string;
  facts: { label: string; value: string }[];
  journeyTitle: string;
  journey: { period: string; title: string; points: string[]; image?: string }[];
  nowTitle: string;
  cards: { title: string; text: string; link: string; linkText: string }[];
  numbers: { value: string; label: string }[];
  faq: Faq[];
};

export const DEFAULT_ABOUT_MORE: AboutMore = {
  whoTitle: "Who is Dr. Md. Shadly Benzadid?",
  whoText:
    "Dr. Md. Shadly Benzadid is an AI Generalist, AI Medical Website Developer and Digital Marketing Strategist for doctors. A dental graduate (BDS, Sher-e-Bangla Medical College), a public health professional (MPH, North South University) and a published researcher, he works where healthcare meets artificial intelligence.",
  whoSub:
    "He is the founder of Benzadid Intelligence, where he builds AI-powered websites for doctors and dental clinics, creates AI agents and automation, and coaches doctors in digital marketing and personal branding through the Digital Residency Program: Beyond MBBS & BDS.",
  facts: [
    { label: "Role", value: "AI Generalist · AI Medical Website Developer" },
    { label: "Coaching", value: "Digital marketing strategist & coach for doctors" },
    { label: "Education", value: "BDS · MPH" },
    { label: "Research", value: "Published in PLOS ONE" },
    { label: "Now", value: "Founder, Benzadid Intelligence" },
  ],
  journeyTitle: "From dentistry to AI",
  journey: [
    {
      period: "2013 – 2017",
      title: "Dentistry",
      points: ["BDS at Sher-e-Bangla Medical College", "Merit Award as top scorer in the final professional exam"],
      image: "/images/about/merit-award.jpg",
    },
    {
      period: "Public Health & Research",
      title: "MPH and research",
      points: [
        "MPH at North South University, hired as a Research Assistant for academic performance",
        "Publication in PLOS ONE",
        "Collaboration with McMaster University, Canada and CNRS, leading to an NCD-related publication",
      ],
    },
    {
      period: "Humanitarian work",
      title: "National NGO, Teknaf",
      points: [
        "Started as a Program Officer at a national NGO",
        "About 2.5 years in Teknaf, Cox's Bazar with NGO Forum for Public Health",
        "Completed a BDT 3.5 crore project with Australian Humanitarian Partnership, Oxfam Bangladesh and icddr,b",
        "5+ annual reports and 500+ reports, documents and communications",
      ],
    },
    {
      period: "2022 – Today",
      title: "Artificial intelligence",
      points: [
        "Started working with AI from the launch of ChatGPT in 2022",
        "Launched a course on AI in research with 360 Academy, attended by professors, associate professors, researchers and PhD holders",
        "Former AI Lead & Prompt Engineer at Purplebot: AI content, video and workflows for UCB Bank, BRAC EPL, Chillox and Medix Healthcare",
        "Public Relations & Branding at a national NGO",
      ],
    },
  ],
  nowTitle: "Helping doctors grow online",
  cards: [
    {
      title: "AI-powered websites for doctors & dental clinics",
      text: "Medical website development with SEO, appointment booking and an admin panel the doctor controls.",
      link: "/work",
      linkText: "See the work →",
    },
    {
      title: "Digital marketing coaching for doctors",
      text: "The Digital Residency Program: Beyond MBBS & BDS. 16 weeks of digital marketing strategy, personal branding and AI for doctors.",
      link: "/courses/digital-residency-program",
      linkText: "View the program →",
    },
    {
      title: "AI agents, chatbots & automation",
      text: "AI agents, chatbots for clinics, automation and content systems for healthcare and business.",
      link: "/services/automation",
      linkText: "Services →",
    },
  ],
  numbers: [
    { value: "1,100+", label: "learners trained" },
    { value: "20+", label: "doctor websites built" },
    { value: "500+", label: "reports & documents" },
    { value: "3.5 Cr", label: "BDT project delivered" },
  ],
  faq: [
    {
      q: "Who is Dr. Md. Shadly Benzadid?",
      a: "A BDS graduate of Sher-e-Bangla Medical College with an MPH from North South University, a published researcher, and the founder of Benzadid Intelligence.",
    },
    {
      q: "Who builds websites for doctors in Bangladesh?",
      a: "Dr. Md. Shadly Benzadid, an AI Medical Website Developer, builds websites for doctors, dentists and clinics through Benzadid Intelligence, for clients in Bangladesh and abroad.",
    },
    {
      q: "Is there a digital marketing course for doctors?",
      a: "Yes. The Digital Residency Program: Beyond MBBS & BDS is a digital marketing and personal branding course for doctors, dentists and medical Students, coached by Dr. Md. Shadly Benzadid.",
    },
    {
      q: "What is an AI Generalist?",
      a: "Someone who uses many AI tools across fields. Dr. Md. Shadly Benzadid applies AI to research, healthcare, branding and business, and teaches doctors to do the same.",
    },
    {
      q: "What does Benzadid Intelligence do?",
      a: "It builds professional websites for doctors and clinics, AI automation and AI agents, and runs training for doctors on digital marketing.",
    },
  ],
};

export const DEFAULT_WEBSITE_FAQ: Faq[] = [
  {
    q: "How much does a website for a doctor cost?",
    a: "The Essential plan starts from $550 and the Premium plan from $800. A custom appointment booking system is a +$200 add-on. Hospitals and software platforms start from $3,000.",
  },
  {
    q: "How long does it take to build?",
    a: "Usually 75–90 days, personally built by Dr. Md. Shadly Benzadid, with payment in 3 installments.",
  },
  {
    q: "Can I update my website myself?",
    a: "Yes. Every site comes with a custom admin panel, so you can change your bio, services and photos any time.",
  },
  {
    q: "Will patients find my website on Google?",
    a: "Each site is mobile-first and SEO-ready, includes SEO blog articles and a Google Business Profile setup so patients find you on Google Search and Maps.",
  },
  {
    q: "Do you build websites for doctors outside Bangladesh?",
    a: "Yes. Benzadid Intelligence builds websites for doctors, dentists and clinics in Bangladesh and abroad.",
  },
  {
    q: "Is the website in English and Bangla?",
    a: "Yes. Both plans include a bilingual site in English and Bangla.",
  },
];
