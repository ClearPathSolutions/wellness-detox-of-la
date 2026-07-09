import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { AdmissionsTimeline, InsuranceStrip } from "@/components/blocks";
import { ArrowRight, Button, Container, HeartIcon, SectionHeading, UsersIcon } from "@/components/ui";

const faqResources = [
  { label: "Substance Addiction FAQ", desc: "Questions about detox, withdrawal, and specific substances.", href: "/admissions/addiction-faq" },
  { label: "Admissions & Insurance FAQ", desc: "How admissions works, insurance verification, and costs.", href: "/admissions/insurance-admissions-faq" },
  { label: "Addiction Treatment FAQ", desc: "What treatment looks like, programs, therapies, and outcomes.", href: "/admissions/treatment-faq" },
];

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Starting treatment is simple at Wellness Detox of LA. Our confidential, compassionate admissions process guides you from the first call through arrival — 24/7.",
  alternates: { canonical: "/admissions" },
};

const faqs = [
  {
    q: "How do I get started?",
    a: "Call our admissions line any time. A specialist will listen to your situation, answer your questions, and walk you through the next steps — confidentially and without pressure.",
  },
  {
    q: "Will my insurance cover treatment?",
    a: "We work with most major insurance providers and will verify your benefits for you at no cost, explaining exactly what your plan covers for detox, residential, and mental health services.",
  },
  {
    q: "What should I bring on admission day?",
    a: "Once you're enrolled, we provide a clear pre-admission checklist so you know exactly what to bring and what to expect when you arrive.",
  },
  {
    q: "Is everything confidential?",
    a: "Yes. Every conversation and every detail you share is kept strictly confidential, in line with healthcare privacy standards.",
  },
];

export default function AdmissionsPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        crumb="Admissions"
        eyebrow="Admissions at Wellness Detox LA"
        title="Admissions made simple"
        intro="Beginning treatment can feel overwhelming — we make it as simple and stress-free as possible, guiding you with compassion and reliable information from the moment you reach out."
      />

      {/* Get help for */}
      <Container className="py-14 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-soft text-rose-dark">
              <HeartIcon width={22} height={22} />
            </span>
            <h2 className="text-xl text-ink">Get help for yourself</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Taking the first step takes courage. We&apos;ll meet you with understanding and a clear,
              judgment-free path forward.
            </p>
            <div className="mt-5">
              <Button href={site.phoneHref} size="sm">
                Call {site.phone}
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-soft text-rose-dark">
              <UsersIcon width={22} height={22} />
            </span>
            <h2 className="text-xl text-ink">Get help for a loved one</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Worried about someone you love? We&apos;ll help you understand the options and how to
              approach the conversation with care.
            </p>
            <div className="mt-5">
              <Button href="/contact" variant="outline" size="sm">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Process */}
      <section id="process" className="bg-sand/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Understanding the Process"
            title="Four simple steps to begin treatment"
            intro="Our admissions process is confidential, compassionate, and designed to support you from the moment you reach out."
            className="mb-10"
          />
          <AdmissionsTimeline />
        </Container>
      </section>

      <div id="insurance">
        <InsuranceStrip />
      </div>

      {/* FAQ */}
      <section id="faq" className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Answers to common questions"
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <h3 className="font-display text-base font-semibold text-ink">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>

          {/* Full FAQ resource library */}
          <div className="mt-12">
            <h3 className="text-xl text-ink sm:text-2xl">Everything you need to know before you begin</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Explore our detailed FAQ guides for clear, in-depth answers on addiction, admissions,
              insurance, and treatment.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {faqResources.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-rose hover:shadow-soft"
                >
                  <h4 className="font-display text-base font-semibold text-ink">{r.label}</h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-dark">
                    Read the FAQ
                    <ArrowRight width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
