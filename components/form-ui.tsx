"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { CheckIcon, PhoneIcon } from "./ui";

/** Shared field chrome for the contact + insurance forms. */
export const fieldClass =
  "w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-sm text-ink placeholder:text-ink-500 focus:border-rose focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose/30 disabled:opacity-60";

export const labelClass = "mb-1.5 block text-sm font-medium text-ink";

export const errorClass =
  "w-full rounded-xl border border-rose-dark bg-cream/50 px-4 py-3 text-sm text-ink placeholder:text-ink-500 focus:border-rose focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose/30 disabled:opacity-60";

/** Field wrapper that wires label → input → error message for screen readers. */
export function Field({
  name,
  label,
  error,
  children,
  className = "",
}: {
  name: string;
  label: string;
  error?: string;
  children: (props: {
    id: string;
    name: string;
    className: string;
    "aria-invalid"?: true;
    "aria-describedby"?: string;
  }) => ReactNode;
  className?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {children({
        id: name,
        name,
        className: error ? errorClass : fieldClass,
        ...(error ? { "aria-invalid": true as const, "aria-describedby": errorId } : {}),
      })}
      {error && (
        <p id={errorId} className="mt-1 text-xs font-medium text-rose-dark">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Hidden field that only automated submitters fill in. Positioned off-screen
 * rather than `display:none` so naive bots still see it, and marked
 * aria-hidden + tabIndex -1 so humans and screen readers never reach it.
 */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="company">Company</label>
      <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function SubmitButton({
  children,
  pendingLabel,
}: {
  children: ReactNode;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-3.5 font-display text-sm font-semibold text-white shadow-card transition-all hover:bg-rose-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
        />
      )}
      {pending ? pendingLabel : children}
    </button>
  );
}

/** Form-level error banner. Announced politely so it doesn't interrupt typing. */
export function FormError({ message }: { message?: string }) {
  return (
    <div aria-live="polite" className="empty:hidden">
      {message && (
        <div className="mb-5 rounded-xl border border-rose-dark bg-rose-soft px-4 py-3 text-sm text-ink">
          <p className="font-semibold text-rose-dark">{message}</p>
          <a
            href={site.phoneHref}
            // Distinct label: calls from here mean the lead pipeline rejected a
            // submission. A spike in this event is an outage signal, not a win.
            data-call-location="form-delivery-failure"
            className="mt-1 inline-flex items-center gap-1.5 font-display font-semibold text-rose-dark underline"
          >
            <PhoneIcon width={15} height={15} />
            Call {site.phone}
          </a>
        </div>
      )}
    </div>
  );
}

/** Replaces the form once a lead has actually been delivered. */
export function SuccessPanel({ title, body }: { title: string; body: string }) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-line bg-white p-8 text-center shadow-card"
    >
      <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft text-rose-dark">
        <CheckIcon width={26} height={26} />
      </span>
      <h3 className="text-xl text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{body}</p>
      <a
        href={site.phoneHref}
        data-call-location="form-success-panel"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 font-display text-sm font-semibold text-white shadow-card"
      >
        <PhoneIcon width={17} height={17} />
        Call {site.phone}
      </a>
    </div>
  );
}
