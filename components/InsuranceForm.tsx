"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";
import { CLARION_FORM_KEY } from "@/lib/clarion";
import { CheckIcon, PhoneIcon, ShieldIcon } from "./ui";

/**
 * Confidential insurance-verification form.
 *
 * Submissions are captured by Clarion Labs (window.ClarionForms.submit) — the
 * forms-capture script is loaded site-wide in the root layout. We handle submit
 * manually (NOT the data-clarion-form auto-capture) because auto-capture does not
 * preventDefault, which would trigger a native submit and reload the page with the
 * fields in the URL. A mailto handoff remains as a best-effort fallback so the lead
 * is never lost if Clarion hasn't loaded.
 */
type Status = "idle" | "submitting" | "success" | "error";

export function InsuranceForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inFlight = useRef(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return; // synchronous guard against double-click double-POST
    inFlight.current = true;
    setStatus("submitting");

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const get = (k: string) => (raw[k] ?? "").toString().trim();
    const name = get("name");
    const phone = get("phone");
    const email = get("email");
    const dob = get("dob");
    const provider = get("provider");

    // We own validation (form has noValidate).
    const next: Record<string, string> = {};
    if (!name) next.name = "Please enter your full name.";
    if (!phone) next.phone = "Please enter a phone number.";
    if (!dob) next.dob = "Please enter your date of birth.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!provider) next.provider = "Please enter your insurance provider.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("idle");
      inFlight.current = false;
      return;
    }

    try {
      // Primary: capture to Clarion (best-effort — never blocks the success UI).
      try {
        await window.ClarionForms?.submit({
          form_key: CLARION_FORM_KEY.verify,
          data: { ...raw, intent: "verify" },
        });
      } catch {
        // swallow — fallback below still fires
      }

      // Fallback: hand off to the visitor's mail client so no lead is lost.
      const body = [
        `Name: ${name}`,
        `Date of birth: ${dob || "—"}`,
        `Phone: ${phone || "—"}`,
        `Email: ${email || "—"}`,
        `Insurance provider: ${provider}`,
        `Member ID: ${get("memberId") || "—"}`,
        "",
        get("message"),
      ].join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Insurance verification request — ${name}`
      )}&body=${encodeURIComponent(body)}`;

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-card">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft text-rose-dark">
          <CheckIcon width={26} height={26} />
        </span>
        <h3 className="text-xl text-ink">Thank you — we&apos;ve got your details</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Our team will verify your benefits confidentially and get back to you — usually the same
          day. Prefer to verify by phone right now? We&apos;re available 24/7.
        </p>
        <a
          href={site.phoneHref}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 font-display text-sm font-semibold text-white shadow-card"
        >
          <PhoneIcon width={17} height={17} />
          Call {site.phone}
        </a>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-rose focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose/30";
  const label = "mb-1.5 block text-sm font-medium text-ink";
  const req = <span className="text-rose-dark">*</span>;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-rose-dark">
        <ShieldIcon width={18} height={18} />
        100% private &amp; protected
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Full name {req}</label>
          <input id="name" name="name" type="text" autoComplete="name" className={field} placeholder="Jane Doe" />
          {errors.name && <p className="mt-1 text-xs text-rose-dark">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone {req}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="(555) 123-4567" />
          {errors.phone && <p className="mt-1 text-xs text-rose-dark">{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@email.com" />
          {errors.email && <p className="mt-1 text-xs text-rose-dark">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="dob" className={label}>Date of birth {req}</label>
          <input id="dob" name="dob" type="date" autoComplete="bday" className={field} placeholder="mm/dd/yyyy" />
          {errors.dob && <p className="mt-1 text-xs text-rose-dark">{errors.dob}</p>}
        </div>
        <div>
          <label htmlFor="memberId" className={label}>Member ID</label>
          <input id="memberId" name="memberId" type="text" className={field} placeholder="Optional" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="provider" className={label}>Insurance provider {req}</label>
          <input
            id="provider"
            name="provider"
            type="text"
            list="insurance-providers"
            className={field}
            placeholder="Start typing, e.g. Aetna, Cigna, Horizon"
          />
          <datalist id="insurance-providers">
            <option value="Aetna" />
            <option value="Anthem" />
            <option value="Blue Cross Blue Shield" />
            <option value="Cigna" />
            <option value="Horizon" />
            <option value="Humana" />
            <option value="Kaiser Permanente" />
            <option value="Magellan" />
            <option value="Optum" />
            <option value="TRICARE" />
            <option value="UnitedHealthcare" />
          </datalist>
          {errors.provider && <p className="mt-1 text-xs text-rose-dark">{errors.provider}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>Anything else we should know?</label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className={field}
            placeholder="Share as much or as little as you'd like — this is completely confidential."
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-3.5 font-display text-sm font-semibold text-white shadow-card transition-all hover:bg-rose-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Verify my benefits"}
        {status !== "submitting" && <span aria-hidden>&rarr;</span>}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm text-rose-dark">
          Something went wrong. Please try again or call{" "}
          <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a>.
        </p>
      )}
      <p className="mt-3 text-xs text-muted">
        Your information is 100% confidential and used only to verify your coverage. Prefer to talk
        now? Call{" "}
        <a href={site.phoneHref} className="font-semibold text-rose-dark underline">{site.phone}</a>.
      </p>
    </form>
  );
}
