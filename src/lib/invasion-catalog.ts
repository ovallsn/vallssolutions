import type { InvasionListing, InvasionPlatform } from "../content/invasion-listings";

export type InvasionCatalogSort = "default" | "diamonds-desc" | "resources-desc" | "vip-desc";

export type InvasionCatalogFilters = {
  platform: InvasionPlatform | "all";
  vipLevel: number | "all";
  sortBy: InvasionCatalogSort;
};

const PLACE_LABELS: Record<InvasionPlatform, readonly string[]> = {
  Google: [
    "Kyoto", "Lisbon", "Reykjavik", "Marrakech", "Tallinn", "Quito", "Osaka", "Valencia", "Verona", "Muscat",
    "Dresden", "Ulaanbaatar", "Antwerp", "Nantes", "Vilnius", "Fukuoka", "Nairobi", "Riga", "La Paz", "Lecce",
  ],
  Facebook: [
    "Sapporo", "Naples", "Antigua", "Granada", "Taipei", "Dakar", "Bergen", "Cusco", "Cork", "Tulum",
    "Ubud", "Kigali", "Samarkand", "Antalya", "Baku", "Incheon", "Gdansk", "Tunis", "Bristol", "Bruges",
  ],
  Tap4fun: [
    "Batumi", "Florence", "Jaipur", "Tbilisi", "Oslo", "Singapore", "Adelaide", "Porto", "Helsinki", "Siena",
    "Cebu", "Lyon", "Doha", "Zagreb", "Salzburg", "Malaga", "Milan", "Auckland", "Seville", "Vancouver",
  ],
};

export function getInvasionPlaceLabel(listing: Pick<InvasionListing, "id" | "platform">): string {
  const serial = Number(listing.id.match(/-(\d+)$/)?.[1]);
  const labels = PLACE_LABELS[listing.platform];
  const index = Number.isSafeInteger(serial) && serial > 0 ? (serial - 1) % labels.length : 0;
  return labels[index] ?? labels[0];
}

export function filterAndSortInvasionListings(
  listings: readonly InvasionListing[],
  filters: InvasionCatalogFilters,
): InvasionListing[] {
  const matchingListings = listings.filter((listing) => {
    const matchesPlatform = filters.platform === "all" || listing.platform === filters.platform;
    const matchesVip = filters.vipLevel === "all" || listing.vipLevel === filters.vipLevel;
    return matchesPlatform && matchesVip;
  });

  if (filters.sortBy === "default") return matchingListings;

  const field =
    filters.sortBy === "diamonds-desc"
      ? "diamonds"
      : filters.sortBy === "resources-desc"
        ? "resources"
        : "vipLevel";
  return matchingListings
    .map((listing, index) => ({ listing, index }))
    .sort((a, b) => {
      const aValue = a.listing[field];
      const bValue = b.listing[field];
      if (aValue == null && bValue == null) return a.index - b.index;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      return bValue - aValue || a.index - b.index;
    })
    .map(({ listing }) => listing);
}
