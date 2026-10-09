import Link from "next/link";
import { ContactIcon } from "@/components/ContactIcons";
import { whatsappHref, type Locale } from "@/lib/site";

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
          <ContactIcon name="message" />
          {english ? "Message us on WhatsApp" : "Escribir por WhatsApp"}
        </a>
      )}
      <Link className="button button-dark" href={english ? "/contact/" : "/es/contacto/"}>
        <ContactIcon name="message" />
        {ctaLabel ?? (english ? "Get in touch" : "Contactar")}
      </Link>
    </div>
  );
}
