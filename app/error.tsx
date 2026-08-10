"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";
import { Button, Container, PhoneIcon } from "@/components/ui";

/**
 * Route-level error boundary. Renders inside the root layout, so the header,
 * footer, and sticky call bar stay available — a visitor hitting an error still
 * has a way to reach admissions.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the digest so the failure can be traced in server logs.
    console.error("[error boundary]", error.digest ?? error.message);
  }, [error]);

  return (
    <Container className="py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-3">Something went wrong</p>
        <h1 className="text-3xl text-ink sm:text-4xl">This page didn&apos;t load properly</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Sorry — something on our end failed. Please try again. If you need to speak with someone
          about treatment, our admissions team is available 24/7 and can help you right now.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={site.phoneHref} size="lg">
            <PhoneIcon width={18} height={18} />
            Call {site.phone}
          </Button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-ink/20 px-7 py-3.5 font-display text-base font-semibold text-ink transition-colors hover:border-rose hover:text-rose-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
          >
            Try Again
          </button>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-muted">Reference: {error.digest}</p>
        )}
      </div>
    </Container>
  );
}
