# Invasion inventory sync design

## Intent

Let edits to the owner's Google Sheet update the public Invasion account catalogue without matching by row position or private account name. The stable `Website ID` is the sole record key.

## Goals

- Batch relevant sheet edits and send a complete inventory snapshot to the `vallssolutions` repository.
- Send only `Website ID`, platform, VIP, total power, diamonds, resources, and Zone Pass counts.
- Reject malformed, duplicate, mismatched, or out-of-range records before changing published data.
- Save the normalized public inventory in the repository so later website builds retain it.
- Deploy the static English and Spanish catalogue through the existing GitHub Pages workflow.
- Store the GitHub token only in Apps Script Script Properties; never commit or log it.

## Non-goals

- Publishing account nicknames, credentials, prices, or other sheet columns.
- Collecting sensitive customer data or adding a database/API to the public site.
- Automating sale, availability, checkout, or account transfers.

## Approach

Use a spreadsheet installable edit trigger with a short debounce. The standalone Apps Script reads the full sheet, maps account rows by `Website ID`, converts supported number formats, and posts a whitelisted snapshot using GitHub's `repository_dispatch` API. The GitHub Pages workflow validates and normalizes the payload into a one-day artifact. The read-only build job applies it and runs existing checks; only after those pass does a separate write-only job commit the sanitized inventory JSON. The workflow deploys the already-validated build. The public site imports this JSON at build time.

This fits the existing static-export architecture and keeps the sheet private fields out of website artifacts. The owner must create a fine-grained token limited to this repository with Contents write permission, store it in the Apps Script project's Script Properties, and authorize the installable trigger. No token is needed in Git or GitHub Actions secrets.

## Data contract

Each snapshot record has an ID matching `INV-(GOO|TAP|FB)-NNN`, a platform consistent with that prefix, an integer VIP level, and optional non-negative safe integers for `power`, `diamonds`, `resources`, and `zonePasses`. Unknown keys are discarded. Duplicate IDs and malformed values reject the whole snapshot, leaving the currently published inventory intact.

## Security and failure behavior

- The Apps Script sends no `Name` column and logs only status/error categories, never the token or sheet contents.
- GitHub validates again before writing.
- Failed syncs leave the previous public JSON and published site unchanged; Apps Script execution errors can be inspected in Apps Script executions.
- Website IDs must remain attached to their rows and must not be reused for a different account.
- Future columns or account fields are not published until explicitly added to the allowlist and UI.
