import HeroVideo, { VIDEO_CONTROL_ID } from "./HeroVideo";
import { ArrowIcon } from "./Icons";
import { focusAreas } from "@/content/focus";
import { heroVideo } from "@/content/video";
import { site } from "@/content/site";
import videoPoster from "@/assets/video-poster.jpg";

/** Delay helper for the staggered entrance (CSS animations, see globals.css). */
const d = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-brand-deep text-paper"
    >
      {/* Film + poster */}
      <HeroVideo poster={videoPoster} posterAlt={heroVideo.description} />

      {/* Ink veil: neutral so the film keeps its true colour; darkest behind the text */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-brand-deep/25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(95deg,rgba(14,19,17,0.88)_0%,rgba(14,19,17,0.62)_38%,rgba(14,19,17,0.12)_75%,rgba(14,19,17,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-[linear-gradient(0deg,rgba(14,19,17,0.95)_0%,rgba(14,19,17,0.45)_45%,rgba(14,19,17,0)_100%)]"
      />

      {/* Message */}
      <div className="wrap relative z-10 flex flex-1 flex-col justify-center pb-16 pt-32 sm:pt-36 lg:pb-24">
        <div className="max-w-[58rem]">
          <p className="hero-fade type-eyebrow flex items-center gap-4 text-gold-light" style={d(150)}>
            <span aria-hidden="true" className="hero-draw h-px w-12 bg-gold-light" style={d(150)} />
            <span>
              <span className="hidden sm:inline">{site.name} · </span>
              {site.established}
            </span>
          </p>

          <h1 id="hero-heading" className="mt-8 font-serif text-[clamp(2.6rem,7vw,6.75rem)] leading-[0.94] tracking-[-0.042em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-rise block" style={d(250)}>
                A chance to learn.
              </span>
            </span>
            <span className="-mt-[0.06em] block overflow-hidden pb-[0.12em]">
              <em className="hero-rise block text-gold-light" style={d(420)}>
                A life with dignity.
              </em>
            </span>
          </h1>

          <p className="hero-fade type-lead mt-6 max-w-xl text-paper/85" style={d(700)}>
            We support students from families facing financial hardship, and senior citizens who need care and
            assistance, so that every child can succeed and every senior can live with dignity.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4" style={d(850)}>
            <a href={site.requestSupportHref} className="btn btn-primary">
              Request Support
              <ArrowIcon />
            </a>
            <a href="#mission" className="btn btn-ghost-light">
              Explore Our Mission
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About Us"
        className="hero-fade absolute bottom-40 right-12 z-10 hidden flex-col items-center gap-3 text-paper/70 transition-colors hover:text-paper xl:flex"
        style={d(1300)}
      >
        <span className="type-eyebrow [writing-mode:vertical-rl] !tracking-[0.3em]">Scroll</span>
        <span aria-hidden="true" className="relative h-14 w-px overflow-hidden bg-paper/25">
          <span className="scroll-cue absolute inset-0 bg-gold-light" />
        </span>
      </a>

      {/* Focus areas + film controls */}
      <div className="hero-fade relative z-10 border-t border-paper/15 bg-brand-deep/55" style={d(1000)}>
        <div className="wrap grid lg:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
          {focusAreas.map((area, i) => (
            <a
              key={area.id}
              href={`#${area.id}`}
              className={`group flex items-center justify-between gap-4 py-5 transition-colors hover:text-gold-light lg:py-7 lg:pr-7 ${
                i > 0 ? "border-t border-paper/15 lg:border-l lg:border-t-0 lg:pl-7" : ""
              }`}
            >
              <span>
                <span className="type-eyebrow block tabular-nums text-gold-light">{area.index}</span>
                <span className="mt-1.5 block font-serif text-[1.2rem] leading-tight lg:text-[1.3rem]">{area.title}</span>
              </span>
              <ArrowIcon className="h-5 w-5 shrink-0 text-gold-light transition-transform group-hover:translate-x-1" />
            </a>
          ))}
          <div className="flex items-center gap-4 border-t border-paper/15 py-5 lg:border-l lg:border-t-0 lg:pl-7">
            <span id={VIDEO_CONTROL_ID} className="contents" />
          </div>
        </div>
      </div>
    </section>
  );
}
