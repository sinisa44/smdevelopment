import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { "sr-Latn": "/", en: "/en" } },
};

export default function Home() {
  return <Portfolio locale="sr" />;
}
