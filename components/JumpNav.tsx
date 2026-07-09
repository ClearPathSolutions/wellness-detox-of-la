"use client";

import { useEffect, useState } from "react";

export type JumpNavItem = { id: string; label: string };

export function JumpNav({ items }: { items: JumpNavItem[] }) {
  // Deterministic initial value → server HTML matches first client render (no hydration mismatch).
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  // Scroll-spy: highlight the section currently in the reading band.
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
      // Band sits below the fixed header + this sticky bar; topmost section in-band = current.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active pill visible in the horizontal scroller (reduced-motion aware).
  useEffect(() => {
    if (!active) return;
    const pill = document.getElementById(`jump-${active}`);
    if (!pill) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    pill.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [active]);

  if (items.length < 3) return null; // unobtrusive: short pages get no bar

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 border-y border-line bg-cream/90 backdrop-blur lg:top-[7.5rem]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-8">
        <ul className="mx-auto flex max-w-4xl gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
