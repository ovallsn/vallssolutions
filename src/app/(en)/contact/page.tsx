import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/contact/",
  translatedPath: "/es/contacto/",
  title: "Contact Valls Solutions about a U.S. LLC",
  description: "Ask by email about forming a Wyoming LLC. Start with a short business description; do not send identity documents or sensitive numbers.",
});

export default function EnglishContactRoute() {
  return <ContactPage locale="en" />;
}
