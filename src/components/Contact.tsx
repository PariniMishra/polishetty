import SectionLabel from "./SectionLabel";
import ContactForm from "./ContactForm";
import SocialLinks, { socialProfiles } from "./SocialLinks";
import { contactDetails } from "@/content/site";

const steps = [
  { title: "Share the need", body: "Tell us who needs support and how we can help." },
  { title: "We review it", body: "Our team reads every enquiry carefully and in confidence." },
  { title: "We get in touch", body: "We contact you on the details you provide to discuss next steps." },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="wrap">
        <div className="reveal grid overflow-hidden lg:grid-cols-12">
          {/* Context panel */}
          <div className="bg-brand px-6 py-12 text-paper sm:px-10 sm:py-14 lg:col-span-5 lg:px-12 lg:py-16">
            <SectionLabel index="05" light>
              Contact Us
            </SectionLabel>
            <h2 id="contact-heading" className="type-headline mt-8">
              Start a <em className="text-gold-light">conversation</em>
            </h2>
            <p className="type-lead mt-7 text-paper/80">
              Tell us about the support you need, or refer a student or senior citizen who may need assistance.
            </p>

            <div className="mt-12 border-t border-paper/20 pt-8">
              <h3 className="type-eyebrow text-gold-light">What happens next</h3>
              <ol className="mt-6 space-y-6">
                {steps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr]">
                    <span className="font-serif text-[1.5rem] leading-none text-gold-light">{i + 1}</span>
                    <div>
                      <p className="text-lg font-semibold">{step.title}</p>
                      <p className="mt-1 leading-relaxed text-paper/75">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {(contactDetails.length > 0 || socialProfiles.length > 0) && (
              <dl className="mt-12 space-y-5 border-t border-paper/20 pt-8">
                {contactDetails.map(({ label, value, href }) => (
                  <div key={label}>
                    <dt className="type-eyebrow text-paper/60">{label}</dt>
                    <dd className="mt-1.5 text-lg">
                      {href ? (
                        <a href={href} className="text-link wrap-break-word">
                          {value}
                        </a>
                      ) : (
                        <span className="whitespace-pre-line">{value}</span>
                      )}
                    </dd>
                  </div>
                ))}
                {socialProfiles.length > 0 && (
                  <div>
                    <dt className="type-eyebrow text-paper/60">Follow Us</dt>
                    <dd className="mt-4">
                      <SocialLinks tone="light" />
                    </dd>
                  </div>
                )}
              </dl>
            )}

            <p className="mt-12 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-paper/70">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="9" rx="1.5" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              <span>
                Your details are used only to respond to your enquiry. Read our{" "}
                <a href="/privacy" className="text-link text-paper">
                  privacy policy
                </a>
                .
              </span>
            </p>
          </div>

          {/* Form panel */}
          <div className="border border-rule bg-white px-6 py-12 sm:px-10 sm:py-14 lg:col-span-7 lg:border-l-0 lg:px-14 lg:py-16">
            <h3 className="type-title text-ink">Request Support</h3>
            <p className="mt-3 text-[0.9375rem] text-muted">
              Fields marked <span className="font-semibold text-gold-dark">*</span> are required. It takes about
              two minutes.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
