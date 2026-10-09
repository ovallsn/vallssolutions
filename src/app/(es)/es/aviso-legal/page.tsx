import type { Metadata } from "next";
import { LegalDocumentPage, legalMetadata } from "@/components/LegalDocumentPage";

export const metadata: Metadata = legalMetadata("es", "legalNotice");

export default function AvisoLegalRoute() {
  return <LegalDocumentPage locale="es" document="legalNotice" />;
}
