"use server";

import { deliverLead, type LeadKind } from "@/lib/leads";
import type { LeadState } from "@/lib/lead-state";

/**
 * Server Actions behind the contact and insurance forms.
 *
 * Every submission is validated server-side — the client-side checks are a
 * convenience, not a boundary, since the action is a public POST endpoint.
 *
 * This module exports ONLY async functions. `LeadState` / `initialLeadState`
 * live in `lib/lead-state.ts` because a `"use server"` file compiles every
 * export into a server reference.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 2000;

function str(data: FormData, key: string): string {
  const v = data.get(key);
  return typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "";
}

/** Digits-only length check — tolerant of (000) 000-0000, +1 …, dots, spaces. */
function phoneLooksValid(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

const CONTACT_FAILURE =
  "We couldn't send your message just now. Please call us — our admissions team is available 24/7.";
const INSURANCE_FAILURE =
  "We couldn't submit your verification request just now. Please call us — we can verify your benefits over the phone in a few minutes.";

/** Shared validation for the fields both forms have in common. */
function validateShared(data: FormData) {
  const errors: Record<string, string> = {};
  const name = str(data, "name");
  const phone = str(data, "phone");
  const email = str(data, "email");

  if (!name) errors.name = "Please enter your name.";
  if (!phone && !email) errors.phone = "Add a phone or email so we can reach you.";
  if (phone && !phoneLooksValid(phone)) errors.phone = "Enter a valid phone number.";
  if (email && !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  return { errors, name, phone, email };
}

async function submit(
  kind: LeadKind,
  fields: Record<string, string>,
  failureMessage: string
): Promise<LeadState> {
  const ok = await deliverLead({
    kind,
    submittedAt: new Date().toISOString(),
    fields,
  });

  return ok
    ? { status: "success" }
    : { status: "error", message: failureMessage, values: fields };
}

export async function submitContact(
  _prev: LeadState,
  data: FormData
): Promise<LeadState> {
  // Honeypot: bots fill hidden fields. Report success without delivering.
  if (str(data, "company")) return { status: "success" };

  const { errors, name, phone, email } = validateShared(data);
  const fields = {
    name,
    phone,
    email,
    who: str(data, "who"),
    message: str(data, "message"),
  };

  if (Object.keys(errors).length) {
    return {
      status: "error",
      errors,
      message: "Please correct the highlighted fields.",
      values: fields,
    };
  }

  return submit("contact", fields, CONTACT_FAILURE);
}

export async function submitInsurance(
  _prev: LeadState,
  data: FormData
): Promise<LeadState> {
  if (str(data, "company")) return { status: "success" };

  const { errors, name, phone, email } = validateShared(data);
  const provider = str(data, "provider");
  if (!provider) errors.provider = "Please enter your insurance provider.";

  const fields = {
    name,
    phone,
    email,
    dob: str(data, "dob"),
    provider,
    memberId: str(data, "memberId"),
    planType: str(data, "planType"),
    who: str(data, "who"),
    message: str(data, "message"),
  };

  if (Object.keys(errors).length) {
    return {
      status: "error",
      errors,
      message: "Please correct the highlighted fields.",
      values: fields,
    };
  }

  return submit("insurance", fields, INSURANCE_FAILURE);
}
