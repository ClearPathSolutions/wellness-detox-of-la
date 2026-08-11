import Image from "next/image";
import { breadcrumbLd, crumbsFrom } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  Breadcrumb,
  Button,
  ClockIcon,
  Container,
  PhoneIcon,
  READING_WIDTH,
  ShieldIcon,
} from "./ui";

/**
 * Standard page header: breadcrumb → eyebrow → H1 → standfirst → actions.
 *
 * Notes on the composition, because two earlier attempts got it wrong:
 *
 * 1. The eyebrow renders *before* the H1. It used to come after, which put the
 *    framing label below the thing it frames. Same fix as `SectionHeading`.
 *
 * 2. `crumb` is the flat `"Parent / Leaf"` string the content files already
 *    store, expanded here into a linked trail plus BreadcrumbList JSON-LD.
 *
 * 3. `actions` exists because only the six area pages carry a hero image — the
 *    other 27 content pages were a tinted band holding nothing but three short
 *    text elements, centred in a column half the viewport wide. It read as an
 *    unfinished placeholder. The action row gives the band a base, fills it with
 *    something useful rather than decorative, and puts the phone number above
 *    the fold on every treatment and admissions page.
 *
 * A blurred rose circle used to sit at `-top-20 right-1/4`. At this band height
 * it rendered as a faint smudge in the empty right-hand third — read as a
 * printing artefact rather than a deliberate mark. Removed.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
  bg,
  width = "wide",
  actions = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** `"Treatment / Detox"` — expanded into Home → Treatment → Detox. */
  crumb?: string;
  /** Full-bleed dark hero variant. Re-check text contrast against any new image. */
  bg?: string;
  /**
   * `"reading"` matches the centred column used by ContentPage and
   * BlogPostView, so the H1 lines up with the body text beneath it. `"wide"`
   * keeps the full shell for pages whose next section is full-bleed.
   */
  width?: "wide" | "reading";
  /** Show the call / verify-insurance row and the reassurance line under it. */
  actions?: boolean;
}) {
  const crumbs = crumbsFrom(crumb);
  const reading = width === "reading";
  const inner = reading ? `mx-auto ${READING_WIDTH}` : "";
  // In the `wide` variant nothing else constrains the line length, so the H1 and
  // standfirst carry their own caps. In `reading` the wrapper already does it,
  // and doubling up would narrow them further.
  const titleWidth = reading ? "" : "max-w-4xl";
  const introWidth = reading ? "" : "measure-wide";

  const schema = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbLd(crumbs)).replace(/</g, "\\u003c"),
      }}
    />
  );

  const actionRow = actions ? (
    <>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button href={site.phoneHref} size="lg" trackAs="page-hero">
          <PhoneIcon width={18} height={18} />
          Call {site.phone}
        </Button>
        <Button href="/admissions/verify-your-insurance" variant="outline" size="lg">
          Verify Your Insurance
        </Button>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-2">
          <ShieldIcon width={16} height={16} className="text-rose-dark" />
          100% confidential
        </span>
        <span className="flex items-center gap-2">
          <ClockIcon width={16} height={16} className="text-rose-dark" />
          Admissions open 24/7
        </span>
      </div>
    </>
  ) : null;

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
            {eyebrow && <p className="eyebrow mb-3 text-rose-soft">{eyebrow}</p>}
            <h1 className={`t-h1 ${titleWidth} text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.65)]`}>
              {title}
            </h1>
            {intro && (
              <p className={`t-lead ${introWidth} mt-5 text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]`}>
                {intro}
              </p>
            )}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative border-b border-line bg-sand/40">
      {schema}
      <Container className="py-12 lg:py-16">
        <div className={inner}>
          <Breadcrumb items={crumbs} />
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className={`t-h1 ${titleWidth} text-ink`}>{title}</h1>
          {intro && <p className={`t-lead ${introWidth} mt-5 text-muted`}>{intro}</p>}
          {actionRow}
        </div>
      </Container>
    </section>
  );
}
