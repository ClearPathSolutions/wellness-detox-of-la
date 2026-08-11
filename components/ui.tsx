import Link from "next/link";
import type { ReactNode, SVGProps } from "react";

/* --------------------------------- Layout -------------------------------- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/* --------------------------------- Button -------------------------------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Open in a new tab with a safe `rel`. For links that leave the site. */
  external?: boolean;
  /**
   * Attribution label for `tel:` / `mailto:` clicks, read by the delegated
   * listener in `components/Analytics.tsx`. Without it a link falls back to
   * header / footer / "body", which cannot distinguish the sticky mobile bar
   * from an in-page CTA — the comparison that actually informs layout work.
   */
  trackAs?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-transparent whitespace-nowrap";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-rose text-white shadow-card hover:bg-rose-dark hover:-translate-y-0.5",
  dark: "bg-ink text-white hover:bg-ink-700 hover:-translate-y-0.5",
  outline: "border border-ink/20 text-ink hover:border-rose hover:text-rose-dark",
  white: "bg-white text-ink shadow-card hover:-translate-y-0.5",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  trackAs,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  // tel:/mailto: and off-site URLs are plain anchors, not client-side routes.
  const isPlainAnchor =
    href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  if (isPlainAnchor) {
    return (
      <a
        href={href}
        className={cls}
        {...(trackAs ? { "data-call-location": trackAs } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ----------------------------- SectionHeading ---------------------------- */

/**
 * Eyebrow → heading → intro.
 *
 * This order was previously inverted (heading, then eyebrow beneath it as a
 * kicker). An eyebrow's whole job is to frame the heading *before* you read it —
 * placed after, it reads as an orphaned uppercase fragment, and a screen reader
 * announces the heading and then a stray label with no antecedent. It also made
 * the site internally inconsistent, because ContentPage rendered section
 * eyebrows the correct way round, so the same element sat on opposite sides of
 * the heading depending on which template drew the page.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const introColor = tone === "light" ? "text-white/75" : "text-muted";
  const eyebrowColor = tone === "light" ? "text-rose-soft" : "";
  return (
    <div className={`measure-wide ${alignCls} ${className}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${eyebrowColor}`}>{eyebrow}</p>}
      <h2 className={`t-h2 ${titleColor}`}>{title}</h2>
      {intro && <p className={`t-lead mt-4 ${introColor}`}>{intro}</p>}
    </div>
  );
}

/* -------------------------------- RichText ------------------------------- */

/**
 * Renders `[label](/path)` inside a content string as a real link.
 *
 * Content-page body copy is stored as plain strings, which meant no paragraph
 * anywhere on a treatment, admissions or area page could link to another page —
 * every internal link on those pages came from a nav widget. This is the minimum
 * that fixes it without opening an HTML injection path.
 *
 * Deliberately restrictive: only root-relative hrefs are honoured. Anything else
 * (`http:`, `javascript:`, protocol-relative) renders as literal text rather
 * than a link, so even if authoring later moves to a CMS this cannot emit an
 * off-site or scripted URL.
 */
/** Built per call: a module-level `/g` regex carries `lastIndex` between
 *  invocations, so a shared instance would skip matches on the second and
 *  subsequent paragraphs rendered in the same pass. */
const linkPattern = () => /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function RichText({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  const re = linkPattern();
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(children)) !== null) {
    if (m.index > last) parts.push(children.slice(last, m.index));
    parts.push(
      <Link
        key={`${m.index}-${m[2]}`}
        href={m[2]}
        className="font-medium text-rose-dark underline decoration-line underline-offset-2 transition-colors hover:decoration-rose"
      >
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < children.length) parts.push(children.slice(last));
  return <>{parts}</>;
}

/**
 * Width of the single reading column used by ContentPage and BlogPostView, and
 * by PageHero's `width="reading"` so the H1 lines up with the body beneath it.
 * Sized close to the prose measure — when the on-page nav was removed the old
 * 68rem column left paragraphs trailing off into a dead right-hand gutter.
 */
export const READING_WIDTH = "max-w-[48rem]";

/* --------------------------------- Prose --------------------------------- */

/**
 * Body copy at a controlled measure with consistent paragraph rhythm. Replaces
 * the `space-y-4 text-base leading-relaxed` incantation that was repeated, with
 * slightly different values, at every call site.
 */
export function Prose({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const color = tone === "light" ? "text-white/75" : "text-muted";
  return (
    <div className={`measure t-body space-y-4 ${color} ${className}`}>{children}</div>
  );
}

/* ------------------------------- Breadcrumb ------------------------------ */

export type Crumb = { label: string; href?: string };

/**
 * Renders the visible trail. Every level except the current page is a real
 * link — the previous version flattened intermediate levels into a single
 * unlinked string ("Treatment / Detox"), so a two-level trail had exactly one
 * working link and the middle level was invisible to both users and crawlers.
 *
 * The matching BreadcrumbList JSON-LD is emitted by `breadcrumbLd()` in
 * lib/seo.ts, driven off the same array so the two cannot drift.
 */
export function Breadcrumb({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const base = tone === "light" ? "text-white/70" : "text-muted";
  const hover = tone === "light" ? "hover:text-white" : "hover:text-rose-dark";
  const current = tone === "light" ? "text-white/90" : "text-ink-700";
  return (
    <nav aria-label="Breadcrumb" className={`mb-5 text-xs ${base}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !isLast ? (
                <Link href={c.href} className={`transition-colors ${hover}`}>
                  {c.label}
                </Link>
              ) : (
                <span className={isLast ? current : undefined} aria-current={isLast ? "page" : undefined}>
                  {c.label}
                </span>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------------------------------- Icons -------------------------------- */
/* Lightweight inline SVGs — no icon-library dependency. */

type IconProps = SVGProps<SVGSVGElement>;
const iconBase = (props: IconProps) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const PhoneIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
);

export const MapPinIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 8-4 12-9 12z" />
    <path d="M4 20c2-3 5-5 9-6" />
  </svg>
);

export const UsersIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const SparkIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const LinkedInIcon = (p: IconProps) => (
  <svg {...iconBase(p)}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
