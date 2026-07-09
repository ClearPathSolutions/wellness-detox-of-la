import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
  bg,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumb?: string;
  bg?: string; // optional full-bleed background image (dark hero variant)
}) {
  if (bg) {
    return (
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0">
          <Image src={bg} alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent" />
        </div>
        <Container className="relative py-16 lg:py-24">
          <nav className="mb-4 flex items-center gap-2 text-xs text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            {crumb && (
              <>
                <span aria-hidden>/</span>
                <span className="text-white/90">{crumb}</span>
              </>
            )}
          </nav>
          {eyebrow && (
            <p className="mb-3 font-display text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-rose-soft">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-4xl leading-[1.1] text-white sm:text-5xl [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.65)]">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">{intro}</p>}
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-line bg-sand/40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-rose/10 blur-3xl"
      />
      <Container className="relative py-14 lg:py-20">
        <nav className="mb-4 flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-rose-dark">
            Home
          </Link>
          {crumb && (
            <>
              <span aria-hidden>/</span>
              <span className="text-ink-700">{crumb}</span>
            </>
          )}
        </nav>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl leading-[1.1] text-ink sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
      </Container>
    </section>
  );
}
