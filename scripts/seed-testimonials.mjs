import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fiunnnblaihdpupunijs.supabase.co",
  process.env.SR_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const TESTIMONIALS = [
  {
    quote: "Before this course, I had no idea prompting was a skill in itself. As a clinician, I thought AI was something for tech people. Shadly changed that completely. Within weeks I was writing prompts that actually worked — for research, for writing, for daily tasks. One of the most practical learning experiences I've had outside of medicine.",
    author: "Dr. Asaduz Zaman Sarwar",
    role: "Asst. Professor, Endodontics, BSMMU",
    avatar_url: "/images/testimonial-asaduz-zaman.jpg",
    sort_order: 0,
  },
  {
    quote: "The course materials were incredibly well-structured. Shadly has a rare ability to explain AI concepts in plain language without dumbing it down. I came in skeptical and left with a complete understanding of how prompting actually works. The way he teaches — methodical, clear, practical — made all the difference.",
    author: "Dr. Mirza Asif Adnan",
    role: "Project Lead, Cox's Bazar FDMN Camp · HMBD Foundation",
    avatar_url: "/images/testimonial-mirza-asif.png",
    sort_order: 1,
  },
  {
    quote: "Shadly is one of the most dedicated people I've worked with in the AI space. His contribution to our content creation at Purplebot has been consistently excellent — insightful, on-brand, and ahead of the curve. He doesn't just understand AI tools, he knows how to make them work for real business outcomes.",
    author: "Ifteker Mahmud",
    role: "CEO, Purplebot",
    avatar_url: "/images/testimonial-ifteker.jpg",
    sort_order: 2,
  },
];

async function run() {
  await supabase.from("testimonials").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("testimonials").insert(TESTIMONIALS.map((t) => ({ ...t, published: true })));
  console.log(error ? "ERROR: " + error.message : "OK — 3 testimonials seeded");
}

run();
