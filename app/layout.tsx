import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Analytics } from "@/components/Analytics";
import Clarion from "@/components/Clarion";
import { CampaignTracker } from "@/components/CampaignTracker";
import { CAMPAIGN_BOOTSTRAP } from "@/lib/attribution";
import { site } from "@/lib/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Drug & Alcohol Detox & Rehab in Los Angeles`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "drug detox Los Angeles",
    "alcohol detox LA",
    "addiction treatment Los Angeles",
    "residential rehab",
    "dual diagnosis treatment",
    "Pomona detox center",
  ],
  // NOTE: deliberately no `url` here. Next merges metadata shallowly, so this
  // object is inherited wholesale by any page that does not set its own
  // `openGraph` — a site-wide `url` therefore made 36 pages claim to be the
  // homepage. Pages set their own via `pageMeta()` in lib/seo.ts.
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} | Drug & Alcohol Detox & Rehab in Los Angeles`,
    description: site.description,
    images: [{ url: "/images/DSC_6218-HDR.webp", width: 1600, height: 1067, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

/**
 * Structured data for local SEO (rich results).
 *
 * `@id` is a stable identifier for the business so any other node on the site
 * can reference this one entity instead of describing a second, competing copy
 * of the same business (which is what used to happen in Reviews.tsx).
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/images/DSC_6218-HDR.webp`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  medicalSpecialty: "Addiction Medicine",
  availableService: [
    "Alcohol & Drug Detox",
    "Residential Inpatient Treatment",
    "Dual Diagnosis Treatment",
    "Aftercare Program",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  // Confirms the profiles that represent this business, so the entity resolves
  // to the same organisation across platforms.
  sameAs: [site.social.facebook, site.social.instagram, site.social.linkedin],
  hasMap: `https://www.google.com/maps?q=${encodeURIComponent(site.address.full)}`,
  areaServed: [
    { "@type": "City", name: "Los Angeles" },
    { "@type": "City", name: "Pomona" },
    { "@type": "AdministrativeArea", name: "Los Angeles County" },
    { "@type": "AdministrativeArea", name: "Southern California" },
  ],
  parentOrganization: {
    "@type": "Organization",
    name: site.network,
    url: site.networkUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <head>
        {/* Must be the first script on the page: it restores the first-touch
            campaign into the URL, and both CallTrackingMetrics below and
            Clarion's forms-capture read the URL after this point. */}
        <script dangerouslySetInnerHTML={{ __html: CAMPAIGN_BOOTSTRAP }} />
        {/* Trims the handshake off the render-blocking request below. */}
        <link rel="preconnect" href="https://264810.tctm.co" crossOrigin="" />
        {/* CallTrackingMetrics — loads on every page, including campaign landing
            pages. Absolute https rather than protocol-relative //, which resolves
            against file:// when a page is opened from disk.

            Deliberately synchronous, against @next/next/no-sync-scripts: t.js
            performs the dynamic phone-number swap, and phone calls are this
            site's primary conversion. Any strategy that runs after first paint —
            async, or next/script's beforeInteractive, which in the App Router is
            a preload plus a runtime injection rather than a blocking tag — lets
            a visitor see and dial the untracked number before the swap lands,
            and that call is then unattributable. The cost is a third-party
            request on the critical path of every page. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://264810.tctm.co/t.js" />
      </head>
      <body className="flex min-h-dvh flex-col bg-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {/* First focusable element: lets keyboard users bypass the 15-item nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-rose focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Header />
        {/* Header is fixed; offset content by its height (mobile bar + desktop utility+bar). */}
        <main id="main" className="flex-1 pt-16 lg:pt-[7.5rem]">
          {children}
        </main>
        <Footer />
        {/* Spacer so the fixed mobile call bar never covers footer content. */}
        <div aria-hidden className="h-16 lg:hidden" />
        <MobileCallBar />
        {/* Clarion Labs chat widget + form capture. Functional rather than
            analytical — it carries the lead pipeline — so it loads site-wide. */}
        <Clarion />
        {/* Keeps the first-touch campaign on the URL across client-side
            navigations, so it is still there when a form is submitted. */}
        <CampaignTracker />
        {/* Google Analytics. Loads gtag itself, only after the visitor opts in —
            the raw <Script> tags that used to sit here loaded it unconditionally,
            which would defeat the consent gate if both were kept. */}
        <Analytics />
      </body>
    </html>
  );
}
