import { DesignCatalog } from "@/components/catalog";
import { languageAlternates, siteUrl, socialImage } from "@/lib/seo";

export const metadata = {
  title: "Katalog dizajna za poslovne sajtove",
  description: "Pogledajte 18 primera sajtova za salone, restorane, ordinacije, uslužne firme i prodavnice. Izaberite dizajn koji SMDev prilagođava vašem poslu.",
  alternates: { canonical: "/katalog", languages: languageAlternates("/katalog", "/en/catalog") },
  openGraph: { type: "website", siteName: "SMDev", locale: "sr_RS", url: `${siteUrl}/katalog`, title: "Katalog dizajna za poslovne sajtove | SMDev", description: "18 primera sajtova za male firme. Izaberite pravac i prilagodite ga svom poslu.", images: [socialImage("sr")] },
};

export default function Catalog() { return <DesignCatalog locale="sr"/>; }
