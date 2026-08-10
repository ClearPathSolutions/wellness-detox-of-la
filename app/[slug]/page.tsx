import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/BlogPostView";
import { getPost, postSlugs } from "@/lib/data/blog";

// Root-level blog post URLs, preserved 1:1 from the original WordPress site.
export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    ...pageMeta({
      path: `/${slug}`,
      title: post.title,
      description: post.excerpt,
      type: "article",
      image: { url: post.hero, alt: post.title },
      publishedTime: post.date,
    }),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
