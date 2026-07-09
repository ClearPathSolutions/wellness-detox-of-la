import Image from "next/image";
import Link from "next/link";
import type { ContentPageData } from "@/lib/content-types";
import { uniqueSlug } from "@/lib/slug";
import { PageHero } from "./PageHero";
import { FAQ } from "./FAQ";
import { JumpNav, type JumpNavItem } from "./JumpNav";
import {
  CategoryGroups,
  CtaBanner,
  StatTiles,
  SubsectionCards,
  SubstanceGrid,
  WithdrawalTimeline,
} from "./blocks";
import { ArrowRight, CheckIcon, Container } from "./ui";

const levels = [
  { label: "Medical Detox", href: "/treatment/detox" },
  { label: "Residential Inpatient", href: "/treatment/residential" },
  { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis" },
  { label: "Aftercare", href: "/treatment/aftercare" },
];

function LevelsOfCare() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {levels.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-white px-4 py-3.5 text-sm font-semibold text-ink shadow-card transition-colors hover:border-rose"
        >
          {l.label}
          <ArrowRight width={15} height={15} className="text-rose-dark transition-transform group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
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

  // --- server: assign collision-safe ids + build the jump-nav list ---
  // Seed reserved ids first so a section heading like "Levels of Care" can't collide.
  const seen = new Set<string>();
  if (page.levelsOfCare) seen.add("levels-of-care");
  if (page.substances) seen.add("substances");
  if (page.faqs?.length) seen.add("faqs");

  const sectionIds = page.sections.map((s) =>
    s.heading ? uniqueSlug(s.heading, seen) : undefined
  );

  const navItems: JumpNavItem[] = [];
  page.sections.forEach((s, i) => {
    if (s.heading && sectionIds[i]) navItems.push({ id: sectionIds[i]!, label: s.heading });
  });
  if (page.levelsOfCare) navItems.push({ id: "levels-of-care", label: "Levels of Care" });
  if (page.substances) navItems.push({ id: "substances", label: "Substances" });
  if (page.faqs?.length) navItems.push({ id: "faqs", label: "FAQs" });

  return (
    <>
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
        />
      )}
      <PageHero crumb={page.crumb} eyebrow={page.eyebrow} title={page.h1} intro={page.intro} />

      {page.hero && (
        <Container className="pt-10 lg:pt-14">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[1.75rem] shadow-soft">
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

      <JumpNav items={navItems} />

      <Container className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          {page.sections.map((s, i) => (
            <section
              key={i}
              id={sectionIds[i]}
              className={`scroll-mt-8 lg:scroll-mt-20 ${i > 0 ? "mt-14" : ""}`}
            >
              {s.eyebrow && <p className="eyebrow mb-2">{s.eyebrow}</p>}
              {s.heading && <h2 className="max-w-3xl text-2xl text-ink sm:text-3xl">{s.heading}</h2>}

              {s.body && (
                <div className="mt-3 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              )}

              {/* ADDITIVE — sits under the prose it reinforces, never replaces a sentence */}
              {s.stats?.length ? <StatTiles stats={s.stats} /> : null}

              {s.bullets && (
                <ul className="mt-4 grid max-w-3xl gap-2.5 sm:grid-cols-2">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-ink-700">
                      <CheckIcon width={17} height={17} className="mt-0.5 flex-shrink-0 text-rose-dark" />
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
            </section>
          ))}

          {page.levelsOfCare && (
            <div id="levels-of-care" className="mt-14 scroll-mt-8 lg:scroll-mt-20">
              <h2 className="mb-5 text-2xl text-ink sm:text-3xl">Our Levels of Care</h2>
              <LevelsOfCare />
            </div>
          )}
        </div>

        {page.substances && (
          <div id="substances" className="mx-auto mt-14 max-w-4xl scroll-mt-8 lg:scroll-mt-20">
            <h2 className="mb-5 text-center text-2xl text-ink sm:text-3xl">Substances We Treat</h2>
            <SubstanceGrid />
          </div>
        )}

        {page.faqs && page.faqs.length > 0 && (
          <div id="faqs" className="mt-16 scroll-mt-8 lg:scroll-mt-20">
            <h2 className="mb-8 text-center text-2xl text-ink sm:text-3xl">Frequently Asked Questions</h2>
            <FAQ faqs={page.faqs} />
          </div>
        )}
      </Container>

      <CtaBanner {...(page.cta ?? {})} />
    </>
  );
}
