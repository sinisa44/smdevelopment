import { DesignCatalog } from "@/components/catalog";

export const metadata = {
  title: "Website design catalog",
  description: "Explore eighteen website design directions for small businesses. Choose a starting point for your SMDev website.",
  alternates: { canonical: "/en/catalog", languages: { "sr-Latn": "/katalog", en: "/en/catalog" } },
};

export default function Catalog() { return <DesignCatalog locale="en"/>; }
