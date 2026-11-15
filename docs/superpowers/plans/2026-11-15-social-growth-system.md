# Social Growth System Implementation Plan

> **For Codex:** Execute this plan after the owner approves it. Follow the task order and preserve unrelated workspace changes.

**Goal:** Prepare the VALLS Solutions website to feed an automated, bilingual social publishing pilot using its existing public LLC guides, with article-specific social cards and RSS endpoints.

**Architecture:** Keep the existing Next.js App Router and static export. Generate article cards from the current blog catalog during `prebuild` using the already installed `sharp` package; serve bilingual RSS documents through static GET route handlers; use a shared metadata helper for per-article social images. Metricool and Reddit account operations stay outside the code change because no social connector/account is connected and no ad-spend cap exists.

**Tech stack:** Next.js 16, React, TypeScript, MDX, static export, Node.js 24 type stripping, existing `sharp` package.

## Scope and constraints

- Publish and promote as VALLS Solutions through official company profiles only.
- Do not generate fake customer reviews, first-person claims, or automatic promotional comments in Reddit communities.
- Keep Reddit ads inactive until an ad account and spending cap are configured by the owner.
- Generate social copy only from published catalog titles, descriptions, and verified offer information already recorded in the README.
- Do not add dependencies or change the website architecture.
- Do not add or run the project's test suite for this task. Validate with the documented typecheck and production build, then inspect generated output directly.

## Tasks

### Task 1: Generate article-specific social cards during the static build

**Files:**
- Create `scripts/generate-blog-social-cards.ts`
- Update `package.json`
- Update `.gitignore`
- Update `docs/assets/media-sources.md`
- Reuse the existing brand sources under `docs/assets/` and tokens from `src/app/globals.css`

- Inspect existing social artwork, brand assets, and local fonts, then create one original 1200×630 card for each English and Spanish catalog article.
- Use each article's localized title and category, with restrained VALLS branding and readable title wrapping.
- Use the existing `sharp` installation to render PNGs into `public/assets/media/blog/<locale>/<slug>.png`.
- Make generation deterministic and limit cleanup to the generated blog-card directory so unrelated media is preserved.
- Add an npm `prebuild` script to generate the cards before `next build`; ignore generated PNGs so the static build creates them from source.

**Expected:** Running `node --experimental-strip-types scripts/generate-blog-social-cards.ts` exits successfully, emits one PNG for each catalog article, and each file is 1200×630.

### Task 2: Connect article metadata to the generated cards

**Files:**
- Create `src/lib/blog-social.ts`
- Update `src/lib/seo.ts`
- Update `src/app/(en)/blog/[slug]/page.tsx`
- Update `src/app/(es)/es/blog/[slug]/page.tsx`

- Add a typed helper that maps locale and slug to the card URL.
- Extend `PageSeo` with an optional social-image path. Use it for both Open Graph and Twitter metadata while retaining the current language-level fallback for every other page.
- Pass the article-specific card path from each localized article route.

**Expected:** `npm run typecheck` passes; build output later confirms article pages use the matching locale and slug card while other pages retain the current fallback.

### Task 3: Add static bilingual RSS feeds and discovery links

**Files:**
- Create `src/lib/blog-rss.ts`
- Create `src/app/(en)/blog/rss.xml/route.ts`
- Create `src/app/(es)/es/blog/rss.xml/route.ts`
- Update `src/lib/seo.ts`
- Update `src/app/(en)/blog/page.tsx`
- Update `src/app/(es)/es/blog/page.tsx`

- Build feed XML from the current published blog catalog only, with localized channel metadata, titles, summaries, canonical article URLs, publication dates if maintained by the catalog, and article-card image references.
- Escape all XML text and attributes, set the RSS content type, and mark both route handlers `force-static` for Next static export.
- If the catalog has no publication date field, omit item dates rather than inventing them.
- Add RSS alternate links to the corresponding blog archive metadata using `alternates.types`, as documented for the installed Next.js version.
- Add consistent campaign UTM parameters to feed item links so website analytics can identify traffic from the pilot and distinguish locale/article. Keep page canonical URLs and metadata free of tracking parameters; use Metricool's network analytics for per-profile performance rather than creating a separate feed for each channel.

**Expected:** `npm run build` emits `/blog/rss.xml` and `/es/blog/rss.xml` with localized catalog entries, canonical article links, and article-card references.

### Task 4: Document the connection and safe operating defaults

**Files:**
- Update `README.md`
- Create `docs/marketing/social-publishing-pilot.md`

- Document both feed URLs, the feed-based publishing setup, a starting cadence of up to two posts per week in total per connected official profile with English and Spanish alternating, the shared campaign UTMs plus Instagram bio tracking, and a 30-day review of reach and site/contact click metrics.
- Provide concise setup steps for Metricool Autolists and list the company profiles to connect only when they exist and are official.
- Document Reddit as paid, clearly identified VALLS advertising or authentic manual participation; prohibit automated promotional replies in community threads.
- State that direct publishing, profile eligibility, optional Instagram FAQ Flows, and Reddit ads depend on account access or a separate paid feature. Leave ad spend unset.
- State that the site measures traffic and contact clickouts, not confirmed leads or sales from its current email/WhatsApp handoff.

**Expected:** README and pilot guide list the exact feed URLs, setup sequence, cadence, tracking settings, safety boundaries, and account/budget dependencies without implying that external accounts are connected.

### Task 5: Validate the static output

- Run `npm run typecheck`.
- Run `npm run build` so `prebuild` generates cards and Next emits the static routes.
- Run the documented `npm run audit:seo` against the generated export.
- Inspect `out/blog/rss.xml` and `out/es/blog/rss.xml` for valid localized items and canonical links.
- Confirm every catalog article has a 1200×630 PNG in the generated output and that article HTML references the correct locale-specific card in Open Graph and Twitter metadata.
- Confirm non-article pages still use the existing language-level social image.
- Do not run `npm test` or add tests as part of this task.

**Expected:** Typecheck, build, and SEO audit exit successfully; manual output inspection confirms both feed files, all localized cards, article metadata, and non-article fallback metadata.

## Acceptance criteria

- Both RSS URLs are present in the static export and contain only the matching locale's published catalog entries.
- Each article has a unique 1200×630 social image, and its generated page metadata references that image.
- Other pages retain their current social-image fallback and canonical/hreflang behavior.
- README and the pilot guide explain how to connect official social accounts and Metricool, how to identify channel traffic, and where automation remains inactive pending account setup.
- No fake testimonials, undisclosed company identity, unsupported claims, Reddit auto-comments, ad spend, or unrelated workspace files are introduced.
- Typecheck and production build complete successfully; generated feeds and cards are manually inspected.

## Assumptions and external dependencies

- The current catalog is the source of truth for all public feed entries; legacy MDX files outside the catalog are excluded.
- English and Spanish are the only pilot languages and no specific country is prioritized during the first 30 days.
- Official VALLS company accounts may or may not exist. Only existing, authorized accounts can be connected.
- Metricool is not connected in this workspace. The website implementation can be completed now; automated publication and analytics activation require account connection by the owner.
- Reddit advertising requires the owner's ad account and an explicitly selected spend limit.
