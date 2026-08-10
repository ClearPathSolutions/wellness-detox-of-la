import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
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
    ...pageMeta({
      path: `/treatment/${slug}`,
      title: page.metaTitle,
      description: page.metaDescription ?? page.intro,
      ...(page.hero ? { image: { url: page.hero, alt: page.h1 } } : {}),
    }),
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
