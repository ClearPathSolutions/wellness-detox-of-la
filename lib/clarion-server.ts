/**
 * Server-side accessor for the Clarion Labs site key.
 *
 * SERVER COMPONENTS ONLY. `CLARION_SITE_KEY` is deliberately not prefixed with
 * NEXT_PUBLIC_, so Next inlines it as `undefined` in any client bundle that
 * reads it. Call this from a server component and pass the result down as a
 * prop — never import it into a "use client" module.
 *
 * The key itself is not a secret: it ends up in `data-site-key` on the Clarion
 * script tags, so it is readable in page source either way. Keeping it in the
 * environment is a configuration choice (one value per deployment) rather than
 * a security boundary.
 *
 * A missing key is reported rather than papered over. Rendering the vendor
 * scripts with an empty key is worse than not rendering them: forms-capture.v1.js
 * bails on a falsy key and silently no-ops, which looks identical to a working
 * install right up until leads stop arriving.
 */
/** Static prerendering calls this once per page; one warning per process is enough. */
let warned = false;

export function clarionSiteKey(): string | null {
  const key = process.env.CLARION_SITE_KEY?.trim();
  if (key) return key;

  if (warned) return null;
  warned = true;
  console.error(
    "[clarion] CLARION_SITE_KEY is not set. The chat widget, the blog embed and " +
      "form capture will not render, and both lead forms will fall back to their " +
      "degraded paths. Set it in Vercel → Settings → Environment Variables."
  );
  return null;
}
