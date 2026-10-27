import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [listingTypes, catalog, styles] = await Promise.all([
  readFile(new URL("../src/content/invasion-listings.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/components/InvasionCatalog.tsx", import.meta.url), "utf8"),
  readFile(new URL("../src/app/conversion-polish.css", import.meta.url), "utf8"),
]);

test("account listings support optional, bilingual, accessible image previews", () => {
  assert.match(listingTypes, /image\?: string;/);
  assert.match(catalog, /aria-expanded=\{previewOpen\}/);
  assert.match(catalog, /aria-controls=\{previewPanelId\}/);
  assert.match(catalog, /Preview account image/);
  assert.match(catalog, /Ver imagen de la cuenta/);
  assert.match(catalog, /onPointerEnter=/);
  assert.match(catalog, /onFocus=/);
  assert.match(catalog, /onClick=/);
  assert.match(catalog, /Escape/);
  assert.match(catalog, /focusOpenedPreview\.current/);
  assert.doesNotMatch(catalog, /cardRef\.current\?\.contains\(document\.activeElement\)/);
  assert.match(catalog, /<img[\s\S]*?alt=\{/);
  assert.match(styles, /\.invasion-image-preview-control[\s\S]*?min-height:\s*44px/);
  assert.match(styles, /\.invasion-image-preview-panel\s*\{[^}]*top:\s*94px/);
});
