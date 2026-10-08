"use client";

import { useEffect, useRef, useState } from "react";
import {
  activateConsentedServices,
  CONSENT_VERSION,
  createConsentChoice,
  hasOptionalServices,
  OPTIONAL_SERVICES,
  readConsent,
  serviceAllowed,
  shouldAskForConsent,
  writeConsent,
  type ConsentCategory,
  type ConsentChoice,
  type ConsentService,
} from "@/lib/consent";
import type { Locale } from "@/lib/site";

const OPEN_CONSENT_EVENT = "valls:open-consent";
const DENIED_CATEGORIES: Record<ConsentCategory, boolean> = {
  analytics: false,
  marketing: false,
};

const copy = {
  en: {
    heading: "Your cookie and privacy choices",
    intro: "Optional services stay off unless you choose to allow them.",
    providers: "Optional services",
    configure: "Configure",
    hideSettings: "Hide settings",
    acceptAll: "Accept all",
    rejectOptional: "Reject optional",
    save: "Save my choices",
    analytics: "Analytics",
    marketing: "Marketing",
    allow: "Allow",
    storageError: "We couldn't save your choice. Optional services remain off. Check your browser storage settings and try again.",
  },
  es: {
    heading: "Tus preferencias de cookies y privacidad",
    intro: "Los servicios opcionales permanecen desactivados salvo que decidas permitirlos.",
    providers: "Servicios opcionales",
    configure: "Configurar",
    hideSettings: "Ocultar opciones",
    acceptAll: "Aceptar todas",
    rejectOptional: "Rechazar opcionales",
    save: "Guardar mis preferencias",
    analytics: "Analítica",
    marketing: "Marketing",
    allow: "Permitir",
    storageError: "No hemos podido guardar tu elección. Los servicios opcionales siguen desactivados. Revisa el almacenamiento del navegador e inténtalo de nuevo.",
  },
} satisfies Record<Locale, Record<string, string>>;

function ConsentServiceLoader({
  service,
  choice,
}: {
  service: ConsentService;
  choice: ConsentChoice | null;
}) {
  const allowed = serviceAllowed(service, choice);
  const currentChoice = useRef(choice);
  currentChoice.current = choice;

  useEffect(() => {
    if (!allowed) return;
    return activateConsentedServices([service], currentChoice.current);
  }, [allowed, service]);

  return null;
}

export function ConsentPreferencesButton({ locale }: { locale: Locale }) {
  if (!hasOptionalServices(OPTIONAL_SERVICES)) return null;

  return (
    <button
      className="consent-preferences-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      {locale === "en" ? "Cookie preferences" : "Preferencias de cookies"}
    </button>
  );
}

export function ConsentManager({ locale }: { locale: Locale }) {
  const services = OPTIONAL_SERVICES;
  const text = copy[locale];
  const categories = Array.from(new Set(services.map((service) => service.category)));
  const [ready, setReady] = useState(false);
  const [storedChoice, setStoredChoice] = useState<ConsentChoice | null>(null);
  const [selectedCategories, setSelectedCategories] = useState(DENIED_CATEGORIES);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    if (!hasOptionalServices(services)) return;

    let initialChoice: ConsentChoice | null = null;
    try {
      initialChoice = readConsent(window.localStorage, CONSENT_VERSION);
    } catch {
      initialChoice = null;
    }

    setStoredChoice(initialChoice);
    setSelectedCategories(initialChoice?.categories ?? DENIED_CATEGORIES);
    setIsOpen(shouldAskForConsent(services, initialChoice));
    setReady(true);
  }, [services]);

  useEffect(() => {
    if (!hasOptionalServices(services)) return;

    const openPreferences = () => {
      setSelectedCategories(storedChoice?.categories ?? DENIED_CATEGORIES);
      setStorageError(false);
      setIsConfiguring(true);
      setIsOpen(true);
    };

    window.addEventListener(OPEN_CONSENT_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openPreferences);
  }, [services, storedChoice]);

  function saveChoice(nextCategories: Record<ConsentCategory, boolean>) {
    const nextChoice = createConsentChoice(nextCategories);
    let saved = false;

    try {
      saved = writeConsent(window.localStorage, nextChoice);
    } catch {
      saved = false;
    }

    if (!saved) {
      setStoredChoice(null);
      setStorageError(true);
      setIsOpen(true);
      return;
    }

    setStoredChoice(nextChoice);
    setSelectedCategories(nextCategories);
    setStorageError(false);
    setIsConfiguring(false);
    setIsOpen(false);
  }

  function acceptAll() {
    const allAllowed = { ...DENIED_CATEGORIES };
    for (const category of categories) allAllowed[category] = true;
    saveChoice(allAllowed);
  }

  function rejectOptional() {
    saveChoice(DENIED_CATEGORIES);
  }

  if (!hasOptionalServices(services) || !ready || !isOpen) {
    return (
      <>
        {services.map((service) => (
          <ConsentServiceLoader key={service.id} service={service} choice={storedChoice} />
        ))}
      </>
    );
  }

  return (
    <>
      {services.map((service) => (
        <ConsentServiceLoader key={service.id} service={service} choice={storedChoice} />
      ))}
      <aside
        aria-labelledby="consent-panel-heading"
        className="consent-panel"
        id="consent-preferences"
        role="region"
      >
        <div className="consent-panel-copy">
          <h2 id="consent-panel-heading">{text.heading}</h2>
          <p>{text.intro}</p>
          <h3>{text.providers}</h3>
          <ul className="consent-provider-list">
            {services.map((service) => (
              <li key={service.id}>
                <strong>{service.provider}</strong>
                <span>{service.purpose[locale]}</span>
              </li>
            ))}
          </ul>
          {isConfiguring && (
            <fieldset className="consent-category-list">
              <legend>{locale === "en" ? "Optional categories" : "Categorías opcionales"}</legend>
              {categories.map((category) => (
                <label className="consent-category" key={category}>
                  <input
                    checked={selectedCategories[category]}
                    onChange={(event) =>
                      setSelectedCategories((current) => ({
                        ...current,
                        [category]: event.currentTarget.checked,
                      }))
                    }
                    type="checkbox"
                  />
                  <span>
                    {text[category]} — {text.allow}
                  </span>
                </label>
              ))}
            </fieldset>
          )}
          {storageError && <p className="consent-storage-error" role="alert">{text.storageError}</p>}
        </div>
        <div className="consent-panel-actions" aria-label={locale === "en" ? "Consent choices" : "Opciones de consentimiento"}>
          <button className="consent-choice-button" type="button" onClick={acceptAll}>
            {text.acceptAll}
          </button>
          <button className="consent-choice-button" type="button" onClick={rejectOptional}>
            {text.rejectOptional}
          </button>
          {isConfiguring && (
            <button className="consent-choice-button" type="button" onClick={() => saveChoice(selectedCategories)}>
              {text.save}
            </button>
          )}
          <button
            aria-controls="consent-preferences"
            aria-expanded={isConfiguring}
            className="consent-configure-button"
            type="button"
            onClick={() => setIsConfiguring((current) => !current)}
          >
            {isConfiguring ? text.hideSettings : text.configure}
          </button>
        </div>
      </aside>
    </>
  );
}
