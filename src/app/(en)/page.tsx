import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, safeJsonLd, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/",
  translatedPath: "/es/",
  title: "Wyoming LLC Formation for U.S. & Global Founders",
  description: "Form a Wyoming LLC for $699 from the U.S. or abroad. Includes the state fee, EIN assistance, first-year Registered Agent and address, website, email and banking guidance.",
});

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Valls Solutions",
  url: SITE_URL,
  email: "info@vallssolutions.com",
  description: "Wyoming LLC formation for U.S. and international founders, with EIN assistance, first-year business essentials and practical guidance for a business bank application.",
  mainEntityOfPage: absoluteUrl("/"),
};

export default function DefaultEnglishHomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /><HomePage locale="en" /></>;
}
