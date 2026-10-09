"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL, type Locale } from "@/lib/site";
import { ContactIcon } from "@/components/ContactIcons";

export function LeadCaptureForm({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const [status, setStatus] = useState("");

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => {
      const entry = form.get(key);
      return typeof entry === "string" ? entry.trim() : "";
    };
    const subject = english
      ? "New U.S. LLC formation inquiry"
      : "Nueva consulta sobre formación de LLC en EE. UU.";
    const body = english
      ? `Name: ${value("name")}\nEmail: ${value("email")}\nCountry or U.S. state: ${value("residence")}\nBusiness activity: ${value("business")}\n\nAdditional details:\n${value("details")}`
      : `Nombre: ${value("name")}\nEmail: ${value("email")}\nPaís o estado de EE. UU.: ${value("residence")}\nActividad del negocio: ${value("business")}\n\nDetalles adicionales:\n${value("details")}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus(
      english
        ? "Your email app is opening with your message. Review it and press Send."
        : "Se abrirá tu aplicación de correo con el mensaje. Revísalo y pulsa Enviar.",
    );
    window.setTimeout(() => window.location.assign(mailto), 100);
  }

  return (
    <form
      className="lead-form"
      action={`mailto:${CONTACT_EMAIL}`}
      method="post"
      encType="text/plain"
      onSubmit={submitLead}
    >
      <div className="lead-form-fields">
        <div className="lead-field">
          <label htmlFor={`lead-name-${locale}`}>{english ? "Name" : "Nombre"}</label>
          <input id={`lead-name-${locale}`} name="name" type="text" autoComplete="name" maxLength={120} required />
        </div>
        <div className="lead-field">
          <label htmlFor={`lead-email-${locale}`}>{english ? "Email" : "Correo electrónico"}</label>
          <input id={`lead-email-${locale}`} name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
        <div className="lead-field">
          <label htmlFor={`lead-residence-${locale}`}>{english ? "Country or U.S. state of residence" : "País o estado de EE. UU. donde resides"}</label>
          <input id={`lead-residence-${locale}`} name="residence" type="text" maxLength={120} required />
        </div>
        <div className="lead-field">
          <label htmlFor={`lead-business-${locale}`}>{english ? "What does your business do?" : "¿A qué se dedica tu negocio?"}</label>
          <input id={`lead-business-${locale}`} name="business" type="text" maxLength={160} required />
        </div>
        <div className="lead-field lead-field-wide">
          <label htmlFor={`lead-details-${locale}`}>{english ? "Anything else? (optional)" : "¿Algo más? (opcional)"}</label>
          <textarea id={`lead-details-${locale}`} name="details" rows={4} maxLength={2000} />
        </div>
      </div>
      <p className="lead-privacy-note">
        <span className="lead-privacy-icon"><ContactIcon name="lock" /></span>
        {english
          ? "Please don’t include SSNs, ITINs, passport numbers, dates of birth or identity documents. We’ll explain any document requirements later."
          : "No incluyas SSN, ITIN, número de pasaporte, fecha de nacimiento ni documentos de identidad. Si hace falta algún documento, te explicaremos cómo proceder más adelante."}
      </p>
      <button className="button button-dark button-full lead-submit" type="submit">
        <ContactIcon name="mail" />
        {english ? "Continue by email" : "Continuar por email"}
      </button>
      <p className="lead-price-note">
        {english ? "$699 one time · $449/year from year two" : "$699 pago único · $449/año desde el segundo año"}
      </p>
      {status && <p className="lead-form-status" role="status" aria-live="polite">{status}</p>}
    </form>
  );
}
