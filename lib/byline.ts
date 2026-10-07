import type { BlogPost } from "@/lib/data/blog";
import { facilityTeam, regionalTeam } from "@/lib/data/team";
import { site } from "@/lib/site";

/** Someone a post can credit: always a team member with a bio page. */
export type BylinePerson = {
  name: string;
  credentials: string | null;
  bioPath: string;
  /** Schema @id for this person. */
  personId: string;
};

export type Byline = {
  author: BylinePerson | null;
  /** Set only when the post has both a reviewer and a review date. */
  reviewer: BylinePerson | null;
  lastReviewed: string | null;
  modified: string;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function getPerson(slug: string, post: string): BylinePerson {
  const m = [...facilityTeam, ...regionalTeam].find((x) => x.slug === slug);
  // Fail the build: a byline naming someone without a bio page is exactly what
  // the editorial policy promises never to publish. Bio pages exist only for
  // members with approved bio copy (app/about/meet-the-team/[slug]).
  if (!m?.bio?.length) {
    throw new Error(`${post}: byline references "${slug}", who has no team bio page`);
  }
  const bioPath = `/about/meet-the-team/${m.slug}`;
  return {
    name: m.name,
    credentials: m.credentials ?? null,
    bioPath,
    personId: `${site.url}${bioPath}#person`,
  };
}

/**
 * Resolves a post's editorial fields. No defaults: a missing author means no
 * "Written by" line, and a reviewer without a review date is dropped.
 */
export function getByline(post: BlogPost): Byline {
  if (post.lastReviewed && !ISO_DATE.test(post.lastReviewed)) {
    throw new Error(`${post.slug}: lastReviewed must be YYYY-MM-DD, got "${post.lastReviewed}"`);
  }
  const lastReviewed = post.lastReviewed || null;
  // Resolved even when undated, so a typo'd slug still fails the build.
  const reviewer = post.reviewedBy ? getPerson(post.reviewedBy, post.slug) : null;
  return {
    author: post.writtenBy ? getPerson(post.writtenBy, post.slug) : null,
    reviewer: lastReviewed ? reviewer : null,
    lastReviewed,
    modified: post.modified ?? post.date,
  };
}
