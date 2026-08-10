"use client";

import { site } from "@/lib/site";

/**
 * Last-resort boundary: catches errors in the root layout itself, so it must
 * render its own <html>/<body> and cannot rely on the layout's fonts or
 * components. Styles are inline so the page still reads correctly even if the
 * stylesheet is what failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f3ef",
          color: "#23272f",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: "1.5rem",
        }}
      >
        <main style={{ maxWidth: "34rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", lineHeight: 1.2, margin: "0 0 1rem" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "#61646e", margin: "0 0 1.75rem" }}>
            We hit an unexpected error. Our admissions team is still available 24/7 — please call and
            we&apos;ll help you right away.
          </p>
          <a
            href={site.phoneHref}
            style={{
              display: "inline-block",
              background: "#bd4b79",
              color: "#ffffff",
              padding: "0.9rem 1.75rem",
              borderRadius: "9999px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Call {site.phone}
          </a>
          <div style={{ marginTop: "1.25rem" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "transparent",
                border: "1px solid rgba(35,39,47,0.2)",
                color: "#23272f",
                padding: "0.8rem 1.6rem",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
          {error.digest && (
            <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#61646e" }}>
              Reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
