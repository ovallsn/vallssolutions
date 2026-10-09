import Link from "next/link";
import { ConsentPreferencesButton } from "@/components/ConsentManager";
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
              src="/assets/media/valls-single-ribbon.svg"
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
        <nav
          className="footer-nav footer-explore"
          aria-label={english ? "Explore Valls Solutions" : "Explora Valls Solutions"}
        >
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
        </nav>
        <div className="footer-contact-col">
          <strong className="footer-contact-eyebrow">
            {english ? "Start with a note" : "Empecemos por un mensaje"}
          </strong>
          <a className="footer-email-link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <ConsentPreferencesButton locale={locale} />
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span className="footer-copyright">© 2026 Valls Solutions LLC</span>
        <nav
          className="footer-legal"
          aria-label={english ? "Legal information" : "Información legal"}
        >
          <Link href={english ? "/legal-notice/" : "/es/aviso-legal/"}>
            {english ? "Legal notice" : "Aviso legal"}
          </Link>
          <Link href={english ? "/privacy/" : "/es/privacidad/"}>
            {english ? "Privacy" : "Privacidad"}
          </Link>
          <Link href={english ? "/cookies/" : "/es/cookies/"}>
            Cookies
          </Link>
          <Link href={english ? "/terms/" : "/es/terminos/"}>
            {english ? "Terms" : "Términos"}
          </Link>
        </nav>
        <span className="footer-disclaimer">
          {english
            ? "Company formation and administrative support. Consult a qualified professional for legal or tax advice."
            : "Formación de empresas y apoyo administrativo. Para asesoramiento legal o fiscal, consulta a un profesional cualificado."}
        </span>
      </div>
    </footer>
  );
}
