import { mailtoHref, whatsappHref, type Locale } from "@/lib/site";

type ContactActionsProps = {
  locale: Locale;
  emailLabel?: string;
  className?: string;
};

export function ContactActions({ locale, emailLabel, className = "" }: ContactActionsProps) {
  const english = locale === "en";
  const whatsapp = whatsappHref(locale);

  return (
    <div className={`contact-actions ${className}`.trim()}>
      {whatsapp && (
        <a className="button button-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer">
          {english ? "Message us on WhatsApp" : "Escribir por WhatsApp"}<span aria-hidden="true">↗</span>
        </a>
      )}
      <a className={whatsapp ? "text-link" : "button button-dark"} href={mailtoHref(locale)}>
        {emailLabel ?? (english ? "Email us" : "Escribir por email")}<span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
