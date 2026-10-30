import { permanentRedirect } from "next/navigation";

export default async function LegacyEnglishDemo({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  permanentRedirect(`/en/catalog/${encodeURIComponent(slug)}`);
}
