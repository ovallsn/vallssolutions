import assert from 'node:assert/strict';
import test from 'node:test';
import { INVASION_LISTINGS } from '../src/content/invasion-listings.ts';
import { ROUTES } from '../src/lib/routes.ts';

test('Invasion account listings use private, localized, descriptive routes', () => {
  assert.deepEqual(ROUTES.invasionAccounts, {
    en: '/invasion-accounts/',
    es: '/es/cuentas-invasion/',
  });
});

test('Invasion catalogue mirrors the shared inventory without inventing sensitive or missing data', () => {
  assert.equal(INVASION_LISTINGS.length, 21);
  assert.deepEqual(
    Object.keys(Object.groupBy(INVASION_LISTINGS, (listing) => listing.platform)).sort(),
    ['Facebook', 'Google', 'Tap4fun'],
  );
  assert.equal(INVASION_LISTINGS.filter((listing) => listing.platform === 'Google').length, 4);
  assert.equal(INVASION_LISTINGS.filter((listing) => listing.platform === 'Tap4fun').length, 14);
  assert.equal(INVASION_LISTINGS.filter((listing) => listing.platform === 'Facebook').length, 3);
  assert.equal(new Set(INVASION_LISTINGS.map((listing) => listing.id)).size, INVASION_LISTINGS.length);
  assert.deepEqual(INVASION_LISTINGS[0], {
    id: 'INV-GOO-001',
    platform: 'Google',
    displayName: 'OreoBank',
    vipLevel: 7,
    diamonds: 852_000,
    resources: 554_540_000_000,
    zonePasses: 1,
  });
  assert.ok(INVASION_LISTINGS.every((listing) => !('commanderLevel' in listing) && !('power' in listing) && !('price' in listing)));
  assert.ok(INVASION_LISTINGS.every((listing) => !('password' in listing) && !('email' in listing)));
});
