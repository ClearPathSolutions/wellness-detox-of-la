import type { Faq } from "@/components/FAQ";

export type SubsectionIcon =
  | "shield" | "clock" | "heart" | "check" | "leaf" | "users" | "spark";

export type Subsection = {
  heading: string;
  body: string;
  icon?: SubsectionIcon; // NEW — optional; cards cycle a default icon when omitted
};

export type GroupAccent = "rose" | "ink" | "tan";

export type BulletGroup = {
  label: string;
  items: string[];
  accent?: GroupAccent; // NEW — category-card accent; auto-cycles when omitted
  meta?: string;        // NEW — timeline phase duration, e.g. "6–24 hours" (used only when groupsDisplay==="timeline")
};

// A cited statistic. Plain strings only (serializable).
export type Stat = {
  value: string;   // display string, formatting preserved: "74,000", "50x", "40%+", "29.5M"
  label: string;
  /** Attribution text, e.g. "NIDA, 2023". */
  source?: string;
  /**
   * Link for `source`. When present the attribution renders as an anchor.
   *
   * Deliberately left unset until a real citation is supplied for each figure:
   * on a YMYL medical page a link that does not actually support the number is
   * worse than plain attribution text. Populate alongside `source`.
   */
  sourceUrl?: string;
};

export type PageSection = {
  heading?: string;
  eyebrow?: string;
  body?: string[]; // paragraphs
  bullets?: string[]; // bullet list rendered with check marks
  subsections?: Subsection[]; // labeled cards
  groups?: BulletGroup[]; // titled sub-lists (e.g. Physical / Behavioral / Psychological)
  stats?: Stat[]; // NEW — additive tiles under this section's prose
  groupsDisplay?: "cards" | "timeline"; // NEW — how `groups` render; undefined = cards (today's look)
};

export type ContentPageData = {
  slug: string; // path after the section, e.g. "detox" or "verify-your-insurance"
  metaTitle: string;
  metaDescription?: string;
  eyebrow?: string;
  h1: string;
  intro?: string;
  hero?: string; // image path in /public
  crumb: string; // breadcrumb label
  sections: PageSection[];
  levelsOfCare?: boolean; // show the 4 program links
  substances?: boolean; // show the substance grid
  faqs?: Faq[];
  /** Renders a lead-capture form before the closing CTA. Used on the two
   *  "Get Help" pages, where the review asked for a submission box. */
  form?: "contact";
  cta?: { title?: string; intro?: string };
};

export type { Faq };
