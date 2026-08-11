import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/blocks";
import { Container } from "@/components/ui";
import { facilityTeam, initials, regionalTeam, type TeamMember } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the licensed clinicians and medical staff at Wellness Detox of LA, backed by 15+ years of addiction treatment experience.",
  ...pageMeta({ path: "/about/meet-the-team", title: "Meet the Team", description: "Meet the licensed clinicians and medical staff at Wellness Detox of LA, backed by 15+ years of addiction treatment experience." }),
};

function MemberCard({ m }: { m: TeamMember }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="relative aspect-[4/5] bg-rose-soft">
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-4xl font-semibold text-rose-dark/60">{initials(m.name)}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="t-h3 text-ink">{m.name}</h3>
        <p className="mt-0.5 text-sm text-rose-dark">{m.role}</p>
      </div>
    </div>
  );
}

export default function MeetTheTeamPage() {
  return (
    <>
      <PageHero
        crumb="About / Meet the Team"
        eyebrow="Meet the Team"
        title="The people who care for you"
        intro="Recovery begins with people who care. Our team of licensed clinicians, medical professionals, therapists, and dedicated support staff works together to ensure every client receives effective, individualized treatment."
      />

      <Container className="py-14 lg:py-20">
        <div className="mx-auto mb-12 max-w-3xl text-center text-muted">
          <p>
            As part of the{" "}
            <a
              href={site.networkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 transition-colors hover:text-rose-dark"
            >
              {site.network}
            </a>
            , our Los Angeles center is backed by more than
            15 years of leadership and proven results in addiction and mental health recovery. Every
            team member shares a single mission: to deliver exceptional care that transforms lives.
          </p>
        </div>

        <h2 className="mb-6 t-h2 text-ink">Our Pomona Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilityTeam.map((m) => (
            <MemberCard key={m.slug} m={m} />
          ))}
        </div>

        {/* Regional leadership — scope stated so these roles are never read as
            Pomona-exclusive; each remit spans several Southern California centers. */}
        <div className="mt-16">
          <h2 className="t-h2 text-ink">Southern California Leadership</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Quadrant Health Group leaders who support Wellness Detox of LA alongside our other
            Southern California treatment centers, overseeing clinical programming, nursing, and case
            management across the region.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {regionalTeam.map((m) => (
              <MemberCard key={m.slug} m={m} />
            ))}
          </div>
        </div>
      </Container>

      <CtaBanner title="Ready to work with a team that cares?" />
    </>
  );
}
