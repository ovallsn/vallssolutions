export const SITE_URL = "https://vallssolutions.com";
export const CONTACT_EMAIL = "info@vallssolutions.com";
export const LINE_ID = "vallsvallso";
// Allow a deployment-specific override while keeping the production portal discoverable in static exports.
export const CLIENT_PORTAL_URL =
  process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL?.trim() ||
  "https://app.vallssolutions.com/";

// WhatsApp Business number supplied by the owner, in international format.
export const WHATSAPP_NUMBER: string | null = "+66 63 897 5596";

export function lineHref(): string {
  return `https://line.me/ti/p/~${encodeURIComponent(LINE_ID)}`;
}

export type Locale = "es" | "en";

export function mailtoHref(locale: Locale, subject?: string): string {
  const body =
    locale === "es"
      ? "Hola,\n\nQuiero información sobre los servicios de Valls Solutions para LLC.\n\nPaís de residencia:\nActividad del negocio:\nEstado que estoy considerando:\n\nNo adjuntaré documentos de identidad ni datos sensibles por este medio."
      : "Hello,\n\nI would like information about Valls Solutions' LLC services.\n\nCountry of residence:\nBusiness activity:\nState I am considering:\n\nI will not attach identity documents or sensitive data to this email.";

  const defaultSubject = locale === "es" ? "Consulta para crear una LLC en EE. UU." : "Question about forming a U.S. LLC";
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject ?? defaultSubject)}&body=${encodeURIComponent(body)}`;
}

export function whatsappHref(locale: Locale, message?: string): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  const defaultMessage =
    locale === "es"
      ? "Hola, quiero información sobre la creación de una LLC en Estados Unidos."
      : "Hello, I would like information about forming an LLC in the United States.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message ?? defaultMessage)}`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
