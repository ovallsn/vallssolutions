import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/pricing/",
  translatedPath: "/en/pricing/",
  title: "Precios de formación de LLC en Wyoming",
  description: "Consulta el precio de una LLC en Wyoming: $699 iniciales con EIN, Registered Agent, dirección postal y primer Annual Report. Renovación del servicio de $449/año desde el segundo año; tasa estatal aparte.",
});

export default function SpanishPricingRoute() {
  return <PricingPage locale="es" />;
}
