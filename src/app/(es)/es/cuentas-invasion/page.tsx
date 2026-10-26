import type { Metadata } from "next";
import { InvasionAccountsPage } from "@/components/InvasionAccountsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/cuentas-invasion/",
  translatedPath: "/invasion-accounts/",
  title: "Cuentas de Invasion: perfiles y datos",
  description: "Consulta perfiles de cuentas de Invasion por nivel VIP, diamantes, recursos y Zone Pass. Pregunta por disponibilidad, poder total, precio y transferencia.",
});

export default function SpanishInvasionAccountsRoute() {
  return <InvasionAccountsPage locale="es" />;
}
