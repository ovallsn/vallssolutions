import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/en/pricing/",
  translatedPath: "/pricing/",
  title: "Wyoming LLC Formation Pricing",
  description: "See Wyoming LLC pricing: $699 to form, including EIN, first-year Registered Agent, mailing address and first Annual Report. The $449/year service renewal starts in year two; the state fee is separate.",
});

export default function EnglishPricingRoute() {
  return <PricingPage locale="en" />;
}
