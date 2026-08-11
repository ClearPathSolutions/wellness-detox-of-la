import Image from "next/image";
import Link from "next/link";
import { Marked } from "marked";
import type { BlogPost } from "@/lib/data/blog";
import { site } from "@/lib/site";
import { uniqueSlug } from "@/lib/slug";
import { breadcrumbLd, crumbsFrom } from "@/lib/seo";
import { CtaBanner } from "./blocks";
import { ArrowRight, Breadcrumb, Container, READING_WIDTH } from "./ui";

const HEADING_SCROLL_MT = "scroll-mt-24 lg:scroll-mt-36"; // unify with ContentPage targets

/** Decode the handful of HTML entities `marked` emits in inline content. */
function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    )
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** Escape a string for safe use inside a RegExp (the phone number has dashes). */
function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderPost(body: string): { html: string } {
  const seen = new Set<string>();
  const md = new Marked({ gfm: true, breaks: false });

  md.use({
    renderer: {
      // v14.1.4: heading receives a token object; this.parser renders inline children.
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        // `parseInline` returns HTML, so entities are still encoded. Stripping
        // tags alone left `&#39;` / `&quot;` in the nav label, which React then
        // escaped again — the TOC was literally showing "Brain&#39;s".
        // Ids are still emitted so headings remain deep-linkable.
        const text = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim();
        const id = uniqueSlug(text, seen);
        return `<h${depth} id="${id}" class="${HEADING_SCROLL_MT}">${inner}</h${depth}>`;
      },
      // Auto-promote the phone CTA line to a callout (unique token → no false positives).
      paragraph({ tokens }) {
        const inner = this.parser.parseInline(tokens);
        if (inner.includes(site.phone)) {
          const linked = inner.replace(
            new RegExp(escapeRe(site.phone), "g"),
            `<a href="${site.phoneHref}">${site.phone}</a>`,
          );
          return `<p class="prose-callout--phone">${linked}</p>`;
        }
        return `<p>${inner}</p>`;
      },
    },
  });

  const html = md.parse(body) as string;
  return { html };
}

export function BlogPostView({ post }: { post: BlogPost }) {
  const { html } = renderPost(post.body);
  const blogLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.hero}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/images/icon-512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/${post.slug}` },
  };
  // Same trail treatment as every other page, including the JSON-LD the
  // hand-rolled two-link nav here never emitted.
  const crumbs = crumbsFrom(`Blog / ${post.title}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(crumbs)).replace(/</g, "\\u003c"),
        }}
      />
      <article>
        <Container className="pt-10 lg:pt-14">
          <div className={`mx-auto ${READING_WIDTH}`}>
            <Breadcrumb items={crumbs} />
            <div>
              <p className="eyebrow mb-3">{post.displayDate}</p>
              <h1 className="t-h1 text-ink">{post.title}</h1>
              <p className="t-lead mt-5 text-muted">{post.excerpt}</p>
            </div>
            <div className="relative mt-9 aspect-[16/8] overflow-hidden rounded-[1.75rem] shadow-soft">
              <Image
                src={post.hero}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>

        <Container className="py-12 lg:py-20">
          <div className={`mx-auto ${READING_WIDTH}`}>
            <div className="min-w-0">
              {/* SAFETY: `html` comes from `marked` over post bodies authored as
                  first-party template literals in lib/data/blog.ts. There is no user
                  or third-party input path, so the output is trusted and unsanitised.
                  If authoring ever moves to a CMS, form, or any external source, add
                  a sanitiser (rehype-sanitize / DOMPurify) BEFORE that change ships. */}
              <div
                className="prose measure"
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <div className="measure mt-12 border-t border-line pt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-display font-semibold text-rose-dark"
                >
                  <ArrowRight width={16} height={16} className="rotate-180" />
                  Back to all articles
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </article>

      <CtaBanner
        title="Ready to take the first step?"
        intro="Our admissions team is available 24/7 to answer your questions, verify insurance, and help you begin recovery."
      />
    </>
  );
}
