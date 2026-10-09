import type { Metadata } from "next";
import { LegalDocumentPage, legalMetadata } from "@/components/LegalDocumentPage";

export const metadata: Metadata = legalMetadata("en", "privacy");

export default function PrivacyRoute() {
  return <LegalDocumentPage locale="en" document="privacy" />;
}
