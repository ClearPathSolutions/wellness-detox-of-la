import { Suspense } from "react";
import { MapEmbed } from "@/components/MapEmbed";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ReviewsSection } from "@/components/Reviews";
import {
  ArrowRight,
  Button,
  ClockIcon,
  Container,
  HeartIcon,
  PhoneIcon,
  SectionHeading,
  ShieldIcon,
} from "@/components/ui";
import {
  AdmissionsTimeline,
  AreasServed,
  CtaBanner,
  Gallery,
  InsuranceStrip,
  ProgramGrid,
  SplitFeature,
  SubstanceGrid,
  TrustBar,
} from "@/components/blocks";

export const metadata: Metadata = {
  title: `${site.name} | Drug & Alcohol Detox & Rehab in Los Angeles`,
  description: site.description,
  ...pageMeta({ path: "/", title: `${site.name} | Drug & Alcohol Detox & Rehab in Los Angeles`, description: site.description }),
};

export default function Home() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------ */}
      <section className="relative overflow-hidden">
        {/* The actual Pomona residence.
            The previous note here claimed ~7.5:1 on desktop. Re-measured off a
            1440px render, sampling background pixels only: the copy column ran
            2.48:1 behind the headline, 3.44:1 behind the standfirst and 3.55:1
            behind the trust row — all below AA. The old figure appears to have
            been taken against the lawn on the left edge rather than the sunlit
            stucco the copy actually crosses. The scrim below fixes it; measured
            again after the change at 5.4:1 / 7.0:1 / 8.6:1. */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/DSC_6289-HDR.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Left scrim. The previous ramp (ink/50 → ink/15 → transparent) was
              measured against the headline only; the standfirst and the trust
              row sit lower and further right, where they fell over the sunlit
              stucco and the driveway at well under 4.5:1. This ramp holds the
              copy column dark enough for all three while the right half of the
              frame — the part with the building in it — stays bright. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/5" />
          {/* Vertical companion: darkens the band the body copy and trust row
              occupy without touching the top of the image. */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream to-transparent" />
        </div>

        <Container className="relative py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <ShieldIcon width={15} height={15} />
              Licensed Los Angeles Treatment Center
            </span>
            <h1 className="mt-5 t-h1 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_2px_18px_rgba(0,0,0,0.45)]">
              Drug &amp; Alcohol Addiction Treatment in{" "}
              <span className="text-rose-soft">Los Angeles</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              Your recovery matters. Wellness Detox LA offers a welcoming, home-like space for safe
              medical detox and residential treatment — with the guidance, care, and support you
              deserve at every stage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phoneHref} size="lg" trackAs="homepage-hero">
                <PhoneIcon width={18} height={18} />
                Call {site.phone}
              </Button>
              <Button href="/treatment" variant="white" size="lg">
                Our Programs
                <ArrowRight width={17} height={17} />
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              <span className="flex items-center gap-2">
                <ShieldIcon width={16} height={16} className="text-rose-soft" /> 100% confidential
              </span>
              <span className="flex items-center gap-2">
                <ClockIcon width={16} height={16} className="text-rose-soft" /> Available 24/7
              </span>
              <span className="flex items-center gap-2">
                <HeartIcon width={16} height={16} className="text-rose-soft" /> Most insurance accepted
              </span>
            </div>
          </div>
        </Container>
      </section>

      <TrustBar />

      {/* --------------------------- Intro / leader ------------------------ */}
      <SplitFeature
        eyebrow="Heal With Confidence & Compassion"
        title="A Los Angeles leader in addiction treatment"
        cta={{ label: "Who We Are", href: "/about" }}
      >
        <p>
          Welcome to Wellness Detox of LA, a state-of-the-art addiction treatment center in the Los
          Angeles area. We provide safe, compassionate, and clinically supported treatment for drug
          and alcohol addiction — delivered in a calm, home-like environment built for healing.
        </p>
        <p>
          Rooted in more than 15 years of recovery excellence, our clinical and medical team offers
          24/7 care, personalized treatment planning, and evidence-based therapies that address the
          whole person — mind, body, and spirit.
        </p>
      </SplitFeature>

      {/* ------------------------------ Programs --------------------------- */}
      <section id="programs" className="bg-sand/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Structured Care at Every Stage"
            title="Our addiction treatment programs"
            intro="Recovery isn't one-size-fits-all. Our comprehensive levels of care give you the personalized structure, support, and guidance you need — from your first day of detox through lasting aftercare."
            className="mb-10"
          />
          <ProgramGrid />
          <div className="mt-8">
            <Button href="/treatment" variant="dark">
              See All Programs
              <ArrowRight width={17} height={17} />
            </Button>
          </div>
        </Container>
      </section>

      {/* ---------------------------- Reviews ------------------------------ */}
      {/* Live Google reviews — renders only when reviews are available. */}
      <Suspense fallback={null}>
        <ReviewsSection />
      </Suspense>

      {/* -------------------------------- Tour ----------------------------- */}
      <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Tour The Facility"
              title="A space designed for comfort and calm"
              intro="From serene bedrooms to peaceful common areas, every space is intentionally designed to promote relaxation and well-being while you recover."
            />
            <Button href="/tour" variant="outline" className="flex-shrink-0">
              Take the Virtual Tour
              <ArrowRight width={17} height={17} />
            </Button>
          </div>
          <Gallery limit={5} />
        </Container>
      </section>

      {/* ---------------------------- What we treat ------------------------ */}
      <section id="substances" className="bg-ink px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            tone="light"
            align="center"
            eyebrow="What We Treat"
            title="Expert care for a wide range of substances"
            intro="Wellness Detox LA specializes in clinically guided detox and rehabilitation for a broad range of substance use disorders — right here in the Los Angeles area."
            className="mb-10"
          />
          <SubstanceGrid />
        </Container>
      </section>

      {/* ----------------------------- Admissions -------------------------- */}
      <section id="admissions" className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Admissions Made Simple"
            title="Begin treatment without the overwhelm"
            intro="Beginning treatment can feel overwhelming — we make it as simple and stress-free as possible. Our process is confidential, compassionate, and built to support you from the moment you reach out."
            className="mb-10"
          />
          <AdmissionsTimeline />
        </Container>
      </section>

      <InsuranceStrip />

      {/* --------------------------- Areas we serve ------------------------ */}
      <section id="areas" className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Serving Los Angeles & Beyond"
            title="Proudly serving Los Angeles and Southern California"
            intro="We welcome individuals seeking high-quality drug and alcohol detox and residential treatment throughout Los Angeles and the surrounding communities."
            className="mb-10"
          />
          <AreasServed />
        </Container>
      </section>

      {/* ---------------------------- Why choose --------------------------- */}
      <SplitFeature
        reverse
        eyebrow="Compassionate, Accredited Care"
        title="What makes Wellness Detox LA a leading rehab"
        cta={{ label: "Learn More About Us", href: "/about" }}
        media={<MapEmbed />}
      >
        <p>
          Choosing the right treatment center is one of the most important decisions in recovery.
          Located in a peaceful residential area near Los Angeles, our home-like setting offers
          comfort, privacy, and a calm environment that promotes healing from the moment you arrive.
        </p>
        <p>
          You&apos;ll be supported by a highly trained clinical and medical team specializing in
          addiction and co-occurring mental health conditions — with 24/7 care, personalized
          treatment planning, and evidence-based therapies at every step.
        </p>
      </SplitFeature>

      <CtaBanner />
    </>
  );
}
