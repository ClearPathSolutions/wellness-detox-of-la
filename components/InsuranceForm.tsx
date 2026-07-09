"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { CheckIcon, PhoneIcon, ShieldIcon } from "./ui";

/**
 * Confidential insurance-verification form. Fields mirror the information the
 * admissions team collects (name, DOB, insurance provider, member ID, plan type).
 * Works out of the box via a mailto handoff — swap `handleSubmit` for a POST to a
 * HIPAA-compliant form endpoint when one is available.
 */
export function InsuranceForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => (data.get(k) as string)?.trim() ?? "";
    const name = get("name");
    const phone = get("phone");
    const email = get("email");
    const provider = get("provider");

    const next: Record<string, string> = {};
    if (!name) next.name = "Please enter your name.";
    if (!phone && !email) next.phone = "Add a phone or email so we can reach you.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!provider) next.provider = "Please enter your insurance provider.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const body = [
      `Name: ${name}`,
      `Date of birth: ${get("dob") || "—"}`,
      `Phone: ${phone || "—"}`,
      `Email: ${email || "—"}`,
      `Insurance provider: ${provider}`,
      `Member / Policy ID: ${get("memberId") || "—"}`,
      `Plan type: ${get("planType") || "—"}`,
      `Seeking help for: ${get("who") || "—"}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Insurance verification request — ${name}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-card">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft text-rose-dark">
          <CheckIcon width={26} height={26} />
        </span>
        <h3 className="text-xl text-ink">Your request is ready to send</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          We&apos;ll verify your benefits confidentially and get back to you quickly. Prefer to
          verify by phone right now? Our team is available 24/7.
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

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-rose-dark">
        <ShieldIcon width={18} height={18} />
        100% private &amp; protected
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Full name</label>
          <input id="name" name="name" type="text" autoComplete="name" className={field} placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-rose-dark">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="dob" className={label}>Date of birth</label>
          <input id="dob" name="dob" type="text" inputMode="numeric" className={field} placeholder="MM / DD / YYYY" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="(000) 000-0000" />
          {errors.phone && <p className="mt-1 text-xs text-rose-dark">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@email.com" />
          {errors.email && <p className="mt-1 text-xs text-rose-dark">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="provider" className={label}>Insurance provider</label>
          <input id="provider" name="provider" type="text" className={field} placeholder="e.g. Aetna, Cigna, Blue Cross" />
          {errors.provider && <p className="mt-1 text-xs text-rose-dark">{errors.provider}</p>}
        </div>
        <div>
          <label htmlFor="memberId" className={label}>Member / Policy ID</label>
          <input id="memberId" name="memberId" type="text" className={field} placeholder="Optional" />
        </div>
        <div>
          <label htmlFor="planType" className={label}>Plan type</label>
          <select id="planType" name="planType" className={field} defaultValue="PPO">
            <option>PPO</option>
            <option>HMO</option>
            <option>EPO</option>
            <option>POS</option>
            <option>Not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="who" className={label}>Seeking help for</label>
          <select id="who" name="who" className={field} defaultValue="Myself">
            <option>Myself</option>
            <option>A loved one</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>Anything else we should know? (optional)</label>
          <textarea id="message" name="message" rows={3} className={field} placeholder="Share anything you'd like us to know. This is confidential." />
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-3.5 font-display text-sm font-semibold text-white shadow-card transition-all hover:bg-rose-dark sm:w-auto"
      >
        Verify My Benefits
      </button>
      <p className="mt-3 text-xs text-muted">
        Submitting does not obligate you to treatment. Your information is kept strictly confidential
        and used only to verify your coverage.
      </p>
    </form>
  );
}
