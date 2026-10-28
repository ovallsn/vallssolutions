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
            <div className="invasion-hero-copy">
              <p className="invasion-eyebrow">
                <span aria-hidden="true" />
                {english ? "Invasion account listings" : "Cuentas de Invasion"}
              </p>
              <h1>
                {english ? (
                  <>Find your next <em>Invasion account.</em></>
                ) : (
                  <>Encuentra tu próxima <em>cuenta de Invasion.</em></>
                )}
              </h1>
              <p className="invasion-hero-lede">
                {english
                  ? "Compare the account details available, then message us to confirm current availability, price and transfer steps. Every sale is arranged directly; there is no online checkout."
                  : "Compara los datos disponibles y escríbenos para confirmar disponibilidad, precio y cómo se realiza la transferencia. La venta se coordina directamente, sin pago online."}
              </p>
              <div className="invasion-hero-actions">
                {whatsapp && (
                  <a className="button button-dark" href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <ContactIcon name="whatsapp" />
                    {english ? "Ask on WhatsApp" : "Consultar por WhatsApp"}
                  </a>
                )}
                <a className="invasion-anchor-link" href="#available-accounts">
                  {english ? "Browse accounts" : "Ver cuentas"}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <aside className="invasion-process-note" aria-label={english ? "How inquiries work" : "Cómo consultar"}>
              <div className="invasion-process-topline">
                <span>{english ? "DIRECT INQUIRIES" : "CONSULTA DIRECTA"}</span>
                <span aria-hidden="true">01 — 03</span>
              </div>
              <p className="invasion-process-title">
                {english ? "A clear listing. A real conversation." : "Datos claros. Conversación directa."}
              </p>
              <ol>
                <li>
                  <span>01</span>
                  {english ? "Choose a listing" : "Elige una cuenta"}
                </li>
                <li>
                  <span>02</span>
                  {english ? "Ask for price and full stats" : "Pregunta por el precio y todos los datos"}
                </li>
                <li>
                  <span>03</span>
                  {english ? "Agree on the transfer directly" : "Coordina la transferencia directamente"}
                </li>
              </ol>
              <p className="invasion-process-footnote">
                {english
                  ? "Commander and HQ levels are shown when available."
                  : "Los niveles de comandante y HQ se muestran cuando están disponibles."}
              </p>
            </aside>
          </div>

          <div className="invasion-hero-facts" aria-label={english ? "Listing details" : "Detalles del catálogo"}>
            <div>
              <span className="invasion-fact-index">A</span>
              <p>{english ? "Account details" : "Datos de la cuenta"}<small>{english ? "Power, commander, HQ, VIP and resources" : "Poder, comandante, HQ, VIP y recursos"}</small></p>
            </div>
            <div>
              <span className="invasion-fact-index">B</span>
              <p>{english ? "Price by message" : "Precio por mensaje"}<small>{english ? "Confirm availability before deciding" : "Confirma disponibilidad antes de decidir"}</small></p>
            </div>
            <div>
              <span className="invasion-fact-index">C</span>
              <p>{english ? "Manual transfer" : "Transferencia manual"}<small>{english ? "No automated payment or checkout" : "Sin pago automatizado ni proceso de compra"}</small></p>
            </div>
          </div>
        </div>
      </section>

      <section id="available-accounts" className="invasion-catalog invasion-shell" aria-labelledby="invasion-catalog-title">
        <header className="invasion-section-heading">
          <div>
            <p className="invasion-section-kicker">{english ? "THE CATALOGUE" : "EL CATÁLOGO"}</p>
            <h2 id="invasion-catalog-title">
              {english ? "Available account profiles" : "Perfiles de cuenta"}
            </h2>
          </div>
          <p>
            {english
              ? `Browse ${INVASION_LISTINGS.length} account profiles across three login methods. We show power, commander and HQ levels, plus the other figures available for each listing. Message us to confirm availability, price and any additional details.`
              : `Consulta ${INVASION_LISTINGS.length} perfiles de cuenta con tres métodos de acceso. Mostramos el poder, los niveles de comandante y HQ, y los demás datos disponibles de cada cuenta. Escríbenos para confirmar disponibilidad, precio y cualquier detalle adicional.`}
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
