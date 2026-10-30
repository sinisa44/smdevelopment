import type { Locale } from "./content";

export const briefNeeds = [
  { id: "services", sr: "Predstavljanje usluga", en: "Service pages" },
  { id: "gallery", sr: "Galerija ili portfolio", en: "Gallery or portfolio" },
  { id: "booking", sr: "Zakazivanje ili rezervacije", en: "Bookings or reservations" },
  { id: "products", sr: "Proizvodi ili katalog", en: "Products or catalogue" },
  { id: "map", sr: "Mapa i kontakt", en: "Map and contact" },
  { id: "updates", sr: "Sadržaj koji lako menjam", en: "Easy content updates" },
] as const;

export const briefTimelines = [
  { id: "asap", sr: "Što pre", en: "As soon as possible" },
  { id: "soon", sr: "U naredna 1–2 meseca", en: "Within 1–2 months" },
  { id: "flexible", sr: "Bez čvrstog roka", en: "No fixed deadline" },
] as const;

export function briefNeedLabels(value: string, locale: Locale) {
  return value.split(",").map(id => briefNeeds.find(item => item.id === id)?.[locale]).filter(Boolean).join(", ");
}

export function briefTimelineLabel(value: string, locale: Locale) {
  return briefTimelines.find(item => item.id === value)?.[locale] ?? "";
}
