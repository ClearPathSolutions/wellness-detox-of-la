import type { ContentPageData } from "@/lib/content-types";
import { treatmentPrograms } from "./treatment-programs";
import { treatmentTherapies } from "./treatment-therapies";
import { treatmentSubstances } from "./treatment-substances";

export const treatmentPages: ContentPageData[] = [
  ...treatmentPrograms,
  ...treatmentSubstances,
  ...treatmentTherapies,
];

export function getTreatmentPage(slug: string): ContentPageData | undefined {
  return treatmentPages.find((p) => p.slug === slug);
}

export const treatmentSlugs = treatmentPages.map((p) => p.slug);
