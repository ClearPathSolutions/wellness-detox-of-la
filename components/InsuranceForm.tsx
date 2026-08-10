"use client";

import { useActionState, useEffect } from "react";
import { submitInsurance } from "@/app/actions/leads";
import { initialLeadState } from "@/lib/lead-state";
import { trackLeadSubmit } from "@/lib/analytics";
import { ShieldIcon } from "./ui";
import { Field, FormError, Honeypot, SubmitButton, SuccessPanel, fieldClass } from "./form-ui";

/**
 * Confidential insurance-verification form.
 *
 * NOTE: these fields are PHI (name, date of birth, insurance member ID). The
 * Server Action delivers them to `LEAD_WEBHOOK_URL`, which must be an endpoint
 * covered by a Business Associate Agreement. See `lib/leads.ts`.
 */
export function InsuranceForm() {
  const [state, formAction] = useActionState(submitInsurance, initialLeadState);

  // Report the conversion only once the server actually accepted the lead.
  useEffect(() => {
    if (state.status === "success") trackLeadSubmit("insurance");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <SuccessPanel
        title="Your request has been received"
        body="We'll verify your benefits confidentially and get back to you quickly. Prefer to verify by phone right now? Our team is available 24/7."
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

      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-rose-dark">
        <ShieldIcon width={18} height={18} />
        100% private &amp; protected
      </div>

      <FormError message={state.message} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" error={err.name}>
          {(p) => (
            <input {...p} type="text" autoComplete="name" placeholder="Your name" defaultValue={val.name} />
          )}
        </Field>

        <Field name="dob" label="Date of birth">
          {(p) => (
            <input {...p} type="text" inputMode="numeric" placeholder="MM / DD / YYYY" defaultValue={val.dob} />
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

        <Field name="provider" label="Insurance provider" error={err.provider}>
          {(p) => (
            <input {...p} type="text" placeholder="e.g. Aetna, Cigna, Blue Cross" defaultValue={val.provider} />
          )}
        </Field>

        <Field name="memberId" label="Member / Policy ID">
          {(p) => <input {...p} type="text" placeholder="Optional" defaultValue={val.memberId} />}
        </Field>

        <Field name="planType" label="Plan type">
          {(p) => (
            <select {...p} defaultValue={val.planType || "PPO"}>
              <option>PPO</option>
              <option>HMO</option>
              <option>EPO</option>
              <option>POS</option>
              <option>Not sure</option>
            </select>
          )}
        </Field>

        <Field name="who" label="Seeking help for">
          {(p) => (
            <select {...p} defaultValue={val.who || "Myself"}>
              <option>Myself</option>
              <option>A loved one</option>
            </select>
          )}
        </Field>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            Anything else we should know? (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className={fieldClass}
            placeholder="Share anything you'd like us to know. This is confidential."
            defaultValue={val.message}
          />
        </div>
      </div>

      <SubmitButton pendingLabel="Submitting…">Verify My Benefits</SubmitButton>

      <p className="mt-3 text-xs text-muted">
        Submitting does not obligate you to treatment. Your information is kept strictly confidential
        and used only to verify your coverage.
      </p>
    </form>
  );
}
