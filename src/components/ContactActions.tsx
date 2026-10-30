import Link from "next/link";
import { ContactIcon } from "@/components/ContactIcons";
import { ROUTES } from "@/lib/routes";
import { LINE_ID, lineHref, whatsappHref, type Locale } from "@/lib/site";

type ContactActionsProps = {
  locale: Locale;
  ctaLabel?: string;
  className?: string;
  showWhatsApp?: boolean;
  showLine?: boolean;
};

export function ContactActions({
  locale,
  ctaLabel,
  className = "",
  showWhatsApp = true,
  showLine = false,
}: ContactActionsProps) {
  const english = locale === "en";
  const whatsapp = showWhatsApp ? whatsappHref(locale) : null;
  const line = showLine ? lineHref() : null;

  return (
    <div className={`contact-actions ${className}`.trim()}>
      <Link className="button button-dark" href={ROUTES.contact[locale]}>
        <ContactIcon name="arrow" />
        {ctaLabel ?? (english ? "Start your LLC" : "Empezar mi LLC")}
      </Link>
      {whatsapp && (
        <a className="button button-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer">
          <ContactIcon name="whatsapp" />
          {english ? "Chat on WhatsApp" : "Escribir por WhatsApp"}
        </a>
      )}
      {line && (
        <a className="contact-action-line" href={line} target="_blank" rel="noopener noreferrer">
          <ContactIcon name="line" />
          <span>{english ? "Message on LINE" : "Escríbenos por LINE"} · {LINE_ID}</span>
        </a>
      )}
    </div>
  );
}
