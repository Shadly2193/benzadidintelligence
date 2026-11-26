import { pageMetadata } from "@/lib/seo";
import ServicePageTemplate from "@/components/sections/ServicePageTemplate";
import { getService } from "@/lib/data/services";

export async function generateMetadata() {
  return pageMetadata("audit");
}

export default async function AuditServicePage() {
  const service = await getService("audit");
  return <ServicePageTemplate service={service} />;
}
