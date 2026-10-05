# Valls Solutions Next.js Migration Plan

> **For agentic workers:** Implement this plan inline in the existing redesign branch. Preserve current content and public routes unless this plan explicitly changes them.

**Goal:** Migrate the bilingual LLC formation site to Next.js, React and TypeScript while preserving static GitHub Pages delivery, improving reusable page structure, SEO and async contact.

**Architecture:** Use Next.js App Router with separate Spanish and English root layouts, shared React components and static export. Keep service/pricing copy in typed content modules and editorial articles in localized MDX files. No server-side onboarding, payment or sensitive document collection.

**Tech Stack:** Next.js 16, React, TypeScript, MDX, existing CSS, GitHub Pages Actions deployment.

**Spec:** User's requirements in this conversation and repository README.

## Global Constraints

- Preserve the current bilingual routes, pricing ($699 initial; $449/year from year two), offer inclusions and banking limitations.
- Keep Wyoming Annual Report state fee clear as separate from the $449 service renewal; it starts at $60 and may vary by Wyoming assets.
- Do not advertise an Operating Agreement as included.
- Do not collect SSN, ITIN, passport, identity documents or residential addresses on the public site.
- Use email as the active contact path; add WhatsApp only after the user supplies its verified business number.
- Do not claim that a U.S. LLC grants or automatically improves visa eligibility. Explain country/category-specific criteria and cite official Thai sources.
- Omit the owner's personal name. Use no fabricated credentials, testimonials, partner marks or inflated client counts; the user-provided approximate count is capped at about 50.
- Preserve video fallback, reduced-motion and data-saving behavior; keep asset provenance internal and out of customer-facing pages.
- Generate static HTML for GitHub Pages with no runtime server requirement.

## Review Focus

- Every existing localized URL resolves to generated HTML with the matching `lang`, canonical and `hreflang`.
- Email/contact navigation never asks for identity documents or sensitive numbers.
- Static export contains all blog article routes, `robots.txt`, sitemap and the custom 404.
- Hero media remains usable when JavaScript, autoplay, video support or network loading fails.
- Visa and tax content does not imply guaranteed tax reduction, immigration outcomes or bank approval.

---

### Task 1: Create the static Next.js foundation

**Files:** Create `package.json`, lockfile, `next.config.mjs`, `tsconfig.json`, `src/app` root layouts, shared global stylesheet, GitHub Pages workflow. Move existing favicon and controlled media into `public/` while keeping provenance outside `public/`.

- [ ] Configure App Router and `output: 'export'` with trailing slashes.
- [ ] Preserve custom domain file and create the Actions artifact deployment workflow without changing remote repository settings.
- [ ] Confirm the production build creates static output for root and `/en/`.

### Task 2: Rebuild the main service experience from shared components

**Files:** `src/components/*`, localized home/pricing/formation routes, `src/content/site-copy.ts`, `src/config/contact.ts`.

- [ ] Build shared navigation, footer, hero media, service/process/pricing and contact components.
- [ ] Port Spanish and English homepage, LLC formation and pricing content into React/TypeScript.
- [ ] Remove the owner biography/name, keep the brand-first tone, and use only a truthful approximate 50-LLC proof point supplied by the owner.
- [ ] Keep email contact live. Leave WhatsApp disabled until a number is supplied.

### Task 3: Move bilingual blog to MDX and correct visa coverage

**Files:** `src/content/blog/*`, `src/app/(es)/blog/*`, `src/app/(en)/blog/*`, `src/components/BlogArticle.tsx`.

- [ ] Port all existing guides and article archives into localized MDX and typed metadata.
- [ ] Keep the accurate U.S.-visa guide and add a separate Thailand-specific guide because they serve different search intents; explain that a genuine business record may support some DTV workcation applications but an LLC does not ensure visa eligibility.
- [ ] Byline content to Valls Solutions rather than a named owner; use organization authorship in BlogPosting JSON-LD.
- [ ] Add honest internal links among Wyoming, LLC, tax, EIN, annual maintenance and visa guides.

### Task 4: Implement per-route SEO and crawl files

**Files:** `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, page metadata and JSON-LD.

- [ ] Add unique title/description, canonical, Open Graph, and `es`/`en` alternate URLs on each route.
- [ ] Generate a sitemap from the actual published routes and preserve permissive crawl directives.
- [ ] Use valid Organization and BlogPosting JSON-LD only for facts visible in the pages.

### Task 5: Verify user-facing behavior and migration output

- [ ] Run the project build and TypeScript checks.
- [ ] Inspect every route in the local browser at desktop/tablet/mobile widths, including nav, email CTA, pricing, language switch, blog links and 404.
- [ ] Check built HTML for route coverage, metadata, sitemap/robots and old-owner references; inspect video fallback and no public asset-source credit.
- [ ] Document GitHub Pages setting that must be switched to GitHub Actions after the PR is merged, if the repository is currently configured for branch publishing.
