/**
 * Shared Clarion Labs form-capture typing + form keys.
 *
 * The forms-capture.v1.js script (loaded site-wide in the root layout) exposes
 * window.ClarionForms. We submit through it manually rather than using the
 * data-clarion-form auto-capture, which does not preventDefault and would reload
 * the page on submit.
 */
declare global {
  interface Window {
    ClarionForms?: {
      submit: (opts: {
        form_key?: string;
        data?: Record<string, unknown>;
      }) => Promise<Response>;
    };
  }
}

// Must match the form keys configured in the Clarion dashboard.
export const CLARION_FORM_KEY = {
  verify: "insurance_verification",
  contact: "contact",
} as const;

export {};
