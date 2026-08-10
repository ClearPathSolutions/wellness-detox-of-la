"use client";

import { useActionState, useEffect } from "react";
import { submitContact } from "@/app/actions/leads";
import { initialLeadState } from "@/lib/lead-state";
import { trackLeadSubmit } from "@/lib/analytics";
import { Field, FormError, Honeypot, SubmitButton, SuccessPanel, fieldClass } from "./form-ui";

/**
 * Confidential contact form. Submissions go to a Server Action which delivers
 * the lead server-side (see `lib/leads.ts`) — the form only reports success
 * when the lead was actually accepted, and offers the phone number when it
 * wasn't.
 */
export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialLeadState);

  // Report the conversion only once the server actually accepted the lead.
  useEffect(() => {
    if (state.status === "success") trackLeadSubmit("contact");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <SuccessPanel
        title="Thank you for reaching out"
        body="Your message is with our admissions team and we'll be in touch shortly. Prefer to talk now? We're available 24/7."
      />
    );
  }

  const err = state.errors ?? {};
  const val = state.values ?? {};

  return (
    <form
      action={formAction}
      className="relative rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8"
    >
      <Honeypot />
      <FormError message={state.message} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" error={err.name} className="sm:col-span-2">
          {(p) => (
            <input {...p} type="text" autoComplete="name" placeholder="Your name" defaultValue={val.name} />
          )}
        </Field>

        <Field name="phone" label="Phone" error={err.phone}>
          {(p) => (
            <input {...p} type="tel" autoComplete="tel" placeholder="(000) 000-0000" defaultValue={val.phone} />
          )}
        </Field>

        <Field name="email" label="Email" error={err.email}>
          {(p) => (
            <input {...p} type="email" autoComplete="email" placeholder="you@email.com" defaultValue={val.email} />
          )}
        </Field>

        <Field name="who" label="I'm seeking help for" className="sm:col-span-2">
          {(p) => (
            <select {...p} defaultValue={val.who || "Myself"}>
              <option>Myself</option>
              <option>A loved one</option>
              <option>A client / patient</option>
            </select>
          )}
        </Field>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={fieldClass}
            placeholder="Share anything you'd like us to know. This is confidential."
            defaultValue={val.message}
          />
        </div>
      </div>

      <SubmitButton pendingLabel="Sending…">Send Confidential Message</SubmitButton>

      <p className="mt-3 text-xs text-muted">
        By submitting, you agree to be contacted about treatment. Your information is kept strictly
        confidential.
      </p>
    </form>
  );
}
