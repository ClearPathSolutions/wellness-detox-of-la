import Image from "next/image";
import Link from "next/link";
import type { ContentPageData } from "@/lib/content-types";
import { site } from "@/lib/site";
import { uniqueSlug } from "@/lib/slug";
import { PageHero } from "./PageHero";
import { ContactForm } from "./ContactForm";
import { FAQ } from "./FAQ";
import {
  CategoryGroups,
  CtaBanner,
  StatTiles,
  SubsectionCards,
  SubstanceGrid,
  WithdrawalTimeline,
} from "./blocks";
import {
  ArrowRight,
  CheckIcon,
  Container,
  Prose,
  READING_WIDTH,
  RichText,
} from "./ui";

const levels = [
  { label: "Medical Detox", href: "/treatment/detox" },
  { label: "Residential Inpatient", href: "/treatment/residential" },
  { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis" },
  { label: "Aftercare", href: "/treatment/aftercare" },
];

/** The current page is shown as a non-link — a self-referencing nav tile is noise. */
function LevelsOfCare({ currentSlug }: { currentSlug: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {levels.map((l) => {
        const isCurrent = l.href === `/treatment/${currentSlug}`;
        if (isCurrent) {
          return (
            <span
              key={l.href}
              aria-current="page"
              className="flex items-center justify-between gap-2 rounded-xl border border-rose bg-rose-soft/50 px-4 py-3.5 text-sm font-semibold text-ink"
            >
              {l.label}
              <span className="text-xs font-medium text-rose-dark">
                You are here
              </span>
            </span>
          );
        }
        return (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-white px-4 py-3.5 text-sm font-semibold text-ink shadow-card transition-colors hover:border-rose"
          >
            {l.label}
            <ArrowRight
              width={15}
              height={15}
              className="text-rose-dark transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        );
      })}
    </div>
  );
}

/**
 * Shared wrapper giving every block on the page the same vertical rhythm and
 * separation. Sections used to be divided only by a `mt-14` gap, which left a
 * 1,600-word page reading as one undifferentiated column; the rule + generous
 * lead-in echoes the `.prose h2` treatment already used on blog posts, so the
 * two long-form templates now look like the same site.
 */
function PageSection({
  id,
  first,
  children,
}: {
  id?: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 lg:scroll-mt-36 ${
        first ? "" : "mt-12 border-t border-line pt-12 lg:mt-16 lg:pt-16"
      }`}
    >
      {children}
    </section>
  );
}

export function ContentPage({ page }: { page: ContentPageData }) {
  const faqLd =
    page.faqs && page.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  // Collision-safe section ids. Retained after the on-page nav was removed:
  // they are still deep-link targets, and dropping them would break any
  // existing links to #faqs / #levels-of-care.
  const seen = new Set<string>();
  if (page.levelsOfCare) seen.add("levels-of-care");
  if (page.substances) seen.add("substances");
  if (page.faqs?.length) seen.add("faqs");
  if (page.form === "contact") seen.add("get-in-touch");

  const sectionIds = page.sections.map((s) =>
    s.heading ? uniqueSlug(s.heading, seen) : undefined,
  );

  return (
    <>
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {/* PageHero emits the BreadcrumbList schema from this same `crumb` string. */}
      <PageHero
        crumb={page.crumb}
        eyebrow={page.eyebrow}
        title={page.h1}
        intro={page.intro}
        width="reading"
        actions
      />

      {page.hero && (
        <Container className="pt-10 lg:pt-14">
          {/* Same reading column as the hero text and body below it. */}
          <div
            className={`relative mx-auto aspect-[16/8] ${READING_WIDTH} overflow-hidden rounded-[1.75rem] shadow-soft`}
          >
            <Image
              src={page.hero}
              alt={page.h1}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </Container>
      )}

      <Container className="py-12 lg:py-20">
        {/* Single reading column. Capped near the prose measure so paragraphs
            fill the width rather than trailing off into a dead right-hand gutter. */}
        <div className={`mx-auto ${READING_WIDTH}`}>
          <div className="min-w-0">
            {page.sections.map((s, i) => (
              <PageSection key={i} id={sectionIds[i]} first={i === 0}>
                {s.eyebrow && <p className="eyebrow mb-2">{s.eyebrow}</p>}
                {s.heading && (
                  <h2 className="t-h2 measure-wide text-ink">{s.heading}</h2>
                )}

                {s.body && (
                  <Prose className="mt-4">
                    {s.body.map((p, j) => (
                      <p key={j}>
                        <RichText>{p}</RichText>
                      </p>
                    ))}
                  </Prose>
                )}

                {/* Additive — sits under the prose it reinforces, never replaces a sentence */}
                {s.stats?.length ? <StatTiles stats={s.stats} /> : null}

                {s.bullets && (
                  <ul className="measure-wide mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {s.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-ink-700"
                      >
                        <CheckIcon
                          width={17}
                          height={17}
                          className="mt-1 flex-shrink-0 text-rose-dark"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.subsections && <SubsectionCards items={s.subsections} />}

                {s.groups &&
                  (s.groupsDisplay === "timeline" ? (
                    <WithdrawalTimeline phases={s.groups} />
                  ) : (
                    <CategoryGroups groups={s.groups} />
                  ))}
              </PageSection>
            ))}

            {page.levelsOfCare && (
              <PageSection id="levels-of-care">
                <h2 className="t-h2 text-ink">Our Levels of Care</h2>
                <p className="t-body measure mt-3 text-muted">
                  Treatment moves through stages. These are the four we provide,
                  in the order most clients experience them.
                </p>
                <div className="mt-6">
                  <LevelsOfCare currentSlug={page.slug} />
                </div>
              </PageSection>
            )}

            {page.substances && (
              <PageSection id="substances">
                <h2 className="t-h2 text-ink">Substances We Treat</h2>
                <div className="mt-6">
                  <SubstanceGrid />
                </div>
              </PageSection>
            )}

            {page.faqs && page.faqs.length > 0 && (
              <PageSection id="faqs">
                <h2 className="t-h2 text-ink">Frequently Asked Questions</h2>
                <div className="mt-6">
                  <FAQ faqs={page.faqs} />
                </div>
              </PageSection>
            )}

            {page.form === "contact" && (
              <PageSection id="get-in-touch">
                <h2 className="t-h2 text-ink">Reach out confidentially</h2>
                <p className="t-body measure mt-3 text-muted">
                  Send us a message and an admissions specialist will get back
                  to you. Prefer to talk now? Call{" "}
                  <a
                    href={site.phoneHref}
                    className="font-semibold text-rose-dark underline underline-offset-2"
                  >
                    {site.phone}
                  </a>
                  .
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </PageSection>
            )}
          </div>
        </div>
      </Container>

      <CtaBanner {...(page.cta ?? {})} />
    </>
  );
}
