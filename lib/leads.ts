/**
 * Server-side lead delivery.
 *
 * Leads are POSTed as JSON to `LEAD_WEBHOOK_URL`. Because the insurance form
 * collects PHI (name, date of birth, insurance member ID), that endpoint MUST
 * be covered by a Business Associate Agreement — a HIPAA-compliant form/CRM
 * endpoint, not a generic inbox or a marketing automation webhook.
 *
 *   LEAD_WEBHOOK_URL     (required in production) — https endpoint under a BAA
 *   LEAD_WEBHOOK_TOKEN   (optional) — sent as `Authorization: Bearer <token>`
 *
 * If the webhook is not configured, delivery FAILS LOUDLY in production so the
 * form can tell the visitor to call instead. It never reports a success it did
 * not achieve — a silently dropped lead is worse than a visible error.
 */

export type LeadKind = "contact" | "insurance";

export type LeadPayload = {
  kind: LeadKind;
  submittedAt: string;
  fields: Record<string, string>;
};

/** Field names that may carry PHI and must never reach application logs. */
const SENSITIVE = new Set([
  "name",
  "phone",
  "email",
  "dob",
  "memberId",
  "provider",
  "planType",
  "message",
  "who",
]);

/** Log-safe view of a lead: field names and whether they were filled, never values. */
function redact(payload: LeadPayload) {
  return {
    kind: payload.kind,
    submittedAt: payload.submittedAt,
    fields: Object.fromEntries(
      Object.entries(payload.fields).map(([k, v]) => [
        k,
        SENSITIVE.has(k) ? (v ? "[redacted]" : "[empty]") : v,
      ])
    ),
  };
}

export async function deliverLead(payload: LeadPayload): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;

  if (!url) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[leads] LEAD_WEBHOOK_URL is not configured — lead was NOT delivered",
        redact(payload)
      );
      return false;
    }
    // Development convenience only: let the flow be exercised without a backend.
    console.info("[leads] no LEAD_WEBHOOK_URL; accepted in dev only", redact(payload));
    return true;
  }

  const token = process.env.LEAD_WEBHOOK_TOKEN;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error(`[leads] webhook responded ${res.status}`, redact(payload));
      return false;
    }
    return true;
  } catch (err) {
    console.error(
      `[leads] webhook request failed: ${err instanceof Error ? err.message : "unknown error"}`,
      redact(payload)
    );
    return false;
  }
}
