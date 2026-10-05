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
```

## Public routes

- `/` and `/en/` — Spanish and English home pages
- `/llc-formation/` and `/en/llc-formation/` — formation package details
- `/pricing/` and `/en/pricing/` — initial price, renewal and state-fee explanation
- `/contacto/` and `/en/contact/` — email contact, with no public document or sensitive-data collection
- `/blog/` and `/en/blog/` — localized article archives
- `/blog/[slug]/` and `/en/blog/[slug]/` — statically generated localized MDX articles
- `/sitemap.xml` and `/robots.txt` — generated crawl files

Spanish is the default language. The language selector links to each page's translation where one exists. Each localized page has its own title, description, canonical URL and `hreflang` alternatives.

## Offer facts — review before changing public copy

- $699 one time for initial Wyoming formation, including the state formation fee, EIN application handling, first-year Registered Agent, first-year Wyoming mailing address, first Annual Report and banking application guidance.
- $449/year from year two for Registered Agent renewal, mailing address and Annual Report service.
- Wyoming's Annual Report/License Tax is separate from the $449 service renewal, starts at $60 from year two and may vary with the LLC's Wyoming assets.
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
- Media provenance is kept in `docs/assets/media-sources.md`, outside the public export.
- Tax, state-formation, visa and compliance guides cite official sources and should be rechecked before substantive edits.

## GitHub Pages

The workflow in `.github/workflows/nextjs.yml` builds the static export and publishes it when changes reach `main` or a workflow is started manually. After merging this migration, open **Repository Settings → Pages** and set the publishing source to **GitHub Actions**. The custom-domain `CNAME` file is copied from `public/CNAME` into the export.

The workflow does not change repository settings. If the Pages source is currently set to branch publishing, switch it after merging before expecting the new site to publish.
