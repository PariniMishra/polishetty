import SectionLabel from "./SectionLabel";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel>About Us</SectionLabel>
            <h2 id="about-heading" className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Polishetty Foundation
            </h2>
            <p className="mt-4 font-serif text-xl italic leading-snug text-gold-dark sm:text-2xl">
              Empowering Lives. Inspiring Hope. Creating Lasting Change.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-6 text-base leading-[1.8] text-ink-soft sm:text-lg">
            <p>
              <strong className="font-semibold text-ink">Polishetty Foundation</strong> was
              established in India with a simple yet meaningful purpose: to bring hope,
              dignity, and opportunity to those who need it most.
            </p>
            <p>
              Inspired by the compassion, values, and lifelong vision of our parents, the
              Foundation reflects their belief that everyone deserves an opportunity to learn,
              grow, and live with dignity, regardless of their financial or social
              circumstances.
            </p>
            <p>
              Our mission focuses on two important pillars:{" "}
              <strong className="font-semibold text-ink">
                empowering underprivileged children through education
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-ink">
                supporting senior citizens through compassionate care and welfare initiatives
              </strong>
              .
            </p>
            <p>
              We believe education has the power to transform generations. By helping children
              access educational resources, guidance, and opportunities, we aim to build a
              foundation for brighter, more independent futures.
            </p>
            <p>
              Equally important is our commitment to senior citizens. We strive to bring
              comfort, care, respect, and meaningful support to elderly individuals who may lack
              the resources or assistance they deserve.
            </p>
            <p>
              At its heart, Polishetty Foundation is more than a charitable initiative. It is a
              tribute to our parents&apos; values and a commitment to carrying their vision
              forward through purposeful action.
            </p>
          </div>

          <figure className="mt-12 rounded-2xl bg-cream p-7 sm:p-10">
            <div className="flex gap-5 sm:gap-6">
              <span aria-hidden="true" className="w-1 shrink-0 bg-gold" />
              <blockquote>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  Our belief is simple
                </p>
                <p className="mt-3 font-serif text-2xl leading-snug text-ink sm:text-3xl">
                  Every child deserves a chance to succeed, and every senior deserves to live
                  with dignity.
                </p>
              </blockquote>
            </div>
          </figure>

          <p className="mt-8 font-serif text-xl italic text-ink-soft">
            Together, we hope to make a meaningful difference—one life at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
