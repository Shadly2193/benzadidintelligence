import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { createClient } from "@/lib/supabase/server";

async function getSiteData() {
  const supabase = await createClient();
  const [settingsRes, servicesRes] = await Promise.all([
    supabase.from("site_settings").select("key, value"),
    supabase.from("services").select("slug, description").order("sort_order"),
  ]);
  const general = settingsRes.data?.find((d) => d.key === "general")?.value ?? {};
  const socials = settingsRes.data?.find((d) => d.key === "socials")?.value?.items ?? [];
  return { general, socials, services: servicesRes.data ?? [] };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { general, socials, services } = await getSiteData();

  return (
    <>
      <ScrollToTop />
      <Navbar siteName={general.site_name ?? "Benzadid Intelligence"} logoUrl={general.logo_url ?? "/images/logo.png"} services={services} />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={general.site_name ?? "Benzadid Intelligence"}
        tagline={general.tagline ?? ""}
        logoUrl={general.logo_url ?? "/images/logo.png"}
        contactEmail={general.contact_email ?? ""}
        socials={socials}
      />
    </>
  );
}
