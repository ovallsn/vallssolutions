import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import type { Locale } from "@/lib/site";

export function LLCFormationPage({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const items = english
    ? ["Wyoming state formation filing", "EIN application handling", "First year of Registered Agent service", "First year of Wyoming mailing address", "Website and business email", "Guidance for a business bank application"]
    : ["Presentación estatal de formación en Wyoming", "Gestión de la solicitud del EIN", "Primer año de Registered Agent", "Primer año de dirección postal de Wyoming", "Página web y correo empresarial", "Orientación para solicitar una cuenta bancaria empresarial"];

  return (
    <main id="contenido">
      <header className="section-shell page-hero">
        <p className="breadcrumbs"><Link href={english ? "/" : "/es/"}>{english ? "Home" : "Inicio"}</Link> / {english ? "LLC formation" : "Formación de LLC"}</p>
        <p className="eyebrow"><span className="eyebrow-line" />{english ? "Wyoming LLC formation" : "Formación de LLC en Wyoming"}</p>
        <h1>{english ? "Form a Wyoming LLC with clear next steps." : "Crea tu LLC en Wyoming con cada paso explicado."}</h1>
        <p>{english ? "A formation package for U.S. and international founders, with the state filing, EIN, Registered Agent, mailing address, website and business email included. Annual Reports are handled with the annual renewal." : "Un paquete de formación para fundadores en Estados Unidos y en el extranjero, con presentación estatal, EIN, Registered Agent, dirección postal, web y correo empresarial incluidos. El Annual Report corresponde a la renovación anual."}</p>
        <div className="hero-actions"><ContactActions locale={locale} emailLabel={english ? "Email us to get started" : "Escribirnos para empezar"} /><Link className="text-link" href={english ? "/en/pricing/" : "/pricing/"}>{english ? "See package pricing" : "Ver el precio del paquete"}<span aria-hidden="true">↗</span></Link></div>
      </header>

      <section className="section-shell page-columns page-section">
        <div className="page-copy">
          <h2>{english ? "What the $699 formation package includes" : "Qué incluye el paquete de formación de $699"}</h2>
          <p>{english ? "The listed amount is the total one-time service price for forming your Wyoming LLC. It includes the state formation fee and the initial services below." : "El importe publicado es el precio total único del servicio para formar tu LLC en Wyoming. Incluye la tasa estatal de formación y los servicios iniciales descritos aquí."}</p>
          <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
          <h2>{english ? "What happens after you contact us" : "Qué ocurre después de escribirnos"}</h2>
          <p>{english ? "Start with an email describing your country of residence and what your business does. We clarify the scope and answer general process questions before asking for formation details. We do not collect identity documents, SSNs, ITINs or passport numbers through this website." : "Empieza con un email que explique tu país de residencia y a qué se dedica el negocio. Aclaramos el alcance y respondemos preguntas generales antes de pedir los datos de formación. Esta web no recoge documentos de identidad, SSN, ITIN ni números de pasaporte."}</p>
          <h2>{english ? "EIN and timing" : "EIN y plazos"}</h2>
          <p>{english ? "The package includes handling the EIN application. The information the IRS requires and its processing time depend on the responsible party and the application method. Formation does not require an ITIN in every case." : "El paquete incluye la gestión de la solicitud del EIN. La información que exige el IRS y el plazo de tramitación dependen del responsable y del método de solicitud. No se requiere un ITIN en todos los casos para constituir una LLC."}</p>
          <h2>{english ? "Annual service renewal" : "Renovación anual del servicio"}</h2>
          <p>{english ? "From year two, renewal is $449/year. Includes Registered Agent renewal, Wyoming mailing address, Annual Report filing and state tax, and website maintenance." : "Desde el segundo año, la renovación cuesta $449/año. Incluye Registered Agent, dirección postal de Wyoming, presentación y tasa estatal del Annual Report, y mantenimiento de la web."}</p>
        </div>
        <aside className="side-panel">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "Wyoming LLC" : "LLC en Wyoming"}</p>
          <h2>{english ? "Formation package" : "Paquete de formación"}</h2>
          <p className="side-price">$699</p>
          <p>{english ? "One-time total to form the LLC." : "Precio total único para constituir la LLC."}</p>
          <p><strong>{english ? "$449/year from year two" : "$449/año desde el segundo año"}</strong></p>
          <p>{english ? "Annual Report filing and state tax are included in the renewal." : "La presentación y tasa estatal del Annual Report están incluidas en la renovación."}</p>
          <ContactActions locale={locale} emailLabel={english ? "Ask a question" : "Hacer una consulta"} />
        </aside>
      </section>

      <section className="section-shell section-block">
        <div className="section-intro section-intro-wide">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "U.S. and international founders" : "Fundadores en Estados Unidos y en el extranjero"}</p>
          <h2>{english ? "Your residence shapes some requirements." : "Tu residencia influye en algunos requisitos."}</h2>
          <p>{english ? "The state filing process may be similar, but IRS and banking information requirements can differ. You do not need to be a U.S. citizen or already have an ITIN just to form an LLC." : "La presentación estatal puede ser similar, pero los datos que piden el IRS y los bancos pueden cambiar. No necesitas ser ciudadano estadounidense ni tener ya un ITIN solo para crear una LLC."}</p>
        </div>
        <div className="page-highlight"><p>{english ? "If you live and operate in a U.S. state outside Wyoming, you may also need to register your LLC there. Wyoming is not automatically the right choice for every business. For legal or tax advice about your facts, speak with a qualified professional." : "Si resides y operas en un estado distinto de Wyoming, quizá también debas registrar allí tu LLC. Wyoming no es automáticamente la opción correcta para todos. Para consejo legal o fiscal sobre tu situación, habla con un profesional cualificado."}</p></div>
      </section>
    </main>
  );
}
