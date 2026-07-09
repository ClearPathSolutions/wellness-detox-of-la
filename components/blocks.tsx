import Image from "next/image";
import Link from "next/link";
import type { ReactElement, SVGProps } from "react";
import type { BulletGroup, GroupAccent, Stat, Subsection, SubsectionIcon } from "@/lib/content-types";
import {
  admissionSteps,
  featuredAreas,
  gallery,
  galleryCategories,
  moreAreas,
  principles,
  programs,
  site,
  substances,
  therapies,
} from "@/lib/site";
import {
  ArrowRight,
  Button,
  CheckIcon,
  ClockIcon,
  Container,
  HeartIcon,
  LeafIcon,
  MapPinIcon,
  ShieldIcon,
  SparkIcon,
  UsersIcon,
} from "./ui";

/* ------------------------------ Trust bar -------------------------------- */

export function TrustBar() {
  const items = [
    { icon: ShieldIcon, label: "State-Licensed", sub: site.license },
    { icon: ClockIcon, label: "24/7 Admissions", sub: "Confidential support" },
    { icon: SparkIcon, label: `${site.yearsExperience} Years`, sub: "Recovery experience" },
    { icon: HeartIcon, label: "Most Insurance", sub: "Accepted & verified" },
  ];
  return (
    <div className="border-y border-line bg-white/60">
      <Container className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 md:grid-cols-4">
        {items.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-rose-soft text-rose-dark">
              <Icon width={20} height={20} />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-sm font-semibold text-ink">{label}</span>
              <span className="block truncate text-xs text-muted">{sub}</span>
            </span>
          </div>
        ))}
      </Container>
    </div>
  );
}

/* ----------------------------- Program grid ------------------------------ */

const programIcons = [LeafIcon, HeartIcon, SparkIcon, ShieldIcon];
const programSlugs = ["detox", "residential", "dual-diagnosis", "aftercare"];

export function ProgramGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {programs.map((p, i) => {
        const Icon = programIcons[i % programIcons.length];
        return (
          <Link
            key={p.title}
            href={`/treatment/${programSlugs[i] ?? ""}`}
            className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:p-7"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-soft text-rose-dark transition-colors group-hover:bg-rose group-hover:text-white">
              <Icon width={22} height={22} />
            </span>
            <h3 className="text-xl text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
            <ul className="mt-4 space-y-2">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-center gap-2 text-sm text-ink-700">
                  <CheckIcon width={16} height={16} className="flex-shrink-0 text-rose-dark" />
                  {pt}
                </li>
              ))}
            </ul>
            <span className="mt-4 text-sm font-semibold text-rose-dark opacity-0 transition-opacity group-hover:opacity-100">
              Learn more →
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/* ---------------------------- Substance grid ----------------------------- */

const substanceSlugs: Record<string, string> = {
  Alcohol: "alcohol-addiction",
  Benzodiazepines: "benzo-addiction",
  Cocaine: "cocaine-addiction",
  Fentanyl: "fentanyl-addiction",
  Heroin: "heroin-addiction",
  Methamphetamine: "meth-addiction",
  Opioids: "opioid-addiction",
  "Prescription Drugs": "prescription-drug-addiction",
};

export function SubstanceGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {substances.map((s) => (
        <Link
          key={s}
          href={`/treatment/${substanceSlugs[s] ?? ""}`}
          className="group flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3.5 text-sm font-medium text-ink shadow-card transition-colors hover:border-rose"
        >
          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-rose transition-transform group-hover:scale-125" />
          {s}
        </Link>
      ))}
    </div>
  );
}

/* ----------------------------- Therapy grid ------------------------------ */

export function TherapyGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {therapies.map((t) => (
        <div
          key={t.title}
          className="rounded-2xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
        >
          <h3 className="font-display text-base font-semibold text-ink">{t.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.blurb}</p>
        </div>
      ))}
    </div>
  );
}

/* -------------------------- Admissions timeline -------------------------- */

