import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SMDev — Fullstack razvoj i web rešenja",
    template: "%s | SMDev",
  },
  description:
    "Brzi i pouzdani poslovni sajtovi i web aplikacije zasnovane na fullstack iskustvu.",
  keywords: [
    "fullstack developer",
    "izrada sajtova",
    "poslovni sajtovi",
    "web aplikacije",
    "redizajn sajta",
    "održavanje sajta",
  ],
  alternates: { languages: { "sr-Latn": "/", en: "/en" } },
  openGraph: {
    type: "website",
    title: "SMDev — Fullstack razvoj i web rešenja",
    description: "Sajtovi i web aplikacije prilagođeni stvarnim potrebama poslovanja.",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
