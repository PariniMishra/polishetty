import SectionLabel from "./SectionLabel";
import ContactForm from "./ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";
import { site } from "@/content/site";

export default function Contact() {
  const { email, phone, address } = site.contact;
  const details = [
    { label: "Email", value: email, href: email ? `mailto:${email}` : undefined, Icon: MailIcon },
    { label: "Phone", value: phone, href: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined, Icon: PhoneIcon },
    { label: "Address", value: address, href: undefined, Icon: PinIcon },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <SectionLabel>Contact Us</SectionLabel>
          <h2 id="contact-heading" className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Start a conversation
          </h2>
          <p className="mt-5 text-base leading-[1.8] text-ink-soft sm:text-lg">
            Tell us about the support you need, or refer a student or senior citizen who may need
            assistance.
          </p>

          <ul className="mt-10 space-y-6">
            {details.map(({ label, value, href, Icon }) => (
              <li key={label} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">{label}</p>
                  {value ? (
                    href ? (
                      <a href={href} className="mt-1 block break-words text-base font-medium text-ink hover:text-gold-dark">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 whitespace-pre-line text-base font-medium text-ink">{value}</p>
                    )
                  ) : (
                    <p className="mt-1 text-base italic text-ink-soft/70">To be updated</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-3xl border border-line bg-cream p-6 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
