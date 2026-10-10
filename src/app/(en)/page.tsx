import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, safeJsonLd, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/",
  translatedPath: "/es/",
  title: "U.S. LLC Formation for Founders",
  description: "Form a U.S. LLC as a local or international founder. Wyoming package: $699 once and $449/year from year two; ask us about other states.",
});

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Valls Solutions",
  url: SITE_URL,
  email: "info@vallssolutions.com",
  description: "U.S. LLC formation in Wyoming and other states for local and international founders, with EIN handling and business bank application guidance.",
  mainEntityOfPage: absoluteUrl("/"),
};

export default function DefaultEnglishHomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /><HomePage locale="en" /></>;
}
