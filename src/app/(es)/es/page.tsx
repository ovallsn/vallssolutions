import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, safeJsonLd, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/",
  translatedPath: "/",
  title: "Crear una LLC en Estados Unidos",
  description: "Crea una LLC en Wyoming por $699 desde EE. UU. o el extranjero. Incluye tasa estatal, EIN, agente y dirección del primer año, web, correo y orientación bancaria.",
});

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Valls Solutions",
  url: SITE_URL,
  email: "info@vallssolutions.com",
  description: "Creación de LLC en Wyoming para fundadores de EE. UU. y otros países, con gestión del EIN, esenciales del primer año y orientación para preparar la solicitud bancaria.",
  mainEntityOfPage: absoluteUrl("/es/"),
};

export default function SpanishHomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /><HomePage locale="es" /></>;
}
