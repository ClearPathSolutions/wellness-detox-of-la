import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import ClarionBlog from "@/components/ClarionBlog";
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

      {/* Latest posts — authored and managed in the Clarion dashboard. */}
      <Container className="py-14 lg:py-20">
        <ClarionBlog />
      </Container>

      {/* Earlier articles from the original site, preserved alongside the new
          Clarion-managed posts. These still render at their root-level URLs. */}
      <section className="border-t border-line bg-sand/30">
        <Container className="py-14 lg:py-20">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-3">From the archive</p>
            <h2 className="font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              Earlier articles
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              A collection of guides and insights published on our previous site, kept here for anyone still finding them helpful.
            </p>
          </div>

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
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-rose-dark">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <span className="mt-4 text-sm font-semibold text-rose-dark">Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
