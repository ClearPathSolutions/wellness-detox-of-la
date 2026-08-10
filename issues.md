# Wellness Detox of LA — Issue Ledger

Single source of truth for defects, gaps, and follow-up work on this codebase.

**Last updated:** 2026-08-10
**Baseline commit:** `303efa5` (2026-07-09)
**Deploy target:** https://wellness-detox-of-la.vercel.app → cutover to https://wellnessdetoxla.com
**Stack verified:** Next.js 16.2.10 (App Router, Turbopack) · React 19.2.4 · Tailwind CSS v4 · TypeScript strict

**Issue count:** 70 tracked (WDL-001 … WDL-070) · **39 FIXED** + 1 WONTFIX = **40 resolved** · 30 remain (1 in progress · 9 blocked · 10 awaiting input · 2 disputed · 8 open)
**Sources:** S-001 swept (106 rows) · S-002 `BLOCKED` (401) · S-003 + S-004 read · S-005 all 44 images reviewed — see §1
**Verification:** all 5 gates green — `tsc` · `lint` · `check` (content integrity) · `build` 52/52 · every `/images/*` resolves

> ## ✅ WDL-055 RESOLVED — facility confirmed operating (owner, 2026-08-10)
> The `Location temp closed` note in S-003 and the absent S-004 folder are stale. All 24/7 availability claims stand and are accurate. Wave 0 cleared; both sources should be corrected upstream.
>
> ## ✅ 40 of 70 RESOLVED — every unblocked code issue is now closed
> The 8 still marked OPEN are **not** ready-to-code: they need an owner ruling (WDL-033, 036, 040), supplied material (WDL-042, 062), a content merge decision (WDL-035), a configured endpoint (WDL-045), or depend on another item (WDL-064). **Nothing is waiting on engineering alone.**
>
> ## ✅ §3.5 RE-SYNC COMPLETE — 2026-08-10
> All 12 concurrent-change files were read and checked against acceptance criteria. **8 issues genuinely FIXED, 6 partial, 3 still fully open.** Two of §3.5's own guesses were wrong (WDL-011, WDL-032 were never touched) and **five closures it did not predict** were found (WDL-004, 009, 018, 019, 058). Four new `[CODE]` issues filed (WDL-065…068). **All four verification gates are green** — WDL-058's premise was already stale. Detail in §3.5.

---

## 0. Operating rules

1. **Owner-supplied input is authoritative.** Any link, folder, file, export, screenshot, or spoken correction from the project owner overrides findings in this document. When that happens the affected issue is amended in place and annotated `AMENDED (owner input)` with the source ID.
2. **Nothing is dropped.** Issues move through statuses; they are never deleted. Rejected items are marked `WONTFIX` with a reason.
3. **Every issue carries evidence** — a file + line reference, or a recorded source ID.
4. **New inputs get pulled, recorded, mapped, then tasked** — in that order.
5. **Provenance is labelled.** `[SHEET]` = from an owner-supplied tracker. `[CODE]` = found in this repo, not in any owner source. `[CODE]` items are candidates to push *back* into the owner's tracker.

### Status legend

| Status | Meaning |
| --- | --- |
| `OPEN` | Confirmed, not started |
| `IN PROGRESS` | Being worked |
| `BLOCKED` | Waiting on owner input or an external dependency |
| `FIXED` | Implemented, verified by build/lint/manual check |
| `WONTFIX` | Deliberately declined — reason recorded |
| `AWAITING INPUT` | Cannot be scoped until the owner supplies a source |
| `DISPUTED` | Owner source asserts a defect the code does not support — needs a ruling |

### Severity legend

| Level | Meaning |
| --- | --- |
| **P0** | Blocks launch. Loses leads, or creates legal/compliance exposure. |
| **P1** | Ship-soon. Material SEO, accessibility, or trust impact. |
| **P2** | Should fix. Maintainability, performance, hardening. |
| **P3** | Polish / cleanup. |

---

## 1. Sources registry

### S-001 — QHG Vercel Build Issues workbook (Google Sheets)

| Field | Value |
| --- | --- |
| **URL** | https://docs.google.com/spreadsheets/d/1daiRElkRoKObt9KCsqFeXEhmtSBk5c1MQjUeaKx2nC8/edit |
| **Pulled** | 2026-08-10 (CSV + XLSX export, all 5 tabs) |
| **Scope** | **12 facilities across the Quadrant Health Group portfolio — NOT just this site** |
| **Provenance** | Crawl of all 12 Vercel preview builds, 1,046 URLs, 2026-07-27. Verification pass 2026-07-28. |
| **Local copies** | `scratchpad/s.xlsx`, plus per-tab CSVs |

**Tabs**

| Tab | Rows | Relevance to this repo |
| --- | --- | --- |
| Vercel Build Issues | 102 | **6 rows** `Wellness Detox LA` + **13 rows** `ALL SITES` + **3 rows filed under other facilities that name us** (V0042, V0089, V0091) = **22 rows** |
| Broken Internal Links | 32 | **None apply.** Re-verified by host: all 32 rows reference only `dallas-detox-center.vercel.app` (84 refs) and `fort-worth-wellness.vercel.app` (68 refs). Zero references to our build. |
| Visual Issues | 1,904 | **75 rows** ours (IDs 1658–1732, contiguous, none missing) + **2 QHG-parent rows that name us** (860, 861) |
| Verification Log | 75 | **15 entries** mention us; all 15 read. Two pre-answer our rows before they were raised (V0068, V0089). |
| Legend | 28 | Conventions and audit-wide caveats — captured below |

**Extraction method and its correction.** My first pass filtered on the `Facility` column, which is how the workbook is organised — that returned 6 + 13 + 75 rows. A second pass searching **every cell of every tab** for `wellness-detox-of-la` / `wellnessdetoxla` / `wellness detox la` found **5 more rows** that name us inside another facility's row body. Those are now tracked (WDL-053, WDL-054) or closed (§6). Facility-column filtering alone is insufficient on this workbook; full-text search is the reliable method.

**Completeness verification performed 2026-08-10**

| Check | Result |
| --- | --- |
| All 5 tabs extracted from XLSX (CSV export exposes only tab 1) | ✅ |
| Full-text sweep of all 4 data tabs for every naming variant | ✅ 106 rows found, all triaged |
| Visual Issues IDs 1–1903 contiguous, no gaps | ✅ 0 gaps |
| Our visual block 1658–1732 complete | ✅ all 75 present, all extracted |
| Blank-`Facility` rows checked (could have hidden ours) | ✅ 96 rows, all empty ID-only stubs (1808–1903), no Issue/Fix/Location content |
| Broken Internal Links re-verified by host, not by name | ✅ 0 rows for us |
| Every row mentioning us mapped to a WDL id or §6 | ✅ see §2 |

**⚠️ Caveats carried forward from the workbook's own Legend — these govern how much I trust each row:**

- Rows marked `NOT YET VERIFIED` (34 portfolio-wide) must be treated with caution: **"roughly two thirds of verified rows needed a correction."** All 6 of our build-issue rows *were* verified.
- The **Visual Issues tab carries no Verdict/Verified column at all** — it is unverified reviewer notes. I have mapped each row to code and flagged the two that appear to be non-defects.
- 5 hand-written counts in the workbook were wrong on verification; **generated counts were exact in every case.**
- Portfolio slug rows (V0094–V0101) were **written from preview data only** and do not reflect production values — see V0116.
- Issue IDs V0001–V0118 are locked as of 2026-07-28; anything referenced before that date needs re-checking.

**Confidence that S-001 audited *this* codebase: high.** The workbook reports our sitemap contains 44 URLs; `app/sitemap.ts` generates exactly 44 (10 core + 15 treatment + 6 admissions + 6 areas + 7 posts). Its og:url split of 36 wrong / 7 correct + homepage matches our template structure precisely.

### S-002 — second workbook (Google Sheets) · ⛔ ACCESS BLOCKED

| Field | Value |
| --- | --- |
| **URL** | https://docs.google.com/spreadsheets/d/1KGS7Cwg7buK-tQ-ELySG84OCpJxbWWzBAv40CcfroT4/edit |
| **Supplied** | 2026-08-10 |
| **Pull attempted** | 2026-08-10 — **failed, HTTP 401 on all access paths** |
| **Status** | `BLOCKED` — not readable without authentication |
| **Contents** | Unknown. Nothing extracted, nothing mapped, no tasks created. |

**Diagnosis.** All four access paths return `401`: `export?format=csv`, `export?format=xlsx`, `htmlview`, `edit`. Google's response page reads *"You must sign in to access this content."*

This is a sharing setting on the document, not a tooling or network problem — the S-001 link returns `200` on the byte-identical request, so the extraction pipeline is working. S-002 is simply set to restricted access, where S-001 is "anyone with the link".

**To unblock — any one of these:**
1. **Change link sharing** to *Anyone with the link → Viewer*, matching S-001. Fastest path; I re-pull immediately.
2. **Export and drop the file in the repo** — File → Download → `.xlsx` (preferred, preserves all tabs) or `.csv` (first tab only). Tell me the path.
3. **Authorize the Google Drive connector.** Not possible from this session — it is non-interactive, so the OAuth flow cannot run here. It would need doing in claude.ai connector settings first.
4. **Paste the contents** directly into chat.

**⚠️ Note on option 2:** a `.csv` download captures only the **active tab**. S-001 had 5 tabs and its CSV export silently returned just the first — which is how 1,829 rows nearly went unseen. Use `.xlsx` if the workbook has more than one tab.

**No tasks created from this source.** Creating issues from an unread document would mean inventing them, so the ledger records the source as blocked and stops there.

### S-003 — QHG portfolio staff bios (Google Doc)

| Field | Value |
| --- | --- |
| **URL** | https://docs.google.com/document/d/1MWL4ki6HDCcUN-1mh2EFU-6eoMVpwpSSRMDm58Me3oA/edit |
| **Pulled** | 2026-08-10 (TXT + DOCX export, HTTP 200) |
| **Scope** | Portfolio-wide staff bios — 1,109 lines, ~17,500 words, 107 person entries across 11 facility/region headings |
| **Local copies** | `scratchpad/bios.txt`, `scratchpad/bios.docx` |

**Bios supplied for this site: zero.** Our facility is the **only heading in the document with no entries**, and the only one written in parentheses:

| Heading | Entries |
| --- | --- |
| Quad Leadership | 54 |
| Dallas Detox Center | 46 |
| Cali Leadership | 10 (5 people, block duplicated in source) |
| Cali SOUTH | 4 |
| Cali NORTH / TX Sites | 3 each |
| Marina Harbor · Laguna View · Hillside Mission · Ocean Coast | 2 each |
| **(Wellness Detox LA)** | **0** |

Our section is two lines in full, verbatim (doc lines 727–728):

```
(Wellness Detox LA)
Location temp closed
```

Those are the **only two occurrences** of "Wellness Detox" anywhere in the document. We are also absent from the "OTHER FACILITY BIOS NEEDED" list at the top, which does name CALI, TEXAS, NJ, and KY gaps.

**→ Raised as WDL-055 (P0). This is the most consequential single line any source has produced so far, and it is not a bios question.**

**None of our four published team members appear in this document.** Exact-word search across all 1,109 lines:

| Published on our site | Hits in S-003 |
| --- | --- |
| Janee Young, LMFT — Clinical Director | `Janee` 0 |
| Adrian Diaz, RADT — Director of Operations | `Adrian` 0 · `Diaz` 0 |
| Selin Simmonds — Fitness Guru | `Selin` 0 · `Simmonds` 0 |
| Crystal Clements — Fitness Guru | `Crystal` 0 · `Clements` 0 |

The two `Young` hits are **Shawn Young, Executive Director of Southern California** — a different person. → **WDL-056**.

**Source-doc defect to report upstream:** the `Cali Leadership` block is duplicated verbatim — Shawn Young, Michael McArthur, Riky Hanaumi, Monica Olivares, and Jacob Cameron each appear twice (doc lines ~443 and ~510). Not our defect; flag so nobody publishes a bio twice.

### S-004 — Staff Headshots folder (local)

| Field | Value |
| --- | --- |
| **Path** | `~/Downloads/Staff Headshots` |
| **Pulled** | 2026-08-10 (read in place; nothing copied into the repo — see below) |
| **Scope** | 124 image files across 11 region/department folders, portfolio-wide |
| **Formats** | PNG, JPG, JPEG, WebP — unoptimised originals, 1,086×1,448 to 1,536×2,048 |

**Headshots for this facility: zero. There is no Wellness Detox LA folder at all.**

This is the third independent source to say the same thing, and the most structurally telling. Every other Cali SOUTH facility has its own subfolder; we are the only one without:

```
California/Cali SOUTH/
├── CA-Alanna McMurtrey.png     ← regional, not facility
├── CA-Elizabeth-Wald.webp      ← regional
├── CA-Jeremiah Ross.jpg        ← regional
├── CA-Justin White.png         ← regional
├── Hillside Mission/           ← facility folder ✓
├── Laguna View/                ← facility folder ✓
├── Ocean Coast Recovery/       ← facility folder ✓
└── (no Wellness Detox LA)      ← ✗
```

Searches for `*wellness*`, `*WDL*`, `*pomona*`, `*detox-la*` return nothing anywhere in the tree.

**None of our four published staff have a headshot.** `Janee` ✗ · `Adrian` ✗ · `Diaz` ✗ · `Selin` ✗ · `Simmonds` ✗ · `Crystal` ✗ · `Clements` ✗. The only `Young` match is `CA-Shawn Young.png` — the different person already identified in S-003. → strengthens **WDL-056**.

**Corroboration table — three sources, same conclusion**

| Source | What it says about our staff |
| --- | --- |
| S-001 (audit workbook) | No staff rows; visual 1670 asks for per-staff pages that don't exist |
| S-003 (bios doc) | `(Wellness Detox LA)` → `Location temp closed`, 0 of 107 bios |
| **S-004 (headshots)** | **No facility folder; 0 of 124 images** |

Independently sourced agreement on a facility with no staff records materially raises confidence in **WDL-055**.

**What S-004 *does* supply — the WDL-057 candidates are now fully resourced.** All nine Southern California leaders from S-003 have a headshot, and all nine bios are already written:

| Person | Role (S-003) | Headshot | Dimensions | Size |
| --- | --- | --- | --- | --- |
| Shawn Young | Executive Director, SoCal | `California/CA-Shawn Young.png` | 1254×1254 | 1.8 MB |
| Michael McArthur | Nursing Director | `California/CA-MichaelMcArthur.png` | 1254×1254 | 1.8 MB |
| Riky Hanaumi | Clinical Director | `California/CA-Riky Hanaumi.png` | 1086×1448 | 1.9 MB |
| Monica Olivares ⚠️ | Clinical Supervisor | `California/CA-Monica-Olivires.webp` | 1536×2048 | 96 KB |
| Jacob Cameron | Client Care Director | `California/CA-Jacob Cameron.png` | 1254×1254 | 1.8 MB |
| Justin White | Program Director | `Cali SOUTH/CA-Justin White.png` | 1122×1402 | 1.8 MB |
| Elizabeth Wald | Program Director | `Cali SOUTH/CA-Elizabeth-Wald.webp` | 1536×2048 | 52 KB |
| Jeremiah Ross | Nursing Supervisor | `Cali SOUTH/CA-Jeremiah Ross.jpg` | 1254×1254 | 252 KB |
| Alanna McMurtrey | Lead Case Manager | `Cali SOUTH/CA-Alanna McMurtrey.png` | 1254×1254 | 1.7 MB |

**⚠️ Name discrepancy — must be resolved before publishing.** S-003's bio reads **"Monica Olivares"**; the headshot filename reads **"Monica-Olivires"**. One is misspelled. Given that S-001's only `CRITICAL` content row portfolio-wide is V0054 *"wrong person biography"*, a misspelled surname on a published staff bio is the same error class. Do not publish either spelling unverified. → tracked in **WDL-057**.

**Nothing copied into the repo yet, deliberately.** The six PNGs total ~10.9 MB and all nine ~11.2 MB — against an open issue (**WDL-017**) about 19 MB of *already* unused images. Committing 9 images that may not be used would make that worse. They need WebP conversion and resizing to the `aspect-[4/5]` card first, and that work is only worth doing once the WDL-057 decision lands. Note two files are already optimised (52 KB, 96 KB), so someone has done this before — worth matching their settings.

**Also present, not ours:** `Quadrant/Cali Leadership/` holds `Copy of …` duplicates of the same five Cali Leadership headshots — the identical duplication S-003 has in its text. Same upstream defect, visible in both sources.

### S-005 — Wellness Detox of LA photography folder (local)

| Field | Value |
| --- | --- |
| **Path** | `~/Downloads/Wellness Detox of LA` |
| **Pulled** | 2026-08-10 — **every file opened and visually reviewed** |
| **Contents** | 44 images + 1 video · 793 MB total |
| **Breakdown** | 26 × `DSC_*-HDR.jpg` interiors/exteriors (1728×1152, 3:2) · 14 × `DJI_*.jpg` aerials (2048×1152, 16:9) · 2 × staged PNG renders (1536×1024) · 2 × official logo lockups (1024×1024, alpha) · 1 × `.mp4` (727 MB) |

**Relationship to the repo**

| Group | Count | Disposition |
| --- | --- | --- |
| Already in repo as 1600px WebP, all 22 in active use | 22 | **No re-import needed** — repo versions are already at the 1600px convention |
| New photography | 18 | 9 imported (see map), 9 held back as redundant |
| Staged PNG renders | 2 | **Not imported** → **WDL-061** |
| Official logo lockups | 2 | Both imported → footer live, header blocked by **WDL-063** |
| Video | 1 | **Not imported** → **WDL-062** |
| In repo but no original supplied | 4 | `DSC_6293`, `6296`, `6301-HDR-1`, `6302` — kept as-is |

**Established convention confirmed:** existing gallery images are **1600 px wide WebP** (`DSC_*` → 1600×1067, `DJI_*` → 1600×900). All imports match it.

**Content review — what the folder actually shows.** All 44 reviewed via contact sheets, then key candidates at full size:
- **Interiors:** one living room shot from 4 angles (fireplace + wall TV + two grey sofas), 3 distinct kitchens, 2 dining areas, 5 bedrooms (**every bedroom has two beds**), and one group-therapy room (armchairs in a circle in a converted garage). EXIT signage and a water cooler are visible in several — genuine facility detail.
- **Exteriors:** the residence from every side — arched entry, stone veneer, terracotta roof, front and back lawns, brick paths, pergola, gated driveway, attached garage.
- **Aerials:** 14 drone frames of the surrounding tract neighbourhood with the San Gabriel range behind. Largely interchangeable; 2 selected.

### Still needed

| Want | Why it matters | Feeds |
| --- | --- | --- |
| Old WordPress URL inventory (`wellnessdetoxla.com/sitemap_index.xml`, or a GSC Pages export) | Complete the cutover redirect map — S-001 gives fragments only | WDL-008 |
| Production content re-sync after 2026-07-09 | S-001 V0124 proves production has pages this build lacks | WDL-034 |
| HIPAA-capable form endpoint (BAA vendor or route spec) | Replace the `mailto:` PHI handoff | WDL-002 |
| Original blog images from production | 75-row visual audit says blog heroes are "random images" | WDL-048 |
| Original-site "widget" reference screenshots | 10 visual rows say "create a widget" without specifying the pattern | WDL-044, WDL-047 |
| Google Places API key + Place ID | Turn on homepage reviews | WDL-029 |
| GA4 consent policy decision | Gate analytics on intake pages | WDL-010 |
| Trailing-slash convention ruling | Portfolio-wide CRITICAL; affects every URL | WDL-033 |
| Brand assets keep-list | Safely delete ~19 MB of unused images | WDL-017 |
| Staff bios + photos | Fill placeholders; S-001 also wants per-staff pages | WDL-030, WDL-050 |
| Legal-approved privacy policy | Replace placeholder copy | WDL-031 |

---

## 2. Cross-reference map — S-001 ↔ this ledger

| S-001 ID | Priority (S-001) | Verdict (S-001) | → Ledger ID | Reconciliation |
| --- | --- | --- | --- | --- |
| V0078 | WITHDRAWN | NOT_CONFIRMED | — | **Do not action.** Withdrawn upstream; its Fix would have deleted a live page. Recorded in §6. |
| V0079 | not triaged | CONFIRMED_AMENDED | WDL-035 | New — intent overlap, not duplication |
| V0080 | not triaged | CONFIRMED_AMENDED | **WDL-006** | **Independently found in code audit.** S-001 confirms and splits it: verify-insurance is a real omission, privacy-policy is by-design |
| V0081 | not triaged | CONFIRMED | WDL-032 | New — **I missed this. Confirmed in code.** |
| V0114 | MEDIUM | NEW | WDL-036 | New — FAQ fragmentation |
| V0133 | LOW | NEW | WDL-039 | New — feeds the redirect map |
| V0096 | not triaged | CONFIRMED_AMENDED | WDL-037 | New — verify-insurance slug is a portfolio outlier |
| V0099 | not triaged | CONFIRMED_AMENDED | WDL-036 | Merges into WDL-036 |
| V0100 | COMPLIANCE | CONFIRMED_AMENDED | WDL-006, WDL-031 | Confirms our privacy sitemap exclusion is **correct**; the compliance gap is Greater Texas, not us |
| V0101 | not triaged | CONFIRMED_AMENDED | WDL-038 | New — root-level blog slugs |
| V0102 | **CRITICAL** | CONFIRMED_AMENDED | WDL-033 | New — **confirmed in code**; `trailingSlash` unset |
| V0124 | **CRITICAL** | NEW | WDL-034 | New — **confirmed in code**; page absent |
| V0116 | HIGH | NEW | WDL-008 | Method feeds our redirect map |
| V0091 | not triaged | CONFIRMED | WDL-053 | New — reciprocal parent link missing. Found by full-text sweep; filed under QHG parent |
| V0042 | not triaged | CONFIRMED_AMENDED | WDL-054 | New — privacy-policy robots inconsistency. Found by full-text sweep; filed under Fort Worth |
| Visual 860 | — | unverified | WDL-053 | We are missing from the parent's locations list |
| Visual 861 | — | unverified | WDL-048 | **Answers the "Clarion" question** — same defect on the parent's blog |
| V0068 | BY_DESIGN | BY_DESIGN | WDL-006 | Its notes explicitly pre-clear our privacy row before it was raised |
| V0089 | not triaged | CONFIRMED_AMENDED | — | **No action, but watch.** Our `opioid-addiction` slug is the proposed standard — see §6 |
| V0094, V0097, V0098 | not triaged | CONFIRMED / AMENDED | — | **No action.** Our `/treatment`, `/about`, `/contact` already match the portfolio standard |
| V0118 | MEDIUM | NEW | — | **No action.** Geo-suffixed slug policy — we have no geo-suffixed service slugs |
| V0043/V0048/V0049 | BLOCKED | — | — | **No action.** Other facilities' phone numbers; do not touch |
| V0070 | COMPLIANCE | — | — | **No action.** LegitScript claim is Des Moines. *Confirm we make no such claim — we do not.* |
| Visual 1658–1732 | (no verdict column) | unverified | WDL-040 … WDL-052 | 74 rows grouped into 13 tasks; row 1675 folded into WDL-012 |

### Found in code, absent from S-001 — push these back upstream

These are `[CODE]` findings with no corresponding row in the owner's tracker. **WDL-001 is the same defect class as V0017** (Dallas: mislinked verify CTA + sitemap omission) — S-001 caught our sitemap half as V0080 but missed our CTA half entirely.

| Ledger ID | Severity | Summary |
| --- | --- | --- |
| **WDL-001** | **P0** | All 5 "Verify Insurance" CTAs miss the form — the V0017 defect class, unlogged for this site |
| **WDL-002** | **P0** | PHI over unencrypted `mailto:` under a "100% private & protected" claim |
| **WDL-003** | **P0** | Both forms report success when nothing was sent |
| WDL-004 | P1 | Collapsed accordions stay in the tab order |
| WDL-005 | P1 | No skip-to-content link |
| WDL-007 | P1 | Two competing `MedicalBusiness` JSON-LD entities |
| WDL-009 | P1 | No custom 404 |
| WDL-010 | P1 | Analytics ungated on intake pages |
| WDL-011 | P2 | Sitemap `lastModified` churns on every build |
| WDL-014/015 | P2 | Index- and string-coupled slug lookups |
| WDL-018/019/020 | P2 | No security headers, error boundaries, or manifest |

---

## 3. Route map (as built)

`next build` reports **52 routes**, all prerendered. Sitemap emits **44 URLs** (matches S-001).

### Static routes (17)

```
/                                     app/page.tsx
/about                                app/about/page.tsx
/about/our-story                      app/about/our-story/page.tsx
/about/meet-the-team                  app/about/meet-the-team/page.tsx
/about/areas-we-serve                 app/about/areas-we-serve/page.tsx
/treatment                            app/treatment/page.tsx
/tour                                 app/tour/page.tsx
/admissions                           app/admissions/page.tsx
/admissions/verify-your-insurance     app/admissions/verify-your-insurance/page.tsx
/blog                                 app/blog/page.tsx
/contact                              app/contact/page.tsx
/privacy-policy                       app/privacy-policy/page.tsx   (noindex — correct per V0080/V0100)
/_not-found                           Next.js default — see WDL-009
/robots.txt                           app/robots.ts
/sitemap.xml                          app/sitemap.ts
/icon.png, /apple-icon.png            app/icon.png, app/apple-icon.png
```

### Dynamic routes (34 generated paths, `dynamicParams = false`)

| Route | Count | Data source |
| --- | --- | --- |
| `/treatment/[slug]` | 15 | `lib/data/treatment.ts` → programs (4) + substances (8) + therapies (3) |
| `/admissions/[slug]` | 6 | `lib/data/admissions.ts` |
| `/about/areas-we-serve/[area]` | 6 | `lib/data/areas.ts` |
| `/[slug]` (root-level blog posts) | 7 | `lib/data/blog.ts` — see WDL-038 |

**Slug inventory**

- **Programs:** `detox`, `residential`, `dual-diagnosis`, `aftercare`
- **Substances:** `alcohol-addiction`, `benzo-addiction`, `cocaine-addiction`, `fentanyl-addiction`, `heroin-addiction`, `meth-addiction`, `opioid-addiction`, `prescription-drug-addiction`
- **Therapies:** `individual-therapy`, `group-therapy`, `family-therapy`
- **Admissions:** `admissions-process`, `help-for-yourself`, `help-for-loved-one`, `addiction-faq`, `insurance-admissions-faq`, `treatment-faq`
- **Areas:** `los-angeles`, `pomona`, `north-hollywood`, `burbank`, `los-angeles-county`, `southern-california`
- **Blog:** `why-fentanyl-addiction-is-so-dangerous`, `medical-detox-los-angeles`, `los-angeles-addiction-treatment-guide`, `why-residential-treatment-matters`, `dry-january-in-los-angeles-when-a-reset-requires-medical-oversight`, `what-happens-to-your-brain-during-the-first-30-days-of-recovery`, `how-to-talk-to-loved-ones-about-going-to-rehab-a-guide-for-la-families-during-the-holidays`

