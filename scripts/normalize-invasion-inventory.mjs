import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';

const PLATFORM_BY_PREFIX = {
  GOO: 'Google',
  TAP: 'Tap4fun',
  FB: 'Facebook',
};
const OPTIONAL_FIELDS = ['power', 'diamonds', 'resources', 'zonePasses'];

export function normalizeInventoryPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Inventory payload must be an object');
  }
  if (payload.version !== 1 || payload.source !== 'google-sheets') {
    throw new Error('Unsupported inventory payload version or source');
  }
  if (!Array.isArray(payload.records) || payload.records.length === 0) {
    throw new Error('Inventory payload must contain at least one record');
  }
  if (payload.records.length > 100) {
    throw new Error('Inventory payload cannot contain more than 100 records');
  }

  const seen = new Set();
  const records = payload.records.map((input, index) => {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      throw new Error(`Record ${index + 1} must be an object`);
    }

    const id = typeof input.id === 'string' ? input.id.trim() : '';
    const idMatch = /^INV-(GOO|TAP|FB)-(\d{3})$/.exec(id);
    if (!idMatch || Number(idMatch[2]) < 1) {
      throw new Error(`Record ${index + 1} has an invalid Website ID`);
    }
    if (seen.has(id)) throw new Error(`Duplicate Website ID: ${id}`);
    seen.add(id);

    const expectedPlatform = PLATFORM_BY_PREFIX[idMatch[1]];
    if (input.platform !== expectedPlatform) {
      throw new Error(`Platform does not match Website ID ${id}`);
    }
    if (!Number.isSafeInteger(input.vipLevel) || input.vipLevel < 0 || input.vipLevel > 99) {
      throw new Error(`Record ${id} has an invalid vipLevel`);
    }

    const record = { id, platform: expectedPlatform, vipLevel: input.vipLevel };
    for (const field of OPTIONAL_FIELDS) {
      if (input[field] === undefined) continue;
      if (!Number.isSafeInteger(input[field]) || input[field] < 0) {
        throw new Error(`Record ${id} has an invalid ${field}`);
      }
      record[field] = input[field];
    }
    return record;
  });

  return records.sort((left, right) => left.id.localeCompare(right.id));
}

async function writeNormalizedInventory() {
  const rawPayload = process.env.INVASION_INVENTORY_PAYLOAD;
  if (!rawPayload) throw new Error('Missing INVASION_INVENTORY_PAYLOAD');

  const payload = JSON.parse(rawPayload);
  const records = normalizeInventoryPayload(payload);
  const target = resolve('src/content/invasion-listings-data.json');
  await writeFile(target, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  writeNormalizedInventory().catch((error) => {
    console.error(`Invasion inventory rejected: ${error.message}`);
    process.exitCode = 1;
  });
}
