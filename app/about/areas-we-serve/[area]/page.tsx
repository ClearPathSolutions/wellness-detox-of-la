import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getAreaPage, areaSlugs } from "@/lib/data/areas";

export function generateStaticParams() {
  return areaSlugs.map((area) => ({ area }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const page = getAreaPage(area);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription ?? page.intro,
    alternates: { canonical: `/about/areas-we-serve/${area}` },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const page = getAreaPage(area);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
