import { notFound } from "next/navigation";
import { DesignDemo } from "@/components/catalog";
import { findDesign } from "@/lib/catalog";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const design = findDesign((await params).slug);
  return { title: design ? `${design.name} — demo poslovnog sajta` : "Primer dizajna sajta", description: design?.desc[1], robots: { index: false, follow: true } };
}

export default async function Demo({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const design = findDesign(slug);
  if (!design) notFound();
  return <DesignDemo design={design} locale="sr"/>;
}
