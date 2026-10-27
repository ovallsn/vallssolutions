"use client";

import { useMemo, useState } from "react";
import { ContactIcon } from "@/components/ContactIcons";
import type { InvasionListing, InvasionPlatform } from "@/content/invasion-listings";
import { filterAndSortInvasionListings, getInvasionPlaceLabel, type InvasionCatalogSort } from "@/lib/invasion-catalog";
import { CONTACT_EMAIL, whatsappHref, type Locale } from "@/lib/site";

const PLATFORM_OPTIONS: readonly (InvasionPlatform | "all")[] = ["all", "Google", "Facebook", "Tap4fun"];

function formatGameCount(value: number, locale: Locale): string {
  const units = [
    { limit: 1_000_000_000, suffix: "B" },
    { limit: 1_000_000, suffix: "M" },
    { limit: 1_000, suffix: "K" },
  ];
  const unit = units.find(({ limit }) => value >= limit);
  if (!unit) return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US").format(value);
  const amount = (value / unit.limit).toLocaleString(locale === "es" ? "es-ES" : "en-US", {
    maximumFractionDigits: 2,
  });
  return `${amount}${unit.suffix}`;
}

function listingContact(locale: Locale, id: string) {
  const message =
    locale === "es"
      ? `Hola, me interesa la cuenta de Invasion ${id}. ¿Podéis confirmarme disponibilidad, precio y los datos completos?`
      : `Hello, I'm interested in Invasion account ${id}. Could you confirm availability, price and the full account details?`;
  return whatsappHref(locale, message);
}

