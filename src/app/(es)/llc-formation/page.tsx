import type { Metadata } from "next";
import { LLCFormationPage } from "@/components/LLCFormationPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/llc-formation/",
  translatedPath: "/en/llc-formation/",
  title: "Formación de LLC en Wyoming",
  description: "Forma tu LLC en Wyoming con presentación estatal, EIN, Registered Agent y dirección postal del primer año. Servicio de $699 para fundadores en EE. UU. y en el extranjero.",
});

export default function SpanishLLCFormationRoute() {
  return <LLCFormationPage locale="es" />;
}
