import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [listingTypes, catalog, styles] = await Promise.all([
  readFile(new URL("../src/content/invasion-listings.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/components/InvasionCatalog.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/conversion-polish.css", import.meta.url), "utf8"),
]);

test("account images stay compact until activated and open an accessible bilingual dialog", () => {
  assert.match(listingTypes, /image\?: string;/);
  assert.match(catalog, /aria-haspopup="dialog"/);
  assert.match(catalog, /aria-expanded=\{dialogOpen\}/);
  assert.match(catalog, /aria-controls=\{dialogId\}/);
  assert.match(catalog, /View larger account image/);
  assert.match(catalog, /Ver imagen ampliada de la cuenta/);
  assert.doesNotMatch(catalog, /previewOpen|is-previewing|onFocus=|onBlur=/);
  assert.match(catalog, /onClick=/);
  assert.match(catalog, /dialog\.showModal\(\)/);
  assert.match(catalog, /className="invasion-image-dialog"/);
  assert.match(catalog, /onClose=\{\(\) => setDialogOpen\(false\)\}/);
  assert.match(catalog, /if \(event\.target === event\.currentTarget\) closeDialog\(\)/);
  assert.match(catalog, /Close image/);
  assert.match(catalog, /Cerrar imagen/);
  assert.match(catalog, /Screenshot of the \$\{place\} account/);
  assert.match(catalog, /Captura de la cuenta \$\{place\}/);
  assert.match(styles, /\.invasion-image-preview-control[\s\S]*?min-height:\s*44px/);
  assert.match(styles, /\.invasion-image-preview-control\s*\{[^}]*width:\s*44px[^}]*height:\s*44px/);
  assert.match(styles, /\.invasion-image-card-preview\s*\{[^}]*object-fit:\s*contain/);
  assert.doesNotMatch(styles, /\.invasion-image-preview-control:hover\s*\{[^}]*position:\s*absolute|\.is-previewing|:has\(\.invasion-image-preview-control:hover\)/);
  assert.match(styles, /\.invasion-image-dialog-close\s*\{[^}]*width:\s*44px[^}]*min-height:\s*44px/);
});
