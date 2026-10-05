import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/contacto/",
  translatedPath: "/en/contact/",
  title: "Contacto para formar una LLC en Estados Unidos",
  description: "Consulta por email sobre la formación de una LLC en Wyoming. Empieza con una breve descripción; no envíes documentos de identidad ni números sensibles.",
});

export default function SpanishContactRoute() {
  return <ContactPage locale="es" />;
}
