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
    locale: "es",
    slug: "ein-o-itin",
    translatedSlug: "ein-vs-itin",
    title: "EIN e ITIN: qué necesita tu LLC y qué cambia si vives fuera de EE. UU.",
    description: "Diferencias entre EIN e ITIN, requisitos de la solicitud online y opciones para responsables sin SSN o ITIN. Guía con fuentes del IRS.",
    category: "EIN y trámites",
    readMinutes: 3,
  },
  {
    locale: "en",
    slug: "ein-vs-itin",
    translatedSlug: "ein-o-itin",
    title: "EIN vs. ITIN: what your LLC needs and what changes for non-U.S. founders",
    description: "Understand EIN and ITIN differences, online application requirements and options without an SSN or ITIN, with official IRS sources.",
    category: "EIN and paperwork",
    readMinutes: 3,
  },
  {
    locale: "es",
    slug: "llc-wyoming",
    translatedSlug: "wyoming-llc",
    title: "LLC en Wyoming: ventajas y cuándo no conviene",
    description: "Conoce los costes, obligaciones y situaciones en que una LLC de Wyoming puede ser adecuada o añadir trámites a tu negocio.",
    category: "Wyoming",
    readMinutes: 5,
  },
  {
    locale: "es",
    slug: "llc-en-estados-unidos",
    translatedSlug: "us-llc",
    title: "Por qué crear una LLC en Estados Unidos: ventajas y obligaciones",
    description: "Qué puede aportar una LLC estadounidense a un negocio y qué debes revisar antes de constituirla desde EE. UU. o desde otro país.",
    category: "Formación de empresas",
    readMinutes: 6,
  },
  {
    locale: "es",
    slug: "llc-impuestos",
    translatedSlug: "llc-taxes",
    title: "¿Una LLC puede ayudarte a pagar menos impuestos? Lo que debes saber",
    description: "La LLC no garantiza pagar menos impuestos. Entiende su clasificación fiscal, las obligaciones informativas y qué analizar con un asesor.",
    category: "Impuestos",
    readMinutes: 7,
  },
  {
    locale: "es",
    slug: "llc-visado-estados-unidos",
    translatedSlug: "llc-us-visa",
    title: "¿Una LLC ayuda a conseguir una visa de Estados Unidos?",
    description: "Una LLC no concede un visado. Repasamos por qué algunas categorías migratorias exigen inversión, actividad o una relación empresarial concreta.",
    category: "Empresa y visados",
    readMinutes: 6,
  },
  {
    locale: "es",
    slug: "empresa-y-visados-tailandia",
    translatedSlug: "business-owner-thailand-visa",
    title: "¿Tener una empresa ayuda a obtener un visado en Tailandia?",
    description: "Una empresa real puede servir como prueba en algunos expedientes, pero una LLC estadounidense no garantiza un visado tailandés.",
    category: "Empresa y visados",
    readMinutes: 7,
  },
  {
    locale: "en",
    slug: "wyoming-llc",
    translatedSlug: "llc-wyoming",
    title: "Wyoming LLC: benefits and when it may not fit",
    description: "Review the costs, obligations and situations where a Wyoming LLC may suit your business or add another layer of compliance.",
    category: "Wyoming",
    readMinutes: 5,
  },
  {
    locale: "en",
    slug: "us-llc",
    translatedSlug: "llc-en-estados-unidos",
    title: "Why form an LLC in the United States? Benefits and obligations",
    description: "What a U.S. LLC may offer a business and what to review before forming one from the U.S. or another country.",
    category: "Company formation",
    readMinutes: 6,
  },
  {
    locale: "en",
    slug: "llc-taxes",
    translatedSlug: "llc-impuestos",
    title: "Can an LLC help you pay less tax? What to know first",
    description: "An LLC does not guarantee tax savings. Understand its tax classification, reporting duties and what to review with an adviser.",
    category: "Taxes",
    readMinutes: 7,
  },
  {
    locale: "en",
    slug: "llc-us-visa",
    translatedSlug: "llc-visado-estados-unidos",
    title: "Can an LLC help you get a U.S. visa?",
    description: "An LLC does not grant a visa. Learn why some immigration categories require investment, active operations or a qualifying business relationship.",
    category: "Business and visas",
    readMinutes: 6,
  },
  {
    locale: "en",
    slug: "business-owner-thailand-visa",
    translatedSlug: "empresa-y-visados-tailandia",
    title: "Can owning a business help with a Thailand visa?",
    description: "A real business may support some applications, but a U.S. LLC alone does not guarantee a Thai visa.",
    category: "Business and visas",
    readMinutes: 7,
  },
] as const;

export function findBlogArticle(locale: Locale, slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.locale === locale && article.slug === slug);
}

export function listBlogArticles(locale: Locale): BlogArticle[] {
  return BLOG_ARTICLES.filter((article) => article.locale === locale);
}
