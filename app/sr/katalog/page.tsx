import { DesignCatalog } from "@/components/catalog";
export const metadata = { title: "Katalog dizajna sajtova", description: "Izaberite izgled sajta za svoj mali biznis. Šest različitih dizajna koje SMDev prilagođava vašoj firmi.", alternates: { canonical: "/sr/katalog", languages: { en: "/catalog", "sr-Latn": "/sr/katalog" } } };
export default function Catalog() { return <DesignCatalog locale="sr"/>; }
