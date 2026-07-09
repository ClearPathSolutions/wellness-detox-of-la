import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumb="Privacy Policy" title="Privacy Policy" />
      <Container className="py-14 lg:py-20">
        <div className="mx-auto max-w-2xl space-y-6 text-muted leading-relaxed [&_h2]:pt-2 [&_h2]:text-xl [&_h2]:text-ink">
          <p>
            {site.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting
            your privacy. This policy explains how we collect, use, and safeguard the information you
            share with us.
          </p>
          <h2>Information we collect</h2>
          <p>
            We collect the information you voluntarily provide — such as your name, phone number,
            email, and any details you share when you contact us or request insurance verification.
            We may also collect standard, non-identifying analytics data about how visitors use our
            website.
          </p>
          <h2>How we use your information</h2>
          <p>
            Your information is used solely to respond to your inquiries, verify insurance benefits,
            coordinate care, and improve our services. We do not sell your personal information.
          </p>
          <h2>Confidentiality</h2>
          <p>
            All health-related communications are treated as strictly confidential in accordance with
            applicable healthcare privacy laws, including HIPAA where applicable.
          </p>
          <h2>Contact</h2>
          <p>
            If you have any questions about this policy or your information, contact us at{" "}
            <a href={`mailto:${site.email}`} className="text-rose-dark underline">
              {site.email}
            </a>{" "}
            or {site.phone}.
          </p>
          <p className="text-sm">This policy may be updated from time to time.</p>
        </div>
      </Container>
    </>
  );
}
