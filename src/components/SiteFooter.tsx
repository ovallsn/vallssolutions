import Link from "next/link";
import { CLIENT_PORTAL_URL, CONTACT_EMAIL, type Locale } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const english = locale === "en";
  return (
    <footer className="site-footer">
      <div className="section-shell footer-main">
        <div className="footer-brand-col">
          <Link className="brand brand-footer" href={english ? "/" : "/es/"}>
            <img
              className="brand-mark"
              src="/assets/media/valls-single-ribbon-reverse.svg"
              alt=""
              aria-hidden="true"
            />
            <span className="brand-wordmark">Valls Solutions</span>
          </Link>
          <p>
            {english
              ? "Wyoming LLC formation and administrative support for founders in the U.S. and abroad."
              : "Formación de LLC en Wyoming y apoyo administrativo para fundadores en Estados Unidos y en el extranjero."}
          </p>
        </div>
        <div className="footer-nav">
          <strong>{english ? "Explore" : "Explora"}</strong>
          <Link href={english ? "/llc-formation/" : "/es/crear-llc/"}>
            {english ? "LLC formation" : "Formación de LLC"}
          </Link>
          <Link href={english ? "/pricing/" : "/es/precios/"}>
            {english ? "Pricing" : "Precios"}
          </Link>
          <Link href={english ? "/about/" : "/es/nosotros/"}>
            {english ? "About Valls Solutions" : "Sobre Valls Solutions"}
          </Link>
          <Link href={english ? "/blog/" : "/es/blog/"}>
            {english ? "Guides and blog" : "Guías y blog"}
          </Link>
          <Link href={english ? "/#process" : "/es/#proceso"}>
            {english ? "How it works" : "Cómo funciona"}
          </Link>
          <Link href={english ? "/contact/" : "/es/contacto/"}>
            {english ? "Contact / support" : "Contacto y soporte"}
          </Link>
          {CLIENT_PORTAL_URL && (
            <a
              href={CLIENT_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {english ? "Client portal" : "Área de clientes"}
            </a>
          )}
        </div>
        <div className="footer-nav">
          <strong>{english ? "Contact" : "Contacto"}</strong>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <span className="footer-contact-note">
            {english
              ? "Support in English and Spanish"
              : "Atención en español e inglés"}
          </span>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© 2026 Valls Solutions LLC</span>
        <span>
          {english
            ? "Company formation and administrative support. Consult a qualified professional for legal or tax advice."
            : "Formación de empresas y apoyo administrativo. Para asesoramiento legal o fiscal, consulta a un profesional cualificado."}
        </span>
      </div>
    </footer>
  );
}
