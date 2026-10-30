import { DesignCatalog } from "@/components/catalog";
export const metadata = { title: "Website design catalog", description: "Explore six website design directions for small businesses. Choose a starting point for your SMDev website.", alternates: { canonical: "/catalog", languages: { en: "/catalog", "sr-Latn": "/sr/katalog" } } };
export default function Catalog() { return <DesignCatalog locale="en"/>; }
