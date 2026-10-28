import type { Metadata } from "next";
import { InvasionAccountsPage } from "@/components/InvasionAccountsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/cuentas-invasion/",
  translatedPath: "/invasion-accounts/",
  title: "Cuentas de Invasion: perfiles y datos",
  description: "Compara cuentas de Invasion por poder, niveles de comandante y HQ, VIP, diamantes, recursos y Zone Pass. Consulta disponibilidad, precio y transferencia.",
});

export default function SpanishInvasionAccountsRoute() {
  return <InvasionAccountsPage locale="es" />;
}
