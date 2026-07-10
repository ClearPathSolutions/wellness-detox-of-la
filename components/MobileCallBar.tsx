import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon, ShieldIcon } from "./ui";

/**
 * Always-reachable call / verify bar on mobile. Hidden on lg+ where the header
 * already exposes the phone number and CTA. A matching spacer in the layout
 * keeps page content from ever sitting behind it.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="flex items-stretch gap-2 border-t border-line bg-cream/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-rose py-3 font-display text-sm font-semibold text-white shadow-card active:scale-[0.98]"
        >
          <PhoneIcon width={17} height={17} />
          Call Now
        </a>
        <Link
          href="/admissions/verify-your-insurance"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3 font-display text-sm font-semibold text-white active:scale-[0.98]"
        >
          <ShieldIcon width={17} height={17} />
          Verify Insurance
        </Link>
      </div>
    </div>
  );
}
