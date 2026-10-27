import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { LEGAL_PATHS } from "@/lib/legal";
import { LegalPage } from "@/components/LegalPage";

const description = `How ${site.name} collects, uses, discloses and protects information submitted through this website or shared with our team.`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  ...pageMeta({ path: LEGAL_PATHS.privacy, title: `Privacy Policy | ${site.name}`, description }),
};

export default function PrivacyPage() {
  return <LegalPage doc="privacy-policy" title="Privacy Policy" />;
}
