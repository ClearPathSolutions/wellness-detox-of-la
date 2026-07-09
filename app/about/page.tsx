import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { CtaBanner, SplitFeature, TrustBar } from "@/components/blocks";
import { ArrowRight, Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2025, Wellness Detox LA brings the proven quality and compassion of the Quadrant Health Group to Los Angeles — backed by 15+ years of recovery experience.",
  alternates: { canonical: "/about" },
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
          As part of one of the nation&apos;s most respected treatment networks, our Los Angeles center
          provides medically supervised detox, residential inpatient care, and personalized treatment
          for those beginning their recovery journey.
        </p>
        <p>
          Every program reflects the Quadrant Health Group&apos;s long-standing values: safety,
          integrity, and lasting transformation — delivered in a calm, restorative environment.
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
          Our programs are led by licensed professionals specializing in substance use disorders and
          co-occurring mental health conditions. We offer medical detox, residential treatment, dual
          diagnosis support, and evidence-based therapies designed to help clients stabilize safely.
        </p>
        <p>
          Our approach includes proven modalities such as CBT, DBT, trauma-informed care, relapse
          prevention planning, family involvement, and holistic support — with a personalized
          treatment plan for every client.
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
                <h3 className="flex items-center gap-2 text-xl text-ink">
                  {l.label}
                  <ArrowRight width={18} height={18} className="text-rose-dark transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l.blurb}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            {site.license} · Expires {site.licenseExpires} · Part of the {site.network}
          </p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
