import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const appsScriptPath = new URL('../integrations/invasion-sheet/Code.gs', import.meta.url);
const appsScriptContext = {};
if (existsSync(appsScriptPath)) {
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), appsScriptContext);
}

let normalizeInventoryPayload;
let pruneUnreferencedInvasionImages;
try {
  ({ normalizeInventoryPayload } = await import('../scripts/normalize-invasion-inventory.mjs'));
} catch {
  // The first run is expected to fail until the implementation is added.
}
try {
  ({ pruneUnreferencedInvasionImages } = await import('../scripts/prune-invasion-images.mjs'));
} catch {
  // The first run is expected to fail until the implementation is added.
}

function jsonResponse(status, payload) {
  return {
    getResponseCode: () => status,
    getContentText: () => JSON.stringify(payload),
  };
}

test('parses locale-formatted game counts with K, M and B suffixes', () => {
  assert.equal(typeof appsScriptContext.parseGameNumber, 'function');
  if (typeof appsScriptContext.parseGameNumber !== 'function') return;

  assert.equal(appsScriptContext.parseGameNumber('554,54B'), 554_540_000_000);
  assert.equal(appsScriptContext.parseGameNumber('2.47M'), 2_470_000);
  assert.equal(appsScriptContext.parseGameNumber('1.234B'), 1_234_000_000);
  assert.equal(appsScriptContext.parseGameNumber('1,234'), 1_234);
  assert.equal(appsScriptContext.parseGameNumber('852K'), 852_000);
  assert.equal(appsScriptContext.parseGameNumber('13'), 13);
});

test('extracts account statistics by Website ID and never exports sheet names', () => {
  assert.equal(typeof appsScriptContext.extractInventoryFromRows, 'function');
  if (typeof appsScriptContext.extractInventoryFromRows !== 'function') return;

  const rows = [
    ['Gifters Google'],
    ['', 'Name', 'Website ID', 'Power', 'VIP Level', 'Diamonds', 'Resources', 'Zone Pass'],
    ['', 'OreoBank', 'INV-GOO-001', '3.42M', 7, '852K', '554,54B', 1],
    ['Gifters Facebook'],
    ['', 'Name', 'Website ID', 'Power', 'VIP Level', 'Diamonds', 'Resources', 'Zone Pass'],
    ['', 'Oreo', 'INV-FB-001', '', 10, '9.5M', '55.25B', 11],
  ];

  const payload = appsScriptContext.extractInventoryFromRows(rows, rows);
  assert.equal(payload.version, 1);
  assert.equal(payload.source, 'google-sheets');
  assert.deepEqual(JSON.parse(JSON.stringify(payload.records)), [
    {
      id: 'INV-GOO-001',
      platform: 'Google',
      vipLevel: 7,
      power: 3_420_000,
      diamonds: 852_000,
      resources: 554_540_000_000,
      zonePasses: 1,
    },
    {
      id: 'INV-FB-001',
      platform: 'Facebook',
      vipLevel: 10,
      diamonds: 9_500_000,
      resources: 55_250_000_000,
      zonePasses: 11,
    },
  ]);
  assert.doesNotMatch(JSON.stringify(payload), /OreoBank|"Oreo"/);
});

test('associates optional in-cell images with the correct Website ID, not row order', () => {
  assert.equal(typeof appsScriptContext.extractInventorySnapshot, 'function');
  if (typeof appsScriptContext.extractInventorySnapshot !== 'function') return;

  const firstImage = { valueType: 'IMAGE', getContentUrl: () => 'temporary-google-image-1' };
  const secondImage = { valueType: 'IMAGE', getContentUrl: () => 'temporary-google-image-2' };
  const values = [
    ['Gifters Tap4fun'],
    ['', 'Name', 'Website ID', 'Power', 'VIP Level', 'Diamonds', 'Resources', 'Zone Pass', 'Image'],
    ['', 'Private row name 2', 'INV-TAP-002', '', 10, '', '', 4, secondImage],
    ['', 'Private row name 1', 'INV-TAP-001', '', 15, '', '', 15, firstImage],
    ['', 'Private row name 3', 'INV-TAP-003', '', 8, '', '', 1, ''],
  ];

  const snapshot = appsScriptContext.extractInventorySnapshot(values, values);
  assert.deepEqual(Object.keys(snapshot.imageCells).sort(), ['INV-TAP-001', 'INV-TAP-002']);
  assert.equal(snapshot.imageCells['INV-TAP-001'], firstImage);
  assert.equal(snapshot.imageCells['INV-TAP-002'], secondImage);
  assert.equal(Object.hasOwn(snapshot.payload.records[2], 'image'), false);
  assert.doesNotMatch(JSON.stringify(snapshot.payload), /Private row name|temporary-google-image/);
});

