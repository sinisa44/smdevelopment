import type { Metadata } from "next";
import { DesignBrief } from "@/components/design-brief";

export const metadata: Metadata = { title: "Kratak upitnik za sajt", description: "Recite nam čime se bavite, šta vam treba i kada želite da počnete." };

export default function BriefPage() { return <DesignBrief locale="sr"/>; }
