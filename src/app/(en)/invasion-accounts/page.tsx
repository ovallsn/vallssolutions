import type { Metadata } from "next";
import { InvasionAccountsPage } from "@/components/InvasionAccountsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/invasion-accounts/",
  translatedPath: "/es/cuentas-invasion/",
  title: "Invasion Gifters Account Listings",
  description: "Explore Invasion accounts with Google, Facebook or Tap4fun logins. Compare Commander and HQ levels, VIP, diamonds, resources and Zone Passes. Contact us to check availability and pricing.",
});

export default function InvasionAccountsRoute() {
  return <InvasionAccountsPage locale="en" />;
}
