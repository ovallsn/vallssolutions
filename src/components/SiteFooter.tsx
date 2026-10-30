import Link from "next/link";
import { ConsentPreferencesButton } from "@/components/ConsentManager";
import { ContactIcon } from "@/components/ContactIcons";
import { CLIENT_PORTAL_URL, CONTACT_EMAIL, LINE_ID, lineHref, mailtoHref, type Locale, whatsappHref } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const whatsapp = whatsappHref(locale);
  const line = lineHref();
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
              ? "U.S. LLC formation and business support for founders in the U.S. and around the world."
              : "Creación de LLC en Estados Unidos y apoyo empresarial para fundadores de cualquier país."}
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
            {english ? "Start with a message" : "Empecemos por un mensaje"}
          </strong>
          <div className="footer-contact-links">
            <a className="footer-contact-link" href={mailtoHref(locale)}>
              <ContactIcon name="mail" />
              <span>{CONTACT_EMAIL}</span>
            </a>
            {whatsapp && (
              <a className="footer-contact-link" href={whatsapp} target="_blank" rel="noopener noreferrer">
                <ContactIcon name="whatsapp" />
                <span>WhatsApp Business</span>
              </a>
            )}
            <a className="footer-contact-link" href={line} target="_blank" rel="noopener noreferrer">
              <ContactIcon name="line" />
              <span>LINE · {LINE_ID}</span>
            </a>
          </div>
          <ConsentPreferencesButton locale={locale} />
        </div>
      </div>
      <div className="section-shell footer-scope-note">
        <span className="footer-scope-label">
          {english ? "SERVICE SCOPE" : "ALCANCE DEL SERVICIO"}
        </span>
        <p className="footer-disclaimer">
          {english
            ? "Valls Solutions provides company formation and administrative support. For legal or tax advice specific to your situation, consult a qualified professional."
            : "Valls Solutions ofrece servicios de formación de empresas y apoyo administrativo. Para asesoramiento legal o fiscal específico, consulta a un profesional cualificado."}
        </p>
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
      </div>
    </footer>
  );
}
