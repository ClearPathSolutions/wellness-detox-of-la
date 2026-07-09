import { getGoogleReviews, type GoogleReview } from "@/lib/reviews";
import { site } from "@/lib/site";
import { ArrowRight, Button, Container, SectionHeading } from "./ui";

/* Amber stars to match Google's own review styling. */
function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width={16}
          height={16}
          viewBox="0 0 24 24"
          aria-hidden
          fill={i < rounded ? "#f5a623" : "none"}
          stroke="#f5a623"
          strokeWidth={1.5}
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({ r }: { r: GoogleReview }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card">
      <Stars rating={r.rating} />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">
        <span className="line-clamp-6">{r.text}</span>
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {r.profilePhoto ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote Google avatar, no next/image domain config needed
          <img
            src={r.profilePhoto}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-soft text-sm font-semibold text-rose-dark">
            {initials(r.author)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate font-display text-sm font-semibold text-ink">
            {r.author}
          </span>
          <span className="block text-xs text-muted">
            {r.relativeTime ? `${r.relativeTime} · ` : ""}Google Review
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export async function ReviewsSection() {
  const data = await getGoogleReviews();

  // No API key configured, request failed, or no qualifying reviews →
  // render nothing rather than an empty placeholder.
  if (!data) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    url: site.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.rating,
      reviewCount: data.total,
      bestRating: 5,
      worstRating: 1,
    },
    review: data.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
    })),
  };

  return (
    <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Container className="px-0">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Real Stories"
            title="They trusted us. So can you."
            intro="Recovery is personal — but you don't have to take our word for it. Read what clients and families across Los Angeles say about their experience with Wellness Detox LA."
          />
          <div className="flex flex-shrink-0 items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 shadow-card">
            <span className="font-display text-4xl font-bold leading-none text-ink">
              {data.rating.toFixed(1)}
            </span>
            <span>
              <Stars rating={data.rating} />
              <span className="mt-1 block text-xs text-muted">
                {data.total} Google review{data.total === 1 ? "" : "s"}
              </span>
            </span>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.reviews.map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} r={r} />
          ))}
        </div>

        <div className="mt-8">
          <Button href={data.mapsUri} variant="outline">
            Read All Reviews on Google
            <ArrowRight width={17} height={17} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
