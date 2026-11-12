import type { StaticImageData } from "next/image";
import educationClassroom from "@/assets/photos/education-classroom.jpg";
import seniorPortrait from "@/assets/photos/senior-portrait.jpg";
import heroClassroomSmiles from "@/assets/photos/hero-classroom-smiles.jpg";
import aboutOutdoorClass from "@/assets/photos/about-outdoor-class.jpg";
import focusEducationBoy from "@/assets/photos/focus-education-boy.jpg";
import focusSeniorHealth from "@/assets/photos/focus-senior-health.jpg";
import focusCommunityShg from "@/assets/photos/focus-community-shg.jpg";
import commitmentGrandparents from "@/assets/photos/commitment-grandparents.jpg";
import impactStudyGroup from "@/assets/photos/impact-study-group.jpg";
import impactElderPortrait from "@/assets/photos/impact-elder-portrait.jpg";
import impactRuralWomen from "@/assets/photos/impact-rural-women.jpg";

/**
 * Photographs used on the site.
 *
 * These are ILLUSTRATIVE images from Wikimedia Commons, all taken in India and
 * licensed under Creative Commons licences that allow resizing and cropping
 * (CC BY / CC BY-SA). They do not show Polishetty Foundation beneficiaries,
 * programmes or events. The footer carries a disclosure and the required
 * attribution for each one (title, author, licence, source, and that the
 * images were resized and cropped).
 *
 * When the foundation has its own photographs (with consent from the people
 * shown), replace the files in src/assets/photos and update the entries here.
 */
export type Photo = {
  image: StaticImageData;
  alt: string;
  credit: {
    title: string;
    author: string;
    license: string;
    licenseUrl: string;
    sourceUrl: string;
  };
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;
const BY2 = { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" };
const BY3 = { license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/" };
const BYSA2 = { license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };
const BYSA4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };

export const photos = {
  hero: {
    image: heroClassroomSmiles,
    alt: "Three schoolboys in Chennai leaning into the frame, smiling broadly",
    credit: {
      title: "Connecting classrooms around the world",
      author: "DFID – UK Department for International Development",
      ...BYSA2,
      sourceUrl: commons("Connecting_classrooms_around_the_world_(3677773417).jpg"),
    },
  },
  outdoorClass: {
    image: aboutOutdoorClass,
    alt: "Children sitting cross-legged on mats for an outdoor class under the trees",
    credit: {
      title: "Adivasi Children at Tribal Academy, Tejgadh",
      author: "Gazal world",
      ...BYSA4,
      sourceUrl: commons("Adivasi_Children_at_Tribal_Academy_Tejgadh.jpg"),
    },
  },
  children: {
    image: educationClassroom,
    alt: "Schoolchildren in uniform standing together in a rural classroom in Tamil Nadu",
    credit: {
      title: "Tamil Nadu school kids",
      author: "McKay Savage",
      ...BY2,
      sourceUrl: commons("Tamil_Nadu_school_kids.jpg"),
    },
  },
  elder: {
    image: seniorPortrait,
    alt: "An elderly man smiling warmly with his hands folded in a namaste greeting",
    credit: {
      title: "Aged Male Resident, Social Care Home, Baganda, Hooghly",
      author: "Biswarup Ganguly",
      ...BY3,
      sourceUrl: commons(
        "Aged_Male_Resident_-_Social_Care_Home_-_Janasiksha_Prochar_Kendra_-_Baganda_-_Hooghly_2014-09-28_8559.JPG",
      ),
    },
  },
  studyingBoy: {
    image: focusEducationBoy,
    alt: "A smiling boy in a blue school shirt at his desk, pen in hand",
    credit: {
      title: "A young boy studying in school",
      author: "ILO Asia-Pacific",
      ...BYSA2,
      sourceUrl: commons("A_young_boy_studying_in_school_(24740479123).jpg"),
    },
  },
  seniorHealth: {
    image: focusSeniorHealth,
    alt: "A doctor checking an elderly man's blood pressure while a woman looks on",
    credit: {
      title: "Light old age home",
      author: "Jones Daniel T",
      ...BYSA4,
      sourceUrl: commons("Light_old_age_home.jpg"),
    },
  },
  selfHelpGroup: {
    image: focusCommunityShg,
    alt: "Women seated in a circle at a community self-help group meeting",
    credit: {
      title: "Women self help group foundation",
      author: "Pondicherry17",
      ...BYSA4,
      sourceUrl: commons("Women_self_help_group_foundation.jpg"),
    },
  },
  grandparents: {
    image: commitmentGrandparents,
    alt: "A grandfather playfully making his granddaughter smile as her grandmother holds her",
    credit: {
      title: "Grandparents – The cradle of love",
      author: "PR Kavitha",
      ...BYSA4,
      sourceUrl: commons("Grandparents_-_The_cradle_of_love!!.jpg"),
    },
  },
  studyGroup: {
    image: impactStudyGroup,
    alt: "Schoolgirls bent over their notebooks during a group study session",
    credit: {
      title: "Biology study group",
      author: "Barry Pousman",
      ...BY2,
      sourceUrl: commons("Biology_study_group_(6146861188).jpg"),
    },
  },
  elderPortrait: {
    image: impactElderPortrait,
    alt: "Portrait of an elderly man wearing a saffron turban and shawl",
    credit: {
      title: "Elderly man in traditional turban and shawl in rural India",
      author: "The open draft",
      ...BYSA4,
      sourceUrl: commons("Elderly_man_in_traditional_turban_and_shawl_in_rural_India.jpg"),
    },
  },
  ruralWomen: {
    image: impactRuralWomen,
    alt: "A group of women in bright saris sitting together and smiling",
    credit: {
      title: "India – Faces – Rural women driving their own change",
      author: "McKay Savage",
      ...BY2,
      sourceUrl: commons("India_-_Faces_-_Rural_women_driving_their_own_change_1_(2229752965).jpg"),
    },
  },
} satisfies Record<string, Photo>;
