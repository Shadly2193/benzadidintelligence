import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fiunnnblaihdpupunijs.supabase.co",
  process.env.SR_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const SETTINGS = {
  general: {
    site_name: "Benzadid Intelligence",
    tagline: "Building AI-powered futures for professionals — one system at a time.",
    contact_email: "benzadidintelligence@gmail.com",
    logo_url: "/images/logo.png",
    favicon_url: "/favicon.ico",
  },
  socials: {
    items: [
      { label: "YouTube", href: "https://www.youtube.com/@benzadidintelligence", icon: "youtube" },
      { label: "Facebook", href: "https://www.facebook.com/Mr.Benzadid/", icon: "facebook" },
      { label: "Instagram", href: "https://www.instagram.com/benzadidintelligence/", icon: "instagram" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/md-shadly-benzadid-5b3402193", icon: "linkedin" },
      { label: "Twitter/X", href: "https://x.com/Benzadidintel", icon: "twitter" },
      { label: "Pinterest", href: "https://www.pinterest.com/benzadidintelligence/", icon: "pinterest" },
      { label: "TikTok", href: "https://www.tiktok.com/@benzadid.intelligence", icon: "tiktok" },
    ],
  },
};

async function run() {
  for (const [key, value] of Object.entries(SETTINGS)) {
    const { error } = await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    console.log(key, error ? "ERROR: " + error.message : "OK");
  }
}

run();
