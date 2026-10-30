import type { Metadata } from "next";
import { InvasionAccountsPage } from "@/components/InvasionAccountsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/cuentas-invasion/",
  translatedPath: "/invasion-accounts/",
  title: "Cuentas de Invasion | Catálogo Gifters",
  description: "Explora cuentas de Invasion con acceso mediante Google, Facebook o Tap4fun. Compara niveles de comandante y HQ, VIP, diamantes, recursos y Zone Passes. Escríbenos para confirmar disponibilidad y precio.",
});

export default function SpanishInvasionAccountsRoute() {
  return <InvasionAccountsPage locale="es" />;
}
