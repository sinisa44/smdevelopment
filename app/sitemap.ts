import type { MetadataRoute } from "next";
import { languageAlternates, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pairs = [
    ["/", "/en", "1"],
    ["/izrada-sajtova", "/en/business-websites", "0.9"],
    ["/katalog", "/en/catalog", "0.8"],
  ] as const;
  return pairs.flatMap(([sr, en, priority]) => [sr, en].map(path => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: Number(priority),
    alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(sr, en)).map(([lang, route]) => [lang, `${siteUrl}${route}`])) },
  })));
}
