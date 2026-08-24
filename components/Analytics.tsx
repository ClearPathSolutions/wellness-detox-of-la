"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  setConsent,
  subscribeToConsent,
  trackEmailClick,
  trackPhoneClick,
} from "@/lib/analytics";
import { site } from "@/lib/site";

/**
 * Consent-gated Google Analytics.
 *
 * Google Analytics is NOT loaded until the visitor explicitly opts in. This
 * matters more here than on a typical marketing site: page URLs like
 * /treatment/heroin-addiction combined with an IP address are exactly the
 * disclosure HHS OCR's guidance on tracking technologies warns about, and CCPA
 * applies to the business. No opt-in, no third-party script, no identifiers.
 *
 * Because analytics only exists after consent, phone/email click tracking is
 * attached in the same branch — there is no code path that reports a
 * conversion without permission to do so.
 */
export function Analytics() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  // Conversion tracking: one delegated listener covers every phone and email
  // link on the site, including ones rendered from blog markdown.
  useEffect(() => {
    if (consent !== "granted") return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href") ?? "";
      // Where on the page the click happened, for attribution in GA.
      const location =
        anchor.dataset.callLocation ??
        (anchor.closest("header")
          ? "header"
          : anchor.closest("footer")
            ? "footer"
            : "body");

      if (href.startsWith("tel:")) trackPhoneClick(location);
      else if (href.startsWith("mailto:")) trackEmailClick(location);
    };

    // Capture phase: still records the click if a handler stops propagation.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [consent]);

  return (
    <>
      {consent === "granted" && (
        <>
          {/* Google Tag Manager.
              
              Behind the consent gate rather than in <head>, which is where GTM's
              own install guide puts it. Two reasons. The banner promises
              "Nothing is loaded unless you agree", and GTM is not a passive
              script — the container decides at runtime which tags fire, so an
              ungated GTM is an open door for any tag added later, including
              ones nobody reviewed against this page set. Second, URLs here name
              a condition (/treatment/heroin-addiction); pairing that with an IP
              is precisely what HHS OCR's tracking-technologies guidance covers.

              Single inline snippet, not an init script plus a src script:
              dataLayer must exist before gtm.js evaluates, and next/script does
              not guarantee ordering between two afterInteractive tags.

              No <noscript> iframe. The standard one fires without JavaScript,
              which would mean firing without consent, since the gate needs JS
              to read a choice. */}
          <Script id="gtm-loader" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}
          </Script>

          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.analyticsId}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {consent === "none" && (
        // The wrapper spans the full viewport width but is only visible where
        // the card is. Without `pointer-events-none` it swallowed every click in
        // its transparent margins — roughly 370px either side of the card on a
        // 1512px screen — so links near the bottom of the page silently did
        // nothing. Verified with a real browser: `elementFromPoint` returned
        // this div, not the link. The card re-enables pointer events for itself.
        <div
          role="region"
          aria-label="Privacy and analytics consent"
          className="pointer-events-none fixed inset-x-0 bottom-16 z-50 px-3 pb-3 lg:bottom-0 lg:px-6 lg:pb-6"
        >
          <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:gap-6">
            <p className="text-sm leading-relaxed text-ink-700">
              We&apos;d like to use analytics cookies to understand how visitors find and use this
              site. Nothing is loaded unless you agree, and browsing without analytics works exactly
              the same.{" "}
              <Link href="/privacy-policy" className="font-semibold text-rose-dark underline">
                Privacy Policy
              </Link>
            </p>
            <div className="flex flex-shrink-0 gap-2.5">
              <button
                type="button"
                onClick={() => setConsent("denied")}
                className="flex-1 whitespace-nowrap rounded-full border border-ink/20 px-5 py-2.5 font-display text-sm font-semibold text-ink transition-colors hover:border-rose hover:text-rose-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 sm:flex-none"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setConsent("granted")}
                className="flex-1 whitespace-nowrap rounded-full bg-rose px-5 py-2.5 font-display text-sm font-semibold text-white shadow-card transition-colors hover:bg-rose-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 sm:flex-none"
              >
                Allow analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
