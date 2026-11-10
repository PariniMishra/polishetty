import { supportOptions } from "@/content/site";

/**
 * Enquiry validation shared by the server action (authoritative) and the
 * contact form (instant feedback). Keep the rules here so both stay in sync.
 */
export type FieldName = "name" | "phone" | "email" | "location" | "support" | "message" | "consent";

export type EnquiryData = {
  name: string;
  phone: string;
  email: string;
  location: string;
  support: string;
  message: string;
  consent: boolean;
};

export const limits = { name: 100, phone: 20, email: 150, location: 100, support: 40, message: 3000 } as const;

export const fieldOrder: FieldName[] = ["name", "phone", "email", "location", "support", "message", "consent"];

export const fieldLabels: Record<FieldName, string> = {
  name: "Your name",
  phone: "Phone number",
  email: "Email",
  location: "City / State",
  support: "Support needed",
  message: "How can we help?",
  consent: "Consent to be contacted",
};

export function validateField(field: FieldName, d: EnquiryData): string | undefined {
  switch (field) {
    case "name":
      return d.name.length < 2 ? "Please enter your name." : undefined;
    case "phone": {
      const digits = d.phone.replace(/\D/g, "");
      return !/^[+\d][\d\s-]*$/.test(d.phone) || digits.length < 10 || digits.length > 13
        ? "Please enter a valid phone number."
        : undefined;
    }
    case "email":
      return d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)
        ? "Please enter a valid email address, or leave it blank."
        : undefined;
    case "location":
      return d.location.length < 2 ? "Please enter your city and state." : undefined;
    case "support":
      return !(supportOptions as readonly string[]).includes(d.support)
        ? "Please choose the type of support needed."
        : undefined;
    case "message":
      return d.message.length < 10 ? "Please tell us a little more (at least 10 characters)." : undefined;
    case "consent":
      return !d.consent ? "Please agree to be contacted so we can respond." : undefined;
  }
}

export function validateEnquiry(d: EnquiryData): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  for (const f of fieldOrder) {
    const e = validateField(f, d);
    if (e) errors[f] = e;
  }
  return errors;
}

const str = (v: FormDataEntryValue | null, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function readEnquiry(formData: FormData): EnquiryData {
  return {
    name: str(formData.get("name"), limits.name),
    phone: str(formData.get("phone"), limits.phone),
    email: str(formData.get("email"), limits.email),
    location: str(formData.get("location"), limits.location),
    support: str(formData.get("support"), limits.support),
    message: str(formData.get("message"), limits.message),
    consent: formData.get("consent") === "on",
  };
}
