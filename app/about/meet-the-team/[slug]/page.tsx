import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/blocks";
import { Container } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { facilityTeam, initials, regionalTeam, type TeamMember } from "@/lib/data/team";

/**
 * Per-person staff pages.
 *
 * Only people with approved bio copy get a page — `bio` is the gate. The team
 * data has always carried `slug` "reserved for per-person pages" and stored
 * full bio paragraphs the cards never rendered; this is that route. Anyone
 * without a bio keeps their card and simply has no page, so a thin stub can
 * never ship by accident.
 */
const ALL: TeamMember[] = [...facilityTeam, ...regionalTeam];
const withBio = ALL.filter((m) => m.bio?.length);

/**
 * Network-wide staff whose bio is published verbatim on quadranthealthgroup.com
 * and on every other Quadrant facility site. Those copies point their canonical
 * at the parent so the 13 near-identical pages consolidate into one rather than
 * competing with each other.
 */
const CANONICAL_AT_PARENT: Record<string, string> = {
  "pamela-tambini": "https://www.quadranthealthgroup.com/team/pamela-tambini/",
};

export function generateStaticParams() {
  return withBio.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = withBio.find((x) => x.slug === slug);
  if (!m) return {};
  const description = m.bio?.[0]?.slice(0, 155) ?? "";
  const meta: Metadata = {
    title: `${m.name} — ${m.role}`,
    description,
    ...pageMeta({
      path: `/about/meet-the-team/${m.slug}`,
      title: `${m.name} — ${m.role}`,
      description,
      image: m.photo ? { url: m.photo, alt: m.name } : undefined,
    }),
  };
  const parent = CANONICAL_AT_PARENT[m.slug];
  if (parent) meta.alternates = { canonical: parent };
  return meta;
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = withBio.find((x) => x.slug === slug);
  if (!m) notFound();

  return (
    <>
      <PageHero title={m.name} eyebrow={m.role} />
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-14">
            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-rose-soft shadow-card">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-5xl font-semibold text-rose-dark/60">
                      {initials(m.name)}
                    </span>
                  </div>
                )}
              </div>
              <Link
                href="/about/meet-the-team"
                className="mt-6 inline-block text-sm font-medium text-rose-dark underline underline-offset-4"
              >
                ← Back to the team
              </Link>
            </div>
            <div className="space-y-5">
              {m.bio?.map((p, i) => (
                <p key={i} className="t-body text-ink/80">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
