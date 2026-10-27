import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { LEGAL_PATHS } from "@/lib/legal";
import { LegalPage } from "@/components/LegalPage";

const description = `The terms that govern your use of the ${site.name} website, including our website disclaimer.`;

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  ...pageMeta({ path: LEGAL_PATHS.terms, title: `Terms of Service | ${site.name}`, description }),
};

export default function TermsOfServicePage() {
  return <LegalPage doc="terms-of-service" title="Terms of Service" />;
}
