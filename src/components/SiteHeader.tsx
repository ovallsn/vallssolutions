"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mailtoHref, type Locale } from "@/lib/site";
import { BLOG_ARTICLES } from "@/content/blog/catalog";

type SiteHeaderProps = {
  locale: Locale;
};

const translatedRoutes: Record<string, string> = {
  "/": "/es/",
  "/es/": "/",
  "/en/": "/es/",
  "/pricing/": "/en/pricing/",
  "/en/pricing/": "/pricing/",
  "/llc-formation/": "/en/llc-formation/",
  "/en/llc-formation/": "/llc-formation/",
  "/contacto/": "/en/contact/",
  "/en/contact/": "/contacto/",
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const english = locale === "en";
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const currentArticle = BLOG_ARTICLES.find((article) => `${article.locale === "en" ? "/en" : ""}/blog/${article.slug}/` === normalizedPath);
  const languageHref = currentArticle
    ? `${english ? "" : "/en"}/blog/${currentArticle.translatedSlug}/`
    : translatedRoutes[normalizedPath] ?? (english ? "/es/" : "/");
  const nav = english
    ? [
        { href: "/#services", label: "Services" },
        { href: "/#process", label: "How it works" },
        { href: "/en/llc-formation/", label: "LLC formation" },
        { href: "/en/pricing/", label: "Pricing" },
        { href: "/en/blog/", label: "Blog" },
      ]
    : [
        { href: "/es/#servicios", label: "Servicios" },
        { href: "/es/#proceso", label: "Cómo funciona" },
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
          <Link className="brand" href={english ? "/" : "/es/"} aria-label={english ? "Valls Solutions, home" : "Valls Solutions, inicio"}>
            <img className="brand-mark" src="/assets/media/valls-single-ribbon.svg" alt="" aria-hidden="true" />
            <span className="brand-wordmark">Valls Solutions</span>
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
