import SectionLabel from "./SectionLabel";
import ImpactShowcase, { type Commitment } from "./ImpactShowcase";
import { Reveal } from "./motion";
import { photos } from "@/content/photos";

/**
 * Impact, told honestly. The foundation has no published outcome figures yet,
 * so this section states commitments rather than statistics.
 */
const commitments: Commitment[] = [
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
    <section id="impact" aria-labelledby="impact-heading" className="bg-stone">
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

        <ImpactShowcase items={commitments} />
      </div>
    </section>
  );
}
