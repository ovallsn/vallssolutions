import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/nosotros/",
  translatedPath: "/about/",
  title: "Sobre Valls Solutions | Formación de LLC en EE. UU.",
  description: "Conoce cómo Valls Solutions ayuda a fundadores locales e internacionales a crear LLC en Wyoming y otros estados, con precio publicado para Wyoming.",
});

export default function AboutRoute() {
  return <AboutPage locale="es" />;
}
