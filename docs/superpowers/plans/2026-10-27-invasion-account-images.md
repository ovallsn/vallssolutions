# Invasion Account Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the owner add an optional public screenshot per Invasion listing in Google Sheets, sync it to the website by stable `Website ID`, and show an accessible preview.

**Architecture:** Apps Script reads an in-cell `CellImage`, fetches its short-lived Google content URL during the sync, validates and uploads changed raster blobs in one Git tree commit, then dispatches the small sanitized inventory with deterministic image paths. GitHub Actions validates the path, prunes unreferenced images, runs the existing static build/deploy, and the catalogue provides mouse, keyboard, and touch preview controls.

**Tech Stack:** Existing Next.js 16 static export, React 19, TypeScript, Apps Script V8, GitHub REST Git Database API, Node test runner, CSS; no new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-27-invasion-account-images-design.md`

## Global Constraints

- Keep image data optional and keyed by `Website ID`; never expose private sheet names or account login information.
- Accept only JPEG, PNG, or WebP with matching file signatures; reject files over 1 MB and reject a sync whose uploaded image total exceeds 20 MB.
- Store public files at `public/assets/invasion-accounts/<Website-ID>.<jpg|png|webp>` and expose only that deterministic path in inventory JSON.
- Keep the existing GitHub Pages, repository-dispatch, Next.js, and Apps Script architecture; add no dependencies.
- Images are public; sheet guidance must tell the owner to use cropped screenshots without credentials or private player data.
- Preview must work on pointer hover, keyboard focus, click/tap and Escape; listings without an image keep their current behavior.
- Preserve unrelated existing work and use the repository's documented checks before publishing to `main`.

## Review Focus

- Empty, removed, or replaced image cells: listing has no stale preview and orphaned image files are removed from the deployed build.
- Invalid image MIME/signature, oversized image, or image fetch failure: sync stops before dispatch and reports a useful error.
- Wrong or duplicate Website IDs and mismatched image paths: validation rejects them rather than attaching an image to another listing.
- GitHub API permission failure or branch update conflict: sync does not claim success or dispatch an incomplete image mapping.
- Missing image, image load failure, keyboard navigation, reduced viewport, or touch input: catalogue remains understandable and usable.

---

### Task 1: Validate optional listing image paths and remove orphan files

**Files:**
- Modify: `scripts/normalize-invasion-inventory.mjs`
- Create: `scripts/prune-invasion-images.mjs`
- Modify: `package.json`
- Test: `tests/invasion-sync.test.mjs`

**Interfaces:**
- `normalizeInventoryPayload(payload)` preserves optional `image` only when it exactly matches `/assets/invasion-accounts/<same Website ID>.(jpg|png|webp)`.
- `pruneUnreferencedInvasionImages(records, assetsDirectory)` removes files in the managed directory not referenced by the validated records.

- [x] **Step 1: Write failing normalizer and cleanup tests** — assert valid matching path survives; wrong ID, traversal, unsupported extension, and malformed path throw; cleanup deletes stale files while keeping only referenced image files.
- [x] **Step 2: Run `node --experimental-strip-types --test tests/invasion-sync.test.mjs` and verify those assertions fail for the missing image behavior.**
- [x] **Step 3: Implement optional image validation and the small pruning CLI; add `npm run prune:invasion-images` that reads the normalized inventory and prunes `public/assets/invasion-accounts`.**
- [x] **Step 4: Re-run the targeted test and verify valid files remain, stale files disappear, and the existing no-image cases pass.**

### Task 2: Extend the sheet sync to publish images safely

**Files:**
- Modify: `integrations/invasion-sheet/Code.gs`
- Test: `tests/invasion-sync.test.mjs`

**Interfaces:**
- `extractInventorySnapshot(values, displayValues)` returns `{ payload, imageCells }`, where `payload` contains only public statistics and `imageCells` maps each validated `Website ID` to its `CellImage` value.
- `syncInventoryImages(imageCells, token)` returns a map from `Website ID` to its stable `/assets/invasion-accounts/<id>.<ext>` path.
- `postInventorySnapshot(payload, token)` continues to send only the sanitized metadata payload after asset sync succeeds.

- [x] **Step 1: Write failing Apps Script VM tests** — use mock `CellImage` values to verify image-to-ID association independent of row order; verify empty cells produce no image; verify edits in the new column I schedule sync; verify unsupported signatures, MIME mismatches, >1 MB files, >20 MB aggregate, HTTP errors, and GitHub ref-update failures abort without dispatch.
- [x] **Step 2: Run `node --experimental-strip-types --test tests/invasion-sync.test.mjs` and confirm failures identify the missing snapshot/upload behavior.**
- [x] **Step 3: Add optional `Image` header parsing, detect in-cell images by their `getContentUrl()` interface, fetch each fresh URL immediately, validate raster signatures and size, create blobs, compare blob SHAs to the current tree, and batch changed blobs into a single Git tree commit on `main`.**
- [x] **Step 4: Attach only validated stable paths to matching public records, then dispatch; fail closed on any upload, permission, or ref-update error.**
- [x] **Step 5: Run the targeted tests and verify successful uploads make exactly one tree/commit/ref update only when images changed, then dispatch a payload with no `CellImage`, temporary URL, or private name.**

### Task 3: Integrate cleanup and document the spreadsheet workflow

**Files:**
- Modify: `.github/workflows/nextjs.yml`
- Modify: `integrations/invasion-sheet/README.md`
- Modify: `tests/invasion-sync.test.mjs`

**Interfaces:**
- Asset-only `push` events under `public/assets/invasion-accounts/**` are ignored by Pages; `repository_dispatch` performs the validated build after the asset commit.
- Build and commit jobs both apply the same normalized inventory and prune orphaned image files; commit job stages the inventory plus the managed image directory.

- [x] **Step 1: Extend workflow tests** — assert path-only asset pushes are ignored, pruning occurs before build, and sanitized image assets/removals are staged with the inventory.
- [x] **Step 2: Run the targeted test and verify the workflow assertions fail.**
- [x] **Step 3: Update the workflow and README** — add the `Image` column after `Zone Pass` in each platform section, explain inserting an image in the cell, recommend compressed public-safe screenshots, document image limits and that edits in columns C–I schedule sync, and explain that the bound Apps Script must be updated with repository `Code.gs`; existing token permission remains repository-only Contents read/write.
- [x] **Step 4: Run targeted tests and verify existing inventory-only sync behavior still works.**

### Task 4: Add the bilingual accessible image preview to listing cards

**Files:**
- Modify: `src/content/invasion-listings.ts`
- Modify: `src/components/InvasionCatalog.tsx`
- Modify: `src/app/conversion-polish.css`
- Test: `tests/invasion-sync.test.mjs` or a focused new `tests/invasion-image-preview.test.mjs`

**Interfaces:**
- `InvasionListing.image?: string` holds the validated public image path.
- A preview control in an image-backed listing opens/closes a compact image preview, exposes an `aria-expanded` state and localized label, closes on Escape, and supports focus/click/touch without removing the existing card actions.

- [x] **Step 1: Write a focused test for optional `image` model usage and preview control accessibility hooks; verify it fails before the component change.**
- [x] **Step 2: Implement a compact disclosure adjacent to the listing title using the existing visual tokens and native `<img>` sizing; open on pointer hover/focus and click, close on pointer leave/Escape, and localize accessible text in English and Spanish.**
- [x] **Step 3: Run typecheck and tests; inspect the live local page at desktop, tablet, and mobile with image preview closed/open, including keyboard focus and touch click. Correct layout or overflow issues before continuing.**

### Task 5: Final verification and publish

**Files:**
- Review all modified files; preserve unrelated untracked documents.

- [x] Run `npm test`, `npm run typecheck`, `npm run build`, and `npm run audit:seo`.
- [x] Review English and Spanish catalogues at desktop, tablet, and mobile; verify image previews and no-image listing behavior.
- [ ] Commit the scoped changes, integrate remote `main` without overwriting unrelated work, push `main`, and verify the Pages workflow and `/invasion-accounts/` routes.
- [ ] Report that the live bound Apps Script project must be updated from `integrations/invasion-sheet/Code.gs` before sheet images can sync; do not claim the live spreadsheet workflow is updated unless confirmed.
