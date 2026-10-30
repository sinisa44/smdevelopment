import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SMDev — Fullstack Developer & Web Solutions Partner",
    template: "%s | SMDev",
  },
  description:
    "Fast, reliable business websites and custom web applications built with fullstack engineering expertise.",
  keywords: [
    "fullstack developer",
    "web developer",
    "business website development",
    "custom web applications",
    "website redesign",
    "website maintenance",
  ],
  alternates: { languages: { en: "/", "sr-Latn": "/sr" } },
  openGraph: {
    type: "website",
    title: "SMDev — Fullstack Developer & Web Solutions Partner",
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
