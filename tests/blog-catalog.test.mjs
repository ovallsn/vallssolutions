import assert from "node:assert/strict";
import { test } from "node:test";
import { BLOG_ARTICLES, BLOG_TOPICS, findBlogArticle, listBlogArticles } from "../src/content/blog/catalog.ts";

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

test("each article has a concise, unique localized SEO title", () => {
  for (const locale of ["en", "es"]) {
    const titles = listBlogArticles(locale).map((article) => article.seoTitle);

    assert.ok(titles.every((title) => typeof title === "string" && title.length <= 42), `${locale} titles fit a branded 60-character title`);
    assert.equal(new Set(titles.map((title) => title.toLowerCase())).size, titles.length, `${locale} SEO titles are unique`);
  }
});

test("Wyoming and Delaware state-choice guide has localized SEO slugs", () => {
  const english = findBlogArticle("en", "wyoming-vs-delaware-llc");
  const spanish = findBlogArticle("es", "wyoming-o-delaware-llc");

  assert.ok(english);
  assert.ok(spanish);
  assert.equal(english.translatedSlug, spanish.slug);
  assert.equal(spanish.translatedSlug, english.slug);
  assert.match(english.title, /Wyoming.*Delaware/i);
  assert.match(spanish.title, /Wyoming.*Delaware/i);
});

test("blog topics cover every non-featured article and separate taxes from visas", () => {
  const featuredSlugs = { en: "do-i-need-an-llc", es: "necesito-una-llc" };

  for (const locale of ["en", "es"]) {
    const categorized = BLOG_TOPICS.flatMap((topic) => topic.slugs[locale]);
    const expected = listBlogArticles(locale)
      .filter((article) => article.slug !== featuredSlugs[locale])
      .map((article) => article.slug);

    assert.equal(new Set(categorized).size, categorized.length, `${locale} has duplicate topic entries`);
    assert.deepEqual([...categorized].sort(), [...expected].sort(), `${locale} topic coverage`);
  }

  const taxes = BLOG_TOPICS.find((topic) => topic.id === "taxes");
  const visas = BLOG_TOPICS.find((topic) => topic.id === "visas");
  assert.ok(taxes?.slugs.en.includes("llc-taxes"));
  assert.ok(visas?.slugs.en.includes("business-owner-thailand-visa"));
  assert.ok(visas?.slugs.en.includes("llc-us-visa"));
});
