export const SITE_URL = "https://vallssolutions.com";
export const CONTACT_EMAIL = "info@vallssolutions.com";

// Add the verified WhatsApp Business number in international format once it is supplied.
export const WHATSAPP_NUMBER: string | null = null;

export type Locale = "es" | "en";

export function mailtoHref(locale: Locale, subject?: string): string {
  const body =
    locale === "es"
      ? "Hola,\n\nQuiero información sobre la formación de una LLC.\n\nPaís de residencia:\nActividad del negocio:\nEstado que estoy considerando:\n\nNo adjuntaré documentos de identidad ni datos sensibles por este medio."
      : "Hello,\n\nI would like information about forming an LLC.\n\nCountry of residence:\nBusiness activity:\nState I am considering:\n\nI will not attach identity documents or sensitive data to this email.";

  const defaultSubject = locale === "es" ? "Consulta sobre LLC en Wyoming" : "Question about a Wyoming LLC";
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject ?? defaultSubject)}&body=${encodeURIComponent(body)}`;
}

export function whatsappHref(locale: Locale): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  const message =
    locale === "es"
      ? "Hola, quiero información sobre la formación de una LLC en Wyoming."
      : "Hello, I would like information about forming a Wyoming LLC.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
