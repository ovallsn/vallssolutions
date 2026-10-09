import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, safeJsonLd, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/",
  translatedPath: "/es/",
  title: "U.S. LLC Formation for Founders",
  description: "Wyoming LLCs for U.S. and international founders. $699 includes state filing, EIN, first-year agent and address, website, email and bank guidance.",
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
