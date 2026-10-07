"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CLIENT_PORTAL_URL, mailtoHref, type Locale } from "@/lib/site";
import { BLOG_ARTICLES } from "@/content/blog/catalog";
import { ROUTES, blogPath } from "@/lib/routes";

type SiteHeaderProps = {
  locale: Locale;
};

const translatedRoutes: Record<string, string> = Object.fromEntries(
  Object.values(ROUTES).flatMap(({ en, es }) => [[en, es], [es, en]]),
);

export function SiteHeader({ locale }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const english = locale === "en";
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const currentArticle = BLOG_ARTICLES.find((article) => blogPath(article.locale, article.slug) === normalizedPath);
  const languageHref = currentArticle
    ? blogPath(english ? "es" : "en", currentArticle.translatedSlug)
    : translatedRoutes[normalizedPath] ?? (english ? "/es/" : "/");
  const nav = english
    ? [
        { href: "/llc-formation/", label: "LLC formation" },
        { href: "/pricing/", label: "Pricing" },
        { href: "/#process", label: "How it works" },
        { href: "/blog/", label: "Guides" },
        { href: "/about/", label: "About" },
      ]
    : [
        { href: "/es/crear-llc/", label: "Formación LLC" },
        { href: "/es/precios/", label: "Precios" },
        { href: "/es/#proceso", label: "Cómo funciona" },
        { href: "/es/blog/", label: "Guías" },
        { href: "/es/nosotros/", label: "Nosotros" },
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
            {CLIENT_PORTAL_URL && (
              <a href={CLIENT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                {english ? "Client portal" : "Área de clientes"}
              </a>
            )}
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
