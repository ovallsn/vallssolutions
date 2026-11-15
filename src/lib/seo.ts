import type { Metadata } from "next";
import { absoluteUrl, type Locale } from "@/lib/site";

type PageSeo = {
  locale: Locale;
  path: string;
  translatedPath: string;
  canonicalPath?: string;
  title: string;
  metaTitle?: string;
  description: string;
  kind?: "website" | "article";
  socialImagePath?: string;
  feedPath?: string;
};

export function pageMetadata({
  locale,
  path,
  translatedPath,
  canonicalPath,
  title,
  metaTitle,
  description,
  kind = "website",
  socialImagePath,
  feedPath,
}: PageSeo): Metadata {
  const canonical = canonicalPath ?? path;
  const spanishPath = locale === "es" ? canonical : translatedPath;
  const englishPath = locale === "en" ? canonical : translatedPath;
  const url = absoluteUrl(canonical);
  const cleanTitle = (metaTitle ?? title)
    .trim()
    .replace(/(?:\s*\|\s*Valls Solutions)+$/i, "");
  const brandedTitle = /\bValls Solutions\b/i.test(cleanTitle)
    ? cleanTitle
    : `${cleanTitle} | Valls Solutions`;
  const documentTitle =
    brandedTitle.length <= 60 ? brandedTitle : cleanTitle;
  const socialImageUrl = absoluteUrl(
    socialImagePath ?? `/assets/media/social-${locale}.png`,
  );
  const socialImageAlt = socialImagePath
    ? `${title} | Valls Solutions`
    : locale === "es"
      ? "Valls Solutions — Formación de LLC en Estados Unidos"
      : "Valls Solutions — U.S. LLC formation";

  return {
    title: { absolute: documentTitle },
    description,
    alternates: {
      canonical,
      languages: {
        es: absoluteUrl(spanishPath),
        en: absoluteUrl(englishPath),
        "x-default": absoluteUrl(englishPath),
      },
      ...(feedPath
        ? { types: { "application/rss+xml": absoluteUrl(feedPath) } }
        : {}),
    },
    openGraph: {
      type: kind,
      siteName: "Valls Solutions",
      title,
      description,
      url,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      images: [{ url: socialImageUrl, width: 1200, height: 630, alt: socialImageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImageUrl] },
  };
}
