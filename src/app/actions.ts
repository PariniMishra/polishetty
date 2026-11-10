"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { readEnquiry, validateEnquiry, type FieldName } from "@/lib/enquiry";

export type { FieldName };

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<FieldName, string>>;
};

// Best-effort, per-instance rate limit (serverless instances don't share memory).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: FormDataEntryValue | null, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (str(formData.get("website"), 200)) {
    return { status: "success" };
  }

  // Same rules the form checks in the browser (src/lib/enquiry.ts); the server stays authoritative.
  const data = readEnquiry(formData);
  const fieldErrors = validateEnquiry(data);

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Too many enquiries from this connection. Please try again in a few minutes.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.FROM_EMAIL || `${site.name} <onboarding@resend.dev>`;

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "Not provided"],
    ["City / State", data.location],
    ["Support needed", data.support],
    ["Message", data.message],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("\n[Enquiry — email not configured, logging instead]\n" + text + "\n");
      return { status: "success" };
    }
    console.error("Contact form is not configured: set RESEND_API_KEY and CONTACT_EMAIL.");
    return {
      status: "error",
      message: "Sorry, we couldn't send your enquiry right now. Please try again later.",
    };
  }

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0e1311;max-width:600px">
      <h2 style="margin:0 0 16px;border-left:4px solid #ff6b1a;padding-left:12px">New enquiry: ${escapeHtml(data.support)}</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="vertical-align:top;font-weight:bold;width:140px;border-bottom:1px solid #eee">${k}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="color:#777;font-size:12px;margin-top:16px">Sent from the ${site.name} website contact form. The sender agreed to be contacted about this enquiry.</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: data.email || undefined,
        subject: `New enquiry (${data.support}) from ${data.name}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      throw new Error("send failed");
    }
  } catch {
    return {
      status: "error",
      message: "Sorry, we couldn't send your enquiry right now. Please try again later.",
    };
  }

  return { status: "success" };
}
