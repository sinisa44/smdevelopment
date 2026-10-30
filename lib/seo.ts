export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://smdevelopment-nine.vercel.app").replace(/\/$/, "");

export const socialImage = (locale: "sr" | "en") => ({
  url: `${siteUrl}${locale === "sr" ? "" : "/en"}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: locale === "sr" ? "SMDev — poslovni sajtovi i web aplikacije" : "SMDev — business websites and web applications",
});

export const languageAlternates = (srPath: string, enPath: string) => ({
  "sr-Latn": srPath,
  en: enPath,
  "x-default": srPath,
});
