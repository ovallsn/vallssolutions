import Link from "next/link";
import { BlogPost, listBlogPosts } from "@/content/blog/articles";
import { ContactActions } from "@/components/ContactActions";
import { absoluteUrl, safeJsonLd, type Locale } from "@/lib/site";

export function BlogArticlePage({ locale, post }: { locale: Locale; post: BlogPost }) {
  const english = locale === "en";
  const Content = post.Content;
  const postPath = `${english ? "/en" : ""}/blog/${post.slug}/`;
  const relatedPosts = listBlogPosts(locale).filter((article) => article.slug !== post.slug).slice(0, 2);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    inLanguage: locale,
    mainEntityOfPage: absoluteUrl(postPath),
    url: absoluteUrl(postPath),
    author: { "@type": "Organization", name: "Valls Solutions", url: absoluteUrl(english ? "/en/" : "/") },
    publisher: { "@type": "Organization", name: "Valls Solutions", url: absoluteUrl(english ? "/en/" : "/") },
  };

  return (
    <main id="contenido" className="journal-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }} />
      <header className="section-shell page-hero journal-article-head">
        <p className="breadcrumbs"><Link href={english ? "/en/" : "/"}>{english ? "Home" : "Inicio"}</Link> / <Link href={english ? "/en/blog/" : "/blog/"}>{english ? "Guides" : "Guías"}</Link></p>
        <p className="eyebrow"><span className="eyebrow-line" />{post.category}</p>
        <h1>{post.title}</h1>
        <p className="article-deck">{post.description}</p>
        <div className="article-byline">
          <span>{english ? "By Valls Solutions" : "Por Valls Solutions"}</span>
          <span>{post.readMinutes} {english ? "minute read" : "min de lectura"}</span>
        </div>
      </header>

      <section className="section-shell article-layout">
        <article className="article-copy">
          <Content />
          <div className="article-related">
            <h2>{english ? "Continue exploring" : "Sigue leyendo"}</h2>
            {relatedPosts.map((article) => (
              <Link href={`${english ? "/en" : ""}/blog/${article.slug}/`} key={article.slug}>{article.title} <span aria-hidden="true">↗</span></Link>
            ))}
          </div>
        </article>
        <aside className="article-sidebar">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "Considering a Wyoming LLC?" : "¿Estás valorando una LLC en Wyoming?"}</p>
          <h2>{english ? "Understand the service before you start." : "Conoce el servicio antes de empezar."}</h2>
          <p>{english ? "See what the $699 formation package includes and how the $449 renewal works from year two." : "Consulta qué incluye la formación de $699 y cómo funciona la renovación de $449 desde el segundo año."}</p>
          <Link className="text-link" href={english ? "/en/llc-formation/" : "/llc-formation/"}>{english ? "LLC formation details" : "Detalles de la formación LLC"} <span aria-hidden="true">↗</span></Link>
          <div className="article-related">
            <h2>{english ? "Questions?" : "¿Tienes dudas?"}</h2>
            <p>{english ? "Start with a short email. No documents are needed for an initial enquiry." : "Empieza con un email breve. No necesitas enviar documentos para una primera consulta."}</p>
            <ContactActions locale={locale} emailLabel={english ? "Email Valls Solutions" : "Escribir a Valls Solutions"} />
          </div>
        </aside>
      </section>
    </main>
  );
}
