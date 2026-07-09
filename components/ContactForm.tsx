"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { CheckIcon, PhoneIcon } from "./ui";

/**
 * Confidential contact form. Out of the box it hands off to the visitor's mail
 * client (no backend secrets required, works immediately on Vercel). To capture
 * submissions server-side instead, replace the `handleSubmit` body with a POST
 * to a form endpoint (Formspree, Resend, or a Next.js route handler / server action).
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    const next: Record<string, string> = {};
    if (!name) next.name = "Please enter your name.";
    if (!phone && !email) next.phone = "Add a phone or email so we can reach you.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const body = [
      `Name: ${name}`,
      `Phone: ${phone || "—"}`,
      `Email: ${email || "—"}`,
      `Seeking help for: ${data.get("who") || "—"}`,
      "",
      message || "",
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Website inquiry from ${name}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-card">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft text-rose-dark">
          <CheckIcon width={26} height={26} />
        </span>
        <h3 className="text-xl text-ink">Thank you for reaching out</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Your message is ready to send from your email app. Prefer to talk now? Our admissions team
          is available 24/7.
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

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Full name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" className={field} placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-rose-dark">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="(000) 000-0000" />
          {errors.phone && <p className="mt-1 text-xs text-rose-dark">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@email.com" />
          {errors.email && <p className="mt-1 text-xs text-rose-dark">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="who" className="mb-1.5 block text-sm font-medium text-ink">
            I&apos;m seeking help for
          </label>
          <select id="who" name="who" className={field} defaultValue="Myself">
            <option>Myself</option>
            <option>A loved one</option>
            <option>A client / patient</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={field}
            placeholder="Share anything you'd like us to know. This is confidential."
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-3.5 font-display text-sm font-semibold text-white shadow-card transition-all hover:bg-rose-dark sm:w-auto"
      >
        Send Confidential Message
      </button>
      <p className="mt-3 text-xs text-muted">
        By submitting, you agree to be contacted about treatment. Your information is kept strictly
        confidential.
      </p>
    </form>
  );
}
