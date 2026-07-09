import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getAdmissionsPage, admissionsSlugs } from "@/lib/data/admissions";

export function generateStaticParams() {
  return admissionsSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getAdmissionsPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription ?? page.intro,
    alternates: { canonical: `/admissions/${slug}` },
  };
}

export default async function AdmissionsSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getAdmissionsPage(slug);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
