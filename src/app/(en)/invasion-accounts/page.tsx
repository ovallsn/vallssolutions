import type { Metadata } from "next";
import { InvasionAccountsPage } from "@/components/InvasionAccountsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/invasion-accounts/",
  translatedPath: "/es/cuentas-invasion/",
  title: "Invasion Gifters Account Listings",
  description: "Browse Invasion account listings across Google, Facebook and Tap4fun. Compare power, Commander and HQ levels, VIP, diamonds, resources and Zone Passes. Ask about availability and price.",
});

export default function InvasionAccountsRoute() {
  return <InvasionAccountsPage locale="en" />;
}
