import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, safeJsonLd, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/",
  translatedPath: "/es/",
  title: "Wyoming LLC Formation with EIN & Banking Guidance",
  description: "Form a Wyoming LLC for $699 with state filing, EIN handling, Registered Agent, mailing address, website, business email and banking application guidance.",
});

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Valls Solutions",
  url: SITE_URL,
  email: "info@vallssolutions.com",
  description: "Wyoming LLC formation and administrative support for U.S. and international founders, with EIN application handling and business banking guidance.",
  mainEntityOfPage: absoluteUrl("/"),
};

export default function DefaultEnglishHomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /><HomePage locale="en" /></>;
}
