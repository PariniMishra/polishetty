import Image from "next/image";
import { contactDetails, site } from "@/content/site";
import { photos } from "@/content/photos";
import { focusAreas } from "@/content/focus";
import { heroVideo } from "@/content/video";
import SocialLinks, { activeSocial } from "./SocialLinks";
import { ArrowIcon } from "./Icons";

const linkCls = "text-paper/80 transition-colors hover:text-paper hover:underline underline-offset-[0.3em]";

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-paper">
      <div className="wrap pt-20 sm:pt-28">
        {/* Signature + call to action */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
            Education. Care. <em className="text-gold-light">Dignity.</em>
          </p>
          <a href={site.requestSupportHref} className="btn btn-light shrink-0 self-start lg:self-auto">
            Request Support
            <ArrowIcon />
          </a>
        </div>

        <div className="mt-16 grid gap-y-12 border-t border-paper/15 pt-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <Image src="/logo-light.png" alt={site.name} width={1050} height={295} className="h-11 w-auto" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-paper/70">{site.description}</p>
            <p className="type-eyebrow mt-6 text-paper/50">{site.established}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <h2 className="type-eyebrow text-gold-light">Explore</h2>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkCls}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="type-eyebrow text-gold-light">Focus areas</h2>
            <ul className="mt-5 space-y-3">
              {focusAreas.map((area) => (
                <li key={area.id}>
                  <a href={`/#${area.id}`} className={linkCls}>
                    {area.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="type-eyebrow text-gold-light">Contact</h2>
            <ul className="mt-5 space-y-3">
              {contactDetails.map(({ label, value, href }) => (
                <li key={label}>
                  <span className="sr-only">{label}: </span>
                  {href ? (
                    <a href={href} className={`${linkCls} wrap-break-word`}>
                      {value}
                    </a>
                  ) : (
                    <span className="whitespace-pre-line text-paper/80">{value}</span>
                  )}
                </li>
              ))}
              <li>
                <a href={site.requestSupportHref} className={linkCls}>
                  Send us an enquiry
                </a>
              </li>
            </ul>
            {activeSocial.length > 0 && (
              <div className="mt-6">
                <SocialLinks tone="light" />
              </div>
            )}
          </div>
        </div>

        {/* Legal, photo disclosure and Creative Commons attribution */}
        <div id="photo-credits" className="mt-16 scroll-mt-24 border-t border-paper/15 py-8 text-[0.875rem] leading-relaxed text-paper/60 sm:mt-20">
          <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-10">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:col-span-4">
              <p>
                © {new Date().getFullYear()} {site.name}
              </p>
              <a href="/privacy" className={linkCls}>
                Privacy Policy
              </a>
            </div>
            <div className="lg:col-span-8">
              <p>
                Photographs and video on this website are illustrative, from Wikimedia Commons, used under
                Creative Commons licences. They do not depict Polishetty Foundation beneficiaries, programmes or
                events.
              </p>
              <details className="group mt-3">
                <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-semibold text-paper/85 hover:text-paper [&::-webkit-details-marker]:hidden">
                  Photo &amp; video credits
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <ul className="mt-4 grid gap-x-10 gap-y-2 md:grid-cols-2">
                  {Object.values(photos).map(({ credit }) => (
                    <li key={credit.sourceUrl}>
                      <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-paper hover:underline">
                        &ldquo;{credit.title}&rdquo;
                      </a>{" "}
                      by {credit.author},{" "}
                      <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-paper hover:underline">
                        {credit.license}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">Images have been resized and cropped for layout.</p>
                <p className="mt-6 font-semibold text-paper/85">Homepage film</p>
                <p className="mt-2">
                  A montage edited (trimmed, slowed, colour-graded and cross-faded) from the footage below, shared
                  under{" "}
                  <a href={heroVideo.license.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-paper hover:underline">
                    {heroVideo.license.name}
                  </a>
                  .
                </p>
                <ul className="mt-3 grid gap-x-10 gap-y-2 md:grid-cols-2">
                  {heroVideo.sources.map((v) => (
                    <li key={v.sourceUrl}>
                      <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-paper hover:underline">
                        &ldquo;{v.title}&rdquo;
                      </a>{" "}
                      by {v.author},{" "}
                      <a href={v.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-paper hover:underline">
                        {v.license}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
