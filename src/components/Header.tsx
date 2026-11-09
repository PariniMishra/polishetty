"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ArrowIcon } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-[border-color] duration-300 ${
        scrolled || open ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-18 items-center justify-between lg:h-20">
        <a href="#top" aria-label={`${site.name} home`} className="shrink-0">
          <Image src="/logo.png" alt="" width={1050} height={295} preload className="h-9 w-auto lg:h-10" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] font-medium text-ink underline-offset-[0.4em] decoration-1 hover:underline"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-ink px-5 py-3 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-gold-dark"
          >
            Request Support
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 items-center gap-2 px-2 text-sm font-medium text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-paper md:hidden">
          <ul className="wrap pt-6">
            {site.nav.map((item, i) => (
              <li key={item.href} className="border-b border-rule">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-5 py-6 font-serif text-4xl font-light text-ink"
                >
                  <span className="font-sans text-sm tabular-nums text-gold-dark">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="wrap pt-10">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between bg-ink px-6 py-5 text-base font-medium text-paper"
            >
              Request Support
              <ArrowIcon className="h-5 w-5" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
