import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Siniša — Fullstack Developer & Web Solutions Partner",
    template: "%s | Siniša",
  },
  description:
    "Fast, reliable business websites, WordPress solutions and custom web applications built with fullstack engineering expertise.",
  keywords: [
    "fullstack developer",
    "web developer",
    "WordPress developer",
    "business website development",
    "custom web applications",
    "website redesign",
    "website maintenance",
  ],
  alternates: { languages: { en: "/", "sr-Latn": "/sr" } },
  openGraph: {
    type: "website",
    title: "Siniša — Fullstack Developer & Web Solutions Partner",
    description: "Websites and web applications shaped around practical business needs.",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
