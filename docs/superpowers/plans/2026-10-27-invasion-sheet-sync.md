# Google Sheets Invasion Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the public Invasion catalogue from the Google Sheet using stable Website IDs, without exposing account names.

**Architecture:** A debounced Google Apps Script edit trigger sends a whitelisted full snapshot to GitHub `repository_dispatch`. The existing static Pages workflow validates the snapshot, stores its sanitized JSON in the repository, runs the current checks, and deploys that same build.

**Tech Stack:** Next.js 16 static export, TypeScript, Node.js 24 scripts/tests, Google Apps Script, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-10-27-invasion-sheet-sync-design.md`

## Global Constraints

- Never send account names or other non-whitelisted columns to GitHub.
- Match records only by stable Website ID, never by row order or name.
- Reject the whole update on malformed or duplicate records and preserve current site data.
- Store the GitHub token only in Apps Script Script Properties.
- Preserve the existing Next.js static export and bilingual routes.

## Review Focus

- Locale-formatted magnitudes such as `554,54B` and `2.47M` must parse to safe numeric values.
- Unknown/duplicate IDs, platform-prefix mismatches, malformed values, and empty snapshots must fail closed.
- The sheet's internal Name column must never appear in the dispatch or committed inventory.
- Optional Power values must render as total power; blank power remains “Ask / Consultar”.
- Repeated edits must coalesce into one trigger and an HTTP error must not be reported as success.

---

### Task 1: Apps Script extraction and webhook payload validation

**Files:**
- Create: `integrations/invasion-sheet/Code.gs`
- Create: `scripts/normalize-invasion-inventory.mjs`
- Test: `tests/invasion-sync.test.mjs`
- Modify: `package.json`

**Interfaces:**
- `extractInventoryFromRows(values, displayValues)` returns `{version: 1, source: "google-sheets", records}` with only public fields.
- `normalizeInventoryPayload(payload)` returns a deterministic array of validated `InvasionListing` records or throws without writing.

- [x] Write tests for numeric shorthand parsing, row-to-platform extraction, name omission, duplicate IDs, invalid prefixes, malformed/empty snapshots, and unknown-key removal.
- [x] Run the focused test and confirm it fails because the sync functions do not exist.
- [x] Implement the standalone Apps Script extraction/debounce/dispatch functions and the pure Node payload validator.
- [x] Run the focused test and confirm the expected behaviors pass.

### Task 2: Public inventory data and power field

**Files:**
- Create: `src/content/invasion-listings-data.json`
- Modify: `src/content/invasion-listings.ts`
- Modify: `src/components/InvasionCatalog.tsx`
- Test: `tests/invasion-sync.test.mjs`

**Interfaces:**
- `InvasionListing` adds optional `power?: number`.
- The page reads sanitized JSON as the catalog source; blank optional statistics remain absent.

- [x] Add a test that accepts a valid `power` value and confirms it remains numeric while a supplied private name is discarded.
- [x] Run the focused test and confirm it fails before implementation.
- [x] Move the current public catalogue values to JSON, add the optional power field, and render it in the existing Total power row.
- [x] Run the focused test and confirm it passes.

### Task 3: GitHub deployment and owner setup instructions

**Files:**
- Modify: `.github/workflows/nextjs.yml`
- Create: `integrations/invasion-sheet/README.md`
- Test: `tests/invasion-sync.test.mjs`

- [x] Add a workflow-configuration test requiring the repository dispatch event, Contents write permission, validation-before-write, and the existing Pages checks/deploy steps.
- [x] Run the focused test and confirm it fails before workflow integration.
- [x] Add the dispatch event path that validates and commits only the sanitized inventory JSON, then deploys the same validated workspace.
- [x] Document the one-time Apps Script install, exact spreadsheet tab/header expectations, minimal fine-grained PAT permissions, Script Properties, trigger authorization, update timing, and how to inspect failures.
- [x] Run the focused test and confirm it passes.

### Task 4: Full verification and publish

**Files:** All scoped files above.

- [x] Run `npm test`, `npm run typecheck`, `npm run build`, and `npm run audit:seo`.
- [x] Verify English/Spanish catalogue output, `power` rendering code, and that built HTML contains no sheet account nicknames.
- [ ] Commit scoped changes to `main`, push without force, and verify the GitHub Pages workflow.
- [ ] Report that syncing activates after the owner adds the fine-grained token in Apps Script Script Properties and installs/authorizes the trigger; never request the token in chat.
