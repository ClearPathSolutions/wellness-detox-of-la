import Link from "next/link";
import type { Byline } from "@/lib/byline";
import { editorialPolicyServed, EDITORIAL_POLICY_PATH } from "@/lib/editorial";

/** Date-only and UTC, so "2026-09-30" can't render as the 29th in US zones. */
function formatDate(iso: string): string {
  return new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Article byline, from the editorial policy package's
 * templates/article-byline.html. Sits directly under the post's H1. Each line
 * renders only when its data exists — "Written by" only for a known author,
 * and the reviewer line only when getByline() found both reviewer and date.
 */
export function ArticleByline({ byline }: { byline: Byline }) {
  const { author, reviewer, lastReviewed, modified } = byline;
  const meta = [
    lastReviewed && (
      <span key="reviewed">
        Last reviewed <time dateTime={lastReviewed}>{formatDate(lastReviewed)}</time>
      </span>
    ),
    <span key="updated">
      Updated <time dateTime={modified}>{formatDate(modified)}</time>
    </span>,
    // Linked only where the policy is served, so production never links a 404.
    editorialPolicyServed && (
      <Link key="policy" href={EDITORIAL_POLICY_PATH}>
        Editorial policy
      </Link>
    ),
  ].filter(Boolean);

  return (
    <div className="article-byline">
      {author && (
        <p className="byline-line">
          Written by{" "}
          <Link href={author.bioPath} rel="author">
            {author.name}
          </Link>
        </p>
      )}
      {reviewer && (
        <p className="byline-line">
          Clinically reviewed by{" "}
          <Link href={reviewer.bioPath}>
            {reviewer.name}
            {reviewer.credentials && `, ${reviewer.credentials}`}
          </Link>
        </p>
      )}
      <p className="byline-meta">{meta.flatMap((m, i) => (i === 0 ? [m] : [" · ", m]))}</p>
    </div>
  );
}
