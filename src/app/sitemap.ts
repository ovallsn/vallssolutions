import type { MetadataRoute } from "next";
import { BLOG_ARTICLES } from "@/content/blog/catalog";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const localizedPages = [
  { es: "/", en: "/en/", priority: 1 },
  { es: "/llc-formation/", en: "/en/llc-formation/", priority: 0.9 },
  { es: "/pricing/", en: "/en/pricing/", priority: 0.8 },
  { es: "/contacto/", en: "/en/contact/", priority: 0.6 },
  { es: "/blog/", en: "/en/blog/", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = localizedPages.flatMap(({ es, en, priority }) => [
    {
      url: absoluteUrl(es),
      changeFrequency: "monthly",
      priority,
      alternates: { languages: { es: absoluteUrl(es), en: absoluteUrl(en) } },
    },
    {
      url: absoluteUrl(en),
      changeFrequency: "monthly",
      priority,
      alternates: { languages: { es: absoluteUrl(es), en: absoluteUrl(en) } },
    },
  ]);

  const articles: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => {
    const ownPath = article.locale === "es"
      ? `/blog/${article.slug}/`
      : `/en/blog/${article.slug}/`;
    const translatedPath = article.locale === "es"
      ? `/en/blog/${article.translatedSlug}/`
      : `/blog/${article.translatedSlug}/`;
    const esPath = article.locale === "es" ? ownPath : translatedPath;
    const enPath = article.locale === "en" ? ownPath : translatedPath;

    return {
      url: absoluteUrl(ownPath),
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: { languages: { es: absoluteUrl(esPath), en: absoluteUrl(enPath) } },
    };
  });

  return [...pages, ...articles];
}