test('validates image MIME, file signature, supported formats and sync size limits', () => {
  assert.equal(typeof appsScriptContext.validateInventoryImage_, 'function');
  if (typeof appsScriptContext.validateInventoryImage_ !== 'function') return;

  const response = (contentType, bytes) => ({
    getHeaders: () => ({ 'Content-Type': contentType }),
    getBlob: () => ({ getBytes: () => bytes }),
  });
  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const jpeg = [0xff, 0xd8, 0xff, 0xe0];
  const webp = [0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50];

  assert.equal(appsScriptContext.validateInventoryImage_(response('image/png', png), 0).extension, 'png');
  assert.equal(appsScriptContext.validateInventoryImage_(response('image/jpeg', jpeg), 0).extension, 'jpg');
  assert.equal(appsScriptContext.validateInventoryImage_(response('image/webp', webp), 0).extension, 'webp');
  assert.throws(() => appsScriptContext.validateInventoryImage_(response('image/svg+xml', [0x3c, 0x73, 0x76, 0x67]), 0), /unsupported image/i);
  assert.throws(() => appsScriptContext.validateInventoryImage_(response('image/png', jpeg), 0), /does not match/i);
  assert.throws(() => appsScriptContext.validateInventoryImage_(response('image/png', [...png, ...new Array(1_048_569).fill(0)]), 0), /1 MB/i);
  assert.throws(() => appsScriptContext.validateInventoryImage_(response('image/png', png), 20 * 1_048_576), /20 MB/i);
});

test('uploads changed image blobs in one commit and returns paths by Website ID', () => {
  assert.equal(typeof appsScriptContext.syncInventoryImages, 'function');
  if (typeof appsScriptContext.syncInventoryImages !== 'function') return;

  const calls = [];
  const googleImages = {
    'https://lh3.googleusercontent.com/first': { type: 'image/png', bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
    'https://lh3.googleusercontent.com/second': { type: 'image/jpeg', bytes: [0xff, 0xd8, 0xff, 0xe0] },
  };
  const context = {
    UrlFetchApp: {
      fetch(url, options = {}) {
        if (googleImages[url]) {
          const image = googleImages[url];
          calls.push({ kind: 'image', url });
          return {
            getResponseCode: () => 200,
            getHeaders: () => ({ 'Content-Type': image.type }),
            getBlob: () => ({ getBytes: () => image.bytes }),
          };
        }
        const endpoint = url.replace('https://api.github.com/repos/ovallsn/vallssolutions', '');
        calls.push({ kind: options.method || 'GET', endpoint, payload: options.payload });
        if (endpoint === '/git/ref/heads/main') return jsonResponse(200, { object: { sha: 'head-1' } });
        if (endpoint === '/git/commits/head-1') return jsonResponse(200, { tree: { sha: 'base-tree' } });
        if (endpoint === '/git/trees/base-tree?recursive=1') return jsonResponse(200, { tree: [], truncated: false });
        if (endpoint === '/git/blobs') return jsonResponse(201, { sha: `blob-${calls.filter((call) => call.endpoint === '/git/blobs').length}` });
        if (endpoint === '/git/trees') return jsonResponse(201, { sha: 'new-tree' });
        if (endpoint === '/git/commits') return jsonResponse(201, { sha: 'new-commit' });
        if (endpoint === '/git/refs/heads/main') return jsonResponse(200, { object: { sha: 'new-commit' } });
        throw new Error(`Unexpected endpoint ${endpoint}`);
      },
    },
    Utilities: { base64Encode: (bytes) => Buffer.from(bytes).toString('base64') },
  };
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), context);

  const paths = context.syncInventoryImages({
    'INV-TAP-002': { valueType: 'IMAGE', getContentUrl: () => 'https://lh3.googleusercontent.com/second' },
    'INV-TAP-001': { valueType: 'IMAGE', getContentUrl: () => 'https://lh3.googleusercontent.com/first' },
  }, 'test-token');

  assert.deepEqual(JSON.parse(JSON.stringify(paths)), {
    'INV-TAP-001': '/assets/invasion-accounts/INV-TAP-001.png',
    'INV-TAP-002': '/assets/invasion-accounts/INV-TAP-002.jpg',
  });
  assert.equal(calls.filter((call) => call.endpoint === '/git/trees').length, 1);
  assert.equal(calls.filter((call) => call.endpoint === '/git/commits').length, 1);
  assert.equal(calls.filter((call) => call.endpoint === '/git/refs/heads/main').length, 1);
  const blobCalls = calls.filter((call) => call.endpoint === '/git/blobs');
  assert.equal(blobCalls.length, 2);
  assert.match(blobCalls[0].payload, /"encoding":"base64"/);
  assert.doesNotMatch(JSON.stringify(calls), /test-token|Private row name/);
});