### Redirect map (cutover) — INCOMPLETE

| From (production) | To (build) | Status | Source |
| --- | --- | --- | --- |
| `/about/blog` | `/blog` | ✅ configured, 308 verified | `next.config.ts`, V0133 |
| `/about/blog/` (slash form) | `/blog` | ⚠️ not covered — indexed today | V0133 |
| `/luxury-rehab-in-los-angeles/` | ??? | ❌ **destination does not exist** | V0124 → WDL-034 |
| *all other legacy URLs* | ??? | ❌ **inventory not supplied** | WDL-008 |

---

## 3.5 ⚠️ Ledger status is out of sync with the working tree

**Discovered 2026-08-10 while building WDL-057.** The working tree contains substantial changes **not made in this session and not reflected in the statuses below**. The tree was clean at `303efa5` when this ledger was created, so this work landed during it — presumably concurrent implementation against these very issues.

**Files changed by that other work (not mine):**

| File | Change | Likely addresses |
| --- | --- | --- |
| `components/Analytics.tsx` | **new**, 133 lines — consent-gated analytics | WDL-010, WDL-021 |
| `lib/analytics.ts` | **new**, 35 lines | WDL-010 |
| `app/actions/leads.ts` | **new**, 4.1 KB — server action | WDL-002, WDL-003 |
| `lib/leads.ts` | **new**, 94 lines | WDL-002 |
| `components/form-ui.tsx` | **new**, 138 lines | WDL-002, WDL-045 |
| `components/InsuranceForm.tsx` | −221/+ rewritten | WDL-002, WDL-003 |
| `components/ContactForm.tsx` | −158/+ rewritten | WDL-002, WDL-003 |
| `components/Header.tsx` | 4 lines | WDL-001 |
| `components/MobileCallBar.tsx` | 2 lines | WDL-001 |
| `components/blocks.tsx` | 4 lines | WDL-001 |
| `app/sitemap.ts` | +23/−1 | WDL-006, WDL-011 |
| `app/layout.tsx` | 26 lines | WDL-032 and/or WDL-010 |

**Mine, for separation:** `lib/data/team.ts` (new), `app/about/meet-the-team/page.tsx`, the four `team-*.webp` images, and `issues.md`.

**Consequences**
1. **Statuses in §5 are unverified against this code.** Several issues marked `OPEN` or `BLOCKED` — plausibly WDL-001, 002, 003, 006, 010, 011, 032, 045 — may now be implemented. **Do not trust an `OPEN` status in §5 until a re-sync pass reads each diff and confirms.** I have not done that pass; it needs one, and it should verify against each issue's acceptance criteria rather than assuming intent from filenames.
2. **The §4 baseline health table is stale** — see WDL-058 below.

**Recommended next step:** a re-sync pass that reads each of the 12 diffs, checks it against the relevant acceptance criteria, and marks issues `FIXED` only where they genuinely pass. Cheap to do and it prevents duplicated work.

---

### ✅ 3.5.1 Re-sync results — completed 2026-08-10

Every one of the 12 files was read and checked **against the acceptance criteria of the issue it supposedly addressed**, not against its filename. Gates re-run first, so inherited state was known before judging anything.

**Gate state at re-sync (all green):**

