import type { Locale } from "./site";

export type ConsentCategory = "analytics" | "marketing";

export type ConsentChoice = {
  version: number;
  updatedAt: string;
  categories: Record<ConsentCategory, boolean>;
};

export type ConsentService = {
  id: string;
  provider: string;
  category: ConsentCategory;
  purpose: Record<Locale, string>;
  hosts: string[];
  cookies: string[];
  load: () => void | (() => void);
};

export type ConsentStorage = Pick<Storage, "getItem" | "setItem">;

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "valls-consent";

// Register only real optional services. The empty registry keeps consent dormant.
export const OPTIONAL_SERVICES: readonly ConsentService[] = [];

export function hasOptionalServices(
  services: readonly ConsentService[],
): boolean {
  return services.length > 0;
}

export function shouldAskForConsent(
  services: readonly ConsentService[],
  choice: ConsentChoice | null,
): boolean {
  return hasOptionalServices(services) && choice === null;
}

export function createConsentChoice(
  categories: Record<ConsentCategory, boolean>,
  updatedAt = new Date().toISOString(),
): ConsentChoice {
  return { version: CONSENT_VERSION, updatedAt, categories };
}

function isConsentChoice(value: unknown, version: number): value is ConsentChoice {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<ConsentChoice>;
  const categories = candidate.categories;

  return (
    candidate.version === version &&
    typeof candidate.updatedAt === "string" &&
    Number.isFinite(Date.parse(candidate.updatedAt)) &&
    typeof categories === "object" &&
    categories !== null &&
    typeof categories.analytics === "boolean" &&
    typeof categories.marketing === "boolean"
  );
}

export function readConsent(
  storage: Pick<ConsentStorage, "getItem">,
  version: number,
): ConsentChoice | null {
  let value: string | null;
  try {
    value = storage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }

  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    return isConsentChoice(parsed, version) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsent(
  storage: Pick<ConsentStorage, "setItem">,
  choice: ConsentChoice,
): boolean {
  if (!isConsentChoice(choice, CONSENT_VERSION)) return false;

  try {
    storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
    return true;
  } catch {
    return false;
  }
}

export function serviceAllowed(
  service: Pick<ConsentService, "category">,
  choice: ConsentChoice | null,
): boolean {
  return (
    choice !== null &&
    isConsentChoice(choice, CONSENT_VERSION) &&
    choice.categories[service.category] === true
  );
}

export function activateConsentedServices(
  services: readonly ConsentService[],
  choice: ConsentChoice | null,
): () => void {
  const cleanups: Array<() => void> = [];

  for (const service of services) {
    if (!serviceAllowed(service, choice)) continue;

    try {
      const cleanup = service.load();
      if (cleanup) cleanups.push(cleanup);
    } catch (error) {
      console.error(`Optional consent service failed to load: ${service.id}`, error);
    }
  }

  let stopped = false;
  return () => {
    if (stopped) return;
    stopped = true;

    for (const cleanup of cleanups.reverse()) {
      try {
        cleanup();
      } catch (error) {
        console.error("Optional consent service cleanup failed", error);
      }
    }
  };
}
