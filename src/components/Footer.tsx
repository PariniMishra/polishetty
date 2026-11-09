import Image from "next/image";
import { site } from "@/content/site";
import { photos } from "@/content/photos";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap pt-24 sm:pt-32">
        {/* Signature */}
        <p className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.95] tracking-[-0.03em]">
          Education. Care. <em className="font-light text-gold-light">Dignity.</em>
        </p>

        <div className="mt-20 grid gap-y-12 border-t border-paper/20 pt-10 sm:mt-28 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5">
            <Image src="/logo-light.png" alt={site.name} width={1050} height={295} className="h-11 w-auto" />
            <p className="mt-6 max-w-xs text-base leading-relaxed text-paper/70">
              Focused on supporting people in India.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="text-sm font-medium text-gold-light">Explore</p>
            <ul className="mt-5 space-y-3 text-base">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-paper/85 underline-offset-[0.3em] hover:text-paper hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-paper underline underline-offset-[0.3em] decoration-gold-light hover:decoration-paper">
                  Request Support
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-sm font-medium text-gold-light">Follow Us</p>
            <div className="mt-4">
              <SocialLinks tone="light" showAll />
            </div>
          </div>
        </div>

        {/* Photo disclosure and Creative Commons attribution */}
        <div id="photo-credits" className="mt-20 scroll-mt-24 border-t border-paper/20 py-8 text-[0.8125rem] leading-relaxed text-paper/60">
          <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-8">
            <p className="md:col-span-5">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <div className="md:col-span-7">
              <p>
                Photographs on this website are illustrative images used under Creative Commons
                licences. They do not depict Polishetty Foundation beneficiaries, programmes or events.
              </p>
              <details className="group mt-3">
                <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-medium text-paper/85 hover:text-paper [&::-webkit-details-marker]:hidden">
                  Photo credits
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <ul className="mt-4 space-y-2">
                  {Object.values(photos).map(({ credit }) => (
                    <li key={credit.sourceUrl}>
                      <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-paper hover:underline">
                        &ldquo;{credit.title}&rdquo;
                      </a>{" "}
                      by {credit.author}, licensed under{" "}
                      <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-paper hover:underline">
                        {credit.license}
                      </a>
                      , via Wikimedia Commons.
                    </li>
                  ))}
                  <li className="pt-1">Images have been resized and cropped for layout.</li>
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
