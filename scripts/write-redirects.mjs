import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { legacyRoutes } from "./legacy-routes.mjs";

const root = path.resolve("out");
const origin = "https://vallssolutions.com";
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const canonicalPaths = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
const outputPath = (route) => path.join(root, route, route.endsWith("/") ? "index.html" : "");
const files = new Set();

for (const [from, to] of legacyRoutes()) {
  assert.ok(canonicalPaths.has(to), `Redirect target is not canonical: ${from} → ${to}`);
  assert.ok(!canonicalPaths.has(from), `Refusing to overwrite a canonical page: ${from}`);
  const file = outputPath(from);
  if (files.has(file)) continue;
  files.add(file);
  const english = !to.startsWith("/es/");
  const title = english ? "This page has moved" : "Esta página ha cambiado de dirección";
  const html = `<!doctype html>
<html lang="${english ? "en" : "es"}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Valls Solutions</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${origin}${to}">
<meta http-equiv="refresh" content="0;url=${to}">
<script>window.location.replace(${JSON.stringify(to)} + window.location.search + window.location.hash);</script>
</head><body><p>${title}. <a href="${to}">${english ? "Continue to Valls Solutions" : "Continuar a Valls Solutions"}</a></p></body></html>`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
console.log(`Exported ${files.size} legacy redirect files to canonical, current pages.`);
