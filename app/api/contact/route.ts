import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(3).max(140),
  projectType: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(20).max(4000),
  company: z.string().max(0).optional().default(""),
  locale: z.enum(["en", "sr"]).default("en"),
  startedAt: z.number(),
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Contact email environment variables are not configured.");
    return NextResponse.json({ error: "Email service is unavailable." }, { status: 503 });
  }

  const { name, email, subject, projectType, message, locale } = parsed.data;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to: [to], reply_to: email, subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType || "Not selected"}\nLanguage: ${locale}\n\n${message}`,
      html: `<h2>New portfolio inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Project type:</strong> ${escapeHtml(projectType || "Not selected")}</p><p><strong>Language:</strong> ${locale}</p><hr><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!response.ok) {
    console.error("Resend rejected contact email", response.status);
    return NextResponse.json({ error: "Email delivery failed." }, { status: 502 });
  }
  recentRequests.set(address, now);
  return NextResponse.json({ ok: true });
}
