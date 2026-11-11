import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { ArrowIcon } from "./Icons";
import { DrawLine, HoverLift, ParallaxPhoto, Reveal, ScrollWords, Stagger, StaggerItem } from "./motion";
import { photos, type Photo } from "@/content/photos";
import { site } from "@/content/site";

const pillars: { number: string; title: string; kicker: string; body: string; photo: Photo; position?: string }[] = [
  {
    number: "01",
    title: "Education",
    kicker: "For children",
    photo: photos.children,
    body: "We believe education has the power to transform generations. By helping children access educational resources, guidance, and opportunities, we aim to build a foundation for brighter, more independent futures.",
  },
  {
    number: "02",
    title: "Senior citizens",
    kicker: "For elders",
    photo: photos.elder,
    position: "object-[50%_30%]",
    body: "Equally important is our commitment to senior citizens. We strive to bring comfort, care, respect, and meaningful support to elderly individuals who may lack the resources or assistance they deserve.",
  },
];

/**
 * Our Mission: a dark, quiet chapter between About and Focus.
 * The statement fills in word by word on scroll, the two pillars rise in
 * with parallax photographs, and the belief closes the section.
 */
export default function Mission() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-brand-deep text-paper"
    >
      {/* Ambient light: two soft saffron glows and a faint vertical grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[20%] -top-[15%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,26,0.16),transparent)]" />
        <div className="absolute -bottom-[25%] -left-[25%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,46,0.08),transparent)]" />
        <div className="wrap grid h-full grid-cols-4 lg:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={`border-l border-paper/[0.04] ${i >= 4 ? "hidden lg:block" : ""} ${i === 11 ? "border-r" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="wrap section">
        {/* Statement */}
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-3 lg:pt-4">
            <SectionLabel light>Our Mission</SectionLabel>
            <h2 id="mission-heading" className="mt-6 text-[0.9375rem] leading-relaxed text-paper/55">
              Two pillars.
              <br />
              One purpose.
            </h2>
          </Reveal>
          <ScrollWords
            className="font-serif text-[clamp(1.9rem,4.2vw,3.9rem)] leading-[1.08] tracking-[-0.038em] text-paper lg:col-span-9"
            highlightClassName="text-gold-light"
            text="Our mission focuses on two important pillars: [[empowering underprivileged children through education]] and [[supporting senior citizens through compassionate care and welfare initiatives.]]"
          />
        </div>

        {/* Pillars */}
        <Stagger gap={0.18} className="mt-20 grid gap-8 md:grid-cols-2 lg:mt-32 lg:gap-12">
          {pillars.map((p, i) => (
            <StaggerItem key={p.number} as="article" className={i === 1 ? "md:mt-24" : ""}>
              <HoverLift className="group relative h-full border border-paper/10 bg-paper/[0.03] p-3 transition-[border-color,box-shadow] duration-500 hover:border-gold/40 hover:shadow-[0_30px_80px_-30px_rgba(255,107,26,0.35)] sm:p-4">
                <ParallaxPhoto className="aspect-[4/3] bg-brand">
                  <Image
                    src={p.photo.image}
                    alt={p.photo.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className={`object-cover ${p.position ?? "object-center"}`}
                  />
                </ParallaxPhoto>
                <div className="relative px-3 pb-6 pt-8 sm:px-5 sm:pb-8">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[0.62em] right-3 font-serif text-[clamp(4.5rem,8vw,7.5rem)] leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,122,46,0.55)] transition-colors duration-500 group-hover:text-gold-light/90 sm:right-5"
                  >
                    {p.number}
                  </span>
                  <p className="type-eyebrow text-gold-light">{p.kicker}</p>
                  <h3 className="mt-4 font-serif text-[clamp(1.9rem,3vw,2.6rem)] leading-none tracking-[-0.04em]">{p.title}</h3>
                  <DrawLine className="mt-6 block h-px w-full bg-paper/15" />
                  <p className="mt-6 text-lg leading-[1.7] text-paper/72">{p.body}</p>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Belief */}
        <div className="mx-auto mt-28 max-w-5xl text-center lg:mt-40">
          <Reveal as="div" className="type-eyebrow flex items-center justify-center gap-4 text-gold-light">
            <DrawLine origin="right" className="block h-px w-12 bg-gold" />
            <p>Our belief is simple</p>
            <DrawLine className="block h-px w-12 bg-gold" />
          </Reveal>
          <Reveal as="blockquote" delay={0.1} className="mt-10">
            <p className="font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[1.06] tracking-[-0.04em]">
              Every child deserves a chance to succeed, and every senior deserves to live with{" "}
              <em className="bg-[linear-gradient(100deg,#ff7a2e,#ffb37a)] bg-clip-text text-transparent">dignity.</em>
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-8">
            <p className="max-w-md text-lg leading-relaxed text-paper/60">
              Together, we hope to make a meaningful difference, one life at a time.
            </p>
            <a href={site.requestSupportHref} className="btn btn-primary">
              Request Support
              <ArrowIcon />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
