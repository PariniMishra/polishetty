import type { StaticImageData } from "next/image";
import educationClassroom from "@/assets/photos/education-classroom.jpg";
import educationReading from "@/assets/photos/education-reading.jpg";
import seniorPortrait from "@/assets/photos/senior-portrait.jpg";
import seniorCommunity from "@/assets/photos/senior-community.jpg";
import communityWomen from "@/assets/photos/community-women.jpg";

/**
 * Photographs used on the site.
 *
 * These are ILLUSTRATIVE images licensed under Creative Commons from
 * Wikimedia Commons. They do not show Polishetty Foundation beneficiaries,
 * programmes or events. The footer carries a disclosure and the required
 * attribution for each one (author, licence, source, and that the images
 * were resized and cropped).
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

export const photos = {
  children: {
    image: educationClassroom,
    alt: "Schoolchildren in uniform standing together in a rural classroom in Tamil Nadu",
    credit: {
      title: "Tamil Nadu school kids",
      author: "McKay Savage",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tamil_Nadu_school_kids.jpg",
    },
  },
  reading: {
    image: educationReading,
    alt: "A schoolgirl sitting at a table, absorbed in reading a picture book",
    credit: {
      title: "A girl reading a book",
      author: "Pratham Books",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:A_girl_reading_a_book_-_Flickr_-_Pratham_Books_(1).jpg",
    },
  },
  elder: {
    image: seniorPortrait,
    alt: "An elderly man smiling warmly with his hands folded in a namaste greeting",
    credit: {
      title: "Aged Male Resident, Social Care Home, Baganda, Hooghly",
      author: "Biswarup Ganguly",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Aged_Male_Resident_-_Social_Care_Home_-_Janasiksha_Prochar_Kendra_-_Baganda_-_Hooghly_2014-09-28_8559.JPG",
    },
  },
  elders: {
    image: seniorCommunity,
    alt: "A group of elderly women and men seated together under a shaded shelter",
    credit: {
      title: "Light old age home 4",
      author: "Jones Daniel T",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Light_old_age_home_4.jpg",
    },
  },
  community: {
    image: communityWomen,
    alt: "Women from a village community sitting together at a shared workspace",
    credit: {
      title: "Artists at work 01",
      author: "Arina Bardhan",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Artists_at_work_01.jpg",
    },
  },
} satisfies Record<string, Photo>;
