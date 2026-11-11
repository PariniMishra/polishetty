import { site } from "@/content/site";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "./Icons";

const platforms = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon },
  { key: "x", label: "X", Icon: XIcon },
] as const;

/** Platforms listed in src/content/site.ts (linked once a url is added). */
export const socialProfiles = platforms
  .map((p) => ({ ...p, ...site.social[p.key] }))
  .filter((p): p is (typeof platforms)[number] & { handle: string; url: string } => Boolean(p.handle));

/**
 * Row of social media icons.
 * A profile with a url becomes a link (opens in a new tab); without one the
 * icon is shown but not clickable, so there are never dead links.
 */
export default function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  if (socialProfiles.length === 0) return null;

  const base =
    tone === "light"
      ? "border-paper/20 text-paper/85"
      : "border-rule text-ink";
  const hover = "hover:border-gold hover:bg-gold hover:text-ink";

  return (
    <ul className="flex flex-wrap gap-2.5">
      {socialProfiles.map(({ key, label, Icon, url }) => {
        const cls = `flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${base}`;
        return (
          <li key={key}>
            {url.trim() ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on ${label} (opens in a new tab)`}
                title={label}
                className={`${cls} ${hover}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ) : (
              <span className={cls} title={`${label} (link coming soon)`}>
                <Icon className="h-4 w-4"/>
                <span className="sr-only">{label}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
