import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { InsuranceForm } from "@/components/InsuranceForm";
import { CtaBanner } from "@/components/blocks";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Verify Your Insurance",
  description:
    "Find out what your insurance covers for addiction treatment at Wellness Detox of LA. Fast, confidential benefits verification — we handle it directly with your provider.",
  alternates: { canonical: "/admissions/verify-your-insurance" },
};

const steps = [
  { n: "01", title: "Send Us Your Information", body: "Fill out our secure, confidential insurance form or call our admissions team directly. We only use your details to check your coverage, nothing else." },
  { n: "02", title: "We Contact Your Provider", body: "Our verification specialists speak with your insurance company on your behalf to confirm your benefits and gather accurate, up-to-date information." },
  { n: "03", title: "We Review Your Benefits", body: "Our team evaluates what services are covered under your plan and identifies any deductibles, co-pays, or out-of-pocket costs, if any." },
  { n: "04", title: "We Guide You Through Your Options", body: "Once your coverage is confirmed, we explain everything clearly and help you understand the treatment options that fit your insurance benefits." },
];

export default function VerifyInsurancePage() {
  return (
    <>
      <PageHero
        crumb="Admissions / Verify Insurance"
        eyebrow="Insurance & Coverage"
        title="Find Out What Your Insurance Covers for Addiction Treatment"
        intro="Understanding your insurance coverage should be straightforward and stress-free. We verify your benefits directly with your provider and explain everything in clear language — no surprises, no confusion, and no pressure."
      />

      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Steps */}
          <div>
            <h2 className="text-2xl text-ink sm:text-3xl">How insurance verification works</h2>
            <div className="mt-6 space-y-5">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="font-display text-2xl font-bold text-rose/30">{s.n}</span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-rose-soft/60 p-6">
              <h3 className="font-display text-lg font-semibold text-ink">We accept most insurances</h3>
              <p className="mt-2 text-sm text-muted">
                We partner with most major insurance companies to make treatment accessible and
                affordable. If you prefer to verify over the phone, call us anytime at{" "}
                <a href={site.phoneHref} className="font-semibold text-rose-dark">{site.phone}</a>.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="mb-4 text-2xl text-ink sm:text-3xl">Check your coverage</h2>
            <InsuranceForm />
          </div>
        </div>
      </Container>

      <CtaBanner
        title="Prefer to verify over the phone?"
        intro="Our admissions team can confirm your benefits in just a few minutes, confidentially and with no obligation."
      />
    </>
  );
}
