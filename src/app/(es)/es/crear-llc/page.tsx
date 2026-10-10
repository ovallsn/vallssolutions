import type { Metadata } from "next";
import { LLCFormationPage } from "@/components/LLCFormationPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/crear-llc/",
  translatedPath: "/llc-formation/",
  title: "Crear una LLC en EE. UU.: servicios y proceso",
  description: "Creamos LLC en Wyoming y otros estados. El paquete publicado de 699 USD es para Wyoming; consulta el alcance y el precio de otro estado.",
});

export default function SpanishLLCFormationRoute() {
  return <LLCFormationPage locale="es" />;
}
