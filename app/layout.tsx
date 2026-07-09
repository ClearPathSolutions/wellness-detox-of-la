import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
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

// Structured data for local SEO (rich results).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
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
      <body className="flex min-h-dvh flex-col bg-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        {/* Header is fixed; offset content by its height (mobile bar + desktop utility+bar). */}
        <main className="flex-1 pt-16 lg:pt-[7.5rem]">{children}</main>
        <Footer />
        {/* Spacer so the fixed mobile call bar never covers footer content. */}
        <div aria-hidden className="h-16 lg:hidden" />
        <MobileCallBar />
        {/* Google tag (gtag.js) — mirrors the analytics on the existing site. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.analyticsId}');`}
        </Script>
      </body>
    </html>
  );
}
