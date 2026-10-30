import type { Metadata } from "next";
import { headers } from "next/headers";
import { siteUrl, socialImage } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SMDev | Izrada poslovnih sajtova i web aplikacija",
    template: "%s | SMDev",
  },
  description: "Izrada poslovnih sajtova, web aplikacija i redizajn za firme kojima treba jasno, brzo i pouzdano online prisustvo. Pogledajte SMDev projekte i katalog dizajna.",
  keywords: [
    "fullstack developer",
    "izrada sajtova",
    "poslovni sajtovi",
    "web aplikacije",
    "redizajn sajta",
    "održavanje sajta",
  ],
  openGraph: {
    type: "website",
    siteName: "SMDev",
    locale: "sr_RS",
    title: "SMDev | Izrada poslovnih sajtova i web aplikacija",
    description: "Poslovni sajtovi i web aplikacije prilagođeni stvarnim potrebama vašeg biznisa.",
    url: siteUrl,
    images: [socialImage("sr")],
  },
  twitter: { card: "summary_large_image", images: [socialImage("sr").url] },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("x-smdev-locale") === "en" ? "en" : "sr-Latn";
  return (
    <html lang={locale} className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