test('does not create a tree commit or move main when an image blob is already current', () => {
  const calls = [];
  const context = {};
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), context);
  context.UrlFetchApp = {
    fetch(url, options = {}) {
      if (url.startsWith('https://lh3.googleusercontent.com/')) {
        return {
          getResponseCode: () => 200,
          getHeaders: () => ({ 'Content-Type': 'image/png' }),
          getBlob: () => ({ getBytes: () => [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }),
        };
      }
      const endpoint = url.replace('https://api.github.com/repos/ovallsn/vallssolutions', '');
      calls.push({ method: options.method || 'get', endpoint });
      if (endpoint === '/git/ref/heads/main') return jsonResponse(200, { object: { sha: 'head-1' } });
      if (endpoint === '/git/commits/head-1') return jsonResponse(200, { tree: { sha: 'base-tree' } });
      if (endpoint === '/git/trees/base-tree?recursive=1') {
        return jsonResponse(200, {
          truncated: false,
          tree: [{ path: 'public/assets/invasion-accounts/INV-TAP-001.png', sha: 'blob-existing' }],
        });
      }
      if (endpoint === '/git/blobs') return jsonResponse(201, { sha: 'blob-existing' });
      throw new Error(`Unexpected endpoint ${endpoint}`);
    },
  };
  context.Utilities = { base64Encode: (bytes) => Buffer.from(bytes).toString('base64') };

  const paths = context.syncInventoryImages({
    'INV-TAP-001': { getContentUrl: () => 'https://lh3.googleusercontent.com/current' },
  }, 'token');

  assert.equal(paths['INV-TAP-001'], '/assets/invasion-accounts/INV-TAP-001.png');
  assert.equal(calls.some((call) => call.endpoint === '/git/trees'), false);
  assert.equal(calls.some((call) => call.endpoint === '/git/commits'), false);
  assert.equal(calls.some((call) => call.method === 'patch'), false);
});

test('skips GitHub requests when no image cells exist and rejects oversized aggregate uploads', () => {
  assert.equal(typeof appsScriptContext.syncInventoryImages, 'function');
  if (typeof appsScriptContext.syncInventoryImages !== 'function') return;

  let fetchCalls = 0;
  const context = {};
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), context);
  context.UrlFetchApp = { fetch() { fetchCalls += 1; throw new Error('unexpected fetch'); } };
  assert.deepEqual(JSON.parse(JSON.stringify(context.syncInventoryImages({}, 'token'))), {});
  assert.equal(fetchCalls, 0);

  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const largePng = [...png, ...new Array(1_048_568).fill(0)];
  context.UrlFetchApp = {
    fetch() {
      fetchCalls += 1;
      return {
        getResponseCode: () => 200,
        getHeaders: () => ({ 'Content-Type': 'image/png' }),
        getBlob: () => ({ getBytes: () => largePng }),
      };
    },
  };
  const images = Object.fromEntries(Array.from({ length: 21 }, (_, index) => {
    const id = `INV-TAP-${String(index + 1).padStart(3, '0')}`;
    return [id, { getContentUrl: () => `https://lh3.googleusercontent.com/${id}` }];
  }));
  assert.throws(() => context.syncInventoryImages(images, 'token'), /20 MB/i);
  assert.equal(fetchCalls, 21);
});

