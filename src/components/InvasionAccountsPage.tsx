import Link from "next/link";
import { INVASION_LISTINGS } from "@/content/invasion-listings";
import { ContactIcon } from "@/components/ContactIcons";
import { InvasionCatalog } from "@/components/InvasionCatalog";
import { CONTACT_EMAIL, whatsappHref, type Locale } from "@/lib/site";
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
      <section className="invasion-hero">
        <div className="invasion-shell">
          <nav className="invasion-breadcrumbs" aria-label={english ? "Breadcrumb" : "Ruta de navegación"}>
            <Link href={homePath}>{english ? "Home" : "Inicio"}</Link>
            <span aria-hidden="true">/</span>
            <span>{english ? "Invasion accounts" : "Cuentas de Invasion"}</span>
          </nav>

          <div className="invasion-hero-grid">
            <div className="invasion-hero-title">
              <h1>
                <span>Invasion Gifters</span>
                <em>{english ? "account listings" : "catálogo de cuentas"}</em>
              </h1>
            </div>

            <div className="invasion-hero-copy">
              <p className="invasion-hero-lede">
                {english
                  ? "Browse listings across Google, Facebook and Tap4fun. Compare power, Commander level, HQ level, VIP, diamonds, resources and Zone Passes. Message us to confirm current availability, price and transfer details."
                  : "Explora perfiles de Google, Facebook y Tap4fun. Compara poder, nivel de comandante, nivel de HQ, VIP, diamantes, recursos y Zone Passes. Escríbenos para confirmar disponibilidad, precio y detalles de la transferencia."}
              </p>
              <div className="invasion-hero-actions">
                {whatsapp && (
                  <a className="button button-dark" href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <ContactIcon name="whatsapp" />
                    {english ? "Ask about an account" : "Consultar una cuenta"}
                  </a>
                )}
                <a className="invasion-anchor-link" href="#available-accounts">
                  {english ? "Explore the listings" : "Explorar el catálogo"}
                </a>
              </div>
              <p className="invasion-hero-note">
                {english
                  ? "No online checkout. Each sale is arranged directly after you confirm the account details."
                  : "No hay pago online. Cada venta se coordina directamente después de confirmar los datos de la cuenta."}
              </p>
            </div>

            <dl className="invasion-hero-index">
              <div>
                <dt>{english ? "Login platforms" : "Plataformas"}</dt>
                <dd>Google <span aria-hidden="true">·</span> Facebook <span aria-hidden="true">·</span> Tap4fun</dd>
              </div>
              <div>
                <dt>{english ? "Account details" : "Datos de cuenta"}</dt>
                <dd>
                  {english
                    ? "Power · Commander · HQ · VIP · Diamonds · Resources · Zone Passes"
                    : "Poder · Comandante · HQ · VIP · Diamantes · Recursos · Zone Passes"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="available-accounts" className="invasion-catalog invasion-shell" aria-labelledby="invasion-catalog-title">
        <header className="invasion-section-heading">
          <div>
            <h2 id="invasion-catalog-title">
              {english ? "Available account listings" : "Cuentas disponibles"}
            </h2>
          </div>
          <p>
            {english
              ? `Browse ${INVASION_LISTINGS.length} profiles across three login platforms. Ask us about any detail marked “Ask” and confirm availability before arranging a transfer.`
              : `Consulta ${INVASION_LISTINGS.length} perfiles de tres plataformas. Pregúntanos por cualquier dato marcado como «Consultar» y confirma la disponibilidad antes de coordinar la transferencia.`}
          </p>
        </header>

        <InvasionCatalog locale={locale} listings={INVASION_LISTINGS} />
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
