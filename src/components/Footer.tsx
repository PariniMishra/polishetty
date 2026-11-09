import Image from "next/image";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src="/logo-light.png"
              alt={site.name}
              width={1050}
              height={295}
              className="h-12 w-auto"
            />
            <p className="mt-5 font-serif text-xl text-gold">{site.tagline}</p>
            <p className="mt-2 text-sm text-paper/70">Focused on supporting people in India.</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3 text-sm md:items-end">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-paper/80 transition-colors hover:text-gold">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="font-semibold text-gold transition-colors hover:text-paper">
                  Request Support
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-paper/15 pt-6 text-xs text-paper/60">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