export function AdmissionsTimeline() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {admissionSteps.map((s) => (
        <div key={s.step} className="relative rounded-2xl bg-white p-6 shadow-card">
          <span className="font-display text-4xl font-bold text-rose/25">{s.step}</span>
          <h3 className="mt-2 text-lg text-ink">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.blurb}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------- Principles grid ---------------------------- */

const principleIcons = [HeartIcon, ShieldIcon, SparkIcon, CheckIcon, LeafIcon];

export function PrinciplesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {principles.map((p, i) => {
        const Icon = principleIcons[i % principleIcons.length];
        return (
          <div key={p.title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-soft text-rose-dark">
              <Icon width={20} height={20} />
            </span>
            <h3 className="text-lg text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------- Areas served ------------------------------ */

export function AreasServed() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {featuredAreas.map((a) => (
          <div
            key={a}
            className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3.5 text-sm font-medium text-ink shadow-card"
          >
            <MapPinIcon width={17} height={17} className="flex-shrink-0 text-rose-dark" />
            {a}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {moreAreas.map((a) => (
          <span
            key={a}
            className="rounded-full border border-line bg-cream px-3.5 py-1.5 text-xs font-medium text-ink-700"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Gallery -------------------------------- */

export function Gallery({ limit }: { limit?: number }) {
  const imgs = limit ? gallery.slice(0, limit) : gallery;
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {imgs.map((g, i) => (
        <div
          key={g.src}
          className={`relative overflow-hidden rounded-2xl shadow-card ${
            i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={g.src}
            alt={g.alt}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

/* --------------------------- Tour gallery -------------------------------- */
/* Full facility tour, grouped into labeled sections like the live site. */

export function TourGallery() {
  return (
    <div className="space-y-14">
      {galleryCategories.map((cat) => (
        <div key={cat.label}>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-2xl text-ink sm:text-3xl">{cat.label}</h2>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {cat.images.map((g) => (
              <div
                key={g.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ CTA banner ------------------------------- */

export function CtaBanner({
  title = "Ready to begin healing? We're here to help.",
  intro = "Reaching out is the first step toward change. Speak with a caring admissions specialist today — confidentially and without pressure.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center sm:px-12 lg:py-20">
        <span className="eyebrow text-rose">Get Started Today</span>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">{intro}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={site.phoneHref} size="lg">
            Call {site.phone}
          </Button>
          <Button href="/admissions#insurance" variant="white" size="lg">
            Verify Your Insurance
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Split feature section ------------------------- */

export function SplitFeature({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  reverse = false,
  cta,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  cta?: { label: string; href: string };
}) {
  return (
    <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div className={reverse ? "lg:order-2" : ""}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">{children}</div>
        {cta && (
          <div className="mt-7">
            <Button href={cta.href} variant="dark">
              {cta.label}
              <ArrowRight width={17} height={17} />
            </Button>
          </div>
        )}
      </div>
      <div className={`relative ${reverse ? "lg:order-1" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-soft">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <span className="absolute -bottom-4 -right-2 hidden h-24 w-24 rounded-2xl bg-rose/15 sm:block lg:-right-4" />
      </div>
    </Container>
  );
}

/* --------------------------- Insurance strip ----------------------------- */

export function InsuranceStrip() {
  return (
    <section className="bg-rose-soft/60 px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow mb-3">Insurance &amp; Coverage</p>
            <h2 className="text-3xl text-ink sm:text-4xl">We work with most insurance providers</h2>
            <p className="mt-4 max-w-xl text-muted">
              Getting help should never feel out of reach. We work with most major insurance providers
              to make treatment as accessible and affordable as possible — and we&apos;ll verify your
              benefits for you, quickly and confidentially.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-700">
              {["Detox coverage", "Residential inpatient", "Mental health services", "Dual diagnosis"].map(
                (x) => (
                  <li key={x} className="flex items-center gap-2">
                    <CheckIcon width={16} height={16} className="text-rose-dark" />
                    {x}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-7 shadow-card">
            <ShieldIcon width={28} height={28} className="text-rose-dark" />
            <h3 className="mt-3 text-xl text-ink">Verify your benefits</h3>
            <p className="mt-2 text-sm text-muted">
              Send us your information and our team will confirm your coverage — no obligation.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Button href="/admissions#insurance" className="w-full">
                Verify Insurance
              </Button>
              <Button href={site.phoneHref} variant="outline" className="w-full">
                Call {site.phone}
              </Button>
            </div>
          </div>
        </div>

        {/* Accepted insurance carriers */}
        <div className="mt-10">
          <p className="mb-5 text-center font-display text-sm font-semibold uppercase tracking-wider text-ink-700">
            Providers we work with
          </p>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white p-5 shadow-card sm:p-8">
            <Image
              src="/images/Insurance-Visual-LA.png"
              alt="Insurance providers we work with, including United Healthcare, Aetna, Humana, Anthem, Blue Cross Blue Shield, Cigna, Ambetter, TRICARE, VA, and 35+ more"
              width={750}
              height={500}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Stat tiles ------------------------------- */

export function StatTiles({ stats }: { stats: Stat[] }) {
  const cols =
    stats.length === 1 ? "" : stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`mt-6 grid gap-4 ${cols}`}>
      {stats.map((s, i) => (
        <div key={i} className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="font-display text-4xl font-bold leading-none text-rose-dark">{s.value}</div>
          <div className="mt-2 text-sm font-medium text-ink-700">{s.label}</div>
          {s.source && (
            <div className="mt-3 border-t border-line pt-2 text-xs text-muted">Source: {s.source}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------- Category groups ---------------------------- */

const GROUP_ACCENTS: Record<GroupAccent, { border: string; dot: string; label: string }> = {
  rose: { border: "border-l-rose", dot: "bg-rose", label: "text-rose-dark" },
  ink: { border: "border-l-ink", dot: "bg-ink", label: "text-ink" },
  tan: { border: "border-l-[#b98a63]", dot: "bg-[#b98a63]", label: "text-ink-700" }, // one permitted arbitrary value, NOT a token
};
const ACCENT_CYCLE: GroupAccent[] = ["rose", "ink", "tan"];

export function CategoryGroups({ groups }: { groups: BulletGroup[] }) {
  const cols = groups.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`mt-5 grid gap-4 ${cols}`}>
      {groups.map((g, i) => {
        const a = GROUP_ACCENTS[g.accent ?? ACCENT_CYCLE[i % ACCENT_CYCLE.length]];
        return (
          <div
            key={i}
            className={`rounded-2xl border border-line ${a.border} border-l-4 bg-white p-5 shadow-card sm:p-6`}
          >
            <h3 className={`mb-3 flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-wide ${a.label}`}>
              <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${a.dot}`} />
              {g.label}
            </h3>
            <ul className="space-y-2.5">
              {g.items.map((it, k) => (
                <li key={k} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                  <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${a.dot}`} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------- Withdrawal timeline -------------------------- */

export function WithdrawalTimeline({ phases }: { phases: BulletGroup[] }) {
  return (
    <ol className="mt-6 md:flex md:items-stretch">
      {phases.map((p, i) => {
        const last = i === phases.length - 1;
        return (
          <li key={i} className="flex gap-4 md:block md:flex-1">
            {/* rail: circle + connector — vertical on mobile, horizontal on md+ */}
            <div className="flex flex-col items-center md:flex-row md:items-center">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-rose font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              {!last && (
                <span aria-hidden className="mt-2 w-px flex-1 bg-line md:ml-3 md:mt-0 md:h-px md:w-auto md:flex-1" />
              )}
            </div>
            {/* content */}
            <div className="pb-8 md:mt-4 md:pb-0 md:pr-4">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-rose-dark">{p.label}</h3>
              {p.meta && (
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                  <ClockIcon width={13} height={13} className="text-rose-dark" />
                  {p.meta}
                </p>
              )}
              <ul className="mt-3 space-y-2">
                {p.items.map((it, k) => (
                  <li key={k} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose/60" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* --------------------------- Subsection cards ---------------------------- */

type IconCmp = (props: SVGProps<SVGSVGElement>) => ReactElement;
const SUBSECTION_ICON_MAP: Record<SubsectionIcon, IconCmp> = {
  shield: ShieldIcon, clock: ClockIcon, heart: HeartIcon, check: CheckIcon,
  leaf: LeafIcon, users: UsersIcon, spark: SparkIcon,
};
const SUBSECTION_ICON_CYCLE: SubsectionIcon[] = ["shield", "clock", "heart", "check"];

export function SubsectionCards({ items }: { items: Subsection[] }) {
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {items.map((ss, j) => {
        const Icon = SUBSECTION_ICON_MAP[ss.icon ?? SUBSECTION_ICON_CYCLE[j % SUBSECTION_ICON_CYCLE.length]];
        return (
          <div
            key={j}
            className="group rounded-2xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
          >
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-soft text-rose-dark transition-colors group-hover:bg-rose group-hover:text-white">
              <Icon width={20} height={20} />
            </span>
            <h3 className="font-display text-base font-semibold text-ink">{ss.heading}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{ss.body}</p>
          </div>
        );
      })}
    </div>
  );
}