test('fails closed on image download and GitHub ref update errors before inventory dispatch', () => {
  assert.equal(typeof appsScriptContext.publishInventorySnapshot_, 'function');
  if (typeof appsScriptContext.publishInventorySnapshot_ !== 'function') return;

  const context = {};
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), context);
  let dispatched = false;
  context.syncInventoryImages = () => { throw new Error('GitHub ref update failed with HTTP 409'); };
  context.postInventorySnapshot = () => { dispatched = true; };
  assert.throws(() => context.publishInventorySnapshot_(
    { payload: { records: [{ id: 'INV-TAP-001' }] }, imageCells: { 'INV-TAP-001': {} } },
    'test-token',
  ), /HTTP 409/);
  assert.equal(dispatched, false);
});

test('dispatches only stable image paths matched to public Website IDs', () => {
  const context = {};
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), context);
  let dispatchedPayload;
  context.syncInventoryImages = () => ({
    'INV-TAP-002': '/assets/invasion-accounts/INV-TAP-002.webp',
  });
  context.postInventorySnapshot = (payload) => { dispatchedPayload = payload; };

  context.publishInventorySnapshot_(
    {
      payload: {
        version: 1,
        source: 'google-sheets',
        records: [
          { id: 'INV-TAP-001', platform: 'Tap4fun', vipLevel: 7 },
          { id: 'INV-TAP-002', platform: 'Tap4fun', vipLevel: 10 },
        ],
      },
      imageCells: { 'INV-TAP-002': { getContentUrl: () => 'https://lh3.googleusercontent.com/image' } },
    },
    'token',
  );

  assert.equal(dispatchedPayload.records[0].image, undefined);
  assert.equal(dispatchedPayload.records[1].image, '/assets/invasion-accounts/INV-TAP-002.webp');
  assert.doesNotMatch(JSON.stringify(dispatchedPayload), /lh3\.googleusercontent|Private row name/);
});

test('does not dispatch inventory when a Google image download fails', () => {
  const context = {};
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), context);
  let dispatched = false;
  context.UrlFetchApp = { fetch: () => ({ getResponseCode: () => 403 }) };
  context.postInventorySnapshot = () => { dispatched = true; };

  assert.throws(() => context.publishInventorySnapshot_(
    {
      payload: { version: 1, source: 'google-sheets', records: [{ id: 'INV-TAP-001' }] },
      imageCells: { 'INV-TAP-001': { getContentUrl: () => 'https://lh3.googleusercontent.com/image' } },
    },
    'token',
  ), /HTTP 403/);
  assert.equal(dispatched, false);
});

