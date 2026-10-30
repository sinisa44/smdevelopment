import type { Metadata } from "next";
import { BusinessWebsites } from "@/components/business-websites";
import { languageAlternates, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Izrada poslovnih sajtova za male firme",
  description: "SMDev izrađuje poslovne sajtove za male firme: jasna ponuda, dobar mobilni prikaz, kontakt forma i sadržaj koji odgovara vašem poslu. Pogledajte proces i dizajne.",
  alternates: { canonical: "/izrada-sajtova", languages: languageAlternates("/izrada-sajtova", "/en/business-websites") },
  openGraph: { type: "website", siteName: "SMDev", locale: "sr_RS", url: `${siteUrl}/izrada-sajtova`, title: "Izrada poslovnih sajtova za male firme | SMDev", description: "Jasan sajt koji predstavlja vašu ponudu i olakšava kontakt sa kupcima.", images: [socialImage("sr")] },
};

export default function BusinessWebsitesPage() {
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Početna", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Izrada sajtova", item: `${siteUrl}/izrada-sajtova` },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/><BusinessWebsites locale="sr"/></>;
}
