import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { treatmentSlugs } from "@/lib/data/treatment";
import { admissionsSlugs } from "@/lib/data/admissions";
import { areaSlugs } from "@/lib/data/areas";
import { postSlugs } from "@/lib/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core = ["", "/about", "/about/our-story", "/about/meet-the-team", "/about/areas-we-serve", "/treatment", "/tour", "/admissions", "/contact", "/blog"];
  const treatment = treatmentSlugs.map((s) => `/treatment/${s}`);
  const admissions = admissionsSlugs.map((s) => `/admissions/${s}`);
  const areas = areaSlugs.map((s) => `/about/areas-we-serve/${s}`);
  const posts = postSlugs.map((s) => `/${s}`);

  const all = [...core, ...treatment, ...admissions, ...areas, ...posts];

  return all.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/treatment/") || path === "/treatment" ? 0.8 : 0.7,
  }));
}
