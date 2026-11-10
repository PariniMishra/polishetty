/**
 * Site-wide settings. Fill in the contact details once the foundation
 * confirms them. Empty values are simply not shown on the site.
 */
export const site = {
  name: "Polishetty Foundation",
  tagline: "Education. Care. Dignity.",
  established: "Established in India",
  description:
    "Supporting students from families facing financial hardship and senior citizens who need care and assistance in India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  contact: {
    email: "", // e.g. "contact@polishettyfoundation.org"
    phone: "", // e.g. "+91 98765 43210"
    address: "", // e.g. "12 MG Road, Bengaluru, Karnataka 560001, India"
  } as { email: string; phone: string; address: string },

  /**
   * Social media profiles. Paste the full profile URL for each account the
   * foundation has. Only platforms with a URL are shown on the site.
   */
  social: {
    instagram: "", // e.g. "https://www.instagram.com/polishettyfoundation"
    facebook: "", // e.g. "https://www.facebook.com/polishettyfoundation"
    linkedin: "", // e.g. "https://www.linkedin.com/company/polishetty-foundation"
    youtube: "", // e.g. "https://www.youtube.com/@polishettyfoundation"
    x: "", // e.g. "https://x.com/polishettyfdn"
  } as Record<"instagram" | "facebook" | "linkedin" | "youtube" | "x", string>,

  /** Section links work from every page ("/#id"), not just the homepage. */
  nav: [
    { label: "Home", href: "/#top" },
    { label: "About Us", href: "/#about" },
    { label: "Our Focus", href: "/#focus" },
    { label: "Our Impact", href: "/#impact" },
    { label: "Stories", href: "/#stories" },
    { label: "Contact Us", href: "/#contact" },
  ],
  requestSupportHref: "/#contact",
} as const;

export const supportOptions = [
  "Education",
  "Senior Support",
  "General Enquiry",
] as const;

export type SupportOption = (typeof supportOptions)[number];

/** Contact details that have actually been filled in above (never placeholders). */
export const contactDetails = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Phone", value: site.contact.phone, href: `tel:${site.contact.phone.replace(/[^\d+]/g, "")}` },
  { label: "Address", value: site.contact.address, href: undefined },
].filter((d) => d.value.trim() !== "");
