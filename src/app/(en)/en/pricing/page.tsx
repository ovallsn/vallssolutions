import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/en/pricing/",
  translatedPath: "/pricing/",
  title: "Wyoming LLC Formation Pricing",
  description: "Wyoming LLC formation for $699, including EIN, Registered Agent, address, website and email. Renew for $449/year, including Annual Report filing and state tax.",
});

export default function EnglishPricingRoute() {
  return <PricingPage locale="en" />;
}
