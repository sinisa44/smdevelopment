import { DesignCatalog } from "@/components/catalog";
import { languageAlternates, siteUrl, socialImage } from "@/lib/seo";

export const metadata = {
  title: "Website designs for small businesses",
  description: "Explore 18 website examples for salons, restaurants, clinics, service businesses and shops. Choose a design SMDev can tailor to your company.",
  alternates: { canonical: "/en/catalog", languages: languageAlternates("/katalog", "/en/catalog") },
  openGraph: { type: "website", siteName: "SMDev", locale: "en_GB", url: `${siteUrl}/en/catalog`, title: "Website designs for small businesses | SMDev", description: "18 website examples for small businesses. Choose a direction and make it your own.", images: [socialImage("en")] },
  twitter: { card: "summary_large_image", images: [socialImage("en").url] },
};

export default function Catalog() { return <DesignCatalog locale="en"/>; }
