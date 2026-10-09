import type { Metadata } from "next";
import { LegalDocumentPage, legalMetadata } from "@/components/LegalDocumentPage";

export const metadata: Metadata = legalMetadata("es", "cookies");

export default function CookiesRoute() {
  return <LegalDocumentPage locale="es" document="cookies" />;
}
