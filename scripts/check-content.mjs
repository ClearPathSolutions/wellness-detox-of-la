/**
 * Content integrity checks. Run with `npm run check`.
 *
 * These exist because the failures they catch are invisible to `tsc` and
 * `eslint` but expensive in production: an internal link that 404s, a CTA that
 * points at a page that no longer exists, an <Image> whose file was never
 * committed, or an indexable page missing from the sitemap.
 *
 * Deliberately dependency-free and static — it reads the source, it does not
 * boot the app.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const problems = [];
const notes = [];

function fail(msg) {
  problems.push(msg);
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function walk(dir, filter, out = []) {
  for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(rel, filter, out);
    else if (filter.test(entry.name)) out.push(rel);
  }
  return out;
}

const sourceFiles = [...walk("app", /\.tsx?$/), ...walk("components", /\.tsx?$/), ...walk("lib", /\.ts$/)];

/* ---------------------------------------------------------------- routes --- */

/** Static routes = every app/**\/page.tsx path, minus dynamic segments. */
function staticRoutes() {
  return walk("app", /^page\.tsx$/)
    .map((f) => f.replace(/^app/, "").replace(/\/page\.tsx$/, ""))
    .filter((r) => !r.includes("["))
    .map((r) => r || "/");
}

/** Slugs each dynamic route can serve, extracted from the data modules. */
function slugsFrom(rel, arrayName) {
  const src = read(rel);
  // Matches `slug: "…"` entries; good enough for these flat data files.
  const slugs = [...src.matchAll(/^\s*slug: "([^"]+)"/gm)].map((m) => m[1]);
  if (slugs.length === 0) fail(`check-content: found no slugs in ${rel} (${arrayName})`);
  return slugs;
}

const routes = new Set(staticRoutes());
const treatmentSlugs = slugsFrom("lib/data/treatment-programs.ts").concat(
  slugsFrom("lib/data/treatment-substances.ts"),
  slugsFrom("lib/data/treatment-therapies.ts")
);
const admissionsSlugs = slugsFrom("lib/data/admissions.ts");
const areaSlugs = [...read("lib/data/areas.ts").matchAll(/^\s*slug: "([^"]+)"/gm)].map((m) => m[1]);
const postSlugs = [...read("lib/data/blog.ts").matchAll(/^\s*slug: "([^"]+)"/gm)].map((m) => m[1]);

for (const s of treatmentSlugs) routes.add(`/treatment/${s}`);
for (const s of admissionsSlugs) routes.add(`/admissions/${s}`);
for (const s of areaSlugs) routes.add(`/about/areas-we-serve/${s}`);
for (const s of postSlugs) routes.add(`/${s}`);

notes.push(`${routes.size} routes known`);

/* --------------------------------------------------- 1. internal links --- */

const IGNORED_PREFIXES = ["http", "tel:", "mailto:", "#", "//"];

for (const file of sourceFiles) {
  const src = read(file);
  for (const m of src.matchAll(/href=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
    const raw = m[1] ?? m[2] ?? "";
    if (!raw || IGNORED_PREFIXES.some((p) => raw.startsWith(p))) continue;
    if (raw.includes("${")) continue; // interpolated at runtime; covered by slug checks
    const [pathname, hash] = raw.split("#");
    if (!pathname) continue;
    if (!routes.has(pathname)) {
      fail(`dead internal link: ${raw}  (${file})`);
    }
    if (hash) notes.push(`anchor link ${raw} in ${file} — target id not statically verified`);
  }
}

/* ----------------------------------------------------- 2. nav coverage --- */

const navSrc = read("lib/site.ts");
for (const m of navSrc.matchAll(/href: "([^"]+)"/g)) {
  const href = m[1];
  if (IGNORED_PREFIXES.some((p) => href.startsWith(p))) continue;
  const pathname = href.split("#")[0];
  if (!routes.has(pathname)) fail(`nav points at a non-existent route: ${href}`);
}

/* ---------------------------------------------------------- 3. images --- */

const onDisk = new Set(
  fs.readdirSync(path.join(ROOT, "public/images")).map((f) => `/images/${f}`)
);
const referenced = new Set();
for (const file of sourceFiles) {
  for (const m of read(file).matchAll(/["'`](\/images\/[^"'`]+)["'`]/g)) referenced.add(m[1]);
}
for (const img of referenced) {
  if (!onDisk.has(img)) fail(`image referenced but not in public/images: ${img}`);
}
notes.push(`${referenced.size} images referenced, ${onDisk.size} on disk (${onDisk.size - referenced.size} unused)`);

/* --------------------------------------------------------- 4. sitemap --- */
/*
 * Every indexable page must be in the sitemap. Pages that deliberately opt out
 * via `robots: { index: false }` are exempt — that is how /privacy-policy and
 * the 404 are excluded.
 */
const sitemapSrc = read("app/sitemap.ts");
const noindexRoutes = new Set();
for (const file of walk("app", /^page\.tsx$/)) {
  if (/index:\s*false/.test(read(file))) {
    noindexRoutes.add(file.replace(/^app/, "").replace(/\/page\.tsx$/, "") || "/");
  }
}

/**
 * Only the `core` array counts as an explicit listing. Searching the whole file
 * would false-negative: the route also appears in the `priority` ternary, so a
 * page deleted from `core` would still look "covered".
 */
const coreBlock = sitemapSrc.match(/const core\s*=\s*\[([\s\S]*?)\];/);
if (!coreBlock) fail("check-content: could not locate the `core` array in app/sitemap.ts");
const coreEntries = new Set(
  coreBlock ? [...coreBlock[1].matchAll(/"([^"]*)"/g)].map((m) => m[1] || "/") : []
);

/** Which generated groups the sitemap actually spreads into its output. */
const spreads = {
  treatment: /\.\.\.treatment\b/.test(sitemapSrc),
  admissions: /\.\.\.admissions\b/.test(sitemapSrc),
  areas: /\.\.\.areas\b/.test(sitemapSrc),
  posts: /\.\.\.posts\b/.test(sitemapSrc),
};

const sitemapCovers = (route) => {
  if (coreEntries.has(route)) return true;
  if (route.startsWith("/treatment/")) {
    return spreads.treatment && treatmentSlugs.includes(route.slice("/treatment/".length));
  }
  if (route.startsWith("/admissions/")) {
    return spreads.admissions && admissionsSlugs.includes(route.slice("/admissions/".length));
  }
  if (route.startsWith("/about/areas-we-serve/")) {
    return spreads.areas && areaSlugs.includes(route.slice("/about/areas-we-serve/".length));
  }
  if (postSlugs.includes(route.slice(1))) return spreads.posts;
  return false;
};

for (const route of routes) {
  if (noindexRoutes.has(route)) continue;
  if (!sitemapCovers(route)) fail(`indexable route missing from sitemap: ${route}`);
}

/* ------------------------------------------------ 5. single source of truth --- */

for (const file of sourceFiles) {
  if (file === "lib/site.ts") continue;
  const src = read(file);
  if (src.includes("866-591-0888") || src.includes("18665910888")) {
    fail(`hardcoded phone number in ${file} — use site.phone / site.phoneHref`);
  }
}

/* ---------------------------------------------------------------- report --- */

for (const n of notes) console.log(`  · ${n}`);

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log("\n✓ content checks passed");
