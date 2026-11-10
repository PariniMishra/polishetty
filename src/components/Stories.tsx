import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { ArrowIcon } from "./Icons";
import { stories, storyKindLabel, type Story } from "@/content/stories";
import { site } from "@/content/site";

export default function Stories() {
  const [feature, ...rest] = stories;

  return (
    <section id="stories" aria-labelledby="stories-heading" className="border-t border-rule bg-stone">
      <div className="wrap section">
        <div className="reveal grid gap-y-8 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <SectionLabel index="04">Stories &amp; Updates</SectionLabel>
            <h2 id="stories-heading" className="type-headline mt-8 text-ink">
              Stories of learning, <em className="text-muted">care and community</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:self-end">
            <p className="border-l-2 border-gold pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">About these stories.</strong> Pieces marked
              &ldquo;Illustrative perspective&rdquo; describe the needs our work responds to. They are not
              accounts of specific Foundation activities, and the photographs do not show our beneficiaries.
              Stories from our own work will be published here as it grows.
            </p>
          </div>
        </div>

        {/* Featured story */}
        <article className="reveal group mt-16 grid items-center gap-y-8 bg-paper lg:mt-20 lg:grid-cols-12">
          <div className="photo aspect-[16/10] lg:col-span-7 lg:aspect-[4/3]">
            <Image
              src={feature.photo.image}
              alt={feature.photo.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <span className="photo-tag">Illustrative photograph</span>
          </div>
          <div className="px-6 pb-10 sm:px-10 lg:col-span-5 lg:px-12 lg:py-12">
            <StoryMeta story={feature} />
            <h3 className="type-title mt-5 !text-[clamp(1.75rem,2.8vw,2.6rem)] text-ink">
              <StoryTitle story={feature} />
            </h3>
            <p className="mt-5 text-lg leading-[1.7] text-ink-soft">{feature.excerpt}</p>
          </div>
        </article>

        {/* More stories */}
        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {rest.map((story) => (
            <li key={story.title} className="reveal">
              <article className="group">
                <div className="photo aspect-[3/2]">
                  <Image
                    src={story.photo.image}
                    alt={story.photo.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 32vw, 100vw"
                    className="object-cover object-[50%_35%]"
                  />
                  <span className="photo-tag">Illustrative photograph</span>
                </div>
                <div className="mt-6">
                  <StoryMeta story={story} />
                  <h3 className="mt-4 font-serif text-[1.4rem] leading-[1.15] text-ink">
                    <StoryTitle story={story} />
                  </h3>
                  <p className="mt-3 text-base leading-[1.7] text-ink-soft">{story.excerpt}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="reveal mt-16 flex flex-col items-start justify-between gap-6 border-t border-rule pt-10 sm:flex-row sm:items-center">
          <p className="font-serif text-[1.5rem] text-ink">Know a student or senior who needs support?</p>
          <a href={site.requestSupportHref} className="btn btn-outline text-ink">
            Refer someone to us
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function StoryMeta({ story }: { story: Story }) {
  return (
    <p className="type-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-gold-dark">{story.category}</span>
      {storyKindLabel[story.kind] !== story.category && (
        <>
          <span aria-hidden="true" className="h-3 w-px bg-rule" />
          <span className="text-muted">{storyKindLabel[story.kind]}</span>
        </>
      )}
      {story.date && (
        <>
          <span aria-hidden="true" className="h-3 w-px bg-rule" />
          <span className="text-muted">{story.date}</span>
        </>
      )}
    </p>
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
