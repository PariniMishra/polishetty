import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { ParallaxPhoto, Reveal, Stagger, StaggerItem } from "./motion";
import { photos } from "@/content/photos";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="wrap section">
        <div className="grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-12">
          <Stagger className="lg:col-span-6 xl:col-span-5">
            <StaggerItem>
              <SectionLabel index="01">About Us</SectionLabel>
            </StaggerItem>
            <StaggerItem>
              <h2 id="about-heading" className="type-headline mt-8 text-ink">
                Empowering Lives. Inspiring Hope. <em className="text-muted">Creating Lasting Change.</em>
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="type-lead mt-8 text-ink-soft">
                <span className="text-ink">Polishetty Foundation</span> was established in India with a
                simple yet meaningful purpose: to bring hope, dignity, and opportunity to those who need it
                most.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-5 text-lg leading-[1.7] text-ink-soft">
                At its heart, Polishetty Foundation is more than a charitable initiative. It is a tribute to
                our parents&apos; values and a commitment to carrying their vision forward through purposeful
                action.
              </p>
            </StaggerItem>
            <StaggerItem>
              <a href="#commitment" className="link-cta mt-9 text-ink">
                Read our story
              </a>
            </StaggerItem>
          </Stagger>
          <Reveal as="figure" delay={0.15} className="lg:col-span-6 xl:col-span-7">
            <ParallaxPhoto className="aspect-[4/3]">
              <Image
                src={photos.outdoorClass.image}
                alt={photos.outdoorClass.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </ParallaxPhoto>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
