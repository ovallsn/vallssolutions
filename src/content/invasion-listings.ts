import inventoryData from "./invasion-listings-data.json" with { type: "json" };

export type InvasionPlatform = "Google" | "Tap4fun" | "Facebook";

export type InvasionListing = {
  id: string;
  platform: InvasionPlatform;
  vipLevel: number;
  power?: number;
  commanderLevel?: number;
  hqLevel?: string;
  diamonds?: number;
  resources?: number;
  zonePasses?: number;
  image?: string;
};

// This JSON is updated by the validated Google Sheets → GitHub Actions sync.
// Keep this public type limited to the fields intentionally shown in the catalogue.
export const INVASION_LISTINGS: readonly InvasionListing[] = inventoryData as InvasionListing[];
