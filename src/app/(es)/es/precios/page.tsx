import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/precios/",
  translatedPath: "/pricing/",
  title: "Precio de LLC en Wyoming: creación y renovación",
  description: "$699 por formar una LLC en Wyoming; $449/año desde el segundo año con Annual Report, tasa estatal, agente, dirección postal y mantenimiento web.",
});

export default function SpanishPricingRoute() {
  return <PricingPage locale="es" />;
}
