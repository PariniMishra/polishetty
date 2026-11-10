import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you share through this website.`,
  alternates: { canonical: "/privacy" },
};

/**
 * Plain-language privacy policy that describes what this website actually
 * does today (enquiry form → email to the foundation; no analytics, no
 * advertising cookies). The foundation should review it, and update it if
 * how enquiries are stored or used changes.
 */
const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What we collect",
    body: (
      <p>
        When you send an enquiry, we receive the details you enter in the form: your name, phone number,
        email address (if you give one), city and state, the type of support needed, your message, and your
        agreement to be contacted. We do not ask for, and you should not send, sensitive documents through
        the form.
      </p>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <p>
        We use your details only to read and respond to your enquiry, and to follow up with you about it.
        We do not sell, rent or share your information for marketing, and we do not add you to mailing
        lists.
      </p>
    ),
  },
  {
    heading: "How it reaches us",
    body: (
      <p>
        Enquiries are delivered to the Foundation by email through a third-party email delivery service,
        and the website is hosted by a third-party hosting provider. These providers process the
        information only to deliver the service. To protect the form from spam, your connection&apos;s IP
        address is checked briefly to limit repeated submissions; it is not stored with your enquiry.
      </p>
    ),
  },
  {
    heading: "Cookies and tracking",
    body: (
      <p>
        This website does not use advertising or analytics cookies, and it does not track you across other
        websites.
      </p>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        We keep enquiry details only for as long as we need them to respond and provide any support that
        follows, and then delete them.
      </p>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <p>
        You can ask us to see, correct or delete the information you have shared with us, or ask us to stop
        contacting you, at any time. To do so, send us a message through the{" "}
        <a href="/#contact" className="text-link text-gold-dark">
          enquiry form
        </a>{" "}
        and choose &ldquo;General Enquiry&rdquo;.
      </p>
    ),
  },
  {
    heading: "Photographs",
    body: (
      <p>
        Photographs on this website are illustrative images used under Creative Commons licences. They do
        not show the Foundation&apos;s beneficiaries. Full credits are listed in the footer of every page.
      </p>
    ),
  },
];

const slug = (s: string) => `privacy-${s.toLowerCase().replace(/[^a-z]+/g, "-")}`;

export default function PrivacyPage() {
  return (
    <article className="pt-18 lg:pt-20">
      <header className="border-b border-rule bg-stone">
        <div className="wrap py-16 sm:py-20 lg:py-24">
          <p className="type-eyebrow text-gold-dark">{site.name}</p>
          <h1 className="type-headline mt-6 text-ink">Privacy Policy</h1>
          <p className="type-lead mt-6 max-w-2xl text-ink-soft">
            How we handle the information you share with us through this website, in plain language.
          </p>
          <p className="mt-6 text-sm text-muted">Last updated: November 2026</p>
        </div>
      </header>
      <div className="wrap py-16 sm:py-20">
        <div className="max-w-3xl space-y-12">
          {sections.map((s) => (
            <section key={s.heading} aria-labelledby={slug(s.heading)}>
              <h2 id={slug(s.heading)} className="type-title text-ink">
                {s.heading}
              </h2>
              <div className="mt-4 text-lg leading-[1.75] text-ink-soft">{s.body}</div>
            </section>
          ))}
        </div>
        <a href="/" className="link-cta mt-16 text-ink">
          Back to the homepage
        </a>
      </div>
    </article>
  );
}
