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
  const allowedFields = new Set(['id', 'platform', 'vipLevel', 'power', 'diamonds', 'resources', 'zonePasses']);
  const platformByPrefix = { GOO: 'Google', TAP: 'Tap4fun', FB: 'Facebook' };

  assert.ok(INVASION_LISTINGS.length > 0);
  assert.equal(new Set(INVASION_LISTINGS.map((listing) => listing.id)).size, INVASION_LISTINGS.length);
  assert.ok(INVASION_LISTINGS.every((listing) => {
    const prefix = listing.id.match(/^INV-(GOO|TAP|FB)-\d{3}$/)?.[1];
    return prefix
      && platformByPrefix[prefix] === listing.platform
      && Object.keys(listing).every((field) => allowedFields.has(field))
      && Number.isSafeInteger(listing.vipLevel)
      && listing.vipLevel >= 0
      && ['power', 'diamonds', 'resources', 'zonePasses'].every((field) => (
        listing[field] === undefined || (Number.isSafeInteger(listing[field]) && listing[field] >= 0)
      ));
  }));
});
