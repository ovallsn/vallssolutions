export type Locale = "es" | "en";

export type BlogArticle = {
  locale: Locale;
  slug: string;
  translatedSlug: string;
  title: string;
  description: string;
  category: string;
  readMinutes: number;
};

export const BLOG_ARTICLES: readonly BlogArticle[] = [
  {
    locale: "en",
    slug: "do-i-need-an-llc",
    translatedSlug: "necesito-una-llc",
    title: "Do I need an LLC to start a business?",
    description: "See how a U.S. LLC can organize contracts, business records and company banking, with formation costs and ongoing responsibilities explained.",
    category: "U.S. company formation",
    readMinutes: 6,
  },
  {
    locale: "es",
    slug: "necesito-una-llc",
    translatedSlug: "do-i-need-an-llc",
    title: "¿Necesito una LLC para mi negocio? Usos y ventajas",
    description: "Descubre cómo una LLC estadounidense puede organizar contratos, registros y cuentas de empresa, con costes y obligaciones explicados.",
    category: "Formación de empresas",
    readMinutes: 6,
  },
  {
    locale: "en",
    slug: "wyoming-llc",
    translatedSlug: "llc-wyoming",
    title: "Wyoming LLC: benefits, costs and annual requirements",
    description: "Explore Wyoming LLC formation, Registered Agent service, Annual Report costs and how your business location shapes state requirements.",
    category: "Wyoming LLC",
    readMinutes: 5,
  },
  {
    locale: "es",
    slug: "llc-wyoming",
    translatedSlug: "wyoming-llc",
    title: "LLC en Wyoming: ventajas, costes y obligaciones anuales",
    description: "Conoce la formación de LLC en Wyoming, el Registered Agent, el coste del Annual Report y cómo influye dónde opera tu negocio.",
    category: "LLC en Wyoming",
    readMinutes: 5,
  },
  {
    locale: "en",
    slug: "ein-vs-itin",
    translatedSlug: "ein-o-itin",
    title: "EIN vs. ITIN: what your LLC needs and how to apply",
    description: "Understand what an EIN and ITIN identify, how the IRS EIN application works and what international founders should prepare.",
    category: "EIN and business documents",
    readMinutes: 3,
  },
  {
    locale: "es",
    slug: "ein-o-itin",
    translatedSlug: "ein-vs-itin",
    title: "EIN e ITIN: diferencias y cómo solicitar el EIN de tu LLC",
    description: "Conoce para qué sirve cada número, cómo funciona la solicitud del EIN ante el IRS y qué deben preparar los fundadores internacionales.",
    category: "EIN y documentos",
    readMinutes: 3,
  },
  {
    locale: "en",
    slug: "llc-for-non-us-residents",
    translatedSlug: "llc-para-no-residentes",
    title: "U.S. LLC for non-U.S. residents: requirements and formation",
    description: "Form a U.S. LLC from abroad: understand ownership, EIN applications, Wyoming addresses, banking preparation and the $699 formation package.",
    category: "International founders",
    readMinutes: 6,
  },
  {
    locale: "es",
    slug: "llc-para-no-residentes",
    translatedSlug: "llc-for-non-us-residents",
    title: "LLC para no residentes en Estados Unidos: requisitos y creación",
    description: "Crea una LLC desde fuera de EE. UU.: conoce los requisitos, el EIN, la dirección en Wyoming, la preparación bancaria y el paquete de $699.",
    category: "Emprendedores internacionales",
    readMinutes: 6,
  },
  {
    locale: "en",
    slug: "llc-taxes",
    translatedSlug: "llc-impuestos",
    title: "U.S. LLC taxes: classifications, elections and potential savings",
    description: "Learn how U.S. LLC tax classification works, which elections may affect a business and what owners should review with a tax professional.",
    category: "LLC taxes",
    readMinutes: 7,
  },
  {
    locale: "es",
    slug: "llc-impuestos",
    translatedSlug: "llc-taxes",
    title: "Impuestos de una LLC en EE. UU.: clasificación y opciones fiscales",
    description: "Aprende cómo se clasifica fiscalmente una LLC y qué elecciones pueden influir en los impuestos y declaraciones de cada negocio.",
    category: "Impuestos de LLC",
    readMinutes: 7,
  },
  {
    locale: "en",
    slug: "business-owner-thailand-visa",
    translatedSlug: "empresa-y-visados-tailandia",
    title: "Business owner and Thailand DTV: documents for business activity",
    description: "See which business records Thai DTV workcation checklists may request and how an operating company can document self-employment.",
    category: "Business and visas",
    readMinutes: 7,
  },
  {
    locale: "es",
    slug: "empresa-y-visados-tailandia",
    translatedSlug: "business-owner-thailand-visa",
    title: "Empresa y visado DTV de Tailandia: documentos para acreditar actividad",
    description: "Consulta qué documentos empresariales pueden pedir para el DTV tailandés y cómo una empresa operativa puede acreditar actividad propia.",
    category: "Empresa y visados",
    readMinutes: 7,
  },
  {
    locale: "en",
    slug: "llc-us-visa",
    translatedSlug: "llc-visado-estados-unidos",
    title: "U.S. LLCs and business visas: E-2 and L-1 considerations",
    description: "Understand how a U.S. company relates to E-2 and L-1 visa categories, their business requirements and the role of immigration counsel.",
    category: "Business and visas",
    readMinutes: 6,
  },
  {
    locale: "es",
    slug: "llc-visado-estados-unidos",
    translatedSlug: "llc-us-visa",
    title: "LLC y visados de Estados Unidos: claves para E-2 y L-1",
    description: "Entiende cómo se relaciona una empresa estadounidense con las categorías E-2 y L-1, sus requisitos empresariales y el asesoramiento migratorio.",
    category: "Empresa y visados",
    readMinutes: 6,
  },
] as const;

export function findBlogArticle(locale: Locale, slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.locale === locale && article.slug === slug);
}

export function listBlogArticles(locale: Locale): BlogArticle[] {
  return BLOG_ARTICLES.filter((article) => article.locale === locale);
}
