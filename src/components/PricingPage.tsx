import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { PriceCard } from "@/components/PriceCard";
import type { Locale } from "@/lib/site";

export function PricingPage({ locale }: { locale: Locale }) {
  const english = locale === "en";

  return (
    <main id="contenido">
      <header className="section-shell page-hero">
        <p className="breadcrumbs"><Link href={english ? "/" : "/es/"}>{english ? "Home" : "Inicio"}</Link> / {english ? "Pricing" : "Precios"}</p>
        <p className="eyebrow"><span className="eyebrow-line" />{english ? "Wyoming LLC · clear costs" : "LLC en Wyoming · costes claros"}</p>
        <h1>{english ? "One formation price. A clear annual renewal." : "Un precio de formación. Una renovación anual clara."}</h1>
        <p>{english ? "See what is included in the first year, what renews from year two, with the Annual Report state tax included." : "Consulta qué incluye el primer año, qué se renueva desde el segundo, con la tasa estatal del Annual Report incluida."}</p>
      </header>

      <section className="section-shell page-section pricing-page-grid">
        <PriceCard locale={locale} />
        <div className="annual-card">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{english ? "From year two" : "Desde el segundo año"}</p>
          <h2>{english ? "Annual service renewal" : "Renovación anual del servicio"}</h2>
          <p className="annual-price">$449<span>{english ? "/year" : "/año"}</span></p>
          <p>{english ? "Includes Registered Agent renewal, Wyoming mailing address, Annual Report filing and state tax, and website maintenance." : "Incluye Registered Agent, dirección postal de Wyoming, presentación y tasa estatal del Annual Report, y mantenimiento de la web."}</p>
          <ul>
            <li>{english ? "Registered Agent service" : "Servicio de Registered Agent"}</li>
            <li>{english ? "Wyoming mailing address" : "Dirección postal de Wyoming"}</li>
            <li>{english ? "Annual Report filing and state tax" : "Presentación y tasa estatal del Annual Report"}</li>
            <li>{english ? "Website hosting and maintenance" : "Alojamiento y mantenimiento de la web"}</li>
          </ul>
          <p className="annual-state-fee"><strong>{english ? "State tax included." : "Tasa estatal incluida."}</strong> {english ? "The $449 renewal includes filing your Wyoming Annual Report and paying its state tax." : "Los $449 de renovación incluyen presentar el Annual Report de Wyoming y pagar su tasa estatal."}</p>
          <ContactActions locale={locale} emailLabel={english ? "Ask about the renewal" : "Consultar sobre la renovación"} />
        </div>
      </section>

      <section className="section-shell section-block">
        <div className="page-highlight"><h2>{english ? "Your website stays with you" : "Los archivos de tu web son tuyos"}</h2><p>{english ? "Your website and business email are included in the $699 formation package. Continuing to host and maintain the website requires the $449 annual renewal. If you do not renew, we take the website offline and give you its files so you can arrange hosting elsewhere. We agree the website and email scope with you before you start." : "El paquete de $699 incluye tu página web y correo empresarial. Para mantener la web alojada y operativa se requiere la renovación anual de $449. Si no renuevas, la web deja de estar publicada y te entregamos sus archivos para que puedas alojarla por tu cuenta. Acordamos contigo el alcance de la web y el correo antes de empezar."}</p></div>
      </section>

      <section className="section-shell section-block">
        <div className="section-intro">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "What banking support means" : "Qué significa la orientación bancaria"}</p>
          <h2>{english ? "Guidance for your application, not an account-opening service." : "Orientación para solicitar, no apertura de la cuenta."}</h2>
        </div>
        <div className="page-highlight"><p>{english ? "We explain the steps and documents for a business account application, including options such as Mercury or Wise when their requirements fit your situation. You apply directly; each provider makes its own decision. An LLC, EIN or mailing address does not guarantee approval." : "Te explicamos los pasos y documentos para solicitar una cuenta empresarial, incluidas opciones como Mercury o Wise si sus requisitos encajan con tu situación. Tú presentas la solicitud y cada proveedor decide. Tener LLC, EIN o dirección postal no garantiza la aprobación."}</p></div>
        <div className="inline-links">
          <Link href={english ? "/en/llc-formation/" : "/llc-formation/"}>{english ? "See LLC formation details" : "Ver los detalles de formación de LLC"}</Link>
          <Link href={english ? "/en/blog/" : "/blog/"}>{english ? "Read our business guides" : "Leer las guías empresariales"}</Link>
        </div>
        <p className="legal-note">{english ? "Valls Solutions provides company formation and administrative support. We are not a law firm, CPA firm, bank or immigration provider. Legal, tax and immigration requirements depend on each person's situation." : "Valls Solutions presta servicios de formación de empresas y apoyo administrativo. No somos un despacho legal, una firma de CPA, un banco ni un proveedor de servicios migratorios. Los requisitos legales, fiscales y migratorios dependen de cada situación."}</p>
      </section>
    </main>
  );
}
