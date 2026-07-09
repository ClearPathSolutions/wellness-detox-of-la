import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/blocks";
import {
  ArrowRight,
  CheckIcon,
  ClockIcon,
  Container,
  MapPinIcon,
  SectionHeading,
  UsersIcon,
} from "@/components/ui";
import { areaList } from "@/lib/data/areas";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Wellness Detox of LA provides drug & alcohol detox and residential treatment across Los Angeles, Pomona, North Hollywood, Burbank, Orange County, and Southern California.",
  alternates: { canonical: "/about/areas-we-serve" },
};

const additional = [
  "Pasadena", "Glendale", "Long Beach", "Santa Monica", "Torrance", "Beverly Hills",
  "Culver City", "Orange County", "West Covina", "El Monte", "Arcadia", "Alhambra",
  "Inglewood", "Whittier", "San Gabriel Valley", "La Puente", "Huntington Park",
  "Redondo Beach", "Manhattan Beach", "Riverside County", "Irvine", "Santa Ana", "Garden Grove",
];

export default function AreasWeServePage() {
  return (
    <>
      <PageHero
        crumb="Areas We Serve"
        eyebrow="Your local partner in recovery"
        title="Areas We Serve"
        intro="Wellness Detox LA provides addiction treatment, medical detox, and dual diagnosis care to clients throughout Los Angeles County and Southern California — with convenient access and coordinated travel support."
      />

      <Container className="py-14 lg:py-20">
        <SectionHeading
          eyebrow="Primary Areas"
          title="Communities we proudly serve"
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areaList.map((a) => (
            <Link
              key={a.slug}
              href={`/about/areas-we-serve/${a.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-rose hover:shadow-soft"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-soft text-rose-dark">
                  <MapPinIcon width={18} height={18} />
                </span>
                <span className="font-display font-semibold text-ink">
                  {/County|California/.test(a.name) ? a.name : `${a.name}, CA`}
                </span>
              </span>
              <ArrowRight width={16} height={16} className="text-rose-dark transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted">
            Additional Communities Served
          </h3>
          <div className="flex flex-wrap gap-2">
            {additional.map((a) => (
              <span key={a} className="rounded-full border border-line bg-cream px-3.5 py-1.5 text-sm text-ink-700">
                {a}, CA
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* Coordinated travel & admissions support */}
      <section className="bg-sand/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Traveling for Care"
            title="Coordinated travel & admissions support"
            intro="Whether you're local or traveling from out of the area, our team makes getting to treatment simple. Our facility is approximately 40 minutes from LAX and just minutes from major freeways."
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPinIcon, title: "Travel Assistance & Planning", blurb: "Help arranging safe, timely travel to our facility from wherever you are." },
              { icon: ClockIcon, title: "Airport Transportation", blurb: "Coordinated pickup and transportation from the airport to the facility." },
              { icon: CheckIcon, title: "Pre-Admission & Insurance", blurb: "Insurance verification and pre-admission planning handled before you arrive." },
              { icon: UsersIcon, title: "Family Communication", blurb: "Ongoing updates that keep loved ones informed and involved throughout care." },
            ].map(({ icon: Icon, title, blurb }) => (
              <div key={title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-soft text-rose-dark">
                  <Icon width={20} height={20} />
                </span>
                <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner title="Wherever you're coming from, we'll help you get here" intro="Our admissions team provides personalized travel and pre-admission support so you can arrive safely and focus fully on recovery." />
    </>
  );
}