test('does not dispatch inventory when updating the GitHub main ref conflicts', () => {
  const calls = [];
  const context = {};
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), context);
  context.Utilities = { base64Encode: (bytes) => Buffer.from(bytes).toString('base64') };
  context.UrlFetchApp = {
    fetch(url, options = {}) {
      if (url.startsWith('https://lh3.googleusercontent.com/')) {
        return {
          getResponseCode: () => 200,
          getHeaders: () => ({ 'Content-Type': 'image/png' }),
          getBlob: () => ({ getBytes: () => [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }),
        };
      }
      const endpoint = url.replace('https://api.github.com/repos/ovallsn/vallssolutions', '');
      calls.push({ method: options.method || 'get', endpoint });
      if (endpoint === '/git/ref/heads/main') return jsonResponse(200, { object: { sha: 'head-1' } });
      if (endpoint === '/git/commits/head-1') return jsonResponse(200, { tree: { sha: 'base-tree' } });
      if (endpoint === '/git/trees/base-tree?recursive=1') return jsonResponse(200, { tree: [], truncated: false });
      if (endpoint === '/git/blobs') return jsonResponse(201, { sha: 'blob-new' });
      if (endpoint === '/git/trees') return jsonResponse(201, { sha: 'new-tree' });
      if (endpoint === '/git/commits') return jsonResponse(201, { sha: 'new-commit' });
      if (endpoint === '/git/refs/heads/main') return jsonResponse(409, {});
      if (endpoint === '/dispatches') return jsonResponse(204, {});
      throw new Error(`Unexpected endpoint ${endpoint}`);
    },
  };
  let dispatched = false;
  context.postInventorySnapshot = () => { dispatched = true; };

  assert.throws(() => context.publishInventorySnapshot_(
    {
      payload: { version: 1, source: 'google-sheets', records: [{ id: 'INV-TAP-001' }] },
      imageCells: { 'INV-TAP-001': { getContentUrl: () => 'https://lh3.googleusercontent.com/new' } },
    },
    'token',
  ), /HTTP 409/);
  assert.equal(dispatched, false);
  assert.equal(calls.some((call) => call.endpoint === '/dispatches'), false);
});

test('normalizes a valid dispatch snapshot and discards unknown private fields', () => {
  assert.equal(typeof normalizeInventoryPayload, 'function');
  if (typeof normalizeInventoryPayload !== 'function') return;

  const normalized = normalizeInventoryPayload({
    version: 1,
    source: 'google-sheets',
    records: [
      {
        id: 'INV-GOO-001',
        platform: 'Google',
        vipLevel: 7,
        power: 3_420_000,
        diamonds: 852_000,
        resources: 554_540_000_000,
        zonePasses: 1,
        name: 'OreoBank',
        email: 'private@example.com',
      },
    ],
  });

  assert.deepEqual(normalized, [
    {
      id: 'INV-GOO-001',
      platform: 'Google',
      vipLevel: 7,
      power: 3_420_000,
      diamonds: 852_000,
      resources: 554_540_000_000,
      zonePasses: 1,
    },
  ]);
});

test('keeps only a deterministic image path matching its public Website ID', () => {
  assert.equal(typeof normalizeInventoryPayload, 'function');
  if (typeof normalizeInventoryPayload !== 'function') return;

  const normalized = normalizeInventoryPayload({
    version: 1,
    source: 'google-sheets',
    records: [{
      id: 'INV-GOO-001',
      platform: 'Google',
      vipLevel: 7,
      image: '/assets/invasion-accounts/INV-GOO-001.webp',
    }],
  });

  assert.deepEqual(normalized[0], {
    id: 'INV-GOO-001',
    platform: 'Google',
    vipLevel: 7,
    image: '/assets/invasion-accounts/INV-GOO-001.webp',
  });

  for (const image of [
    '/assets/invasion-accounts/INV-FB-001.webp',
    '/assets/invasion-accounts/../secret.png',
    '/assets/invasion-accounts/INV-GOO-001.svg',
    'https://example.com/INV-GOO-001.png',
  ]) {
    assert.throws(
      () => normalizeInventoryPayload({
        version: 1,
        source: 'google-sheets',
        records: [{ id: 'INV-GOO-001', platform: 'Google', vipLevel: 7, image }],
      }),
      /image/i,
      image,
    );
  }
});

