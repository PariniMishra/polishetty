import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// Share card shown when the site link is posted on WhatsApp, LinkedIn, X, etc.
export const alt = `${site.name}: ${site.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const [display, logo] = await Promise.all([
  readFile(join(root, "src/assets/fonts/InterTight-SemiBold.ttf")),
  readFile(join(root, "public/logo-light.png")),
]);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const ink = "#0e1311";
const paper = "#f7f7f4";
const saffron = "#ff6b1a";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ink,
          color: paper,
          padding: "72px 80px",
          fontFamily: "Inter Tight",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={256} height={72} alt="" />

        <div style={{ display: "flex", flexDirection: "column", fontSize: 100, lineHeight: 0.98, letterSpacing: "-0.05em" }}>
          <span>A chance to learn.</span>
          <span style={{ color: saffron }}>A life with dignity.</span>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `3px solid ${saffron}`,
            paddingTop: 28,
            fontSize: 30,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: "rgba(251,250,247,0.75)",
            maxWidth: 940,
          }}
        >
          {site.description}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: display, style: "normal", weight: 600 },
      ],
    },
  );
}
