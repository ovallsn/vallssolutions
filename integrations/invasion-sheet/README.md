# Automatic Invasion inventory updates

This integration reads the selected inventory tab in Google Sheets, maps rows by their stable `Website ID`, and publishes only the approved public statistics to the Valls Solutions catalogue. The `Name` column is deliberately omitted before anything is sent to GitHub.

## One-time setup

The website repository must contain the workflow change from this integration on `main` before installing the trigger.

1. In GitHub, create a **fine-grained personal access token** scoped only to `ovallsn/vallssolutions`. Grant **Contents: Read and write**; no other repository permission is needed. Set an expiry and keep the token private.
2. Open the inventory spreadsheet, then select **Extensions → Apps Script**. Add the contents of [`Code.gs`](./Code.gs) to the project and save it.
3. In Apps Script, open **Project Settings → Script Properties** and add:

   | Property | Value |
   | --- | --- |
   | `INVASION_GITHUB_TOKEN` | The fine-grained token from step 1 |

   Do not put the token in the sheet, website, repository, or a chat message.
4. Return to the spreadsheet and select the tab that contains the inventory. In Apps Script, choose `installInventorySync` and run it once. Review the Google authorization prompt and authorize access to the spreadsheet and external GitHub request.
5. Confirm the installable `handleInventoryEdit` trigger appears in Apps Script's **Triggers** page.

The setup stores the spreadsheet and tab IDs as Script Properties. If you replace the spreadsheet or use another tab, select that tab and run `installInventorySync` again.

## Sheet format

The selected tab uses three sections, each preceded by one of these labels in column A:

- `Gifters Google`
- `Gifters Tap4fun`
- `Gifters Facebook`

Each section must have a header row containing `Name`, `Website ID`, `Power`, `Commander Level`, `HQ Level`, `VIP Level`, `Diamonds`, `Resources`, `Zone Pass`, and `Image`, in that order. Keep the labels and each account's `Website ID` unchanged when editing its stats. The `Image` column is optional; leave its cell empty if you do not want a public screenshot for that listing.

To add a screenshot, use **Insert → Image → Insert image in cell** in the `Image` column. Do not use **Image over cells**. Use a cropped JPEG, PNG, or WebP image no larger than 1 MB per account; a complete sync may upload at most 20 MB of images. Avoid screenshots containing passwords, email addresses, recovery details, personal identifiers, or other private player information. Published images are publicly accessible on the website. The image stays associated with its account by the stable `Website ID`, even if rows move.

Existing IDs are `INV-GOO-001` through `INV-GOO-004`, `INV-TAP-001` through `INV-TAP-014`, and `INV-FB-001` through `INV-FB-004`. Assign a new unique ID with the matching prefix when adding a listing; do not reuse IDs for a different account. A row without a Website ID is not published. Removing an ID removes that account from the next full inventory snapshot.

Numbers can be entered as full numbers or shorthand, for example `2.47M`, `852K`, or `554,54B`. Blank optional stats remain blank on the website. `VIP Level` is required for each published row. Power and Commander Level are numeric fields; HQ Level accepts a short text value such as `VI` or `24`. These optional values are displayed in the same order as the sheet when supplied.

## What happens after an edit

Edits to columns C–K in the configured tab schedule a full snapshot about one minute later. Further edits during that minute reset the timer. The snapshot is validated before it can change public data. Invalid IDs, duplicates, malformed numbers or HQ levels, unsupported images, oversized files, or missing VIP levels stop the update; the previously published catalogue stays in place.

For an accepted snapshot, Apps Script fetches each temporary Google image URL immediately, checks its file signature and MIME type, and uploads changed image files to `public/assets/invasion-accounts/<Website-ID>.<extension>` in one Git commit. It then dispatches only the public statistics and stable image paths; temporary Google URLs and account names are never sent. GitHub Actions validates and sanitizes the data, removes image files no longer used by a listing, runs the existing checks and static build, and deploys that build to GitHub Pages. Asset-only commits do not start an extra Pages build; the validated inventory dispatch builds and deploys the complete update. The write permission is isolated to the small commit job; dependency installation and build use read-only repository access. Look in the repository's **Actions** tab for the `Deploy Next.js site to GitHub Pages` run if an update does not appear. A successful update is normally visible after that workflow finishes.

When upgrading an already configured spreadsheet integration, replace the contents of the bound Apps Script's `Code.gs` with the current [`Code.gs`](./Code.gs) from this repository and save it. Keep the existing Script Properties and fine-grained GitHub token. Reload the spreadsheet to show the **Valls Solutions → Sincronizar inventario ahora** menu. A manual sync reads the currently selected tab and shows the number of Google, Tap4fun and Facebook accounts it found; scheduled edits continue to read the tab selected during setup. Use the menu for an immediate sync, or wait about one minute after editing the sheet. The existing installable edit trigger can remain in place if it still points to `handleInventoryEdit` for the configured sheet.

Apps Script edit triggers respond to direct spreadsheet edits. Changes made only by a formula recalculation or an external API do not count as a user edit event; edit a cell in the sheet to schedule a snapshot after such changes.

## Privacy and access

Only these fields are accepted by the public data validator: `id`, `platform`, `vipLevel`, `power`, `commanderLevel`, `hqLevel`, `diamonds`, `resources`, `zonePasses`, and the optional validated public image path. Account names and any extra fields are discarded, including if they are accidentally added to a dispatch payload. The website's public build contains listing IDs, stats, and optional screenshots only, never the sheet's account names or temporary image URLs.

Anyone who can access the spreadsheet may still be able to view its `Name` column. Restrict spreadsheet sharing to the people who need the private inventory; Apps Script runs with the authorizing owner's access.
