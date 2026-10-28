import type { Metadata } from "next";
import { InvasionAccountsPage } from "@/components/InvasionAccountsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/invasion-accounts/",
  translatedPath: "/es/cuentas-invasion/",
  title: "Invasion Account Listings & Stats",
  description: "Compare Invasion account power, commander and HQ levels, VIP, diamonds, resources and Zone Pass. Ask about availability, price and transfer details.",
});

export default function InvasionAccountsRoute() {
  return <InvasionAccountsPage locale="en" />;
}
