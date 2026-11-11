import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { Reveal, ParallaxPhoto } from "./motion";
import { photos } from "@/content/photos";

const values = ["Kindness", "Generosity", "Service"];

export default function Commitment() {
  return (
    <section id="commitment" aria-labelledby="commitment-heading" className="bg-brand text-paper">
      <div className="wrap section">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-14">
          {/* Photograph */}
          <Reveal as="figure" className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <ParallaxPhoto className="aspect-[4/3] bg-brand-deep lg:aspect-square">
              <Image
                src={photos.grandparents.image}
                alt={photos.grandparents.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[58%_50%]"
              />
            </ParallaxPhoto>
          </Reveal>

          {/* Story */}
          <div className="lg:col-span-7">
            <Reveal className="">
              <SectionLabel light>Our Commitment</SectionLabel>
              <h2 id="commitment-heading" className="mt-8 font-serif text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.04] tracking-[-0.038em]">
                <em className="text-gold-light">Our purpose is simple:</em> empower the young, care for the
                elderly, and inspire a culture of giving.
              </h2>
            </Reveal>

            <Reveal as="blockquote" className="mt-14 border-l-2 border-gold pl-6 sm:pl-8">
              <p className="font-serif text-[clamp(1.3rem,1.9vw,1.65rem)] font-medium leading-[1.45] tracking-[-0.012em] text-paper/90">
                &ldquo;Inspired by the compassion, values, and lifelong vision of our parents, the Foundation
                reflects their belief that everyone deserves an opportunity to learn, grow, and live with
                dignity, regardless of their financial or social circumstances.&rdquo;
              </p>
            </Reveal>

            <Reveal as="p" className="mt-10 max-w-2xl text-lg leading-[1.75] text-paper/80">
              Guided by our parents&apos; values of kindness, generosity, and service, we are dedicated to
              creating sustainable opportunities and touching lives with compassion.
            </Reveal>

            <Reveal className="mt-14 border-t border-paper/20 pt-8">
              <p className="type-eyebrow text-gold-light">The values we inherited</p>
              <ul className="mt-6 grid grid-cols-3 gap-4">
                {values.map((v, i) => (
                  <li key={v}>
                    <span className="type-eyebrow block tabular-nums text-paper/50">0{i + 1}</span>
                    <span className="mt-2 block font-serif text-[clamp(1.4rem,2.4vw,2.2rem)] leading-none tracking-[-0.045em]">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
