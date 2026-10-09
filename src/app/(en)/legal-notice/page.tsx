import type { Metadata } from "next";
import { LegalDocumentPage, legalMetadata } from "@/components/LegalDocumentPage";

export const metadata: Metadata = legalMetadata("en", "legalNotice");

export default function LegalNoticeRoute() {
  return <LegalDocumentPage locale="en" document="legalNotice" />;
}
