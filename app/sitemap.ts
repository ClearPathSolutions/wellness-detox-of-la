import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { treatmentSlugs } from "@/lib/data/treatment";
import { admissionsSlugs } from "@/lib/data/admissions";
import { areaSlugs } from "@/lib/data/areas";
import { blogPosts, postSlugs } from "@/lib/data/blog";
import { editorialPolicyReady, EDITORIAL_POLICY_PATH } from "@/lib/editorial";

/**
 * Last-modified dates.
 *
 * Previously every URL was stamped with `new Date()` at build time, so each
 * deploy told crawlers all 44 pages had changed — which devalues the signal and
 * also destroys the production-vs-build diff that cutover checks depend on.
 *
 * Blog posts carry a real publication date, so they use it. Everything else uses
 * a single constant that is **stable across deploys** and should be bumped by
 * hand when that content is actually revised.
 */
const CONTENT_REVISED = "2026-08-10";

export default function sitemap(): MetadataRoute.Sitemap {
  const postDates = new Map(blogPosts.map((p) => [`/${p.slug}`, p.date]));

  const core = [
    "",
    "/about",
    "/about/our-story",
    "/about/meet-the-team",
    "/about/areas-we-serve",
    "/treatment",
    "/tour",
    "/admissions",
    "/admissions/verify-your-insurance",
    "/contact",
    "/blog",
  ];
  const treatment = treatmentSlugs.map((s) => `/treatment/${s}`);
  const admissions = admissionsSlugs.map((s) => `/admissions/${s}`);
  const areas = areaSlugs.map((s) => `/about/areas-we-serve/${s}`);
  const posts = postSlugs.map((s) => `/${s}`);

  // Listed only once the policy is signed off and indexable (lib/editorial.ts).
  const editorialPolicy = editorialPolicyReady ? [EDITORIAL_POLICY_PATH] : [];

  const all = [...core, ...treatment, ...admissions, ...areas, ...posts, ...editorialPolicy];

  return all.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: postDates.get(path) ?? CONTENT_REVISED,
    changeFrequency: "monthly",
    priority:
      path === ""
        ? 1
        : path === "/admissions/verify-your-insurance"
          ? 0.9 // primary conversion page
          : path.startsWith("/treatment/") || path === "/treatment"
            ? 0.8
            : 0.7,
  }));
}
