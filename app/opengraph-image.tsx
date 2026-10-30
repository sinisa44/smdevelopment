import { ImageResponse } from "next/og";
import { siteUrl } from "@/lib/seo";

export const alt = "SMDev — poslovni sajtovi i web aplikacije";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 70px", background: "#f2efe7", color: "#101522", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 800 }}><div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 58, height: 58, background: "#101522", color: "#f2efe7", fontSize: 44, fontFamily: "Georgia, serif", fontStyle: "italic" }}>S</div>SMDev</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}><div style={{ width: 80, height: 8, background: "#ff4f38" }}/><div style={{ display: "flex", flexDirection: "column", fontSize: 78, lineHeight: 1.03, letterSpacing: -5, fontWeight: 900 }}><span>Sajt koji radi</span><span>za vaš biznis.</span></div><div style={{ fontSize: 29 }}>Poslovni sajtovi · Web aplikacije · Redizajn</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #101522", paddingTop: 22, fontSize: 19 }}><span>SMDev / DIGITALNA REŠENJA</span><span>{new URL(siteUrl).host}</span></div>
    </div>,
    size,
  );
}
