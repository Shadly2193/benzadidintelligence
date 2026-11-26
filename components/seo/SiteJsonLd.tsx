import { getProfile, SITE_URL } from "@/lib/seo";

// Person + Organization + WebSite schema, rendered once in the site layout.
export default async function SiteJsonLd() {
  const p = await getProfile();
  const personId = `${SITE_URL}/about#person`;
  const orgId = `${SITE_URL}/#organization`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: p.name,
        alternateName: p.alternateNames,
        url: `${SITE_URL}/about`,
        image: p.image?.startsWith("http") ? p.image : `${SITE_URL}${p.image}`,
        jobTitle: p.jobTitles,
        honorificPrefix: "Dr.",
        worksFor: { "@id": orgId },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Sher-e-Bangla Medical College" },
          { "@type": "CollegeOrUniversity", name: "North South University" },
        ],
        hasCredential: [
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Bachelor of Dental Surgery (BDS)" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Master of Public Health (MPH)" },
        ],
        knowsAbout: p.knowsAbout,
        sameAs: p.sameAs,
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Benzadid Intelligence",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        founder: { "@id": personId },
        sameAs: p.sameAs,
        description:
          "AI-powered websites for doctors and dental clinics, AI agents and automation, and digital marketing coaching for doctors.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Benzadid Intelligence",
        publisher: { "@id": orgId },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }} />;
}
