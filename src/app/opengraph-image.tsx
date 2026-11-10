import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// Share card shown when the site link is posted on WhatsApp, LinkedIn, X, etc.
export const alt = `${site.name}: ${site.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const [serif, serifItalic, logo] = await Promise.all([
  readFile(join(root, "src/assets/fonts/DMSerifDisplay-Regular.ttf")),
  readFile(join(root, "src/assets/fonts/DMSerifDisplay-Italic.ttf")),
  readFile(join(root, "public/logo-light.png")),
]);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const ink = "#152f27"; // brand-deep
const paper = "#fbf9f4";
const goldLight = "#dbb85e";

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
          fontFamily: "DM Serif Display",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={256} height={72} alt="" />

        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1, letterSpacing: "-0.03em" }}>
          <span>A chance to learn.</span>
          <span style={{ fontStyle: "italic", color: goldLight, marginTop: 8 }}>A life with dignity.</span>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `1px solid rgba(251,250,247,0.2)`,
            paddingTop: 28,
            fontSize: 30,
            lineHeight: 1.35,
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
        { name: "DM Serif Display", data: serif, style: "normal", weight: 400 },
        { name: "DM Serif Display", data: serifItalic, style: "italic", weight: 400 },
      ],
    },
  );
}
