import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { INVASION_LISTINGS } from '../src/content/invasion-listings.ts';

const catalogModule = await import('../src/lib/invasion-catalog.ts').catch(() => ({}));
const { filterAndSortInvasionListings, getInvasionPlaceLabel } = catalogModule;

function relativeLuminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((channel) => parseInt(channel, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

test('catalog inquiry values meet normal-text contrast on listing cards', () => {
  const css = readFileSync(new URL('../src/app/conversion-polish.css', import.meta.url), 'utf8');
  const globalCss = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  const foreground = css.match(/\.invasion-stats \.is-request \{\s*color:\s*(#[a-f\d]{6})/i)?.[1];
  const background = globalCss.match(/--white:\s*(#[a-f\d]{6})/i)?.[1];
  assert.ok(foreground && background, 'card foreground and surface colors should be explicit tokens');
  const light = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const dark = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  assert.ok((light + 0.05) / (dark + 0.05) >= 4.5, `${foreground} on ${background} must reach 4.5:1`);
});

test('public Invasion listings do not contain account nicknames', () => {
  assert.ok(INVASION_LISTINGS.every((listing) => !Object.hasOwn(listing, 'displayName')));
});

test('public listing labels use stable place names instead of account profile numbers', () => {
  assert.equal(typeof getInvasionPlaceLabel, 'function');
  if (typeof getInvasionPlaceLabel !== 'function') return;

  const labels = INVASION_LISTINGS.map((listing) => getInvasionPlaceLabel(listing));
  assert.equal(getInvasionPlaceLabel(INVASION_LISTINGS[0]), 'Kyoto');
  assert.equal(getInvasionPlaceLabel(INVASION_LISTINGS.find((listing) => listing.id === 'INV-TAP-001')), 'Batumi');
  assert.equal(new Set(labels).size, labels.length);
  assert.ok(labels.every((label) => !/^Account profile|^Perfil de cuenta/i.test(label)));
});

test('catalog filters combine login platform and VIP level', () => {
  assert.equal(typeof filterAndSortInvasionListings, 'function');
  if (typeof filterAndSortInvasionListings !== 'function') return;

  const results = filterAndSortInvasionListings(INVASION_LISTINGS, {
    platform: 'Tap4fun',
    vipLevel: 10,
    sortBy: 'default',
  });

  assert.deepEqual(results.map((listing) => listing.id), ['INV-TAP-001', 'INV-TAP-002', 'INV-TAP-004']);
});

test('catalog sorts diamonds high to low and puts unlisted values last', () => {
  assert.equal(typeof filterAndSortInvasionListings, 'function');
  if (typeof filterAndSortInvasionListings !== 'function') return;

  const results = filterAndSortInvasionListings(INVASION_LISTINGS, {
    platform: 'all',
    vipLevel: 'all',
    sortBy: 'diamonds-desc',
  });

  assert.deepEqual(results.slice(0, 3).map((listing) => listing.id), ['INV-FB-001', 'INV-GOO-002', 'INV-GOO-001']);
  assert.ok(results.slice(5).every((listing) => listing.diamonds === undefined));
});

test('catalog sorts resources high to low with deterministic original order for ties', () => {
  assert.equal(typeof filterAndSortInvasionListings, 'function');
  if (typeof filterAndSortInvasionListings !== 'function') return;

  const tiedListing = { ...INVASION_LISTINGS.find((listing) => listing.id === 'INV-GOO-004'), id: 'INV-TIE-001' };
  const results = filterAndSortInvasionListings([...INVASION_LISTINGS, tiedListing], {
    platform: 'all',
    vipLevel: 'all',
    sortBy: 'resources-desc',
  });

  assert.deepEqual(results.slice(0, 4).map((listing) => listing.id), ['INV-GOO-001', 'INV-FB-001', 'INV-GOO-002', 'INV-GOO-004']);
  assert.equal(results[4].id, 'INV-TIE-001');
  assert.ok(results.slice(6).every((listing) => listing.resources === undefined));
});
