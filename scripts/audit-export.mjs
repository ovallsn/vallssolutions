import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { legacyRoutes } from "./legacy-routes.mjs";

// Audit the actual static output, including links that span localized routes.
const origin = "https://vallssolutions.com";
const root = path.resolve("out");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const titles = new Set();
const descriptions = new Set();
const pages = new Map();
const fileFor = (url) => path.join(root, url.pathname, url.pathname.endsWith("/") ? "index.html" : "");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), m[2]]));
const read = (url) => fs.readFileSync(fileFor(url), "utf8");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap entries");
assert.ok(urls.length > 0, "No sitemap URLs");

for (const value of urls) {
  const url = new URL(value);
  assert.equal(url.origin, origin);
  const html = read(url);
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0]));
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attributes(m[0]));
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = metas.find((m) => m.name === "description")?.content;
  assert.ok(title && !titles.has(title), `Missing/duplicate title: ${value}`);
  assert.ok(description && !descriptions.has(description), `Missing/duplicate description: ${value}`);
  titles.add(title);
  descriptions.add(description);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `H1 count: ${value}`);
  assert.equal(links.find((l) => l.rel === "canonical")?.href, value, `Canonical: ${value}`);
  assert.ok(!metas.some((m) => m.name === "robots" && m.content.includes("noindex")), `Noindex in sitemap: ${value}`);
  const languages = Object.fromEntries(links.filter((l) => l.hreflang).map((l) => [l.hreflang, l.href]));
  assert.ok(languages.es && languages.en, `Translations: ${value}`);
  assert.equal(languages["x-default"], languages.en, `Default language: ${value}`);
  assert.equal(html.match(/<html[^>]*lang="([^"]+)"/)?.[1], value === languages.en ? "en" : "es", `HTML language: ${value}`);
  const image = metas.find((m) => m.property === "og:image")?.content;
  assert.ok(image && fs.existsSync(fileFor(new URL(image))), `Missing social image: ${value}`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(match[1]);
    assert.equal(data["@context"], "https://schema.org");
    assert.ok(data["@type"], `JSON-LD type: ${value}`);
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) assert.ok("alt" in attributes(match[0]), `Image without alt: ${value}`);
  pages.set(value, { html, languages });
}

for (const [value, { html, languages }] of pages) {
  for (const language of ["es", "en"]) {
    assert.deepEqual(pages.get(languages[language])?.languages, languages, `Nonreciprocal hreflang: ${value}`);
  }
  for (const match of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attributes(match[0]).href;
    if (!href || /^(mailto:|tel:)/.test(href)) continue;
    const target = new URL(href.replaceAll("&amp;", "&"), value);
    if (target.origin !== origin) continue;
    assert.ok(fs.existsSync(fileFor(target)), `Broken internal link ${href} in ${value}`);
    assert.ok(pages.has(`${target.origin}${target.pathname}`), `Internal link uses a legacy/noncanonical page ${href} in ${value}`);
    if (target.hash) {
      const targetHtml = pages.get(`${target.origin}${target.pathname}`)?.html ?? read(target);
      assert.ok(targetHtml.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `Broken anchor ${href} in ${value}`);
    }
  }
}

assert.ok(!urls.includes(`${origin}/en/`), "Legacy alias must stay outside sitemap");
for (const [from, to] of legacyRoutes()) {
  const html = read(new URL(from, origin));
  assert.ok(!urls.includes(`${origin}${from}`), `Legacy URL in sitemap: ${from}`);
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.ok(html.includes(`rel="canonical" href="${origin}${to}"`), `Legacy canonical mismatch: ${from}`);
  assert.ok(html.includes(`http-equiv="refresh" content="0;url=${to}"`), `Missing immediate redirect: ${from}`);
  assert.ok(pages.has(`${origin}${to}`), `Redirect chain or broken target: ${from}`);
}
assert.ok(fs.existsSync(path.join(root, "404.html")), "Missing static 404");
assert.match(fs.readFileSync(path.join(root, "robots.txt"), "utf8"), /Sitemap: https:\/\/vallssolutions.com\/sitemap.xml/);
console.log(`SEO export audit passed: ${urls.length} canonical pages, unique metadata, reciprocal languages, H1s, JSON-LD syntax, social images and internal links.`);
