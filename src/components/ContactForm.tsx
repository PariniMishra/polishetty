"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/actions";
import { supportOptions } from "@/content/site";
import {
  fieldLabels,
  fieldOrder,
  limits,
  readEnquiry,
  validateEnquiry,
  validateField,
  type FieldName,
} from "@/lib/enquiry";
import { ArrowIcon } from "./Icons";
import { SELECT_SUPPORT_EVENT } from "./SupportLink";

const initialState: EnquiryState = { status: "idle" };
type Errors = Partial<Record<FieldName, string>>;

const inputBase =
  "mt-2 block w-full border bg-white px-4 text-[1.0625rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4";
const inputOk = "border-[#cfc8b8] hover:border-ink-soft focus:border-brand focus:ring-brand/15";
const inputBad = "border-danger bg-danger-tint/40 focus:border-danger focus:ring-danger/15";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [dismissed, setDismissed] = useState<EnquiryState | null>(null);

  const succeeded = state.status === "success" && dismissed !== state;
  const serverMessage = state.status === "error" && dismissed !== state ? state.message : undefined;

  // Reflect the server's response (authoritative validation, delivery errors, success)
  useEffect(() => {
    if (state.status === "error") {
      if (state.fieldErrors) {
        setErrors(state.fieldErrors);
        setShowSummary(true);
      }
      summaryRef.current?.focus();
    }
    if (state.status === "success") {
      formRef.current?.reset();
      setErrors({});
      setTouched({});
      setShowSummary(false);
      setMessageLength(0);
      successRef.current?.focus();
    }
  }, [state]);

  // "Request education support" etc. preselect the matching option
  useEffect(() => {
    const onSelect = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      setDismissed(state);
      const select = formRef.current?.elements.namedItem("support") as HTMLSelectElement | null;
      if (select && (supportOptions as readonly string[]).includes(value)) {
        select.value = value;
        setErrors((prev) => ({ ...prev, support: undefined }));
      }
    };
    window.addEventListener(SELECT_SUPPORT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SUPPORT_EVENT, onSelect);
  }, [state]);

  const current = () => readEnquiry(new FormData(formRef.current!));

  function check(field: FieldName) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, current()) }));
  }

  function onBlur(e: React.FocusEvent<HTMLFormElement>) {
    const field = e.target.getAttribute("name") as FieldName | null;
    if (!field || !fieldOrder.includes(field)) return;
    setTouched((t) => ({ ...t, [field]: true }));
    check(field);
  }

  function onChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    const field = target.name as FieldName;
    if (field === "message") setMessageLength(target.value.length);
    // Once a field has been visited (or flagged), re-check it as the person types
    if (touched[field] || errors[field]) check(field);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const found = validateEnquiry(readEnquiry(fd));
    setErrors(found);
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
    if (Object.keys(found).length > 0) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    startTransition(() => formAction(fd));
  }

  const describedBy = (f: FieldName, hint?: boolean) =>
    [hint ? `${f}-hint` : "", errors[f] ? `${f}-error` : ""].filter(Boolean).join(" ") || undefined;
  const field = (f: FieldName, hint?: boolean) => ({
    id: f,
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": describedBy(f, hint),
  });
  const cls = (f: FieldName) => `${inputBase} ${errors[f] ? inputBad : inputOk}`;
  const errorList = fieldOrder.filter((f) => errors[f]);

  if (succeeded) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border-l-4 border-brand bg-brand-tint px-6 py-10 outline-none sm:px-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-paper">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h4 className="type-title mt-6 text-ink">Thank you. Your enquiry has been sent.</h4>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
          Our team will read it carefully and get in touch with you soon on the details you shared.
        </p>
        <button type="button" onClick={() => setDismissed(state)} className="link-cta mt-8 text-ink">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} onBlur={onBlur} onChange={onChange} noValidate className="space-y-7">
      {/* Honeypot (hidden from people, bots tend to fill it) */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Error summary: what to fix, with links straight to each field */}
      <div ref={summaryRef} tabIndex={-1} role="alert" className="outline-none empty:hidden">
        {showSummary && errorList.length > 0 && (
          <div className="border-l-4 border-danger bg-danger-tint px-5 py-5">
            <p className="font-semibold text-danger">
              Please check {errorList.length === 1 ? "1 field" : `${errorList.length} fields`} before sending:
            </p>
            <ul className="mt-3 space-y-1.5">
              {errorList.map((f) => (
                <li key={f}>
                  <a
                    href={`#${f}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(f)?.focus();
                    }}
                    className="text-[0.9375rem] text-ink underline decoration-danger/50 underline-offset-4 hover:decoration-danger"
                  >
                    {fieldLabels[f]}: {errors[f]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {serverMessage && !state.fieldErrors && (
          <p className="border-l-4 border-danger bg-danger-tint px-5 py-4 text-ink">{serverMessage}</p>
        )}
      </div>

      <fieldset className="space-y-7">
        <legend className="type-eyebrow text-muted">About you</legend>
        <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-6">
          <Field label="Your Name" name="name" error={errors.name}>
            <input {...field("name")} type="text" required autoComplete="name" maxLength={limits.name} className={`${cls("name")} h-13`} />
          </Field>
          <Field label="Phone Number" name="phone" error={errors.phone} hint="10-digit mobile number, with or without +91">
            <input {...field("phone", true)} type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91" maxLength={limits.phone} className={`${cls("phone")} h-13`} />
          </Field>
          <Field label="Email" optional name="email" error={errors.email}>
            <input {...field("email")} type="email" autoComplete="email" maxLength={limits.email} className={`${cls("email")} h-13`} />
          </Field>
          <Field label="City / State" name="location" error={errors.location}>
            <input {...field("location")} type="text" required autoComplete="address-level2" placeholder="City, State" maxLength={limits.location} className={`${cls("location")} h-13`} />
          </Field>
        </div>
      </fieldset>

      <div className="border-t border-rule" />
      <fieldset className="space-y-7">
        <legend className="type-eyebrow text-muted">Your enquiry</legend>
        <Field label="Support Needed" name="support" error={errors.support}>
          <div className="relative">
            <select {...field("support")} required defaultValue="" className={`${cls("support")} h-13 appearance-none pr-12`}>
              <option value="" disabled>
                Select an option
              </option>
              {supportOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <svg aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </Field>

        <Field
          label="How Can We Help?"
          name="message"
          error={errors.message}
          hint="Who needs support, their situation, and what would help most."
          aside={
            <span className="tabular-nums" aria-hidden="true">
              {messageLength}/{limits.message}
            </span>
          }
        >
          <textarea {...field("message", true)} required rows={6} maxLength={limits.message} className={`${cls("message")} resize-y py-3.5 leading-relaxed`} />
        </Field>
      </fieldset>

      <div className="border-t border-rule pt-7">
        <label className="flex cursor-pointer items-start gap-3.5 text-[1.0625rem] leading-relaxed text-ink">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            required
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-brand"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree to be contacted about my enquiry.<span aria-hidden="true" className="ml-0.5 text-gold-dark">*</span>
          </span>
        </label>
        {errors.consent && <ErrorText id="consent-error">{errors.consent}</ErrorText>}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={pending} className="btn btn-primary min-w-48 !py-4 text-[1.0625rem] disabled:cursor-wait disabled:opacity-70">
          {pending ? (
            <>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowIcon />
            </>
          )}
        </button>
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          We use your details only to respond to your enquiry. We never sell or share them.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  optional,
  error,
  hint,
  aside,
  children,
}: {
  label: string;
  name: FieldName;
  optional?: boolean;
  error?: string;
  hint?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={name} className="text-[0.96875rem] font-semibold text-ink">
          {label}
          {optional ? (
            <span className="ml-1.5 font-normal text-muted">(optional)</span>
          ) : (
            <span aria-hidden="true" className="ml-0.5 text-gold-dark">*</span>
          )}
        </label>
        {aside && <span className="text-sm text-muted">{aside}</span>}
      </div>
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-[0.9375rem] font-medium text-danger">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5M12 16.5v.01" />
      </svg>
      {children}
    </p>
  );
}
