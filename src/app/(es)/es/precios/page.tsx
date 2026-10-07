import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/precios/",
  translatedPath: "/pricing/",
  title: "Precio de LLC en Wyoming: creación y renovación",
  description: "Compara la formación de LLC en Wyoming por $699 con la renovación anual de $449 desde el segundo año, que incluye Annual Report, Registered Agent, dirección y web.",
});

export default function SpanishPricingRoute() {
  return <PricingPage locale="es" />;
}
