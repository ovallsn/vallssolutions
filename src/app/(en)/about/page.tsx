import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/about/",
  translatedPath: "/es/nosotros/",
  title: "About Valls Solutions | U.S. LLC Formation Support",
  description: "Learn how Valls Solutions helps U.S. and international founders form a Wyoming LLC with clear pricing and direct bilingual support.",
});

export default function AboutRoute() {
  return <AboutPage locale="en" />;
}
