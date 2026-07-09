"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { Button, ChevronDown, CloseIcon, MenuIcon, PhoneIcon, ShieldIcon } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close the mobile menu on route change. Derived during render (per React's
  // "you might not need an effect" guidance) rather than in a useEffect.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Shadow / blur once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar — desktop only */}
      <div className="hidden lg:block bg-ink text-white/75">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-2 text-xs">
          <span className="flex items-center gap-2">
            <ShieldIcon width={14} height={14} className="text-rose" />
            State-Licensed Treatment · {site.license}
          </span>
          <span className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
              {site.email}
            </a>
            <span className="text-white/25">|</span>
            <span>{site.address.full}</span>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-cream/90 shadow-[0_2px_20px_-8px_rgba(35,39,47,0.25)] backdrop-blur-md"
            : "bg-cream/80 backdrop-blur-sm lg:bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-6 lg:h-20 lg:px-8">
          <Logo />

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) =>
              item.groups ? (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:text-rose-dark"
                  >
                    {item.label}
                    <ChevronDown
                      width={14}
                      height={14}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  </Link>
                  {/* Dropdown */}
                  <div className="invisible absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="flex gap-6 rounded-2xl border border-line bg-white p-5 shadow-soft">
                      {item.groups.map((g) => (
                        <div key={g.heading} className="min-w-[11rem]">
                          <p className="eyebrow mb-2 text-[0.65rem]">{g.heading}</p>
                          <ul className="space-y-1">
                            {g.items.map((c) => (
                              <li key={c.label}>
                                <Link
                                  href={c.href}
                                  className="block rounded-lg px-2 py-1.5 text-sm text-ink-700 transition-colors hover:bg-rose-soft hover:text-rose-dark"
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-rose-dark ${
                    pathname === item.href ? "text-rose-dark" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink transition-colors hover:text-rose-dark"
            >
              <PhoneIcon width={16} height={16} className="text-rose-dark" />
              {site.phone}
            </a>
            <Button href="/admissions#insurance" size="sm">
              Verify Insurance
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose text-white shadow-card transition-transform active:scale-95"
            >
              <PhoneIcon width={18} height={18} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors active:bg-ink/5"
            >
              {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — fades/slides vertically (never horizontally, so it can
          not create horizontal overflow while off-state). */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-cream transition-[opacity,transform] duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-6" aria-label="Mobile">
          {nav.map((item) =>
            item.groups ? (
              <div key={item.label} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                  aria-expanded={expanded === item.label}
                  className="flex w-full items-center justify-between py-4 text-left font-display text-lg font-semibold text-ink"
                >
                  {item.label}
                  <ChevronDown
                    className={`text-rose-dark transition-transform duration-200 ${
                      expanded === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    expanded === item.label ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <Link
                      href={item.href}
                      className="mb-2 block text-sm font-semibold text-rose-dark"
                    >
                      View {item.label} overview →
                    </Link>
                    {item.groups.map((g) => (
                      <div key={g.heading} className="mb-3">
                        <p className="eyebrow mb-1.5 text-[0.6rem]">{g.heading}</p>
                        <ul className="space-y-0.5">
                          {g.items.map((c) => (
                            <li key={c.label}>
                              <Link
                                href={c.href}
                                className="block py-1.5 text-[0.95rem] text-ink-700"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="border-b border-line py-4 font-display text-lg font-semibold text-ink"
              >
                {item.label}
              </Link>
            )
          )}

          <div className="mt-6 flex flex-col gap-3">
            <Button href={site.phoneHref} size="lg" className="w-full">
              <PhoneIcon width={18} height={18} />
              Call {site.phone}
            </Button>
            <Button href="/admissions#insurance" variant="dark" size="lg" className="w-full">
              Verify Your Insurance
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            {site.license} · Expires {site.licenseExpires}
          </p>
        </nav>
      </div>
    </header>
  );
}
