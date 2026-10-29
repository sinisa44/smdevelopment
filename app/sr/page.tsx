import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = {
  title: "Siniša — Fullstack developer i partner za web rešenja",
  description:
    "Brzi i pouzdani poslovni sajtovi, WordPress rešenja i web aplikacije zasnovane na fullstack iskustvu.",
  alternates: { canonical: "/sr", languages: { en: "/", "sr-Latn": "/sr" } },
};

export default function SerbianHome() {
  return <Portfolio locale="sr" />;
}
