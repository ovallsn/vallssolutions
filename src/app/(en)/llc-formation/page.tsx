import type { Metadata } from "next";
import { LLCFormationPage } from "@/components/LLCFormationPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/llc-formation/",
  translatedPath: "/es/crear-llc/",
  title: "Wyoming LLC Formation: Package and Process",
  description: "See how Wyoming LLC formation works with EIN application handling, first-year Registered Agent and address, website, business email and bank application guidance.",
});

export default function EnglishLLCFormationRoute() {
  return <LLCFormationPage locale="en" />;
}
