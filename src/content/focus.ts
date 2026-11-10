import { photos, type Photo } from "./photos";
import type { SupportOption } from "./site";

export type FocusArea = {
  id: string;
  index: string;
  short: string;
  title: string;
  lead: string;
  body: string;
  provides: string[];
  photo: Photo;
  cta: { label: string; support: SupportOption };
};

/** The foundation's three focus areas, used by Hero, Focus, Impact and Footer. */
export const focusAreas: FocusArea[] = [
  {
    id: "focus-education",
    index: "01",
    short: "Education",
    title: "Education & Child Empowerment",
    lead: "Every child deserves an opportunity to succeed.",
    body: "We are committed to supporting children from economically disadvantaged backgrounds by providing educational assistance, scholarships, school supplies, mentorship, and access to learning opportunities that help them build brighter futures.",
    provides: [
      "Educational assistance and scholarships",
      "School supplies and learning resources",
      "Mentorship and learning opportunities",
    ],
    photo: photos.studyingBoy,
    cta: { label: "Request education support", support: "Education" },
  },
  {
    id: "focus-seniors",
    index: "02",
    short: "Senior care",
    title: "Senior Citizen Care & Welfare",
    lead: "Every senior deserves dignity, respect, and care.",
    body: "We aim to support elderly individuals facing financial hardship, isolation, or limited access to essential services. Our initiatives focus on healthcare assistance, basic necessities, emotional well-being, and improving their quality of life.",
    provides: ["Healthcare assistance", "Essential necessities", "Emotional well-being and companionship"],
    photo: photos.seniorHealth,
    cta: { label: "Request support for a senior", support: "Senior Support" },
  },
  {
    id: "focus-community",
    index: "03",
    short: "Community",
    title: "Community Support & Compassion",
    lead: "Small acts of kindness can create lasting change.",
    body: "Beyond education and senior welfare, we strive to support vulnerable families and communities through essential assistance, compassionate outreach, and initiatives that promote self-reliance and well-being.",
    provides: ["Essential assistance for families", "Community outreach", "Self-reliance and well-being"],
    photo: photos.selfHelpGroup,
    cta: { label: "Get in touch", support: "General Enquiry" },
  },
];
