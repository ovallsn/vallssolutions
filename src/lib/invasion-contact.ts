/** LINE is reserved for enquiries about Invasion game account listings. */
export const INVASION_LINE_ID = "vallsvallso";

export function invasionLineHref(): string {
  return `https://line.me/ti/p/~${encodeURIComponent(INVASION_LINE_ID)}`;
}
