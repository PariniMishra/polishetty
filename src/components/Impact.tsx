import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { photos, type Photo } from "@/content/photos";

/**
 * Impact, told honestly. The foundation has no published outcome figures yet,
 * so this section states commitments rather than statistics. When verified
 * numbers exist, add them to `facts` (and keep the source/period beside them).
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

const facts = [
  { figure: "3", label: "Focus areas", note: "Education, senior welfare and community support" },
  { figure: "2", label: "Generations", note: "Children and senior citizens at the heart of our work" },
  { figure: "1", label: "Simple belief", note: "Every person deserves to live with dignity" },
];

export default function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-heading">
      <div className="wrap section">
        <div className="reveal grid gap-y-8 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <SectionLabel index="03">Our Impact</SectionLabel>
            <h2 id="impact-heading" className="type-headline mt-8 text-ink">
              The difference <em className="text-brand">we work towards</em>
            </h2>
          </div>
          <p className="type-lead text-ink-soft lg:col-span-5 lg:self-end">
            We are a young foundation, so rather than headline numbers, here is what we commit to in each area
            of our work. We will share progress here as it happens.
          </p>
        </div>

        <ol className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3 lg:mt-20">
          {commitments.map((c, i) => (
            <li key={c.area} className="reveal group">
              <div className="photo aspect-[4/5]">
                <Image
                  src={c.photo.image}
                  alt={c.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className={`object-cover ${c.position ?? "object-center"}`}
                />
                <span className="photo-tag">Illustrative photograph</span>
              </div>
              <p className="type-eyebrow mt-7 flex items-center gap-3 text-gold-dark">
                <span className="tabular-nums">0{i + 1}</span>
                <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
                {c.area}
              </p>
              <h3 className="type-title mt-4 text-ink">{c.title}</h3>
              <p className="mt-4 text-lg leading-[1.7] text-ink-soft">{c.body}</p>
            </li>
          ))}
        </ol>

        {/* Foundation facts: true by definition, no invented outcomes */}
        <div className="reveal mt-20 bg-stone px-6 py-12 sm:px-12 lg:mt-28 lg:py-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h3 className="type-title text-ink">The foundation at a glance</h3>
            <p className="text-[0.9375rem] text-muted">Programme outcomes will be published here as our work grows.</p>
          </div>
          <ul className="mt-10 grid gap-y-10 border-t border-rule pt-10 sm:grid-cols-3 sm:gap-x-10">
            {facts.map((f) => (
              <li key={f.label}>
                <span className="block font-serif text-[clamp(3.5rem,6vw,5rem)] leading-none text-brand">
                  {f.figure}
                </span>
                <span className="mt-3 block text-lg font-semibold text-ink">{f.label}</span>
                <span className="mt-1 block text-base leading-relaxed text-ink-soft">{f.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
