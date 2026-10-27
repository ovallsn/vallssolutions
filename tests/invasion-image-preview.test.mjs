import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [listingTypes, catalog, styles] = await Promise.all([
  readFile(new URL("../src/content/invasion-listings.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/components/InvasionCatalog.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/conversion-polish.css", import.meta.url), "utf8"),
]);

test("account images expand across the listing and open an accessible bilingual dialog", () => {
  assert.match(listingTypes, /image\?: string;/);
  assert.match(catalog, /aria-haspopup="dialog"/);
  assert.match(catalog, /aria-expanded=\{dialogOpen\}/);
  assert.match(catalog, /aria-controls=\{dialogId\}/);
  assert.match(catalog, /Open account image/);
  assert.match(catalog, /Ampliar imagen de la cuenta/);
  assert.match(catalog, /onFocus=/);
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
  assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(styles, /\.invasion-image-preview-control:hover\s*\{[^}]*position:\s*absolute[^}]*inset:\s*0/);
  assert.match(styles, /\.invasion-image-preview-control\.is-previewing\s*\{[^}]*inset:\s*0/);
  assert.match(styles, /\.invasion-image-card-preview\s*\{[^}]*object-fit:\s*contain/);
  assert.match(styles, /\.invasion-image-dialog-close\s*\{[^}]*width:\s*44px[^}]*min-height:\s*44px/);
});
