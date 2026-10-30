import { DesignCatalog } from "@/components/catalog";

export const metadata = {
  title: "Katalog dizajna sajtova",
  description: "Izaberite izgled sajta za svoj mali biznis. Osamnaest različitih dizajna koje SMDev prilagođava vašoj firmi.",
  alternates: { canonical: "/katalog", languages: { "sr-Latn": "/katalog", en: "/en/catalog" } },
};

export default function Catalog() { return <DesignCatalog locale="sr"/>; }
