import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { Crumb } from "@/components/ui";

/* ------------------------------ Breadcrumbs ------------------------------ */

/**
 * Section landing pages, keyed by the breadcrumb label the content files
 * already use. Content pages store their trail as a flat `"Parent / Leaf"`
 * string; this resolves the parent half to a real URL so the middle level
 * becomes a link instead of dead text.
 */
const CRUMB_PARENTS: Record<string, string> = {
  Treatment: "/treatment",
  Admissions: "/admissions",
  "Areas We Serve": "/about/areas-we-serve",
  About: "/about",
};

/**
 * Turns `"Treatment / Detox"` into a linked trail:
 * Home → Treatment → Detox.
 *
 * Unknown parents degrade to plain text rather than guessing a URL, so a new
 * section added to the content files cannot silently emit a 404 link.
 */
export function crumbsFrom(crumb?: string): Crumb[] {
  const trail: Crumb[] = [{ label: "Home", href: "/" }];
  if (!crumb) return trail;

  const parts = crumb.split("/").map((s) => s.trim()).filter(Boolean);
  parts.forEach((label, i) => {
    const isLast = i === parts.length - 1;
    const href = isLast ? undefined : CRUMB_PARENTS[label];
    trail.push(href ? { label, href } : { label });
  });
  return trail;
}

/**
 * BreadcrumbList JSON-LD for the same trail. Driven off the identical array the
 * visible breadcrumb renders, so the two cannot disagree.
 *
 * `item` is omitted on the final entry per Google's guidance — the current page
 * needs no URL.
 */
export function breadcrumbLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href && i < items.length - 1 ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
}

/**
 * Per-page canonical + Open Graph metadata.
 *
 * Why a helper rather than inline objects:
 *
 * Next.js merges metadata **shallowly** — a nested field like `openGraph` defined
 * in a page *overwrites* the parent layout's entirely, it does not deep-merge
 * (see `generate-metadata.md` → "Merging"). Two bugs followed from that:
 *
 *   1. Pages that set no `openGraph` inherited the root layout's wholesale,
 *      including its `url`, so 36 of 44 pages declared themselves the homepage.
 *   2. Pages that *did* set `openGraph` (the blog posts) silently dropped
 *      `siteName` and `locale`, because naming the key replaced the whole object.
 *
 * So the fix cannot be "add `url` per page" — it has to emit a *complete*
 * `openGraph` object every time. This helper is the single place that happens,
 * which also keeps `canonical` and `og:url` from drifting apart.
 *
 * Note the root layout deliberately no longer sets `openGraph.url`: if a future
 * page forgets to call this, `og:url` is simply absent (neutral) rather than
 * pointing at the wrong page (actively harmful).
 */

const DEFAULT_OG_IMAGE = {
  url: "/images/DSC_6218-HDR.webp",
  width: 1600,
  height: 1067,
  alt: site.name,
};

type OgImage = { url: string; width?: number; height?: number; alt?: string };

export type PageMetaOptions = {
  /** Canonical path, root-relative and without a trailing slash, e.g. `/about`. */
  path: string;
  /** `og:title`. Defaults to the site title. */
  title?: string;
  /** `og:description`. Defaults to the site description. */
  description?: string;
  /** Defaults to the exterior shot used site-wide. */
  image?: OgImage;
  type?: "website" | "article";
  /** ISO date — only meaningful when `type` is `"article"`. */
  publishedTime?: string;
};

/**
 * Returns the `alternates` + `openGraph` half of a page's metadata. Spread it
 * alongside `title` and `description`:
 *
 *   export const metadata: Metadata = {
 *     title: "About Us",
 *     description: "...",
 *     ...pageMeta({ path: "/about", title: "About Us", description: "..." }),
 *   }
 */
export function pageMeta({
  path,
  title,
  description,
  image,
  type = "website",
  publishedTime,
}: PageMetaOptions): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_US",
      siteName: site.name,
      url: path,
      title: title ?? `${site.name} | Drug & Alcohol Detox & Rehab in Los Angeles`,
      description: description ?? site.description,
      images: [image ?? DEFAULT_OG_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
    },
  };
}
