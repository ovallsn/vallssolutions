import type { MetadataRoute } from "next";
import { BLOG_ARTICLES } from "@/content/blog/catalog";
import { absoluteUrl } from "@/lib/site";
import { ROUTES, blogPath } from "@/lib/routes";

export const dynamic = "force-static";

const priorities = { home: 1, formation: 0.9, pricing: 0.8, about: 0.6, contact: 0.6, blog: 0.8 };
const localizedPages = Object.entries(ROUTES).map(([key, paths]) => ({
  ...paths, priority: priorities[key as keyof typeof priorities],
}));

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
    const ownPath = blogPath(article.locale, article.slug);
    const translatedPath = blogPath(article.locale === "es" ? "en" : "es", article.translatedSlug);
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
