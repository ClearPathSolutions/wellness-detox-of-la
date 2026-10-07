import { readFileSync } from "node:fs";
import path from "node:path";
import { editorial, editorialPolicyReady } from "@/lib/editorial";

/** "2026-09-30" -> "September 2026". */
function monthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The policy body, read at build time from data/editorial-policy.html — an
 * unedited copy of the package's templates/editorial-policy.html. When the
 * master copy changes, replace that file wholesale; never hand-edit it.
 * Unfilled fields show as "[FIELD not yet set]" in a preview so they are
 * impossible to miss. Server-only (reads the filesystem).
 */
export function editorialPolicyBody(): string {
  const file = path.join(process.cwd(), "data/editorial-policy.html");
  const fields: Record<string, string> = {
    FACILITY_NAME: editorial.facilityName,
    DOMAIN: editorial.domain,
    EDITORIAL_EMAIL: editorial.editorialEmail,
    PHONE: editorial.phone,
    PHONE_TEL: editorial.phoneTel,
    LAST_REVIEWED: editorial.lastReviewed && monthYear(editorial.lastReviewed),
  };

  const html = readFileSync(file, "utf8")
    // Header comment is dev notes, not page content.
    .replace(/<!--[\s\S]*?-->/g, "")
    // PageHero renders the page's single H1.
    .replace(/<h1>[\s\S]*?<\/h1>/, "")
    // The package allows adjusting this href to the site's About URL.
    .replace(/href=(["'])\/about\/\1/g, "href=$1/about$1")
    .replace(/\{\{([A-Z_]+)\}\}/g, (token, name: string) => {
      if (fields[name]) return escapeHtml(fields[name]);
      // Once ready, keep the token so the check below fails the build. Before
      // that (preview/local only, noindex), flag the gap visibly without
      // leaving a raw "{{" on the page.
      return editorialPolicyReady ? token : `[${name} not yet set]`;
    })
    .trim();

  if (editorialPolicyReady && html.includes("{{")) {
    // Package rule: "Any hit blocks launch." Fail the build rather than ship it.
    throw new Error(
      `Editorial policy still contains a placeholder: ${html.match(/\{\{[^}]*\}\}/)?.[0]}`,
    );
  }

  return html;
}
