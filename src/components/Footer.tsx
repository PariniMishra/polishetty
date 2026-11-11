import Link from "next/link";
import Image from "next/image";
import { contactDetails, site } from "@/content/site";
import { focusAreas } from "@/content/focus";
import SocialLinks from "./SocialLinks";
import { ArrowIcon } from "./Icons";
import { DrawLine, Reveal } from "./motion";

const linkCls = "text-paper/70 transition-colors hover:text-paper";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-paper/45">{title}</h2>
      <ul className="mt-5 space-y-3 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-paper">
      {/* Call to action */}
      <div className="relative isolate overflow-hidden border-b border-paper/10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-[10%] -top-[60%] h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,26,0.2),transparent)]" />
          <div className="absolute -bottom-[70%] left-[15%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,46,0.07),transparent)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,122,46,0.5),transparent)]" />
        </div>

        <div className="wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-x-12 lg:py-28">
          <Reveal className="lg:col-span-8">
            <p className="type-eyebrow flex items-center gap-4 text-gold-light">
              <DrawLine className="block h-px w-10 bg-gold-light" />
              We&apos;re here to help
            </p>
            <h2 className="mt-7 font-serif text-[clamp(2.3rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.045em]">
              Need support, or know <span className="text-gold-light">someone who does?</span>
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/60">
              We read every enquiry carefully and in confidence. Tell us who needs help, and our team will get in
              touch.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4 lg:justify-self-end">
            <a href={site.requestSupportHref} className="btn btn-primary !px-8 !py-5 text-base">
              Request Support
              <ArrowIcon />
            </a>
            <p className="mt-5 flex items-center gap-2.5 text-[0.875rem] text-paper/50">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              Takes about two minutes
            </p>
          </Reveal>
        </div>
      </div>

      <div className="wrap">
        {/* Links */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-5">
            <Image src="/logo-light.png" alt={site.name} width={1050} height={295} className="h-10 w-auto" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-paper/60">{site.description}</p>
            <div className="mt-8">
              <SocialLinks tone="light" />
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <Column title="Explore">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkCls}>
                    {item.label}
                  </a>
                </li>
              ))}
            </Column>
          </nav>

          <div className="lg:col-span-2">
            <Column title="Our Focus">
              {focusAreas.map((area) => (
                <li key={area.id}>
                  <a href={`/#${area.id}`} className={linkCls}>
                    {area.title}
                  </a>
                </li>
              ))}
            </Column>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <Column title="Contact">
              {contactDetails.map(({ label, value, href }) => (
                <li key={label}>
                  <span className="sr-only">{label}: </span>
                  {href ? (
                    <a href={href} className={`${linkCls} wrap-break-word`}>
                      {value}
                    </a>
                  ) : (
                    <span className="whitespace-pre-line text-paper/70">{value}</span>
                  )}
                </li>
              ))}
              <li>
                <a href={site.requestSupportHref} className={linkCls}>
                  Send us an enquiry
                </a>
              </li>
            </Column>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3 border-t border-paper/10 py-7 text-[0.8125rem] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.established}.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-paper">
              Privacy Policy
            </Link>
            <Link href="/credits" className="transition-colors hover:text-paper">
              Image credits
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
