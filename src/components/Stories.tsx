import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { ParallaxPhoto, Reveal, Stagger, StaggerItem } from "./motion";
import { ArrowIcon } from "./Icons";
import { stories, storyKindLabel, type Story } from "@/content/stories";
import { site } from "@/content/site";

export default function Stories() {
  const [feature, ...rest] = stories;

  return (
    <section id="stories" aria-labelledby="stories-heading" className="border-t border-rule bg-stone">
      <div className="wrap section">
        {/* Heading */}
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-8">
            <SectionLabel index="04">Stories &amp; Updates</SectionLabel>
            <h2 id="stories-heading" className="type-headline mt-8 text-ink">
              Stories of learning, <em className="text-muted">care and community</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-4 lg:self-end">
            <div className="flex gap-4 border-t border-rule pt-5 text-[0.875rem] leading-relaxed text-ink-soft">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" />
              </svg>
              <p>
                <strong className="font-semibold text-ink">About these stories.</strong> Pieces marked
                &ldquo;Illustrative perspective&rdquo; describe the needs our work responds to; they are not
                accounts of specific Foundation activities. Stories from our own work will appear here as it grows.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Featured story: wide photograph with an overlapping card */}
        <article className="group relative mt-16 lg:mt-24">
          <ParallaxPhoto className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" strength={9}>
            <Image
              src={feature.photo.image}
              alt={feature.photo.alt}
              fill
              placeholder="blur"
              sizes="100vw"
              className="object-cover object-[50%_88%]"
            />
          </ParallaxPhoto>
          <Reveal
            y={60}
            delay={0.2}
            className="relative bg-paper px-6 py-9 shadow-[0_40px_80px_-40px_rgba(14,19,17,0.35)] sm:px-10 sm:py-12 lg:-mt-48 lg:ml-12 lg:w-[min(46rem,60%)] lg:px-14 lg:py-14"
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold" />
            <p className="type-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-ink">
              <span className="text-gold-dark">Featured</span>
              <span aria-hidden="true" className="h-px w-6 bg-rule" />
              <StoryMeta story={feature} />
            </p>
            <h3 className="mt-6 font-serif text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.04] tracking-[-0.04em] text-ink">
              <StoryTitle story={feature} />
            </h3>
            <p className="mt-6 text-lg leading-[1.75] text-ink-soft">{feature.excerpt}</p>
          </Reveal>
        </article>

        {/* More stories: tall photographic cards */}
        <div className="mt-24 lg:mt-32">
          <Reveal className="flex items-end justify-between gap-6 border-b border-ink/15 pb-6">
            <h3 className="font-serif text-[clamp(1.6rem,2.6vw,2.25rem)] leading-none tracking-[-0.035em] text-ink">
              More stories
            </h3>
            <p className="type-eyebrow tabular-nums text-muted">
              {String(rest.length).padStart(2, "0")} pieces
            </p>
          </Reveal>

          <Stagger as="ul" gap={0.16} className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-8">
            {rest.map((story, i) => (
              <StaggerItem as="li" key={story.title} className={i === 1 ? "md:mt-16" : ""}>
                <article className="group relative isolate flex aspect-[3/4] flex-col overflow-hidden bg-brand-deep text-paper sm:aspect-[4/5] md:aspect-[3/4]">
                  <ParallaxPhoto className="absolute inset-0 -z-10 bg-brand-deep" strength={6}>
                    <Image
                      src={story.photo.image}
                      alt={story.photo.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 32vw, 100vw"
                      className="object-cover object-[50%_35%]"
                    />
                  </ParallaxPhoto>
                  {/* Legibility veil, deepening on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(14,19,17,0.96)_0%,rgba(14,19,17,0.78)_38%,rgba(14,19,17,0.12)_72%,rgba(14,19,17,0.2)_100%)] transition-opacity duration-700 group-hover:opacity-100 lg:opacity-85"
                  />

                  <div className="flex items-start justify-between p-6 sm:p-7">
                    <span className="font-serif text-[2.4rem] leading-none tracking-[-0.05em] text-paper/90">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="border border-paper/25 bg-brand-deep/40 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-paper backdrop-blur-sm">
                      {story.category}
                    </span>
                  </div>

                  <div className="mt-auto p-6 sm:p-7">
                    {storyKindLabel[story.kind] !== story.category && (
                      <p className="type-eyebrow text-gold-light">{storyKindLabel[story.kind]}</p>
                    )}
                    <h4 className="mt-3 font-serif text-[clamp(1.45rem,2vw,1.85rem)] leading-[1.1] tracking-[-0.035em]">
                      <StoryTitle story={story} />
                    </h4>
                    {/* Excerpt: always shown on touch screens, slides open on hover on desktop */}
                    <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,0.84,0.3,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pt-4 text-[0.98rem] leading-[1.7] text-paper/80">{story.excerpt}</p>
                      </div>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.16,0.84,0.3,1)] group-hover:scale-x-100"
                  />
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Referral call to action */}
        <Reveal className="relative isolate mt-20 overflow-hidden bg-brand-deep px-6 py-12 text-paper sm:px-12 sm:py-14 lg:mt-28 lg:px-16 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,107,26,0.22),transparent)]"
          />
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="type-eyebrow text-gold-light">Every story starts with someone reaching out</p>
              <p className="mt-4 font-serif text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.08] tracking-[-0.035em]">
                Know a student or senior who needs support?
              </p>
            </div>
            <a href={site.requestSupportHref} className="btn btn-primary shrink-0">
              Refer someone to us
              <ArrowIcon />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StoryMeta({ story }: { story: Story }) {
  return (
    <>
      <span className="text-gold-dark">{story.category}</span>
      {storyKindLabel[story.kind] !== story.category && (
        <>
          <span aria-hidden="true" className="hidden h-3 w-px bg-ink/20 sm:block" />
          <span className="text-muted">{storyKindLabel[story.kind]}</span>
        </>
      )}
      {story.date && (
        <>
          <span aria-hidden="true" className="hidden h-3 w-px bg-ink/20 sm:block" />
          <span className="text-muted">{story.date}</span>
        </>
      )}
    </>
  );
}

/** Titles become links only when a full article exists, so there are no dead links. */
function StoryTitle({ story }: { story: Story }) {
  if (!story.href) return <>{story.title}</>;
  return (
    <a href={story.href} className="transition-colors hover:text-gold-dark">
      {story.title}
    </a>
  );
}
