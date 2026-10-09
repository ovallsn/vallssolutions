import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/pricing/",
  translatedPath: "/es/precios/",
  title: "Wyoming LLC Cost: $699 Formation + Annual Renewal",
  description: "$699 for Wyoming LLC formation; $449/year from year two with Annual Report, state tax, Registered Agent, mailing address and website maintenance.",
});

export default function EnglishPricingRoute() {
  return <PricingPage locale="en" />;
}
