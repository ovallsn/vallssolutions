import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl, safeJsonLd, SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/",
  translatedPath: "/",
  title: "Crear una LLC en Estados Unidos",
  description: "Crea una LLC en EE. UU. desde dentro o fuera del país. Paquete de Wyoming: 699 USD y 449 USD/año desde el segundo año; consulta otros estados.",
});

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Valls Solutions",
  url: SITE_URL,
  email: "info@vallssolutions.com",
  description: "Creación de LLC en Wyoming y otros estados para fundadores de EE. UU. y del extranjero, con gestión del EIN y orientación bancaria empresarial.",
  mainEntityOfPage: absoluteUrl("/es/"),
};

export default function SpanishHomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /><HomePage locale="es" /></>;
}
