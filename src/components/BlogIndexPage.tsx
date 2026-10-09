import Link from "next/link";
import { listBlogPosts } from "@/content/blog/articles";
import { BLOG_TOPICS } from "@/content/blog/catalog";
import { ContactActions } from "@/components/ContactActions";
import { ChevronIcon } from "@/components/ContactIcons";
import type { Locale } from "@/lib/site";

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const posts = listBlogPosts(locale);
  const featuredSlug = english ? "do-i-need-an-llc" : "necesito-una-llc";
  const featured = posts.find((post) => post.slug === featuredSlug);
  const remainingPosts = posts.filter((post) => post.slug !== featuredSlug);
  const topics = BLOG_TOPICS;

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
              {topic.title[locale]}
              <ChevronIcon />
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
            <span className="journal-arrow">
              <ChevronIcon />
            </span>
          </Link>
        )}
        {topics.map((topic) => (
          <section className="blog-topic-section" id={topic.id} key={topic.id}>
            <h2>{topic.title[locale]}</h2>
            <div className="journal-list">
              {remainingPosts
                .filter((post) => topic.slugs[locale].includes(post.slug))
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
                    <span className="journal-arrow">
                      <ChevronIcon />
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
            ctaLabel={
              english
                ? "Ask about LLC formation"
                : "Consultar sobre la formación de LLC"
            }
          />
        </div>
      </section>
    </main>
  );
}
