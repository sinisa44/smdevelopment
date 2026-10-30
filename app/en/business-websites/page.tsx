import type { Metadata } from "next";
import { BusinessWebsites } from "@/components/business-websites";
import { languageAlternates, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Business websites for small companies",
  description: "SMDev builds business websites with a clear offer, strong mobile experience, contact forms and content shaped around your company. Explore the process and designs.",
  alternates: { canonical: "/en/business-websites", languages: languageAlternates("/izrada-sajtova", "/en/business-websites") },
  openGraph: { type: "website", siteName: "SMDev", locale: "en_GB", url: `${siteUrl}/en/business-websites`, title: "Business websites for small companies | SMDev", description: "A clear website that presents your offer and makes it easier for customers to reach you.", images: [socialImage("en")] },
  twitter: { card: "summary_large_image", images: [socialImage("en").url] },
};

export default function BusinessWebsitesPage() {
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "Business websites", item: `${siteUrl}/en/business-websites` },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/><BusinessWebsites locale="en"/></>;
}
