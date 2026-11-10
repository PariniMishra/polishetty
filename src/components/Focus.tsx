import Image from "next/image";
import SectionLabel from "./SectionLabel";
import SupportLink from "./SupportLink";
import { ArrowIcon } from "./Icons";
import { focusAreas, type FocusArea } from "@/content/focus";

export default function Focus() {
  const [education, seniors, community] = focusAreas;

  return (
    <section id="focus" aria-labelledby="focus-heading" className="border-t border-rule">
      <div className="wrap section">
        {/* Intro */}
        <div className="reveal grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <SectionLabel index="02">Our Focus</SectionLabel>
            <h2 id="focus-heading" className="type-headline mt-8 text-ink">
              Creating Opportunities. Enriching Lives. <em className="text-brand">Building a Better Tomorrow.</em>
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-[1.7] text-ink-soft lg:col-span-5 lg:self-end">
            <p>
              At <span className="text-ink">Polishetty Foundation</span>, our focus is on making a meaningful
              and lasting difference in the lives of underprivileged children and senior citizens across
              India.
            </p>
            <p>
              We believe that access to education, compassionate care, and basic necessities should never be
              limited by financial circumstances.
            </p>
          </div>
        </div>

        {/* Feature: Education */}
        <article id={education.id} className="group mt-20 grid items-center gap-y-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-6">
            <div className="photo aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={education.photo.image}
                alt={education.photo.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_20%]"
              />
              <span className="photo-tag">Illustrative photograph</span>
            </div>
          </div>
          <div className="reveal lg:col-span-6 lg:pl-6 xl:col-span-5 xl:pl-0 xl:col-start-8">
            <AreaText area={education} large />
          </div>
        </article>

        {/* Two areas, offset for an editorial rhythm */}
        <div className="mt-24 grid gap-y-20 lg:mt-36 lg:grid-cols-12 lg:gap-x-12">
          <article id={seniors.id} className="reveal group lg:col-span-7">
            <div className="photo aspect-[3/2]">
              <Image
                src={seniors.photo.image}
                alt={seniors.photo.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-[30%_40%]"
              />
              <span className="photo-tag">Illustrative photograph</span>
            </div>
            <div className="mt-10 max-w-xl">
              <AreaText area={seniors} />
            </div>
          </article>

          <article id={community.id} className="reveal group lg:col-span-5 lg:mt-48">
            <div className="photo aspect-[4/3] lg:aspect-[5/6]">
              <Image
                src={community.photo.image}
                alt={community.photo.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[40%_50%]"
              />
              <span className="photo-tag">Illustrative photograph</span>
            </div>
            <div className="mt-10">
              <AreaText area={community} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function AreaText({ area, large }: { area: FocusArea; large?: boolean }) {
  return (
    <>
      <p className="type-eyebrow flex items-center gap-3 text-gold-dark">
        <span className="tabular-nums">Focus area {area.index}</span>
      </p>
      <h3 className={`mt-5 text-ink ${large ? "type-headline !text-[clamp(2.2rem,3.6vw,3.4rem)]" : "type-title"}`}>
        {area.title}
      </h3>
      <p className={`mt-6 font-serif italic text-brand ${large ? "text-[1.5rem] leading-snug" : "text-xl leading-snug"}`}>
        {area.lead}
      </p>
      <p className="mt-5 text-lg leading-[1.7] text-ink-soft">{area.body}</p>
      <div className="mt-8 border-t border-rule pt-6">
        <p className="type-eyebrow text-muted">What we provide</p>
        <ul className="mt-4 space-y-2.5">
          {area.provides.map((item) => (
            <li key={item} className="flex gap-3 text-[1.0625rem] leading-snug text-ink">
              <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <SupportLink support={area.cta.support} className="link-cta mt-9 text-ink">
        {area.cta.label}
        <ArrowIcon />
      </SupportLink>
    </>
  );
}
