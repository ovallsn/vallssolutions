import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const appsScriptPath = new URL('../integrations/invasion-sheet/Code.gs', import.meta.url);
const appsScriptContext = {};
if (existsSync(appsScriptPath)) {
  runInNewContext(readFileSync(appsScriptPath, 'utf8'), appsScriptContext);
}

let normalizeInventoryPayload;
try {
  ({ normalizeInventoryPayload } = await import('../scripts/normalize-invasion-inventory.mjs'));
} catch {
  // The first run is expected to fail until the implementation is added.
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

test('debounces only edits to Website ID and public-stat columns', () => {
  assert.equal(typeof appsScriptContext.isInventoryEditRelevant, 'function');
  if (typeof appsScriptContext.isInventoryEditRelevant !== 'function') return;

  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 2, numColumns: 1 }), false);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 3, numColumns: 1 }), true);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 8, numColumns: 1 }), true);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 9, numColumns: 1 }), false);
  assert.equal(appsScriptContext.isInventoryEditRelevant({ column: 2, numColumns: 2 }), true);
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

test('the deployment workflow validates inventory dispatches and commits only the public JSON', () => {
  const workflowPath = new URL('../.github/workflows/nextjs.yml', import.meta.url);
  const workflow = readFileSync(workflowPath, 'utf8');

  assert.match(workflow, /repository_dispatch:/);
  assert.match(workflow, /invasion_inventory_updated/);
  assert.match(workflow, /contents:\s*write/);
  assert.match(workflow, /sync-inventory:[\s\S]*?permissions:\s*contents:\s*read/);
  assert.match(workflow, /commit-inventory:[\s\S]*?permissions:\s*contents:\s*write/);
  assert.match(workflow, /build:[\s\S]*?persist-credentials:\s*false/);
  assert.match(workflow, /npm run sync:invasion-inventory/);
  assert.match(workflow, /invasion-listings-data\.json/);
  assert.match(workflow, /repository_dispatch:[\s\S]*?types:\s*\[invasion_inventory_updated\]/);
  assert.match(workflow, /git add src\/content\/invasion-listings-data\.json/);
  assert.match(workflow, /actions\/upload-artifact@v4/);
  assert.match(workflow, /actions\/download-artifact@v4/);
  assert.match(workflow, /upload-pages-artifact/);
  assert.match(workflow, /deploy-pages/);
  assert.ok(workflow.indexOf('npm run sync:invasion-inventory') < workflow.indexOf('git add src/content/invasion-listings-data.json'));
  assert.ok(workflow.indexOf('name: Run content tests') < workflow.indexOf('name: Commit sanitized inventory'));
  assert.ok(workflow.indexOf('needs: [sync-inventory, build]') < workflow.indexOf('name: Commit sanitized inventory'));
  assert.ok(workflow.indexOf('name: Commit sanitized inventory') < workflow.indexOf('name: Deploy to GitHub Pages'));
});
