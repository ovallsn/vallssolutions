import type { InvasionListing, InvasionPlatform } from "../content/invasion-listings";

export type InvasionCatalogSort = "default" | "diamonds-desc" | "resources-desc";

export type InvasionCatalogFilters = {
  platform: InvasionPlatform | "all";
  vipLevel: number | "all";
  sortBy: InvasionCatalogSort;
};

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

  const field = filters.sortBy === "diamonds-desc" ? "diamonds" : "resources";
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
