import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { CONTACT_EMAIL, type Locale } from "@/lib/site";

export function ContactPage({ locale }: { locale: Locale }) {
  const english = locale === "en";

  return (
    <main id="contenido">
      <header className="section-shell page-hero">
        <p className="breadcrumbs"><Link href={english ? "/" : "/es/"}>{english ? "Home" : "Inicio"}</Link> / {english ? "Contact" : "Contacto"}</p>
        <p className="eyebrow"><span className="eyebrow-line" />{english ? "A first message is enough" : "Un primer mensaje es suficiente"}</p>
        <h1>{english ? "Ask about forming your U.S. LLC." : "Consulta sobre la formación de tu LLC en EE. UU."}</h1>
        <p>{english ? "Tell us where you live and what your business does. We will explain the service and next steps by email. No call or document upload is required to start." : "Cuéntanos dónde resides y a qué se dedica tu negocio. Te explicaremos el servicio y los siguientes pasos por email. No hace falta reservar una llamada ni subir documentos para empezar."}</p>
      </header>
      <section className="section-shell contact-page-grid">
        <div className="contact-panel">
          <p className="eyebrow"><span className="eyebrow-line" />{english ? "Email" : "Correo electrónico"}</p>
          <h2>{english ? "Write when it suits you." : "Escríbenos cuando te venga bien."}</h2>
          <p>{english ? "A brief message is enough for us to understand your question." : "Un mensaje breve basta para entender tu consulta."}</p>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <div className="contact-safety"><p>{english ? "Please do not email SSNs, ITINs, passport numbers, dates of birth or identity documents. We only discuss any necessary documents after agreeing on the service and an appropriate channel." : "No envíes SSN, ITIN, números de pasaporte, fechas de nacimiento ni documentos de identidad por email. Solo hablaremos de documentos necesarios después de acordar el servicio y un canal apropiado."}</p></div>
        </div>
        <div className="page-copy">
          <h2>{english ? "What to include in your first message" : "Qué incluir en el primer mensaje"}</h2>
          <ul>
            <li>{english ? "Your country or U.S. state of residence" : "Tu país o estado de residencia"}</li>
            <li>{english ? "A short description of your business activity" : "Una breve descripción de la actividad del negocio"}</li>
            <li>{english ? "Whether you already have a state in mind" : "Si ya tienes un estado en mente"}</li>
          </ul>
          <p>{english ? "We offer formation and administrative support. We do not provide legal, tax or immigration advice, and bank account decisions are made by the financial provider." : "Ofrecemos formación y apoyo administrativo. No damos asesoramiento legal, fiscal ni migratorio, y la decisión sobre una cuenta bancaria corresponde al proveedor financiero."}</p>
          <ContactActions locale={locale} emailLabel={english ? "Start an email" : "Preparar un email"} />
        </div>
      </section>
    </main>
  );
}
