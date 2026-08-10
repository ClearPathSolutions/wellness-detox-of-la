import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 *
 * Header-based rather than nonce-based on purpose: nonces require a fresh value
 * per request, which forces every page into dynamic rendering and would throw
 * away the fully static prerender this site depends on. That trade isn't worth
 * it for a brochure site with no authenticated surface, so we accept
 * `'unsafe-inline'` for scripts/styles and lock down everything else.
 *
 * Allowances, each tied to a real dependency:
 *   googletagmanager.com      — gtag.js (loaded only after consent)
 *   google-analytics.com      — GA collect endpoint + tracking pixel
 *   *.googleusercontent.com   — Google reviewer avatars (<img> in Reviews.tsx)
 *   google.com/maps + *.gstatic — embedded map iframe on /contact
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.googleusercontent.com https://www.google-analytics.com https://www.googletagmanager.com https://*.gstatic.com https://maps.gstatic.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Belt-and-braces alongside frame-ancestors, for older UAs.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework version.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [
      // ---------------------------------------------------------------------
      // WordPress → Next migration map.
      // Add every old URL that has inbound links or search visibility here;
      // anything unmapped falls through to app/not-found.tsx.
      // ---------------------------------------------------------------------
      { source: "/about/blog", destination: "/blog", permanent: true },

      // Common WordPress cruft that would otherwise render the 404.
      { source: "/feed", destination: "/blog", permanent: true },
      { source: "/blog/feed", destination: "/blog", permanent: true },
      { source: "/category/:slug", destination: "/blog", permanent: true },
      { source: "/tag/:slug", destination: "/blog", permanent: true },
      { source: "/author/:slug", destination: "/about/meet-the-team", permanent: true },

      // Legacy paths for pages that now live elsewhere.
      { source: "/verify-your-insurance", destination: "/admissions/verify-your-insurance", permanent: true },
      { source: "/insurance", destination: "/admissions/verify-your-insurance", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-team", destination: "/about/meet-the-team", permanent: true },
      { source: "/gallery", destination: "/tour", permanent: true },
      { source: "/programs", destination: "/treatment", permanent: true },
    ];
  },
};

export default nextConfig;
