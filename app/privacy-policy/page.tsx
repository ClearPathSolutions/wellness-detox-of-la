import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information, including analytics, call tracking, and your California privacy rights.`,
  ...pageMeta({
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: `How ${site.name} collects, uses, and protects your information, including analytics, call tracking, and your California privacy rights.`,
  }),
  robots: { index: false, follow: true },
};

/**
 * Last substantive revision. Hard-coded rather than derived from the build:
 * a policy that re-dates itself on every deploy tells readers it changed when
 * it did not, which is worse than no date at all.
 *
 * BUMP THIS whenever the text below changes materially.
 */
const LAST_UPDATED = "August 11, 2026";

/**
 * NOTE FOR REVIEW — this policy was rewritten to describe what the site
 * actually does. The previous version ran ~350 words and disclosed none of the
 * third-party services below, had no effective date, and gave California
 * residents no way to exercise CCPA/CPRA rights, despite this being a
 * California healthcare provider collecting health-adjacent enquiries.
 *
 * Every factual claim here was checked against the code:
 *   - Google Analytics       components/Analytics.tsx  (consent-gated)
 *   - Google Tag Manager     components/Analytics.tsx  (consent-gated)
 *   - Google Maps            components/MapEmbed.tsx   (click-to-load)
 *   - Clarion Labs           components/Clarion.tsx, lib/leads.ts
 *   - Call tracking          app/layout.tsx  (loads unconditionally)
 *
 * It still needs sign-off from counsel before it is relied on — particularly
 * the retention period, which is stated as a placeholder the operator must
 * confirm, and the question of whether the call-tracking script should be moved
 * behind the same consent gate as analytics.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero crumb="Privacy Policy" title="Privacy Policy" />
      <Container className="py-14 lg:py-20">
        <div className="measure space-y-5 leading-relaxed text-muted [&_h2]:t-h3 [&_h2]:pt-4 [&_h2]:text-ink [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          <p className="text-sm">
            <strong className="font-semibold text-ink">Last updated:</strong> {LAST_UPDATED}
          </p>

          <p>
            {site.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates{" "}
            {site.url.replace("https://", "")}. This policy explains what information we collect
            through this website, how we use it, who we share it with, and the choices you have. It
            covers the website only — information you provide after admission is governed by the
            notice of privacy practices you receive as a client.
          </p>

          <h2>Information you give us</h2>
          <p>
            When you call us, use our contact form, request insurance verification, or use the chat
            widget, we collect what you choose to provide. That typically includes your name, phone
            number, email address, insurance details, and whatever you tell us about your situation.
          </p>
          <p>
            Because of what we do, information you send us may reveal that you are seeking treatment
            for substance use. Please share only what you are comfortable putting in writing — if you
            would rather not, call us at{" "}
            <a href={site.phoneHref} className="font-medium text-rose-dark underline underline-offset-2">
              {site.phone}
            </a>
            .
          </p>

          <h2>Information collected automatically</h2>
          <p>
            Our web host records standard server logs, including IP address, browser type, and the
            pages requested. Beyond that, this site is deliberately conservative about third-party
            tracking, and three of the four services below do not load unless you allow them:
          </p>
          <ul>
            <li>
              <strong className="font-semibold text-ink">Google Analytics</strong> — measures how
              {/* Explicit {" "} — JSX dropped the literal space after </em> here. */}
              visitors use the site. It loads <em>only</em>{" "}after you choose &quot;Allow
              analytics&quot; in the banner, and IP addresses are anonymised. Decline and it is never
              loaded.
            </li>
            <li>
              <strong className="font-semibold text-ink">Google Tag Manager</strong> — a container
              that manages the measurement tags described here. Like Google Analytics, it loads{" "}
              <em>only</em>{" "}after you choose &quot;Allow analytics&quot;. Decline and it is never
              loaded, and no tag it manages can run.
            </li>
            <li>
              <strong className="font-semibold text-ink">Google Maps</strong> — the map on our contact
              and tour pages is click-to-load. Nothing is requested from Google until you choose to
              view it. Our address and a directions link work without it.
            </li>
            <li>
              <strong className="font-semibold text-ink">Call tracking</strong> — we load a
              call-attribution script from <code className="text-ink">264810.tctm.co</code> on every
              page. It assigns tracking numbers so we can tell which sources lead people to call us.
              Unlike analytics, <strong className="font-semibold text-ink">this script loads without
              asking</strong>, because it is what connects your call to your enquiry. If you would
              rather not be included, you can block that domain in your browser and still reach us on{" "}
              {site.phone}.
            </li>
          </ul>

          <h2>Service providers</h2>
          <p>
            We use Clarion Labs to run the chat widget and to receive contact and insurance-verification
            form submissions. Information you enter into those forms is transmitted to and stored by
            Clarion Labs on our behalf. We also use Google for the analytics and mapping described
            above. These providers process information for us and are not permitted to use it for
            their own purposes.
          </p>

          <h2>How we use your information</h2>
          <p>
            To respond to your enquiry, verify insurance benefits, arrange admission, coordinate your
            care, meet our legal and regulatory obligations, and improve this website.{" "}
            <strong className="font-semibold text-ink">
              We do not sell your personal information, and we do not share it for cross-context
              behavioural advertising.
            </strong>
          </p>

          <h2>Confidentiality and HIPAA</h2>
          <p>
            We are a licensed treatment provider ({site.license}) and treat health-related
            communications as confidential. Once you become a client, your records are protected by
            HIPAA and, because we provide substance use disorder treatment, by the additional
            confidentiality rules in 42 CFR Part 2, which restrict disclosure more tightly than HIPAA
            alone. Information submitted through this website before you become a client is handled
            confidentially under this policy.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries that do not lead to admission are retained only as long as needed for the
            purposes above and to meet record-keeping obligations, then deleted. Client treatment
            records are retained for the period California law requires. To ask how long we hold
            something specific, contact us using the details below.
          </p>

          <h2>Your California privacy rights</h2>
          <p>
            If you are a California resident, the CCPA as amended by the CPRA gives you the right to
            know what personal information we have collected about you, to request a copy of it, to
            request correction or deletion, and to be free from discrimination for exercising any of
            these rights. Because we do not sell or share personal information for behavioural
            advertising, there is nothing to opt out of on that front.
          </p>
          <p>
            To make a request, email{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-rose-dark underline underline-offset-2">
              {site.email}
            </a>{" "}
            or call {site.phone}. We will verify your identity before acting, and respond within the
            timeframe the law allows. An authorised agent may make a request for you with written
            permission. Note that treatment records protected by HIPAA and 42 CFR Part 2 are handled
            under those laws rather than the CCPA.
          </p>

          <h2>Children</h2>
          <p>
            This website is intended for adults. We do not knowingly collect information from
            children under 13 through this site.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we make material changes we will update the date at the top of this page. Continued
            use of the site after a change means you accept the revised policy.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this policy, or about information we hold:{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-rose-dark underline underline-offset-2">
              {site.email}
            </a>
            , {site.phone}, or {site.address.full}. You can also{" "}
            <Link href="/contact" className="font-medium text-rose-dark underline underline-offset-2">
              send us a message
            </Link>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
