import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { SERVICES } from "@/lib/content";

export default function AuditServicePage() {
  const service = SERVICES.find((s) => s.slug === "audit")!;
  return <ServicePageTemplate service={service} />;
}
