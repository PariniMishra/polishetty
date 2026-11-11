"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { ArrowIcon } from "./Icons";

const sectionId = (href: string) => href.split("#")[1] ?? "";

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const [active, setActive] = useState<string>("top");

  // Highlight the nav item for the section currently in view (homepage only)
  useEffect(() => {
    if (!onHome) return;
    const sections = site.nav
      .map((item) => document.getElementById(sectionId(item.href)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Tuck the bar away while reading down the page; bring it back on any scroll up
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 480);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) => onHome && active === sectionId(href);
  // Transparent over the homepage film; solid paper everywhere else
  const overHero = onHome && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,translate] duration-500 ${
        hidden && !open ? "-translate-y-full" : ""
      } ${
        overHero
          ? "border-paper/15 bg-transparent"
          : `bg-paper ${scrolled || open ? "border-rule shadow-[0_1px_12px_rgba(14,19,17,0.06)]" : "border-transparent"}`
      }`}
    >
      <div className="wrap flex h-18 items-center justify-between gap-6 lg:h-20">
        <a href="/#top" aria-label={`${site.name} home`} className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src={overHero ? "/logo-light.png" : "/logo.png"}
            alt=""
            width={1050}
            height={295}
            preload
            loading="eager"
            className="h-9 w-auto lg:h-10"
          />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-8">
          <ul className="flex items-center gap-5 xl:gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "location" : undefined}
                  className={`relative py-2 text-[0.96875rem] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    overHero
                      ? "text-paper/80 after:bg-gold hover:text-paper aria-[current]:text-paper"
                      : "text-ink-soft after:bg-gold hover:text-ink aria-[current]:text-ink"
                  }`}
                >
                  {item.label}
                  {isCurrent(item.href) && (
                    <motion.span
                      layoutId="nav-current"
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.requestSupportHref}
            className="btn btn-primary !px-5 !py-3 text-[0.9375rem]"
          >
            Request Support
            <ArrowIcon />
          </a>
        </nav>

        <button
          type="button"
          className={`-mr-2 inline-flex h-11 items-center gap-2 px-2 text-[0.96875rem] font-semibold lg:hidden ${
            overHero ? "text-paper" : "text-ink"
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 0.84, 0.3, 1] }}
          id="mobile-menu"
          aria-label="Mobile"
          className="flex h-[calc(100dvh-4.5rem)] flex-col overflow-y-auto bg-paper lg:hidden"
        >
          <ul className="wrap pt-4">
            {site.nav.map((item, i) => (
              <motion.li
                key={item.href}
                className="border-b border-rule"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.16, 0.84, 0.3, 1] }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(item.href) ? "location" : undefined}
                  className="flex items-baseline gap-5 py-4.5 font-serif text-[1.8rem] text-ink aria-[current]:text-gold-dark"
                >
                  <span className="type-eyebrow tabular-nums text-gold-dark">0{i + 1}</span>
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className="wrap mt-auto pb-8 pt-10">
            <a
              href={site.requestSupportHref}
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full justify-between !py-5 text-lg"
            >
              Request Support
              <ArrowIcon />
            </a>
            <p className="mt-6 font-serif text-[1.15rem] text-ink-soft">
              {site.tagline}
            </p>
          </div>
        </motion.nav>
      )}
      </AnimatePresence>
    </header>
  );
}
