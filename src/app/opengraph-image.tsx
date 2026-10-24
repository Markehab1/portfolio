import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

// The preview image shown when the site is shared on LinkedIn, WhatsApp, etc.
export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#0A0A0A",
          color: "#F4F4F5",
        }}
      >
        <div style={{ display: "flex", width: 120, height: 10, borderRadius: 5, background: "#60A5FA" }} />
        <div style={{ display: "flex", marginTop: 48, fontSize: 112, fontWeight: 700, letterSpacing: -3 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 56, color: "#60A5FA" }}>
          {profile.title}
        </div>
        <div style={{ display: "flex", marginTop: 56, fontSize: 30, color: "#A1A1AA" }}>
          {profile.availability}
        </div>
      </div>
    ),
    size,
  );
}
