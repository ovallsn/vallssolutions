import type { Metadata } from "next";
import "../globals.css";
import "../conversion-polish.css";
import { ConsentManager } from "@/components/ConsentManager";
import { SiteFooter } from "@/components/SiteFooter";
import { HomeMotion } from "@/components/HomeMotion";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";
import { displayFont, sansFont } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "U.S. LLC Formation | Valls Solutions", template: "%s | Valls Solutions" },
  description: "LLC formation in Wyoming and other U.S. states for local and international founders. Our published $699 package is for Wyoming.",
  icons: { icon: "/assets/favicon.svg" },
  applicationName: "Valls Solutions",
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${displayFont.variable}`}>
      <body>
        <SiteHeader locale="en" />
        {children}
        <HomeMotion />
        <SiteFooter locale="en" />
        <ConsentManager locale="en" />
      </body>
    </html>
  );
}
