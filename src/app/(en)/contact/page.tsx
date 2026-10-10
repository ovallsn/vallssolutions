import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/contact/",
  translatedPath: "/es/contacto/",
  title: "Contact Valls Solutions about U.S. LLC formation",
  description: "Contact Valls Solutions about forming an LLC in Wyoming or another U.S. state. We confirm the scope and price before work begins.",
});

export default function EnglishContactRoute() {
  return <ContactPage locale="en" />;
}
