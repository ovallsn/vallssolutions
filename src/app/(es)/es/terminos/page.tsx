import type { Metadata } from "next";
import { LegalDocumentPage, legalMetadata } from "@/components/LegalDocumentPage";

export const metadata: Metadata = legalMetadata("es", "terms");

export default function TerminosRoute() {
  return <LegalDocumentPage locale="es" document="terms" />;
}
