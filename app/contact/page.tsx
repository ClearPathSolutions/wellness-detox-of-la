import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { ClockIcon, Container, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach out to Wellness Detox of LA. Call 866-591-0888 or send a confidential message and our admissions team will help you take the next step toward recovery.",
  alternates: { canonical: "/contact" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}&output=embed`;

export default function ContactPage() {
  const details = [
    { icon: PhoneIcon, label: "Call us 24/7", value: site.phone, href: site.phoneHref },
    { icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPinIcon, label: "Visit", value: site.address.full, href: undefined },
    { icon: ClockIcon, label: "Availability", value: "Admissions open 24 hours a day", href: undefined },
  ];

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Reach Out Today"
        title="Your journey to wellness starts today"
        intro="If you or a loved one is struggling with drug or alcohol addiction and/or mental health challenges, our treatment team is here to help — confidentially and without pressure."
      />

      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1.1fr] lg:py-20">
        {/* Details */}
        <div>
          <h2 className="text-2xl text-ink">Write us directly</h2>
          <p className="mt-3 text-muted">
            Fill out the form and our admissions team will contact you shortly to answer questions,
            verify insurance, and help you take the next step toward treatment.
          </p>

          <div className="mt-8 space-y-4">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-card">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-rose-soft text-rose-dark">
                  <Icon width={20} height={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
                  {href ? (
                    <a href={href} className="font-display font-semibold text-ink transition-colors hover:text-rose-dark">
                      {value}
                    </a>
                  ) : (
                    <p className="font-display font-semibold text-ink">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-line shadow-card">
            <iframe
              title={`Map to ${site.name}`}
              src={mapSrc}
              width="100%"
              height="260"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </div>
          <p className="mt-4 text-xs text-muted">
            {site.license} · Expires {site.licenseExpires}
          </p>
        </div>

        {/* Form */}
        <div>
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
