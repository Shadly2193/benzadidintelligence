import { SITE_URL } from "@/lib/seo-defaults";

// Course schema for the Digital Residency Program, using the live course content.
export default function CourseJsonLd({ amount, currency, start, faq }: { amount?: number; currency?: string; start?: string; faq?: [string, string][] }) {
  const url = `${SITE_URL}/courses/digital-residency-program`;
  const graph: any[] = [
    {
      "@type": "Course",
      "@id": `${url}#course`,
      name: "Digital Residency Program: Beyond MBBS & BDS",
      description:
        "A 16-week live digital marketing, personal branding and AI program for doctors, dentists and medical Students in Bangladesh, taught by Dr. Md. Shadly Benzadid.",
      url,
      inLanguage: ["en", "bn"],
      provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Benzadid Intelligence", url: SITE_URL },
      instructor: { "@type": "Person", "@id": `${SITE_URL}/about#person`, name: "Dr. Md. Shadly Benzadid", url: `${SITE_URL}/about` },
      audience: { "@type": "EducationalAudience", educationalRole: "MBBS and BDS doctors, medical and dental Students" },
      about: ["Digital marketing for doctors", "Personal branding for doctors", "AI for doctors", "Websites for doctors"],
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        ...(start ? { startDate: start.slice(0, 10) } : {}),
        courseWorkload: "P16W",
        instructor: { "@id": `${SITE_URL}/about#person` },
      },
      ...(amount
        ? { offers: { "@type": "Offer", price: amount, priceCurrency: currency || "BDT", category: "Paid", url, availability: "https://schema.org/InStock" } }
        : {}),
    },
  ];
  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    });
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\u003c") }}
    />
  );
}
