import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CtaBanner, TourGallery } from "@/components/blocks";
import {
  CheckIcon,
  Container,
  LeafIcon,
  MapPinIcon,
  SectionHeading,
  ShieldIcon,
  SparkIcon,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Tour the Facility",
  description:
    "Explore Wellness Detox of LA — from serene bedrooms to bright common areas and peaceful outdoor spaces, our home-like facility is designed to promote comfort, calm, and healing.",
  alternates: { canonical: "/tour" },
};

const amenities = [
  "Private & semi-private bedrooms with fresh linens",
  "Chef-inspired meals & a fully stocked kitchen",
  "Bright, comfortable shared living rooms",
  "Landscaped outdoor spaces & patios",
  "Flat-screen TVs and Wi-Fi throughout",
  "24/7 on-site medical & support staff",
  "Housekeeping and laundry provided",
  "Gated, private, and secure grounds",
];

const highlights = [
  { icon: LeafIcon, title: "Home-like comfort", blurb: "A calm, residential setting that feels safe and familiar from day one." },
  { icon: SparkIcon, title: "Bright, restful spaces", blurb: "Renovated common areas, kitchens, and rooms designed for relaxation." },
  { icon: ShieldIcon, title: "Private & secure", blurb: "A gated, peaceful property that protects your privacy while you heal." },
];

export default function TourPage() {
  return (
    <>
      <PageHero
        crumb="Tour"
        eyebrow="Tour The Facility"
        title="A space intentionally designed for healing"
        intro="From serene bedrooms to peaceful outdoor areas, our facility is designed to promote relaxation and well-being throughout treatment. Explore the spaces that help clients feel safe, supported, and at home."
      />

      {/* Overview + amenities */}
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Step Inside</p>
            <h2 className="text-3xl text-ink sm:text-4xl">Recovery in a real home, not a hospital</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Wellness Detox LA is set in a spacious, beautifully renovated residence in a quiet
                Southern California neighborhood. Instead of clinical hallways, you&apos;ll find warm
                common rooms, sunlit bedrooms, a full kitchen, and green outdoor spaces — a calm,
                private environment where you can focus entirely on getting well.
              </p>
              <p>
                Every detail, from the comfortable furnishings to the landscaped grounds, is chosen
                to help clients feel safe, cared for, and at home from the very first day.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink">What&apos;s inside</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {amenities.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <CheckIcon width={17} height={17} className="mt-0.5 flex-shrink-0 text-rose-dark" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Full photo tour */}
      <section className="bg-sand/50 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <SectionHeading
            eyebrow="Photo Tour"
            title="Explore the space, room by room"
            intro="Take a look inside our outdoor areas, shared living spaces, and bedrooms."
            className="mb-10"
          />
          <TourGallery />
        </Container>
      </section>

      <Container className="py-14 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, blurb }) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-soft text-rose-dark">
                <Icon width={20} height={20} />
              </span>
              <h3 className="text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Location / travel proximity */}
      <section className="bg-ink px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Container className="px-0">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 font-display text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-rose-soft">
                Location & Access
              </p>
              <h2 className="text-3xl text-white sm:text-4xl">
                Recovery in a calm setting, close to major travel routes
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/75">
                Our residential facility sits in a quiet, established neighborhood in Pomona — far
                enough from the noise of the city to feel restful, yet easy to reach for clients
                traveling from across Los Angeles, Southern California, and beyond.
              </p>
              <div className="mt-7 space-y-4">
                {[
                  { place: "Ontario International Airport", detail: "About 15 minutes away" },
                  { place: "Los Angeles International (LAX)", detail: "Under an hour by car" },
                  { place: "Major freeways (I-10 / SR-71)", detail: "Just minutes from the facility" },
                ].map((row) => (
                  <div key={row.place} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-rose-soft">
                      <MapPinIcon width={18} height={18} />
                    </span>
                    <span>
                      <span className="block font-display text-sm font-semibold text-white">{row.place}</span>
                      <span className="block text-sm text-white/70">{row.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-white/70">
                Traveling for care? Our admissions team helps coordinate airport transportation and
                arrival so the transition into treatment is smooth and stress-free.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-soft">
              <Image
                src="/images/DJI_20250325105848_0098_D.webp"
                alt="Aerial view of the Wellness Detox of LA neighborhood with the San Gabriel Mountains in the distance"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner title="Come see the difference for yourself" intro="Have questions about our facility or programs? Our admissions team is here to help you take the next step." />
    </>
  );
}
