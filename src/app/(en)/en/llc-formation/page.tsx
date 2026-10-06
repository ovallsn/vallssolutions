import type { Metadata } from "next";
import { LLCFormationPage } from "@/components/LLCFormationPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/en/llc-formation/",
  translatedPath: "/llc-formation/",
  title: "Wyoming LLC Formation Service",
  description: "Form a Wyoming LLC with state filing, EIN, first-year Registered Agent and mailing address. A $699 service for U.S. and international founders.",
});

export default function EnglishLLCFormationRoute() {
  return <LLCFormationPage locale="en" />;
}