function listingEmail(locale: Locale, id: string): string {
  const subject = locale === "es" ? `Consulta sobre la cuenta ${id}` : `Question about account ${id}`;
  const body =
    locale === "es"
      ? `Hola,\n\nMe interesa la cuenta de Invasion ${id}. ¿Podéis confirmarme disponibilidad, precio y los datos completos?`
      : `Hello,\n\nI'm interested in Invasion account ${id}. Could you confirm availability, price and the full account details?`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function platformName(platform: InvasionPlatform | "all", locale: Locale): string {
  if (platform !== "all") return platform;
  return locale === "es" ? "Todas" : "All platforms";
}

export function InvasionCatalog({ locale, listings }: { locale: Locale; listings: readonly InvasionListing[] }) {
  const english = locale === "en";
  const [platform, setPlatform] = useState<InvasionPlatform | "all">("all");
  const [vipLevel, setVipLevel] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<InvasionCatalogSort>("default");
  const results = useMemo(
    () => filterAndSortInvasionListings(listings, { platform, vipLevel, sortBy }),
    [listings, platform, sortBy, vipLevel],
  );
  const platformCounts = useMemo(
    () => new Map(PLATFORM_OPTIONS.map((option) => [option, option === "all" ? listings.length : listings.filter((item) => item.platform === option).length])),
    [listings],
  );
  const vipLevels = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.vipLevel))).sort((a, b) => b - a),
    [listings],
  );
  const isFiltered = platform !== "all" || vipLevel !== "all" || sortBy !== "default";

  return (
    <div className="invasion-catalog-browser">
      <div className="invasion-catalog-tools">
        <fieldset className="invasion-platform-filter">
          <legend>{english ? "Login platform" : "Plataforma de acceso"}</legend>
          <div className="invasion-platform-options">
            {PLATFORM_OPTIONS.map((option) => (
              <button
                type="button"
                key={option}
                aria-pressed={platform === option}
                className={platform === option ? "is-selected" : undefined}
                onClick={() => setPlatform(option)}
              >
                <span>{platformName(option, locale)}</span>
                <small>{platformCounts.get(option)}</small>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="invasion-catalog-selects">
          <label className="invasion-select-control">
            <span>{english ? "VIP level" : "Nivel VIP"}</span>
            <select value={vipLevel} onChange={(event) => setVipLevel(event.target.value === "all" ? "all" : Number(event.target.value))}>
              <option value="all">{english ? "Any VIP" : "Cualquier VIP"}</option>
              {vipLevels.map((level) => <option value={level} key={level}>VIP {level}</option>)}
            </select>
          </label>
          <label className="invasion-select-control">
            <span>{english ? "Sort by" : "Ordenar por"}</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as InvasionCatalogSort)}>
              <option value="default">{english ? "Original order" : "Orden original"}</option>
              <option value="diamonds-desc">{english ? "Diamonds: high to low" : "Diamantes: de mayor a menor"}</option>
              <option value="resources-desc">{english ? "Resources: high to low" : "Recursos: de mayor a menor"}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="invasion-results-bar">
        <p role="status" aria-live="polite" aria-atomic="true">
          {english ? `Showing ${results.length} of ${listings.length} accounts` : `Mostrando ${results.length} de ${listings.length} cuentas`}
        </p>
        {isFiltered && (
          <button type="button" className="invasion-reset-filters" onClick={() => {
            setPlatform("all");
            setVipLevel("all");
            setSortBy("default");
          }}>
            {english ? "Clear filters" : "Quitar filtros"}
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="invasion-listing-grid">
          {results.map((listing) => {
            const whatsapp = listingContact(locale, listing.id);
            return (
              <article className="invasion-listing" key={listing.id}>
                <div className="invasion-listing-head">
                  <span className="invasion-listing-number">{listing.id}</span>
                  <span className="invasion-platform-tag">{listing.platform}</span>
                </div>
                <div className="invasion-listing-name-row">
                  <h3>{getInvasionPlaceLabel(listing)}</h3>
                </div>
                <dl className="invasion-stats">
                  <div>
                    <dt>{english ? "Commander level" : "Nivel comandante"}</dt>
                    <dd className="is-request">{english ? "Ask" : "Consultar"}</dd>
                  </div>
                  <div>
                    <dt>VIP</dt>
                    <dd>{listing.vipLevel}</dd>
                  </div>
                  <div>
                    <dt>{english ? "Diamonds" : "Diamantes"}</dt>
                    <dd>{listing.diamonds != null ? formatGameCount(listing.diamonds, locale) : <span className="is-request">{english ? "Ask" : "Consultar"}</span>}</dd>
                  </div>
                  <div>
                    <dt>{english ? "Resources" : "Recursos"}</dt>
                    <dd>{listing.resources != null ? formatGameCount(listing.resources, locale) : <span className="is-request">{english ? "Ask" : "Consultar"}</span>}</dd>
                  </div>
                  <div>
                    <dt>Zone Pass</dt>
                    <dd>{listing.zonePasses ?? <span className="is-request">{english ? "Ask" : "Consultar"}</span>}</dd>
                  </div>
                  <div>
                    <dt>{english ? "Total power" : "Poder total"}</dt>
                    <dd className="is-request">{english ? "Ask" : "Consultar"}</dd>
                  </div>
                </dl>
                <div className="invasion-listing-foot">
                  <span>{english ? "Price on request" : "Precio al consultar"}</span>
                  <div>
                    {whatsapp && (
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={english ? `Ask about ${listing.id} on WhatsApp` : `Consultar ${listing.id} por WhatsApp`}>
                        <ContactIcon name="whatsapp" />
                        <span>{english ? "Ask" : "Consultar"}</span>
                      </a>
                    )}
                    <a href={listingEmail(locale, listing.id)} aria-label={english ? `Email about ${listing.id}` : `Escribir sobre ${listing.id}`}>
                      <ContactIcon name="mail" />
                      <span>{english ? "Email" : "Correo"}</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="invasion-empty-state">
          {english ? "No accounts match these filters. Clear filters to see all listings." : "No hay cuentas que coincidan con estos filtros. Quita los filtros para verlas todas."}
        </p>
      )}
    </div>
  );
}
