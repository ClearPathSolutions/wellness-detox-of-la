import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { CtaBanner, SplitFeature, TrustBar } from "@/components/blocks";
import { ArrowRight, Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2025, Wellness Detox LA brings the Quadrant Health Group's care to Los Angeles, backed by 15+ years of recovery experience.",
  ...pageMeta({ path: "/about", title: "About Us", description: "Founded in 2025, Wellness Detox LA brings the Quadrant Health Group's care to Los Angeles, backed by 15+ years of recovery experience." }),
};

const links = [
  { label: "Our Story", href: "/about/our-story", blurb: "How Wellness Detox LA came to be, and the values that guide us." },
  { label: "Meet the Team", href: "/about/meet-the-team", blurb: "The clinicians and staff who make recovery possible." },
  { label: "Areas We Serve", href: "/about/areas-we-serve", blurb: "Communities across Los Angeles and Southern California." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About Wellness Detox LA"
        title="Leading Drug & Alcohol Detox & Rehab Center in Los Angeles, CA"
        intro="Founded in 2025, Wellness Detox LA was established to bring the proven quality and compassion of the Quadrant Health Group to the heart of Los Angeles — backed by more than 15 years of experience in addiction recovery."
      />

      <TrustBar />

      <SplitFeature
        eyebrow="A New Chapter in Recovery"
        title="Backed by 15 years of experience"
        image="/images/DSC_6218-HDR.webp"
        imageAlt="The gated Spanish-style exterior of the Wellness Detox of LA facility in Pomona"
        cta={{ label: "Read Our Story", href: "/about/our-story" }}
      >
        <p>
          Our Los Angeles center is part of the Quadrant Health Group. We provide medically
          supervised detox, residential inpatient care, and treatment planned around the person —
          for anyone at the start of recovery.
        </p>
        <p>
          Three values run through every program: safety, integrity, and change that lasts. The
          setting is calm and restorative, because that is what makes them possible.
        </p>
      </SplitFeature>

      <SplitFeature
        reverse
        eyebrow="Expert Clinical Care"
        title="Evidence-based addiction treatment"
        image="/images/DSC_6296-HDR.webp"
        imageAlt="Bright, relaxed common area inside the Wellness Detox of LA facility"
        cta={{ label: "See How We Help", href: "/treatment" }}
      >
        <p>
          Licensed professionals lead every program. They specialize in substance use disorders and
          the mental health conditions that often come with them. We offer medical detox, residential
          treatment, dual diagnosis support, and proven therapies to help you stabilize safely.
        </p>
        <p>
          The methods are proven ones: CBT, DBT, trauma-informed care, relapse prevention, family
          involvement, and whole-person support. Every client gets their own treatment plan.
        </p>
      </SplitFeature>

      <section className="bg-sand/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading eyebrow="Explore" title="Get to know Wellness Detox LA" className="mb-10" />
          <div className="grid gap-5 sm:grid-cols-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group rounded-2xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <h3 className="flex items-center gap-2 t-h3 text-ink">
                  {l.label}
                  <ArrowRight width={18} height={18} className="text-rose-dark transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l.blurb}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            {site.license} · Expires {site.licenseExpires} · Part of the <a
              href={site.networkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 transition-colors hover:text-rose-dark"
            >
              {site.network}
            </a>
          </p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
