import Link from "next/link";
import { BlogPost, listBlogPosts } from "@/content/blog/articles";
import { ContactActions } from "@/components/ContactActions";
import { ChevronIcon } from "@/components/ContactIcons";
import { absoluteUrl, safeJsonLd, type Locale } from "@/lib/site";
import { blogMdxComponents } from "../../mdx-components";

export function BlogArticlePage({
  locale,
  post,
}: {
  locale: Locale;
  post: BlogPost;
}) {
  const english = locale === "en";
  const Content = post.Content;
  const postPath = `${english ? "" : "/es"}/blog/${post.slug}/`;
  const candidates = listBlogPosts(locale).filter(
    (article) => article.slug !== post.slug,
  );
  const relatedPosts = [
    ...candidates.filter((article) => article.category === post.category),
    ...candidates.filter((article) => article.category !== post.category),
  ].slice(0, 2);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(postPath),
    url: absoluteUrl(postPath),
    author: {
      "@type": "Organization",
      name: "Valls Solutions",
      url: absoluteUrl(english ? "/" : "/es/"),
    },
    publisher: {
      "@type": "Organization",
      name: "Valls Solutions",
      url: absoluteUrl(english ? "/" : "/es/"),
    },
  };

  return (
    <main id="contenido" className="journal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }}
      />
      <header className="section-shell page-hero journal-article-head">
        <p className="breadcrumbs">
          <Link href={english ? "/" : "/es/"}>
            {english ? "Home" : "Inicio"}
          </Link>{" "}
          /{" "}
          <Link href={english ? "/blog/" : "/es/blog/"}>
            {english ? "Guides" : "Guías"}
          </Link>
        </p>
        <p className="eyebrow">
          <span className="eyebrow-line" />
          {post.category}
        </p>
        <h1>{post.title}</h1>
        <p className="article-deck">{post.description}</p>
        <div className="article-byline">
          <span>{english ? "By Valls Solutions" : "Por Valls Solutions"}</span>
          <span>
            {post.readMinutes} {english ? "minute read" : "min de lectura"}
          </span>
        </div>
      </header>

      <section className="section-shell article-layout">
        <article className="article-copy">
          <Content components={blogMdxComponents} />
          <div className="article-related">
            <h2>{english ? "Continue exploring" : "Sigue leyendo"}</h2>
            {relatedPosts.map((article) => (
              <Link
                href={`${english ? "" : "/es"}/blog/${article.slug}/`}
                key={article.slug}
              >
                {article.title} <ChevronIcon />
              </Link>
            ))}
          </div>
        </article>
        <aside className="article-sidebar">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            {english
              ? "Your next business step"
              : "Tu siguiente paso empresarial"}
          </p>
          <h2>
            {english
              ? "Start your U.S. LLC."
              : "Crea tu LLC en Estados Unidos."}
          </h2>
          <p>
            {english
              ? "Our published $699 formation package and $449 annual renewal are for Wyoming. We also form LLCs in other states; email us to confirm the scope and price."
              : "El paquete publicado de $699 y la renovación anual de $449 corresponden a Wyoming. También creamos LLC en otros estados; escríbenos para confirmar el alcance y el precio."}
          </p>
          <Link
            className="text-link"
            href={english ? "/llc-formation/" : "/es/crear-llc/"}
          >
            {english ? "LLC formation details" : "Detalles de la formación LLC"}{" "}
            <ChevronIcon />
          </Link>
          <div className="article-related">
            <h2>{english ? "Questions?" : "¿Tienes dudas?"}</h2>
            <p>
              {english
                ? "Start with a short email. No documents are needed for an initial enquiry."
                : "Empieza con un email breve. No necesitas enviar documentos para una primera consulta."}
            </p>
            <ContactActions
              locale={locale}
              ctaLabel={
                english ? "Contact Valls Solutions" : "Contactar con Valls Solutions"
              }
            />
          </div>
        </aside>
      </section>
    </main>
  );
}
