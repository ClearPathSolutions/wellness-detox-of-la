"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * Clarion Labs blog embed.
 *
 * Posts authored in the Clarion dashboard render client-side into the
 * `data-clarion-blog` mount below. We inject the embed script imperatively in
 * an effect (rather than a static <script> tag) so it also runs when users
 * reach /blog via client-side (SPA) navigation — a markup <script> only
 * executes on a fresh document load. The script + rendered content are torn
 * down on unmount so re-visiting the page starts from a clean mount.
 *
 * Reuses the same site key / API as the chat widget (see components/Clarion.tsx).
 */
const BLOG_EMBED_SRC = "https://www.clarionlabs.ai/blog-embed.v1.js";

/**
 * `siteKey` arrives as a prop rather than from lib/site: it comes from
 * CLARION_SITE_KEY, which is server-only, and a client component reading it
 * directly would compile to `undefined` and silently break the embed.
 */
export default function ClarionBlog({ siteKey }: { siteKey: string | null }) {
  const { api } = site.widgets.clarion;
  const mountRef = useRef<HTMLDivElement>(null);
  // Hidden until the embed proves it rendered real posts. See `hasPosts` below.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!siteKey) return; // nothing to load; the missing key is logged server-side
    // Capture the node now: by cleanup time the ref may point elsewhere (or at
    // null), which would leave the injected markup behind on unmount.
    const mount = mountRef.current;
    if (!mount) return;

    /**
     * Did the embed render actual posts, or just a status message?
     *
     * The embed's feed currently 404s for this site key, and on failure it
     * writes its own "Blog is unavailable right now." string into the mount —
     * which was rendering as the headline content of /blog, above the eight
     * working first-party posts.
     *
     * This tests for post *structure* (a link or an article element) rather
     * than matching the message text, so a vendor reword cannot defeat it and
     * a genuinely empty feed is treated the same as a failed one.
     */
    const hasPosts = () => !!mount.querySelector("a[href], article");

    const observer = new MutationObserver(() => setReady(hasPosts()));
    observer.observe(mount, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.src = BLOG_EMBED_SRC;
    script.async = true;
    script.dataset.siteKey = siteKey; // -> data-site-key
    script.dataset.api = api; // -> data-api
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      script.remove();
      mount.innerHTML = "";
    };
  }, [siteKey, api]);

  // Blog posts render inside this element.
  //
  // `hidden` until posts actually arrive, and no min-height — the embed used to
  // reserve 40vh it never filled. Together these mean a failed or empty feed
  // collapses to nothing instead of publishing a vendor error message as the
  // lead content of /blog. A working embed reveals itself and expands to fit.
  return <div ref={mountRef} data-clarion-blog hidden={!ready} className="py-14 lg:py-20" />;
}
