import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/contacto/",
  translatedPath: "/contact/",
  title: "Contacto para crear una LLC en Estados Unidos",
  description: "Consulta disponibilidad para el estado que tienes en mente y confirma alcance y precio. Escríbenos por email; no envíes documentos ni números sensibles.",
});

export default function SpanishContactRoute() {
  return <ContactPage locale="es" />;
}
