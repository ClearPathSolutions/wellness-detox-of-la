"use client";

import { useEffect, useRef } from "react";
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

export default function ClarionBlog() {
  const { siteKey, api } = site.widgets.clarion;
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = BLOG_EMBED_SRC;
    script.async = true;
    script.dataset.siteKey = siteKey; // -> data-site-key
    script.dataset.api = api; // -> data-api
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, [siteKey, api]);

  // Blog posts render inside this element.
  return <div ref={mountRef} data-clarion-blog className="min-h-[40vh]" />;
}
