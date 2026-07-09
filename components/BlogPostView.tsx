import Image from "next/image";
import Link from "next/link";
import { Marked } from "marked";
import type { BlogPost } from "@/lib/data/blog";
import { site } from "@/lib/site";
import { uniqueSlug } from "@/lib/slug";
import { CtaBanner } from "./blocks";
import { JumpNav, type JumpNavItem } from "./JumpNav";
import { ArrowRight, Container } from "./ui";

const PHONE = "866-591-0888";
const PHONE_TEL = "+18665910888";
const HEADING_SCROLL_MT = "scroll-mt-8 lg:scroll-mt-20"; // unify with ContentPage targets

function renderPost(body: string): { html: string; toc: JumpNavItem[] } {
  const toc: JumpNavItem[] = [];
  const seen = new Set<string>();
  const md = new Marked({ gfm: true, breaks: false });

  md.use({
    renderer: {
      // v14.1.4: heading receives a token object; this.parser renders inline children.
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        const text = inner.replace(/<[^>]+>/g, "").trim();
        const id = uniqueSlug(text, seen);
        if (depth === 2) toc.push({ id, label: text }); // H2-only nav (keeps the bar short)
        return `<h${depth} id="${id}" class="${HEADING_SCROLL_MT}">${inner}</h${depth}>`;
      },
      // Auto-promote the phone CTA line to a callout (unique token → no false positives).
      paragraph({ tokens }) {
        const inner = this.parser.parseInline(tokens);
        if (inner.includes(PHONE)) {
          const linked = inner.replace(
            new RegExp(PHONE, "g"),
            `<a href="tel:${PHONE_TEL}">${PHONE}</a>`
          );
          return `<p class="prose-callout--phone">${linked}</p>`;
        }
        return `<p>${inner}</p>`;
      },
    },
  });

  const html = md.parse(body) as string;
  return { html, toc };
}

export function BlogPostView({ post }: { post: BlogPost }) {
  const { html, toc } = renderPost(post.body);
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd).replace(/</g, "\\u003c") }}
      />
      <article>
        <Container className="pt-10 lg:pt-14">
          <nav className="mb-5 flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-rose-dark">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-rose-dark">Blog</Link>
          </nav>
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-3">{post.displayDate}</p>
            <h1 className="text-3xl leading-tight text-ink sm:text-4xl">{post.title}</h1>
          </div>
          <div className="relative mx-auto mt-8 aspect-[16/8] max-w-4xl overflow-hidden rounded-[1.75rem] shadow-soft">
            <Image src={post.hero} alt={post.title} fill priority sizes="(max-width: 1024px) 100vw, 896px" className="object-cover" />
          </div>
        </Container>

        <JumpNav items={toc} />

        <Container className="py-12 lg:py-16">
          <div className="prose mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mx-auto mt-12 max-w-3xl border-t border-line pt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 font-display font-semibold text-rose-dark">
              <ArrowRight width={16} height={16} className="rotate-180" />
              Back to all articles
            </Link>
          </div>
        </Container>
      </article>

      <CtaBanner title="Ready to take the first step?" intro="Our admissions team is available 24/7 to answer your questions, verify insurance, and help you begin recovery." />
    </>
  );
}