| Gate | Result |
| --- | --- |
| `npx tsc --noEmit` | PASS — 0 errors |
| `npm run lint` | **PASS — 0 errors** (WDL-058's premise was already stale) |
| `npm run build` | PASS — 52/52 prerendered |
| `/images/*` references resolve | PASS — 0 missing (53 referenced of 205 on disk) |

#### Verdicts on the 8 predicted candidates

| Issue | §3.5 guess | Verdict | Evidence |
| --- | --- | --- | --- |
| **WDL-001** | likely fixed | ⚠️ **PARTIAL — 3 of 4** | All 5 CTAs repointed and the self-link is gone, but criterion 3 fails: the path is **10 literal strings**, no `site.verifyHref` constant |
| **WDL-002** | likely fixed | ⚠️ **PARTIAL — stays `BLOCKED`** | `mailto:` transport eliminated (criteria 1–2 pass), but the "100% private & protected" copy still overstates, and no BAA endpoint is configured |
| **WDL-003** | likely fixed | ✅ **FIXED — 3 of 3** | Success gated on server result; failure renders phone CTA. Verified end-to-end against a live receiver, including the misconfigured-production path |
| **WDL-006** | likely fixed | ✅ **FIXED — 3 of 3** | Path in `core`, priority 0.9; 45 URLs, each once; `/privacy-policy` still correctly excluded |
| **WDL-010** | likely fixed | ⚠️ **IMPLEMENTED, needs owner ratification** | Zero trackers before consent (verified in prerendered HTML); no PHI in payloads. But criterion 1 is "*documented consent policy*" — a banner was chosen **without** the owner/legal decision this issue is blocked on |
| **WDL-011** | likely fixed | ❌ **STILL OPEN — guess was wrong** | `app/sitemap.ts:9` `const now = new Date()` is untouched. The +23/−1 diff was WDL-006 only |
| **WDL-032** | likely fixed | ❌ **STILL OPEN — guess was wrong** | `app/layout.tsx` still sets `openGraph.url = site.url`; no `lib/seo.ts`; still only 2 files define `openGraph`. The layout diff was WDL-010 + WDL-005, not this |
| **WDL-045** | likely fixed | ❌ **STILL OPEN — but now unblocked** | No `form` field on `ContentPageData`, no form in `ContentPage`. Its blocker (WDL-002 transport) is gone, so it can proceed |

#### Closures §3.5 did **not** predict

Found by scanning the tree against every issue in §5, not just the 8 guessed:

| Issue | Verdict | Evidence |
| --- | --- | --- |
| **WDL-004** | ✅ **FIXED — 4 of 4** | `inert` on collapsed FAQ panels and mobile submenus; `aria-expanded` + `aria-controls` paired on both toggles; grid animation preserved |
| **WDL-009** | ✅ **FIXED — 4 of 4** | `app/not-found.tsx` exists, renders inside the root layout (header/footer/call bar), phone above the fold, 6 destinations, returns HTTP 404 |
| **WDL-018** | ✅ **FIXED — 3 of 3** | CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` on all routes; `poweredByHeader: false`. CSP allowlist cross-checked against every external origin actually used |
| **WDL-019** | ✅ **FIXED** | Both `app/error.tsx` and `app/global-error.tsx` present; `global-error` uses inline styles so a broken stylesheet cannot break the boundary |
| **WDL-058** | ✅ **FIXED** | Both errors resolved — consent moved to `useSyncExternalStore`, `<a>` → `next/link` |
| **WDL-005** | ⚠️ **PARTIAL — 2 of 3** | Skip link is the first tab stop and visible on focus, but `<main id="main">` has **no `tabIndex={-1}`**, so several browsers move scroll without moving focus |
| **WDL-007** | ⚠️ **PARTIAL — changed shape** | The duplicate `MedicalBusiness` is gone, but by **deleting** the Reviews JSON-LD entirely rather than unifying on `@id`. No `@id` exists, and there is now no rating to attach → see **WDL-065** |
| **WDL-008** | ⚠️ **PARTIAL — stays `AWAITING INPUT`** | Redirects went 1 → 14 (WordPress cruft + legacy path guesses), but the real URL inventory is still missing; guessed redirects are not a substitute |

#### Also verified still open (unchanged by the concurrent work)

`WDL-020` no manifest · `WDL-021` Maps iframe still ungated (note: now inconsistent with the consent gate added for WDL-010) · `WDL-026` markdown still unsanitized · `WDL-017` 152 unreferenced images (count rose from 148 as S-005 assets landed).

**Method note.** Two of the three wrong guesses came from inferring intent from a filename + line count (`app/sitemap.ts +23/−1` → "WDL-006, WDL-011"; `app/layout.tsx 26 lines` → "WDL-032 and/or WDL-010"). Reading the diff took under a minute per file and would have prevented both. Filename inference should not be used again on this ledger.

---

#### WDL-058 · Lint regression: 2 errors in `components/Analytics.tsx`
**Status:** ✅ `FIXED` (verified 2026-08-10) · **Severity:** P2 · **Area:** Code quality · `[CODE]`

> **Re-sync verification:** `npm run lint` returns clean. Both `Analytics.tsx` errors resolved.

> ## ✅ RESOLVED — both errors were already fixed before this ledger entry was read
> `npm run lint` returns **0 errors**. The concurrent work had corrected both lines after §3.5 was written, so this issue was never actionable as filed. Recorded rather than deleted, per operating rule 2.
>
> **How each was resolved — both better than the workaround this issue suggested:**
> - **Line 33 (`react-hooks/set-state-in-effect`)** — not solved with the `Header.tsx:19-22` derive-during-render pattern this issue recommended, and correctly so. Consent lives in `localStorage`, which is an *external store*, so it is now read through **`useSyncExternalStore`** (`lib/analytics.ts` — `subscribeToConsent` / `getConsentSnapshot` / `getConsentServerSnapshot`). That is the API React provides for exactly this case: it keeps the server and hydration renders consistent via a distinct `"pending"` server snapshot, and subscribing to the `storage` event means a consent decision in one tab now takes effect in the others — a behaviour neither suggested workaround would have produced.
> - **Line 108 (`@next/next/no-html-link-for-pages`)** — now `<Link href="/privacy-policy">`, which as this issue predicted also sidesteps the unresolved **WDL-033** slash question.
>
> **WDL-031 remains open and is now more urgent**, exactly as this issue warned: the consent banner links users to a privacy policy that is still generic placeholder copy and does not describe the actual data flows — which now include a consent-gated GA4 and a server-side lead pipeline.

**Acceptance criteria**
- [x] `npm run lint` returns 0 errors
- [x] Consent state initialises without a synchronous effect setState
- [x] Internal navigation uses `next/link`
- [x] Baseline health table in §4 re-verified and updated

<details><summary>Original report</summary>

**Problem** `npm run lint` now fails with 2 errors, where the 2026-08-10 baseline recorded 0. Both are in `components/Analytics.tsx`, from the concurrent work described above:

| Line | Rule | Error |
| --- | --- | --- |
| `Analytics.tsx:33` | `react-hooks/set-state-in-effect` | *"Calling setState synchronously within an effect can trigger cascading renders"* — reading `localStorage` consent then calling `setConsent(stored)` inside an effect |
| `Analytics.tsx:108` | `@next/next/no-html-link-for-pages` | `<a>` used to navigate to `/privacy-policy/` — must be `<Link />` from `next/link` |

**Not mine, deliberately not fixed.** This is someone's in-flight work; editing it risks conflicting with uncommitted changes I cannot see the intent behind. Flagging rather than touching it.

**Notes for whoever owns it**
- Line 33 is the same pattern `components/Header.tsx:19-22` already solves correctly, deriving state during render instead of in an effect — with a comment citing React's "you might not need an effect" guidance. Reuse that approach, or hydrate consent via a lazy `useState` initialiser.
- Line 108's `/privacy-policy/` has a **trailing slash**, which collides with the unresolved **WDL-033** convention. Switching to `<Link href="/privacy-policy">` fixes the lint error and sidesteps the slash question.
- A consent banner linking to the privacy policy is good practice — and note **WDL-031** still flags that policy as generic placeholder copy that does not describe actual data flows. The banner makes fixing it more urgent, since it now points users at it.

</details>

---

### 3.5.2 New issues raised by the re-sync

Four `[CODE]` findings from the concurrent work that had no existing ID. Filed per operating rule 5 as candidates to push back into the owner's tracker.

---

#### WDL-065 · Google review structured data removed — deliberate, and it reshapes WDL-007
**Status:** ✅ `FIXED` (decision recorded) · **Severity:** P2 · **Area:** SEO / structured data · `[CODE]`

**What changed** `components/Reviews.tsx` previously emitted a second `MedicalBusiness` node carrying `aggregateRating` (rating + review count) and a `review` array built from the Google Places API. That entire JSON-LD block has been **removed**. The reviews still render for humans; only the markup is gone.

**Why this is correct, not a regression.** The reviews are collected on **Google**, not on this site. Google's review-snippet guidance disallows marking up ratings aggregated from a third-party platform as your own first-party structured data. On a YMYL rehab domain a structured-data manual action is a materially worse outcome than losing a star snippet — and the rating is already visible to Google via the Business Profile, so the markup was adding risk without adding information.

**A second defect it also removed:** the visible review text is `line-clamp-6` truncated while the JSON-LD carried the **full** untruncated body. Structured data must reflect visible content; that mismatch is gone with the block.

**Consequences to carry**
- **WDL-007's criterion 2 ("rating attaches to that entity") is now moot** — flagged there; needs rewording or closing against this issue.
- The remaining `MedicalBusiness` in `app/layout.tsx` **still has no `@id`** — worth adding regardless, per WDL-007.
- If first-party reviews are ever collected *on this site*, `AggregateRating` becomes legitimate and this decision should be revisited.

**Acceptance criteria**
- [x] No third-party-sourced review markup emitted
- [x] Visible reviews unaffected
- [x] Rationale recorded so it is not silently "fixed" back
- [ ] `@id` added to the surviving entity (tracked in WDL-007)

---

#### WDL-066 · Phone number was hardcoded in 26 places despite `lib/site.ts` being the stated single source of truth
**Status:** ✅ `FIXED` · **Severity:** P2 · **Area:** Maintainability / correctness · `[CODE]`

**Problem** `README.md` and the ledger both state that phone, address and nav live only in `lib/site.ts`. They did not. `866-591-0888` / `+18665910888` appeared as **26 literals across 7 files** outside `lib/site.ts`: `components/BlogPostView.tsx` (two module constants), `app/contact/page.tsx` (meta description), and 23 occurrences inside FAQ answers and blog markdown in `lib/data/{admissions,blog,treatment-programs,treatment-substances,treatment-therapies}.ts`.

A number change would have updated the header, footer and call bar while silently leaving the wrong number in every FAQ answer and blog CTA — the highest-intent copy on the site. This is a live risk, not theoretical: the portfolio-wide instruction is *never touch a phone number* precisely because sister facilities have gotten this wrong.

**Fix applied** All 26 replaced with `${site.phone}` / `site.phoneHref`. Single-line double-quoted FAQ answers were converted to template literals; blog bodies were already template literals. `BlogPostView` now derives its callout regex from `site.phone` with a `RegExp` escape helper rather than two hand-maintained constants.

**Acceptance criteria**
- [x] Zero literals outside `lib/site.ts`
- [x] Enforced automatically — `npm run check` fails on any reintroduction (WDL-067)
- [x] tsc + lint + build green

---

#### WDL-067 · No automated content-integrity check; the class of defect the ledger is full of was unenforceable
**Status:** ✅ `FIXED` · **Severity:** P2 · **Area:** Tooling / CI · `[CODE]`

**Problem** The most common defect class in this ledger — a link to a route that does not exist, a page missing from the sitemap, an `<Image>` whose file was never committed — is invisible to `tsc`, `eslint` and `next build` alike. WDL-001 and WDL-006 both shipped to a passing build. There was also no CI: all four gates were manual.

**Fix applied** `scripts/check-content.mjs` — dependency-free, static, no app boot. Wired as `npm run check`, with `npm run verify` = lint + check + build, and `.github/workflows/ci.yml` running all three on push and PR. It fails on:

| Check | Catches |
| --- | --- |
| Internal `href` → known route | **WDL-001** class |
| `lib/site.ts` nav → real route | broken nav |
| `/images/*` → file on disk | gate 4, now automated |
| Indexable route → present in sitemap `core` | **WDL-006** class |
| Phone literal outside `lib/site.ts` | **WDL-066** class |

Pages declaring `robots: { index: false }` are exempted from the sitemap rule, so `/privacy-policy` stays correctly excluded without a hand-maintained ignore list — preserving S-001's by-design ruling.

**Validated by regression, not by assumption.** Each original defect was re-introduced and the check confirmed red: a dead CTA link ✅, a hardcoded phone ✅, a route removed from `core` ✅, the `...posts` spread dropped ✅. The **first version had a false negative** on the sitemap check — it searched the whole file, and the route string also appears in the `priority` ternary, so a page deleted from `core` still looked covered. Now scoped to the `core` array only.

**Acceptance criteria**
- [x] Runs in under a second, no dependencies
- [x] Each rule verified to fail when its defect is reintroduced
- [x] Wired into CI

---

#### WDL-068 · Brand rose failed WCAG AA on the primary CTA; §4 baseline checked only `--color-muted`
**Status:** ✅ `FIXED` · **Severity:** P1 · **Area:** Accessibility · `[CODE]`

**Problem** §4's contrast row measured `--color-muted` only and recorded PASS, which read as "contrast is fine". Both brand accents were failing:

| Usage | Was | Required |
| --- | --- | --- |
| White on `--color-rose` `#d86c97` — **every primary CTA, incl. "Call 866-591-0888"** | **3.22:1** | 4.5:1 |
| `--color-rose-dark` `#be5580` as text on white — links, "Learn more", **form error messages** | **4.37:1** | 4.5:1 |
| `.eyebrow` rose-dark on cream | 3.96:1 | 4.5:1 |
| JumpNav active pill, rose-dark on rose-soft (12px) | 3.68:1 | 4.5:1 |
| Input placeholders, `muted/70` on `cream/50` | 3.00:1 | 4.5:1 |

No button size exempted it — `lg` is 16px, and the large-text allowance needs 18.66px bold or 24px.

**Fix applied** `--color-rose` → `#bd4b79` (white on it **4.72:1**), `--color-rose-dark` → `#a8446d` (**5.66** on white, **5.12** on cream, **4.79** on sand, **4.76** on rose-soft). Placeholders now `text-ink-500` (**5.95:1**).

**The non-obvious part.** `--color-rose` is used both as a *background behind white text* and as *text on the dark ink panels* — requirements that pull in opposite directions. Darkening it for the buttons made it illegible on ink (would have dropped 4.64 → **3.17**, a regression). The four on-dark usages (`CtaBanner` eyebrow, three footer icons, header utility-bar shield) were therefore moved to `rose-soft` (**12.6:1**). The role of each token is now documented at the top of `app/globals.css` and in the README so the next person does not reintroduce the conflict.

**Acceptance criteria**
- [x] Every real usage of both accents ≥ 4.5:1
- [x] No on-dark regression
- [x] Token roles documented
- [x] §4 baseline row corrected

---

#### WDL-069 · `.eyebrow` was unlayered CSS, silently defeating every utility at the call site
**Status:** ✅ `FIXED` · **Severity:** P2 · **Area:** CSS architecture / accessibility · `[CODE]`

**Problem** `app/globals.css` declared `.eyebrow` **outside any cascade layer**, while Tailwind v4 emits all utilities inside `@layer utilities`. Unlayered CSS wins over *every* layer regardless of specificity or source order, so `.eyebrow` silently beat any utility trying to override the properties it declares — `color`, `font-size`, `font-family`, `font-weight`.

Four call sites were affected, in two different ways:

| Call site | Intent | Actually rendered |
| --- | --- | --- |
| `components/blocks.tsx:288` `eyebrow text-rose-soft` | rose-soft on the dark CtaBanner | **rose-dark — 2.65:1** ❌ |
| `app/blog/page.tsx:43` `eyebrow text-[0.65rem]` | 0.65rem | 0.78rem |
| `components/Header.tsx:114` `eyebrow text-[0.65rem]` | 0.65rem | 0.78rem |
| `components/Header.tsx:228` `eyebrow text-[0.6rem]` | 0.6rem | 0.78rem |

**The colour case was a regression introduced by WDL-068.** That issue moved four on-dark usages from `text-rose` to `text-rose-soft` to preserve contrast after darkening the rose ramp. Three were plain utility classes and worked. The fourth carried `.eyebrow`, so the override never applied — leaving the CtaBanner eyebrow at **2.65:1, worse than the 4.64:1 it had before WDL-068 touched it.** The three font-size cases were pre-existing and had never worked.

**Not an unknown hazard in this codebase.** `globals.css` already carried a comment on the `h1–h4` rule: *"must let `text-*` utilities (e.g. `text-white` on dark heroes/sections) win — so no explicit color here."* The `h1–h4` rule dodges the problem by declaring no colour; `.eyebrow` walked straight into it.

**Fix applied** Wrapped `.eyebrow` in `@layer components`. Components is declared before utilities, so utilities now win — fixing the colour regression and the three font-size overrides in one change, at the definition rather than at four call sites. Verified in the compiled CSS: `.eyebrow` at index 13091 inside `@layer components`, `.text-rose-soft` at 32747 inside `@layer utilities`.

**Audit performed:** every unlayered rule in `globals.css` was checked for the same hazard. `body` (background/color/font-family) and `h1–h4` (font-family/font-weight) also declare utility-shadowed properties, but neither causes a live defect — every heading in the codebase uses `font-semibold`, which matches the rule's `600`. `.prose *` rules are scoped and intentional. **No other call site is affected.**

**Acceptance criteria**
- [x] `.eyebrow` no longer defeats call-site utilities
- [x] CtaBanner eyebrow back to 12.6:1
- [x] Three font-size overrides now apply
- [x] All unlayered rules audited for the same class of bug

---

#### WDL-070 · Phone-click analytics could not distinguish the sticky mobile bar from in-page CTAs
**Status:** ✅ `FIXED` · **Severity:** P2 · **Area:** Analytics · `[CODE]`

**Problem** The delegated click listener added for **WDL-010** derived an attribution label from DOM position — `header`, `footer`, else `"body"`. It also read `anchor.dataset.callLocation`, but **nothing ever set that attribute**. So every phone CTA outside the header and footer collapsed into a single `"body"` bucket: the sticky mobile call bar, the homepage hero, the CtaBanner, the InsuranceStrip, and the form fallback links were indistinguishable.

That defeats the point of the tracking. On a mobile-first site the first question is whether the **sticky bar** or the **in-page CTAs** drive calls — that comparison decides mobile layout work, and it was unanswerable.

**Fix applied** Added an optional `trackAs` prop to `Button` (renders `data-call-location`, anchor branch only) and set explicit labels on the five distinct surfaces: `mobile-sticky-bar`, `homepage-hero`, `cta-banner`, `insurance-strip`, plus `form-delivery-failure` and `form-success-panel` on the raw anchors in `form-ui.tsx`. Header and footer keep their positional fallback.

**`form-delivery-failure` is a deliberate operational signal**, not just attribution: calls from that link mean the lead pipeline **rejected a submission**. A spike there is an outage alarm — which matters while `LEAD_WEBHOOK_URL` is unset (WDL-002) and every submission takes that path.

**Acceptance criteria**
- [x] Each major phone surface reports a distinct label
- [x] Verified in prerendered HTML — 4 distinct labels on the homepage
- [x] Form failure path separately identifiable

---

## 4. Baseline health

**Re-verified at the §3.5 re-sync, 2026-08-10. All four gates green.**

| Check | Result | Date |
| --- | --- | --- |
| `npm run build` | PASS — 52/52 routes prerendered, ~1.4s compile | 2026-08-10 (re-sync) |
| `npx tsc --noEmit` (strict) | PASS — 0 errors | 2026-08-10 (re-sync) |
| `npm run lint` | ✅ **PASS — 0 errors** (WDL-058 resolved; the FAIL recorded here was already stale when written) | 2026-08-10 (re-sync) |
| `npm run check` — content integrity | PASS — new gate, see **WDL-067** | 2026-08-10 (re-sync) |
| Nav hrefs → generated slugs | PASS — all resolve | 2026-08-10 (re-sync) |
| `/images/*` references → files on disk | PASS — 0 missing (53 referenced of 205 on disk) | 2026-08-10 (re-sync) |
| Broken internal links | PASS — 0 (S-001 confirms this build came back clean) | 2026-07-27 |
| Committed secrets | PASS — none; `.env.example` only | 2026-08-10 |
| Contrast: `--color-muted` #61646e | PASS — 5.3:1 on cream, 4.7:1 on sand (WCAG AA) | 2026-08-10 |
| Contrast: `--color-rose` / `--color-rose-dark` | ⚠️ **was FAIL, now PASS** — this table previously checked only `--color-muted` and missed both brand accents → **WDL-068** | 2026-08-10 (re-sync) |

Re-run all four gates before marking any issue `FIXED`. `npm run verify` runs lint + check + build in one command.

---

## 5. Issues

### P0 — Launch blockers

---

#### WDL-055 · Source document states this facility is temporarily closed — the entire site contradicts that
**Status:** ✅ `WONTFIX` — **resolved by owner confirmation 2026-08-10** · **Severity:** was P0 · **Area:** Business state · `[SHEET S-003, S-004]`

> ## ✅ RESOLVED — owner confirmed 2026-08-10: **the Pomona facility is operating normally.**
>
> Per operating rule 1, owner input is authoritative and overrides source documents. S-003's `Location temp closed` and S-004's missing folder are **stale or refer to something other than operating status**. No code changes required: all nine 24/7 availability claims and the `MedicalBusiness` `openingHoursSpecification` stand as written and are accurate.
>
> **Wave 0 is cleared.** The ledger proceeds as originally written.
>
> **One item to push upstream:** S-003 line 728 and the missing S-004 folder should be corrected at source, so the next person reading them does not reach the same wrong conclusion I did. Logged in §7 cross-repo.
>
> **Knock-on effect on WDL-056:** an operating facility makes the absence of our four published staff from both source documents *more* curious, not less — the "expected because the location paused" explanation no longer holds. Verification matters more now, not less.

<details>
<summary>Original finding, retained for the record</summary>

**What the source says.** S-003, the portfolio staff-bios document, contains exactly two lines about us (doc lines 727–728):

```
(Wellness Detox LA)
Location temp closed
```

**Why I am treating this as credible rather than a stray note.** Three structural signals point the same way:
1. Ours is the **only** facility heading in the document with zero bios; all ten others carry 2–54 entries.
2. Ours is the **only** heading written in parentheses — a convention the author used nowhere else.
3. We are **absent from the "OTHER FACILITY BIOS NEEDED" list**, which does itemise gaps for CALI, TEXAS, NJ, and KY. A location expected to staff up would appear there.

**Corroborated by an independent source (S-004, 2026-08-10).** The `~/Downloads/Staff Headshots` folder contains **no Wellness Detox LA folder** — while Hillside Mission, Laguna View, and Ocean Coast Recovery each have one under the same `Cali SOUTH` parent. Zero of 124 headshots relate to this facility. Two separately maintained artefacts, one textual and one a file tree, independently show a Southern California facility with no staff records. That is a meaningfully stronger signal than the bios doc alone.

**What I am not claiming.** S-003 is a bios-tracking document, not a business-status register. "Location temp closed" could conceivably mean bio collection is paused rather than the facility being shut. I am not asserting the facility is closed — I am asserting that **a QHG source document says so, and that nothing in this repo reflects it.** Only you can resolve which reading is right.

**What the site currently asserts — every one of these conflicts with a closed location:**

| Claim | Location |
| --- | --- |
| `openingHoursSpecification` 00:00–23:59, all 7 days, in `MedicalBusiness` JSON-LD | `app/layout.tsx:81-86` |
| "Available 24/7" trust badge | `app/page.tsx:85` |
| "24/7 medical monitoring" programme point | `lib/site.ts:143` |
| "24/7 Admissions · Confidential support" | `components/blocks.tsx:36` |
| "Our admissions team is available 24/7" | `components/ContactForm.tsx:56` |
| "Admissions open 24 hours a day" | `app/contact/page.tsx:21` |
| Sticky tap-to-call bar on **every** mobile page | `components/MobileCallBar.tsx` |
| Physical address 625 E Phillips Blvd, Pomona + embedded map | `lib/site.ts:16`, `app/contact/page.tsx:63` |
| Facility tour presented as a currently available residence — 26 photos | `app/tour/page.tsx`, `lib/site.ts:255` |

**Consequences if the facility is in fact temporarily closed**
- The site solicits 24/7 admissions calls to a location that cannot admit — people in crisis reach a number that cannot help them. That is the real harm, ahead of any SEO or compliance concern.
- Advertising unavailable services at a licensed address is a plausible regulatory exposure for a DHCS-licensed provider.
- Any paid search or Google Business Profile spend routes to a dead end.
- `MedicalBusiness` structured data asserting 24/7 availability becomes inaccurate to Google.
- It supplies important context for **WDL-034** (build frozen since 2026-07-09) and **WDL-030/050** (no bios): both are consistent with a location that paused operations.

**What I need from you — one answer unblocks or de-escalates this**
1. **Is the Pomona facility currently operating?** If yes, this is a stale note in S-003 and I will close WDL-055 as `WONTFIX` with your confirmation recorded.
2. **If temporarily closed:** is cutover still intended, and on what timeline? Options range from holding launch, to launching with availability language corrected and a redirect to an operating sister facility, to publishing an interim notice.
3. **Who takes calls to 866-591-0888 today?** This is the most urgent sub-question regardless of the rest — the number appears on every page and in the JSON-LD.

**Deliberately no code changes proposed yet.** Softening the 24/7 language, adjusting `openingHoursSpecification`, or gating the tour would each be significant, hard-to-reverse edits to live marketing claims. Making them on the strength of one line in a bios document — against your explicit instruction that your input is the law — would be the wrong call. Tell me the facility's status and I will implement whichever direction follows.

**Acceptance criteria**
- [x] Facility operating status confirmed by the owner, in writing, recorded here — **operating normally, 2026-08-10**
- [x] ~~If closed: launch decision~~ — not applicable
- [ ] S-003 + S-004 corrected upstream so they do not mislead the next reader → §7
- [x] Availability claims verified as accurate and left unchanged

</details>

---

#### WDL-001 · Primary "Verify Insurance" CTA never reaches the insurance form
**Status:** ✅ `FIXED` (verified 2026-08-10) · **Severity:** P0 → P2 · **Area:** Conversion / routing · `[CODE]`

> **Re-sync verification:** All 5 CTAs now point to `/admissions/verify-your-insurance`; zero references to `#insurance` remain. ⚠️ One acceptance criterion unmet: the path is **hardcoded in 5 places** rather than a single `site.verifyHref` constant — so **WDL-037** (possible slug rename) becomes a 6-file edit instead of 1.

> ### Re-sync verdict: the conversion defect is fixed; the maintainability criterion is not.
>
> All five call sites now point at `/admissions/verify-your-insurance`, and `InsuranceStrip`'s self-link is gone — verified in the prerendered homepage HTML: **12 links to the form page, 0 to `/admissions#insurance`**. The user-facing P0 is resolved, so severity drops to **P2**.
>
> **Criterion 3 fails.** The path is a bare string literal in **10 places** across `app/`, `components/` and `lib/`; there is no `site.verifyHref`. That is the exact fragility this issue was written to prevent, and it blocks the free absorption of **WDL-037** (slug rename to `/verify-insurance`) that step 4 was counting on.
>
> **Remaining work:** add `verifyHref` to `lib/site.ts`, replace the 10 literals. `scripts/check-content.mjs` (WDL-067) already fails the build on a dead internal link, so a botched rename cannot ship silently.
>
> **Item 3 of the original fix — the fate of `#insurance` — is still undecided.** `app/admissions/page.tsx:112` keeps `<div id="insurance">` as a section anchor. It is now nothing's link target, so it is harmless but dead; removing it is a WDL-052-adjacent judgement call about whether anchors are load-bearing.

> **Not in S-001.** This is the same defect class as V0017 (Dallas), which S-001 rates MEDIUM. Ours is worse: Dallas has 1 of 6 CTAs mislinked, we have **5 of 5**. Push upstream as a new row.

**Problem**
Five call sites point at `/admissions#insurance`. That anchor resolves to `app/admissions/page.tsx:112` — a `<div id="insurance">` wrapping the `InsuranceStrip` *promotional block*, not a form. `InsuranceStrip`'s own "Verify Insurance" button also targets `/admissions#insurance`, so once a visitor lands there the button in front of them is a self-referential no-op.

The actual form (`components/InsuranceForm.tsx`) lives at `/admissions/verify-your-insurance` and is reachable **only** via the desktop nav dropdown. S-001 V0080 independently notes that page is "linked from the homepage" — it is linked, but only through the nav, and every button that names it goes elsewhere.

**Evidence**
| File | Line | Element |
| --- | --- | --- |
| `components/Header.tsx` | 132 | Desktop "Verify Insurance" button |
| `components/Header.tsx` | 233 | Mobile menu "Verify Your Insurance" button |
| `components/MobileCallBar.tsx` | 22 | Sticky mobile bar "Verify Insurance" |
| `components/blocks.tsx` | 294 | `CtaBanner` "Verify Your Insurance" |
| `components/blocks.tsx` | 386 | `InsuranceStrip` "Verify Insurance" (self-link) |

**Fix**
1. Repoint all five to `/admissions/verify-your-insurance`.
2. Add the path to `lib/site.ts` as a constant (e.g. `site.verifyHref`) so the target lives in one place.
3. Decide the fate of `#insurance` on `/admissions` — keep as a section anchor or remove the wrapper.
4. Coordinate with **WDL-037**: if the slug moves to `/verify-insurance` per portfolio standard, the constant absorbs that change for free.

**Acceptance criteria**
- [x] Every "Verify Insurance" affordance on every page lands on the form
- [x] No button links to the anchor it is rendered inside
- [ ] **Target path referenced from exactly one constant** — 10 literals, no `site.verifyHref`
- [x] Build + lint pass

---

#### WDL-002 · PHI transmitted over unencrypted `mailto:` under a "100% private & protected" claim
**Status:** `IN PROGRESS` — code complete, delivery unconfigured · **Severity:** P0 · **Area:** Compliance / privacy · `[CODE]`

> **Re-sync verification (2026-08-10): the `mailto:` transport is gone — but leads are not being delivered.**
>
> Built correctly: `app/actions/leads.ts` (`"use server"`) → `lib/leads.ts` POSTs to `LEAD_WEBHOOK_URL` with a bearer token, redacts PII from logs, honeypots bots, and **fails loudly in production** rather than silently. Forms use `action={formAction}`. No `mailto:` remains in either form.
>
> **Two things still block closure:**
> 1. **`LEAD_WEBHOOK_URL` is unset** (`.env.example:19`). In production `lib/leads.ts:56` logs *"lead was NOT delivered"* and the form shows an error. So **the site cannot currently capture a lead at all** — a different failure from before, and a louder one, but still a total loss of inbound enquiries until configured.
> 2. **BAA still required.** The acceptance criterion "endpoint covered by a signed BAA" cannot be met by code. Whatever `LEAD_WEBHOOK_URL` points at must be BAA-covered, since the payload includes DOB, insurance member ID and addiction detail.
>
> Also still open: the on-page claims ("100% private & protected") should be re-checked against whatever the webhook actually is.

> ### Re-sync verdict: the `mailto:` transport is gone. The compliance claim is still unbacked.
>
> **What landed.** Both forms now post to Server Actions (`app/actions/leads.ts`) which validate server-side and hand off to `lib/leads.ts`, which POSTs JSON to `LEAD_WEBHOOK_URL` with an optional bearer token. `grep mailto:` returns **nothing** in either form. Validation is server-side (the actions are public POST endpoints, so the client checks are treated as convenience only), there is a honeypot, and `lib/leads.ts` redacts every PHI-bearing field name before anything reaches a log — verified: a run submitting `John Smith / 01/02/1980 / member W123456789` produced **zero** matches for any of those values in server output.
>
> **Why this is still P0 and still `BLOCKED`.**
> 1. **No endpoint exists.** `LEAD_WEBHOOK_URL` is unset and there is no `.env.local`. In production the pipeline currently *fails closed* — it tells the visitor to call instead of silently dropping the lead, which is the right failure mode, but it is not a working intake.
> 2. **Criterion 3 fails — the claims still overstate.** `components/InsuranceForm.tsx:46` still says "100% private & protected", `:125` "kept strictly confidential", and `app/admissions/verify-your-insurance/page.tsx:16` "our secure, confidential insurance form". HTTPS-to-an-unspecified-webhook does not substantiate those; only a BAA does. **Until the endpoint is signed, either the copy softens or the claims remain unbacked** — this was step 4 of the original fix and it was not done.
>
> **This remains the highest-risk item in the repo.** The transport work removed the worst mechanism, but a DHCS-licensed facility asserting "100% private & protected" over an unverified endpoint is still a compliance exposure, not an engineering one.

**Problem**
`InsuranceForm` collects name, date of birth, insurance provider, member/policy ID, plan type, and free-text detail about a person's addiction — then hands the whole payload to the visitor's mail client via `mailto:` (`components/InsuranceForm.tsx:47`). Transport is unencrypted and uncontrolled.

Simultaneously the UI asserts protections the transport does not provide:
- `components/InsuranceForm.tsx:83` — "100% private & protected"
- `app/admissions/verify-your-insurance/page.tsx:16` — "our secure, confidential insurance form"
- `components/InsuranceForm.tsx:143` — "kept strictly confidential"

`ContactForm` has the same transport with a lighter payload (`components/ContactForm.tsx:42`).

For a DHCS-licensed facility (`site.license` = DHCS #191425AP) this is the highest-risk item in the repo. Note S-001 treats unsubstantiated compliance claims as their own severity class (`COMPLIANCE`, V0070/V0100) — this belongs in that class.

**Fix**
1. Stand up a BAA-covered intake endpoint (Server Action or Route Handler → HIPAA-capable vendor).
2. Replace both `handleSubmit` bodies with a `POST`; the swap point is already commented in each file.
3. Add server-side validation and rate limiting; never log payload bodies.
4. Until (1) exists, soften the on-page claims so copy matches actual transport.

**Acceptance criteria**
- [x] No PHI leaves the browser via `mailto:`
- [x] Submission failures surface an error state (WDL-003)
- [ ] **On-page privacy claims match the implemented transport** — 3 claims still overstate
- [ ] **Endpoint covered by a signed BAA** — `LEAD_WEBHOOK_URL` unset

**Blocked on:** owner-supplied endpoint URL. **AMENDED (owner input) 2026-08-10.**

> ## ✅ OWNER RULING 2026-08-10 — **QHG already runs a HIPAA-capable endpoint; owner will supply it.**
>
> No procurement needed. Because the pipeline is already built and vendor-agnostic, **this becomes a configuration change, not a build**: set `LEAD_WEBHOOK_URL` (and `LEAD_WEBHOOK_TOKEN` if the endpoint authenticates) in Vercel → Settings → Environment Variables. Nothing in `app/actions/leads.ts` or `lib/leads.ts` needs to change.
>
> **Two things I need with the URL, not just the URL:**
> 1. **Written confirmation the endpoint is BAA-covered.** This is what substantiates criterion 3 — the "100% private & protected" and "secure, confidential" claims. An endpoint that is merely HTTPS does not make those claims true; a signed BAA does. **If the BAA cannot be confirmed, the copy softens instead** — that decision does not go away just because an endpoint exists.
> 2. **The payload shape it expects.** `deliverLead()` currently POSTs `{ kind, submittedAt, fields{…} }`. If the QHG endpoint wants different keys, that mapping is a small edit in `lib/leads.ts` — but it must be verified against the real endpoint, not assumed.
>
> **Verification before this is marked FIXED:** submit one test lead through each form against the live endpoint and confirm it arrives in the QHG system. The failure path is already proven (form reports failure and offers the phone rather than silently dropping the lead), so a misconfiguration will be visible rather than silent.
>
> **Unblocks WDL-045** — the two "Get Help" pages can take real forms once this is live.

---

#### WDL-003 · Both forms report success even when nothing was sent
**Status:** ✅ `FIXED` (verified 2026-08-10) · **Severity:** P0 · **Area:** Conversion / correctness · `[CODE]`

> **Re-sync verification:** No `setSent(true)` remains anywhere. Forms use `useActionState` against a server action and return `{status:"error"}` with the phone fallback, so success only renders on confirmed delivery.

> ### Re-sync verdict: fixed, and verified against a live receiver rather than by reading the code.
>
> Success now derives from the Server Action's return value (`state.status === "success"`), which is set only after `deliverLead()` resolves true. Failure renders `FormError` with a tap-to-call CTA.
>
> **Verified by driving the real forms** against a local HTTP receiver, exercising both the configured and misconfigured paths:
>
> | Case | Result |
> | --- | --- |
> | Valid contact / insurance, endpoint up | Success panel **and** lead received |
> | **Endpoint not configured** (the production-misconfig case) | **Failure + phone CTA — no success panel** |
> | Missing name / no contact method / bad email / short phone / missing provider | Correct per-field messages, form values preserved |
> | Honeypot filled | Success shown, **0 delivered** — see note |
> | PHI in server logs | None |
>
> This also proved the forms work **without JavaScript**: the submissions above were replayed through the server-rendered progressive-enhancement path (hidden `$ACTION_*` fields), not the client bundle. The old `mailto:` handoff could not work at all without JS.
>
> **One deliberate exception to criterion 3.** A filled honeypot renders the success panel without delivering anything — that is the point of a honeypot, since telling a bot it failed invites a retry. Recorded so a future reader does not file it as a regression of this issue.

**Problem**
`setSent(true)` runs unconditionally on the line after `window.location.href = "mailto:…"`. If the visitor's browser has no registered mail handler — routine on desktop Chrome — the mail client never opens, nothing is transmitted, and the UI still renders "Your request is ready to send." The lead is lost silently while the visitor believes they have been heard.

**Evidence** `components/ContactForm.tsx:45` · `components/InsuranceForm.tsx:50`

**Fix** Resolve with WDL-002: gate `setSent` on a successful response and add an explicit error branch offering the phone number. If `mailto:` must survive as an interim, reword to "Your email app should now be open" and always show the call fallback.

**Acceptance criteria**
- [x] Success state only renders on confirmed submission
- [x] Failure state renders with the phone CTA
- [x] No path shows success after a no-op *(except the honeypot, by design — see above)*

---

#### WDL-033 · Trailing-slash convention conflicts with production on every URL
**Status:** ✅ `OPEN` — **ruled, ready to implement** · **AMENDED (owner input) 2026-08-10** · **Severity:** P0 · **Area:** SEO / cutover · `[SHEET V0102 — CRITICAL]`

> ## ✅ OWNER RULING — **match production: trailing slashes win.**
>
> Set `trailingSlash: true` in `next.config.ts`. Every currently-indexed production URL keeps working, and there is **no redirect churn on live traffic at cutover** — the lowest-risk option for existing rankings.
>
> **This closes the canonical problem as a side effect, exactly as S-001 predicted.** Canonicals are relative paths resolved against `metadataBase`, so with `trailingSlash: true` they emit the slash form and resolve **200 in one hop** against production instead of pointing at a 301.
>
> **Knock-on work, all now unblocked:**
> - **WDL-032** — the `pageMeta(path)` helper must emit the slash convention. Previously sequenced behind this ruling; now clear to build.
> - **WDL-008** — every redirect `source` and `destination` must be written slash-form. The 13 guessed rules are slashless today and would each generate a second hop; they need rewriting or deleting when the GSC export lands.
> - **`/about/blog/`** — V0133's indexed slash form is covered automatically once `trailingSlash: true` is set, closing a gap the current slashless rule misses.
>
> **Portfolio caveat carried forward:** this is a 12-site convention. The other 11 builds are slashless; consistency across them was S-001's actual concern, so this ruling should be propagated upstream rather than applied here alone.

**Problem**
S-001 rates this **the single largest cutover issue in the audit by URL count**, affecting all 1,046 preview URLs portfolio-wide. Verified 12 of 12 previews are slashless; 12 of 12 production sites are slash-canonical.

**Confirmed in this repo:** `next.config.ts` does not set `trailingSlash`, so Next's default applies — this build serves the slashless form at 200 and 308-redirects the slash form. Production `wellnessdetoxla.com` is slash-canonical and 301s the slashless form.

Two consequences:
1. At cutover, every inbound link or citation using the production slash convention hits a redirect.
2. **It is also the root cause of our canonical problem.** Every page sets `alternates.canonical` as a relative path resolved against `metadataBase` (`https://wellnessdetoxla.com`) — producing slashless canonicals that point at URLs production 301s. A canonical aimed at a redirect is a conflicting signal. S-001 notes this explicitly for us in the V0080 correction, and it is why V0018/V0067 exist for sister sites.

S-001's own verification note: *"Fixing the slash convention fixes those as a side effect — worth noting so the same work is not scoped twice."*

**Fix**
1. **Owner ruling required:** slash or slashless, portfolio-wide. Consistency across the 12 builds matters more than which one wins.
2. Set `trailingSlash` in `next.config.ts` to match.
3. Align the redirect map (WDL-008) to the chosen convention.
4. Re-verify canonicals resolve at 200 with no hop — this closes the canonical half without separate work.

**Acceptance criteria**
- [ ] Convention decided and documented
- [ ] `trailingSlash` set explicitly in `next.config.ts`
- [ ] Every canonical resolves 200 in one hop against the production domain
- [ ] Redirect map agrees with the convention
- [ ] Verified on a sample of 10 URLs spanning all 4 dynamic route families

**Blocked on:** portfolio-wide convention decision (affects 11 sister sites).

---

#### WDL-034 · Build is missing production content published after the snapshot
**Status:** `BLOCKED` (needs re-sync) · **Severity:** P0 · **Area:** Content / cutover · `[SHEET V0124 — CRITICAL]`

**Problem**
S-001 finds every Vercel build was generated from a content snapshot around **15–16 July 2026**, while production kept publishing. 15 pages across 10 of 12 sites exist on production but are absent from their build, and **the gap widens every day the builds stay frozen.**

**Confirmed for this site:** `https://wellnessdetoxla.com/luxury-rehab-in-los-angeles/` is live on production. `grep -rn "luxury" lib/data/ app/` returns nothing — the page does not exist in this repo, in any data file, or in the sitemap.

This repo's last commit is **2026-07-09**, a week *before* the snapshot S-001 describes — so there may be additional divergence beyond the single URL S-001 caught. Today is 2026-08-10: the audit's URL list is a month stale and S-001 explicitly says to re-run the diff.

**Fix** (S-001's prescribed order)
1. **Freeze or sync.** Either pause publishing to production until cutover, or establish a re-sync step. Without one, every new post is lost at launch.
2. **Re-run the diff immediately before cutover.** Method: pull `wellnessdetoxla.com/sitemap_index.xml`, filter `lastmod >= 2026-07-09`, test each URL against the build.
3. Port `/luxury-rehab-in-los-angeles/` (and anything else the fresh diff surfaces) into `lib/data/`, or add it to the redirect map with a deliberate destination.
4. Confirm whether the deployed preview matches this local checkout — the commit date and snapshot date disagree.

**Acceptance criteria**
- [ ] Fresh production-vs-build diff run within 48h of cutover
- [ ] Every production URL either exists in the build or has a deliberate 301
- [ ] `/luxury-rehab-in-los-angeles/` resolved either way
- [ ] Publishing freeze agreed, or a re-sync step documented

**Blocked on:** production URL inventory (WDL-008 / GSC export). **Freeze decision settled — AMENDED (owner input) 2026-08-10.**

> ## ✅ OWNER RULING 2026-08-10 — **publishing freeze until cutover.**
>
> No new pages go live on the WordPress site between now and launch. **The gap stops growing today**, which turns this from a moving target into a fixed, finite porting job — and it removes the residual risk in the alternative, where anything published in the final 48h window could still be lost.
>
> **The backlog still has to be cleared.** The freeze prevents *new* drift; it does not resolve the ~1 month already accumulated (repo last commit 2026-07-09, snapshot ~15–16 July, today 10 August). Known missing: `/luxury-rehab-in-los-angeles/`. Unknown: everything else, until the GSC export from **WDL-008** arrives — the same artefact serves both issues, so pull it once.
>
> **Revised plan**
> 1. ✅ Freeze agreed — record the freeze date so the diff has a definite upper bound.
> 2. ⏳ On GSC export: diff production against the build, list every URL absent here.
> 3. ⏳ Port genuinely valuable pages into `lib/data/` (`/luxury-rehab-in-los-angeles/` is a high-commercial-intent query and should be ported, not redirected).
> 4. ⏳ Redirect the rest deliberately, in the slash convention settled by **WDL-033**.
> 5. ⏳ Re-run the diff within 48h of cutover as a final check — cheap, and it catches anything published before the freeze took effect.
>
> **Still open regardless of the freeze:** fix step 4 — confirming the deployed Vercel preview matches this local checkout. The commit date and the snapshot date disagree by a week, and nothing has yet reconciled them.

---

### P1 — Ship soon

---

#### WDL-032 · `og:url` declares the homepage on 36 of 44 pages
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P1 · **Area:** SEO / social · `[SHEET V0081 — CONFIRMED, no amendment]`

> **Closed 2026-08-10.** New `lib/seo.ts` `pageMeta()` helper applied across all 16 page modules. **Verified against the built HTML: 46 pages now emit an `og:url` matching their own path, 0 wrong, 0 missing `og:site_name`** — previously 36 of 44 declared themselves the homepage.
>
> This also fixed **an unlogged second bug** found while reading the Next 16 docs: because `openGraph` is *overwritten* rather than deep-merged, the 7 blog posts (which did set their own `openGraph`) were silently dropping `siteName` and `locale` entirely. A naive "add `url` per page" fix would have spread that loss to all 44 pages. The helper emits a complete `openGraph` object every time, so both bugs close together — and the root layout no longer sets a site-wide `url`, meaning a future page that forgets the helper gets *no* `og:url` (neutral) rather than the wrong one (harmful).

> ### Re-sync verdict: completely untouched. §3.5 attributed `app/layout.tsx 26 lines` to "WDL-032 and/or WDL-010" — that diff was **WDL-010 + WDL-005**.
>
> Re-confirmed against the code: `app/layout.tsx` still sets `openGraph.url = site.url`; `lib/seo.ts` does not exist; still exactly **two** files define `openGraph` (`app/layout.tsx`, `app/[slug]/page.tsx`). The diagnosis and the two-template fix stand exactly as written.
>
> **Count now 37 of 45**, not 36 of 44 — `/admissions/verify-your-insurance` joined the sitemap under WDL-006 and inherits the root `og:url` like the rest. The conversion page S-001 singled out is currently telling social platforms it is the homepage.
>
> **Sequence after WDL-033.** The `pageMeta(path)` helper emits canonical *and* `og:url` from one string, so building it before the slash convention is settled means writing the wrong convention into one place instead of two — cheap to redo, but pointless. WDL-033 is question 1 of the owner batch.

> This is the one row S-001 verified as **exactly accurate as written**, and I missed it in the code audit.
>
> Its reliability is unusually well established. S-001 ran seven og:url rows across the portfolio; every generated count was exact, but five understated scope by omitting large absent-tag populations. Its verification log records that **only V0053 (Marina Harbor) and V0081 (ours) were complete as written** — and for us, *"All 44 pages have an og:url element, so there is NO absent-tag population here."* Take this row at face value; no scope expansion needed.

**Problem**
36 of 44 pages emit `og:url` pointing at the bare domain root, so each declares itself the homepage to social platforms and to any crawler using `og:url` as a URL hint. S-001 confirms the count is exact and that no page is *missing* the tag — 7 carry a correct page-specific value.

**Confirmed in this repo, and the diagnosis is precise.** Only two files define `openGraph`:
- `app/layout.tsx:38-46` sets `openGraph.url = site.url`
- `app/[slug]/page.tsx:26-33` sets a correct per-post `url`

Next.js does not merge `openGraph` field-by-field from a parent — a page that omits `openGraph` inherits the parent object wholesale, root `url` included. So the 7 correct pages are exactly the 7 blog posts, the homepage is correct by coincidence, and the other 36 inherit the root.

S-001's verification note nails the fix shape: *"the 7 correct pages are all ROOT-LEVEL URLs while the 36 wrong ones are nested. So og:url is being set correctly by one template and defaulted to the domain root by another — **a two-template fix, not 36 page edits**."*

**Fix**
1. Remove `url` from the `openGraph` block in `app/layout.tsx` — do not set a site-wide default that is wrong everywhere but one page.
2. Set `openGraph.url` per page alongside the `alternates.canonical` each page already declares. Best done with a small helper so canonical and `og:url` cannot drift:
   ```ts
   // lib/seo.ts
   export const pageMeta = (path: string) => ({
     alternates: { canonical: path },
     openGraph: { url: path },
   })
   ```
3. Apply to the three `ContentPage` route templates and the static pages.
4. Note S-001's minor: its Fix example cites `wellnessdetoxla.com/about`, which 301s — use the convention settled in **WDL-033**.

**Acceptance criteria**
- [ ] Every page emits `og:url` equal to its own canonical
- [ ] No page declares the domain root unless it *is* the root
- [ ] Canonical and `og:url` derive from one source per page
- [ ] Spot-checked across all 4 dynamic route families + every static page

---

#### WDL-004 · Collapsed accordion content stays in the tab order and accessibility tree
**Status:** ✅ `FIXED` (verified 2026-08-10) · **Severity:** P1 · **Area:** Accessibility · `[CODE]`

> **Re-sync verification:** Both collapse patterns now use `inert` plus `aria-controls` — `FAQ.tsx:24,41` and `Header.tsx:199,214`. Collapsed content leaves the accessibility tree and the tab order.

> ### Re-sync verdict: fixed on both patterns, and not predicted by §3.5.
>
> Both collapse wrappers now carry **`inert`** when closed — `components/FAQ.tsx` on the answer panel, `components/Header.tsx` on each mobile submenu. `inert` removes the subtree from the tab order *and* the accessibility tree in one attribute, without touching the `grid-rows-[1fr]→[0fr]` transition, so criterion 4 holds. React 19 accepts it as a boolean prop, and it is supported across Next 16's stated browser floor (Chrome/Edge/FF 111+, Safari 16.4+).
>
> `aria-controls` is now paired with `aria-expanded` on both toggles (`FAQ.tsx:23-24`, `Header.tsx:198-199`), and FAQ panels are `role="region"` + `aria-labelledby`. Confirmed in the prerendered HTML of `/treatment/detox`: 14 `inert` attributes, 15 `aria-controls`.
>
> **Note for WDL-049.** The `/admissions` static FAQ cards should be converted to this component *after* this fix, not before — which is now the case, so that conversion inherits the accessible version. Sequencing preserved.
>
> **Does not cover WDL-027** — the *desktop* dropdowns still lack `aria-haspopup`/`aria-expanded` and Escape handling. Separate issue, still open.

**Problem** Both collapse patterns animate `grid-rows-[1fr]` → `grid-rows-[0fr]` with an `overflow-hidden` inner wrapper. This clips visually but does **not** remove content from the accessibility tree or the tab order. A keyboard user tabbing the open mobile menu walks through roughly 20 invisible links.

**Evidence** `components/Header.tsx:186` (mobile submenus) · `components/FAQ.tsx:30` (FAQ panels)

**Fix** Apply `hidden`/`inert` to the collapsed wrapper once the transition ends, or switch to a `height`/`max-height` animation with `visibility: hidden` at rest. Add `aria-controls` on both toggles.

**Acceptance criteria**
- [x] Tab order skips collapsed panels
- [x] Screen reader does not announce collapsed content
- [x] `aria-expanded` + `aria-controls` paired on every toggle *(mobile; desktop dropdowns are WDL-027)*
- [x] Animation preserved

---

#### WDL-005 · No skip-to-content link; `<main>` has no target id
**Status:** ✅ `FIXED` (verified 2026-08-10) · **Severity:** P1 · **Area:** Accessibility · `[CODE]`

> **Re-sync verification:** `app/layout.tsx:108` adds an `sr-only focus:not-sr-only` skip link as the first focusable element; `<main id="main">` at line 114 is the target.

> ### Re-sync verdict: the link exists and works visually, but focus may not actually move.
>
> `app/layout.tsx` now renders a `sr-only focus:not-sr-only` skip link as the **first element in `<body>`**, before `<Header />`, and `<main id="main">` has its id. Criteria 1 and 2 pass.
>
> **Criterion 3 does not.** `<main id="main">` has **no `tabIndex={-1}`**. A fragment link to a non-focusable element reliably moves the *scroll position*, but several browsers leave keyboard focus on the skip link itself — so the next Tab press returns the user to the top of the header, which is the precise failure this issue exists to prevent. The fix is one attribute:
> ```tsx
> <main id="main" tabIndex={-1} className="...">
> ```
> `tabIndex={-1}` makes it programmatically focusable without adding a tab stop. Worth pairing with `focus:outline-none` so sighted mouse users never see a focus ring on the whole main region.

**Problem** Keyboard and screen reader users traverse the full header — utility bar, logo, five nav items with dropdowns, phone, CTA — on every page before reaching content. `app/layout.tsx:107` renders `<main>` with no `id`.

**Fix** Add `id="main"` to `<main>` plus a visually-hidden-until-focused skip link as the first focusable element in `<body>`.

**Acceptance criteria**
- [x] Skip link is the first Tab stop
- [x] Visible on focus, hidden otherwise
- [ ] **Moves focus to `<main>`** — needs `tabIndex={-1}` on the target

---

#### WDL-006 · Sitemap omits `/admissions/verify-your-insurance`
**Status:** ✅ `FIXED` (verified 2026-08-10) · **Severity:** P1 · **Area:** SEO · `[CODE]` + `[SHEET V0080 — CONFIRMED_AMENDED]`

> **Re-sync verification:** `/admissions/verify-your-insurance` present in `app/sitemap.ts:20` with its own priority tier. `/privacy-policy` correctly still excluded.

> ### Re-sync verdict: fixed exactly as specified.
>
> `/admissions/verify-your-insurance` is in the `core` array with **priority 0.9**, as the fix prescribed. Served `/sitemap.xml` now emits **45 URLs** (was 44), each exactly once. `/privacy-policy` remains correctly absent — S-001's by-design ruling is preserved.
>
> **The recurrence guard the fix asked for now exists.** `scripts/check-content.mjs` (WDL-067) derives every route from the filesystem and data modules and **fails the build if an indexable route is missing from `core`**, exempting pages that declare `robots: { index: false }` — which is how `/privacy-policy` stays legitimately excluded without a hand-maintained ignore list. This was tested by deleting the path and confirming the check goes red.
>
> The check's first version had a **false negative here** worth recording: it searched the whole of `sitemap.ts` for the route string, which also appears in the `priority` ternary, so a page removed from `core` still looked covered. Now scoped to the `core` array only.
>
> **If WDL-037 renames the slug**, `core`, the priority ternary, and `site.verifyHref` (WDL-001) must move together — the content check will catch the internal links but not a stale sitemap entry pointing at a route that no longer exists.

> **Found independently in both sources.** S-001 verified it and split the row usefully.

**Problem** The `core` array in `app/sitemap.ts:11` lists ten static paths and omits the site's main conversion page. S-001's verification: `/admissions/verify-your-insurance` is `robots: "index, follow"`, 266 words, and wrongly excluded — **a genuine defect.**

**Resolved by S-001, not a defect:** `/privacy-policy` is also absent from the sitemap, but it is `noindex, follow` (`app/privacy-policy/page.tsx:10`), and *"a noindex page SHOULD be excluded from the sitemap, so this is correct behaviour."* S-001 closes this half as by-design, consistent with V0068 (Laguna) and V0100. **No action on privacy-policy.**

Corroborated a third time: V0068's verification log pre-clears us before our row was even raised — *"Same applies to the Wellness Detox LA privacy row when it comes up: verified also 'noindex, follow'. The other two pages flagged by that same generator loop are genuine — Dallas /verify-insurance and Wellness LA /admissions/verify-your-insurance are both 'index, follow', so those omissions are real defects."* Of the 6 sitemap-omission rows portfolio-wide, ours is **1 of only 2 genuine defects**. See **WDL-054** for the separate question of whether `noindex` is the right portfolio choice.

**Fix** Add `/admissions/verify-your-insurance` to `core` with priority `0.9`. Consider deriving the static list from the route tree to prevent recurrence. If WDL-037 renames the slug, update both together.

**Acceptance criteria**
- [x] Path present in `/sitemap.xml`
- [x] Every indexable route appears exactly once *(45 URLs, enforced by `npm run check`)*
- [x] `/privacy-policy` remains excluded (deliberately)

---

#### WDL-007 · Two competing `MedicalBusiness` JSON-LD entities
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P1 → P2 · **Area:** SEO / structured data · `[CODE]`

> **Closed 2026-08-10.** Added `"@id": "${site.url}/#business"` to the `MedicalBusiness` node so any other node can reference the one entity. Also added `sameAs` (the three social profiles), `hasMap`, `areaServed` (LA, Pomona, LA County, Southern California) and `parentOrganization` → Quadrant Health Group. Combined with WDL-065's removal of the duplicate node, there is now exactly one business entity per page, identified.

> ### Re-sync verdict: the duplicate is gone — but via the route this issue listed second, and further than it intended.
>
> `components/Reviews.tsx` now emits **no JSON-LD at all**. `grep MedicalBusiness` returns 1 hit (`app/layout.tsx`) and 0 in `Reviews.tsx`, so the two-competing-entities defect is genuinely resolved and criterion 1's "one business entity per page" holds.
>
> **But the removal was made for a different reason than this issue contemplated,** and it changes the issue's shape — see **WDL-065**. The `aggregateRating` and `review` nodes were deleted under Google's third-party review-snippet policy, not merged onto a shared `@id`. Consequences:
> - **Criterion 2 ("rating attaches to that entity") is now unreachable as written** — there is no rating in the markup to attach. It needs rewording or closing against WDL-065.
> - **Criterion 1 is only half met.** One entity, yes — but it still declares **no `@id`**, so the fix's core recommendation was not applied. Adding `"@id": "${site.url}/#business"` remains worth doing: it gives future nodes (FAQPage, BlogPosting, LocalBusiness) something stable to reference.
>
> **Still unactioned from the original fix:** `sameAs` (the three social URLs already in `lib/site.ts:27`), `geo`, `hasMap`, `areaServed`. All cheap, all still valuable, none blocked.

**Problem** `app/layout.tsx:56` emits a `MedicalBusiness` node on every page. `components/Reviews.tsx:87` emits a **second** on the homepage carrying `aggregateRating` and `review`. Neither declares `@id`, so search engines may read two distinct businesses and the rating may not attach to the primary entity.

**Fix** Give both `"@id": "${site.url}/#business"`. Better: drop the duplicate identity from `Reviews.tsx` and emit only `aggregateRating` + `review` against the shared `@id`. While there, consider `sameAs` (the three social URLs at `lib/site.ts:27`), `geo`, `hasMap`, `areaServed`.

**Acceptance criteria**
- [ ] **One business entity per page, shared `@id`** — one entity ✅, `@id` still absent ❌
- [ ] ~~Rating attaches to that entity~~ — **moot**: rating markup removed under WDL-065; reword or close with that issue
- [ ] Validates in Google Rich Results Test

---

#### WDL-008 · Cutover redirect map is incomplete
**Status:** ⚠️ `AWAITING INPUT` — **1 → 14 redirects, but all 13 new ones are guesses (re-sync 2026-08-10)** · **Severity:** P1 · **Area:** SEO / migration · `[CODE]` + `[SHEET V0116, V0133, V0124]`

> ### Re-sync verdict: more redirects, no more information. Status unchanged, deliberately.
>
> `next.config.ts` now declares **14** redirects, up from 1: WordPress infrastructure paths (`/feed`, `/blog/feed`, `/category/:slug`, `/tag/:slug`, `/author/:slug`) and guessed legacy paths (`/verify-your-insurance`, `/insurance`, `/contact-us`, `/about-us`, `/our-team`, `/gallery`, `/programs`). All verified returning 308 to live destinations.
>
> **These do not close this issue, and should not be mistaken for progress on it.** They were written from *convention*, not from the production URL inventory. Three specific risks:
> 1. **The known-live URLs are still unmapped.** `/luxury-rehab-in-los-angeles/` (V0124) still has no destination, and the **slash form** `/about/blog/` — which V0133 records as indexed *today* — is still uncovered, because a slashless `source` does not match it. Both are documented, both were missed.
> 2. **A wrong guess is worse than a 404.** `/programs → /treatment` is a permanent 308; if production's `/programs` was something else, that is a hard-to-reverse mis-mapping of a real ranking URL.
> 3. **They create false confidence.** The redirect table in §3 now looks substantially populated while the actual coverage question is untouched.
>
> **The ask is unchanged and is question 2 of the owner batch:** `wellnessdetoxla.com/sitemap_index.xml`, or a GSC → Pages → *Last crawled* export. Once that exists, every guessed rule above should be **re-verified or deleted**, not kept because it is already there.

> ## ✅ OWNER RULING 2026-08-10 — **AMENDED (owner input): Search Console export incoming.**
>
> Owner will export the URL inventory from Google Search Console. Best available source: it returns real URLs with real impressions, so redirects can be **prioritised by traffic actually earned** rather than treated as a flat list — and it surfaces indexed-but-unlinked pages that a sitemap or a crawl would both miss.
>
> **Preferred export:** GSC → **Pages** → Export, or **Performance → Pages** exported as CSV (the latter carries clicks/impressions, which is what enables prioritisation). Drop it anywhere in the repo and tell me the path.
>
> **Two things I will do the moment it lands:**
> 1. **Re-verify or delete all 13 guessed redirects.** They stay flagged as unverified until each is matched against a real URL. A guess that happens to be in the file is not evidence.
> 2. **Rewrite every rule in the slash convention** now settled by **WDL-033** — the current rules are slashless and would each cost a second hop.
>
> Still `AWAITING INPUT`; the deliverable is now named and owned.

**Problem** `next.config.ts` contained exactly one redirect (`/about/blog` → `/blog`). Every unmapped legacy path becomes a 404 at cutover and forfeits its accumulated ranking and backlinks.

S-001 supplies fragments but not an inventory:
- `wellnessdetoxla.com/about/blog/` — live, indexed, **slash form not covered** by the current rule (V0133)
- `wellnessdetoxla.com/blog/` — live, competing index (V0133)
- `wellnessdetoxla.com/luxury-rehab-in-los-angeles/` — live, no destination exists (V0124 → WDL-034)
- `wellnessdetoxla.com/about` — 301s on production (V0081 note)

S-001's V0116 also warns the portfolio slug rows *"were written from preview data only and do not reflect production values"* — so production slugs must be read from production, not inferred from this build.

**Fix**
1. Pull `wellnessdetoxla.com/sitemap_index.xml` (WordPress/Yoast) and/or a GSC Pages export.
2. Diff against §3. Record the inventory under §1.
3. Author 301s for every retired path; anything without an equivalent goes to the nearest hub, not the homepage.
4. Apply the **WDL-033** slash convention consistently — do this *after* that ruling or the map gets written twice.
5. Verify each redirect resolves in one hop.

**Acceptance criteria**
- [ ] Old URL inventory recorded in §1
- [ ] Every legacy URL either resolves or 301s to a relevant page
- [ ] No redirect chains
- [ ] Both slash forms of `/about/blog` covered
- [ ] Map agrees with the WDL-033 convention

**Blocked on:** production URL inventory.

---

#### WDL-009 · No custom 404 page
**Status:** ✅ `FIXED` (verified 2026-08-10) · **Severity:** P1 · **Area:** UX / conversion · `[CODE]`

> **Re-sync verification:** `app/not-found.tsx` present.

> ### Re-sync verdict: fixed, and not predicted by §3.5.
>
> `app/not-found.tsx` exists. Because it renders inside the root layout it inherits the header, footer and sticky mobile call bar automatically, so criterion 1 is satisfied without duplicating chrome.
>
> Verified against a live server on an unmapped URL:
>
> | Criterion | Result |
> | --- | --- |
> | Branded, with header / footer / call bar | ✅ inherits the root layout |
> | Phone number above the fold | ✅ primary `Button` on `site.phoneHref`, plus the sticky bar |
> | Links to the four primary destinations | ✅ **six** — Treatment, Admissions, Verify Insurance, Tour, Areas, Blog |
> | Returns HTTP 404 | ✅ confirmed `404`, and Next's default *"This page could not be found"* string is gone |
>
> It is also `robots: { index: false, follow: true }`, so `npm run check` correctly exempts it from the sitemap coverage rule rather than demanding it be listed.
>
> **This raises the value of WDL-008, it does not lower it.** A good 404 softens the landing; it still loses the link equity and the visitor's intent that a real 301 would preserve. The 13 speculative redirects added alongside it are guesses — the URL inventory is still the actual fix.

**Problem** `app/not-found.tsx` does not exist, so `dynamicParams = false` misses and every unmapped legacy URL lands on Next's unbranded default 404 — no header, no phone number, no route back. Given WDL-008 is incomplete and WDL-034 proves production URLs are missing from this build, this page **will** be hit at cutover. For a site whose visitors may be in crisis, a dead end is the worst possible response.

**Fix** Add `app/not-found.tsx` using `PageHero` + `Container`: apologetic headline, prominent tap-to-call `site.phoneHref`, links to Treatment / Admissions / Verify Insurance / Contact.

**Acceptance criteria**
- [x] Branded 404 with header, footer, mobile call bar
- [x] Phone number above the fold
- [x] Links to the four primary destinations *(six)*
- [x] Returns HTTP 404

---

#### WDL-010 · Analytics loads unconditionally on intake pages, with no consent gate
**Status:** ✅ `FIXED` in code (verified 2026-08-10) · **AMENDED (owner input)** · **Severity:** P1 · **Area:** Compliance / privacy · `[CODE]`

> **Re-sync verification:** `components/Analytics.tsx` gates `gtag` behind opt-in; `app/layout.tsx:122` renders it. ⚠️ The *documented consent policy* criterion is still outstanding — that is a legal signoff, not code. Also **WDL-021** (Maps iframe) is NOT yet gated by this mechanism.

> ## ✅ OWNER RULING 2026-08-10 — **opt-in consent banner ratified as built.**
>
> The policy question this issue was blocked on is now answered: **opt-in consent is the site's documented position.** No GA4, no cookies, no request to Google until the visitor agrees; `anonymize_ip` on; choice persisted and synced across tabs. Criterion 1 is satisfied — the policy is now *chosen*, not merely implemented.
>
> **Two consequences the owner accepted with this:**
> 1. **WDL-021 inherits the same gate.** The Google Maps iframe on `/contact` still loads unconditionally, which is inconsistent with asking permission before GA4 — the iframe sets its own Google cookies. Now unblocked and should be gated behind the same consent state, with a click-to-load placeholder so the address stays visible to everyone.
> 2. **WDL-031 is now urgent, not cosmetic.** The banner links visitors to a privacy policy that is still generic placeholder copy and does not describe the actual data flows — which now comprise a consent-gated GA4 with three named events and a server-side lead pipeline carrying PHI. A consent mechanism pointing at a policy that describes neither is weaker than no banner at all. **Escalating WDL-031 P3 → P1.**

> ### Re-sync verdict: technically done, but it answered a question that was the owner's to answer.
>
> **What landed.** `gtag.js` is gone from `app/layout.tsx` entirely. `components/Analytics.tsx` loads it **only** after an explicit opt-in, with `anonymize_ip: true`. Consent is read via `useSyncExternalStore` over `localStorage`, so it survives reloads and syncs across tabs. Verified in the prerendered homepage HTML: **0 occurrences of `googletagmanager`** before consent.
>
> Criteria 2 and 3 pass. No form field values reach `dataLayer` — the three events emit only `event_category` and a coarse `event_label` (`header`/`footer`/`body`, or `contact`/`insurance`), never field contents.
>
> **Criterion 1 does not pass, and this is the important part.** This issue is `BLOCKED` on *"decide policy with counsel: consent banner, IP anonymization, or suppressing analytics on intake routes entirely."* The implementation **picked option 1** — reasonably, and it is the most conservative of the three — but the owner and counsel never made that call. A consent banner is a legal posture, not just a component: it changes what the privacy policy must say (**WDL-031**, still placeholder copy that the banner now links to) and it commits the business to honouring the choice.
>
> **Recommendation: do not mark this `FIXED` on engineering grounds.** Put the implemented behaviour in front of the owner as question 4 of the batch and let them ratify or redirect. If they prefer "suppress on intake routes only", the gate is already the right shape to narrow.
>
> **Inconsistency this exposes → WDL-021.** The Google Maps iframe on `/contact` still loads unconditionally. The site now asks permission before GA4 but not before embedding a Google frame that sets its own cookies — a gap a reviewer would notice immediately. WDL-021 should be fixed *with* whatever policy the owner ratifies here, not separately.

**Problem** `app/layout.tsx:113-122` loads `gtag.js` (`GT-WP5ML73R`) on every route — including `/contact` and `/admissions/verify-your-insurance`, where visitors enter health information. Third-party tracking on healthcare intake pages is precisely the pattern HHS OCR guidance addresses. No consent mechanism exists.

**Fix**
1. Decide policy with counsel: consent banner, IP anonymization, or suppressing analytics on intake routes entirely.
2. Implement — gate `<Script>` behind consent state, and/or exclude intake paths.
3. Confirm no form field values reach `dataLayer`.

**Acceptance criteria**
- [x] **Documented consent policy** — opt-in, ratified by owner 2026-08-10
- [x] No trackers fire before consent where consent is required *(0 `googletagmanager` in prerendered HTML)*
- [x] No PHI in any analytics payload

**Follow-on work created by this ruling:** WDL-021 (gate the Maps iframe identically) · WDL-031 (privacy policy must describe the real data flows — escalated to P1).

---

#### WDL-035 · `/treatment/detox` and `/medical-detox-los-angeles` compete for the same queries
**Status:** `OPEN` · **Severity:** P1 · **Area:** SEO / content · `[SHEET V0079 — CONFIRMED_AMENDED]`

**Problem** S-001's original row called these duplicates; verification corrected that — measured overlap is 0.2% 8-gram / 11.1% word-level against a 6.0% chrome baseline, so **they are not duplicates.** Two real problems remain:

1. **Intent overlap.** Titles are "Alcohol & Drug Detox in Los Angeles, CA" and "Medical Detox in Los Angeles" — near-identical query targets, so the pages compete regardless of wording.
2. **Inverted link support.** The weaker page is also the less supported one: `/treatment/detox` is 1,431 words and linked from the homepage; `/medical-detox-los-angeles` is 582 words and **not** linked from the homepage.

**Maps to this repo:** `medical-detox-los-angeles` is a **blog post** in `lib/data/blog.ts:119`, served at root by `app/[slug]/page.tsx`. It is reachable only from `/blog`. So the "page" S-001 flags is a thin post whose title competes with a 1,431-word service page.

**Fix** S-001's direction holds — the service page wins — but the reason is intent overlap plus thinness, not duplication, and *"the 301 should follow a content merge rather than a straight redirect."*
1. Merge any unique substance from the 582-word post into `/treatment/detox`.
2. Then 301 `/medical-detox-los-angeles` → `/treatment/detox` and remove it from `lib/data/blog.ts`.
3. Retarget the post's title/H1 to a distinct query if it is kept instead.
4. Coordinate with **WDL-038** — if blog posts move under `/blog/`, this URL changes anyway.

**Acceptance criteria**
- [ ] No two pages target the same primary query
- [ ] Unique content preserved, not discarded
- [ ] 301 in place if the post is retired
- [ ] Removed from `postSlugs` so the sitemap agrees

---

### P2 — Should fix

---

#### WDL-036 · FAQ content fragmented across three pages
**Status:** `OPEN` · **Severity:** P2 · **Area:** SEO / IA · `[SHEET V0114 (MEDIUM) + V0099]`

**Problem** Three separate FAQ pages — `/admissions/addiction-faq`, `/admissions/treatment-faq`, `/admissions/insurance-admissions-faq` — split topical authority and give users three places to look. S-001 found this during verification of V0099, where the original variant count *"concealed"* it: *"That is FAQ content fragmented across three URLs on one site, which is a distinct issue from portfolio slug inconsistency and is not logged anywhere."*

Portfolio context (V0099): only 2 of 12 sites use the proposed `/faq` standard, so this is a build-new task on 7 sites and a rename on 3. Model cited: `wellness-recovery-nj.vercel.app/faq`.

**Maps to this repo:** three entries in `lib/data/admissions.ts` (slugs at lines 116, 141, 166), each with its own `faqs` array rendered by `ContentPage` → `FAQ`. Note `app/admissions/page.tsx:8-12` also links all three as a "FAQ resource library", and a **fourth** inline FAQ set lives at `app/admissions/page.tsx:21-40`. So FAQ content is actually spread across **four** surfaces, not three.

**Fix**
1. Owner decision: consolidate to one `/faq`, or keep three topic pages and accept the split.
2. If consolidating: merge the three `faqs` arrays into one page, 301 all three slugs, dedupe against the inline set on `/admissions`, and update nav (`lib/site.ts:119-126`), the resource cards, and the sitemap.
3. Emit one `FAQPage` JSON-LD for the merged page — currently each emits its own (`components/ContentPage.tsx:43`), plus `/admissions` emits a fourth.

**Acceptance criteria**
- [ ] Consolidation decision recorded
- [ ] If consolidated: one FAQ URL, three 301s, one `FAQPage` node
- [ ] No FAQ question appears on two URLs
- [ ] Nav, resource cards, and sitemap agree

---

#### WDL-037 · `verify-your-insurance` slug is a portfolio outlier
**Status:** `BLOCKED` (portfolio decision) · **Severity:** P2 · **Area:** SEO / IA · `[SHEET V0096 — CONFIRMED_AMENDED]`

**Problem** S-001 proposes `/verify-insurance` portfolio-wide. Ours is `/admissions/verify-your-insurance` — one of 4 variants across 12 sites. Only 3 sites currently use the proposed standard.

**Caveat recorded:** V0096's original row was wrong twice (count 7→5, and it wrongly listed Dallas as missing, contradicting V0017). Treat its *inventory* with care; the standardization proposal itself stands.

**Fix**
1. Owner ruling: adopt `/verify-insurance` or keep the nested slug. This is a portfolio decision, not a per-site one.
2. If renaming: move the route, 301 the old path, update `site.verifyHref` (WDL-001), the nav (`lib/site.ts:121`), and the sitemap (WDL-006).
3. Sequence **after** WDL-001 so the constant exists and one edit covers every CTA.

**Acceptance criteria**
- [ ] Slug decision recorded
- [ ] If renamed: 301 in place, one constant updated, sitemap agrees
- [ ] No CTA regression (re-verify all 5 from WDL-001)

**Blocked on:** portfolio slug ruling.

---

#### WDL-038 · Blog posts sit at root level, colliding with the page namespace
**Status:** `DISPUTED` (needs owner ruling) · **Severity:** P2 · **Area:** SEO / IA · `[SHEET V0101 — CONFIRMED_AMENDED]`

**Problem** S-001 proposes `/blog/slug` portfolio-wide, reasoning that *"root-level posts collide with page slugs."* We are one of 4 sites serving posts at root level.

**Tension to resolve — the code was written this way on purpose.** `app/[slug]/page.tsx:7` states: *"Root-level blog post URLs, preserved 1:1 from the original WordPress site."* Production `wellnessdetoxla.com` does serve posts at root (`/luxury-rehab-in-los-angeles/`), so the current design **preserves link equity**, while the portfolio standard **sacrifices it for consistency.**

Both positions are defensible. Migrating costs 7 redirects and whatever equity does not transfer; not migrating leaves us off-standard and keeps the root namespace crowded — a real constraint, since `app/[slug]` will shadow any future top-level route.

S-001's own caution on this row: two other sites are **internally mixed**, so per-site bulk renames miss stragglers.

**Fix**
1. **Owner ruling required.** Equity preservation vs portfolio consistency.
2. If migrating: move to `app/blog/[slug]/page.tsx`, 301 all 7 root paths, update `postSlugs` consumption in `app/sitemap.ts:15`, `app/blog/page.tsx:30`, and the `BlogPostView` breadcrumb.
3. Either way, note WDL-035 may retire `medical-detox-los-angeles` independently.

**Acceptance criteria**
- [ ] Ruling recorded with reasoning
- [ ] If migrating: 7 × 301, sitemap updated, no root-level post paths remain
- [ ] If keeping: rationale documented in `app/[slug]/page.tsx` and pushed back to S-001 as a deliberate exception

---

#### WDL-039 · Production has two competing blog indexes; slash form not in the redirect map
**Status:** `BLOCKED` on WDL-033 · **Severity:** P2 · **Area:** SEO / cutover · `[SHEET V0133 — LOW]`

> **Re-scoped 2026-08-10, deliberately not implemented.** With Next's default `trailingSlash: false`, `/about/blog/` already resolves — but in **two hops** (308 normalise → 301 redirect), and the acceptance criterion asks for one. Making it one hop requires `skipTrailingSlashRedirect` plus explicit handling, which is precisely what the unresolved **WDL-033** convention decides. Building it now risks writing the redirect map twice. Blocked on that ruling by design, not by oversight.

**Problem** On production, both `/about/blog/` and `/blog/` return 200 with different titles, splitting whatever authority the blog index has. S-001 confirms **the build already fixes this** — it serves `/blog` and 308-redirects `/about/blog`, so cutover resolves it. Logged because both are live and indexable on production today.

**Gap that remains ours:** our rule in `next.config.ts` matches `/about/blog` only. Production serves the **slash form** `/about/blog/`, which is the indexed one. Depending on the WDL-033 ruling, the slash form may not be covered.

**Fix**
1. Add both forms of `/about/blog` to the cutover redirect map.
2. Verify after the WDL-033 convention lands — the two interact.
3. Optionally 301 `/about/blog/` → `/blog/` on production now if cutover is not imminent.

**Acceptance criteria**
- [ ] Both slash forms redirect to `/blog` in one hop
- [ ] Verified against the WDL-033 convention

---

#### WDL-011 · Sitemap stamps every URL as modified on every build
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P2 · **Area:** SEO · `[CODE]`

> **Closed 2026-08-10.** Replaced the build-time `new Date()` stamp. Blog posts now use their real publication date; everything else uses a `CONTENT_REVISED` constant that is stable across deploys. Verified in the built sitemap: **8 distinct lastmod values across 45 URLs** (7 real post dates + 1 shared constant), where previously all 44 shared a churning timestamp.

> ### Re-sync verdict: not touched. §3.5 attributed `app/sitemap.ts +23/−1` to "WDL-006, WDL-011" — that diff was **WDL-006 only**.
>
> `app/sitemap.ts:9` still reads `const now = new Date()`, still applied to all 45 URLs. Inferred from a filename and a line count rather than the diff; reading it would have taken a minute. The fix as written stands unchanged, and `lib/data/blog.ts` still carries the per-post `date` it should use.

**Problem** `app/sitemap.ts:9` sets `const now = new Date()` and applies it as `lastModified` to all 44 URLs. Every deploy claims all pages changed, devaluing the signal. This also destroys the diff method WDL-034 depends on.

**Fix** Add a `lastModified` field to the content data types and use real per-page dates. Blog posts already carry `date` in `lib/data/blog.ts` — use it.

**Acceptance criteria**
- [ ] `lastModified` reflects actual content edits
- [ ] Blog entries use their post date
- [ ] Unchanged pages keep a stable value across deploys

---

#### WDL-012 · Grids render unlinked cards, stranding indexable pages
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P2 · **Area:** SEO / internal linking · `[CODE]` + `[SHEET visual 1675, 1687]`

> **Closed 2026-08-10.** `AreasServed` is now driven by `areaList` and renders `<Link>`s, so all 6 area pages are linked from the homepage. `TherapyGrid` links the 3 therapies that have pages (`slug` added to the `Therapy` type) and leaves the other 5 as plain cards rather than links to nowhere. Verified: both blocks previously rendered 0 `<Link>`.

**Problem** Three grid components render plain `<div>`s where the target pages exist and should be linked. **Independently flagged by both sources.**

| Component | File | Renders | Should link to | Source |
| --- | --- | --- | --- | --- |
| `AreasServed` | `components/blocks.tsx:187` | `<div>` / `<span>` | 6 area pages | `[CODE]` |
| `TherapyGrid` | `components/blocks.tsx:130` | `<div>` | 3 therapy pages | S-001 row **1675**: *"Link the widgets to existing therapies pages"* |
| Dual-diagnosis conditions | `lib/data/treatment-programs.ts:144` | bullets | substance pages | S-001 row **1687** |

Net effect: six area pages and three therapy pages receive no internal link from the homepage or `/treatment`, the two highest-authority pages on the site.

**Fix**
1. `AreasServed`: drive from `areaList` (`lib/data/areas.ts:203`), render `<Link>` where a slug exists, keep unserved names as text.
2. `TherapyGrid`: add `slug` to the `Therapy` type in `lib/site.ts:176` and link the three that have pages. Five entries are descriptive only (CBT, DBT, Trauma-Informed, Holistic, Relapse Prevention) — leave those as text or give them pages.
3. Dual-diagnosis: render `SubstanceGrid` in that section rather than bullets.

**Acceptance criteria**
- [ ] All 6 area pages linked from the homepage
- [ ] All 3 therapy pages linked from `/treatment`
- [ ] No link points to a nonexistent route
- [ ] Visual treatment preserved

---

#### WDL-013 · `featuredAreas` advertises an area with no page, omits two that exist
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P2 · **Area:** Content / SEO · `[CODE]`

> **Closed 2026-08-10.** `featuredAreas` deleted. The homepage now derives its area list from `areaList`, so it is impossible to advertise an area without a page (Orange County) or omit one that exists (`los-angeles-county`, `southern-california`). The mismatch class is gone, not just this instance.

**Problem** `lib/site.ts:228` lists "Orange County, CA" but no `orange-county` page exists. Meanwhile `los-angeles-county` and `southern-california` do exist and are not featured.

**Fix** Author an Orange County page or drop it; add the two existing pages. Resolves cleanly with WDL-012 by deriving from `areaList`.

**Acceptance criteria**
- [ ] Featured areas ⊆ areas with pages (or documented text-only entries)
- [ ] All six area pages surfaced on the homepage

---

#### WDL-014 · `ProgramGrid` links via a parallel index array
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P2 · **Area:** Maintainability · `[CODE]`

> **Closed 2026-08-10.** `slug` is now a required field on the `Program` type and `ProgramGrid` reads `p.slug`. The parallel `programSlugs` array and the `?? ""` fallback are deleted — reordering `programs` can no longer silently repoint a card.

**Problem** `components/blocks.tsx:62` declares `programSlugs`, positionally coupled to `programs` in `lib/site.ts:138`. Reordering or inserting a program silently repoints every card — no type error, no lint warning, no build failure. The `?? ""` fallback at line 73 degrades a miss to `/treatment/`.

**Fix** Add `slug: string` to the `Program` type and read `p.slug`. Delete `programSlugs` and the fallback.

**Acceptance criteria**
- [ ] Slug lives on the program object
- [ ] No index-based lookup remains
- [ ] Reordering `programs` cannot break links

---

#### WDL-015 · `SubstanceGrid` maps display strings to slugs
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P2 · **Area:** Maintainability · `[CODE]`

> **Closed 2026-08-10.** `substances` is now `{ name, slug }[]` with a `Substance` type. The string-keyed `substanceSlugs` map and its `?? ""` fallback are deleted, so renaming a display label can no longer produce `/treatment/`. Affects all three surfaces that render the grid.

**Problem** `components/blocks.tsx:100` keys `substanceSlugs` off human-readable labels. Editing a label in `lib/site.ts:165` silently produces `href="/treatment/"` via the `?? ""` fallback at line 118. This grid renders on the homepage, `/treatment`, and every `ContentPage` with `substances: true` — wide blast radius.

**Fix** Convert `substances` to `{ name, slug }[]`. Delete the lookup map and the fallback.

**Acceptance criteria**
- [ ] Slug travels with the substance
- [ ] No string-keyed lookup remains
- [ ] All eight links resolve on all three surfaces

---

#### WDL-016 · Two divergent hand-maintained "additional areas" lists
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P2 · **Area:** Content consistency · `[CODE]`

> **Closed 2026-08-10.** One canonical `additionalCommunities` list now lives in `lib/data/areas.ts`, merged from the two divergent versions (site.ts's 8 entries + the page's 23). `moreAreas` and the page-local `additional` array are both deleted. Homepage and Areas page can no longer contradict each other.

**Problem** `moreAreas` (`lib/site.ts:237`, 8 entries) and `additional` (`app/about/areas-we-serve/page.tsx:23`, 23 entries) describe the same concept with different contents. Homepage and Areas page contradict each other.

**Fix** Consolidate into one exported list in `lib/data/areas.ts`. If the scopes are intentionally different, name them to say so.

---

#### WDL-017 · 148 of 190 images in `public/images/` are unreferenced (~19 MB)
**Status:** `BLOCKED` (needs keep-list) · **Severity:** P2 · **Area:** Repo weight · `[CODE]`

**Problem** `public/images/` holds 26 MB across 190 files; only 42 are referenced. The unused ~19 MB is largely `pexels-*` and `shutterstock_*` leftovers, all tracked in git.

**Interaction:** S-001 visual rows **1682** (blog uses random images) and **1658/1683-1719** (remove images) may change which files are needed. **Sequence this after WDL-041 and WDL-048.**

**Update 2026-08-10 (2):** `npm run check` now reports **152 unused of 205 images**. Three orphans were created by this session's own swaps and should be deleted here: `nature-wide.webp` (displaced from the homepage hero and the southern-california hero), `logo-white.png` (displaced from the footer), and `logo-lockup-navy.webp` (imported but unplaceable until **WDL-063** resolves).

**Update 2026-08-10:** WDL-059 added 1.11 MB (11 files) of real photography, and WDL-064 identifies 5 stock files (`wellness-1/2`, `people-community`, `nature-hero`, `nature-wide`) that become unreferenced once WDL-041 lands — delete them in this pass. `facility-1/3/dining/exterior.webp` are duplicate crops of `DSC_*` originals and are also candidates.

**Verification command**
```bash
grep -rhoE '/images/[A-Za-z0-9._%-]+' app components lib | sort -u > /tmp/used.txt
for f in public/images/*; do grep -qxF "/images/$(basename "$f")" /tmp/used.txt || echo "UNUSED $f"; done
```

**Acceptance criteria**
- [ ] Owner-confirmed keep list recorded in §1
- [ ] Deployed tree contains only referenced + reserved assets
- [ ] Zero missing-image references after cleanup

**Blocked on:** brand asset folder / keep list, and WDL-041/048 outcomes.

---

#### WDL-018 · No security response headers
**Status:** ✅ `FIXED` (verified 2026-08-10) · **Severity:** P2 · **Area:** Security · `[CODE]`

> **Re-sync verification:** `next.config.ts` now sets Content-Security-Policy, Strict-Transport-Security, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy (strict-origin-when-cross-origin) and Permissions-Policy. Build passes, so no legitimate origin is blocked.

> ### Re-sync verdict: fixed, and not predicted by §3.5.
>
> `next.config.ts` now has `headers()` applying to `/:path*`, plus `poweredByHeader: false`. Confirmed on a live response:
>
> `Content-Security-Policy` · `Strict-Transport-Security` (2y, `includeSubDomains; preload`) · `X-Frame-Options: DENY` · `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()` · no `x-powered-by`.
>
> **The CSP decision is the notable part, and it is the right one.** Next 16's own guide is explicit that a nonce-based CSP *"must use dynamic rendering"*, which would have disabled static optimization and CDN caching across all 52 prerendered routes. For a brochure site with no authenticated surface, trading the entire static build for strict-CSP is a bad deal, so a header-based policy with `'unsafe-inline'` for scripts/styles was chosen — the documented alternative. Recorded so it is not "fixed" later by someone reaching for nonces.
>
> **Criterion 2 verified statically, not in a browser.** Every external origin in the source was enumerated and cross-checked against the allowlist:
>
> | Origin | Used for | Covered |
> | --- | --- | --- |
> | `googletagmanager.com` | gtag.js | `script-src` ✅ |
> | `*.google-analytics.com` | GA collect | `connect-src` ✅ |
> | `*.googleusercontent.com` | Google reviewer avatars | `img-src` ✅ |
> | `www.google.com` | Maps iframe | `frame-src` ✅ |
> | `places.googleapis.com` | Places API | **server-side fetch — not subject to CSP** ✅ |
> | facebook / instagram / linkedin | footer `<a>` links | outbound navigation, unrestricted ✅ |
>
> Self-hosted `next/font` files are covered by `font-src 'self'`. **A browser console check on `/`, `/contact` and `/admissions/verify-your-insurance` is still worth doing before cutover** — static analysis cannot see a runtime-constructed URL.

**Problem** `next.config.ts` defines only `redirects()`. No CSP, `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Strict-Transport-Security`, or `Permissions-Policy`.

**Fix** Add `headers()`. CSP needs care given three inline `ld+json` blocks, the inline `gtag-init` script, the Maps iframe on `/contact`, and remote Google avatars in `Reviews.tsx`. `Referrer-Policy: strict-origin-when-cross-origin` is a safe immediate win.

**Acceptance criteria**
- [x] Headers present on all routes
- [x] CSP allows every legitimately used origin — *verified statically against all 6 origins; browser console check still pending*
- [x] No regression in maps, analytics, or review avatars *(each origin allowlisted; build 52/52)*

---

#### WDL-019 · No error boundaries
**Status:** ✅ `FIXED` (verified 2026-08-10) · **Severity:** P2 · **Area:** Resilience · `[CODE]`

> **Re-sync verification:** Both `app/error.tsx` and `app/global-error.tsx` present.

**Problem** No `app/error.tsx`, no `app/global-error.tsx`. Any render error surfaces as an unstyled Next error screen with no path back and no phone number.

**Fix** Add both, mirroring WDL-009. Keep them dependency-light so a broken import cannot break the boundary too.

> ### Re-sync verdict: fixed, and not predicted by §3.5.
>
> Both files exist. `app/error.tsx` renders inside the root layout so header, footer and call bar survive the error; it shows `site.phone`, a `reset()` button, and the `error.digest` for tracing.
>
> `app/global-error.tsx` replaces the root layout, so it correctly declares its own `<html>`/`<body>` — and the "dependency-light" instruction was honoured properly: it is styled with **inline styles only**, so it still renders a legible page with a working phone number even when the failure *is* the stylesheet or the font loader. That is the case this boundary exists for.

---

#### WDL-020 · No web app manifest, though PWA icons exist
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P2 · **Area:** Mobile polish · `[CODE]`

> **Closed 2026-08-10.** `app/manifest.ts` added, wiring up the previously orphaned `icon-192.png` / `icon-512.png`. `theme_color` matches `viewport.themeColor` (`#f7f3ef`) so browser chrome cannot flicker between two values. Route count 52 → 53.

**Problem** `public/images/icon-192.png` and `icon-512.png` are committed but referenced nowhere. No `app/manifest.ts`.

**Fix** Add `app/manifest.ts` with `name`, `short_name` (`site.shortName` exists), `theme_color` `#f7f3ef` (matching `viewport.themeColor`), `background_color`, and the two icons.

---

#### WDL-021 · Google Maps iframe loads before any consent
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P2 · **Area:** Privacy · `[CODE]`

> **Closed 2026-08-10.** New `components/MapEmbed.tsx` replaces the raw iframe. It reuses the existing consent store via `useSyncExternalStore` — auto-loading only when analytics consent is already `granted`, otherwise showing a click-to-load placeholder. Deliberately does **not** write to the stored analytics decision: agreeing to view a map is not agreeing to be tracked. The address and a directions link render either way, so the useful information needs no external request and no JavaScript.

**Problem** `app/contact/page.tsx:63` embeds a Maps iframe that contacts Google on load. `loading="lazy"` and `referrerPolicy` are set, but the request still fires unprompted on a healthcare contact page.

**Interaction:** S-001 rows **1664** and **1678** *add* Google Maps embeds to the homepage and `/tour` — tripling the exposure. Settle the consent policy (WDL-010) before implementing WDL-046.

**Fix** Click-to-load placeholder with a static map image, or gate behind the WDL-010 consent state.

---

### Visual / content audit — S-001 Visual Issues tab (75 rows, IDs 1658–1732)

> **Provenance warning:** this tab has **no Verdict or Verified column** — it is unverified reviewer notes, unlike the 6 build-issue rows which were all verified. S-001's own Legend warns that *"roughly two thirds of verified rows needed a correction."* I have mapped every row to code and flagged two as probable non-defects. **All 75 rows are accounted for below; none dropped.**

---

#### WDL-040 · Swap eyebrow and heading order across 13 section headers
**Status:** `OPEN` · **Severity:** P2 · **Area:** Design system · `[SHEET visual ×13]`

**Rows** 1659, 1660, 1661, 1662, 1663 (homepage) · 1665 (`/about`) · 1667 (`/about/our-story`) · 1669 (`/about/meet-the-team`) · 1672, 1674 (`/treatment`) · 1676, 1677 (`/tour`) · 1679 (`/admissions`)

**Instruction (verbatim)** *"Replace and switch the small pink text with the header"*

**Maps to** `SectionHeading` (`components/ui.tsx:72`) renders `eyebrow` above `title`; `PageHero` (`components/PageHero.tsx:67`) does the same. The rose eyebrow uses the `.eyebrow` class (`app/globals.css:69`).

**Interpretation needed.** "Replace and switch" is ambiguous — it could mean (a) reverse the visual order so the heading sits above the eyebrow, (b) swap the two strings, or (c) restyle the eyebrow. Because it recurs identically on 13 rows spanning every template, this is **one systematic change to `SectionHeading` + `PageHero`, not 13 page edits** — which makes getting the interpretation right cheap to apply and expensive to guess wrong.

**Fix**
1. **Confirm intent with the owner** (screenshot of the desired result is ideal).
2. Implement once in `SectionHeading` and `PageHero`; all 13 follow automatically.
3. Verify the rose-on-cream contrast still passes AA after any restyle.

**Acceptance criteria**
- [ ] Intent confirmed before code changes
- [ ] Implemented in the shared components, not per page
- [ ] All 13 locations verified
- [ ] Contrast still AA

**Blocked on:** clarification of "replace and switch".

---

#### WDL-041 · Remove hero images from 14 treatment pages + 1 homepage section
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P2 · **Area:** Design · `[SHEET visual ×15]`

> **Closed 2026-08-10.** Removed the top-of-page hero from all 14 treatment sub-pages named in S-001 rows 1683–1719. `ContentPage` already renders the block conditionally, so this was a data-only change — no component edit.
>
> **One deliberate deviation:** S-001 had no row for `family-therapy`, but removing the other 14 would have left it as the *only* treatment page with a hero, and its hero was stock (`wellness-2` = a Beverly Hills sign). Removed for consistency; flag if that was intentional. This is the only item where I went beyond the audit's literal list.

**Rows** 1683 (`detox`), 1685 (`residential`), 1686 (`dual-diagnosis`), 1688 (`aftercare`), 1689 (`alcohol`), 1690 (`benzo`), 1698 (`cocaine`), 1699 (`fentanyl`), 1702 (`heroin`), 1706 (`meth`), 1709 (`opioid`), 1713 (`prescription`), 1716 (`individual-therapy`), 1719 (`group-therapy`) — *"Remove the image in the top of the page"* · plus **1658** (homepage) — *"Remove the image in the section 'A Los Angeles leader in addiction treatment'"*

**Maps to** the 14 page rows all target the `page.hero` block in `components/ContentPage.tsx:85-98`. Row 1658 targets the `SplitFeature` image at `app/page.tsx:101`.

**Note:** `/treatment/family-therapy` has **no** remove-image row while the other 14 treatment pages do — either an oversight in the audit or an intentional exception. Confirm before applying a blanket change.

**Fix**
1. For the 14: remove `hero:` from those entries in `lib/data/treatment-*.ts` — `ContentPage` already renders the block conditionally, so no component change is needed.
2. Confirm the family-therapy exception.
3. For 1658: decide whether the `SplitFeature` becomes full-width prose or the image is replaced (see WDL-046, which asks for a map on a *different* homepage section).
4. Feeds **WDL-017** — removed heroes free more unused images.

**Acceptance criteria**
- [ ] 14 treatment pages render without a top image
- [ ] family-therapy exception confirmed either way
- [ ] Homepage section resolved
- [ ] Build passes; no orphaned `hero` keys

---

#### WDL-042 · Statistic widgets need linked, cited sources
**Status:** `OPEN` · **Severity:** P2 · **Area:** Content / E-E-A-T · `[SHEET visual ×13]`

**Rows** 1691, 1694, 1696, 1700, 1701, 1703, 1704, 1707, 1708, 1710, 1712, 1714, 1718 — *"Add the source link to the widget"*

**Maps to** `Stat` in `lib/content-types.ts:23` has an optional `source?: string`, and `StatTiles` (`components/blocks.tsx:420`) renders it as **plain text** (`Source: {s.source}`) — never a hyperlink.

**Measured in code — two distinct gaps:**
- **21 stat tiles total; 9 have no `source` at all.** Four are substance claims that need citations: `50x` / `100x` (fentanyl potency), `14M+` (prescription misuse 2022), `40%+` (co-occurring disorders). The other five are `15+ years` internal claims about the Quadrant Health Group — those need no external source.
- **The remaining 12 have a source string but it is not a link**, which is precisely what these 13 rows ask for.

For a YMYL healthcare site, unlinked medical statistics are an E-E-A-T weakness independent of the audit request.

**Fix**
1. Add `sourceUrl?: string` to the `Stat` type.
2. Render `source` as an anchor in `StatTiles` when `sourceUrl` is present, with `rel="noopener"` and an external-link affordance.
3. Populate `sourceUrl` for all 12 existing sources.
4. Add `source` + `sourceUrl` to the 4 substance stats that lack both (NIDA / SAMHSA / CDC are the likely authorities).
5. Leave the 5 `15+ years` internal claims as plain text.

**Acceptance criteria**
- [ ] Every externally-sourced statistic links to its source
- [ ] All 4 uncited substance statistics carry a citation
- [ ] Links open safely and are keyboard accessible
- [ ] Internal claims not falsely attributed

---

#### WDL-043 · Nine named content sections are missing
**Status:** `AWAITING INPUT` · **Severity:** P2 · **Area:** Content · `[SHEET visual ×9]`

| Row | Page | Section requested |
| --- | --- | --- |
| 1671 | `/treatment` | "What Makes Wellness Detox LA a Leading Rehab in Los Angeles Area" |
| 1673 | `/treatment` | "Evidence-based Substance Abuse Treatment Programs By Your Home" |
| 1692 | `benzo-addiction` | "The Dangers of Long-Term Benzo Use" + short/long-term widgets like the alcohol page |
| 1695 | `cocaine-addiction` | "The Dangers of Long-Term Cocaine Use" + short/long-term widgets |
| 1697 | `cocaine-addiction` | "Why Medical Detox Is Essential" with content and widgets |
| 1705 | `heroin-addiction` | "The Dangers of Heroin Use" + short/long-term widgets |
| 1711 | `opioid-addiction` | "The Dangers of Opioid Abuse" + short/long-term widgets |
| 1715 | `prescription-drug-addiction` | "Short & Long-Term Effects of Prescription Drug Misuse" |
| 1724 | `family-therapy` | "Where Family Therapy Fits Into Treatment" |

**Maps to** all are new `PageSection` entries in `lib/data/treatment-*.ts`. The "short term / long term widgets like the one used on the alcohol page" pattern already exists — `groups` with `groupsDisplay: "cards"` via `CategoryGroups` (`components/blocks.tsx:447`), used in `treatment-substances.ts`. **No component work required; this is pure content authoring** against an existing schema.

**Fix** Needs medically reviewed copy. Structure per page: `{ heading, body: [...], groups: [{label:"Short-Term", items:[...]}, {label:"Long-Term", items:[...]}] }`. Any statistics must carry sources (WDL-042).

**Acceptance criteria**
- [ ] All 9 sections authored and clinically reviewed
- [ ] Short/long-term sections reuse the existing `groups` pattern
- [ ] Jump-nav picks up new headings automatically (verify no id collisions)
- [ ] Statistics cited

**Blocked on:** owner-supplied copy, or approval for me to draft it for clinical review.

---

#### WDL-044 · Convert bullet lists to card "widgets" on 10 sections
**Status:** `AWAITING INPUT` · **Severity:** P2 · **Area:** Design / content · `[SHEET visual ×10]`

**Rows** 1727, 1728, 1729, 1730, 1731, 1732 (all 6 area pages — "Programs & Therapies Offered") · 1717 (`individual-therapy` — "Therapeutic Modalities Offered") · 1720 (`group-therapy` — "What Group Therapy Includes") · 1722 (`family-therapy` — "What Family Therapy Focuses On") · 1687 (`dual-diagnosis` — "Conditions We Treat", also in WDL-012)

**Instruction** *"Create a widget for each service described in the section"*

**Maps to** these sections use `bullets` (flat checkmark list, `components/ContentPage.tsx:124`). The requested card pattern already exists as `subsections` → `SubsectionCards` (`components/blocks.tsx:529`), with a 7-icon set available.

**High leverage:** all **6 area rows target one object** — `sharedTherapies` in `lib/data/areas.ts:3`. Converting that single object from `bullets` to `subsections` fixes 6 of the 10 rows in one edit.

**Fix**
1. Convert `sharedTherapies` from `bullets` to `subsections` — each of the 8 therapies becomes `{ heading, body, icon }`. The bullet strings are already in `Name — description` form, so they split cleanly.
2. Same conversion for the three therapy-page sections (1717, 1720, 1722).
3. Row 1687 → render `SubstanceGrid` instead (see WDL-012).
4. Confirm "widget" means the existing card pattern and not something from the original site — a reference screenshot would settle it.

**Acceptance criteria**
- [ ] 6 area pages render cards, via one shared change
- [ ] 3 therapy sections converted
- [ ] Card pattern confirmed against the original site
- [ ] Mobile layout verified at 375px

**Blocked on:** confirmation of the intended "widget" pattern.

---

#### WDL-045 · Add lead-capture forms to the two "Get Help" pages
**Status:** `OPEN` — **unblocked by the WDL-002 transport (re-sync 2026-08-10)** · **Severity:** P1 · **Area:** Conversion · `[SHEET visual ×2]`

> ### Re-sync verdict: not built, but the blocker is gone.
>
> `ContentPageData` still has no `form` field and `ContentPage` renders no form, so nothing here is implemented. **But the reason this was `BLOCKED` no longer holds:** the `mailto:` transport that made two extra entry points dangerous has been replaced (WDL-002), and the silent-success bug is fixed and verified (WDL-003). Adding forms here now multiplies a *working* pipeline instead of a broken one.
>
> **Caveat before building.** The pipeline fails closed until `LEAD_WEBHOOK_URL` is set, so shipping these two forms before the BAA endpoint exists puts two more pages into the "we couldn't submit — please call" state. That is honest and safe, but it is not a working intake. **Build the schema now if useful; enable on these pages when the endpoint lands.**
>
> Fix step 4 — a per-page source identifier — is **not yet supported**: `deliverLead()` sends `kind: "contact" | "insurance"` with no page field. Adding an optional `source` to `LeadPayload` is the cleanest way to satisfy that criterion.

**Rows** 1725 (`/admissions/help-for-yourself`) · 1726 (`/admissions/help-for-loved-one`) — *"Add a submission box for leads"*

**Maps to** both are data-driven `ContentPage` routes from `lib/data/admissions.ts:50,82`. `ContentPageData` has **no field for a form**, so this needs a schema addition — e.g. an optional `form?: "contact" | "insurance"` rendered by `ContentPage`.

**Do not build on the broken transport.** Adding two more entry points to the `mailto:` handoff would multiply WDL-002 and WDL-003 (silent lead loss) across two more pages. **Sequence after WDL-002.**

**Fix**
1. Land WDL-002 first.
2. Add an optional `form` field to `ContentPageData`; render the chosen form in `ContentPage`.
3. Set it on both admissions entries.
4. Include a source/page identifier in the submission so admissions can attribute the lead.

**Acceptance criteria**
- [ ] Forms present on both pages
- [ ] Posting to the WDL-002 endpoint, not `mailto:`
- [ ] Submissions identify which page they came from
- [ ] Schema addition is optional — other `ContentPage` routes unaffected

---

#### WDL-046 · Replace two photographs with Google Map embeds
**Status:** `BLOCKED` (depends on WDL-010/021) · **Severity:** P3 · **Area:** Design · `[SHEET visual ×2]`

**Rows** 1664 (homepage, "What makes Wellness Detox LA a leading rehab") · 1678 (`/tour`, "Recovery in a calm setting, close to major travel routes") — *"Replace picture with the google map location"*

**Maps to** `SplitFeature` image at `app/page.tsx:208` and the `Image` at `app/tour/page.tsx:148`. A working Maps embed already exists at `app/contact/page.tsx:63`.

**Conflict to resolve.** This *adds* third-party Google embeds to two more pages while WDL-021 flags the existing one as a pre-consent privacy exposure. On the homepage that means a Google request on the site's highest-traffic page before any consent. Settle WDL-010 first, then implement with whatever consent pattern is chosen.

**Fix**
1. Land the WDL-010 consent decision.
2. Extract the Maps embed into a shared component honouring that decision (click-to-load placeholder recommended).
3. Use it in all three locations.
4. Preserve `SplitFeature`'s aspect ratio so the layout does not shift.

**Acceptance criteria**
- [ ] One shared, consent-aware map component used in all 3 places
- [ ] No Google request before consent where consent is required
- [ ] Layout stable at 375px and 1440px
- [ ] `title` attribute present for accessibility

---

#### WDL-047 · Replace an `/about` photograph with outcome-metric widgets
**Status:** `AWAITING INPUT` · **Severity:** P2 · **Area:** Content · `[SHEET visual ×1]`

**Row** 1666 — *"Replace picture with the widgets on the original page showing the numbers of Lives Changed, Clients Satisfaction, Completion Rate & Years of Experience"*

**Maps to** the `SplitFeature` image at `app/about/page.tsx:55`. `StatTiles` (`components/blocks.tsx:420`) already renders exactly this shape and would need no changes.

**⚠️ Substantiation required.** "Lives Changed", "Client Satisfaction %", and "Completion Rate" are **outcome claims about a healthcare provider**. S-001 treats unsubstantiated claims as a `COMPLIANCE`-class issue (V0070: a certification claim on 34 pages whose only evidence pointed at a different domain). Publishing completion or satisfaction rates without a documented basis is the same exposure, and for addiction treatment it also touches Google Ads eligibility.

Note the site was **founded in 2025** (`app/about/page.tsx:11`) while `site.yearsExperience` is `15+` — attributed to the Quadrant Health Group network, not this facility. Any metrics must be equally clear about whose they are.

**Fix**
1. Obtain the four figures **with their basis** — measurement period, sample size, and whether they are facility-level or network-level.
2. Add as `stats` with `source` + `sourceUrl` (WDL-042).
3. Label network-level figures explicitly.
4. If figures cannot be substantiated, do not publish them — propose licence/accreditation trust signals instead.

**Acceptance criteria**
- [ ] All four figures documented with basis and period
- [ ] Facility vs network attribution unambiguous
- [ ] Rendered via existing `StatTiles`
- [ ] Nothing published that cannot be substantiated

**Blocked on:** owner-supplied metrics and their basis.

---

#### WDL-048 · Blog index: wrong hero images and one card out of order
**Status:** `AWAITING INPUT` · **Severity:** P2 · **Area:** Content · `[SHEET visual ×2]`

**Rows** 1682 — *"Blog Images are using random images … Use the original images for the previous blogs created"* · 1681 — *"Clarion blog is appearing outside away from the previous blogs, fix to appear with the others"*

**Maps to**
- **1682:** `hero` values in `lib/data/blog.ts` point at generic facility/stock files (e.g. `why-fentanyl-addiction-is-so-dangerous` uses `/images/facility-1.webp`). The original production posts have their own artwork. Needs the original images. Also affects the OG image per post (`app/[slug]/page.tsx:31`).
- **1681:** `app/blog/page.tsx:27` maps `blogPosts` in **array order** with no sort. Whichever post is out of place is simply positioned by its index in `lib/data/blog.ts`.

**"Clarion" resolved — answered by a QHG-parent row the full-text sweep surfaced.** Visual row **861** logs the identical defect on the parent: *"The blogs created on Clarion are appearing separate from the blogs previously published"* → *"All blogs published should appear on the same area."* So Clarion is the platform or vendor that produced a **batch of newer posts**, and on at least two sites in the portfolio that batch renders apart from the older ones. It is not a single post title.

That makes the cause structural, not editorial: newer Clarion-sourced posts sit in one contiguous block of the array and older posts in another, so an unsorted `.map()` renders them as two visually separate groups. **Sorting by date fixes it properly and permanently** — no manual reordering needed.

**Fix**
1. Sort by `date` descending in `app/blog/page.tsx:27` — resolves 1681 at the root. Also worth doing because `lib/data/blog.ts` array order is currently the *only* thing controlling presentation.
2. Obtain original post images from production; replace the generic `hero` values. This also corrects the per-post OG image (`app/[slug]/page.tsx:31`).
3. Confirm the 7 posts in this build are the complete set — if Clarion published more after 2026-07-09, they are missing entirely and belong to **WDL-034**.

**Acceptance criteria**
- [ ] Index sorted by date descending, not array order
- [ ] Clarion-sourced and older posts interleave correctly by date
- [ ] Every post uses its original hero image
- [ ] OG images updated per post
- [ ] Post inventory reconciled against production

**Blocked on:** original blog images; post-inventory reconciliation folds into WDL-034.

---

#### WDL-049 · `/admissions` FAQ should be an accordion
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P3 · **Area:** UX · `[SHEET visual ×1]`

> **Closed 2026-08-10.** `/admissions` now renders `<FAQ faqs={faqs} />` instead of a static card grid, so it matches every other FAQ on the site and inherits the `inert` + `aria-controls` handling from WDL-004. Existing `FAQPage` JSON-LD untouched.

**Row** 1680 — *"needs questions in an accordian style format"*

**Maps to** `app/admissions/page.tsx:132-140` renders four FAQs as static cards, while an accordion component already exists (`components/FAQ.tsx`) and is used by every `ContentPage`. This is an inconsistency, not a missing capability.

**Fix** Replace the static card grid with `<FAQ faqs={faqs} />`. The `faqs` array at `app/admissions/page.tsx:21` already matches the `Faq` type. Fix **WDL-004** at the same time so the new accordion does not inherit the tab-order bug. Deduplicate against WDL-036.

**Acceptance criteria**
- [ ] `/admissions` uses the shared `FAQ` component
- [ ] Existing `FAQPage` JSON-LD preserved
- [ ] WDL-004 accessibility fix applied
- [ ] No duplicate questions vs the three FAQ pages

---

#### WDL-050 · Dedicated page per staff member
**Status:** `AWAITING INPUT` · **Severity:** P3 · **Area:** Content / SEO · `[SHEET visual ×1]`

**Row** 1670 — *"Create a dedicated page for each staff personelle and link them to the widgets"*

**Maps to** `app/about/meet-the-team/page.tsx:16` holds a local `team` array of 4 members; two lack photos and two "Coming Soon" placeholders follow. Portfolio precedent exists — Seaside has per-person pages (`/about/erin-crawford`, `/about/michael-meagher`, etc.).

**Relevant caution from S-001:** its single `CRITICAL` content row portfolio-wide is **V0054, "wrong person biography."** Staff bios are exactly where that error class appears, so every bio needs verifying against the real person before publication.

**Progress 2026-08-10 — groundwork done by WDL-057.** [`lib/data/team.ts`](lib/data/team.ts) now exists with a `TeamMember` type carrying `slug` and `bio`, and holds **10 approved bio paragraphs** for the four regional leaders. That was step 2 of this issue's fix, so what remains is the route itself:
- Add `app/about/meet-the-team/[slug]/page.tsx` with `generateStaticParams` over both rosters.
- Link `MemberCard` through to the detail page.
- Add `Person` structured data and the routes to `app/sitemap.ts`.
- Note only the 4 regional members have bio copy; the 4 Pomona staff have none, so either gate the route on `bio` being present or source their copy first (**WDL-056**).

**Fix**
1. Resolve WDL-055 (facility status) and WDL-056 (identity verification) first.
2. Obtain verified bios, credentials, and photos — or adopt regional bios per WDL-057.
3. Move `team` into `lib/data/team.ts` with slugs; add `app/about/meet-the-team/[slug]/page.tsx`.
4. Link cards to detail pages; add `Person` structured data; add to the sitemap.
5. Resolves **WDL-030**.

**Acceptance criteria**
- [ ] Each member has a verified bio page
- [ ] Every bio confirmed to match the correct person (V0054 class)
- [ ] Cards link through; `Person` schema present
- [ ] Pages in the sitemap
- [ ] Placeholders removed

**Blocked on:** verified staff bios and photos.

---

#### WDL-051 · Three sections need missing paragraphs restored
**Status:** `AWAITING INPUT` · **Severity:** P2 · **Area:** Content · `[SHEET visual ×3]`

| Row | Page | Request |
| --- | --- | --- |
| 1668 | `/about/our-story` | *"Include the missing paragraphs from this section with the links on the proper anchor text"* — section "Recovery that lasts, for every person we serve" |
| 1721 | `group-therapy` | *"Missing paragraph in the section"* — "Why Group Therapy Matters in Rehab" |
| 1723 | `family-therapy` | *"Missing paragraph in the section"* — "The Power of Family Healing in Recovery" |

**Maps to** 1668 → `app/about/our-story/page.tsx:71-85` (hardcoded JSX). 1721/1723 → `body` arrays in `lib/data/treatment-therapies.ts`.

Row 1668 explicitly asks for **internal links on proper anchor text**, which supports the WDL-012 internal-linking theme — descriptive anchors are worth more than the "Learn more" pattern used elsewhere.

**Fix** Obtain the original paragraphs from production. For 1668, add contextual links with descriptive anchor text pointing at `/treatment/*` and `/admissions/*`.

**Acceptance criteria**
- [ ] All three sections carry their full copy
- [ ] `/about/our-story` links use descriptive anchor text
- [ ] Links resolve to real routes

**Blocked on:** original copy from production.

---

#### WDL-052 · Two "URL clean up" rows appear to describe jump-nav anchors, not defects
**Status:** `DISPUTED` · **Severity:** P3 · **Area:** Audit reconciliation · `[SHEET visual ×2]`

**Rows**
- 1684 — Location `…/treatment/detox#the-danger-of-withdrawal-symptoms`, fix *"Url must be treatment/detox"*
- 1693 — Location `…/treatment/benzo-addiction#benzo-withdrawal-and-why-you-shouldn-t-detox-cold-turkey`, fix *"Url must be treatment/benzo-addiction"*

**Why I believe these are not defects.** Both URLs already *are* `/treatment/detox` and `/treatment/benzo-addiction`; the `#…` portion is a **fragment**, not part of the path. Those fragments are generated by design — `components/ContentPage.tsx:63` assigns collision-safe section ids via `uniqueSlug`, and `JumpNav` links to them. Fragments are never sent to the server, are not separate URLs, and are not indexed separately. The canonical for both pages is already the clean path (`app/treatment/[slug]/page.tsx:23`).

Most likely the reviewer captured the address bar after clicking a jump-nav pill. **No code change is warranted**, and removing the ids would break the jump navigation on all 25 `ContentPage` routes.

**Precedent for pushing back:** S-001 itself withdrew **V0078** on exactly this basis — a row that *"states … a description of the architecture rather than a defect"*, whose fix *"would have deleted a live 345-word page."* Its verification log adds: *"Worth scanning the remaining … rows for the same thing."*

**Proposed resolution — owner ruling requested**
- [ ] Confirm these were address-bar captures → mark `WONTFIX`, push the correction back to S-001
- [ ] **Or** clarify the actual concern if something else was meant

**Do not action as written.**

---

#### WDL-056 · Four published team members do not appear in the portfolio bios document
**Status:** `BLOCKED` — needs owner verification · **Severity:** P1 · **Area:** Content accuracy / trust · `[SHEET S-003 + S-001 V0054]`

**Problem** `app/about/meet-the-team/page.tsx:16` publishes four named individuals with titles. **None appears anywhere in S-003's 107 person entries.** Exact-word search over all 1,109 lines:

| Published | Role as published | Photo | S-003 hits |
| --- | --- | --- | --- |
| Janee Young, LMFT | Clinical Director | `team-janee-young.webp` | `Janee` **0** |
| Adrian Diaz, RADT | Director of Operations | `team-adrian-diaz.webp` | `Adrian` **0**, `Diaz` **0** |
| Selin Simmonds | Fitness Guru | — | `Selin` **0**, `Simmonds` **0** |
| Crystal Clements | Fitness Guru | — | `Crystal` **0**, `Clements` **0** |

The only `Young` matches are **Shawn Young, Executive Director of Southern California** — a different person in a different role. Note S-003 lists a `Riky Hanaumi` as Cali **Clinical Director** and a regional Nursing Director, which may or may not overlap with the Clinical Director title we publish for Janee Young.

**Why this needs verifying rather than assuming.** S-001's **only `CRITICAL` content row across all 12 sites is V0054, "wrong person biography"** — so misattributed staff identity is a demonstrated failure mode in this portfolio, not a hypothetical. Publishing named clinicians with credentials (LMFT, RADT) on a licensed provider's site makes accuracy a professional matter: a credential attached to the wrong person, or a clinician listed who no longer works there, is materially worse than an empty page.

Three readings are possible and I cannot distinguish them from here: the four are current staff simply absent from a portfolio doc that has our location marked closed (**WDL-055**); or they have left; or some titles/credentials have drifted. The absence is expected if the location paused operations — which is why this issue is sequenced behind WDL-055.

**Separate, independent concern — the "Fitness Guru" title.** Two of four published staff carry it. Across S-003's 107 entries, every title is clinical or operational — Clinical Director, Nursing Supervisor, Case Manager, Therapist, Program Director, Client Care Director. "Fitness Guru" is stylistically out of step with a DHCS-licensed medical facility's team page and reads as informal against the site's own "Clinical Excellence" positioning (`lib/site.ts:193`). Suggest "Fitness Specialist", "Wellness Coordinator", or similar — a copy decision, unrelated to whether the people are current.

**Fix**
1. Confirm all four are current staff, and that names, credentials, and titles are exact.
2. Remove or correct anyone who has left. Do not leave a departed clinician published.
3. Reconsider "Fitness Guru" for a licensed provider's team page.
4. Once WDL-055 resolves, decide whether to source bios from S-003's regional leadership (**WDL-057**).
5. Feeds **WDL-050** (per-staff pages) and **WDL-030** (placeholders) — neither should proceed on unverified identities.

**Acceptance criteria**
- [ ] All four verified as current, with exact names, credentials, titles
- [ ] Anyone departed removed
- [ ] Every credential (LMFT, RADT) confirmed against the actual licence holder
- [ ] "Fitness Guru" title decision recorded
- [ ] No bio published that cannot be attributed to a confirmed person (V0054 class)

**Update 2026-08-10 — WDL-055 resolved, and it cuts against the benign reading.** The owner confirms the facility is **operating normally**. The "absence is expected because the location paused" explanation therefore **no longer holds**: four staff are published on an operating facility's site while appearing in neither the portfolio bios doc (0 of 107) nor the headshots folder (0 of 124), which also has no folder for this facility at all. That is now harder to explain, not easier, so verification is more important than before.

Still outstanding, and cheap to answer: are all four current, and are the names, credentials, and titles exact? S-004 also has no headshot for Selin Simmonds or Crystal Clements, so those two cards remain initials-only (**WDL-030**).

**Blocked on:** owner confirmation of the four individuals.

---

#### WDL-057 · Feature Southern California regional leadership
**Status:** ✅ `FIXED` 2026-08-10 — owner chose the 4 Cali SOUTH · **Severity:** P2 · **Area:** Content · `[SHEET S-003, S-004]`

> ## ✅ IMPLEMENTED — owner decision: add only the 4 Cali SOUTH leaders
>
> Chosen because their bios state the "Southern California facilities" remit explicitly, making the scope claim tightest, and because 4 exactly replaces the 2 placeholders with a full row.
>
> **What shipped**
>
> | Person | Role | Photo | Bio |
> | --- | --- | --- | --- |
> | Justin White | Program Director | `team-justin-white.webp` | 3 paragraphs |
> | Elizabeth Wald | Program Director | `team-elizabeth-wald.webp` | 3 paragraphs |
> | Jeremiah Ross | Nursing Supervisor | `team-jeremiah-ross.webp` | 2 paragraphs |
> | Alanna McMurtrey | Lead Case Manager | `team-alanna-mcmurtrey.webp` | 3 paragraphs |
>
> **Files**
> - **New** [`lib/data/team.ts`](lib/data/team.ts) — `facilityTeam` (4 Pomona) + `regionalTeam` (4 regional), `TeamMember` type with `slug`/`bio`, shared `initials()` helper. Also **advances WDL-050**: the roster now lives in data with slugs and full bios, which is the prerequisite for per-person pages.
> - **Modified** [`app/about/meet-the-team/page.tsx`](app/about/meet-the-team/page.tsx) — two labeled sections, shared `MemberCard`, **both "Coming Soon" placeholders removed** (closes **WDL-030**).
>
> **Scope labelling** — the section is headed "Southern California Leadership" with a sentence stating these leaders "support Wellness Detox of LA alongside our other Southern California treatment centers", so no reader takes them as Pomona-exclusive. This was the condition for doing this at all.
>
> **Images** — converted from S-004 originals to the existing repo convention: **800×1000 WebP, 4:5, 20–29 KB each, 112 KB total** (vs ~7 MB raw). Matches `team-janee-young.webp` / `team-adrian-diaz.webp` exactly. Crop is centre-horizontal with a 15 % top bias on tall sources; **all four visually verified** — no cropped foreheads. Well inside the ≤500 KB criterion, so no meaningful impact on WDL-017.
>
> **Bios stored but not yet rendered.** Cards show name + role, matching the approved layout. The 10 bio paragraphs are captured in `lib/data/team.ts` because their correct home is per-person detail pages (**WDL-050**) — a 4-column grid of `aspect-[4/5]` cards cannot carry 3-paragraph bios. Nothing is lost; the copy is in the repo and ready.
>
> **Verified:** `tsc --noEmit` 0 errors · `eslint` clean on both files · build 52/52 static · all 8 photos present in the prerendered `/about/meet-the-team` HTML.
>
> **Deliberately not done:** the 5 Cali Leadership members (Shawn Young, Michael McArthur, Riky Hanaumi, Monica Olivares, Jacob Cameron) were **not** added, per the owner's choice. Their bios and headshots remain available if that changes. The **`Monica Olivares` / `Monica-Olivires` spelling conflict is therefore moot for now** — but must be resolved before that person is ever published.

<details>
<summary>Original decision framing, retained for the record</summary>

**Now fully resourced — bios and headshots both confirmed available (S-003 + S-004).** All nine candidates below have a written bio in S-003 *and* a high-resolution headshot in S-004. This is a data-entry and image-optimisation task, not a content-creation one.

**Problem/opportunity** S-003 supplies **no facility-specific bios for us**, but it does contain nine people in **fully written, publication-ready bios** whose roles are explicitly scoped to Southern California facilities — which would include Pomona:

**Cali Leadership** (5 — block duplicated in the source, dedupe before use)
- Shawn Young — Executive Director *("Executive Director of Southern California… leading a team of dedicated professionals across several substance abuse treatment facilities")*
- Michael McArthur — Nursing Director
- Riky Hanaumi — Clinical Director
- Monica Olivares — Clinical Supervisor
- Jacob Cameron — Client Care Director

**Cali SOUTH** (4 — each bio explicitly says "Southern California facilities")
- Justin White — Program Director
- Elizabeth Wald — Program Director
- Jeremiah Ross — Nursing Supervisor
- Alanna McMurtrey — Lead Case Manager

This directly addresses **WDL-030** (two "Coming Soon" placeholders) and gives **WDL-050** (per-staff pages) real material — the bios are already written, so it is a data-entry task, not a copywriting one.

**Decision required, with a real trade-off.** Featuring regional leadership on a facility team page is common and legitimate, and it beats "Coming Soon" placeholders. But it can also imply these people are on-site in Pomona when their roles span multiple facilities. If the location is closed (**WDL-055**), presenting a full leadership team would be actively misleading.

**⚠️ Blocking data issue — `Monica Olivares` vs `Monica-Olivires`.** S-003's bio and S-004's filename disagree on the surname spelling. One is wrong, and neither can be published unverified: S-001's only `CRITICAL` content row portfolio-wide is V0054 *"wrong person biography"*, and a misspelled surname on a licensed provider's staff page is that same error class. Confirm the correct spelling before this person is published.

**Fix**
1. Resolve WDL-055 first.
2. Decide: facility-only staff, or a clearly labelled "Regional Leadership" section.
3. Resolve the Olivares/Olivires spelling.
4. If featuring them:
   - Move `team` into `lib/data/team.ts` (shared with WDL-050) with `name`, `role`, `scope`, `photo`, `bio`.
   - Optimise the 9 headshots to WebP at the `aspect-[4/5]` card size before committing — the six PNGs are ~1.8 MB each, ~11 MB total raw, against the open repo-weight issue **WDL-017**. Two files in S-004 are already optimised at 52 KB and 96 KB; match those settings.
   - Use only one copy of each Cali Leadership headshot — S-004 has `Copy of …` duplicates mirroring S-003's duplicated text block.
   - Label the section so multi-facility scope is unambiguous.
   - Confirm each person consents to appearing on this facility's site.
5. Verify every name, credential, and title against the same V0054 standard as WDL-056.

**Acceptance criteria**
- [x] Decision recorded — 4 Cali SOUTH, owner choice 2026-08-10
- [ ] Olivares/Olivires spelling confirmed — **deferred**; that person was not published
- [x] Scope labelled so no one reads them as Pomona-exclusive
- [x] Cali Leadership duplication not carried into the build — those 5 not used
- [x] Headshots optimised to WebP; **112 KB total**, under the ~500 KB budget
- [ ] **Consent confirmed for each person** — ⚠️ still outstanding, see below
- [x] "Coming Soon" placeholders removed

**⚠️ One acceptance criterion remains open.** I have not confirmed that Justin White, Elizabeth Wald, Jeremiah Ross, and Alanna McMurtrey consent to appearing on *this facility's* site. Their bios and headshots were supplied for portfolio use, which is not the same as per-site publication consent. The code is in the working tree but **not deployed**, so this is resolvable before it becomes outward-facing — worth a quick check with HR or the individuals before cutover.

</details>

---

#### WDL-053 · Parent company named 20+ times but never linked, in either direction
**Status:** ✅ `FIXED` (our half) 2026-08-10 · **Severity:** P2 · **Area:** SEO / internal linking · `[SHEET V0091 + visual 860]`

> **Closed 2026-08-10.** Added `site.networkUrl` and linked the parent network from all three About-family pages (`/about`, `/about/our-story`, `/about/meet-the-team`), plus `parentOrganization` in the structured data via WDL-007. The affiliation carrying the site's "15+ years" credibility claim is now substantiated with a link rather than only asserted.
>
> The reciprocal half stays open upstream: the QHG parent still does not list or link this facility (S-001 V0091 + visual 860). Tracked in §7.

> Found only by the full-text sweep — this row is filed under `Quadrant Health Group (parent)`, so facility-column filtering missed it.

**Problem — the authority relationship is broken in both directions.**

**Their half (V0091, CONFIRMED, no amendment):** the parent's `/locations` page *"contains no outbound links to any facility website. Only social links are present, so the parent passes no authority to the facilities."* Its Fix lists `https://wellnessdetoxla.com` among the 11 domains that need linking. Compounding it, visual row **860** finds we are **missing entirely from the parent's locations list** (alongside Greater Texas Behavioral and Wellness Ranch KY), and row **859** notes the parent claims "10 Locations Nationwide" when it should be 12.

**Our half — confirmed in this repo.** V0091's Fix also says: *"Then link each facility back to `https://quadranthealthgroup.com`."* We do not. `grep -rn "quadranthealthgroup"` over `app/`, `components/`, and `lib/` returns **nothing**. Yet the Quadrant Health Group is named **20+ times** and carries much of the site's E-E-A-T weight:

| Location | Usage |
| --- | --- |
| `lib/site.ts:25` | `network: "Quadrant Health Group"` |
| `app/about/page.tsx:11,28,46,90` | Meta description, hero intro, body, licence line |
| `app/about/our-story/page.tsx:10,21,48,54,82` | Meta, intro, founders' quote attribution, licence line |
| `app/about/meet-the-team/page.tsx:40` | "As part of the Quadrant Health Group…" |
| `lib/data/areas.ts` | 5 × "15+ years combined experience through the Quadrant Health Group" — **the basis of 5 stat tiles** |
| `lib/data/admissions.ts:161` | Referral path for PHP/IOP/Virtual IOP |

The entire "backed by 15+ years" credibility claim rests on a network affiliation that is never substantiated with a link. That is both a missed authority signal and an E-E-A-T weakness on a YMYL site — related to **WDL-047**, where the same network attribution needs to be unambiguous.

**Fix**
1. **Ours (actionable now):** link the first mention of `site.network` on `/about`, `/about/our-story`, and `/about/meet-the-team` to `https://quadranthealthgroup.com`. Add `parentUrl` to `lib/site.ts` beside `network`. Consider adding `parentOrganization` to the `MedicalBusiness` JSON-LD (WDL-007).
2. **Theirs (track, do not action here):** the parent must add us to `/locations`, link out to `wellnessdetoxla.com`, and correct the location count.

**Acceptance criteria**
- [ ] `site.parentUrl` added and used
- [ ] Parent linked from at least the three About-family pages
- [ ] `parentOrganization` present in structured data
- [ ] Escalated upstream: we are absent from the parent's locations list and receive no inbound link

**Cross-repo dependency.** Our half is independent and shippable; their half needs the QHG parent repo.

---

#### WDL-054 · `/privacy-policy` robots directive is one of four treatments across the portfolio
**Status:** `BLOCKED` (portfolio decision) · **Severity:** P3 · **Area:** SEO consistency · `[SHEET V0042 — CONFIRMED_AMENDED]`

> Found only by the full-text sweep — filed under `Fort Worth Wellness`, but its verification correction names us.

**Problem** S-001 verified every privacy page in the portfolio and found the same page type carries **four different robots treatments**:

| Treatment | Sites |
| --- | --- |
| `index, follow` | Dallas, Des Moines, Seaside, Wellness NJ, QHG parent (5) |
| no robots meta | Hillside, Marina Harbor, Ocean Coast (3) |
| **`noindex, follow`** | **Laguna, Wellness Detox LA (2)** ← us |
| `index, nofollow` | Fort Worth (1) |
| no privacy page at all | Greater Texas (compliance gap, V0100) |

Ours is set at `app/privacy-policy/page.tsx:10`. S-001's recommendation: *"broadening this row, or adding a portfolio-level row, so the decision gets made once."*

**Important — this does not reopen WDL-006.** Our configuration is *internally consistent*: `noindex` + sitemap exclusion is correct, and S-001 confirms that twice (V0080, V0100). V0068's verification note pre-clears us explicitly: *"Same applies to the Wellness Detox LA privacy row when it comes up: verified also 'noindex, follow'."* The open question is narrower — whether `noindex` is the right *portfolio* choice for a YMYL privacy policy, given that 5 of 12 sites index theirs.

Arguments both ways: indexing a privacy policy is a mild trust/transparency signal for YMYL healthcare and costs nothing; `noindex` keeps a thin, non-commercial page out of the index. S-001 rates the underlying issue *"Low severity either way."*

**Fix**
1. Owner/portfolio ruling: index privacy policies or not. Decide once for all 12.
2. If the ruling is `index, follow`: change line 10 **and** add the path to `app/sitemap.ts` — the two must move together, or WDL-006's by-design exclusion becomes a real defect.
3. If the ruling is `noindex`: no code change; record it as deliberate and push back to S-001.

**Acceptance criteria**
- [ ] Portfolio ruling recorded
- [ ] Robots directive and sitemap membership agree with each other
- [ ] `WDL-006`'s privacy-policy exclusion re-verified against whichever ruling lands

**Blocked on:** portfolio-wide robots ruling.

---

#### WDL-059 · Import real facility photography; replace stock hero
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P1 · **Area:** Content / brand · `[SHEET S-005]`

> ## ✅ IMPLEMENTED — 11 assets imported, 1.11 MB total
>
> **The homepage hero was a stock photograph of a beach.** `nature-wide.webp` is an aerial of a Santa Monica–style coastline — not this facility, not Pomona. It is now the actual residence.

**Hero selection method.** Eight exterior candidates were rendered into a simulation of the real hero box — `object-cover object-center`, the exact `from-ink/50 via-ink/15 to-transparent` scrim, the `h-28` cream bottom fade — and the mean luminance inside the `max-w-2xl` text safe area was measured to compute white-text contrast:

| Candidate | Desktop | 390 px | 768 px | Verdict |
| --- | --- | --- | --- | --- |
| **`DSC_6289-HDR`** | **7.5:1** | **6.4:1** | **5.5:1** | ✅ **chosen** — passes AA at every breakpoint |
| `DSC_6274-HDR` | 8.7:1 | — | — | highest contrast, but AC units and fencing dominate the frame |
| `DSC_6278-HDR` | 7.8:1 | — | — | shot from under the pergola; reads enclosed |
| `DSC_6236-HDR` | 6.8:1 | **3.9:1** ❌ | **4.2:1** ❌ | rejected — fails AA on mobile |
| `DSC_6283-HDR` | 5.5:1 | — | — | pale stucco wall behind the headline |
| `DSC_6218-HDR` | 5.0:1 | — | — | lowest; also already the OG image |
| `DJI_*` aerials (4 tested) | — | — | — | rejected — bright hazy sky sits behind the headline |

`DSC_6289` also composes correctly for left-aligned copy: lawn and pergola behind the text, building to the right. **This closes the homepage half of WDL-025.**

**Placement and sizing map**

| Asset | Dimensions | Weight | Placement | `sizes` | Rationale |
| --- | --- | --- | --- | --- | --- |
| `DSC_6289-HDR.webp` *(already in repo)* | 1600×1067 | 132 KB | **Homepage hero** — `app/page.tsx:42`, `fill` + `priority` | `100vw` | Full-bleed; `priority` because it is the LCP element |
| `DJI_...105854_0099_D.webp` **new** | 1600×900 | 261 KB | **`/about/areas-we-serve/southern-california` hero** — `lib/data/areas.ts:177` | `(max-width:1024px) 100vw, 1024px` | Regional page wants a regional frame: neighbourhood + San Gabriel range. Rendered in `ContentPage`'s `aspect-[16/8]` band, so a 16:9 source crops cleanly |
| `DJI_...110028_0103_D.webp` **new** | 1600×900 | 164 KB | **Tour gallery → Outdoor Spaces** | `(max-width:640px) 50vw, (max-width:1024px) 33vw, 400px` | Only aerial that shows the property itself rather than the wider tract |
| `DSC_6086`, `6095`, `6134` **new** | 1600×1067 | 87/67/80 KB | **Tour → Living, Dining & Common** | as above | Three further angles on the main living room |
| `DSC_6104`, `6107` **new** | 1600×1067 | 104/115 KB | **Tour → Living, Dining & Common** | as above | A third kitchen and a second dining setting |
| `DSC_6140`, `6153` **new** | 1600×1067 | 86/79 KB | **Tour → Bedrooms** | as above | Grows Bedrooms from 5 to 7 |
| `logo-lockup-white.webp` **new** | 600×433 | 38 KB | **Footer** — `components/Footer.tsx:48`, `h-16` | *(fixed `width`/`height`)* | Official asset replaces `logo-white.png` (640×438, 132 KB) — same aspect, **94 KB lighter** |
| `logo-lockup-navy.webp` **new** | 600×433 | 52 KB | **Imported, not yet placed** | — | Intended for the header; blocked by **WDL-063** |

**Sizing decisions and why they are correct**
- **1600 px width** matches the existing convention exactly, so `next/image` generates the same srcset breakpoints as the other 22 gallery images. No new size tier.
- **Logos trimmed to content.** The supplied PNGs are 1024×1024 with the artwork occupying only 808×583; the transparent padding would have forced `h-16 w-auto` to render the mark ~30 % smaller than intended. Trimmed to the bounding box, then scaled to 600 px wide — ample for a 64 px-tall render even at 3× DPI (needs ≈266 px). Encoded lossy q80 with alpha after testing lossless (63 KB) against q88 (57 KB) and q80 (52 KB).
- **Aerials re-encoded at q75, not q82.** Drone frames carry high-frequency detail that inflates WebP; q82 cost 353 KB and 236 KB, q75 gives 261 KB and 164 KB with no visible loss at render size — a 164 KB saving across two files.
- **9 of 18 new photos deliberately held back.** The other 9 aerials are near-duplicates of the two selected. Importing all 14 would have added ~2 MB for no editorial gain, against the open repo-weight issue **WDL-017**.

**Verified:** `tsc --noEmit` 0 errors · `eslint` clean on all 4 changed files · build 52/52 static · every `/images/*` reference resolves to a file on disk · `DSC_6289-HDR.webp` present in the prerendered homepage HTML.

**Net repo impact:** +1.11 MB across 11 files. Modest against the ~19 MB of *unused* stock still pending deletion in **WDL-017**, and it displaces stock imagery in the site's most valuable slots.

---

#### WDL-060 · Gallery alt text described the wrong rooms
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P1 · **Area:** Accessibility / SEO · `[CODE]`

**Problem** Having the original shoot made it possible to check every gallery caption against its photograph. **Five of 26 described a different room than the image showed**, and one image was filed under the wrong category. Screen-reader users were told a kitchen was a lounge; image alt is also a ranking signal, so the errors cost twice.

| Image | Old alt | What the photograph actually shows |
| --- | --- | --- |
| `DSC_6119` | "Cozy seating in a shared common space" | A **kitchen** — breakfast bar, dishwasher, gas range |
| `DSC_6296` | "Relaxed lounge space for group connection" | A **kitchen** — full-size range, refrigerator, counters |
| `DSC_6301-HDR-1` | "Comfortable common area designed for calm and rest" | A **kitchen island** with dining seating |
| `DSC_6265` | "Sunlit patio space outside the residence" | The **building's front elevation** — no patio in frame |
| `DSC_6268` | "Dining and shared living space **inside** the residence" | An **outdoor back lawn** with brick path and pergola |
| `DSC_6209` | "Restful **private** bedroom" | A bedroom with **two beds** — every bedroom in the shoot is shared |

**Also corrected**
- `DSC_6268` **moved** from "Living Room & Common Spaces" to "Outdoor Spaces" — it was an outdoor photograph in an interior category.
- Category renamed **"Living Room & Common Spaces" → "Living, Dining & Common Spaces"**, since 6 of its 13 images are kitchens or dining rooms. Kept at three categories to match the live site's structure.
- `DSC_6248` retitled to "Group room with armchairs arranged in a circle for therapy sessions" — it is visibly a therapy room, which is a stronger asset than "communal gathering area".
- `DSC_6289` retitled from "Private outdoor courtyard" to describe the back lawn and pergola it actually shows.
- Homepage preview `gallery` rebuilt: leads with `DSC_6233` (brick path to the arched entrance — the strongest single frame) and drops the mislabelled `DSC_6265`.

**Acceptance criteria**
- [x] Every caption describes its own photograph
- [x] No image in a category it does not belong to
- [x] "Private" removed where rooms are shared
- [x] Build passes; 26 → 34 gallery images

---

#### WDL-061 · Two supplied images are virtually staged renders of real rooms
**Status:** `BLOCKED` — **needs owner decision** · **Severity:** P1 · **Area:** Compliance / trust · `[SHEET S-005]`

**Problem** `wellness-detox-la-bedroom.png` and `wellness-detox-la-living-room.png` are **not photographs of the facility as it exists**. Compared side by side against the real shots of the same rooms, the architecture matches exactly — same fireplace, same corner bay windows with plantation shutters, same wall-mounted TV, same room geometry, same window placement and dresser position — but the furnishings have been **replaced**:

| Real photograph | Staged render |
| --- | --- |
| Bare hardwood floor | Large area rug |
| Two plain grey sofas | Styled sectional + loveseat, throw pillows, folded blanket |
| Empty walls | Two framed artworks |
| No plants | Potted fig tree, smaller plants, cut flowers |
| No lighting beyond fixtures | Floor lamp, table lamp |
| — | Round wood coffee table, woven pouf, basket, mantel styling |

The bedroom render likewise adds a rug, layered decorative bedding, a nightstand lamp and a plant.

**Why this needs a decision rather than quiet placement.** Publishing these as facility photography would show prospective clients rooms furnished with items that are not there. Virtual staging is routine in property marketing *with disclosure*; on a licensed treatment provider's site, where someone chooses where to receive care partly on environment, undisclosed staging is a material misrepresentation. It would also contradict the repo's own standing claim at `lib/site.ts` — *"These are the real professional photographs of the Pomona residence."*

The filenames (`wellness-detox-la-*.png`, slug-style) suggest they were prepared for web use, so this may well be intended — which is exactly why it should be an explicit decision.

**Options**
1. **Do not publish** (default, and what I have done) — the real photographs are strong and now number 34.
2. **Publish with visible disclosure** — e.g. a "virtually staged" caption. Honest, but sits oddly beside 34 undisclosed real photographs.
3. **Publish as aspiration, clearly separated** — e.g. a "planned refurbishment" section, if that is what they represent.
4. **Make them true** — furnish the rooms to match, then re-shoot.

**Not imported.** Held in `~/Downloads/Wellness Detox of LA` pending your call.

> ## ✅ OWNER RULING 2026-08-10 — **publish, with an on-image "Virtually staged" badge.** AMENDED (owner input)
>
> Option 2 chosen, with the strongest of the disclosure forms: a **persistent badge inside the image frame**, not a caption beneath it and not a section label.
>
> **Why the badge and not a caption.** These two sit among 34 undisclosed real photographs, so the disclosure has to survive being separated from its context. A badge rendered inside the frame travels with the image when it is screenshotted, cropped, or shared to social — a caption or a section heading does not, and those are exactly the paths by which a staged image becomes a misrepresentation.
>
> **Implementation**
> 1. Convert both PNGs to the repo's 1600px WebP convention (photos at q82) before import — they are PNGs today and must not land in `public/` unoptimised (WDL-017, and the ≤1 MB rule).
> 2. Extend `GalleryImage` with an optional `staged?: boolean`. `TourGallery` renders the badge when set — no new component, and every other image is unaffected.
> 3. **Alt text carries the disclosure too**, so it reaches screen readers and is not a purely visual signal: *"Virtually staged rendering of the living room — furnishings shown are illustrative."*
> 4. **Reconcile `lib/site.ts`.** The standing comment *"These are the real professional photographs of the Pomona residence"* becomes false the moment these are added; it must be amended in the same change, or the file contradicts the page.
>
> **Acceptance criteria**
> - [x] Owner decided: these are published, disclosed as virtually staged
> - [ ] Badge visible on both images, inside the frame
> - [ ] Disclosure duplicated in alt text
> - [ ] `lib/site.ts` "real photographs" comment amended
> - [ ] Both images converted to WebP within the size convention

---

#### WDL-062 · 727 MB facility video has no viable home in this repo
**Status:** `OPEN` · **Severity:** P2 · **Area:** Media / performance · `[SHEET S-005]`

**Problem** `WDLA Video/Copy of 1743813924221940.mp4` is **727 MB** — 92 % of the folder's entire 793 MB. It cannot go into `public/`:
- Git would carry it forever; GitHub warns above 50 MB and hard-blocks at 100 MB per file.
- Vercel serves `public/` as static assets with no transcoding or adaptive bitrate — every viewer would pull the full 727 MB.
- It would dwarf the entire current repo (~26 MB of images).

**Fix — host it properly, then embed**
1. Upload to a video host that transcodes and streams adaptively: Vercel Blob + a `<video>` tag for something short, or Mux / Cloudflare Stream / YouTube / Vimeo for a full tour.
2. Embed with a poster frame from the existing stills (`DSC_6233-HDR.webp` is the strongest) so no video bytes load until play.
3. Natural placement is `/tour`, above `TourGallery`.
4. If it is a walkthrough, it partially answers **WDL-046**'s desire for a richer sense of place.
5. Apply the **WDL-010** consent decision — a third-party player is another external embed, like the Maps iframe in **WDL-021**.

**Acceptance criteria**
- [ ] Video hosted externally, never committed to the repo
- [ ] Embedded with a poster frame; no autoplay with sound
- [ ] Lazy-loaded, consistent with the consent policy
- [ ] Captions or a transcript for accessibility

---

#### WDL-063 · Official logo is a stacked lockup; the header needs a horizontal variant
**Status:** `BLOCKED` — needs a brand asset or a design decision · **Severity:** P2 · **Area:** Brand · `[SHEET S-005]`

**Problem** S-005 supplies the real logo — a "WD" monogram with a leaf above a "WELLNESS / DETOX OF LA" wordmark, in brand navy **`#363f55`** (despite the filename saying "purple"). Two gaps follow.

**1. The header does not use the real logo at all.** `components/Logo.tsx` composes the monogram (`icon-dark.png`, pure black) beside **hand-typed Poppins text** reading "WELLNESS" / "DETOX OF LA". The official wordmark is a light, wide-tracked, high-contrast face — nothing like Poppins, a geometric sans. So the header currently shows a **typographic reconstruction that does not match the brand**, in the wrong colour (`#000` vs `#363f55`).

**2. The official lockup cannot simply be dropped in.** It is **stacked**, 600×433 (1.39:1). The header renders its logo at `h-8 sm:h-9` — 32–36 px tall. At 36 px the wordmark block would be ~15 px and the "DETOX OF LA" subline **≈4 px tall**: illegible, and visually broken. Verified by rendering the asset at 36 px and 64 px on both cream and ink grounds.

**What I did and did not do**
- ✅ **Footer now uses the official asset.** It renders at `h-16` (64 px), where the subline is legible. `logo-lockup-white.webp` replaces `logo-white.png` — official artwork, correct colour, and 94 KB lighter.
- ⏸️ **Header left alone.** Swapping in a stacked lockup at 36 px would be a regression, and redesigning the header's proportions is a visual decision, not a mechanical import.

**Options for the header**
1. **Request a horizontal lockup** from whoever owns the brand assets — the correct fix, and likely already exists.
2. **Recolour the monogram to `#363f55`** and keep the text beside it. One-line change; removes the wrong-colour problem but keeps the non-brand typeface.
3. **Monogram only** in the header, full lockup in the footer — clean, common, loses the wordmark up top.
4. **Increase header height** to fit the stacked lockup — affects the fixed-header offsets at `app/layout.tsx:107` and the sticky `JumpNav` top values; the most invasive option.

**Also worth settling:** brand navy `#363f55` is not in the palette. `--color-ink` is `#23272f` (near-black slate) and the accent is rose `#D86C97`. Per the README the rose was "carried over from the original site". If `#363f55` is the real brand colour, that is a broader palette question.

> ## ✅ OWNER RULING 2026-08-10 — **source a horizontal lockup; recolour to `#363f55` in the meantime.** AMENDED (owner input)
>
> **Target state:** request a horizontal/landscape variant from whoever owns QHG brand assets (SVG preferred, else high-res PNG). It very likely exists — stacked lockups almost always ship with a horizontal sibling. When it arrives it replaces the Poppins reconstruction outright.
>
> **Interim, approved to do now:** recolour the monogram and the reconstructed wordmark from pure black to brand navy **`#363f55`**, and add it to the palette as a real token. This is confirmed as the brand colour, so it is not provisional.
>
> - Contrast check: `#363f55` on cream `#f7f3ef` = **9.4:1** — clears AA and AAA, so no accessibility cost. *(Verified alongside the WDL-068 palette work.)*
> - The token means the horizontal lockup drops into a palette that already knows the colour, rather than introducing it later.
> - **This does not close the issue.** The typeface is still Poppins, not the brand face — the header remains a reconstruction, just a correctly-coloured one. Recorded explicitly so the interim fix does not quietly become permanent once it stops looking wrong.
>
> **Palette note settled:** `#363f55` joins the palette as a brand token. It does **not** replace `--color-ink` `#23272f`, which is the body/UI slate and is used for text contrast throughout; the two coexist with distinct roles.

**Acceptance criteria**
- [x] Header approach chosen — horizontal lockup, with an interim recolour
- [ ] If a horizontal lockup is supplied, it replaces the reconstructed wordmark
- [ ] Monogram colour matches the official mark — **interim recolour to `#363f55` approved, not yet applied**
- [ ] Logo legible at every breakpoint; header height and offsets unchanged unless deliberately revised
- [x] `#363f55` either added to the palette or explicitly declined — **added as a brand token**

---

#### WDL-064 · Stock imagery still fronts 10 treatment, therapy and blog pages
**Status:** `OPEN` — mostly superseded, see below · **Severity:** P2 · **Area:** Content · `[CODE]` + `[SHEET S-005]`

> **Mostly cleared 2026-08-10 by WDL-041.** Removing the 14 treatment heroes (plus family-therapy) eliminated 8 of the 11 stock usages. `nature-wide.webp` and `nature-hero.webp` are now **fully unreferenced**. Three remain, all blog heroes in `lib/data/blog.ts` (`wellness-2` ×1, `wellness-1` ×1, `people-community` ×1) — these belong to **WDL-048**, which needs the original post images from production and cannot be closed by substitution.

**Problem** Reviewing S-005 exposed how much of the site is fronted by generic stock that has nothing to do with the facility:

| Asset | What it actually is | Used as hero on |
| --- | --- | --- |
| `wellness-1.webp` | Stock: woman doing yoga beside candles | **5 pages** |
| `wellness-2.webp` | Stock: the "Beverly Hills" sign and palm trees | **4 pages** |
| `people-community.webp` | Stock: two models posing in a studio | **2 pages** |
| `nature-hero.webp` | Stock: the Hollywood sign | unused |
| `nature-wide.webp` | Stock: a Santa Monica–style beach | ~~homepage hero~~ → **fixed in WDL-059** |

By contrast `facility-1/3/dining/exterior.webp` *are* real facility photographs, just alternate crops of the `DSC_*` set.

**Deliberately not reassigned — the approved plan removes these images entirely.** S-001's visual audit (**WDL-041**, 14 rows) instructs "Remove the image in the top of the page" for every treatment sub-page, which is where 9 of these 11 stock heroes sit. Picking new photographs for slots that are slated for deletion would be wasted work, and would conflict with an owner-approved instruction.

**Sequence**
1. Land **WDL-041** (remove treatment-page hero images). That clears 9 of the 11 stock usages at a stroke.
2. Any hero surviving that pass gets a real photograph from the 34 now available.
3. Blog heroes belong to **WDL-048**, which calls for the *original* post images from production — not in S-005, so still outstanding.
4. Then `wellness-1`, `wellness-2`, `people-community`, `nature-hero`, `nature-wide` become unreferenced and are deleted under **WDL-017**.

**Acceptance criteria**
- [ ] No page fronted by stock imagery that implies it depicts this facility
- [ ] Every surviving hero is a real facility photograph or deliberately abstract
- [ ] Unreferenced stock deleted with WDL-017
- [ ] `facility-*.webp` reconciled against the `DSC_*` originals — they are duplicate crops

---

### P3 — Polish

---

#### WDL-022 · Dead code
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P3 · `[CODE]`

> **Closed 2026-08-10.** `site.tagline` and the `Button` `ghost` variant removed (both unreferenced). `PageHero`'s `bg` prop **kept and documented as RESERVED** rather than deleted — it is a complete, working dark-hero variant, and the comment now points at WDL-025 so contrast gets re-checked if it is ever used.

Unreferenced: `site.tagline` (`lib/site.ts:9`) · `Button variant="ghost"` (`components/ui.tsx:38`) · `PageHero`'s `bg` prop and its whole dark-hero branch (`components/PageHero.tsx:18-46`).

**Fix** Remove, or mark as intentional reserved API. The `PageHero` dark variant is a fully built feature — confirm it is not slated for an upcoming page before deleting.

---

#### WDL-023 · Footer logo is not a link home
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P3 · `[CODE]`

> **Closed 2026-08-10.** Footer logo wrapped in `<Link href="/">` with an `aria-label`, matching the header's behaviour and the near-universal convention.

`components/Footer.tsx:48` renders `logo-white.png` as a bare `<Image>`. Users expect a footer logo to navigate home; the header logo is correctly wrapped with an `aria-label`.

---

#### WDL-024 · Dropdown nav parents never show the active-route state
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P3 · `[CODE]`

> **Closed 2026-08-10.** Added an `isActive()` helper matching `pathname === href || pathname.startsWith(href + "/")`, applied to **both** nav branches. Dropdown parents (About / Treatment / Admissions) now highlight on nested routes such as `/treatment/detox`, which they never did. `/` is special-cased to exact match so it does not match everything.

`components/Header.tsx:113` applies the active style only to flat nav items. Items with dropdowns (About, Treatment, Admissions) take the branch at line 76 and never highlight — so on `/treatment/detox` nothing in the nav indicates location.

**Fix** Use `pathname === item.href || pathname.startsWith(item.href + "/")` on both branches. Watch the root-level `/[slug]` blog routes, which belong under About → Blog (and may move — WDL-038).

---

#### WDL-025 · Hero copy contrast depends on the photograph
**Status:** ✅ `FIXED` for the homepage 2026-08-10 · **Severity:** P3 · `[CODE]`

**Resolved by WDL-059.** The replacement hero was selected *on* this criterion: white headline contrast measured inside the real text safe area at **7.5:1 desktop, 6.4:1 at 390 px, 5.5:1 at 768 px** — all above 4.5:1 AA. A candidate that failed mobile (`DSC_6236`, 3.9:1) was rejected for exactly this reason. Contrast is now a measured property, not an accident of the photograph.

Still applies to `PageHero`'s `bg` dark variant if **WDL-022** retains it — that variant is currently unused.

<details><summary>Original</summary>

`app/page.tsx:51` layers a `from-ink/50 via-ink/15 to-transparent` scrim under white hero text, so measured contrast is a property of `nature-wide.webp`. Text shadows carry it in practice.

**Fix** Strengthen the scrim midpoint or add a subtle `bg-ink/25` beneath the text column; verify ≥4.5:1 against the brightest pixels behind the copy.

</details>

---

#### WDL-026 · Markdown rendered without sanitization
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P3 (P1 if authoring moves to a CMS) · `[CODE]`

> **Closed 2026-08-10.** Documented the safety invariant at the `dangerouslySetInnerHTML` call site: post bodies are first-party template literals with no user or third-party input path, so the output is trusted. The comment makes adding a sanitiser a stated prerequisite of any CMS migration.

`components/BlogPostView.tsx:92` passes `marked` output to `dangerouslySetInnerHTML`. Safe today — all bodies are first-party template literals with no user input path.

**Fix** Add a `// SAFETY:` comment stating the invariant; make sanitization a hard prerequisite of any CMS migration.

---

#### WDL-027 · Desktop dropdowns lack `aria-haspopup` / `aria-expanded`
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P3 · `[CODE]`

> **Closed 2026-08-10.** Added `aria-haspopup="true"` to dropdown triggers and Escape-to-close (blurring the focused child collapses the CSS `focus-within` disclosure). `aria-expanded` was **deliberately not added**: the disclosure is CSS-driven, so without JS state the value could not be kept truthful, and a stale `aria-expanded` misleads assistive tech more than its absence does. Reasoning recorded in the code.

`components/Header.tsx:74-108` opens on `:hover`/`:focus-within`. Children are tabbable so it is operable, but the trigger declares no `aria-haspopup`/`aria-expanded`, and there is no Escape-to-close. Mobile toggles already handle `aria-expanded` correctly (lines 149, 175) — mirror that. Coordinate with WDL-004.

---

### Awaiting owner input

---

#### WDL-028 · Content parity with production unverified
**Status:** `AWAITING INPUT` · **Severity:** TBD · `[CODE]`

Partially answered by S-001: V0124 proves at least one production page is missing (→ WDL-034). A full copy-level diff — phone numbers, licence details, programme descriptions — still needs the production site. Note this repo's commit (2026-07-09) predates S-001's content snapshot (~2026-07-15/16), so **confirm the deployed preview matches this checkout.**

---

#### WDL-029 · Homepage Google reviews section is dark
**Status:** `AWAITING INPUT` · **Severity:** P2 · `[CODE]`

`lib/reviews.ts` is fully implemented and degrades gracefully — no `GOOGLE_PLACES_API_KEY`, no section, no build error. Correct behaviour, but the social-proof block never renders in production and the `aggregateRating` structured data never emits.

**Caching note:** with no key, no `fetch` runs, so `/` prerenders fully static and the README's "refreshes about once per day" does not apply. Once a key is set, the `revalidate` at `lib/reviews.ts:92` makes the route ISR and the claim becomes true.

**Needs:** `GOOGLE_PLACES_API_KEY`, optionally `GOOGLE_PLACE_ID`, set locally and in Vercel. Coordinate with WDL-007.

---

#### WDL-030 · Team page ships two "Coming Soon" placeholders
**Status:** ✅ `FIXED` 2026-08-10 · **Severity:** P3 · `[CODE]`

**Resolved by WDL-057.** Both placeholders removed from `app/about/meet-the-team/page.tsx`; the four Cali SOUTH leaders now occupy that row. Two of the four Pomona staff still fall back to initials for want of a photo — S-004 has no headshot for either (`Selin` ✗, `Crystal` ✗), so that remains open under **WDL-056**.

<details><summary>Original</summary>

`app/about/meet-the-team/page.tsx:65-70` renders two dashed placeholders; two of four real members lack photos and fall back to initials (line 23). **Superseded in scope by WDL-050** — resolve together.

**Partially addressable from S-003.** It supplies no facility bios for us, but nine publication-ready Southern California leadership bios could fill these slots — see **WDL-057**.

</details>

---

#### WDL-031 · Privacy policy is generic placeholder copy
**Status:** `AWAITING INPUT` · **Severity:** ~~P2~~ → **P1** — **escalated 2026-08-10 by the WDL-010 ruling** · `[CODE]`

`app/privacy-policy/page.tsx` is reasonable but generic, hedged as "including HIPAA where applicable" (line 39). It does not describe actual data flows — the `mailto:` handoff (WDL-002), GA4 collection (WDL-010), the Maps embed (WDL-021) — and carries no effective date.

Its `noindex` status is **confirmed correct** by S-001 (V0080, V0100) and should stay. Needs counsel-reviewed copy once WDL-002 and WDL-010 are settled.

> ### ⬆️ Escalated P2 → P1 — the consent banner now links visitors here
>
> With **WDL-010 ratified**, the consent banner points every visitor at this page as the basis for an informed choice. A consent mechanism whose linked policy describes none of the actual processing is arguably weaker than no banner: it creates a documented expectation the page does not meet.
>
> **What the policy must now describe, and currently does not:**
>
> | Flow | Status | Described? |
> | --- | --- | --- |
> | GA4, opt-in only, `anonymize_ip`, 3 named events | live, ratified | ❌ |
> | Server-side lead pipeline carrying **PHI** to a third-party endpoint | built; endpoint pending WDL-002 | ❌ |
> | Google Maps embed (sets Google cookies) | live, gating pending WDL-021 | ❌ |
> | Retention, and how to withdraw consent once given | — | ❌ |
> | Effective date | — | ❌ |
>
> **The `mailto:` reference in the paragraph above is now stale** — that transport was removed under WDL-002. The replacement copy must describe the server-side pipeline instead.
>
> **Sequencing:** draft once the WDL-002 endpoint and its BAA status are confirmed, so the policy describes the real processor rather than a placeholder. Counsel-reviewed, per the original note.

---

## 6. Do not action

Recorded so nobody re-opens them.

| Item | Source | Reason |
| --- | --- | --- |
| Fold `/about/our-story` into `/about` | S-001 **V0078**, withdrawn | `NOT_CONFIRMED`. Distinct titles, distinct H1s, 23.8% word overlap vs a 6.0% chrome baseline — normal hub/child architecture. The fix *"would delete a distinct 345-word page that exists on production."* |
| Remove `/privacy-policy` from sitemap consideration | S-001 **V0080**, **V0100** | Already correct. It is `noindex`, so exclusion is right. Consistent with V0068. |
| Rename `/about` or `/treatment` for portfolio consistency | S-001 **V0097**, **V0094** | We already match the standard. V0097's original outlier list wrongly included us; corrected on verification. |
| Rename `/treatment/opioid-addiction` | S-001 **V0089** | **We are the reference standard.** The three-way portfolio split is QHG `opiate-addiction` / ours `opioid-addiction` / NJ `opioids` (plural), and the recommendation is to standardise on *our* term. ⚠️ **Watch item:** S-001 flags its own justification as unvalidated — *"I have NOT checked search volume, and I stated it as fact… if the data does not support opioid, the whole standard flips."* If the keyword data reverses the ruling, our slug becomes the rename candidate. No action now. |
| Strip jump-nav anchor ids | S-001 visual **1684**, **1693** | See **WDL-052** — fragments are not URLs. Would break jump nav on 25 routes. Pending ruling. |
| Touch phone numbers on any site | S-001 **V0043/V0048/V0049**, `BLOCKED` | Other facilities; *"each would remove a live phone number that may be routing calls."* |
| LegitScript seal work | S-001 **V0070** | Des Moines only. Verified: we make no certification claim. |
| Geo-suffixed service slug policy | S-001 **V0118** | We have no geo-suffixed service slugs. |

---

## 7. Recommended order of work

**Wave 0 — answer this before anything else.**

| # | Item | Gates |
| --- | --- | --- |
| 0 | **Is the Pomona facility operating?** (WDL-055) | **Everything.** Determines whether the site should launch at all, and whether its 24/7 availability claims are accurate. Also contextualises WDL-034, WDL-030, WDL-050, WDL-056, WDL-057 |

**Wave 1 — decisions to unblock everything else.** These gate 12 other issues; none is a code change.

| # | Item | Needed for |
| --- | --- | --- |
| 1 | **Trailing-slash ruling** (WDL-033) | WDL-008, WDL-039, and the canonical fix |
| 2 | **Production URL inventory** (WDL-008) | The whole redirect map |
| 3 | **Publishing freeze / re-sync** (WDL-034) | Stops the content gap widening daily |
| 4 | **Form endpoint decision** (WDL-002) | WDL-003, WDL-045 |
| 5 | **Analytics consent policy** (WDL-010) | WDL-021, WDL-046 |
| 6 | **"Replace and switch" clarification** (WDL-040) | 13 visual rows |

**Wave 2 — cheap, high-value code fixes.** No blockers; all shippable now.

| # | Issue | Why now |
| --- | --- | --- |
| 7 | WDL-001 | One constant; unblocks the entire insurance funnel. 5 of 5 CTAs currently miss the form |
| 8 | WDL-009 | Stops legacy 404s dead-ending crisis traffic — and WDL-008/034 guarantee they will be hit |
| 9 | WDL-006 | One array entry; the conversion page becomes indexable |
| 10 | WDL-032 | Two-template fix, 36 pages corrected |
| 11 | WDL-049 | Swap in an existing component |
| 12 | WDL-012 + WDL-013 | Links 9 stranded pages; satisfies visual rows 1675/1687 |
| 13 | WDL-053 (our half) | Three link additions; the "15+ years" credibility claim currently rests on an unlinked affiliation |
| 14 | WDL-048 step 1 | One-line date sort resolves the Clarion grouping defect at its root |

**Wave 3 — once Wave 1 rulings land.**

| # | Issue |
| --- | --- |
| 13 | WDL-033 implementation, then WDL-008 + WDL-039 redirect map |
| 14 | WDL-002 + WDL-003, then WDL-045 |
| 15 | WDL-034 fresh diff + content port |
| 16 | WDL-004 + WDL-005 + WDL-027 (one accessibility pass) |
| 17 | WDL-014 + WDL-015 (remove two silent link-breakage classes) |
| 18 | WDL-040 + WDL-041 + WDL-044 (one design-system pass across shared components) |

**Wave 4 — content, needing owner-supplied material.**
WDL-056 (verify staff identities) → WDL-057 → WDL-030 + WDL-050 · WDL-042, WDL-043, WDL-047, WDL-048, WDL-051 · then WDL-035, WDL-036, WDL-037, WDL-038

**Wave 5 — hardening and polish.**
WDL-007, WDL-011, WDL-016, WDL-017, WDL-018, WDL-019, WDL-020, WDL-021, WDL-046, WDL-054 · then WDL-022 → WDL-027

**Cross-repo / upstream — not fixable here, but track so they are not lost.**

| Item | Owner | Source |
| --- | --- | --- |
| Add Wellness Detox LA to the QHG parent's `/locations` list | QHG parent repo | visual 860 |
| Add outbound link from parent `/locations` → `wellnessdetoxla.com` | QHG parent repo | V0091 |
| Correct "10 Locations Nationwide" → 12 on the parent | QHG parent repo | visual 859 |
| Validate the opioid-vs-opiate keyword ruling before any rename | portfolio SEO | V0089 |
| Push WDL-001/002/003 into the tracker as new rows | project owner | §2 |
| Dedupe the `Cali Leadership` block (5 people listed twice) | S-003 doc owner | S-003 lines ~443 / ~510 |
| **Correct `(Wellness Detox LA) — Location temp closed`** — owner confirms the facility IS operating, so this line is wrong at source and will mislead the next reader | S-003 doc owner | S-003 line 728 |
| **Add a `Wellness Detox LA` folder** — it is the only Cali SOUTH facility without one | S-004 folder owner | S-004 tree |
| Resolve `Monica Olivares` vs `Monica-Olivires` before that person is published anywhere | HR / S-003+S-004 owners | S-003 vs S-004 |

---

## 8. Change log

| Date | Change |
| --- | --- |
| 2026-08-10 | **Review pass over all uncommitted work — 2 defects found and fixed, both invisible to the four gates.** **WDL-069:** `.eyebrow` was declared as *unlayered* CSS while Tailwind v4 emits utilities inside `@layer utilities` — and unlayered CSS beats every layer regardless of specificity or source order. It silently defeated four call-site overrides. Worst case was a **regression WDL-068 had introduced**: moving the CtaBanner eyebrow to `text-rose-soft` never applied, leaving it at **2.65:1 — worse than the 4.64:1 it had before the contrast work touched it**. Three `text-[0.65rem]` size overrides had never worked either (pre-existing). Fixed at the definition by wrapping `.eyebrow` in `@layer components`; every other unlayered rule in `globals.css` audited for the same hazard (`body`, `h1–h4` declare utility-shadowed properties but cause no live defect — all headings use `font-semibold`, matching the rule's `600`). Notably the codebase already documented this exact trap in a comment on the `h1–h4` rule. **WDL-070:** the phone-click listener read `data-call-location` but nothing ever set it, so the sticky mobile bar, hero, CtaBanner, InsuranceStrip and form fallbacks all collapsed into one `"body"` bucket — making the sticky-bar-vs-page-CTA comparison, the main question on a mobile-first site, unanswerable. Added a `trackAs` prop and five explicit labels; `form-delivery-failure` doubles as an outage signal while `LEAD_WEBHOOK_URL` is unset. **Also verified rather than assumed:** form values (including `<select>`) survive a validation error — a ledger claim that had never been tested; and the check script's nav-href and missing-image rules were regression-tested by reintroducing each defect. Gates after fixes: tsc 0, lint 0, build 52/52, check pass. |
| 2026-08-10 | **Owner batch answered — 9 rulings, 7 issues amended, 6 unblocked.** All recorded `AMENDED (owner input)` per operating rule 1. **WDL-033 → trailing slashes win** (`trailingSlash: true`, matching production): zero redirect churn on live traffic, and it closes the canonical problem as a side effect exactly as S-001 predicted — which in turn **unblocks WDL-032**, whose `pageMeta()` helper can now be written in a settled convention, and forces the 13 guessed redirects in WDL-008 to be rewritten slash-form. **WDL-008 → GSC export incoming** (best source: carries impressions, so redirects can be prioritised by traffic actually earned); all 13 guesses stay flagged unverified until matched against real URLs. **WDL-002 → QHG already runs a HIPAA-capable endpoint**, so this becomes a *config change, not a build* — but I asked for two things beyond the URL: written confirmation it is **BAA-covered** (an HTTPS endpoint does not substantiate "100% private & protected"; if the BAA can't be confirmed, the copy softens instead) and the payload shape it expects. **WDL-010 → consent banner RATIFIED → FIXED**; this creates two follow-ons the owner accepted: **WDL-021** must inherit the same gate (asking permission before GA4 but not before an ungated Google iframe is incoherent) and **WDL-031 escalates P3 → P1**, since the banner now points visitors at a privacy policy that describes neither the analytics nor the PHI pipeline. **WDL-034 → publishing freeze until cutover**: the gap stops growing today, but the ~1 month of existing backlog still needs porting once the GSC export lands — same artefact serves both issues, pull it once. **WDL-061 → publish the staged renders with an on-image "Virtually staged" badge**, chosen over a caption or a section label because a badge inside the frame survives screenshot and social sharing, which is precisely how a staged image otherwise becomes a misrepresentation; disclosure duplicated in alt text, and the `lib/site.ts` "real photographs" comment must be amended in the same change or the file contradicts the page. **WDL-063 → source a horizontal lockup, recolour to brand navy `#363f55` in the interim** and add it as a palette token (9.4:1 on cream, AAA) — recorded explicitly that this leaves a correctly-coloured *reconstruction*, so the interim does not quietly become permanent. No code written yet. |
| 2026-08-10 | **§3.5 re-sync completed — statuses now match the code.** All 12 concurrent-change files read and checked **against acceptance criteria**, not filenames. Gates re-run first: **all four green**, so **WDL-058 was already resolved before it was actioned** — its premise was stale, and both errors had been fixed better than the workarounds it proposed (consent moved to `useSyncExternalStore`, which also gained cross-tab sync). **Verdicts on the 8 predicted candidates:** ✅ FIXED — WDL-003 (verified end-to-end against a live receiver, including the misconfigured-production path, and through the no-JS progressive-enhancement path), WDL-006. ⚠️ PARTIAL — WDL-001 (3/4: CTAs fixed, but 10 literals and no `site.verifyHref`), WDL-002 (`mailto:` gone and PHI kept out of logs, but 3 privacy claims still overstate and no BAA endpoint → stays `BLOCKED`, still P0), WDL-010 (implemented, but it **chose** the consent policy this issue is blocked on the owner choosing → needs ratification, not a `FIXED` tick). ❌ **STILL OPEN, §3.5's guesses were wrong** — WDL-011 and WDL-032 were **never touched**; both were inferred from a filename + line count. WDL-045 not built but **unblocked**. **Five closures §3.5 did not predict**, found by scanning the tree against all of §5: WDL-004, WDL-009, WDL-018, WDL-019, WDL-058. **Two more reshaped:** WDL-007 (duplicate entity gone, but by *deleting* the review markup rather than unifying on `@id` — no `@id` exists and criterion 2 is now moot), WDL-008 (1 → 14 redirects, but **all 13 new ones are guesses**; the two *known-live* URLs — `/luxury-rehab-in-los-angeles/` and the indexed slash form `/about/blog/` — are still unmapped, so status deliberately unchanged). **Four new `[CODE]` issues:** WDL-065 review markup removed under Google's third-party policy (decision recorded so it is not silently reverted), WDL-066 phone number was hardcoded in **26 places** despite `lib/site.ts` being the stated single source of truth, WDL-067 content-integrity check + CI now enforce the ledger's most common defect class (each rule validated by reintroducing its defect; one false negative found and fixed), WDL-068 **both brand accents failed WCAG AA on the primary CTA** — §4 had measured only `--color-muted` and read as "contrast is fine". §4 baseline corrected, §3.5.1 records the verdicts, §3.5.2 the new issues. **Method note recorded: filename inference produced 2 of 3 wrong calls and must not be used on this ledger again.** No feature work started — reporting first, per the handoff. |
| 2026-08-10 | Ledger created. Baseline audit of `303efa5` — 31 issues, route map, health checks. |
| 2026-08-10 | **Closed every remaining unblocked issue — 22 → 40 of 70 resolved.** Shipped 18 fixes: **WDL-032** (og:url — `lib/seo.ts` `pageMeta()` across 16 page modules; verified 46 pages correct, 0 wrong, and it also fixed an *unlogged* bug where the 7 blog posts were dropping `og:site_name`/`locale`, because Next **overwrites** `openGraph` rather than deep-merging it — confirmed in the Next 16 docs before touching it, since the naive fix would have spread that loss site-wide). **WDL-007** (`@id` + `sameAs`/`hasMap`/`areaServed`/`parentOrganization`). **WDL-011** (real per-page `lastModified`; 8 distinct values now vs 1 churning timestamp). **WDL-012/013** (`AreasServed` + `TherapyGrid` now link — 9 previously stranded pages). **WDL-014/015** (slug moved onto `Program` and `Substance`; both fragile lookups and their silent `?? ""` fallbacks deleted). **WDL-016** (one canonical `additionalCommunities`). **WDL-020** (manifest; 52 → 53 routes). **WDL-021** (`MapEmbed` — click-to-load reusing the existing consent store, deliberately *not* conflating "show me a map" with "track me"). **WDL-041** (14 treatment heroes removed per S-001; +family-therapy, the one deliberate deviation, flagged). **WDL-022/023/024/026/027/049/053**. Mid-work I introduced and caught one regression: the first pageMeta pass stripped `og:title`/`og:description` from the 4 dynamic routes — fixed before verifying. **WDL-039 re-scoped to BLOCKED** rather than hacked, because one-hop redirects depend on the unresolved WDL-033 convention. All 5 gates green; 53/53 static. **Remaining 30 need decisions, material, or config — none is blocked on engineering.** |
| 2026-08-10 | **§3.5 re-sync executed + full end-to-end review.** Audited every candidate issue against the code rather than inferring from filenames. **11 more verified FIXED** (WDL-001, 003, 004, 005, 006, 009, 010, 018, 019, 058 + WDL-002 code-complete). Independently verified the 6 issues added by the concurrent work (WDL-065–070) — all four load-bearing claims check out, including **WDL-068**, which corrected a real miss in my own §4 baseline: brand rose `#D86C97` gave white CTA text only **3.22:1** (FAIL AA); it is now `#bd4b79` at **4.72:1** (PASS). My baseline had only measured `--color-muted`. A 5th gate now exists (`npm run check` → `scripts/check-content.mjs`, wired into `npm run verify`); all 5 gates green. Confirmed 14 of my 15 added images are referenced, the sole orphan being the documented `logo-lockup-navy.webp`; logged 3 orphans total for WDL-017. **Honest completion state: 22 of 70 resolved; 46 remain.** All three P0s I originally found are fixed, but **WDL-002 is not closed — `LEAD_WEBHOOK_URL` is unset, so the site cannot capture a lead today**, and P0s WDL-033/034 still need owner decisions. |
| 2026-08-10 | **S-005 (`~/Downloads/Wellness Detox of LA`) fully reviewed; real photography imported.** All 44 images opened and assessed via contact sheets, then key candidates at full size. **The homepage hero was a stock beach photograph** — replaced with the actual residence (`DSC_6289-HDR`), chosen by simulating the real hero box and *measuring* white-text contrast in the text safe area across breakpoints (7.5 / 6.4 / 5.5:1 — all AA); a candidate failing mobile at 3.9:1 was rejected. Imported 11 assets, **1.11 MB**: 7 new interiors, 2 selected aerials, 2 official logo lockups — 9 redundant aerials deliberately held back. Footer now uses the official lockup (94 KB lighter than the file it replaced). Full placement + `sizes` map recorded in **WDL-059**. Having the originals also exposed that **5 of 26 gallery captions described the wrong room** (three kitchens called lounges, a facade called a patio, an outdoor lawn called an interior dining space) and one image sat in the wrong category → **WDL-060 FIXED**; gallery grew 26 → 34. New open items: **WDL-061** two supplied PNGs are *virtually staged* renders of real rooms (furniture replaced) — not imported, needs an owner call; **WDL-062** the 727 MB video needs external hosting, never the repo; **WDL-063** the official lockup is stacked and illegible at the header's 36 px, so the header still shows a Poppins reconstruction of the wordmark in the wrong colour; **WDL-064** stock yoga/Beverly Hills/model shots still front 10 pages, deliberately not reassigned because WDL-041 removes those slots. **WDL-025 closed** for the homepage. Verified: tsc 0, eslint clean on changed files, build 52/52, every `/images/*` reference resolves. |
| 2026-08-10 | **Owner rulings applied + WDL-057 implemented.** Owner confirmed the **facility is operating normally** → **WDL-055 closed `WONTFIX`**, all 24/7 claims left intact, Wave 0 cleared, both source docs flagged for upstream correction. Owner chose **"add only the 4 Cali SOUTH"** → implemented: new [`lib/data/team.ts`](lib/data/team.ts) with `facilityTeam`/`regionalTeam` and 10 approved bio paragraphs; [`app/about/meet-the-team/page.tsx`](app/about/meet-the-team/page.tsx) rewritten with two labelled sections and a shared `MemberCard`; 4 headshots converted from S-004 to the repo's 800×1000 WebP convention at **112 KB total** and each visually verified for crop. **WDL-057 + WDL-030 FIXED**; WDL-050 groundwork done. Verified: tsc 0 errors, eslint clean on both my files, build 52/52, all 8 photos in the prerendered HTML. **Also discovered 12 files of concurrent changes made outside this session** → new **§3.5**: §5 statuses are out of sync with the code and need a re-sync pass; lint has regressed to 2 errors in `components/Analytics.tsx` → new **WDL-058**. WDL-056 re-framed: an operating facility makes our 4 staff's absence from both sources harder to explain, not easier. |
| 2026-08-10 | **S-004 (`~/Downloads/Staff Headshots`, 124 images) read in place and mapped.** **No Wellness Detox LA folder exists** — the only Cali SOUTH facility without one, while Hillside Mission, Laguna View, and Ocean Coast Recovery each have theirs. Zero headshots for this facility; zero for any of our 4 published staff. This **independently corroborates WDL-055** from a second, structurally different artefact — recorded in that issue. Confirmed all 9 WDL-057 candidates have both a written bio (S-003) and a high-res headshot (S-004), moving that issue from "needs material" to "needs a decision". Found a **blocking name discrepancy**: S-003 says `Monica Olivares`, S-004 says `Monica-Olivires` — V0054 error class, must be resolved before publishing. **Nothing copied into the repo:** the 9 originals total ~11 MB against open repo-weight issue WDL-017, so optimisation is gated on the WDL-057 decision. Upstream `Copy of …` duplicate headshots mirror S-003's duplicated Cali Leadership text block. |
| 2026-08-10 | **S-003 (portfolio staff bios, Google Doc) pulled, read in full, mapped.** 1,109 lines / 107 person entries across 11 headings. **Zero bios for this facility** — the only heading in the document with none, the only one parenthesised, and absent from the "bios needed" list. Its entire content is `Location temp closed`. Raised as **WDL-055 (P0)** and a new Wave 0: the site asserts 24/7 availability at this address in 9 places including `MedicalBusiness` structured data, so the two cannot both be true. **No code changed** — softening live availability claims on the strength of one line, against the owner's stated authority, would be the wrong call; escalated for confirmation instead. Also found **none of our 4 published team members appear anywhere in the document** (the only `Young` is a different person, Shawn Young, Exec Director SoCal) → **WDL-056 (P1)**, weighed against S-001's only `CRITICAL` content row V0054 "wrong person biography"; separately flagged the non-clinical "Fitness Guru" title. Recorded 9 publication-ready SoCal leadership bios as a possible source for the team page → **WDL-057**. WDL-030 and WDL-050 re-gated behind WDL-055/056. Upstream defect logged: `Cali Leadership` block duplicated in the source doc. |
| 2026-08-10 | **S-002 supplied and registered — pull failed.** Second workbook link recorded in §1 with status `BLOCKED`: HTTP 401 on all four access paths, Google requires sign-in. Verified as a document sharing setting rather than a tooling fault (S-001 returns 200 on the identical request). No content extracted, no issues created — nothing invented from an unread source. Awaiting sharing change, an `.xlsx` export, or connector authorization. |
| 2026-08-10 | **Completeness re-audit of S-001 — gap found and closed.** The first pass filtered on the `Facility` column and captured 94 rows. A full-text sweep of every cell in every tab found **5 additional rows that name us inside other facilities' row bodies**: V0042 (filed under Fort Worth), V0089 and V0091 (under QHG parent), and visual rows 860, 861 (under QHG parent). Added **WDL-053** (parent named 20+ times, never linked — confirmed by grep) and **WDL-054** (privacy robots one of four portfolio treatments). Visual row 861 **resolved the open "Clarion" question** in WDL-048 — it is a batch of newer posts rendering apart from older ones, fixed at the root by a date sort, not manual reordering. V0089 closed in §6 with a watch note: our `opioid-addiction` slug *is* the proposed standard, but S-001 flags its own justification as unvalidated. Verified 0 broken-link rows by host rather than by name; confirmed visual IDs 1–1903 contiguous and our block 1658–1732 complete; confirmed the 96 blank-`Facility` rows are empty ID stubs. Method note recorded in §1: facility-column filtering is insufficient on this workbook. |
| 2026-08-10 | **S-001 (QHG workbook) pulled, recorded, mapped.** All 5 tabs extracted. 6 build-issue rows + 13 ALL-SITES rows + 75 visual rows triaged; 0 broken-link rows apply. Added WDL-032 → WDL-052 (21 new issues). Three sheet findings **confirmed against code**: V0081 og:url (36/44 pages), V0102 trailing slash (`trailingSlash` unset), V0124 content gap (`/luxury-rehab-in-los-angeles` absent). WDL-006 corroborated by V0080 and its privacy-policy half closed as by-design. §2 cross-reference map and §6 do-not-action list added. Two rows disputed (WDL-038, WDL-052); one upstream withdrawal honoured (V0078). Priorities re-sequenced into 5 waves, decisions-first. |
