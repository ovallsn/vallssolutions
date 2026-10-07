import Link from "next/link";
import { listBlogPosts } from "@/content/blog/articles";
import { ContactActions } from "@/components/ContactActions";
import type { Locale } from "@/lib/site";

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const posts = listBlogPosts(locale);
  const featuredSlug = english ? "do-i-need-an-llc" : "necesito-una-llc";
  const featured = posts.find((post) => post.slug === featuredSlug);
  const remainingPosts = posts.filter((post) => post.slug !== featuredSlug);
  const topics = [
    {
      id: "formation",
      title: english
        ? "Start and structure your company"
        : "Crea y estructura tu empresa",
      slugs: english
        ? [
            "wyoming-llc",
            "llc-for-non-us-residents",
            "ein-vs-itin",
            "choosing-llc-formation-service",
          ]
        : [
            "llc-wyoming",
            "llc-para-no-residentes",
            "ein-o-itin",
            "elegir-servicio-creacion-llc",
          ],
    },
    {
      id: "operations",
      title: english
        ? "Banking and annual maintenance"
        : "Banca y mantenimiento anual",
      slugs: english
        ? ["business-bank-account-llc", "wyoming-llc-annual-renewal"]
        : ["cuenta-bancaria-llc", "renovacion-anual-llc-wyoming"],
    },
    {
      id: "planning",
      title: english
        ? "Taxes and international business planning"
        : "Impuestos y planificación internacional",
      slugs: english
        ? ["llc-taxes", "business-owner-thailand-visa", "llc-us-visa"]
        : [
            "llc-impuestos",
            "empresa-y-visados-tailandia",
            "llc-visado-estados-unidos",
          ],
    },
  ];

  return (
    <main id="contenido" className="journal-page">
      <header className="section-shell page-hero journal-article-head">
        <p className="breadcrumbs">
          <Link href={english ? "/" : "/es/"}>
            {english ? "Home" : "Inicio"}
          </Link>{" "}
          / {english ? "Guides" : "Guías"}
        </p>
        <p className="eyebrow">
          <span className="eyebrow-line" />
          {english
            ? "Business guides from Valls Solutions"
            : "Guías empresariales de Valls Solutions"}
        </p>
        <h1>
          {english
            ? "U.S. LLC guides for your next business step."
            : "Guías sobre LLC para tu siguiente paso empresarial."}
        </h1>
        <p className="article-deck">
          {english
            ? "Understand the benefits, the paperwork and the next steps—from forming your LLC to preparing a business account and managing year two."
            : "Entiende las ventajas, los documentos y los siguientes pasos: desde crear tu LLC hasta preparar una cuenta empresarial y gestionar el segundo año."}
        </p>
        <nav
          className="blog-topic-nav"
          aria-label={english ? "Guide topics" : "Temas de las guías"}
        >
          {topics.map((topic) => (
            <a key={topic.id} href={`#${topic.id}`}>
              {topic.title}
              <span aria-hidden="true"> ↓</span>
            </a>
          ))}
        </nav>
      </header>

      <section
        className="section-shell section-block"
        aria-label={english ? "All guides" : "Todas las guías"}
      >
        {featured && (
          <Link
            className="featured-guide blog-featured-guide"
            href={`${english ? "" : "/es"}/blog/${featured.slug}/`}
          >
            <span className="featured-guide-label">
              {english ? "Start here" : "Empieza aquí"}
            </span>
            <div>
              <p className="journal-category">
                {featured.category} · {featured.readMinutes}{" "}
                {english ? "MIN READ" : "MIN DE LECTURA"}
              </p>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
            </div>
            <span className="journal-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        )}
        {topics.map((topic) => (
          <section className="blog-topic-section" id={topic.id} key={topic.id}>
            <h2>{topic.title}</h2>
            <div className="journal-list">
              {remainingPosts
                .filter((post) => topic.slugs.includes(post.slug))
                .map((post, index) => (
                  <Link
                    className="journal-entry"
                    href={`${english ? "" : "/es"}/blog/${post.slug}/`}
                    key={post.slug}
                  >
                    <span className="journal-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="journal-category">
                        {post.category} · {post.readMinutes}{" "}
                        {english ? "MIN READ" : "MIN DE LECTURA"}
                      </p>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                    </div>
                    <span className="journal-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </section>

      <section className="closing-cta">
        <div className="section-shell closing-layout">
          <div>
            <p className="eyebrow eyebrow-light">
              <span className="eyebrow-line" />
              {english
                ? "Ready to form your LLC?"
                : "¿Listo para crear tu LLC?"}
            </p>
            <h2>
              {english
                ? "Turn the next step into a simple conversation."
                : "Convierte tu siguiente paso en una conversación sencilla."}
            </h2>
            <p>
              {english
                ? "Tell us what you are building and where you are based. We will explain the formation package and what to expect."
                : "Cuéntanos qué negocio estás creando y dónde resides. Te explicaremos el paquete de formación y qué puedes esperar."}
            </p>
          </div>
          <ContactActions
            locale={locale}
            emailLabel={
              english
                ? "Email about LLC formation"
                : "Escribir sobre la formación de LLC"
            }
          />
        </div>
      </section>
    </main>
  );
}
