# Valls Solutions

Bilingual website for Wyoming LLC formation and administrative support for U.S. and international founders. The site uses Next.js App Router, React, TypeScript and MDX, then exports static files for GitHub Pages.

## Local development

Requirements: Node.js 24 or newer and npm (the export scripts use native TypeScript stripping).

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. Production output is generated in `out/`:

```bash
npm run typecheck
npm test
npm run build
npm run audit:seo
```

## Public routes

- `/` (English) and `/es/` (Spanish) — homepages
- `/llc-formation/` and `/es/crear-llc/` — formation package details
- `/pricing/` and `/es/precios/` — initial price and annual renewal
- `/about/` and `/es/nosotros/` — experience and service scope
- `/contact/` and `/es/contacto/` — email contact without document collection
- `/blog/` and `/es/blog/` — localized article archives
- `/blog/[slug]/` and `/es/blog/[slug]/` — localized MDX guides
- `/sitemap.xml` and `/robots.txt` — generated crawl files

English is the default language; all Spanish content lives under `/es/`. The language selector links to the equivalent page or article. Every canonical page has unique metadata and reciprocal `hreflang`. `src/lib/routes.ts` holds the page paths.

After `next build`, the postbuild script emits compatibility redirects for historical `/en/` pages, old Spanish article paths and `index.html` bookmarks. They point directly to current canonical pages and remain outside the sitemap. GitHub Pages does not support custom HTTP 301/308 rules, so these use immediate HTML refresh plus `location.replace`, a canonical link and a manual fallback link. Unrecognized URLs remain real 404s; do not redirect unrelated URLs to the homepage.

## Future customer portal

The marketing site is a static export and does not provide customer authentication or store LLC records. Header and footer portal links are rendered only when `NEXT_PUBLIC_CLIENT_PORTAL_URL` is set during the build. Configure that public URL after the separate client dashboard is ready; authentication, LLC documents and customer data belong in that secure application.

## Offer facts — review before changing public copy

- $699 one time for initial Wyoming formation, including the state formation fee, EIN application handling, first-year Registered Agent, first-year Wyoming mailing address, website, business email and banking application guidance. The initial package does not include an Annual Report.
- $449/year from year two includes Registered Agent, mailing address, Annual Report filing and state tax, plus website hosting and maintenance.
- If renewal is declined, the website goes offline and its files are handed to the customer. Website/email scope is agreed before starting.
- Banking support is application guidance only. The customer submits the application and the financial provider makes its own decision.
- Do not claim that an Operating Agreement is included or that a Wyoming LLC guarantees tax savings, banking approval or visa eligibility.
- The site does not collect SSNs, ITINs, passport numbers, identity documents or residential addresses.

Confirm these details against the current provider terms before changing the offer.

## Content and media

- Page components and shared layouts: `src/components/` and `src/app/`
- Per-language blog metadata and routes: `src/content/blog/catalog.ts`
- Editorial source in Markdown/MDX: `src/content/blog/articles/`
- Shared styles: `src/app/globals.css` (ported from the former `assets/css/site.css`)
- Self-hosted hero video and poster: `public/assets/media/`
- Original English/Spanish social previews: `public/assets/media/social-*.png`; editable SVG sources are in `docs/assets/`.
- Media provenance is kept in `docs/assets/media-sources.md`, outside the public export.
- Tax, state-formation, visa and compliance guides cite official sources and should be rechecked before substantive edits.

## GitHub Pages

The owner has authorized publishing completed, checked changes directly to `main`. The workflow in `.github/workflows/nextjs.yml` checks types, runs tests, builds the static export, audits SEO and publishes when changes reach `main`. The custom-domain `CNAME` is copied from `public/CNAME` into the export. Pages is configured to publish with GitHub Actions.

Keep the current remote main history, never force-push, and verify both the workflow and public routes after deployment.
