import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { photos, type Photo } from "@/content/photos";

const education = {
  title: "Education & Child Empowerment",
  lead: "Every child deserves an opportunity to succeed.",
  body: "We are committed to supporting children from economically disadvantaged backgrounds by providing educational assistance, scholarships, school supplies, mentorship, and access to learning opportunities that help them build brighter futures.",
};

const seniors = {
  title: "Senior Citizen Care & Welfare",
  lead: "Every senior deserves dignity, respect, and care.",
  body: "We aim to support elderly individuals facing financial hardship, isolation, or limited access to essential services. Our initiatives focus on healthcare assistance, basic necessities, emotional well-being, and improving their quality of life.",
};

const community = {
  title: "Community Support & Compassion",
  lead: "Small acts of kindness can create lasting change.",
  body: "Beyond education and senior welfare, we strive to support vulnerable families and communities through essential assistance, compassionate outreach, and initiatives that promote self-reliance and well-being.",
};

export default function Focus() {
  return (
    <section id="focus" aria-labelledby="focus-heading">
      {/* Intro */}
      <div className="wrap">
        <div className="reveal grid gap-y-10 border-t border-ink pt-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <SectionLabel index="02">Our Focus</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <h2
              id="focus-heading"
              className="font-serif text-[clamp(2.4rem,5.2vw,4.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink"
            >
              Creating Opportunities. Enriching Lives. <em className="font-light">Building a Better Tomorrow.</em>
            </h2>
            <div className="mt-12 grid gap-6 text-lg leading-[1.65] text-ink-soft md:grid-cols-2 md:gap-8">
              <p>
                At <span className="text-ink">Polishetty Foundation</span>, our focus is on making a
                meaningful and lasting difference in the lives of underprivileged children and senior
                citizens across India.
              </p>
              <p>
                We believe that access to education, compassionate care, and basic necessities should
                never be limited by financial circumstances.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pillar one: full-width plate, text in three columns below */}
      <article className="wrap mt-24 sm:mt-32 lg:mt-40">
        <Plate photo={photos.reading} className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" sizes="100vw" position="object-[50%_35%]" />
        <div className="reveal mt-10 grid gap-y-6 lg:mt-14 lg:grid-cols-12 lg:gap-x-8">
          <p className="text-sm font-medium text-gold-dark lg:col-span-3">Pillar 01</p>
          <div className="lg:col-span-4">
            <h3 className="font-serif text-4xl font-light leading-[1.05] tracking-[-0.015em] text-ink sm:text-5xl">
              {education.title}
            </h3>
          </div>
          <div className="lg:col-span-5">
            <p className="font-serif text-2xl font-light italic leading-snug text-ink">{education.lead}</p>
            <p className="mt-5 text-lg leading-[1.65] text-ink-soft">{education.body}</p>
          </div>
        </div>
      </article>

      {/* Pillar two: plate and text side by side */}
      <article className="wrap mt-28 sm:mt-36 lg:mt-48">
        <div className="grid items-end gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <Plate photo={photos.elders} className="aspect-[4/3] lg:aspect-[5/4]" sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="reveal lg:col-span-4 lg:col-start-9">
            <p className="text-sm font-medium text-gold-dark">Pillar 02</p>
            <h3 className="mt-6 font-serif text-4xl font-light leading-[1.05] tracking-[-0.015em] text-ink sm:text-5xl">
              {seniors.title}
            </h3>
            <p className="mt-8 font-serif text-2xl font-light italic leading-snug text-ink">{seniors.lead}</p>
            <p className="mt-5 text-lg leading-[1.65] text-ink-soft">{seniors.body}</p>
          </div>
        </div>
      </article>

      {/* Third focus area: present, but quieter than the two pillars */}
      <article className="wrap mt-28 sm:mt-36 lg:mt-48">
        <div className="reveal grid gap-y-8 border-t border-rule pt-6 lg:grid-cols-12 lg:gap-x-8">
          <p className="text-sm font-medium text-gold-dark lg:col-span-3">Also in our focus</p>
          <div className="lg:col-span-5">
            <h3 className="font-serif text-3xl font-light leading-[1.1] text-ink sm:text-4xl">{community.title}</h3>
            <p className="mt-6 font-serif text-xl font-light italic leading-snug text-ink">{community.lead}</p>
            <p className="mt-4 text-lg leading-[1.65] text-ink-soft">{community.body}</p>
          </div>
          <div className="lg:col-span-4">
            <Plate photo={photos.community} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 100vw" />
          </div>
        </div>
      </article>

      {/* Our Commitment */}
      <div className="mt-28 bg-ink text-paper sm:mt-36 lg:mt-48">
        <div className="wrap py-24 sm:py-32 lg:py-40">
          <div className="reveal grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-3">
              <SectionLabel light>Our Commitment</SectionLabel>
            </div>
            <div className="lg:col-span-9">
              <p className="font-serif text-[clamp(2.3rem,5vw,4.5rem)] font-light leading-[1.04] tracking-[-0.02em]">
                <em className="font-light text-gold-light">Our purpose is simple:</em> Empower the young,
                care for the elderly, and inspire a culture of giving.
              </p>
              <p className="mt-14 max-w-xl border-t border-paper/20 pt-8 text-lg leading-[1.65] text-paper/75">
                Guided by our parents&apos; values of kindness, generosity, and service, we are dedicated
                to creating sustainable opportunities and touching lives with compassion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plate({
  photo,
  className,
  sizes,
  position = "object-center",
}: {
  photo: Photo;
  className: string;
  sizes: string;
  position?: string;
}) {
  return (
    <figure>
      <div className={`relative overflow-hidden bg-stone ${className}`}>
        <Image src={photo.image} alt={photo.alt} fill placeholder="blur" sizes={sizes} className={`object-cover ${position}`} />
      </div>
      <figcaption className="mt-3 text-[0.8125rem] text-muted">Illustrative photograph</figcaption>
    </figure>
  );
}
