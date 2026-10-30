import { notFound } from "next/navigation";
import { DesignDemo } from "@/components/catalog";
import { findDesign } from "@/lib/catalog";
export const metadata = { title: "Primer dizajna sajta", robots: { index: false, follow: true } };
export default async function Demo({ params }: { params: Promise<{slug:string}> }) { const {slug} = await params; const design=findDesign(slug); if(!design) notFound(); return <DesignDemo design={design} locale="sr"/>; }
