import type { Metadata } from "next";
import { LegalDocumentPage, legalMetadata } from "@/components/LegalDocumentPage";

export const metadata: Metadata = legalMetadata("en", "cookies");

export default function CookiesRoute() {
  return <LegalDocumentPage locale="en" document="cookies" />;
}
