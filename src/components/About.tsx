import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      {/* Opening */}
      <div className="wrap pt-28 sm:pt-36 lg:pt-44">
        <div className="reveal grid gap-y-10 border-t border-ink pt-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <SectionLabel index="01">About Us</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <h2 id="about-heading" className="text-sm font-medium text-gold-dark">
              Polishetty Foundation
            </h2>
            <p className="mt-6 font-serif text-[clamp(2.4rem,5.2vw,4.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink">
              Empowering Lives. Inspiring Hope. <em className="font-light">Creating Lasting Change.</em>
            </p>
            <p className="mt-12 max-w-2xl text-xl leading-[1.6] text-ink-soft sm:text-[1.375rem]">
              <span className="text-ink">Polishetty Foundation</span> was established in India with a
              simple yet meaningful purpose: to bring hope, dignity, and opportunity to those who need
              it most.
            </p>
          </div>
        </div>
      </div>

      {/* Our story: the parents' inspiration */}
      <div className="mt-28 bg-stone sm:mt-36 lg:mt-44">
        <div className="wrap py-24 sm:py-32 lg:py-40">
          <div className="reveal grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-3">
              <SectionLabel>Our story</SectionLabel>
            </div>
            <div className="lg:col-span-9">
              <blockquote>
                <p className="font-serif text-[clamp(1.85rem,3.4vw,3.1rem)] font-light leading-[1.18] tracking-[-0.01em] text-ink">
                  &ldquo;Inspired by the compassion, values, and lifelong vision of our parents, the
                  Foundation reflects their belief that everyone deserves an opportunity to learn,
                  grow, and live with dignity, regardless of their financial or social
                  circumstances.&rdquo;
                </p>
              </blockquote>
              <div className="mt-14 grid gap-8 border-t border-rule pt-8 md:grid-cols-9 md:gap-x-8">
                <p className="text-sm font-medium text-ink md:col-span-3">A tribute to our parents&apos; values</p>
                <p className="text-lg leading-[1.65] text-ink-soft md:col-span-6">
                  At its heart, Polishetty Foundation is more than a charitable initiative. It is a
                  tribute to our parents&apos; values and a commitment to carrying their vision forward
                  through purposeful action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission: two pillars */}
      <div className="wrap pt-28 sm:pt-36 lg:pt-44">
        <div className="reveal grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <SectionLabel>Our mission</SectionLabel>
          </div>
          <p className="font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-[1.25] text-ink lg:col-span-8">
            Our mission focuses on two important pillars:{" "}
            <em>empowering underprivileged children through education</em> and{" "}
            <em>supporting senior citizens through compassionate care and welfare initiatives</em>.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 lg:grid-cols-12 lg:mt-24">
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:col-span-9 lg:col-start-4">
            <Pillar
              number="01"
              title="Education"
              body="We believe education has the power to transform generations. By helping children access educational resources, guidance, and opportunities, we aim to build a foundation for brighter, more independent futures."
            />
            <Pillar
              number="02"
              title="Senior citizens"
              body="Equally important is our commitment to senior citizens. We strive to bring comfort, care, respect, and meaningful support to elderly individuals who may lack the resources or assistance they deserve."
            />
          </div>
        </div>
      </div>

      {/* Belief */}
      <div className="wrap pb-28 pt-28 sm:pb-36 sm:pt-36 lg:pb-44 lg:pt-44">
        <figure className="reveal border-t border-ink pt-6">
          <figcaption className="text-sm font-medium text-ink">Our belief is simple</figcaption>
          <blockquote className="mt-10 lg:mt-14">
            <p className="max-w-[18ch] font-serif text-[clamp(2.6rem,6.2vw,6rem)] font-light leading-[1] tracking-[-0.025em] text-ink sm:max-w-[20ch]">
              Every child deserves a chance to succeed, and every senior deserves to live with{" "}
              <em className="text-gold-dark">dignity.</em>
            </p>
          </blockquote>
          <div className="mt-14 grid lg:grid-cols-12 lg:gap-x-8">
            <p className="font-serif text-2xl font-light italic leading-snug text-ink-soft lg:col-span-5 lg:col-start-8">
              Together, we hope to make a meaningful difference—one life at a time.
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}

function Pillar({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <article className="reveal border-t border-rule pt-6">
      <p className="font-serif text-6xl font-extralight leading-none tabular-nums text-gold-dark">{number}</p>
      <h3 className="mt-8 text-sm font-medium text-ink">{title}</h3>
      <p className="mt-3 text-lg leading-[1.65] text-ink-soft">{body}</p>
    </article>
  );
}
