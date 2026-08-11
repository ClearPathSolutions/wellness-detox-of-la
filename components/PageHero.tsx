import Image from "next/image";
import { breadcrumbLd, crumbsFrom } from "@/lib/seo";
import { Breadcrumb, Container } from "./ui";

/**
 * Standard page header: breadcrumb → eyebrow → H1 → standfirst.
 *
 * Two things changed here beyond styling:
 *
 * 1. The eyebrow used to render *after* the H1, putting the framing label below
 *    the thing it frames. See the note on `SectionHeading` — same fix, page level.
 *
 * 2. `crumb` is still the flat `"Parent / Leaf"` string the content files
 *    already store, but it is now expanded into a real trail: intermediate
 *    levels become links, and the matching BreadcrumbList JSON-LD is emitted
 *    from the same array. Previously the whole string rendered as one unlinked
 *    span, so a page three levels deep exposed exactly one working link and no
 *    structured data at all.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
  bg,
  width = "wide",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** `"Treatment / Detox"` — expanded into Home → Treatment → Detox. */
  crumb?: string;
  /** Full-bleed dark hero variant. Re-check text contrast against any new image. */
  bg?: string;
  /**
   * `"reading"` matches the 68rem centred column used by ContentPage and
   * BlogPostView, so the H1 lines up with the body text beneath it. `"wide"`
   * keeps the full shell for pages whose next section is full-bleed.
   */
  width?: "wide" | "reading";
}) {
  const crumbs = crumbsFrom(crumb);
  const inner = width === "reading" ? "mx-auto max-w-[68rem]" : "";

  const schema = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbLd(crumbs)).replace(/</g, "\\u003c"),
      }}
    />
  );

  if (bg) {
    return (
      <section className="relative overflow-hidden border-b border-line">
        {schema}
        <div aria-hidden className="absolute inset-0">
          <Image
            src={bg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent" />
        </div>
        <Container className="relative py-16 lg:py-24">
          <div className={inner}>
            <Breadcrumb items={crumbs} tone="light" />
            {eyebrow && (
              <p className="eyebrow mb-3 text-rose-soft">{eyebrow}</p>
            )}
            <h1 className="t-h1 max-w-4xl text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.65)]">
              {title}
            </h1>
            {intro && (
              <p className="t-lead measure-wide mt-5 text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
                {intro}
              </p>
            )}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-line bg-sand/40">
      {schema}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-rose/10 blur-3xl"
      />
      <Container className="relative py-14 lg:py-20">
        <div className={inner}>
          <Breadcrumb items={crumbs} />
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="t-h1 max-w-4xl text-ink">{title}</h1>
          {intro && (
            <p className="t-lead measure-wide mt-5 text-muted">{intro}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
