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
  title: { default: "Formación de LLC en Wyoming | Valls Solutions", template: "%s | Valls Solutions" },
  description: "Crea tu LLC en Wyoming por $699 con gestión del EIN, Registered Agent, dirección postal, web, correo empresarial y orientación bancaria.",
  icons: { icon: "/assets/favicon.svg" },
  applicationName: "Valls Solutions",
};

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sansFont.variable} ${displayFont.variable}`}>
      <body>
        <SiteHeader locale="es" />
        {children}
        <HomeMotion />
        <SiteFooter locale="es" />
        <ConsentManager locale="es" />
      </body>
    </html>
  );
}