test('prunes only unreferenced files from the managed invasion image directory', async () => {
  assert.equal(typeof pruneUnreferencedInvasionImages, 'function');
  if (typeof pruneUnreferencedInvasionImages !== 'function') return;

  const directory = await mkdtemp(join(tmpdir(), 'invasion-images-'));
  const managed = join(directory, 'assets');
  const other = join(directory, 'keep.txt');
  try {
    await mkdir(managed);
    await Promise.all([
      writeFile(join(managed, 'INV-GOO-001.webp'), 'current'),
      writeFile(join(managed, 'INV-GOO-001.jpg'), 'old-format'),
      writeFile(join(managed, 'INV-TAP-001.png'), 'removed-listing'),
      writeFile(other, 'outside-managed-directory'),
    ]);

    const removed = await pruneUnreferencedInvasionImages([
      { id: 'INV-GOO-001', image: '/assets/invasion-accounts/INV-GOO-001.webp' },
    ], managed);

    assert.deepEqual(removed.sort(), ['INV-GOO-001.jpg', 'INV-TAP-001.png']);
    assert.deepEqual(await readdir(managed), ['INV-GOO-001.webp']);
    assert.equal(readFileSync(other, 'utf8'), 'outside-managed-directory');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('rejects empty snapshots, duplicate IDs, platform mismatches, and invalid numbers', () => {
  assert.equal(typeof normalizeInventoryPayload, 'function');
  if (typeof normalizeInventoryPayload !== 'function') return;

  const base = { id: 'INV-GOO-001', platform: 'Google', vipLevel: 7 };
  const payload = (records) => ({ version: 1, source: 'google-sheets', records });

  assert.throws(() => normalizeInventoryPayload(payload([])), /at least one record/i);
  assert.throws(() => normalizeInventoryPayload(payload([base, base])), /duplicate/i);
  assert.throws(() => normalizeInventoryPayload(payload([{ ...base, id: 'INV-TAP-001' }])), /does not match/i);
  assert.throws(() => normalizeInventoryPayload(payload([{ ...base, id: 'INV-GOO-01' }])), /invalid Website ID/i);
  assert.throws(() => normalizeInventoryPayload(payload([{ ...base, platform: 'Facebook' }])), /does not match/i);
  assert.throws(() => normalizeInventoryPayload(payload([{ ...base, diamonds: -1 }])), /diamonds/i);
  assert.throws(() => normalizeInventoryPayload(payload([{ ...base, vipLevel: '7' }])), /vipLevel/i);
  assert.throws(() => normalizeInventoryPayload(payload([{ ...base, resources: Number.MAX_SAFE_INTEGER + 1 }])), /resources/i);
});

test('debounces edits to Website ID, public stats, and the optional image column', () => {
  assert.equal(typeof appsScriptContext.isInventoryEditRelevant, 'function');
  if (typeof appsScriptContext.isInventoryEditRelevant !== 'function') return;

  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 2, numColumns: 1 }), false);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 3, numColumns: 1 }), true);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 8, numColumns: 1 }), true);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 9, numColumns: 1 }), true);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 10, numColumns: 1 }), true);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 11, numColumns: 1 }), true);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 12, numColumns: 1 }), false);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 2, numColumns: 2 }), true);
});

test('provides a spreadsheet menu for immediate inventory sync', () => {
  const context = {};
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), context);
  const menuCalls = [];
  let toast;
  context.SpreadsheetApp = {
    getUi: () => ({
      createMenu(name) {
        menuCalls.push(['menu', name]);
        return {
          addItem(label, handler) { menuCalls.push(['item', label, handler]); return this; },
          addToUi() { menuCalls.push(['shown']); return this; },
        };
      },
    }),
    getActiveSpreadsheet: () => ({ toast: (...args) => { toast = args; } }),
  };
  let syncCalls = 0;
  context.sendInventorySnapshot = () => { syncCalls += 1; };

  context.onOpen();
  context.syncInventoryNow();

  assert.deepEqual(menuCalls, [
    ['menu', 'Valls Solutions'],
    ['item', 'Sincronizar inventario ahora', 'syncInventoryNow'],
    ['shown'],
  ]);
  assert.equal(syncCalls, 1);
  assert.deepEqual(toast, ['Inventario enviado. Espera a que termine la publicación.', 'Valls Solutions', 8]);
});

