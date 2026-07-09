import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { blogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Addiction Recovery Blog",
  description:
    "Helpful insights on addiction, mental health, treatment options, and life in recovery — written to support individuals and families across Los Angeles.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <PageHero
        crumb="Blog"
        eyebrow="Wellness LA Blog"
        title="Insights for your recovery journey"
        intro="Our blog brings together helpful insights on addiction, mental health, treatment options, and life in recovery — written to support individuals and families across Los Angeles as they navigate healing with clarity and confidence."
      />

      <Container className="py-14 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.hero}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow mb-2 text-[0.65rem]">{post.displayDate}</p>
                <h2 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-rose-dark">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <span className="mt-4 text-sm font-semibold text-rose-dark">Read article →</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
