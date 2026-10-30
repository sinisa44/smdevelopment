import { permanentRedirect } from "next/navigation";

export default async function LegacySerbianDemo({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  permanentRedirect(`/katalog/${encodeURIComponent(slug)}`);
}
