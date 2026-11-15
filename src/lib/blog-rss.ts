import { BLOG_ARTICLES, type Locale } from "@/content/blog/catalog";
import { blogSocialImagePath } from "@/lib/blog-social";
import { absoluteUrl } from "@/lib/site";

const FEED_PATH: Record<Locale, string> = {
  en: "/blog/rss.xml",
  es: "/es/blog/rss.xml",
};

const BLOG_PATH: Record<Locale, string> = {
  en: "/blog/",
  es: "/es/blog/",
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function articlePath(locale: Locale, slug: string): string {
  return locale === "es" ? `/es/blog/${slug}/` : `/blog/${slug}/`;
}

export function buildBlogRss(locale: Locale): string {
  const isSpanish = locale === "es";
  const feedUrl = absoluteUrl(FEED_PATH[locale]);
  const blogUrl = absoluteUrl(BLOG_PATH[locale]);
  const articles = BLOG_ARTICLES.filter((article) => article.locale === locale);
  const channelTitle = isSpanish
    ? "Valls Solutions — Guías para crear una LLC"
    : "Valls Solutions — U.S. LLC guides";
  const channelDescription = isSpanish
    ? "Guías prácticas sobre la formación, los costes y las obligaciones de una LLC en Estados Unidos."
    : "Practical guides to U.S. LLC formation, costs, and ongoing responsibilities.";

  const items = articles
    .map((article) => {
      const canonicalLink = absoluteUrl(articlePath(locale, article.slug));
      const trackedLink = new URL(canonicalLink);
      trackedLink.searchParams.set("utm_source", "valls_social");
      trackedLink.searchParams.set("utm_medium", "organic_social");
      trackedLink.searchParams.set("utm_campaign", "llc_blog_pilot");
      trackedLink.searchParams.set(
        "utm_content",
        `${locale}-${article.slug}`,
      );
      const image = absoluteUrl(blogSocialImagePath(locale, article.slug));

      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(trackedLink.toString())}</link>
      <guid isPermaLink="true">${escapeXml(canonicalLink)}</guid>
      <description>${escapeXml(article.description)}</description>
      <category>${escapeXml(article.category)}</category>
      <media:content url="${escapeXml(image)}" type="image/png" medium="image" />
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>${isSpanish ? "es-ES" : "en-US"}</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}
