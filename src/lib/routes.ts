import type { Locale } from "./site";

// Canonical paths are shared by navigation, language switching and the sitemap.
export const ROUTES = {
  home: { en: "/", es: "/es/" },
  formation: { en: "/llc-formation/", es: "/es/crear-llc/" },
  pricing: { en: "/pricing/", es: "/es/precios/" },
  about: { en: "/about/", es: "/es/nosotros/" },
  contact: { en: "/contact/", es: "/es/contacto/" },
  blog: { en: "/blog/", es: "/es/blog/" },
} as const;

export function blogPath(locale: Locale, slug: string): string {
  return `${ROUTES.blog[locale]}${slug}/`;
}
