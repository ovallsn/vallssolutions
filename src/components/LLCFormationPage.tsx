import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import type { Locale } from "@/lib/site";

type FormationDetail = { title: string; body: string };

const details: Record<Locale, FormationDetail[]> = {
  en: [
    { title: "Wyoming LLC formation", body: "We prepare and submit the state filing. The Wyoming formation fee is included in the $699 package." },
    { title: "EIN application handling", body: "We coordinate the application for your federal Employer Identification Number. The IRS issues the EIN; timing depends on the application method and the IRS." },
    { title: "Registered Agent and Wyoming mailing address", body: "The first year of Registered Agent service and the Wyoming mailing address are included. The mailing address is for correspondence, not a physical operating office." },
    { title: "Company website and business email", body: "A company website and business email are included with formation. The $449 annual renewal from year two keeps the website hosted and maintained." },
    { title: "Business banking application guidance", body: "We explain the process and help you prepare application documents. You apply directly to the provider, which reviews your application under its own requirements." },
  ],
  es: [
    { title: "Formación de LLC en Wyoming", body: "Preparamos y presentamos el trámite estatal. La tasa de creación de Wyoming está incluida en el paquete de $699." },
    { title: "Gestión de la solicitud del EIN", body: "Coordinamos la solicitud del número federal de identificación empresarial. El IRS emite el EIN y el plazo depende de la vía de solicitud y del IRS." },
    { title: "Agente registrado (Registered Agent) y dirección postal de Wyoming", body: "El Registered Agent recibe notificaciones oficiales de la LLC. El primer año y la dirección postal de Wyoming están incluidos. La dirección postal sirve para recibir correspondencia, no es una oficina física de operaciones." },
    { title: "Página web y correo empresarial", body: "La formación incluye una página web y un correo empresarial. La renovación anual de $449 desde el segundo año mantiene el alojamiento y mantenimiento de la web." },
    { title: "Orientación para solicitar una cuenta empresarial", body: "Te explicamos el proceso y te ayudamos a preparar los documentos de la solicitud. Tú solicitas directamente al proveedor, que revisa la solicitud según sus propios requisitos." },
  ],
};

