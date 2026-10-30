import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";
import { languageAlternates, siteUrl } from "@/lib/seo";
import { contact } from "@/lib/cv";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: languageAlternates("/", "/en") },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "SMDev", url: `${siteUrl}/`, inLanguage: ["sr-Latn", "en"] },
      { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "SMDev", url: `${siteUrl}/`, email: contact.email, telephone: contact.phoneHref, address: { "@type": "PostalAddress", addressLocality: "Bečej", addressCountry: "RS" } },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/><Portfolio locale="sr" /></>;
}
