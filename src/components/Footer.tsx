import Image from "next/image";
import { contactDetails, site } from "@/content/site";
import { focusAreas } from "@/content/focus";
import SocialLinks from "./SocialLinks";
import { ArrowIcon } from "./Icons";

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
      <div className="wrap">
        {/* Call to action */}
        <div className="flex flex-col gap-8 border-b border-paper/10 py-14 sm:py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-[-0.03em]">
              Need support, or know someone who does?
            </p>
            <p className="mt-3 text-paper/60">We read every enquiry carefully and in confidence.</p>
          </div>
          <a href={site.requestSupportHref} className="btn btn-primary shrink-0 self-start md:self-auto">
            Request Support
            <ArrowIcon />
          </a>
        </div>

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
            <a href="/privacy" className="transition-colors hover:text-paper">
              Privacy Policy
            </a>
            <a href="/credits" className="transition-colors hover:text-paper">
              Image credits
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
