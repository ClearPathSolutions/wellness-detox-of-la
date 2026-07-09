import { cache } from "react";
import { site } from "@/lib/site";

/**
 * Live Google reviews for the homepage testimonials section.
 *
 * Data comes from the Google Places API (New). Set the following environment
 * variables (server-side only — never prefix with NEXT_PUBLIC_):
 *
 *   GOOGLE_PLACES_API_KEY   (required) — a Google Cloud key with the
 *                           "Places API (New)" enabled.
 *   GOOGLE_PLACE_ID         (optional but recommended) — the Google Place ID
 *                           for Wellness Detox of LA. If omitted, it is
 *                           resolved automatically from the business name +
 *                           address via Text Search.
 *
 * If the key is missing, or the request fails, or there are no qualifying
 * reviews, this returns `null` and the section renders nothing — the site
 * never shows an empty placeholder and the build never breaks.
 *
 * The Places API (New) returns at most 5 reviews per place.
 */

export type GoogleReview = {
  author: string;
  profilePhoto?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
};

export type ReviewsData = {
  rating: number;
  total: number;
  reviews: GoogleReview[];
  mapsUri: string;
};

const PLACES_BASE = "https://places.googleapis.com/v1";
const DAY = 60 * 60 * 24;

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
};

type PlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const configured = process.env.GOOGLE_PLACE_ID;
  if (configured) return configured;

  // Fall back to resolving the Place ID from the business name + address.
  const res = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: `${site.name} ${site.address.full}` }),
    next: { revalidate: DAY * 30, tags: ["google-reviews"] },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { places?: { id?: string }[] };
  return data.places?.[0]?.id ?? null;
}

async function fetchReviews(): Promise<ReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    const placeId = await resolvePlaceId(apiKey);
    if (!placeId) return null;

    const res = await fetch(`${PLACES_BASE}/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: DAY, tags: ["google-reviews"] },
    });
    if (!res.ok) return null;

    const place = (await res.json()) as PlaceDetails;

    const reviews: GoogleReview[] = (place.reviews ?? [])
      .map((r): GoogleReview => ({
        author: r.authorAttribution?.displayName?.trim() || "Google user",
        profilePhoto: r.authorAttribution?.photoUri,
        rating: r.rating ?? 0,
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        relativeTime: r.relativePublishTimeDescription ?? "",
        publishTime: r.publishTime ?? "",
      }))
      // Only show substantive, positive reviews on the marketing page.
      .filter((r) => r.rating >= 4 && r.text.length > 0)
      .sort((a, b) => b.publishTime.localeCompare(a.publishTime))
      .slice(0, 6);

    if (reviews.length === 0) return null;

    return {
      rating: place.rating ?? 0,
      total: place.userRatingCount ?? 0,
      reviews,
      mapsUri: place.googleMapsUri ?? site.url,
    };
  } catch {
    // Network error, malformed response, quota, etc. — fail silently.
    return null;
  }
}

/** Request-memoized so the homepage only hits the API once per render. */
export const getGoogleReviews = cache(fetchReviews);
