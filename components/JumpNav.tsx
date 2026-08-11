"use client";

import { useEffect, useState } from "react";

export type JumpNavItem = { id: string; label: string };

/**
 * Scroll-spy shared by both presentations below.
 *
 * Only one of the two is ever in the layout at a time (`display:none` removes
 * the other from the accessibility tree as well as the page), so the duplicate
 * "On this page" landmark label is not exposed twice.
 */
function useActiveSection(items: JumpNavItem[]) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (inBand[0]) setActive(inBand[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return active;
}

/**
 * Desktop: a sticky sidebar table of contents.
 *
 * Replaces a horizontal pill scroller that had to hold up to 15 entries on the
 * long substance pages — every label past the third was off-screen, so the one
 * job of an on-page nav (show the shape of the page) was not being done. A
 * vertical list shows all of them at once and needs no auto-scrolling.
 */
export function JumpNavSidebar({ items }: { items: JumpNavItem[] }) {
  const active = useActiveSection(items);
  if (items.length < 3) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[8.5rem] hidden max-h-[calc(100dvh-11rem)] overflow-y-auto lg:block"
    >
      <p className="eyebrow mb-4 text-[0.68rem]">On this page</p>
      <ul className="space-y-0.5 border-l border-line">
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[0.8rem] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                  isActive
                    ? "border-rose font-semibold text-rose-dark"
                    : "border-transparent text-muted hover:border-line hover:text-ink"
                }`}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile / tablet: the compact sticky bar, kept for narrow viewports. */
export function JumpNav({ items }: { items: JumpNavItem[] }) {
  const active = useActiveSection(items);

  useEffect(() => {
    if (!active) return;
    const pill = document.getElementById(`jump-${active}`);
    if (!pill) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    pill.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [active]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 border-y border-line bg-cream/90 backdrop-blur lg:hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-6">
        <ul className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it) => {
            const isActive = it.id === active;
            return (
              <li key={it.id} className="flex-shrink-0">
                <a
                  id={`jump-${it.id}`}
                  href={`#${it.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`inline-block whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                    isActive
                      ? "bg-rose-soft text-rose-dark"
                      : "border border-line text-ink-700 hover:border-rose hover:text-rose-dark"
                  }`}
                >
                  {it.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
