import SectionLabel from "./SectionLabel";
import ContactForm from "./ContactForm";
import SocialLinks, { activeSocial } from "./SocialLinks";
import { site } from "@/content/site";

export default function Contact() {
  const { email, phone, address } = site.contact;
  const details = [
    { label: "Email", value: email, href: email ? `mailto:${email}` : undefined },
    { label: "Phone", value: phone, href: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined },
    { label: "Address", value: address, href: undefined },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-28 sm:py-36 lg:py-44">
      <div className="wrap">
        <div className="reveal grid gap-y-10 border-t border-ink pt-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <SectionLabel index="03">Contact Us</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <h2
              id="contact-heading"
              className="font-serif text-[clamp(2.4rem,5.2vw,4.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink"
            >
              Start a <em className="font-light">conversation</em>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-[1.65] text-ink-soft">
              Tell us about the support you need, or refer a student or senior citizen who may need
              assistance.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-y-16 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
          {/* Details */}
          <dl className="reveal lg:col-span-3">
            {details.map(({ label, value, href }) => (
              <div key={label} className="border-t border-rule py-5">
                <dt className="text-sm font-medium text-ink">{label}</dt>
                <dd className="mt-1.5 text-base">
                  {value ? (
                    href ? (
                      <a href={href} className="text-link break-words text-ink">
                        {value}
                      </a>
                    ) : (
                      <span className="whitespace-pre-line text-ink">{value}</span>
                    )
                  ) : (
                    <span className="text-muted">To be updated</span>
                  )}
                </dd>
              </div>
            ))}
            <div className="border-y border-rule py-5">
              <dt className="text-sm font-medium text-ink">Follow Us</dt>
              <dd className="mt-3 text-base">
                {activeSocial.length > 0 ? <SocialLinks /> : <span className="text-muted">To be updated</span>}
              </dd>
            </div>
          </dl>

          {/* Form */}
          <div className="reveal lg:col-span-8 lg:col-start-4 xl:col-span-7">
            <div className="border-t border-ink pt-6">
              <h3 className="font-serif text-3xl font-light text-ink sm:text-4xl">Request Support</h3>
              <p className="mt-3 text-sm text-muted">
                Fields marked <span className="text-gold-dark">*</span> are required.
              </p>
            </div>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
