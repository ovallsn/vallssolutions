import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/contact/",
  translatedPath: "/es/contacto/",
  title: "Contact Valls Solutions about U.S. LLC formation",
  description: "Ask whether we can support your preferred state and confirm scope and price. Start by email; do not send identity documents or sensitive numbers.",
});

export default function EnglishContactRoute() {
  return <ContactPage locale="en" />;
}
