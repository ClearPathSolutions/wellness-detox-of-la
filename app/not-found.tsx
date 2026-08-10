import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowRight, Button, Container, PhoneIcon } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/**
 * Branded 404.
 *
 * This site replaced a WordPress install, so old inbound links and stale search
 * results will land here. Somebody who reaches a dead end while looking for
 * treatment should still find a phone number and the pages they were after —
 * never a bare framework error.
 */
const destinations = [
  { label: "Treatment Programs", href: "/treatment", blurb: "Detox, residential, dual diagnosis, and aftercare." },
  { label: "Admissions", href: "/admissions", blurb: "How to begin, and what to expect." },
  { label: "Verify Your Insurance", href: "/admissions/verify-your-insurance", blurb: "Confidential benefits check, no obligation." },
  { label: "Tour the Facility", href: "/tour", blurb: "See the bedrooms, common areas, and grounds." },
  { label: "Areas We Serve", href: "/about/areas-we-serve", blurb: "Los Angeles and Southern California." },
  { label: "Recovery Blog", href: "/blog", blurb: "Guidance for individuals and families." },
];

export default function NotFound() {
  return (
    <Container className="py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-3">Error 404</p>
        <h1 className="text-3xl text-ink sm:text-4xl">We couldn&apos;t find that page</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          The page you&apos;re looking for may have moved or no longer exists. If you&apos;re trying
          to reach someone about treatment, our admissions team is available right now — 24/7 and
          completely confidential.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={site.phoneHref} size="lg">
            <PhoneIcon width={18} height={18} />
            Call {site.phone}
          </Button>
          <Button href="/" variant="outline" size="lg">
            Back to Home
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-4xl">
        <h2 className="mb-5 text-center font-display text-sm font-semibold uppercase tracking-wider text-muted">
          Or try one of these
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group rounded-2xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-rose hover:shadow-soft"
            >
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                {d.label}
                <ArrowRight
                  width={15}
                  height={15}
                  className="text-rose-dark transition-transform group-hover:translate-x-0.5"
                />
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