export function LLCFormationPage({ locale }: { locale: Locale }) {
  const english = locale === "en";

  return (
    <main id="contenido">
      <header className="section-shell page-hero">
        <p className="breadcrumbs"><Link href={english ? "/" : "/es/"}>{english ? "Home" : "Inicio"}</Link> / {english ? "LLC formation" : "Formación de LLC"}</p>
        <p className="eyebrow"><span className="eyebrow-line" />{english ? "Wyoming LLC formation" : "Formación de LLC en Wyoming"}</p>
        <h1>{english ? "Form your Wyoming LLC with a clear, guided package." : "Crea tu LLC en Wyoming con un paquete claro y acompañado."}</h1>
        <p>{english ? "For U.S. and international founders. One formation service for your Wyoming filing, EIN application, first-year essentials and business banking preparation." : "Para emprendedores en EE. UU. y en otros países. Un servicio de formación que reúne la presentación en Wyoming, el EIN, los esenciales del primer año y la preparación bancaria empresarial."}</p>
        <div className="hero-actions">
          <ContactActions locale={locale} ctaLabel={english ? "Start your LLC" : "Empezar mi LLC"} />
          <Link className="text-link" href={english ? "/pricing/" : "/es/precios/"}>{english ? "See package pricing" : "Ver el precio del paquete"}</Link>
        </div>
      </header>

      <section className="section-shell page-columns page-section">
        <div className="page-copy">
          <h2>{english ? "What is included in your LLC formation" : "Qué incluye la formación de tu LLC"}</h2>
          <p>{english ? "The $699 one-time package brings the filing and the first-year business essentials together. You will know the scope and next steps before we begin." : "El paquete de $699 pago único reúne la presentación y los servicios esenciales del primer año. Conocerás el alcance y los siguientes pasos antes de empezar."}</p>
          <ol className="formation-details">
            {details[locale].map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}
          </ol>
          <h2>{english ? "Made for U.S. and international founders" : "Para fundadores en EE. UU. y en otros países"}</h2>
          <p>{english ? "You do not need to be a U.S. citizen to form a Wyoming LLC, and an ITIN is not required simply to create the company. The information needed for the EIN application can vary with the responsible party and your circumstances." : "No necesitas ser ciudadano estadounidense para crear una LLC en Wyoming, ni tener un ITIN simplemente para constituir la empresa. La información para el EIN puede variar según el responsable y tu situación."}</p>
          <div className="page-highlight"><p>{english ? "We will ask where you and your business are based, then explain how a Wyoming formation fits your operating location and any state registration steps." : "Te preguntaremos dónde resides y dónde opera tu negocio; así podremos explicarte cómo encaja la formación en Wyoming y qué trámites estatales pueden corresponder."}</p></div>
        </div>

        <aside className="side-panel formation-side-panel">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "Wyoming LLC package" : "Paquete LLC en Wyoming"}</p>
          <h2>{english ? "$699 one time" : "$699 pago único"}</h2>
          <p>{english ? "Formation fee and state filing fee included." : "Incluye la formación y la tasa estatal de creación."}</p>
          <div className="formation-price-divider" />
          <p className="formation-renewal-price"><strong>{english ? "$449/year from year two" : "$449/año desde el segundo año"}</strong></p>
          <p>{english ? "Registered Agent, mailing address, Annual Report and state tax, plus website hosting and maintenance." : "Registered Agent, dirección postal, Annual Report y tasa estatal, además del alojamiento y mantenimiento de la web."}</p>
          <ContactActions locale={locale} ctaLabel={english ? "Get started" : "Empezar"} />
        </aside>
      </section>

      <section className="banking-section formation-banking">
        <div className="section-shell banking-layout">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" />{english ? "Business banking guidance" : "Orientación bancaria empresarial"}</p>
            <h2>{english ? "Prepare the account application with support." : "Prepara la solicitud de la cuenta con acompañamiento."}</h2>
            <p className="banking-lede">{english ? "We can help you understand which company documents a provider may ask for and how to prepare the application for options such as Mercury or Wise. You submit it directly, and the provider makes its own decision." : "Te ayudamos a entender qué documentos de la empresa puede pedir un proveedor y cómo preparar la solicitud para opciones como Mercury o Wise. Tú la presentas directamente y el proveedor toma su propia decisión."}</p>
          </div>
          <div className="page-highlight"><p>{english ? "You submit your application directly to the bank or platform. We help you organize the company documents and understand the steps they request." : "Presentas la solicitud directamente al banco o plataforma. Te ayudamos a organizar los documentos de la empresa y a entender los pasos que te indiquen."}</p></div>
        </div>
      </section>

      <section className="section-shell section-block">
        <div className="section-intro section-intro-wide">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "How it works" : "Cómo funciona"}</p>
          <h2>{english ? "From first email to filed company." : "Del primer email a la empresa constituida."}</h2>
        </div>
        <ol className="process-list">
          {(english
            ? [
                { title: "Tell us what you are building", body: "Share your residence, business activity and any questions by email." },
                { title: "Confirm the scope together", body: "We explain the package and agree on the information needed before beginning." },
                { title: "We coordinate the formation", body: "We prepare the Wyoming filing and the included EIN and first-year services." },
              ]
            : [
                { title: "Cuéntanos qué negocio estás creando", body: "Indica por email dónde resides, la actividad y cualquier pregunta." },
                { title: "Confirmamos juntos el alcance", body: "Te explicamos el paquete y acordamos la información necesaria antes de empezar." },
                { title: "Coordinamos la formación", body: "Preparamos la presentación en Wyoming y los servicios incluidos del EIN y el primer año." },
              ]).map((step, index) => <li key={step.title}><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}
        </ol>
      </section>

      <section className="closing-cta">
        <div className="section-shell closing-layout">
          <div>
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{english ? "Your next step" : "El siguiente paso"}</p>
            <h2>{english ? "Build your U.S. company with a clear plan." : "Crea tu empresa en EE. UU. con un plan claro."}</h2>
            <p>{english ? "Tell us where you are based and what your business does. We will explain the package and answer your questions." : "Cuéntanos dónde resides y a qué se dedica tu negocio. Te explicamos el paquete y respondemos tus preguntas."}</p>
          </div>
          <ContactActions locale={locale} ctaLabel={english ? "Get started" : "Empezar"} />
        </div>
      </section>
    </main>
  );
}
