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

const allowedFields = new Set(['id', 'platform', 'vipLevel', 'power', 'diamonds', 'resources', 'zonePasses', 'image']);
const platformByPrefix = { GOO: 'Google', TAP: 'Tap4fun', FB: 'Facebook' };

function isPublicListing(listing) {
  const prefix = listing.id.match(/^INV-(GOO|TAP|FB)-\d{3}$/)?.[1];
  const imagePattern = new RegExp(`^/assets/invasion-accounts/${listing.id}\\.(?:jpg|png|webp)$`);
  return prefix
    && platformByPrefix[prefix] === listing.platform
    && Object.keys(listing).every((field) => allowedFields.has(field))
    && (listing.image === undefined || (typeof listing.image === 'string' && imagePattern.test(listing.image)))
    && Number.isSafeInteger(listing.vipLevel)
    && listing.vipLevel >= 0
    && ['power', 'diamonds', 'resources', 'zonePasses'].every((field) => (
      listing[field] === undefined || (Number.isSafeInteger(listing[field]) && listing[field] >= 0)
    ));
}

test('Invasion catalogue mirrors the shared inventory without inventing sensitive or missing data', () => {
  assert.ok(INVASION_LISTINGS.length > 0);
  assert.equal(new Set(INVASION_LISTINGS.map((listing) => listing.id)).size, INVASION_LISTINGS.length);
  assert.ok(INVASION_LISTINGS.every(isPublicListing));
});

test('Invasion listings allow an optional image only when its path matches the Website ID', () => {
  const listing = INVASION_LISTINGS[0];
  const imagePath = `/assets/invasion-accounts/${listing.id}.jpg`;

  assert.ok(isPublicListing({ ...listing, image: imagePath }));
  assert.equal(isPublicListing({ ...listing, image: imagePath.replace(listing.id, 'INV-FB-999') }), false);
  assert.equal(isPublicListing({ ...listing, image: `/assets/invasion-accounts/${listing.id}.svg` }), false);
  assert.equal(isPublicListing({ ...listing, image: `https://example.com/${listing.id}.jpg` }), false);
});
