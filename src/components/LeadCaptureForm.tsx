"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { CONTACT_EMAIL, type Locale, whatsappHref } from "@/lib/site";
import { ContactIcon } from "@/components/ContactIcons";

export function LeadCaptureForm({ locale }: { locale: Locale }) {
  const english = locale === "en";
  const [status, setStatus] = useState("");
  const [fallbackLinks, setFallbackLinks] = useState<{ email: string; whatsapp: string | null } | null>(null);

  function createMessage(formElement: HTMLFormElement) {
    const form = new FormData(formElement);
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
    const whatsapp = whatsappHref(locale, body);
    return { mailto, whatsapp };
  }

  function openEmailDraft(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    const links = createMessage(form);
    setFallbackLinks({ email: links.mailto, whatsapp: links.whatsapp });
    setStatus(
      english
        ? "Your email draft is opening. Review it and press Send to deliver your enquiry."
        : "Se abrirá el borrador de email. Revísalo y pulsa Enviar para enviar la consulta.",
    );
    window.location.assign(links.mailto);
  }

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const links = createMessage(event.currentTarget);

    setFallbackLinks({ email: links.mailto, whatsapp: links.whatsapp });
    if (links.whatsapp) {
      window.open(links.whatsapp, "_blank", "noopener,noreferrer");
      setStatus(
        english
          ? "WhatsApp is opening with your message ready. Review it and tap Send; your enquiry is not sent until you do."
          : "WhatsApp se abrirá con el mensaje preparado. Revísalo y pulsa Enviar; la consulta no se envía hasta que lo hagas.",
      );
    } else {
      setStatus(
        english
          ? "Your email draft is ready. Review it and press Send to deliver your enquiry."
          : "El borrador de email está listo. Revísalo y pulsa Enviar para enviar la consulta.",
      );
      window.location.assign(links.mailto);
    }
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
        <ContactIcon name={"whatsapp"} />
        {english ? "Continue on WhatsApp" : "Continuar por WhatsApp"}
      </button>
      <button className="lead-email-alternative" type="button" onClick={openEmailDraft}>
        {english ? "Prefer email? Write to us directly." : "¿Prefieres el email? Escríbenos directamente."}
      </button>
      <p className="lead-price-note">
        {english ? "$699 one time · $449/year from year two" : "$699 pago único · $449/año desde el segundo año"}
      </p>
      {status && <p className="lead-form-status" role="status" aria-live="polite">{status}</p>}
      {fallbackLinks && (
        <div className="lead-form-fallback-links" aria-label={english ? "Message alternatives" : "Alternativas de contacto"}>
          {fallbackLinks.whatsapp && (
            <a href={fallbackLinks.whatsapp} target="_blank" rel="noopener noreferrer">
              <ContactIcon name="whatsapp" />
              {english ? "Open WhatsApp message" : "Abrir mensaje de WhatsApp"}
            </a>
          )}
          <a href={fallbackLinks.email}>
            <ContactIcon name="mail" />
            {english ? "Open email draft" : "Abrir borrador de email"}
          </a>
        </div>
      )}
    </form>
  );
}
