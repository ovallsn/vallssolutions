import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL_DOCUMENTS, type LegalDocumentKey, type LegalText } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import type { Locale } from "@/lib/site";

const routeForDocument = {
  legalNotice: "legalNotice",
  privacy: "privacy",
  cookies: "cookies",
  terms: "terms",
} as const;

function renderText(parts: LegalText[]) {
  return parts.map((part, index) => {
    if (typeof part === "string") return part;
    if (part.href.startsWith("/")) {
      return <Link href={part.href} key={`${part.href}-${index}`}>{part.label}</Link>;
    }
    const external = part.href.startsWith("https://") || part.href.startsWith("http://");
    return <a href={part.href} key={`${part.href}-${index}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{part.label}</a>;
  });
}

export function legalMetadata(locale: Locale, document: LegalDocumentKey): Metadata {
  const routeKey = routeForDocument[document];
  const ownPath = ROUTES[routeKey][locale];
  const translatedPath = ROUTES[routeKey][locale === "en" ? "es" : "en"];
  const content = LEGAL_DOCUMENTS[document][locale];

  return pageMetadata({
    locale,
    path: ownPath,
    translatedPath,
    title: content.title,
    description: content.description,
  });
}

export function LegalDocumentPage({ locale, document }: { locale: Locale; document: LegalDocumentKey }) {
  const english = locale === "en";
  const content = LEGAL_DOCUMENTS[document][locale];

  return (
    <main id="contenido" className="legal-page">
      <header className="section-shell page-hero legal-hero">
        <p className="breadcrumbs"><Link href={english ? "/" : "/es/"}>{english ? "Home" : "Inicio"}</Link> / {content.title}</p>
        <p className="eyebrow"><span className="eyebrow-line" />{english ? "Valls Solutions · legal information" : "Valls Solutions · información legal"}</p>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
        <p className="legal-updated">{content.updated}</p>
      </header>
      <div className="section-shell legal-document">
        {content.sections.map((section, index) => (
          <section className="legal-section" key={section.heading} aria-labelledby={`legal-section-${index}`}>
            <h2 id={`legal-section-${index}`}>{section.heading}</h2>
            <div className="legal-section-copy">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{renderText(paragraph)}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item, itemIndex) => <li key={itemIndex}>{renderText(item)}</li>)}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
