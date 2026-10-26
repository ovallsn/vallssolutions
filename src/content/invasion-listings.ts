export type InvasionPlatform = "Google" | "Tap4fun" | "Facebook";

export type InvasionListing = {
  id: string;
  platform: InvasionPlatform;
  displayName: string;
  vipLevel: number;
  diamonds?: number;
  resources?: number;
  zonePasses?: number;
};

// Only information visible in the owner's inventory sheet is included here.
// Account credentials, commander levels, power and prices were not supplied.
export const INVASION_LISTINGS: readonly InvasionListing[] = [
  { id: "INV-GOO-001", platform: "Google", displayName: "OreoBank", vipLevel: 7, diamonds: 852_000, resources: 554_540_000_000, zonePasses: 1 },
  { id: "INV-GOO-002", platform: "Google", displayName: "Madrid", vipLevel: 5, diamonds: 2_470_000, resources: 11_450_000_000, zonePasses: 1 },
  { id: "INV-GOO-003", platform: "Google", displayName: "Barcelona", vipLevel: 8, diamonds: 472_000, resources: 1_700_000_000, zonePasses: 1 },
  { id: "INV-GOO-004", platform: "Google", displayName: "WDPyro91", vipLevel: 10, diamonds: 516_000, resources: 7_000_000_000, zonePasses: 1 },
  { id: "INV-TAP-001", platform: "Tap4fun", displayName: "Fn Nightmare", vipLevel: 10, zonePasses: 10 },
  { id: "INV-TAP-002", platform: "Tap4fun", displayName: "DiknBalls", vipLevel: 10, zonePasses: 4 },
  { id: "INV-TAP-003", platform: "Tap4fun", displayName: "California", vipLevel: 8, zonePasses: 1 },
  { id: "INV-TAP-004", platform: "Tap4fun", displayName: "Madagascar", vipLevel: 10, zonePasses: 1 },
  { id: "INV-TAP-005", platform: "Tap4fun", displayName: "Oxford", vipLevel: 6, zonePasses: 1 },
  { id: "INV-TAP-006", platform: "Tap4fun", displayName: "LosAngeles", vipLevel: 6, zonePasses: 1 },
  { id: "INV-TAP-007", platform: "Tap4fun", displayName: "Narnia", vipLevel: 5, zonePasses: 1 },
  { id: "INV-TAP-008", platform: "Tap4fun", displayName: "Wisconsin", vipLevel: 5, zonePasses: 1 },
  { id: "INV-TAP-009", platform: "Tap4fun", displayName: "London", vipLevel: 7, zonePasses: 1 },
  { id: "INV-TAP-010", platform: "Tap4fun", displayName: "Manchester", vipLevel: 6, zonePasses: 1 },
  { id: "INV-TAP-011", platform: "Tap4fun", displayName: "Idaho", vipLevel: 6, zonePasses: 1 },
  { id: "INV-TAP-012", platform: "Tap4fun", displayName: "Georgia", vipLevel: 6, zonePasses: 1 },
  { id: "INV-TAP-013", platform: "Tap4fun", displayName: "HongKong", vipLevel: 5, zonePasses: 1 },
  { id: "INV-TAP-014", platform: "Tap4fun", displayName: "UnitedK", vipLevel: 5, zonePasses: 1 },
  { id: "INV-FB-001", platform: "Facebook", displayName: "Oreo", vipLevel: 10, diamonds: 9_500_000, resources: 55_250_000_000, zonePasses: 11 },
  { id: "INV-FB-002", platform: "Facebook", displayName: "Acejr", vipLevel: 15, zonePasses: 13 },
  { id: "INV-FB-003", platform: "Facebook", displayName: "Boss", vipLevel: 15 },
];
