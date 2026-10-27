import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { LEGAL_PATHS } from "@/lib/legal";
import { LegalPage } from "@/components/LegalPage";

const description = `How ${site.name} may use and disclose your health information, and how you can get access to it.`;

export const metadata: Metadata = {
  title: "Notice of Privacy Practices",
  description,
  ...pageMeta({ path: LEGAL_PATHS.npp, title: `Notice of Privacy Practices | ${site.name}`, description }),
};

export default function NoticeOfPrivacyPracticesPage() {
  return <LegalPage doc="notice-of-privacy-practices" title="Notice of Privacy Practices" />;
}
