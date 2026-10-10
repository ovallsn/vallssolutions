import type { Metadata } from "next";
import { LLCFormationPage } from "@/components/LLCFormationPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/llc-formation/",
  translatedPath: "/es/crear-llc/",
  title: "U.S. LLC Formation: Services and Process",
  description: "Form LLCs in Wyoming and other U.S. states. Our published $699 package is for Wyoming; ask us for another state's scope and price.",
});

export default function EnglishLLCFormationRoute() {
  return <LLCFormationPage locale="en" />;
}
