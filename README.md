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
```

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

## The contact form

Out of the box, the form (`components/ContactForm.tsx`) validates input and hands off to the
visitor's email client via `mailto:` — this works immediately with no backend or secrets.

To capture submissions server-side instead, replace the `handleSubmit` body with a POST to a form
service (e.g. **Formspree**, **Resend**, or a Next.js Route Handler / Server Action). The spot is
marked with a comment in the file.

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

## Brand

Palette carried over from the original site: rose/mauve `#D86C97`, cream `#F7F3EF`, soft pink
`#F8E7EF`, charcoal `#23272F`. Fonts: **Poppins** (headings) + **Inter** (body).

## Notes

- Mobile-first: verified 0px horizontal overflow at 375px, 390px, and 1440px widths.
- The header is fixed with a slim desktop utility bar; on mobile it collapses to a logo, a
  tap-to-call button, and a hamburger menu, plus a persistent bottom Call / Verify bar.
- Deeper sub-pages from the old site (individual substance/therapy pages, area pages, blog) can be
  added as `app/...` routes; the navigation and data structures in `lib/site.ts` are already set up
  to accommodate them.
