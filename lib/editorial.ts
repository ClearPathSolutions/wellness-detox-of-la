import { site } from "@/lib/site";

/**
 * Editorial policy — the portfolio-wide page from the editorial policy dev
 * package (Clear Path Treatment Solutions, September 2026).
 *
 * The copy is shared by every site and must not be reworded; only the five
 * merge fields below differ per site. Values mirror this site's row
 * (SITE_ID 12) in the package's facilities.csv — update both together.
 *
 * GOING LIVE: fill `lastReviewed` (YYYY-MM-DD) and `contentSignoff` (a copy of
 * the CSV's CONTENT_SIGNOFF cell) below. Nothing else changes. Until then the
 * policy is withheld from production builds (VERCEL_ENV === "production"): the
 * route 404s, nothing links to it, it is left out of the sitemap, and the
 * Organization schema does not point at it. Local and Vercel preview builds
 * still render it, noindex, so it can be reviewed.
 */
type EditorialFields = {
  facilityName: string;
  domain: string;
  editorialEmail: string;
  phone: string;
  phoneTel: string;
  /** YYYY-MM-DD. Rendered as "Month YYYY" on the page. */
  lastReviewed: string;
  /** Copy of the CSV's CONTENT_SIGNOFF cell. */
  contentSignoff: string;
};

export const editorial: EditorialFields = {
  // Brand name exactly as the footer prints it ("© Wellness Detox of LA").
  facilityName: site.name,
  domain: new URL(site.url).hostname,
  editorialEmail: "info@wellnessdetoxla.com",
  // As shown on the site; the tel: form is derived from site.phoneHref.
  phone: site.phone,
  phoneTel: site.phoneHref.replace(/^tel:/, ""),
  lastReviewed: "2026-10-07",
  contentSignoff: "",
};

// No trailing slash: no route on this site has one, and Next redirects the
// package's /editorial-policy/ form here, so this is the canonical URL.
export const EDITORIAL_POLICY_PATH = "/editorial-policy";
export const EDITORIAL_POLICY_URL = `${site.url}${EDITORIAL_POLICY_PATH}`;
export const CORRECTIONS_ANCHOR = "content-updates-and-corrections";

/** The site's single Organization node (MedicalBusiness, in app/layout.tsx). */
export const ORGANIZATION_ID = `${site.url}/#business`;

export const editorialMissing: string[] = [
  !editorial.editorialEmail && "EDITORIAL_EMAIL",
  !/^\d{4}-\d{2}-\d{2}$/.test(editorial.lastReviewed) && "LAST_REVIEWED",
  !editorial.contentSignoff && "CONTENT_SIGNOFF",
].filter((f): f is string => Boolean(f));

/** Every field filled and signed off: the policy may be public and indexed. */
export const editorialPolicyReady = editorialMissing.length === 0;

/** Whether this build serves the page at all (local and previews do, for review). */
export const editorialPolicyServed =
  editorialPolicyReady || process.env.VERCEL_ENV !== "production";
