import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, safeJsonLd, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/",
  translatedPath: "/",
  title: "Formar una LLC en Estados Unidos",
  description: "Crea tu LLC en Wyoming por $699: formación estatal, EIN, Registered Agent, dirección postal y primer Annual Report incluidos. Orientación bancaria para fundadores en EE. UU. y en el extranjero.",
});

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Valls Solutions",
  url: SITE_URL,
  email: "info@vallssolutions.com",
  description: "Formación de LLC en Wyoming y apoyo administrativo para fundadores en Estados Unidos y en el extranjero.",
  mainEntityOfPage: absoluteUrl("/es/"),
};

export default function SpanishHomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /><HomePage locale="es" /></>;
}
