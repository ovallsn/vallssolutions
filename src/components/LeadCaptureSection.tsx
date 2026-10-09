import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { ContactIcon } from "@/components/ContactIcons";
import { CONTACT_EMAIL, type Locale, whatsappHref } from "@/lib/site";

type LeadCaptureSectionProps = {
  locale: Locale;
  eyebrow?: string;
  title: string;
  body: string;
};

export function LeadCaptureSection({ locale, eyebrow, title, body }: LeadCaptureSectionProps) {
  const english = locale === "en";
  const whatsapp = whatsappHref(locale);

  return (
    <section className="lead-capture-band" aria-labelledby="lead-capture-title">
      <div className="section-shell lead-capture-layout">
        <div className="lead-capture-copy">
          <p className="eyebrow eyebrow-light">
            <span className="eyebrow-line" />
            {eyebrow ?? (english ? "YOUR NEXT STEP" : "EL SIGUIENTE PASO")}
          </p>
          <h2 id="lead-capture-title">{title}</h2>
          <p>{body}</p>
        </div>

        <div className="lead-contact-methods">
          <p>{english ? "Prefer to write directly?" : "¿Prefieres escribirnos directamente?"}</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            <span className="lead-contact-icon"><ContactIcon name="mail" /></span>
            <span><strong>{CONTACT_EMAIL}</strong><small>{english ? "We reply in English or Spanish" : "Respondemos en español o inglés"}</small></span>
          </a>
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <span className="lead-contact-icon"><ContactIcon name="message" /></span>
              <span><strong>WhatsApp</strong><small>{english ? "Continue the conversation there" : "Continúa la conversación por allí"}</small></span>
            </a>
          )}
        </div>

        <div className="lead-form-panel">
          <div className="lead-form-heading">
            <h3>{english ? "Tell us a little about your business." : "Cuéntanos un poco sobre tu negocio."}</h3>
            <p>{english ? "Four quick fields. We’ll reply in your language." : "Cuatro datos sencillos. Te responderemos en tu idioma."}</p>
          </div>
          <LeadCaptureForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
