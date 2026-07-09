import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import {
  CtaBanner,
  InsuranceStrip,
  ProgramGrid,
  SubstanceGrid,
  TherapyGrid,
} from "@/components/blocks";
import {
  Container,
  HeartIcon,
  LeafIcon,
  SectionHeading,
  SparkIcon,
  UsersIcon,
} from "@/components/ui";

const pillars = [
  { icon: HeartIcon, title: "Body", blurb: "Medically supervised detox and physical stabilization restore health and give the body a safe foundation to heal." },
  { icon: SparkIcon, title: "Mind", blurb: "Evidence-based therapy addresses the thoughts, emotions, and mental-health conditions beneath addiction." },
  { icon: UsersIcon, title: "Relationships", blurb: "Group and family work rebuild trust, communication, and the support systems that sustain recovery." },
  { icon: LeafIcon, title: "Spirit", blurb: "Holistic and mindfulness practices reconnect you with meaning, purpose, and a sense of inner calm." },
];

export const metadata: Metadata = {
  title: "Treatment Programs",
  description:
    "Medical detox, residential inpatient, dual diagnosis, and aftercare — plus evidence-based therapies for a wide range of substances at Wellness Detox of LA.",
  alternates: { canonical: "/treatment" },
};

export default function TreatmentPage() {
  return (
    <>
      <PageHero
        crumb="Treatment"
        eyebrow="Addiction Treatment in Los Angeles"
        title="A safer, stronger beginning to your new life"
        intro="Our approach is built on clinical expertise and evidence-based practices — combining medical detox, residential treatment, and behavioral therapies to support every stage of recovery."
      />

      {/* Integrated whole-person approach */}
      <section className="bg-sand/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="An integrated approach to recovery"
            intro="Addiction affects the whole person, so we treat the whole person. Our care brings together four dimensions of healing — because lasting recovery depends on all of them working together."
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, blurb }) => (
              <div key={title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-soft text-rose-dark">
                  <Icon width={22} height={22} />
                </span>
                <h3 className="text-lg text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Programs */}
      <section id="programs" className="px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Structured Care at Every Stage"
            title="Our addiction treatment programs"
            intro="Comprehensive levels of care that give you the personalized structure, support, and guidance you need — from detox through lasting aftercare."
            className="mb-10"
          />
          <ProgramGrid />
        </Container>
      </section>

      {/* Substances */}
      <section id="substances" className="bg-ink px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            tone="light"
            align="center"
            eyebrow="What We Treat"
            title="Substances we treat at Wellness Detox LA"
            intro="Clinically guided detox and rehabilitation for a broad range of substance use disorders, right here in the Los Angeles area."
            className="mb-10"
          />
          <SubstanceGrid />
        </Container>
      </section>

      {/* Therapies */}
      <section id="therapies" className="bg-sand/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Therapies & Treatment Methods"
            title="Clinical, evidence-based care for every stage of recovery"
            intro="We pair proven clinical therapies with holistic, whole-person support so healing reaches the mind, body, and spirit."
            className="mb-10"
          />
          <TherapyGrid />
        </Container>
      </section>

      <InsuranceStrip />
      <CtaBanner title="Take the first step toward recovery today" />
    </>
  );
}
