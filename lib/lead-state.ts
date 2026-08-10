/**
 * Shared shape of the lead-form action results.
 *
 * This lives outside `app/actions/leads.ts` on purpose: a `"use server"` module
 * may only export async functions. A plain `const` exported from one gets
 * compiled into a server-reference *function* instead of the value, which would
 * silently hand `useActionState` a function as its initial state.
 */
export type LeadState = {
  status: "idle" | "success" | "error";
  /** Form-level message, shown in an aria-live region. */
  message?: string;
  /** Per-field validation messages, keyed by input name. */
  errors?: Record<string, string>;
  /**
   * The values the visitor submitted, echoed back on failure only. React 19
   * resets uncontrolled inputs once a form action settles, so the fields are
   * repopulated from here — nobody should have to retype a form because one
   * field was wrong.
   */
  values?: Record<string, string>;
};

export const initialLeadState: LeadState = { status: "idle" };
