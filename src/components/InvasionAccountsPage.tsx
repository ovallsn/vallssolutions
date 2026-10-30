import Link from "next/link";
import { INVASION_LISTINGS } from "@/content/invasion-listings";
import { ContactIcon } from "@/components/ContactIcons";
import { InvasionCatalog } from "@/components/InvasionCatalog";
import { CONTACT_EMAIL, whatsappHref, type Locale } from "@/lib/site";
import { invasionLineHref, INVASION_LINE_ID } from "@/lib/invasion-contact";
import { ROUTES } from "@/lib/routes";

export function InvasionAccountsPage({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const homePath = ROUTES.home[locale];
  const formationPath = ROUTES.formation[locale];
  const whatsapp = whatsappHref(
    locale,
    english
      ? "Hello, I have a question about the Invasion account listings."
      : "Hola, tengo una consulta sobre las cuentas de Invasion.",
  );

  return (
    <main id="contenido" className="invasion-page">
      <section id="available-accounts" className="invasion-catalog" aria-labelledby="invasion-page-title">
        <div className="invasion-shell">
          <nav className="invasion-breadcrumbs" aria-label={english ? "Breadcrumb" : "Ruta de navegación"}>
            <Link href={homePath}>{english ? "Home" : "Inicio"}</Link>
            <span aria-hidden="true">/</span>
            <span>{english ? "Invasion accounts" : "Cuentas de Invasion"}</span>
          </nav>

          <header className="invasion-catalog-intro">
            <h1 id="invasion-page-title">
              {english ? "Invasion Gifters account listings" : "Cuentas de Invasion Gifters"}
            </h1>
            <div className="invasion-catalog-summary">
              <p>
                {english
                  ? "Explore Invasion accounts with Google, Facebook or Tap4fun logins. Compare Commander level, HQ level, VIP, diamonds, resources and Zone Passes. Message us to confirm availability and pricing."
                  : "Explora cuentas de Invasion con acceso mediante Google, Facebook o Tap4fun. Compara el nivel de comandante, el nivel de HQ, VIP, diamantes, recursos y Zone Passes. Escríbenos para confirmar disponibilidad y precio."}
              </p>
              <div className="invasion-catalog-contact-options">
                {whatsapp && (
                  <a className="invasion-catalog-contact-link" href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <ContactIcon name="whatsapp" />
                    {english ? "Ask about an account" : "Consultar una cuenta"}
                  </a>
                )}
                <a
                  className="invasion-catalog-contact-link"
                  href={invasionLineHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={english ? `Message us on LINE about an Invasion account. LINE ID: ${INVASION_LINE_ID}` : `Escríbenos por LINE sobre una cuenta de Invasion. ID de LINE: ${INVASION_LINE_ID}`}
                >
                  <ContactIcon name="line" />
                  {english ? "Message on LINE" : "Escribir por LINE"}
                </a>
              </div>
            </div>
          </header>

          <InvasionCatalog locale={locale} listings={INVASION_LISTINGS} />
        </div>
      </section>

      <section className="invasion-contact-band">
        <div className="invasion-shell invasion-contact-layout">
          <div>
            <p className="invasion-section-kicker">{english ? "NEXT STEP" : "SIGUIENTE PASO"}</p>
            <h2>{english ? "Want the complete details?" : "¿Quieres ver todos los detalles?"}</h2>
            <p>
              {english
                ? "Send the listing code. We will confirm whether it is still available, share the price and answer your questions before any transfer is arranged."
                : "Envíanos el código de la cuenta. Confirmaremos si sigue disponible, te diremos el precio y resolveremos tus dudas antes de coordinar la transferencia."}
            </p>
          </div>
          <div className="invasion-contact-actions">
            {whatsapp && (
              <a className="button button-light" href={whatsapp} target="_blank" rel="noopener noreferrer">
                <ContactIcon name="whatsapp" />
                {english ? "Message on WhatsApp" : "Escribir por WhatsApp"}
              </a>
            )}
            <a
              className="invasion-line-link"
              href={invasionLineHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={english ? `Message about an Invasion account on LINE. LINE ID: ${INVASION_LINE_ID}` : `Escribir por LINE sobre una cuenta de Invasion. ID de LINE: ${INVASION_LINE_ID}`}
            >
              <ContactIcon name="line" />
              <span>{english ? `Message on LINE · ${INVASION_LINE_ID}` : `Escribir por LINE · ${INVASION_LINE_ID}`}</span>
            </a>
            <a className="invasion-email-link" href={`mailto:${CONTACT_EMAIL}`}>
              <ContactIcon name="mail" /> {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </section>

      <aside className="invasion-business-bridge invasion-shell">
        <span className="invasion-bridge-mark" aria-hidden="true">V</span>
        <div>
          <p className="invasion-section-kicker">{english ? "A DIFFERENT BUSINESS QUESTION?" : "¿BUSCAS OTRO SERVICIO EMPRESARIAL?"}</p>
          <h2>{english ? "Explore Valls Solutions." : "Conoce Valls Solutions."}</h2>
          <p>
            {english
              ? "We also help founders form LLCs in Wyoming and other U.S. states."
              : "También ayudamos a emprendedores a crear LLC en Wyoming y otros estados de EE. UU."}
          </p>
        </div>
        <Link href={formationPath}>
          {english ? "U.S. LLC formation" : "Creación de LLC en EE. UU."}
          <span aria-hidden="true">↗</span>
        </Link>
      </aside>

      <p className="invasion-trademark-note">
        {english
          ? "Invasion is a game title. Account availability, price and transfer details are confirmed directly with the seller."
          : "Invasion es el nombre del juego. La disponibilidad, el precio y los detalles de transferencia se confirman directamente con el vendedor."}
      </p>
    </main>
  );
}
