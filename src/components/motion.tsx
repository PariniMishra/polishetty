"use client";

/**
 * Shared motion primitives (Motion, formerly Framer Motion).
 *
 * Every effect is decorative: content is in the HTML from the server, motion
 * only eases it in. With "reduce motion" switched on, movement is dropped and
 * elements simply appear (see MotionProvider and the useReducedMotion checks).
 * Without JavaScript, the <noscript> rule in layout.tsx makes everything visible.
 */
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Reduced-motion preference as a ref. Markup must be identical on the server
 * and in the browser, so motion values read this ref instead of branching
 * the rendered output on the preference.
 */
function useReduceRef() {
  const reduce = useReducedMotion();
  const ref = useRef(false);
  useEffect(() => {
    ref.current = !!reduce;
  }, [reduce]);
  return { ref, reduce: !!reduce };
}

export const ease = [0.16, 0.84, 0.3, 1] as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease }}>
      {children}
    </MotionConfig>
  );
}

type Tag = "div" | "figure" | "article" | "li" | "ul" | "ol" | "p" | "blockquote" | "header";

type BaseProps = {
  as?: Tag;
  className?: string;
  id?: string;
  children?: React.ReactNode;
};

// One motion component per tag, typed loosely so a single prop shape works for all.
const tag = (as: Tag) => motion[as] as typeof motion.div;

const inView = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fades and lifts its content into place when it scrolls into view. */
export function Reveal({ as = "div", delay = 0, y = 32, ...rest }: BaseProps & { delay?: number; y?: number }) {
  const C = tag(as);
  return (
    <C
      {...rest}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 1, ease, delay }}
    />
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: (gap: number = 0.12) => ({ transition: { staggerChildren: gap, delayChildren: 0.05 } }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/** Reveals its <StaggerItem> children one after another. */
export function Stagger({ as = "div", gap = 0.12, ...rest }: BaseProps & { gap?: number }) {
  const C = tag(as);
  return <C {...rest} variants={staggerParent} custom={gap} initial="hidden" whileInView="show" viewport={inView} />;
}

export function StaggerItem({ as = "div", ...rest }: BaseProps) {
  const C = tag(as);
  return <C {...rest} variants={staggerChild} />;
}

/** A thin rule that draws itself from the left (or centre) when seen. */
export function DrawLine({ className, origin = "left" }: { className?: string; origin?: "left" | "center" | "right" }) {
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={{ originX: origin === "left" ? 0 : origin === "right" ? 1 : 0.5 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={inView}
      transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}

/**
 * Image frame: the picture is unveiled with a soft wipe the first time it is
 * seen, then drifts slightly against the scroll for depth (parallax).
 * Put a next/image with `fill` inside.
 */
export function ParallaxPhoto({
  className = "",
  children,
  strength = 7,
}: {
  className?: string;
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: still, reduce } = useReduceRef();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, (v) => (still.current ? "0%" : `${((v * 2 - 1) * strength).toFixed(2)}%`));

  return (
    <motion.div
      ref={ref}
      className={`photo ${className}`}
      initial={{ clipPath: "inset(14% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={inView}
      transition={reduce ? { duration: 0.4 } : { duration: 1.3, ease }}
    >
      <motion.div
        className="absolute inset-x-0"
        style={{ y, top: `-${strength}%`, bottom: `-${strength}%` }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Text that "fills in" word by word as the reader scrolls through it.
 * Words wrapped in [[double brackets]] are highlighted.
 */
export function ScrollWords({
  text,
  className,
  highlightClassName = "",
}: {
  text: string;
  className?: string;
  highlightClassName?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { ref: still } = useReduceRef();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  // Split into words, remembering which belong to a [[highlight]].
  const words: { word: string; hi: boolean }[] = [];
  text.split(/(\[\[.*?\]\])/).forEach((part) => {
    const hi = part.startsWith("[[");
    part
      .replace(/^\[\[|\]\]$/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => words.push({ word, hi }));
  });

  return (
    <p ref={ref} className={className}>
      {words.map(({ word, hi }, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} still={still} className={hi ? highlightClassName : ""}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  still,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: React.RefObject<boolean>;
  className: string;
}) {
  const opacity = useTransform(progress, (v) => {
    if (still.current) return 1;
    const t = Math.min(1, Math.max(0, (v - range[0]) / (range[1] - range[0])));
    return 0.18 + 0.82 * t;
  });
  return (
    <>
      <motion.span className={className} style={{ opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Moves and fades its content as the page scrolls away from the top (hero). */
export function ScrollAway({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref: still } = useReduceRef();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (still.current ? 0 : Math.min(v, 700) * 0.2));
  const opacity = useTransform(scrollY, (v) => (still.current ? 1 : Math.max(0, 1 - v / 520)));
  return (
    <motion.div className={className} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

/** Subtle lift on hover for cards. */
export function HoverLift({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}>
      {children}
    </motion.div>
  );
}
