import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { LEGAL_PATHS } from "@/lib/legal";
import { LegalPage } from "@/components/LegalPage";

const description = `Terms for text-message communications from ${site.name}: program description, cost, opt-out and privacy.`;

export const metadata: Metadata = {
  title: "SMS Terms",
  description,
  ...pageMeta({ path: LEGAL_PATHS.sms, title: `SMS Terms | ${site.name}`, description }),
};

export default function SmsTermsPage() {
  return <LegalPage doc="sms-terms" title="SMS Terms" />;
}
