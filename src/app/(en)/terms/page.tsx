import type { Metadata } from "next";
import { LegalDocumentPage, legalMetadata } from "@/components/LegalDocumentPage";

export const metadata: Metadata = legalMetadata("en", "terms");

export default function TermsRoute() {
  return <LegalDocumentPage locale="en" document="terms" />;
}
