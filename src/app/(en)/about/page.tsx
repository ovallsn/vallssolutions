import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/about/",
  translatedPath: "/es/nosotros/",
  title: "About Valls Solutions | U.S. LLC Formation Support",
  description: "Learn how Valls Solutions supports U.S. and international founders forming LLCs in Wyoming and other states, with published package pricing for Wyoming.",
});

export default function AboutRoute() {
  return <AboutPage locale="en" />;
}
