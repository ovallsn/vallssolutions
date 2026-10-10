export type Locale = "es" | "en";

export type BlogArticle = {
  locale: Locale;
  slug: string;
  translatedSlug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  readMinutes: number;
};

export type BlogTopic = {
  id: string;
  title: Readonly<Record<Locale, string>>;
  slugs: Readonly<Record<Locale, readonly string[]>>;
};

export const BLOG_ARTICLES: readonly BlogArticle[] = [
  {
    locale: "en",
    slug: "do-i-need-an-llc",
    translatedSlug: "necesito-una-llc",
    title: "Do I need an LLC to start a business?",
    seoTitle: "Do I Need an LLC? Benefits & Costs",
    description:
      "See how a U.S. LLC can organize contracts, business records and company banking, with formation costs and ongoing responsibilities explained.",
    category: "U.S. company formation",
    readMinutes: 6,
  },
  {
    locale: "es",
    slug: "necesito-una-llc",
    translatedSlug: "do-i-need-an-llc",
    title: "¿Necesito una LLC para mi negocio? Usos y ventajas",
    seoTitle: "¿Necesito una LLC? Ventajas y costes",
    description:
      "Descubre cómo una LLC estadounidense puede organizar contratos, registros y cuentas de empresa, con costes y obligaciones explicados.",
    category: "Formación de empresas",
    readMinutes: 6,
  },
  {
    locale: "en",
    slug: "wyoming-llc",
    translatedSlug: "llc-wyoming",
    title: "Wyoming LLC: benefits, costs and annual requirements",
    seoTitle: "Wyoming LLC: Benefits & Costs",
    description:
      "Explore Wyoming LLC formation, Registered Agent service, Annual Report costs and how your business location shapes state requirements.",
    category: "Wyoming LLC",
    readMinutes: 5,
  },
  {
    locale: "es",
    slug: "llc-wyoming",
    translatedSlug: "wyoming-llc",
    title: "LLC en Wyoming: ventajas, costes y obligaciones anuales",
    seoTitle: "LLC en Wyoming: ventajas y costes",
    description:
      "Conoce la formación de LLC en Wyoming, el Registered Agent, el coste del Annual Report y cómo influye dónde opera tu negocio.",
    category: "LLC en Wyoming",
    readMinutes: 5,
  },
  {
    locale: "en",
    slug: "wyoming-vs-delaware-llc",
    translatedSlug: "wyoming-o-delaware-llc",
    title: "Wyoming vs. Delaware LLC: how to compare before forming",
    seoTitle: "Wyoming vs. Delaware LLC: Costs",
    description:
      "Compare Wyoming and Delaware LLC costs, annual requirements and business-location considerations before choosing a formation state.",
    category: "Choosing a formation state",
    readMinutes: 6,
  },
  {
    locale: "es",
    slug: "wyoming-o-delaware-llc",
    translatedSlug: "wyoming-vs-delaware-llc",
    title: "Wyoming o Delaware para una LLC: cómo comparar antes de crearla",
    seoTitle: "Wyoming o Delaware: costes de LLC",
    description:
      "Compara costes y obligaciones anuales de una LLC en Wyoming y Delaware y ten en cuenta dónde opera tu negocio antes de elegir estado.",
    category: "Elegir estado de formación",
    readMinutes: 6,
  },
  {
    locale: "en",
    slug: "ein-vs-itin",
    translatedSlug: "ein-o-itin",
    title: "EIN vs. ITIN: what your LLC needs and how to apply",
    seoTitle: "EIN vs. ITIN for a U.S. LLC",
    description:
      "Understand what an EIN and ITIN identify, how the IRS EIN application works and what international founders should prepare.",
    category: "EIN and business documents",
    readMinutes: 3,
  },
  {
    locale: "es",
    slug: "ein-o-itin",
    translatedSlug: "ein-vs-itin",
    title: "EIN e ITIN: diferencias y cómo solicitar el EIN de tu LLC",
    seoTitle: "EIN o ITIN: guía para tu LLC",
    description:
      "Conoce para qué sirve cada número, cómo funciona la solicitud del EIN ante el IRS y qué deben preparar los fundadores internacionales.",
    category: "EIN y documentos",
    readMinutes: 3,
  },
  {
    locale: "en",
    slug: "llc-for-non-us-residents",
    translatedSlug: "llc-para-no-residentes",
    title: "U.S. LLC for non-U.S. residents: requirements and formation",
    seoTitle: "U.S. LLC for Non-U.S. Residents",
    description:
      "Form a U.S. LLC from abroad: understand ownership, state choice, EIN applications, banking preparation and Valls Solutions' Wyoming package.",
    category: "International founders",
    readMinutes: 6,
  },
  {
    locale: "es",
    slug: "llc-para-no-residentes",
    translatedSlug: "llc-for-non-us-residents",
    title: "LLC para no residentes en Estados Unidos: requisitos y creación",
    seoTitle: "LLC para no residentes: requisitos",
    description:
      "Crea una LLC desde fuera de EE. UU.: conoce los requisitos, cómo elegir estado, el EIN, la preparación bancaria y el paquete de Wyoming.",
    category: "Emprendedores internacionales",
    readMinutes: 6,
  },
  {
    locale: "en",
    slug: "llc-taxes",
    translatedSlug: "llc-impuestos",
    title: "U.S. LLC taxes: classifications, elections and potential savings",
    seoTitle: "U.S. LLC Taxes: Rules & Potential Savings",
    description:
      "Learn how U.S. LLC tax classification works, which elections may affect a business and what owners should review with a tax professional.",
    category: "LLC taxes",
    readMinutes: 7,
  },
  {
    locale: "es",
    slug: "llc-impuestos",
    translatedSlug: "llc-taxes",
    title: "Impuestos de una LLC en EE. UU.: clasificación y opciones fiscales",
    seoTitle: "Impuestos de LLC: ¿puedes ahorrar?",
    description:
      "Aprende cómo se clasifica fiscalmente una LLC y qué elecciones pueden influir en los impuestos y declaraciones de cada negocio.",
    category: "Impuestos de LLC",
    readMinutes: 7,
  },
  {
    locale: "en",
    slug: "business-owner-thailand-visa",
    translatedSlug: "empresa-y-visados-tailandia",
    title: "Business owner and Thailand DTV: documents for business activity",
    seoTitle: "Thailand DTV: Business Records",
    description:
      "See which business records Thai DTV workcation checklists may request and how an operating company can document self-employment.",
    category: "Business and visas",
    readMinutes: 7,
  },
  {
    locale: "es",
    slug: "empresa-y-visados-tailandia",
    translatedSlug: "business-owner-thailand-visa",
    title:
      "Empresa y visado DTV de Tailandia: documentos para acreditar actividad",
    seoTitle: "DTV Tailandia: documentos de empresa",
    description:
      "Consulta qué documentos empresariales pueden pedir para el DTV tailandés y cómo una empresa operativa puede acreditar actividad propia.",
    category: "Empresa y visados",
    readMinutes: 7,
  },
  {
    locale: "en",
    slug: "llc-us-visa",
    translatedSlug: "llc-visado-estados-unidos",
    title: "U.S. LLCs and business visas: E-2 and L-1 considerations",
    seoTitle: "U.S. LLC and Business Visas: E-2, L-1",
    description:
      "Understand how a U.S. company relates to E-2 and L-1 visa categories, their business requirements and the role of immigration counsel.",
    category: "Business and visas",
    readMinutes: 6,
  },
  {
    locale: "es",
    slug: "llc-visado-estados-unidos",
    translatedSlug: "llc-us-visa",
    title: "LLC y visados de Estados Unidos: claves para E-2 y L-1",
    seoTitle: "LLC y visados de EE. UU.: E-2 y L-1",
    description:
      "Entiende cómo se relaciona una empresa estadounidense con las categorías E-2 y L-1, sus requisitos empresariales y el asesoramiento migratorio.",
    category: "Empresa y visados",
    readMinutes: 6,
  },
  {
    locale: "en",
    slug: "choosing-llc-formation-service",
    translatedSlug: "elegir-servicio-creacion-llc",
    title: "How to choose an LLC formation service: what to compare",
    seoTitle: "Choosing an LLC Formation Service",
    description:
      "Compare LLC formation packages, first-year services, renewal costs and support. See the Wyoming price and how to request another state's quote.",
    category: "Formation services",
    readMinutes: 5,
  },
  {
    locale: "es",
    slug: "elegir-servicio-creacion-llc",
    translatedSlug: "choosing-llc-formation-service",
    title: "Cómo elegir un servicio de creación de LLC: qué comparar",
    seoTitle: "Elegir un servicio de creación de LLC",
    description:
      "Compara paquetes de creación de LLC, servicios del primer año, renovación y atención directa. Consulta el precio de Wyoming y otros estados.",
    category: "Servicios de formación",
    readMinutes: 5,
  },
  {
    locale: "en",
    slug: "business-bank-account-llc",
    translatedSlug: "cuenta-bancaria-llc",
    title: "Business bank account for your LLC: a preparation checklist",
    seoTitle: "LLC Business Bank Account Checklist",
    description:
      "Prepare company documents, EIN confirmation and business details for your LLC account application, with guidance for U.S. and international founders.",
    category: "Business banking",
    readMinutes: 4,
  },
  {
    locale: "es",
    slug: "cuenta-bancaria-llc",
    translatedSlug: "business-bank-account-llc",
    title: "Cuenta bancaria para tu LLC: guía de preparación",
    seoTitle: "Cuenta bancaria para una LLC: guía",
    description:
      "Prepara documentos, confirmación del EIN e información del negocio para solicitar una cuenta empresarial desde EE. UU. o el extranjero.",
    category: "Banca empresarial",
    readMinutes: 4,
  },
  {
    locale: "en",
    slug: "wyoming-llc-annual-renewal",
    translatedSlug: "renovacion-anual-llc-wyoming",
    title: "Wyoming LLC annual renewal: report, agent and website",
    seoTitle: "Wyoming LLC Annual Renewal",
    description:
      "Understand Wyoming Annual Report timing and how the $449 renewal maintains your Registered Agent, mailing address and company website.",
    category: "Company maintenance",
    readMinutes: 4,
  },
  {
    locale: "es",
    slug: "renovacion-anual-llc-wyoming",
    translatedSlug: "wyoming-llc-annual-renewal",
    title: "Renovación anual de una LLC en Wyoming: qué incluye",
    seoTitle: "Renovación LLC Wyoming: Annual Report",
    description:
      "Conoce el calendario del Annual Report y qué mantiene la renovación de $449: agente registrado, dirección postal y web de empresa.",
    category: "Mantenimiento de empresas",
    readMinutes: 4,
  },
] as const;

