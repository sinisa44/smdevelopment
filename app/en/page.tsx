import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";
import { languageAlternates, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "SMDev | Business Websites & Web Applications" },
  description: "Business websites, custom web applications and redesigns for companies that need a clear, fast and reliable online presence. Explore SMDev work and website designs.",
  alternates: { canonical: "/en", languages: languageAlternates("/", "/en") },
  openGraph: {
    type: "website", siteName: "SMDev", locale: "en_GB", url: `${siteUrl}/en`,
    title: "SMDev | Business Websites & Web Applications",
    description: "Websites and web applications shaped around practical business needs.",
    images: [socialImage("en")],
  },
  twitter: { card: "summary_large_image", images: [socialImage("en").url] },
};

export default function EnglishHome() {
  return <Portfolio locale="en" />;
}
