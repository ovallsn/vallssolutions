# Invasion account image previews

## Intent

Let the owner add one public-safe account screenshot inside each Google Sheets account row and show it from the matching listing on `/invasion-accounts/` and its Spanish equivalent.

## Goals

- Associate each image with the stable `Website ID`, never row order or private account name.
- Read an in-cell image during the existing Apps Script sync and copy its bytes into the website repository so the public page does not depend on Google's temporary image URL.
- Store the image at a deterministic public path based on the ID, and include only that path in the validated public inventory JSON.
- Show an image preview on hover and keyboard focus on desktop, with a labeled tap/click control on touch devices.
- Keep the feature optional: listings without an image remain unchanged.

## Non-goals and anti-goals

- No database, new hosting provider, purchase flow, or image gallery.
- Do not publish sheet names, login credentials, email addresses, or other private fields.
- Do not use an expiring Google-hosted `CellImage.getContentUrl()` as the website image URL.
- Do not require hover as the only way to open a preview.

## Approaches considered

1. **In-cell image copied to the site (chosen):** put an image in the new `Image` column, copy it to the repository during sync, and publish its stable path keyed by Website ID. This matches the owner's spreadsheet workflow and avoids external image dependencies.
2. **Public image URL in the sheet:** easier to wire, but relies on an external URL remaining public and available, and does not meet the preference to manage the image in the sheet.

## Implementation decisions

- Add an optional `Image` header after `Zone Pass` in each platform table; the value must be an image inserted **in the cell**, not an over-grid drawing.
- In Apps Script, inspect the cell's image value at sync time, fetch its current Google-hosted content URL immediately, validate JPEG/PNG/WebP signatures and a conservative size limit, then publish changed image blobs together in one Git tree commit at `public/assets/invasion-accounts/<Website-ID>.<extension>` through the existing repository-scoped GitHub token. Compare blob SHAs to avoid commits when images are unchanged.
- Include the deterministic image path in the repository dispatch snapshot. Validate the path against the record's ID and allow only supported raster extensions before writing inventory JSON.
- If the image cell is empty, omit the image path; if a previously published image is replaced or removed, ensure the current public build no longer references the old path. GitHub Actions removes unreferenced image files before building and commits these removals with the sanitized inventory. Git history may retain prior public assets, so only intentionally public screenshots should be uploaded.
- Render a compact, labeled preview control in each listing. Desktop hover/focus and click can reveal the image; touch uses click/tap. Escape closes an open preview. Supply useful alt text from the public listing ID, preserve aspect ratio, and keep empty listings unchanged.
- Update the sheet-sync instructions with the exact insert-in-cell workflow, supported image types/size, and public visibility warning.

## Constraints and open implementation choices

- Google-hosted cell-image URLs expire and are requester-tagged; the script must fetch them immediately during sync and permanently store the bytes in the public repository.
- Image content becomes publicly visible on the website and in the repository. The owner must use screenshots intended for public display and omit credentials or private player data.
- Existing static-export and GitHub Pages deployment stay in place. No new package is needed.
- Ignore asset-only pushes from the Pages workflow; the subsequent inventory `repository_dispatch` performs the validated build and deploy after image assets are committed.
- The Apps Script source in the repository must also be copied into the bound Apps Script project for the live spreadsheet sync to use the new behavior.

## Success criteria

- Tests prove that an in-cell image is associated with its stable Website ID, supported image paths are accepted, malformed paths and image payloads are rejected, and records without images remain valid.
- The public English and Spanish listings render previews with mouse, keyboard, and touch-accessible controls without horizontal overflow or a broken image state.
- Existing inventory fields and private-name exclusion continue to work.
