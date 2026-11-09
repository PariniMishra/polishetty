import Image from "next/image";
import { ArrowIcon } from "./Icons";
import { photos } from "@/content/photos";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-18 lg:pt-20">
      <div className="wrap pb-10 pt-12 sm:pt-16 lg:pb-12 lg:pt-20">
        <h1
          id="hero-heading"
          className="intro font-serif text-[clamp(3.1rem,8.4vw,8.25rem)] font-light leading-[0.94] tracking-[-0.03em] text-ink"
        >
          A chance to learn.
          <br />
          <em className="font-light">A life with dignity.</em>
        </h1>

        <div className="intro mt-10 grid gap-8 border-t border-rule pt-8 [animation-delay:200ms] lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl lg:col-span-6">
            Supporting students from families facing financial hardship and senior citizens who need
            care and assistance in India.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-6 lg:justify-end">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-ink px-6 py-4 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-gold-dark"
            >
              Request Support
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#about" className="text-link text-[0.9375rem] font-medium text-ink">
              About the Foundation
            </a>
          </div>
        </div>
      </div>

      {/* Two pillars, set as a single photographic plate */}
      <div className="wrap intro [animation-delay:350ms]">
        <div className="grid grid-cols-[3fr_2fr] gap-1.5 sm:gap-2 lg:grid-cols-12">
          <figure className="lg:col-span-8">
            <div className="relative h-[15rem] overflow-hidden bg-stone sm:h-[26rem] lg:h-[min(40rem,62vh)]">
              <Image
                src={photos.children.image}
                alt={photos.children.alt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 66vw, 60vw"
                className="object-cover object-[50%_45%]"
              />
            </div>
            <figcaption className="mt-3 text-[0.8125rem] leading-snug text-muted">
              Every child deserves a chance to succeed.
            </figcaption>
          </figure>
          <figure className="lg:col-span-4">
            <div className="relative h-[15rem] overflow-hidden bg-stone sm:h-[26rem] lg:h-[min(40rem,62vh)]">
              <Image
                src={photos.elder.image}
                alt={photos.elder.alt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 33vw, 40vw"
                className="object-cover object-[64%_35%]"
              />
            </div>
            <figcaption className="mt-3 text-[0.8125rem] leading-snug text-muted">
              Every senior deserves to live with dignity.
            </figcaption>
          </figure>
        </div>
        <p className="mt-2 text-right text-xs text-muted">
          Illustrative photographs.{" "}
          <a href="#photo-credits" className="text-link">
            Credits
          </a>
        </p>
      </div>
    </section>
  );
}
