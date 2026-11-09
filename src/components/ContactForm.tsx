"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { sendEnquiry, type EnquiryState, type FieldName } from "@/app/actions";
import { supportOptions } from "@/content/site";

const initialState: EnquiryState = { status: "idle" };

const inputBase =
  "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/50 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => formAction(fd));
  }

  const err = (f: FieldName) => state.fieldErrors?.[f];
  const cls = (f: FieldName) => `${inputBase} ${err(f) ? "border-red-600" : "border-line"}`;
  const described = (f: FieldName) => (err(f) ? { "aria-invalid": true, "aria-describedby": `${f}-error` } : {});

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot (hidden from people, bots tend to fill it) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your Name" name="name" error={err("name")}>
          <input id="name" name="name" type="text" required autoComplete="name" maxLength={100} className={cls("name")} {...described("name")} />
        </Field>
        <Field label="Phone Number" name="phone" error={err("phone")}>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91" maxLength={20} className={cls("phone")} {...described("phone")} />
        </Field>
        <Field label="Email" optional name="email" error={err("email")}>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={150} className={cls("email")} {...described("email")} />
        </Field>
        <Field label="City / State" name="location" error={err("location")}>
          <input id="location" name="location" type="text" required autoComplete="address-level2" maxLength={100} className={cls("location")} {...described("location")} />
        </Field>
      </div>

      <Field label="Support Needed" name="support" error={err("support")}>
        <div className="relative">
          <select id="support" name="support" required defaultValue="" className={`${cls("support")} appearance-none pr-11`} {...described("support")}>
            <option value="" disabled>
              Select an option
            </option>
            {supportOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <svg aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-5 w-5 -translate-y-1/2 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </Field>

      <Field label="How Can We Help?" name="message" error={err("message")}>
        <textarea id="message" name="message" required rows={5} maxLength={3000} className={`${cls("message")} resize-y`} {...described("message")} />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-line accent-[#ab8018]"
            {...(err("consent") ? { "aria-invalid": true, "aria-describedby": "consent-error" } : {})}
          />
          I agree to be contacted about my enquiry.
        </label>
        {err("consent") && (
          <p id="consent-error" className="mt-2 text-sm text-red-700">
            {err("consent")}
          </p>
        )}
      </div>

      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="outline-none"
      >
        {state.status === "success" && (
          <p className="rounded-xl border border-gold/40 bg-gold-soft px-4 py-3 text-sm text-ink">
            <strong className="font-semibold">Thank you.</strong> Your enquiry has been sent. Our
            team will get in touch with you soon.
          </p>
        )}
        {state.status === "error" && state.message && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {state.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-ink px-8 py-4 text-base font-semibold text-paper transition-colors hover:bg-gold hover:text-ink disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="text-xs leading-relaxed text-ink-soft">
        We use the details you share only to respond to your enquiry. We do not sell or share
        your information.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  optional,
  error,
  children,
}: {
  label: string;
  name: FieldName;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
        {optional ? (
          <span className="ml-1 font-normal text-ink-soft">(Optional)</span>
        ) : (
          <span aria-hidden="true" className="ml-0.5 text-gold-dark">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
