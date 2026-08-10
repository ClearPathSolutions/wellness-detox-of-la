# Wellness Detox of LA — Website

A modern, fast, mobile-first marketing site for **Wellness Detox of LA**, rebuilt from
the previous WordPress site as a static-optimized **Next.js** app ready to deploy on
Vercel.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.
Every route is statically prerendered, images are optimized, and there are no runtime
databases or CMS dependencies.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 — development
npm run build    # production build
npm start        # serve the production build

npm run lint     # eslint
npm run check    # content integrity: links, images, sitemap coverage, phone number
npm run verify   # lint + check + build (what CI runs)
```

### `npm run check`

A dependency-free script (`scripts/check-content.mjs`) that catches the class of bug TypeScript and
ESLint can't see:

- an internal `href` pointing at a route that doesn't exist
- a nav entry pointing at a missing page
- an `<Image src>` whose file isn't in `public/images`
- an **indexable** page missing from `sitemap.ts` (pages that set `robots: { index: false }` are
  exempt, which is how `/privacy-policy` is excluded)
- a hard-coded phone number anywhere outside `lib/site.ts`

It runs in CI on every push and pull request (`.github/workflows/ci.yml`).

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel, **New Project → Import** the repo. Framework preset **Next.js** is detected
   automatically — no config needed.
3. Deploy. Then add your domain (`wellnessdetoxla.com`) under **Project → Settings → Domains**
   and update DNS as Vercel instructs.

> Alternatively, from this folder run `npx vercel` (preview) or `npx vercel --prod`.

## Where things live

| What | File |
| --- | --- |
| **Business info + navigation** (phone, address, nav menu, areas) | `lib/site.ts` |
| Treatment sub-page content (detox, substances, therapies) | `lib/data/treatment-*.ts` |
| Admissions sub-page content + FAQs | `lib/data/admissions.ts` |
| Area page content | `lib/data/areas.ts` |
| Blog post content (markdown) | `lib/data/blog.ts` |
| Design tokens (brand colors, fonts, radius, shadows) | `app/globals.css` (`@theme` block) |
| Header + mobile menu | `components/Header.tsx` |
| Footer | `components/Footer.tsx` |
| Sticky mobile call bar | `components/MobileCallBar.tsx` |
| Reusable content blocks (program grid, timeline, gallery, etc.) | `components/blocks.tsx` |
| UI primitives + inline icons | `components/ui.tsx` |
| Contact form | `components/ContactForm.tsx` |
| Pages | `app/<route>/page.tsx` |
| Images / logos | `public/images/` |
| SEO: sitemap, robots, structured data | `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx` |

**To change the phone number, address, programs, or navigation, edit `lib/site.ts`** — it is the
single source of truth used across every page, the header, footer, and metadata.

## The forms

There are two lead forms — `components/ContactForm.tsx` and `components/InsuranceForm.tsx`. Both
submit to Server Actions in `app/actions/leads.ts`, which validate server-side and hand the lead to
`lib/leads.ts` for delivery. They work without JavaScript (progressive enhancement), show per-field
errors and a pending state, and — importantly — **only show the thank-you panel when the lead was
actually delivered**. If delivery fails they say so and surface the phone number, so a submission is
never silently lost.

Set `LEAD_WEBHOOK_URL` (see `.env.example`) to the endpoint that should receive leads.

> ⚠️ **HIPAA.** The insurance form collects PHI — full name, date of birth, insurance provider and
> member/policy ID. `LEAD_WEBHOOK_URL` **must** point at an endpoint covered by a Business Associate
> Agreement. A plain inbox, a Zapier/Make webhook, or a marketing-automation endpoint is not
> sufficient. Field *values* are never written to application logs.

## Analytics & consent

Google Analytics does **not** load until the visitor opts in via the consent banner
(`components/Analytics.tsx`). This is deliberate: URLs like `/treatment/heroin-addiction` combined
with an IP address are the kind of disclosure HHS OCR's tracking-technology guidance warns about,
and CCPA applies to the business.

Once consent is granted, a single delegated click listener records `phone_call_click` and
`email_click` for every `tel:`/`mailto:` link on the site (including ones inside blog markdown), and
each accepted form submission fires `generate_lead`. Phone calls are the primary conversion, so this
is what makes marketing spend measurable.

## Google reviews (homepage testimonials)

The homepage has a **"They trusted us. So can you."** section that pulls **live** Google
reviews from the business's Google Business Profile via the Google Places API (New). It
refreshes automatically about once per day.

To turn it on, set a server-side environment variable (see `.env.example`):

```bash
# .env.local  (also add these in Vercel → Settings → Environment Variables)
GOOGLE_PLACES_API_KEY=your_key_here   # Google Cloud key with "Places API (New)" enabled
GOOGLE_PLACE_ID=                       # optional — auto-resolved from name+address if blank
```

Get a key at [Google Cloud Console](https://console.cloud.google.com/) (enable **Places API (New)**).
Until the key is set, the section simply doesn't render — no empty placeholder, no build error.
Only reviews of 4★+ with text are shown. Logic lives in `lib/reviews.ts`; the UI is
`components/Reviews.tsx`.

> The section deliberately emits **no** `Review` / `AggregateRating` structured data. These reviews
> are collected on Google, not on this site, and Google's review-snippet guidelines disallow marking
> up third-party-sourced ratings as your own. On a rehab site a structured-data manual action would
> cost far more than the star snippet is worth.

## Brand

Palette carried over from the original site: cream `#F7F3EF`, soft pink `#F8E7EF`, charcoal
`#23272F`. Fonts: **Poppins** (headings) + **Inter** (body).

The rose ramp is contrast-tuned so every real usage clears WCAG AA (4.5:1) — see the comment at the
top of `app/globals.css`:

| Token | Value | Role | Contrast |
| --- | --- | --- | --- |
| `--color-rose` | `#bd4b79` | **background** behind white text (buttons, badges) | white on it — 4.72:1 |
| `--color-rose-dark` | `#a8446d` | **text** on light surfaces (links, eyebrows, errors) | 5.66:1 on white, 5.12:1 on cream, 4.76:1 on rose-soft |
| `--color-rose-soft` | `#f8e7ef` | text/icons on the dark ink surfaces | 12.6:1 on ink |

Because `--color-rose` is dark enough to carry white text, it is **not** legible as text on the ink
panels — use `rose-soft` there instead.

## Notes

- Mobile-first: verified 0px horizontal overflow at 375px, 390px, and 1440px widths.
- The header is fixed with a slim desktop utility bar; on mobile it collapses to a logo, a
  tap-to-call button, and a hamburger menu, plus a persistent bottom Call / Verify bar.
- Deeper sub-pages from the old site (individual substance/therapy pages, area pages, blog) can be
  added as `app/...` routes; the navigation and data structures in `lib/site.ts` are already set up
  to accommodate them.
