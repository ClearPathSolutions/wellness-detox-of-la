import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { CtaBanner, PrinciplesGrid, SplitFeature } from "@/components/blocks";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Wellness Detox of LA — a new Los Angeles treatment center built on 15+ years of recovery excellence through the Quadrant Health Group.",
  alternates: { canonical: "/about/our-story" },
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        crumb="Our Story"
        eyebrow="Our Story"
        title="A new facility built on experience and proven results"
        intro="Wellness Detox of LA is a new Los Angeles treatment center built on more than 15 years of recovery excellence through the Quadrant Health Group."
      />

      <SplitFeature
        eyebrow="The Wellness Detox LA Story"
        title="Transforming recovery in Los Angeles with decades of expertise"
        image="/images/DSC_6116-HDR.webp"
        imageAlt="A warm, comfortable common area inside the Wellness Detox of LA facility"
        cta={{ label: "See Our Programs", href: "/treatment" }}
      >
        <p>
          Wellness Detox LA was created to provide safe, compassionate, and clinically grounded care
          for people struggling with drug and alcohol addiction. Our approach is rooted in dignity,
          empathy, and individualized treatment.
        </p>
        <p>
          We combine evidence-based practices with whole-person healing — addressing the physical,
          emotional, and mental dimensions of addiction — so every client has the strongest possible
          foundation for lasting recovery.
        </p>
      </SplitFeature>

      {/* Founders */}
      <Container className="pb-4 pt-2 lg:pb-8">
        <figure className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-cream px-8 py-12 text-center shadow-card sm:px-12">
          <p className="eyebrow mb-4">From Our Founders</p>
          <blockquote className="font-display text-2xl leading-snug text-ink sm:text-[1.75rem]">
            &ldquo;When we first began building the Quadrant Health Network, our vision was simple:
            to make recovery humane and deeply personal.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted">
            <span className="font-display font-semibold text-ink">Louis &amp; Joey</span>
            <span className="mx-2" aria-hidden>·</span>
            Founders of the {site.network}
          </figcaption>
        </figure>
      </Container>

      <section id="principles" className="bg-sand/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Our Core Principles"
            title="The values that guide every decision we make"
            intro="Five guiding principles shape the care we provide and the culture we've built."
            className="mb-10"
          />
          <PrinciplesGrid />
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3">Our Vision for the Future</p>
          <h2 className="text-3xl text-ink sm:text-4xl">Recovery that lasts, for every person we serve</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            We envision a Los Angeles where quality addiction treatment is accessible, compassionate,
            and effective. As we grow, our commitment stays the same: to meet each person with
            respect, deliver clinical excellence, and build the support systems that sustain recovery
            for life.
          </p>
          <p className="mt-6 text-sm text-muted">
            {site.license} · Expires {site.licenseExpires} · Part of the {site.network}
          </p>
        </div>
      </Container>

      <CtaBanner />
    </>
  );
}
