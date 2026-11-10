/**
 * Editorial section index, e.g. "01  About Us", set in the left column of
 * the 12-column grid above a hairline rule. Uppercase eyebrow styling keeps
 * it clearly distinct from headings and from form/body labels.
 */
export default function SectionLabel({
  index,
  children,
  light,
}: {
  index?: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`type-eyebrow flex items-baseline gap-3 ${light ? "text-paper" : "text-ink"}`}>
      {index && (
        <span className={`tabular-nums ${light ? "text-gold-light" : "text-gold-dark"}`}>{index}</span>
      )}
      {index && <span aria-hidden="true" className={`h-px w-6 self-center ${light ? "bg-paper/40" : "bg-rule"}`} />}
      {children}
    </p>
  );
}
