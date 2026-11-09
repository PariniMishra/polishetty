import { site } from "@/content/site";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "./Icons";

const platforms = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon },
  { key: "x", label: "X (Twitter)", Icon: XIcon },
] as const;

/** Profiles that have a URL set in src/content/site.ts. */
export const activeSocial = platforms.filter(({ key }) => site.social[key].trim() !== "");

/**
 * `showAll` renders every platform even without a URL yet; those link to "#"
 * as placeholders until a profile URL is added in src/content/site.ts.
 */
export default function SocialLinks({
  tone = "dark",
  showAll = false,
}: {
  tone?: "dark" | "light";
  showAll?: boolean;
}) {
  const items = showAll ? platforms : activeSocial;
  if (items.length === 0) return null;

  const style = tone === "light" ? "text-paper/80 hover:text-gold-light" : "text-ink hover:text-gold-dark";

  return (
    <ul className="-ml-2.5 flex flex-wrap gap-1">
      {items.map(({ key, label, Icon }) => {
        const url = site.social[key].trim();
        return (
          <li key={key}>
            <a
              href={url || "#"}
              {...(url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={url ? `${site.name} on ${label} (opens in a new tab)` : `${site.name} on ${label}`}
              title={label}
              className={`flex h-11 w-11 items-center justify-center transition-colors ${style}`}
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
