import type { Metadata } from "next";
import { absoluteUrl, type Locale } from "@/lib/site";

type PageSeo = {
  locale: Locale;
  path: string;
  translatedPath: string;
  canonicalPath?: string;
  title: string;
  description: string;
  kind?: "website" | "article";
};

export function pageMetadata({
  locale,
  path,
  translatedPath,
  canonicalPath,
  title,
  description,
  kind = "website",
}: PageSeo): Metadata {
  const canonical = canonicalPath ?? path;
  const spanishPath = locale === "es" ? canonical : translatedPath;
  const englishPath = locale === "en" ? canonical : translatedPath;
  const url = absoluteUrl(canonical);

  return {
    title: { absolute: `${title} | Valls Solutions` },
    description,
    alternates: {
      canonical,
      languages: {
        es: absoluteUrl(spanishPath),
        en: absoluteUrl(englishPath),
        "x-default": absoluteUrl(englishPath),
      },
    },
    openGraph: {
      type: kind,
      siteName: "Valls Solutions",
      title,
      description,
      url,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      images: [{ url: absoluteUrl(`/assets/media/social-${locale}.png`), width: 1200, height: 630, alt: locale === "es" ? "Valls Solutions — Formación de LLC en Estados Unidos" : "Valls Solutions — U.S. LLC formation" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(`/assets/media/social-${locale}.png`)] },
  };
}
