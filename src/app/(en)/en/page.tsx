import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, safeJsonLd, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    locale: "en",
    path: "/en/",
    translatedPath: "/es/",
    canonicalPath: "/",
    title: "U.S. LLC Formation in English",
    description: "The English-language Valls Solutions homepage for U.S. LLC formation, EIN handling, Registered Agent service and administrative support.",
  }),
  robots: { index: false, follow: true },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Valls Solutions",
  url: SITE_URL,
  email: "info@vallssolutions.com",
  description: "Wyoming LLC formation and administrative support for founders in the United States and abroad.",
  mainEntityOfPage: absoluteUrl("/"),
};

export default function EnglishHomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /><HomePage locale="en" /></>;
}
