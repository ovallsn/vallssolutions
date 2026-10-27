"use client";

import { useId, useMemo, useRef, useState, type FocusEvent as ReactFocusEvent, type PointerEvent as ReactPointerEvent } from "react";
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

function InvasionListingCard({ listing, locale }: { listing: InvasionListing; locale: Locale }) {
  const english = locale === "en";
  const place = getInvasionPlaceLabel(listing);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const lastPointerType = useRef<"mouse" | "pen" | "touch" | null>(null);
  const focusOpenedPreview = useRef(false);
  const previewPanelId = useId();
  const cardRef = useRef<HTMLElement>(null);
  const previewLabel = english ? "Preview account image" : "Ver imagen de la cuenta";
  const whatsapp = listingContact(locale, listing.id);

  function handlePointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (listing.image && (event.pointerType === "mouse" || event.pointerType === "pen")) {
      focusOpenedPreview.current = false;
      setPreviewOpen(true);
    }
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLElement>) {
    if (
      (event.pointerType === "mouse" || event.pointerType === "pen") &&
      !focusOpenedPreview.current
    ) {
      setPreviewOpen(false);
    }
  }

  function handleBlur(event: ReactFocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      focusOpenedPreview.current = false;
      setPreviewOpen(false);
    }
  }

  function handlePreviewKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      focusOpenedPreview.current = false;
      setPreviewOpen(false);
    }
  }

  return (
    <article
      ref={cardRef}
      className={`invasion-listing${previewOpen ? " has-image-preview" : ""}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlur={handleBlur}
      onKeyDown={handlePreviewKeyDown}
    >
      <div className={`invasion-listing-head${listing.image ? " has-image-control" : ""}`}>
        <span className="invasion-listing-number">{listing.id}</span>
        {listing.image && (
          <button
            type="button"
            className="invasion-image-preview-control"
            aria-label={previewLabel}
            aria-expanded={previewOpen}
            aria-controls={previewPanelId}
            title={previewLabel}
            onPointerDown={(event) => {
              lastPointerType.current = event.pointerType as "mouse" | "pen" | "touch";
              focusOpenedPreview.current = false;
            }}
            onFocus={() => {
              if (lastPointerType.current === null) {
                focusOpenedPreview.current = true;
                setPreviewOpen(true);
              }
            }}
            onClick={(event) => {
              if (event.detail === 0 || lastPointerType.current === "touch") {
                setPreviewOpen((open) => {
                  const nextOpen = !open;
                  if (!nextOpen) focusOpenedPreview.current = false;
                  else if (event.detail === 0) focusOpenedPreview.current = true;
                  return nextOpen;
                });
              }
              lastPointerType.current = null;
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.25" y="4.25" width="17.5" height="15.5" rx="1.75" />
              <circle cx="8.25" cy="9" r="1.5" />
              <path d="m4.5 17 5-4.75 3.5 3 2.5-2 4 3.75" />
            </svg>
          </button>
        )}
        <span className="invasion-platform-tag">{listing.platform}</span>
      </div>
      <div className="invasion-listing-name-row">
        <h3>{place}</h3>
        {listing.image && (
          <div
            id={previewPanelId}
            className="invasion-image-preview-panel"
            role="region"
            aria-label={previewLabel}
            hidden={!previewOpen}
          >
            {imageFailed ? (
              <p>{english ? "This account image could not be loaded." : "No se pudo cargar la imagen de esta cuenta."}</p>
            ) : (
              <img
                src={listing.image}
                alt={english ? `Screenshot of the ${place} account` : `Captura de la cuenta ${place}`}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        )}
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
          <dd>{listing.power != null ? formatGameCount(listing.power, locale) : <span className="is-request">{english ? "Ask" : "Consultar"}</span>}</dd>
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
            return <InvasionListingCard listing={listing} locale={locale} key={listing.id} />;
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
