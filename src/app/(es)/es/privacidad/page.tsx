import type { Metadata } from "next";
import { LegalDocumentPage, legalMetadata } from "@/components/LegalDocumentPage";

export const metadata: Metadata = legalMetadata("es", "privacy");

export default function PrivacidadRoute() {
  return <LegalDocumentPage locale="es" document="privacy" />;
}
