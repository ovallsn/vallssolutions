import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/nosotros/",
  translatedPath: "/about/",
  title: "Sobre Valls Solutions | Formación de LLC en EE. UU.",
  description: "Conoce cómo Valls Solutions ayuda a fundadores en EE. UU. y en otros países a crear una LLC en Wyoming con precios claros y atención bilingüe.",
});

export default function AboutRoute() {
  return <AboutPage locale="es" />;
}
