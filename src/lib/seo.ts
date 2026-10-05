import type { Metadata } from "next";
import { absoluteUrl, type Locale } from "@/lib/site";

type PageSeo = {
  locale: Locale;
  path: string;
  translatedPath: string;
  title: string;
  description: string;
  kind?: "website" | "article";
};

export function pageMetadata({
  locale,
  path,
  translatedPath,
  title,
  description,
  kind = "website",
}: PageSeo): Metadata {
  const spanishPath = locale === "es" ? path : translatedPath;
  const englishPath = locale === "en" ? path : translatedPath;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        es: absoluteUrl(spanishPath),
        en: absoluteUrl(englishPath),
        "x-default": absoluteUrl("/"),
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
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
