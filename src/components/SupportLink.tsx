"use client";

import type { SupportOption } from "@/content/site";

export const SELECT_SUPPORT_EVENT = "pf:select-support";

/**
 * Link to the enquiry form that also preselects the matching "Support needed"
 * option. Works as a plain link (to /#contact) without JavaScript.
 */
export default function SupportLink({
  support,
  className,
  children,
}: {
  support: SupportOption;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="/#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_SUPPORT_EVENT, { detail: support }))}
    >
      {children}
    </a>
  );
}
