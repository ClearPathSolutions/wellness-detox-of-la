"use client";

import { useState, useSyncExternalStore } from "react";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeToConsent,
} from "@/lib/analytics";
import { site } from "@/lib/site";
import { MapPinIcon } from "./ui";

/**
 * Google Maps embed that does not contact Google until the visitor asks it to.
 *
 * Why this exists: the iframe used to load on every visit to /contact, which
 * fires a third-party request on a healthcare intake page before any consent.
 *
 * Two distinct signals, deliberately not conflated:
 *   - Analytics consent already `granted` → the visitor has accepted third-party
 *     content, so the map loads immediately.
 *   - Otherwise → a click-to-load placeholder. Choosing to view a map is NOT
 *     agreement to be tracked, so clicking loads the map for this visit only and
 *     never writes to the stored analytics decision.
 *
 * The address and a directions link render either way, so the useful information
 * is available without loading anything external (and without JavaScript).
 */
export function MapEmbed() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const [requested, setRequested] = useState(false);

  const mapsQuery = encodeURIComponent(site.address.full);
  const show = requested || consent === "granted";

  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-card">
      {show ? (
        <iframe
          title={`Map to ${site.name}`}
          src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
          width="100%"
          height="260"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full border-0"
        />
      ) : (
        <div className="flex h-[260px] flex-col items-center justify-center gap-3 bg-sand/40 px-6 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-soft text-rose-dark">
            <MapPinIcon width={20} height={20} />
          </span>
          <p className="text-sm font-medium text-ink">{site.address.full}</p>
          <button
            type="button"
            onClick={() => setRequested(true)}
            className="rounded-full bg-ink px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
          >
            Show map
          </button>
          <p className="text-xs text-muted">
            Loads a Google Maps embed.{" "}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-rose-dark"
            >
              Open directions instead
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
