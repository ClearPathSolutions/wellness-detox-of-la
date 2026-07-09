import { Suspense } from "react";
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
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------ */}
      <section className="relative overflow-hidden">
        {/* Southern California coast backdrop */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/nature-wide.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* light left scrim — keeps the photo bright/visible (not an opaque veil),
              just enough contrast for the copy; fades into the page below */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream to-transparent" />
        </div>

        <Container className="relative py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <ShieldIcon width={15} height={15} />
              Licensed Los Angeles Treatment Center
            </span>
            <h1 className="mt-5 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem] [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_2px_18px_rgba(0,0,0,0.45)]">
              Drug &amp; Alcohol Addiction Treatment in{" "}
              <span className="text-rose-soft">Los Angeles</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              Your recovery matters. Wellness Detox LA offers a welcoming, home-like space for safe
              medical detox and residential treatment — with the guidance, care, and support you
              deserve at every stage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phoneHref} size="lg">
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
        image="/images/DSC_6257-HDR.webp"
        imageAlt="Bright, welcoming shared common area inside the Wellness Detox of LA facility"
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
        image="/images/DJI_20250325105814_0096_D.webp"
        imageAlt="Aerial view of the Wellness Detox of LA property with the San Gabriel Mountains beyond"
        cta={{ label: "Learn More About Us", href: "/about" }}
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
