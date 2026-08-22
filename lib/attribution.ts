/**
 * First-touch campaign attribution.
 *
 * WHY THIS EXISTS
 * ---------------
 * Both forms submit through `window.ClarionForms.submit()` (see lib/clarion.ts).
 * Reading the published forms-capture.v1.js shows that call builds its payload
 * from the LIVE URL at submit time:
 *
 *     utm:   ["source","medium","campaign","term","content"] read from location.search
 *     gclid: location.search
 *
 * Landing page and referrer are persisted by the vendor (sessionStorage), and
 * `ctm_visitor_sid` is read from CallTrackingMetrics' `__ctm.config.sid` — both
 * already correct, so neither is rebuilt here.
 *
 * The campaign itself is not persisted. A visitor who lands on an ad and reads
 * one more page before converting submits from a clean URL, so the lead records
 * a correct landing page and NO campaign. Nothing errors: Clarion returns 200,
 * the lead arrives, a rep can call back. Only the link to the ad click is gone,
 * which surfaces as paid spend that appears to convert at zero.
 *
 * The vendor also never collects wbraid/gbraid — Google's gclid substitutes
 * under iOS and consent mode — which CTM account 264810's own routing rules key
 * on. Those are sent explicitly with the form data instead; see campaignFields().
 *
 * localStorage rather than sessionStorage: a second tab is the same visit.
 */

/** Query keys that identify a paid click. Order is display order in the URL. */
export const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

export type CampaignParams = Partial<Record<(typeof CAMPAIGN_KEYS)[number], string>>;

declare global {
  interface Window {
    /**
     * Installed by CAMPAIGN_BOOTSTRAP as the first thing in <head>, so it runs
     * before forms-capture.v1.js and before CTM's t.js read the URL.
     */
    __campaignFirstTouch?: {
      /** Capture a fresh click, or restore a stored one into the URL. */
      sync: () => void;
      /** The stored campaign, or null. */
      get: () => CampaignParams | null;
    };
  }
}

/**
 * Inline <head> script source. ES5 and self-contained on purpose — it runs
 * synchronously during head parse, ahead of every other script on the page.
 *
 * It restores the campaign into the URL rather than passing it to the vendor
 * directly, because `ClarionForms.submit({form_key, data})` only lets a caller
 * control `data`; the top-level `utm`/`gclid` fields Clarion parses are built
 * inside the vendor's own code from location.search. Putting the values back in
 * the URL is what makes the vendor emit them correctly.
 */
export const CAMPAIGN_BOOTSTRAP = `
(function () {
  var KEY = 'campaign.first_touch.v1', TTL = 30 * 24 * 60 * 60 * 1000;
  var KEYS = ${JSON.stringify(CAMPAIGN_KEYS)};

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null');
      return v && v.p && Date.now() - v.at < TTL ? v.p : null;
    } catch (e) { return null; }
  }

  function sync() {
    var now, found = {}, i, k, v;
    try { now = new URLSearchParams(location.search); } catch (e) { return; }
    for (i = 0; i < KEYS.length; i++) {
      k = KEYS[i]; v = now.get(k);
      if (v) found[k] = v;
    }

    // A fresh click always wins — that is a new campaign, not a continuation.
    if (Object.keys(found).length) {
      try { localStorage.setItem(KEY, JSON.stringify({ p: found, at: Date.now() })); } catch (e) {}
      return;
    }

    var saved = read();
    if (!saved) return;

    var url, changed = false;
    try { url = new URL(location.href); } catch (e) { return; }
    for (i = 0; i < KEYS.length; i++) {
      k = KEYS[i];
      if (saved[k] && !url.searchParams.get(k)) { url.searchParams.set(k, saved[k]); changed = true; }
    }
    // Pass history.state through: the App Router keeps its routing state there,
    // and replacing it with null breaks back/forward navigation.
    if (changed) try { history.replaceState(history.state, '', url.toString()); } catch (e) {}
  }

  window.__campaignFirstTouch = { sync: sync, get: read };
  sync();
})();
`.trim();

/**
 * The stored campaign as flat fields, for inclusion in a form submission.
 *
 * Sent alongside the vendor's own top-level `utm`/`gclid` (which the URL restore
 * above repopulates) for two reasons: wbraid/gbraid/msclkid/fbclid have no
 * top-level field at all, and an explicit copy still attributes the lead if the
 * URL restore is ever blocked. None of these names collide with a form field.
 */
export function campaignFields(): CampaignParams {
  if (typeof window === "undefined") return {};
  try {
    return window.__campaignFirstTouch?.get() ?? {};
  } catch {
    return {};
  }
}
