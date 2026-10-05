"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { localePrefix, mailtoHref, type Locale } from "@/lib/site";

type SiteHeaderProps = {
  locale: Locale;
};

const translatedRoutes: Record<string, string> = {
  "/": "/en/",
  "/en/": "/",
  "/pricing/": "/en/pricing/",
  "/en/pricing/": "/pricing/",
  "/llc-formation/": "/en/llc-formation/",
  "/en/llc-formation/": "/llc-formation/",
  "/contacto/": "/en/contact/",
  "/en/contact/": "/contacto/",
  "/blog/": "/en/blog/",
  "/en/blog/": "/blog/",
  "/blog/llc-impuestos/": "/en/blog/llc-taxes/",
  "/en/blog/llc-taxes/": "/blog/llc-impuestos/",
  "/blog/llc-wyoming/": "/en/blog/wyoming-llc/",
  "/en/blog/wyoming-llc/": "/blog/llc-wyoming/",
  "/blog/llc-en-estados-unidos/": "/en/blog/us-llc/",
  "/en/blog/us-llc/": "/blog/llc-en-estados-unidos/",
  "/blog/llc-visado-estados-unidos/": "/en/blog/llc-us-visa/",
  "/en/blog/llc-us-visa/": "/blog/llc-visado-estados-unidos/",
  "/blog/empresa-y-visados-tailandia/": "/en/blog/business-owner-thailand-visa/",
  "/en/blog/business-owner-thailand-visa/": "/blog/empresa-y-visados-tailandia/",
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const english = locale === "en";
  const prefix = localePrefix(locale);
  const languageHref = translatedRoutes[pathname] ?? (english ? "/" : "/en/");
  const nav = english
    ? [
        { href: "/en/#services", label: "Services" },
        { href: "/en/#process", label: "How it works" },
        { href: "/en/llc-formation/", label: "LLC formation" },
        { href: "/en/pricing/", label: "Pricing" },
        { href: "/en/blog/", label: "Blog" },
      ]
    : [
        { href: "/#servicios", label: "Servicios" },
        { href: "/#proceso", label: "Cómo funciona" },
        { href: "/llc-formation/", label: "Formación LLC" },
        { href: "/pricing/", label: "Precios" },
        { href: "/blog/", label: "Blog" },
      ];

  return (
    <>
      <a className="skip-link" href="#contenido">
        {english ? "Skip to content" : "Saltar al contenido"}
      </a>
      <header className="site-header">
        <div className="nav-shell">
          <Link className="brand" href={prefix || "/"} aria-label={english ? "Valls Solutions, home" : "Valls Solutions, inicio"}>
            <span className="brand-mark" aria-hidden="true">V</span>
            <span>Valls <span className="brand-light">Solutions</span></span>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? (english ? "Close menu" : "Cerrar menú") : (english ? "Open menu" : "Abrir menú")}</span>
            <span className="menu-lines" aria-hidden="true" />
          </button>
          <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} id="primary-nav" aria-label={english ? "Main navigation" : "Navegación principal"}>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            ))}
            <Link className="language-link" href={languageHref} lang={english ? "es" : "en"} hrefLang={english ? "es" : "en"} onClick={() => setMenuOpen(false)}>
              {english ? <>ES <span>Español</span></> : <>EN <span>English</span></>}
            </Link>
            <a className="button button-small button-dark nav-cta" href={mailtoHref(locale)}>
              {english ? "Get started" : "Empezar"}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
