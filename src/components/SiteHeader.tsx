"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CLIENT_PORTAL_URL, type Locale } from "@/lib/site";
import { BLOG_ARTICLES } from "@/content/blog/catalog";
import { ROUTES, blogPath } from "@/lib/routes";

type SiteHeaderProps = {
  locale: Locale;
};

const translatedRoutes: Record<string, string> = Object.fromEntries(
  Object.values(ROUTES).flatMap(({ en, es }) => [
    [en, es],
    [es, en],
  ]),
);

export function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const english = locale === "en";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const currentArticle = BLOG_ARTICLES.find(
    (article) => blogPath(article.locale, article.slug) === normalizedPath,
  );
  const languageHref = currentArticle
    ? blogPath(english ? "es" : "en", currentArticle.translatedSlug)
    : (translatedRoutes[normalizedPath] ?? (english ? "/es/" : "/"));
  const nav = english
    ? [
        { href: "/llc-formation/", label: "LLC formation" },
        { href: "/pricing/", label: "Pricing" },
        { href: "/blog/", label: "Guides" },
        { href: "/about/", label: "About" },
        { href: "/contact/", label: "Contact" },
      ]
    : [
        { href: "/es/crear-llc/", label: "Formación LLC" },
        { href: "/es/precios/", label: "Precios" },
        { href: "/es/blog/", label: "Guías" },
        { href: "/es/nosotros/", label: "Nosotros" },
        { href: "/es/contacto/", label: "Contacto" },
      ];
  const isActiveLink = (href: string) => {
    const route = href.split("#")[0];
    return route.endsWith("/blog/")
      ? normalizedPath.startsWith(route)
      : normalizedPath === route;
  };
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#contenido">
        {english ? "Skip to content" : "Saltar al contenido"}
      </a>
      <header
        className={`site-header${normalizedPath === "/" || normalizedPath === "/es/" ? " site-header-home" : ""}`}
        onKeyDown={(event) => {
          if (event.key === "Escape" && mobileMenuOpen) {
            closeMobileMenu();
            mobileMenuButtonRef.current?.focus();
          }
        }}
      >
        <div className="nav-shell">
          <Link
            className="brand"
            href={english ? "/" : "/es/"}
            aria-label={
              english ? "Valls Solutions, home" : "Valls Solutions, inicio"
            }
          >
            <img
              className="brand-mark"
              src="/assets/media/valls-single-ribbon.svg"
              alt=""
              aria-hidden="true"
            />
            <span className="brand-wordmark">Valls Solutions</span>
          </Link>
          <nav
            id="primary-navigation"
            className="primary-nav"
            aria-label={english ? "Main navigation" : "Navegación principal"}
            data-mobile-open={mobileMenuOpen}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActiveLink(item.href) ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
            {CLIENT_PORTAL_URL && (
              <a
                href={CLIENT_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                {english ? "Client portal" : "Área de clientes"}
              </a>
            )}
            <Link
              className="button button-small button-dark nav-cta nav-cta-mobile"
              href={english ? "/contact/" : "/es/contacto/"}
              onClick={closeMobileMenu}
            >
              {english ? "Start your LLC" : "Empezar mi LLC"}
            </Link>
          </nav>
          <div className="header-tools">
            <div
              className="language-switch"
              role="group"
              aria-label={english ? "Choose language" : "Cambiar idioma"}
            >
              {english ? (
                <span
                  className="language-option is-current"
                  lang="en"
                  aria-current="true"
                >
                  EN
                </span>
              ) : (
                <Link
                  className="language-option"
                  href={languageHref}
                  lang="en"
                  hrefLang="en"
                  aria-label="Switch to English"
                >
                  EN
                </Link>
              )}
              {!english ? (
                <span
                  className="language-option is-current"
                  lang="es"
                  aria-current="true"
                >
                  ES
                </span>
              ) : (
                <Link
                  className="language-option"
                  href={languageHref}
                  lang="es"
                  hrefLang="es"
                  aria-label="Cambiar a español"
                >
                  ES
                </Link>
              )}
            </div>
            <Link
              className="button button-small button-dark nav-cta nav-cta-desktop"
              href={english ? "/contact/" : "/es/contacto/"}
            >
              {english ? "Start your LLC" : "Empezar mi LLC"}
            </Link>
            <button
              ref={mobileMenuButtonRef}
              className="mobile-menu-toggle"
              type="button"
              aria-controls="primary-navigation"
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen
                  ? english
                    ? "Close navigation menu"
                    : "Cerrar menú de navegación"
                  : english
                    ? "Open navigation menu"
                    : "Abrir menú de navegación"
              }
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                {mobileMenuOpen ? (
                  <path d="m6 6 12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
