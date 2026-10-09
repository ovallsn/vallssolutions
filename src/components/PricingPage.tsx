import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { PriceCard } from "@/components/PriceCard";
import type { Locale } from "@/lib/site";

export function PricingPage({ locale }: { locale: Locale }) {
  const english = locale === "en";

  return (
    <main id="contenido">
      <header className="section-shell page-hero pricing-hero">
        <p className="breadcrumbs"><Link href={english ? "/" : "/es/"}>{english ? "Home" : "Inicio"}</Link> / {english ? "Pricing" : "Precios"}</p>
        <p className="eyebrow"><span className="eyebrow-line" />{english ? "Wyoming LLC · clear pricing" : "LLC en Wyoming · precios claros"}</p>
        <h1>{english ? "One formation price. One clear annual renewal." : "Un precio de formación y una renovación anual clara."}</h1>
        <p>{english ? "Know what is included in the $699 formation package and the $449 annual renewal from year two." : "Conoce qué incluye el paquete de formación de $699 y la renovación anual de $449 desde el segundo año."}</p>
      </header>

      <section className="section-shell page-section pricing-page-grid">
        <PriceCard locale={locale} />
        <div className="annual-card">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{english ? "From year two" : "Desde el segundo año"}</p>
          <h2>{english ? "Annual service renewal" : "Renovación anual del servicio"}</h2>
          <p className="annual-price">$449<span>{english ? "/year" : "/año"}</span></p>
          <p>{english ? "Your ongoing Wyoming company essentials, in one annual service." : "Los servicios esenciales para mantener tu empresa en Wyoming, en una renovación anual."}</p>
          <ul>
            <li>{english ? "Registered Agent service" : "Agente registrado (Registered Agent)"}</li>
            <li>{english ? "Wyoming mailing address" : "Dirección postal de Wyoming"}</li>
            <li>{english ? "Annual Report filing and state tax" : "Presentación y tasa estatal del informe anual (Annual Report)"}</li>
            <li>{english ? "Website hosting and maintenance" : "Alojamiento y mantenimiento de la web"}</li>
          </ul>
          <p className="annual-state-fee"><strong>{english ? "Annual Report and state tax included." : "Informe anual y tasa estatal incluidos."}</strong> {english ? "The renewal covers the Wyoming Annual Report filing and its state tax." : "La renovación cubre la presentación del informe anual (Annual Report) de Wyoming y su tasa estatal."}</p>
          <ContactActions locale={locale} emailLabel={english ? "Ask about the annual renewal" : "Consultar sobre la renovación anual"} />
        </div>
      </section>
      <p className="section-shell price-total-note">{english ? "Final price charged by Valls Solutions: $699 once and $449 per year from year two. No additional tax is added at payment." : "Precio final que cobra Valls Solutions: 699 USD por la formación y 449 USD al año desde el segundo año. No se añade ningún impuesto adicional al pagar."}</p>

      <section className="section-shell section-block pricing-website">
        <div className="section-intro">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "Your business website" : "La web de tu empresa"}</p>
          <h2>{english ? "A web presence is part of your first-year setup." : "Tu presencia web forma parte de la configuración inicial."}</h2>
        </div>
        <div className="page-copy">
          <p>{english ? "The $699 formation package includes a company website and business email. The $449 annual renewal from year two includes hosting and maintenance for the website. If you do not renew, we take the site offline and provide its files so you can arrange hosting elsewhere." : "El paquete de formación de $699 incluye una página web empresarial y un correo de empresa. La renovación anual de $449 desde el segundo año incluye el alojamiento y mantenimiento de la web. Si no renuevas, la web deja de estar publicada y te entregamos sus archivos para que puedas alojarla en otro lugar."}</p>
          <p>{english ? "We agree on the website and email scope before beginning so you know what will be delivered." : "Acordamos contigo el alcance de la web y del correo antes de empezar para que sepas qué recibirás."}</p>
        </div>
      </section>

      <section className="banking-section pricing-banking">
        <div className="section-shell banking-layout">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" />{english ? "Business banking preparation" : "Preparación bancaria empresarial"}</p>
            <h2>{english ? "Guidance for a business bank application is included." : "La orientación para solicitar una cuenta empresarial está incluida."}</h2>
          </div>
          <div>
            <p className="banking-lede">{english ? "We explain the application steps and help you prepare company documents for providers such as Mercury or Wise when appropriate. You submit the application directly; each provider reviews it under its own criteria." : "Te explicamos los pasos y te ayudamos a preparar los documentos de la empresa para proveedores como Mercury o Wise cuando corresponda. Tú presentas la solicitud directamente y cada proveedor la revisa según sus propios criterios."}</p>
          <p className="banking-scope-note">{english ? "You submit your application directly to the bank or financial platform; we help you prepare the company documents and understand the steps." : "Presentas la solicitud directamente al banco o plataforma financiera; te ayudamos a preparar los documentos de la empresa y a entender los pasos."}</p>
          </div>
        </div>
      </section>

      <section className="section-shell section-block pricing-faq">
        <div className="section-intro">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "Package details" : "Detalles del paquete"}</p>
          <h2>{english ? "A few details, answered." : "Algunas respuestas importantes."}</h2>
        </div>
        <div className="faq-list">
          <details><summary>{english ? "When does the Annual Report renewal begin?" : "¿Cuándo comienza la renovación del Annual Report?"}</summary><p>{english ? "The first Wyoming Annual Report is filed with the $449 annual renewal, beginning in year two. The renewal includes the filing and state tax." : "El primer informe anual (Annual Report) de Wyoming se presenta con la renovación de $449, desde el segundo año. La renovación incluye la presentación y la tasa estatal."}</p></details>
          <details><summary>{english ? "Is the Wyoming formation fee included in $699?" : "¿La tasa de formación de Wyoming está incluida en los $699?"}</summary><p>{english ? "Yes. The published $699 package includes the Wyoming state formation filing fee." : "Sí. El paquete publicado de $699 incluye la tasa estatal de formación en Wyoming."}</p></details>
          <details><summary>{english ? "Do you open the bank account for the company?" : "¿Abrís la cuenta bancaria de la empresa?"}</summary><p>{english ? "We help you prepare the application and explain the process. You apply directly to the provider, which makes its own decision." : "Te ayudamos a preparar la solicitud y te explicamos el proceso. Tú la presentas directamente al proveedor, que toma su propia decisión."}</p></details>
        </div>
        <p className="legal-note">{english ? "Valls Solutions provides company formation and administrative support. A qualified professional can advise on legal or tax questions specific to your circumstances." : "Valls Solutions ofrece formación de empresas y apoyo administrativo. Un profesional cualificado puede orientarte sobre cuestiones legales o fiscales de tu situación."}</p>
      </section>

      <section className="closing-cta">
        <div className="section-shell closing-layout">
          <div>
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{english ? "Ready to start?" : "¿Empezamos?"}</p>
            <h2>{english ? "Tell us about your LLC plans." : "Cuéntanos tu plan para crear una LLC."}</h2>
            <p>{english ? "A short email is all you need for the first conversation." : "Un email breve basta para iniciar la conversación."}</p>
          </div>
          <ContactActions locale={locale} emailLabel={english ? "Start by email" : "Empezar por email"} />
        </div>
      </section>
    </main>
  );
}
