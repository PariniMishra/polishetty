import SectionLabel from "./SectionLabel";
import { BookIcon, CareIcon, CommunityIcon } from "./Icons";

const areas = [
  {
    number: "01",
    title: "Education & Child Empowerment",
    lead: "Every child deserves an opportunity to succeed.",
    body: "We are committed to supporting children from economically disadvantaged backgrounds by providing educational assistance, scholarships, school supplies, mentorship, and access to learning opportunities that help them build brighter futures.",
    Icon: BookIcon,
  },
  {
    number: "02",
    title: "Senior Citizen Care & Welfare",
    lead: "Every senior deserves dignity, respect, and care.",
    body: "We aim to support elderly individuals facing financial hardship, isolation, or limited access to essential services. Our initiatives focus on healthcare assistance, basic necessities, emotional well-being, and improving their quality of life.",
    Icon: CareIcon,
  },
  {
    number: "03",
    title: "Community Support & Compassion",
    lead: "Small acts of kindness can create lasting change.",
    body: "Beyond education and senior welfare, we strive to support vulnerable families and communities through essential assistance, compassionate outreach, and initiatives that promote self-reliance and well-being.",
    Icon: CommunityIcon,
  },
];

export default function Focus() {
  return (
    <section id="focus" aria-labelledby="focus-heading" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel>Our Focus</SectionLabel>
          <h2 id="focus-heading" className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Creating Opportunities. Enriching Lives. Building a Better Tomorrow.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-[1.8] text-ink-soft sm:text-lg">
            <p>
              At <strong className="font-semibold text-ink">Polishetty Foundation</strong>, our
              focus is on making a meaningful and lasting difference in the lives of
              underprivileged children and senior citizens across India.
            </p>
            <p>
              We believe that access to education, compassionate care, and basic necessities
              should never be limited by financial circumstances.
            </p>
          </div>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
          {areas.map(({ number, title, lead, body, Icon }) => (
            <li
              key={number}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-[0_16px_40px_-20px_rgba(28,29,24,0.25)] sm:p-8"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
                  <Icon className="h-6 w-6" />
                </span>
                <span aria-hidden="true" className="font-serif text-4xl text-line">
                  {number}
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl leading-snug text-ink">{title}</h3>
              <p className="mt-3 font-semibold leading-snug text-gold-dark">{lead}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">{body}</p>
            </li>
          ))}
        </ol>

        {/* Our Commitment */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-ink px-7 py-12 text-paper sm:px-12 sm:py-16 lg:mt-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionLabel light>Our Commitment</SectionLabel>
              <p className="mt-5 text-base leading-[1.8] text-paper/80 sm:text-lg">
                Guided by our parents&apos; values of kindness, generosity, and service, we are
                dedicated to creating sustainable opportunities and touching lives with
                compassion.
              </p>
            </div>
            <div className="flex gap-5 sm:gap-6 lg:col-span-7">
              <span aria-hidden="true" className="w-1 shrink-0 bg-gold" />
              <p className="font-serif text-2xl leading-snug sm:text-3xl lg:text-4xl">
                <span className="text-gold">Our purpose is simple:</span> Empower the young,
                care for the elderly, and inspire a culture of giving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
