import assert from "node:assert/strict";
import { test } from "node:test";
import { BLOG_ARTICLES, findBlogArticle, listBlogArticles } from "../src/content/blog/catalog.ts";

test("each blog URL has one Spanish and one English article", () => {
  const urls = BLOG_ARTICLES.map(({ locale, slug }) => `${locale}/${slug}`);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(BLOG_ARTICLES.length >= 12);

  for (const article of BLOG_ARTICLES) {
    const translated = findBlogArticle(article.locale === "es" ? "en" : "es", article.translatedSlug);
    assert.ok(translated, `Missing translation for ${article.locale}/${article.slug}`);
    assert.equal(translated.translatedSlug, article.slug);
  }
});

test("blog archives return only the requested locale in editorial order", () => {
  const spanish = listBlogArticles("es");
  const english = listBlogArticles("en");
  assert.equal(spanish.length, english.length);
  assert.ok(spanish.length >= 6);
  assert.ok(spanish.every((article) => article.locale === "es"));
  assert.ok(english.every((article) => article.locale === "en"));
});

test("article lookup uses the localized slug", () => {
  assert.equal(findBlogArticle("es", "llc-wyoming")?.locale, "es");
  assert.equal(findBlogArticle("en", "wyoming-llc")?.locale, "en");
  assert.equal(findBlogArticle("es", "missing"), undefined);
});
