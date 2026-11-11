import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/content/site";
import { photos } from "@/content/photos";
import { heroVideo } from "@/content/video";

export const metadata: Metadata = {
  title: "Image credits",
  description: `Credits for the illustrative photographs and film used on the ${site.name} website.`,
  alternates: { canonical: "/credits" },
  robots: { index: false, follow: true },
};

/**
 * Attribution required by the Creative Commons licences (CC BY / CC BY-SA) of
 * the illustrative photographs and film. Kept off the main pages, but it must
 * stay reachable while these images are used. Once they are replaced with the
 * Foundation's own media, this page and its footer link can be removed.
 */
const ext = { target: "_blank", rel: "noopener noreferrer", className: "text-link" } as const;

export default function CreditsPage() {
  return (
    <article className="pt-18 lg:pt-20">
      <header className="border-b border-rule bg-stone">
        <div className="wrap py-16 sm:py-20">
          <p className="type-eyebrow text-gold-dark">{site.name}</p>
          <h1 className="type-headline mt-6 text-ink">Image credits</h1>
          <p className="type-lead mt-6 max-w-2xl text-ink-soft">
            The photographs and film on this website are illustrative images from Wikimedia Commons, used under
            Creative Commons licences. They do not depict the Foundation&apos;s beneficiaries, programmes or events.
          </p>
        </div>
      </header>

      <div className="wrap space-y-14 py-16 sm:py-20">
        <section aria-labelledby="credits-photos">
          <h2 id="credits-photos" className="type-title text-ink">
            Photographs
          </h2>
          <ul className="mt-6 grid gap-x-12 gap-y-3 text-base leading-relaxed text-ink-soft md:grid-cols-2">
            {Object.values(photos).map(({ credit }) => (
              <li key={credit.sourceUrl}>
                <a href={credit.sourceUrl} {...ext}>
                  &ldquo;{credit.title}&rdquo;
                </a>{" "}
                by {credit.author},{" "}
                <a href={credit.licenseUrl} {...ext}>
                  {credit.license}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">Images have been resized and cropped for layout.</p>
        </section>

        <section aria-labelledby="credits-film">
          <h2 id="credits-film" className="type-title text-ink">
            Homepage film
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
            A montage edited (trimmed, slowed, colour-graded and cross-faded) from the footage below, shared under{" "}
            <a href={heroVideo.license.url} {...ext}>
              {heroVideo.license.name}
            </a>
            .
          </p>
          <ul className="mt-6 grid gap-x-12 gap-y-3 text-base leading-relaxed text-ink-soft md:grid-cols-2">
            {heroVideo.sources.map((v) => (
              <li key={v.sourceUrl}>
                <a href={v.sourceUrl} {...ext}>
                  &ldquo;{v.title}&rdquo;
                </a>{" "}
                by {v.author},{" "}
                <a href={v.licenseUrl} {...ext}>
                  {v.license}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Link href="/" className="link-cta text-ink">
          Back to the homepage
        </Link>
      </div>
    </article>
  );
}
