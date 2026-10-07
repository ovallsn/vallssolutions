import type { Metadata } from "next";
import { LLCFormationPage } from "@/components/LLCFormationPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/crear-llc/",
  translatedPath: "/llc-formation/",
  title: "Formación de LLC en Wyoming: paquete y pasos",
  description: "Conoce el proceso de formación en Wyoming con gestión del EIN, Registered Agent y dirección del primer año, web, correo y orientación bancaria.",
});

export default function SpanishLLCFormationRoute() {
  return <LLCFormationPage locale="es" />;
}
