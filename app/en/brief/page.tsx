import type { Metadata } from "next";
import { DesignBrief } from "@/components/design-brief";

export const metadata: Metadata = { title: "Website brief", description: "Tell us about your business, what your website needs, and when you would like to start." };

export default function BriefPage() { return <DesignBrief locale="en"/>; }
