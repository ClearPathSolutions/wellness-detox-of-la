import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/blocks";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the licensed clinicians, medical professionals, and staff at Wellness Detox of LA — bringing 15+ years of trusted addiction treatment experience to every client.",
  alternates: { canonical: "/about/meet-the-team" },
};

type Member = { name: string; role: string; photo?: string };

const team: Member[] = [
  { name: "Janee Young, LMFT", role: "Clinical Director", photo: "/images/team-janee-young.webp" },
  { name: "Adrian Diaz, RADT", role: "Director of Operations", photo: "/images/team-adrian-diaz.webp" },
  { name: "Selin Simmonds", role: "Fitness Guru" },
  { name: "Crystal Clements", role: "Fitness Guru" },
];

function initials(name: string) {
  return name.replace(/,.*$/, "").split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export default function MeetTheTeamPage() {
  return (
    <>
      <PageHero
        crumb="Meet the Team"
        eyebrow="Meet the Team"
        title="The people who care for you"
        intro="Recovery begins with people who care. Our team of licensed clinicians, medical professionals, therapists, and dedicated support staff works together to ensure every client receives effective, individualized treatment."
      />

      <Container className="py-14 lg:py-20">
        <div className="mx-auto mb-12 max-w-3xl text-center text-muted">
          <p>
            As part of the Quadrant Health Group, our Los Angeles center is backed by more than
            15 years of leadership and proven results in addiction and mental health recovery. Every
            team member shares a single mission: to deliver exceptional care that transforms lives.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
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
                <h3 className="font-display text-lg font-semibold text-ink">{m.name}</h3>
                <p className="mt-0.5 text-sm text-rose-dark">{m.role}</p>
              </div>
            </div>
          ))}
          {/* Coming soon placeholders */}
          {[0, 1].map((i) => (
            <div key={`cs-${i}`} className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-cream p-8 text-center">
              <span className="font-display text-lg font-semibold text-muted">Coming Soon</span>
              <p className="mt-1 text-sm text-muted">More of our team, introduced soon.</p>
            </div>
          ))}
        </div>
      </Container>

      <CtaBanner title="Ready to work with a team that cares?" />
    </>
  );
}
