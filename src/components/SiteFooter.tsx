import Link from "next/link";
import { CONTACT_EMAIL, type Locale } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const english = locale === "en";
  return (
    <footer className="site-footer">
      <div className="section-shell footer-main">
        <div className="footer-brand-col">
          <Link className="brand brand-footer" href={english ? "/" : "/es/"}>
            <span className="brand-mark" aria-hidden="true">V</span>
            <span>Valls <span className="brand-light">Solutions</span></span>
          </Link>
          <p>{english ? "Wyoming LLC formation and administrative support for founders in the U.S. and abroad." : "Formación de LLC en Wyoming y apoyo administrativo para fundadores en Estados Unidos y en el extranjero."}</p>
        </div>
        <div className="footer-nav">
          <strong>{english ? "Explore" : "Explora"}</strong>
          <Link href={english ? "/en/llc-formation/" : "/llc-formation/"}>{english ? "LLC formation" : "Formación de LLC"}</Link>
          <Link href={english ? "/en/pricing/" : "/pricing/"}>{english ? "Pricing" : "Precios"}</Link>
          <Link href={english ? "/en/blog/" : "/blog/"}>{english ? "Guides and blog" : "Guías y blog"}</Link>
          <Link href={english ? "/#process" : "/es/#proceso"}>{english ? "How it works" : "Cómo funciona"}</Link>
          <Link href={english ? "/en/contact/" : "/contacto/"}>{english ? "Contact / support" : "Contacto y soporte"}</Link>
        </div>
        <div className="footer-nav">
          <strong>{english ? "Contact" : "Contacto"}</strong>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <Link href={english ? "/es/" : "/"} lang={english ? "es" : "en"} hrefLang={english ? "es" : "en"}>
            {english ? "Versión en español" : "English version"}
          </Link>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© 2026 Valls Solutions LLC</span>
        <span>{english ? "Company formation and administrative support. We are not a law firm or CPA firm." : "Formación de empresas y apoyo administrativo. No somos un despacho legal ni una firma de CPA."}</span>
      </div>
    </footer>
  );
}