export const BLOG_TOPICS: readonly BlogTopic[] = [
  {
    id: "formation",
    title: { en: "Form and structure your company", es: "Crear y estructurar tu empresa" },
    slugs: {
      en: [
        "wyoming-llc",
        "wyoming-vs-delaware-llc",
        "llc-for-non-us-residents",
        "ein-vs-itin",
        "choosing-llc-formation-service",
      ],
      es: [
        "llc-wyoming",
        "wyoming-o-delaware-llc",
        "llc-para-no-residentes",
        "ein-o-itin",
        "elegir-servicio-creacion-llc",
      ],
    },
  },
  {
    id: "operations",
    title: { en: "Banking and annual maintenance", es: "Banca y mantenimiento anual" },
    slugs: {
      en: ["business-bank-account-llc", "wyoming-llc-annual-renewal"],
      es: ["cuenta-bancaria-llc", "renovacion-anual-llc-wyoming"],
    },
  },
  {
    id: "taxes",
    title: { en: "LLC tax considerations", es: "Aspectos fiscales de una LLC" },
    slugs: { en: ["llc-taxes"], es: ["llc-impuestos"] },
  },
  {
    id: "visas",
    title: { en: "Business and visas", es: "Empresas y visados" },
    slugs: {
      en: ["business-owner-thailand-visa", "llc-us-visa"],
      es: ["empresa-y-visados-tailandia", "llc-visado-estados-unidos"],
    },
  },
];

export function findBlogArticle(
  locale: Locale,
  slug: string,
): BlogArticle | undefined {
  return BLOG_ARTICLES.find(
    (article) => article.locale === locale && article.slug === slug,
  );
}

export function listBlogArticles(locale: Locale): BlogArticle[] {
  return BLOG_ARTICLES.filter((article) => article.locale === locale);
}