test('coalesces rapid sheet edits into one delayed full-snapshot trigger', () => {
  const triggers = [];
  const context = {
    ScriptApp: {
      getProjectTriggers: () => [...triggers],
      deleteTrigger(trigger) {
        const index = triggers.indexOf(trigger);
        if (index !== -1) triggers.splice(index, 1);
      },
      newTrigger(handler) {
        const configuration = { handler, delay: null };
        return {
          timeBased() { return this; },
          after(delay) { configuration.delay = delay; return this; },
          create() {
            const trigger = {
              getHandlerFunction: () => configuration.handler,
              delay: configuration.delay,
            };
            triggers.push(trigger);
            return trigger;
          },
        };
      },
    },
  };
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), context);

  context.scheduleInventorySync();
  context.scheduleInventorySync();

  assert.equal(triggers.length, 1);
  assert.equal(triggers[0].getHandlerFunction(), 'sendInventorySnapshot');
  assert.equal(triggers[0].delay, 60_000);
});

test('does not treat a rejected GitHub dispatch as a successful sync', () => {
  assert.equal(typeof appsScriptContext.postInventorySnapshot, 'function');
  if (typeof appsScriptContext.postInventorySnapshot !== 'function') return;

  const context = {
    UrlFetchApp: {
      fetch() {
        return { getResponseCode: () => 422 };
      },
    },
  };
  Object.assign(context, appsScriptContext);
  const code = readFileSync(appsScriptPath, 'utf8');
  runInNewContext(code, context);

  assert.throws(
    () => context.postInventorySnapshot({ version: 1, source: 'google-sheets', records: [] }, 'ghp-secret'),
    /HTTP 422/,
  );
});

test('the deployment workflow builds synced images and prunes stale public assets', () => {
  const workflowPath = new URL('../.github/workflows/nextjs.yml', import.meta.url);
  const workflow = readFileSync(workflowPath, 'utf8');
  const integrationGuide = readFileSync(new URL('../integrations/invasion-sheet/README.md', import.meta.url), 'utf8');

  assert.match(workflow, /repository_dispatch:/);
  assert.match(workflow, /invasion_inventory_updated/);
  assert.match(workflow, /contents:\s*write/);
  assert.match(workflow, /paths-ignore:[\s\S]*public\/assets\/invasion-accounts\/\*\*/);
  assert.match(workflow, /sync-inventory:[\s\S]*?permissions:\s*contents:\s*read/);
  assert.match(workflow, /commit-inventory:[\s\S]*?permissions:\s*contents:\s*write/);
  assert.match(workflow, /build:[\s\S]*?persist-credentials:\s*false/);
  assert.match(workflow, /npm run sync:invasion-inventory/);
  assert.match(workflow, /npm run prune:invasion-images/);
  assert.match(workflow, /invasion-listings-data\.json/);
  assert.match(workflow, /repository_dispatch:[\s\S]*?types:\s*\[invasion_inventory_updated\]/);
  assert.match(workflow, /git add src\/content\/invasion-listings-data\.json/);
  assert.match(workflow, /git add -A -- public\/assets\/invasion-accounts/);
  assert.match(workflow, /actions\/upload-artifact@v4/);
  assert.match(workflow, /actions\/download-artifact@v4/);
  assert.match(workflow, /upload-pages-artifact/);
  assert.match(workflow, /deploy-pages/);
  assert.ok(workflow.indexOf('npm run sync:invasion-inventory') < workflow.indexOf('git add src/content/invasion-listings-data.json'));
  assert.ok(workflow.indexOf('name: Run content tests') < workflow.indexOf('name: Commit sanitized inventory'));
  assert.ok(workflow.indexOf('needs: [sync-inventory, build]') < workflow.indexOf('name: Commit sanitized inventory'));
  assert.ok(workflow.indexOf('name: Commit sanitized inventory') < workflow.indexOf('name: Deploy to GitHub Pages'));
  assert.ok(workflow.indexOf('name: Apply validated inventory') < workflow.indexOf('npm run prune:invasion-images'));
  assert.ok(workflow.indexOf('npm run prune:invasion-images') < workflow.indexOf('name: Build static site'));
  assert.match(integrationGuide, /Zone Pass.*Image.*in that order/i);
  assert.match(integrationGuide, /insert.*image.*in.*cell/i);
  assert.match(integrationGuide, /1 MB/i);
  assert.match(integrationGuide, /20 MB/i);
  assert.match(integrationGuide, /public/i);
  assert.match(integrationGuide, /Apps Script.*Code\.gs/i);
});
