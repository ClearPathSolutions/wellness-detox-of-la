"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Re-applies the stored campaign to the URL after a client-side navigation.
 *
 * The <head> bootstrap (lib/attribution.ts) runs once per full page load, which
 * is all a classic multi-page site needs. This site is an App Router SPA: a
 * visitor who lands on /?gclid=… and clicks through to /contact never triggers
 * another document load, so without this the form page's URL is clean again and
 * forms-capture.v1.js reads no campaign at submit time — the exact failure the
 * bootstrap exists to prevent.
 *
 * `usePathname` rather than `useSearchParams`: the latter forces a Suspense
 * boundary and opts every statically prerendered page into dynamic rendering.
 */
export function CampaignTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.__campaignFirstTouch?.sync();
  }, [pathname]);

  return null;
}
