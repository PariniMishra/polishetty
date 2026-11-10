import { photos, type Photo } from "./photos";

/**
 * Stories & Updates.
 *
 * kind "perspective": an illustrative piece about the needs the foundation's
 *   work responds to. It does NOT describe a specific Foundation activity or
 *   beneficiary, and is labelled as illustrative on the site.
 * kind "update": factual news about the Foundation itself.
 * kind "story": a real story from the Foundation's own work (add these as
 *   they happen, ideally with the Foundation's own, consented photographs).
 *
 * To add a story, add an entry here. Set `href` when a full article exists
 * (for example a future /stories/<slug> page); without it the card shows the
 * excerpt only, so there are never dead links.
 */
export type Story = {
  kind: "perspective" | "update" | "story";
  category: "Education" | "Senior welfare" | "Community" | "Foundation update";
  title: string;
  excerpt: string;
  photo: Photo;
  date?: string;
  href?: string;
};

export const storyKindLabel: Record<Story["kind"], string> = {
  perspective: "Illustrative perspective",
  update: "Foundation update",
  story: "From our work",
};

export const stories: Story[] = [
  {
    kind: "perspective",
    category: "Education",
    title: "Why a school bag can decide a school year",
    excerpt:
      "For many families, the cost of books, uniforms and supplies arrives all at once. When it cannot be met, children fall behind quietly, and some stop going altogether. Timely, practical help can keep a child learning, and keep a family's hopes for that child alive.",
    photo: photos.kulluStudy,
  },
  {
    kind: "perspective",
    category: "Senior welfare",
    title: "Ageing alone: the quiet hardship of isolation",
    excerpt:
      "Financial hardship in later life is often matched by loneliness. Regular contact, help with healthcare and a reliable source of essentials can restore a sense of security and dignity.",
    photo: photos.elderAtHome,
  },
  {
    kind: "perspective",
    category: "Community",
    title: "When families have something to fall back on",
    excerpt:
      "Essential assistance at the right moment can stop a short-term crisis from becoming a long-term setback, and help families stay on the path to self-reliance.",
    photo: photos.motherAndChild,
  },
  {
    kind: "update",
    category: "Foundation update",
    title: "Polishetty Foundation is established in India",
    excerpt:
      "Inspired by our parents' values of kindness, generosity and service, the Foundation has been established to support children's education and the welfare of senior citizens.",
    photo: photos.reading,
  },
];
