import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, safeJsonLd, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/en/",
  translatedPath: "/",
  title: "Form a U.S. LLC",
  description: "Form a Wyoming LLC for $699, including state formation, EIN, first-year Registered Agent and mailing address. Banking application guidance for U.S. and international founders.",
});

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Valls Solutions",
  url: SITE_URL,
  email: "info@vallssolutions.com",
  description: "Wyoming LLC formation and administrative support for founders in the United States and abroad.",
  mainEntityOfPage: absoluteUrl("/en/"),
};

export default function EnglishHomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /><HomePage locale="en" /></>;
}
