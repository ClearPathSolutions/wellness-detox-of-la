import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getTreatmentPage, treatmentSlugs } from "@/lib/data/treatment";

export function generateStaticParams() {
  return treatmentSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getTreatmentPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription ?? page.intro,
    alternates: { canonical: `/treatment/${slug}` },
  };
}

export default async function TreatmentSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getTreatmentPage(slug);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
