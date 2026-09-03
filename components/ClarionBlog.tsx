"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { uniqueSlug } from "@/lib/slug";

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

/** Matches BlogPostView's heading offset so both post types clear the fixed header. */
const HEADING_SCROLL_MT = "scroll-mt-24 lg:scroll-mt-36";

/**
 * Give the embed's own in-page links something to land on.
 *
 * Posts authored in Clarion carry a "Table of Contents" of `[Section](#section)`
 * links and numbered `#ref1`-style citations, written as if the renderer emitted
 * GitHub-style heading anchors. It does not: the embed renders the <a> tags but
 * puts no `id` on any element in the post body, so every one of those links is a
 * dead anchor and clicking it scrolls nowhere. Measured on a live post: 19
 * headings, 0 ids, 18 broken links.
 *
 * Ids come from the same `uniqueSlug` that BlogPostView uses for first-party
 * posts, which is what makes them line up with hrefs Clarion already wrote —
 * verified against a published post, where it resolves every section link.
 *
 * Only fills in what is missing, so if the vendor starts emitting ids this
 * quietly stops doing anything rather than fighting it.
 */
function assignAnchorTargets(mount: HTMLElement) {
  const post = mount.querySelector<HTMLElement>(".clarion-blog-post") ?? mount;
  const headings = Array.from(post.querySelectorAll<HTMLElement>("h2, h3, h4"));

  // Seed with ids already present so a generated one can never collide with them.
  const seen = new Set<string>(headings.map((h) => h.id).filter(Boolean));
  for (const h of headings) {
    if (h.id) continue;
    h.id = uniqueSlug(h.textContent?.trim() ?? "", seen);
    h.classList.add(...HEADING_SCROLL_MT.split(" "));
  }

  // Citations are numbered by position in the references list rather than
  // slugged — `#ref1` carries no text to derive an id from.
  const refHeading = headings.find((h) =>
    /references|sources|citations/i.test(h.textContent ?? "")
  );
  if (!refHeading) return;
  let el = refHeading.nextElementSibling;
  while (el && !/^H[1-4]$/.test(el.tagName)) {
    if (el.tagName === "OL" || el.tagName === "UL") {
      Array.from(el.children).forEach((li, i) => {
        if (!li.id) li.id = `ref${i + 1}`;
      });
      return;
    }
    el = el.nextElementSibling;
  }
}

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

    // Runs on every content change, so it also covers opening a second post
    // without a page load. Observing childList only — assigning ids is an
    // attribute mutation and cannot re-trigger this.
    const observer = new MutationObserver(() => {
      setReady(hasPosts());
      assignAnchorTargets(mount);
    });
    observer.observe(mount, { childList: true, subtree: true });

    /**
     * Scroll in-page links explicitly instead of leaving it to the browser.
     *
     * The post is injected long after load, so a click that lands before the
     * ids exist sets the hash and scrolls nowhere — and because the hash now
     * already matches, clicking that same link again fires no hashchange, so it
     * stays dead until a reload. Handling the click ourselves removes the
     * dependency on that timing entirely.
     *
     * `block: "start"` honours the scroll-mt applied in assignAnchorTargets, so
     * the heading clears the fixed header.
     */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || !mount.contains(anchor)) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("#") || href === "#") return;
      const id = decodeURIComponent(href.slice(1));

      // The click may arrive before the observer has run for this post.
      assignAnchorTargets(mount);
      const destination = document.getElementById(id);
      if (!destination) return; // unknown target: leave the browser to it

      event.preventDefault();
      destination.scrollIntoView({ behavior: "smooth", block: "start" });
      // Keep the hash shareable without discarding the App Router's state.
      history.replaceState(history.state, "", `#${id}`);
    };
    mount.addEventListener("click", onClick);

    const script = document.createElement("script");
    script.src = BLOG_EMBED_SRC;
    script.async = true;
    script.dataset.siteKey = siteKey; // -> data-site-key
    script.dataset.api = api; // -> data-api
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      mount.removeEventListener("click", onClick);
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
