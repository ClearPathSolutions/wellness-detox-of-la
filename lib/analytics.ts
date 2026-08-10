/**
 * Analytics event helpers.
 *
 * `gtag` only exists on the page once the visitor has granted consent (see
 * `components/Analytics.tsx`), so every call here is a no-op until then — there
 * is no separate consent check to keep in sync.
 */

type Gtag = (command: string, ...args: unknown[]) => void;

export const CONSENT_STORAGE_KEY = "wdla-analytics-consent";

/** A stored decision. */
export type ConsentValue = "granted" | "denied";

/**
 * What the UI sees. `pending` is the server/hydration value — before the store
 * has been read there is no decision to act on, so nothing renders. `none`
 * means we read storage and the visitor hasn't chosen yet (show the banner).
 */
export type ConsentState = ConsentValue | "none" | "pending";

/* ------------------------------------------------------------------------- */
/* Consent as an external store.                                             */
/*                                                                           */
/* Read through `useSyncExternalStore` rather than an effect: localStorage is  */
/* exactly the "external system" that hook exists for, it keeps the server and */
/* hydration renders consistent, and subscribing to `storage` means a decision */
/* made in one tab takes effect in the others.                                */
/* ------------------------------------------------------------------------- */

const listeners = new Set<() => void>();

export function subscribeToConsent(onChange: () => void): () => void {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getConsentSnapshot(): ConsentState {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : "none";
  } catch {
    // Storage blocked (private mode, embedded webview) — treat as undecided.
    return "none";
  }
}

export function getConsentServerSnapshot(): ConsentState {
  return "pending";
}

export function setConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Non-persistent consent is still consent for this session.
  }
  for (const listener of listeners) listener();
}

function gtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: Gtag }).gtag;
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  gtag()?.("event", name, params);
}

/** A visitor tapped a phone number — the primary conversion for the business. */
export function trackPhoneClick(location: string) {
  trackEvent("phone_call_click", { event_category: "conversion", event_label: location });
}

export function trackEmailClick(location: string) {
  trackEvent("email_click", { event_category: "engagement", event_label: location });
}

/** A lead form was accepted server-side (not merely submitted). */
export function trackLeadSubmit(kind: "contact" | "insurance") {
  trackEvent("generate_lead", { event_category: "conversion", event_label: kind });
}
