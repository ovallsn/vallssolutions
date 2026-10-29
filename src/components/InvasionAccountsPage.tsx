import Link from "next/link";
import Image from "next/image";
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

          <div className="invasion-hero-grid has-preview">
            <div className="invasion-hero-copy">
              <h1>
                {english ? "Invasion account listings" : "Cuentas de Invasion"}
              </h1>
              <p className="invasion-hero-lede">
                {english
                  ? "Compare profiles by login platform and review the stats shown for each account. Message us to confirm current availability, price and transfer details."
                  : "Compara los perfiles por plataforma de acceso y revisa los datos de cada cuenta. Escríbenos para confirmar disponibilidad, precio y detalles de la transferencia."}
              </p>
              <div className="invasion-hero-actions">
                {whatsapp && (
                  <a className="button button-dark" href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <ContactIcon name="whatsapp" />
                    {english ? "Ask about an account" : "Consultar una cuenta"}
                  </a>
                )}
                <a className="invasion-anchor-link" href="#available-accounts">
                  {english ? "Browse the listings" : "Ver el catálogo"}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="invasion-hero-note">
                {english
                  ? "Price and availability are confirmed by message. There is no online checkout; transfers are arranged directly."
                  : "El precio y la disponibilidad se confirman por mensaje. No hay pago online; la transferencia se coordina directamente."}
              </p>
            </div>

            <figure className="invasion-featured-listing">
              <div className="invasion-featured-media">
                <Image
                  src="/assets/invasion-accounts/mobile-strategy-stock.jpg"
                  alt={
                    english
                      ? "A player holding a smartphone with a strategy game on screen"
                      : "Una persona juega a un juego de estrategia en un teléfono móvil"
                  }
                  fill
                  priority
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 44vw, 500px"
                  unoptimized
                />
              </div>
              <figcaption className="invasion-featured-caption">
                <strong>{english ? "Mobile strategy" : "Estrategia móvil"}</strong>
                <span>{english ? "Illustrative photo" : "Imagen ilustrativa"}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="available-accounts" className="invasion-catalog invasion-shell" aria-labelledby="invasion-catalog-title">
        <header className="invasion-section-heading">
          <div>
            <h2 id="invasion-catalog-title">
              {english ? "Browse account listings" : "Catálogo de cuentas"}
            </h2>
          </div>
          <p>
            {english
              ? `Compare ${INVASION_LISTINGS.length} profiles across Google, Facebook and Tap4fun. Message us to confirm current availability, the full stats and price.`
              : `Compara ${INVASION_LISTINGS.length} perfiles de Google, Facebook y Tap4fun. Escríbenos para confirmar disponibilidad, todos los datos y el precio.`}
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
