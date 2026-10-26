import type { Metadata } from "next";
import { InvasionAccountsPage } from "@/components/InvasionAccountsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/invasion-accounts/",
  translatedPath: "/es/cuentas-invasion/",
  title: "Invasion Account Listings & Stats",
  description: "Browse Invasion account listings by VIP level, diamonds, resources and Zone Pass. Ask for current availability, total power, price and transfer details.",
});

export default function InvasionAccountsRoute() {
  return <InvasionAccountsPage locale="en" />;
}
