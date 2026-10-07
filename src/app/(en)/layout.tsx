import type { Metadata } from "next";
import "../globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Wyoming LLC Formation | Valls Solutions", template: "%s | Valls Solutions" },
  description: "Form a Wyoming LLC for $699 with EIN handling, Registered Agent, mailing address, website, business email and guidance for your business bank application.",
  icons: { icon: "/assets/favicon.svg" },
  applicationName: "Valls Solutions",
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader locale="en" />
        {children}
        <SiteFooter locale="en" />
      </body>
    </html>
  );
}
