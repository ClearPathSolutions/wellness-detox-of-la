import { legalBody, type LegalDoc } from "@/lib/legal";
import { PageHero } from "@/components/PageHero";
import { Container, READING_WIDTH } from "@/components/ui";

/** Shell for the standard legal pages: same hero and prose as the editorial policy. */
export function LegalPage({ doc, title }: { doc: LegalDoc; title: string }) {
  const html = legalBody(doc);
  return (
    <>
      <PageHero crumb={title} title={title} width="reading" />
      <Container className="py-12 lg:py-20">
        <div className={`mx-auto ${READING_WIDTH}`}>
          {/* SAFETY: first-party template from the repo (data/legal/) with
              escaped merge fields; no user input reaches it.
              suppressHydrationWarning: CallTrackingMetrics rewrites the phone link. */}
          <div
            className="prose measure"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </Container>
    </>
  );
}
