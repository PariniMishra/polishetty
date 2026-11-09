import { ArrowIcon, BookIcon, CareIcon } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      {/* Soft decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold-soft/70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-32 lg:pt-24">
        <div className="lg:col-span-7">
          <div className="flex gap-5 sm:gap-7">
            <span aria-hidden="true" className="mt-2 w-1 shrink-0 bg-gold sm:w-1.5" />
            <div>
              <h1 className="font-serif text-[2.6rem] leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                A chance to learn.
                <br />
                <span className="text-gold-dark">A life with dignity.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                Supporting students from families facing financial hardship and senior
                citizens who need care and assistance in India.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:ml-9 sm:flex-row sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-base font-semibold text-ink shadow-sm transition-colors hover:bg-ink hover:text-paper"
            >
              Request Support
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-4 text-base font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              About the Foundation
            </a>
          </div>
        </div>

        {/* Two pillars */}
        <div className="lg:col-span-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <PillarCard
              icon={<BookIcon className="h-6 w-6" />}
              label="Education"
              text="Every child deserves a chance to succeed."
            />
            <PillarCard
              icon={<CareIcon className="h-6 w-6" />}
              label="Senior Care"
              text="Every senior deserves to live with dignity."
              offset
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  icon,
  label,
  text,
  offset,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
  offset?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white/80 p-6 shadow-[0_1px_0_rgba(28,29,24,0.04),0_12px_32px_-16px_rgba(28,29,24,0.18)] backdrop-blur sm:p-7 ${
        offset ? "lg:ml-12" : "lg:mr-12"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
          {icon}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {label}
        </span>
      </div>
      <p className="mt-4 font-serif text-2xl leading-snug text-ink">{text}</p>
    </div>
  );
}
