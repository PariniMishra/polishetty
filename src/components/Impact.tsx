import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { Reveal, ParallaxPhoto } from "./motion";
import { photos, type Photo } from "@/content/photos";

/**
 * Impact, told honestly. The foundation has no published outcome figures yet,
 * so this section states commitments rather than statistics.
 */
const commitments: { area: string; title: string; body: string; photo: Photo; position?: string }[] = [
  {
    area: "Education",
    title: "Opportunity to learn",
    body: "Helping children from financially disadvantaged families stay in school and keep learning, through scholarships, supplies, mentorship and guidance.",
    photo: photos.studyGroup,
  },
  {
    area: "Senior welfare",
    title: "Dignity in later life",
    body: "Making sure elderly people facing hardship or isolation have healthcare assistance, essential necessities and someone who cares.",
    photo: photos.elderPortrait,
    position: "object-[50%_25%]",
  },
  {
    area: "Community",
    title: "Families who can stand on their own",
    body: "Supporting vulnerable families with essential assistance and outreach that builds self-reliance and well-being.",
    photo: photos.ruralWomen,
  },
];

export default function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-heading">
      <div className="wrap section">
        <Reveal className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <SectionLabel index="03">Our Impact</SectionLabel>
            <h2 id="impact-heading" className="type-headline mt-8 text-ink">
              The difference <em className="text-muted">we work towards</em>
            </h2>
          </div>
          <p className="type-lead text-ink-soft lg:col-span-5 lg:self-end">
            We are a young foundation, so rather than headline numbers, here is what we commit to in each area
            of our work. We will share progress here as it happens.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3 lg:mt-20">
          {commitments.map((c, i) => (
            <Reveal as="li" key={c.area} delay={i * 0.12} className="group">
              <ParallaxPhoto className="aspect-[4/5]">
                <Image
                  src={c.photo.image}
                  alt={c.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className={`object-cover ${c.position ?? "object-center"}`}
                />
              </ParallaxPhoto>
              <p className="type-eyebrow mt-7 flex items-center gap-3 text-gold-dark">
                <span className="tabular-nums">0{i + 1}</span>
                <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
                {c.area}
              </p>
              <h3 className="type-title mt-4 text-ink">{c.title}</h3>
              <p className="mt-4 text-lg leading-[1.7] text-ink-soft">{c.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
