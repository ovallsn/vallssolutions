import { readdir, readFile, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const MANAGED_IMAGE = /^(INV-(?:GOO|TAP|FB)-\d{3})\.(?:jpg|png|webp)$/;

export async function pruneUnreferencedInvasionImages(records, assetsDirectory) {
  const referenced = new Set();
  for (const record of records) {
    if (typeof record.image !== 'string') continue;
    const match = /^\/assets\/invasion-accounts\/(INV-(?:GOO|TAP|FB)-\d{3})\.(?:jpg|png|webp)$/.exec(record.image);
    if (match && match[1] === record.id) referenced.add(record.image.split('/').at(-1));
  }

  let entries;
  try {
    entries = await readdir(assetsDirectory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }

  const removed = [];
  for (const entry of entries) {
    if (!entry.isFile() || !MANAGED_IMAGE.test(entry.name) || referenced.has(entry.name)) continue;
    await unlink(resolve(assetsDirectory, entry.name));
    removed.push(entry.name);
  }
  return removed.sort();
}

async function pruneInventoryImages() {
  const inventoryPath = resolve('src/content/invasion-listings-data.json');
  const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'));
  const assetsDirectory = resolve('public/assets/invasion-accounts');
  await pruneUnreferencedInvasionImages(inventory, assetsDirectory);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  pruneInventoryImages().catch((error) => {
    console.error(`Invasion image cleanup failed: ${error.message}`);
    process.exitCode = 1;
  });
}
