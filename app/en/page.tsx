import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = {
  title: "SMDev — Fullstack Developer & Web Solutions Partner",
  description: "Fast, reliable business websites and custom web applications built with fullstack engineering expertise.",
  alternates: { canonical: "/en", languages: { "sr-Latn": "/", en: "/en" } },
  openGraph: {
    title: "SMDev — Fullstack Developer & Web Solutions Partner",
    description: "Websites and web applications shaped around practical business needs.",
  },
};

export default function EnglishHome() {
  return <Portfolio locale="en" />;
}
