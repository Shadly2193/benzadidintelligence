import ContactPageClient from "@/components/sections/ContactPageClient";
import { createClient } from "@/lib/supabase/server";

async function getContactData() {
  const supabase = await createClient();
  const [settingsRes, servicesRes] = await Promise.all([
    supabase.from("site_settings").select("key, value"),
    supabase.from("services").select("slug, title").order("sort_order"),
  ]);
  const general = settingsRes.data?.find((d) => d.key === "general")?.value ?? {};
  const socials = settingsRes.data?.find((d) => d.key === "socials")?.value?.items ?? [];
  return {
    contactEmail: general.contact_email ?? "",
    socials,
    services: servicesRes.data ?? [],
  };
}

export default async function ContactPage() {
  const { contactEmail, socials, services } = await getContactData();
  return <ContactPageClient contactEmail={contactEmail} socials={socials} services={services} />;
}
