import { notFound } from "next/navigation";
import { DesignDemo } from "@/components/catalog";
import { findDesign } from "@/lib/catalog";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const design = findDesign((await params).slug);
  return { title: design ? `${design.name} — website demo` : "Website design demo", description: design?.desc[0], robots: { index: false, follow: true } };
}

export default async function Demo({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const design = findDesign(slug);
  if (!design) notFound();
  return <DesignDemo design={design} locale="en"/>;
}
