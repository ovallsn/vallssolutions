import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/pricing/",
  translatedPath: "/en/pricing/",
  title: "Precios de formación de LLC en Wyoming",
  description: "LLC en Wyoming por $699 con EIN, agente registrado, dirección, web y correo. Renovación de $449/año con presentación y tasa estatal del Annual Report.",
});

export default function SpanishPricingRoute() {
  return <PricingPage locale="es" />;
}
