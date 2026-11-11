import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { photos, type Photo } from "@/content/photos";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      {/* Introduction */}
      <div className="wrap section">
        <div className="grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-6 xl:col-span-5">
            <SectionLabel index="01">About Us</SectionLabel>
            <h2 id="about-heading" className="type-headline mt-8 text-ink">
              Empowering Lives. Inspiring Hope. <em className="text-muted">Creating Lasting Change.</em>
            </h2>
            <p className="type-lead mt-8 text-ink-soft">
              <span className="text-ink">Polishetty Foundation</span> was established in India with a
              simple yet meaningful purpose: to bring hope, dignity, and opportunity to those who need it
              most.
            </p>
            <p className="mt-5 text-lg leading-[1.7] text-ink-soft">
              At its heart, Polishetty Foundation is more than a charitable initiative. It is a tribute to
              our parents&apos; values and a commitment to carrying their vision forward through purposeful
              action.
            </p>
            <a href="#commitment" className="link-cta mt-9 text-ink">
              Read our story
            </a>
          </div>
          <figure className="reveal lg:col-span-6 xl:col-span-7">
            <div className="photo aspect-[4/3]">
              <Image
                src={photos.outdoorClass.image}
                alt={photos.outdoorClass.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </div>

      {/* Mission: two pillars */}
      <div id="mission" className="scroll-mt-20 bg-stone">
        <div className="wrap section">
          <div className="reveal grid gap-y-8 lg:grid-cols-12 lg:gap-x-12">
            <p className="type-eyebrow text-gold-dark lg:col-span-3 lg:pt-3">Our Mission</p>
            <p className="type-statement text-ink-soft lg:col-span-9">
              Our mission focuses on two important pillars:{" "}
              <em className="text-ink">empowering underprivileged children through education</em> and{" "}
              <em className="text-ink">supporting senior citizens through compassionate care and welfare initiatives</em>.
            </p>
          </div>

          <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:mt-24">
            <Pillar
              number="01"
              title="Education"
              photo={photos.children}
              body="We believe education has the power to transform generations. By helping children access educational resources, guidance, and opportunities, we aim to build a foundation for brighter, more independent futures."
            />
            <Pillar
              number="02"
              title="Senior citizens"
              photo={photos.elder}
              position="object-[50%_30%]"
              body="Equally important is our commitment to senior citizens. We strive to bring comfort, care, respect, and meaningful support to elderly individuals who may lack the resources or assistance they deserve."
            />
          </div>
        </div>
      </div>

      {/* Belief */}
      <div className="wrap section">
        <figure className="reveal mx-auto max-w-5xl text-center">
          <figcaption className="type-eyebrow flex items-center justify-center gap-4 text-gold-dark">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            Our belief is simple
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
          </figcaption>
          <blockquote className="mt-10">
            <p className="font-serif text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.1] tracking-[-0.035em] text-ink">
              Every child deserves a chance to succeed, and every senior deserves to live with{" "}
              <em className="text-gold-dark">dignity.</em>
            </p>
          </blockquote>
          <p className="mx-auto mt-10 max-w-md text-lg leading-relaxed text-muted">
            Together, we hope to make a meaningful difference, one life at a time.
          </p>
        </figure>
      </div>
    </section>
  );
}

function Pillar({
  number,
  title,
  body,
  photo,
  position = "object-center",
}: {
  number: string;
  title: string;
  body: string;
  photo: Photo;
  position?: string;
}) {
  return (
    <article className="reveal group">
      <div className="photo aspect-[3/2]">
        <Image
          src={photo.image}
          alt={photo.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 45vw, 100vw"
          className={`object-cover ${position}`}
        />
      </div>
      <div className="mt-8 flex items-baseline gap-5 border-t border-rule pt-6">
        <span className="type-eyebrow tabular-nums text-gold-dark">{number}</span>
        <div>
          <h3 className="type-title text-ink">{title}</h3>
          <p className="mt-4 text-lg leading-[1.7] text-ink-soft">{body}</p>
        </div>
      </div>
    </article>
  );
}
