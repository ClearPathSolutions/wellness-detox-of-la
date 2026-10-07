import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import {
  editorial,
  editorialPolicyReady,
  editorialPolicyServed,
  EDITORIAL_POLICY_PATH,
  EDITORIAL_POLICY_URL,
  ORGANIZATION_ID,
} from "@/lib/editorial";
import { editorialPolicyBody } from "@/lib/editorial-body";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/blocks";
import { Container, READING_WIDTH } from "@/components/ui";

/*
 * A static segment, so it takes precedence over the app/[slug] catch-all
 * (which only serves blog post slugs anyway, with dynamicParams = false).
 */

const title = `Editorial Policy | ${editorial.facilityName}`;
const description = `How ${editorial.facilityName} researches, writes, clinically reviews and updates the health information on ${editorial.domain}.`;

export const metadata: Metadata = {
  // Absolute: the package specifies the exact title, so the layout's
  // "%s | site.name" template must not be applied on top of it.
  title: { absolute: title },
  description,
  ...pageMeta({ path: EDITORIAL_POLICY_PATH, title, description }),
  // Reviewable on previews, but kept out of search until signed off.
  ...(editorialPolicyReady ? {} : { robots: { index: false, follow: false } }),
};

export default function EditorialPolicyPage() {
  if (!editorialPolicyServed) notFound();
  const html = editorialPolicyBody();

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${EDITORIAL_POLICY_URL}#webpage`,
    url: EDITORIAL_POLICY_URL,
    name: "Editorial Policy",
    description,
    about: { "@id": ORGANIZATION_ID },
    ...(editorial.lastReviewed ? { lastReviewed: editorial.lastReviewed } : {}),
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd).replace(/</g, "\\u003c") }}
      />
      <PageHero crumb="Editorial Policy" title="Editorial Policy" width="reading" />
      <Container className="py-12 lg:py-20">
        <div className={`mx-auto ${READING_WIDTH}`}>
          {/* SAFETY: first-party template from the repo (data/editorial-policy.html)
              with escaped merge fields; no user input reaches it.
              suppressHydrationWarning: CallTrackingMetrics rewrites the phone link. */}
          <div
            className="prose measure"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </Container>
      <CtaBanner />
    </>
  );
}
