/**
 * Editorial section index, e.g. "01  About Us", set in the left column of
 * the 12-column grid above a hairline rule.
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
    <p className={`flex items-baseline gap-4 text-sm font-medium ${light ? "text-paper" : "text-ink"}`}>
      {index && (
        <span className={`tabular-nums ${light ? "text-gold-light" : "text-gold-dark"}`}>{index}</span>
      )}
      {children}
    </p>
  );
}
