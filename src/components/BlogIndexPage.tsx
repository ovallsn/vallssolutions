import Link from "next/link";
import { listBlogPosts } from "@/content/blog/articles";
import type { Locale } from "@/lib/site";

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const posts = listBlogPosts(locale);

  return (
    <main id="contenido" className="journal-page">
      <header className="section-shell page-hero journal-article-head">
        <p className="breadcrumbs">{english ? "Home" : "Inicio"} / {english ? "Guides" : "Guías"}</p>
        <p className="eyebrow"><span className="eyebrow-line" />{english ? "The Valls Solutions journal" : "El blog de Valls Solutions"}</p>
        <h1>{english ? "Practical guides to starting a U.S. company." : "Guías prácticas para crear una empresa en Estados Unidos."}</h1>
        <p className="article-deck">{english ? "Clear information on Wyoming LLCs, formation, taxes and business operations—written to help you ask better questions before you start." : "Información clara sobre LLC en Wyoming, constitución, impuestos y gestión empresarial, para que puedas decidir con mejores datos."}</p>
      </header>

      <section className="section-shell section-block" aria-label={english ? "All guides" : "Todas las guías"}>
        <div className="journal-list">
          {posts.map((post, index) => (
            <Link className="journal-entry" href={`${english ? "/en" : ""}/blog/${post.slug}/`} key={post.slug}>
              <span className="journal-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="journal-category">{post.category} · {post.readMinutes} {english ? "MIN READ" : "MIN DE LECTURA"}</p>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </div>
              <span className="journal-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
