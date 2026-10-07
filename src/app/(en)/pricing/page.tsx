import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/pricing/",
  translatedPath: "/es/precios/",
  title: "Wyoming LLC Cost: $699 Formation + Annual Renewal",
  description: "Compare the $699 Wyoming LLC formation package with the $449 annual renewal from year two, including Annual Report, Registered Agent, address and website maintenance.",
});

export default function EnglishPricingRoute() {
  return <PricingPage locale="en" />;
}
