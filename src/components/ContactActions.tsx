import { ContactIcon } from "@/components/ContactIcons";
import { mailtoHref, whatsappHref, type Locale } from "@/lib/site";

type ContactActionsProps = {
  locale: Locale;
  ctaLabel?: string;
  className?: string;
};

export function ContactActions({ locale, ctaLabel, className = "" }: ContactActionsProps) {
  const english = locale === "en";
  const whatsapp = whatsappHref(locale);

  return (
    <div className={`contact-actions ${className}`.trim()}>
      {whatsapp && (
        <a className="button button-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer">
          <ContactIcon name="whatsapp" />
          {english ? "Message us on WhatsApp" : "Escribir por WhatsApp"}
        </a>
      )}
      <a className="button button-dark" href={mailtoHref(locale, ctaLabel)}>
        <ContactIcon name="mail" />
        {ctaLabel ?? (english ? "Email us" : "Escribir por email")}
      </a>
    </div>
  );
}
