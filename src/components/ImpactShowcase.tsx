"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/photos";
import { ease } from "./motion";

export type Commitment = { area: string; title: string; body: string; photo: Photo; position?: string };

/**
 * Desktop: the photograph stays pinned on the left and changes as each
 * commitment scrolls into focus on the right. Mobile: stacked cards.
 */
export default function ImpactShowcase({ items }: { items: Commitment[] }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="mt-16 grid lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
      {/* Pinned photograph (desktop) */}
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-28 h-[calc(100svh-9rem)] max-h-[46rem] overflow-hidden bg-brand-deep">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease }}
            >
              <Image
                src={items[active].photo.image}
                alt={items[active].photo.alt}
                fill
                placeholder="blur"
                sizes="50vw"
                className={`object-cover ${items[active].position ?? "object-center"}`}
              />
            </motion.div>
          </AnimatePresence>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(14,19,17,0.75)_0%,rgba(14,19,17,0)_45%)]"
          />
          {/* Counter + caption */}
          <div className="absolute inset-x-0 top-0 flex justify-end p-7">
            <span className="border border-paper/25 bg-brand-deep/40 px-3 py-1.5 font-serif text-[0.95rem] tabular-nums tracking-[-0.01em] text-paper backdrop-blur-sm">
              {String(active + 1).padStart(2, "0")}
              <span className="text-paper/50"> / {String(items.length).padStart(2, "0")}</span>
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-7 text-paper">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={active}
                className="type-eyebrow text-gold-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
              >
                {items[active].area}
              </motion.p>
            </AnimatePresence>
            <div className="mt-4 flex gap-2">
              {items.map((c, i) => (
                <span key={c.area} className="relative h-0.5 flex-1 overflow-hidden bg-paper/20">
                  <motion.span
                    className="absolute inset-0 origin-left bg-gold"
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    transition={{ duration: 0.6, ease }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Commitments */}
      <ol ref={listRef} className="relative space-y-6 lg:col-span-6 lg:space-y-0">
        {/* Progress rail (desktop) */}
        <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 hidden w-px bg-ink/10 lg:block">
          <motion.span className="absolute inset-0 origin-top bg-gold" style={{ scaleY: progress }} />
        </span>
        {items.map((c, i) => (
          <Panel key={c.area} item={c} index={i} active={active === i} onActive={() => setActive(i)} />
        ))}
      </ol>
    </div>
  );
}

function Panel({
  item,
  index,
  active,
  onActive,
}: {
  item: Commitment;
  index: number;
  active: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <li ref={ref} className="lg:flex lg:min-h-[78svh] lg:items-center lg:pl-14">
      <motion.article
        className="overflow-hidden bg-paper lg:overflow-visible lg:bg-transparent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease }}
      >
        {/* Photograph (mobile and tablet) */}
        <div className="photo relative aspect-[4/3] lg:hidden">
          <Image
            src={item.photo.image}
            alt={item.photo.alt}
            fill
            placeholder="blur"
            sizes="100vw"
            className={`object-cover ${item.position ?? "object-center"}`}
          />
        </div>

        <div
          className={`p-6 transition-opacity duration-700 sm:p-9 lg:p-0 ${active ? "lg:opacity-100" : "lg:opacity-35"}`}
        >
          <div className="flex items-baseline gap-5">
            <span className="font-serif text-[clamp(3.5rem,6vw,5.5rem)] leading-none tracking-[-0.06em] text-gold-dark">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="type-eyebrow text-muted">{item.area}</span>
          </div>
          <h3 className="mt-6 font-serif text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.04] tracking-[-0.04em] text-ink">
            {item.title}
          </h3>
          <p className="mt-6 max-w-lg text-lg leading-[1.75] text-ink-soft">{item.body}</p>
        </div>
      </motion.article>
    </li>
  );
}
