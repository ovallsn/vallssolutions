import type { Metadata } from "next";
import { LLCFormationPage } from "@/components/LLCFormationPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/llc-formation/",
  translatedPath: "/es/crear-llc/",
  title: "Wyoming LLC Formation: Package and Process",
  description: "$699 Wyoming LLC formation: filing, EIN, first-year Registered Agent, mailing address, website, email and banking guidance.",
});

export default function EnglishLLCFormationRoute() {
  return <LLCFormationPage locale="en" />;
}
