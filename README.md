# Valls Solutions

Bilingual website for Wyoming LLC formation and administrative support for U.S. and international founders. The site uses Next.js App Router, React, TypeScript and MDX, then exports static files for GitHub Pages.

## Local development

Requirements: Node.js 20.9 or newer and npm.

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

- `/` — English default homepage; `/es/` — Spanish homepage; `/en/` remains as a non-indexable compatibility alias for the English homepage
- `/llc-formation/` and `/en/llc-formation/` — formation package details
- `/pricing/` and `/en/pricing/` — initial price, renewal and state-fee explanation
- `/contacto/` and `/en/contact/` — email contact, with no public document or sensitive-data collection
- `/blog/` and `/en/blog/` — localized article archives
- `/blog/[slug]/` and `/en/blog/[slug]/` — statically generated localized MDX articles
- `/sitemap.xml` and `/robots.txt` — generated crawl files

English is the default homepage language. Spanish is available at `/es/`; the language selector links to each page's translation where one exists. The legacy `/en/` homepage URL canonicalizes to `/` and is excluded from indexing. Each localized page has its own title, description, canonical URL and `hreflang` alternatives.

## Offer facts — review before changing public copy

- $699 one time for initial Wyoming formation, including the state formation fee, EIN application handling, first-year Registered Agent, first-year Wyoming mailing address website, business email and banking application guidance. The initial package does not include an Annual Report.
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

The workflow in `.github/workflows/nextjs.yml` builds the static export and publishes it when changes reach `main` or a workflow is started manually. After merging this migration, open **Repository Settings → Pages** and set the publishing source to **GitHub Actions**. The custom-domain `CNAME` file is copied from `public/CNAME` into the export.

The workflow does not change repository settings. If the Pages source is currently set to branch publishing, switch it after merging before expecting the new site to publish.
