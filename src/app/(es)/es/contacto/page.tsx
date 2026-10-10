import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/contacto/",
  translatedPath: "/contact/",
  title: "Contacto para crear una LLC en Estados Unidos",
  description: "Contacta con Valls Solutions para crear una LLC en Wyoming u otro estado de EE. UU. Confirmamos el alcance y el precio antes de empezar.",
});

export default function SpanishContactRoute() {
  return <ContactPage locale="es" />;
}
