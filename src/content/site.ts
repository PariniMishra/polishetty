/**
 * Site-wide settings. Fill in the contact details once the foundation
 * confirms them. Any value left empty shows "To be updated" on the page.
 */
export const site = {
  name: "Polishetty Foundation",
  tagline: "Education. Care. Dignity.",
  description:
    "Supporting students from families facing financial hardship and senior citizens who need care and assistance in India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  contact: {
    email: "", // e.g. "contact@polishettyfoundation.org"
    phone: "", // e.g. "+91 98765 43210"
    address: "", // e.g. "12 MG Road, Bengaluru, Karnataka 560001, India"
  } as { email: string; phone: string; address: string },

  nav: [
    { label: "About Us", href: "#about" },
    { label: "Our Focus", href: "#focus" },
    { label: "Contact Us", href: "#contact" },
  ],
} as const;

export const supportOptions = [
  "Education",
  "Senior Support",
  "General Enquiry",
] as const;

export type SupportOption = (typeof supportOptions)[number];
