import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Web app manifest. The 192px and 512px icons already existed in /public but
 * were referenced nowhere, so Android home-screen installs got no name, theme
 * colour or icon set.
 *
 * `theme_color` intentionally matches the `viewport.themeColor` in app/layout.tsx
 * — two different values would make the browser chrome flicker between them.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Drug & Alcohol Detox & Rehab in Los Angeles`,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ef",
    theme_color: "#f7f3ef",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
