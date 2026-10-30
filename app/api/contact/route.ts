import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { findDesign } from "@/lib/catalog";
import { briefNeeds, briefTimelines, briefNeedLabels, briefTimelineLabel } from "@/lib/brief";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(3).max(140),
  projectType: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(20).max(4000),
  company: z.string().max(0).optional().default(""),
  locale: z.enum(["en", "sr"]).default("en"),
  startedAt: z.number(),
  design: z.string().max(40).optional().default("").refine(value => !value || !!findDesign(value)),
  brandName: z.string().trim().max(60).optional().default(""),
  brandPrimary: z.union([z.literal(""), z.string().regex(/^#[0-9a-f]{6}$/i)]).optional().default(""),
  brandSecondary: z.union([z.literal(""), z.string().regex(/^#[0-9a-f]{6}$/i)]).optional().default(""),
  brandFont: z.union([z.literal(""), z.string().regex(/^#[0-9a-f]{6}$/i)]).optional().default(""),
  website: z.union([z.literal(""), z.string().url().max(500).refine(value => /^https?:\/\//i.test(value))]).optional().default(""),
  briefIndustry: z.string().trim().max(80).optional().default(""),
  briefNeeds: z.string().max(80).optional().default("").refine(value => !value || value.split(",").every(id => briefNeeds.some(item => item.id === id))),
  briefTimeline: z.string().max(20).optional().default("").refine(value => !value || briefTimelines.some(item => item.id === value)),
});

const recentRequests = new Map<string, number>();

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields." }, { status: 422 });

  const now = Date.now();
  if (now - parsed.data.startedAt < 2_000 || now - parsed.data.startedAt > 7_200_000) return NextResponse.json({ error: "Invalid form timing." }, { status: 400 });
  const address = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (now - (recentRequests.get(address) ?? 0) < 30_000) return NextResponse.json({ error: "Please wait before sending another message." }, { status: 429 });

  const gmailAddress = process.env.GMAIL_ADDRESS;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!gmailAddress || !gmailAppPassword) {
    console.error("Contact email environment variables are not configured.");
    return NextResponse.json({ error: "Email service is unavailable." }, { status: 503 });
  }

  const { name, email, subject, projectType, message, locale, design, brandName, brandPrimary, brandSecondary, brandFont, website, briefIndustry, briefNeeds: selectedNeeds, briefTimeline } = parsed.data;
  const selectedDesign = findDesign(design)?.name ?? "Not selected";
  const needsLabel = briefNeedLabels(selectedNeeds, locale);
  const timelineLabel = briefTimelineLabel(briefTimeline, locale);
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: gmailAddress, pass: gmailAppPassword },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    await transport.sendMail({
      from: `SMDev sajt <${gmailAddress}>`,
      to: gmailAddress,
      replyTo: { name, address: email },
      subject: `[SMDev] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType || "Not selected"}\nDesign: ${selectedDesign}\nBusiness name in demo: ${brandName || "Not provided"}\nPrimary: ${brandPrimary || "Not selected"}\nSecondary: ${brandSecondary || "Not selected"}\nFont: ${brandFont || "Not selected"}\nExisting website: ${website || "Not provided"}\nIndustry: ${briefIndustry || "Not provided"}\nWebsite needs: ${needsLabel || "Not provided"}\nTiming: ${timelineLabel || "Not provided"}\nLanguage: ${locale}\n\n${message}`,
      html: `<h2>New SMDev inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Project type:</strong> ${escapeHtml(projectType || "Not selected")}</p><p><strong>Design:</strong> ${escapeHtml(selectedDesign)}</p><p><strong>Business name in demo:</strong> ${escapeHtml(brandName || "Not provided")}</p><p><strong>Primary:</strong> ${escapeHtml(brandPrimary || "Not selected")}</p><p><strong>Secondary:</strong> ${escapeHtml(brandSecondary || "Not selected")}</p><p><strong>Font:</strong> ${escapeHtml(brandFont || "Not selected")}</p><p><strong>Existing website:</strong> ${escapeHtml(website || "Not provided")}</p><p><strong>Industry:</strong> ${escapeHtml(briefIndustry || "Not provided")}</p><p><strong>Website needs:</strong> ${escapeHtml(needsLabel || "Not provided")}</p><p><strong>Timing:</strong> ${escapeHtml(timelineLabel || "Not provided")}</p><p><strong>Language:</strong> ${locale}</p><hr><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
  } catch (error) {
    console.error("Gmail rejected contact email", error);
    return NextResponse.json({ error: "Email delivery failed." }, { status: 502 });
  }
  recentRequests.set(address, now);
  return NextResponse.json({ ok: true });
}
