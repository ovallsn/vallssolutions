import assert from "node:assert/strict";
import { test } from "node:test";

let consent;
try {
  consent = await import("../src/lib/consent.ts");
} catch {
  consent = undefined;
}

function requireConsent(t) {
  assert.ok(consent, "expected the consent model to be available");
  return consent;
}

const choice = {
  version: 2,
  updatedAt: "2026-10-08T10:00:00.000Z",
  categories: { analytics: true, marketing: false },
};

function memoryStorage(initialValue = null) {
  let value = initialValue;
  return {
    getItem() { return value; },
    setItem(_key, nextValue) { value = nextValue; },
    read() { return value; },
  };
}

test("Plausible is registered as optional analytics with no tracking cookies", (t) => {
  const api = requireConsent(t);
  assert.equal(api.OPTIONAL_SERVICES.length, 1);
  assert.equal(api.OPTIONAL_SERVICES[0].provider, "Plausible Community Edition (self-hosted)");
  assert.equal(api.OPTIONAL_SERVICES[0].category, "analytics");
  assert.deepEqual(api.OPTIONAL_SERVICES[0].cookies, []);
  assert.equal(api.hasOptionalServices(api.OPTIONAL_SERVICES), true);
});

test("an explicitly accepted category allows its service", (t) => {
  const api = requireConsent(t);
  const service = { category: "analytics" };
  assert.equal(api.serviceAllowed(service, choice), true);
});

test("a rejected or absent category keeps its service blocked", (t) => {
  const api = requireConsent(t);
  const service = { category: "marketing" };
  assert.equal(api.serviceAllowed(service, choice), false);
  assert.equal(api.serviceAllowed(service, null), false);
});

test("malformed stored consent is rejected", (t) => {
  const api = requireConsent(t);
  assert.equal(api.readConsent(memoryStorage("not-json"), 1), null);
});

test("incomplete consent is rejected", (t) => {
  const api = requireConsent(t);
  const incomplete = JSON.stringify({
    version: 1,
    updatedAt: "2026-10-08T10:00:00.000Z",
    categories: { analytics: true },
  });
  assert.equal(api.readConsent(memoryStorage(incomplete), 1), null);
});

test("consent from an older inventory version is rejected", (t) => {
  const api = requireConsent(t);
  const oldChoice = { ...choice, version: 1 };
  const storage = memoryStorage(JSON.stringify(oldChoice));
  assert.equal(api.readConsent(storage, api.CONSENT_VERSION), null);
  assert.equal(api.serviceAllowed({ category: "analytics" }, oldChoice), false);
  assert.equal(api.shouldAskForConsent(api.OPTIONAL_SERVICES, api.readConsent(storage, api.CONSENT_VERSION)), true);
});

test("readConsent handles storage access errors without granting consent", (t) => {
  const api = requireConsent(t);
  const storage = { getItem() { throw new Error("storage blocked"); } };
  assert.equal(api.readConsent(storage, 1), null);
});

test("writeConsent reports storage errors and does not grant consent", (t) => {
  const api = requireConsent(t);
  const storage = { setItem() { throw new Error("storage blocked"); } };
  assert.equal(api.writeConsent(storage, choice), false);
});

test("writeConsent stores the deliberate timestamped choice", (t) => {
  const api = requireConsent(t);
  const storage = memoryStorage();
  assert.equal(api.writeConsent(storage, choice), true);
  assert.deepEqual(JSON.parse(storage.read()), choice);
});

test("no optional services means no consent prompt", (t) => {
  const api = requireConsent(t);
  assert.equal(typeof api.shouldAskForConsent, "function", "expected consent prompt logic");
  if (typeof api.shouldAskForConsent !== "function") return;
  assert.equal(api.shouldAskForConsent([], null), false);
});

test("a new optional service requires a choice", (t) => {
  const api = requireConsent(t);
  assert.equal(typeof api.shouldAskForConsent, "function", "expected consent prompt logic");
  if (typeof api.shouldAskForConsent !== "function") return;
  assert.equal(api.shouldAskForConsent([{ category: "analytics" }], null), true);
  assert.equal(api.shouldAskForConsent([{ category: "analytics" }], choice), false);
});

test("a deliberate category selection receives the current version and timestamp", (t) => {
  const api = requireConsent(t);
  assert.equal(typeof api.createConsentChoice, "function", "expected consent choice creation");
  if (typeof api.createConsentChoice !== "function") return;
  const selected = { analytics: false, marketing: true };
  assert.deepEqual(api.createConsentChoice(selected, "2026-10-08T10:00:00.000Z"), {
    version: api.CONSENT_VERSION,
    updatedAt: "2026-10-08T10:00:00.000Z",
    categories: selected,
  });
});

test("only accepted services load and revocation runs their cleanup", (t) => {
  const api = requireConsent(t);
  assert.equal(typeof api.activateConsentedServices, "function", "expected consent-gated loaders");
  if (typeof api.activateConsentedServices !== "function") return;
  const calls = [];
  const services = [
    {
      category: "analytics",
      load() {
        calls.push("load:analytics");
        return () => calls.push("cleanup:analytics");
      },
    },
    {
      category: "marketing",
      load() {
        calls.push("load:marketing");
        return () => calls.push("cleanup:marketing");
      },
    },
  ];

  const stop = api.activateConsentedServices(services, choice);
  assert.deepEqual(calls, ["load:analytics"]);
  stop();
  assert.deepEqual(calls, ["load:analytics", "cleanup:analytics"]);
});

test("no optional service loads before consent", (t) => {
  const api = requireConsent(t);
  assert.equal(typeof api.activateConsentedServices, "function", "expected consent-gated loaders");
  if (typeof api.activateConsentedServices !== "function") return;
  let loads = 0;
  const stop = api.activateConsentedServices([{ category: "analytics", load: () => loads++ }], null);
  assert.equal(loads, 0);
  stop();
  assert.equal(loads, 0);
});

test("revoking accepted analytics asks the page to reload, but granting it does not", (t) => {
  const api = requireConsent(t);
  const denied = api.createConsentChoice({ analytics: false, marketing: false }, choice.updatedAt);
  assert.equal(api.shouldReloadAfterConsentChange(api.OPTIONAL_SERVICES, choice, denied), true);
  assert.equal(api.shouldReloadAfterConsentChange(api.OPTIONAL_SERVICES, denied, choice), false);
  assert.equal(api.shouldReloadAfterConsentChange(api.OPTIONAL_SERVICES, null, denied), false);
});

test("Plausible is injected only after analytics consent and removed on cleanup", (t) => {
  const api = requireConsent(t);
  const scripts = [];
  const fakeWindow = {};
  const fakeDocument = {
    createElement(tagName) {
      assert.equal(tagName, "script");
      return {
        id: "",
        src: "",
        async: false,
        remove() {
          const index = scripts.indexOf(this);
          if (index !== -1) scripts.splice(index, 1);
        },
      };
    },
    getElementById(id) {
      return scripts.find((script) => script.id === id) ?? null;
    },
    head: {
      appendChild(script) {
        scripts.push(script);
        return script;
      },
    },
  };
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  Object.defineProperty(globalThis, "window", { configurable: true, value: fakeWindow });
  Object.defineProperty(globalThis, "document", { configurable: true, value: fakeDocument });

  try {
    const accepted = api.createConsentChoice({ analytics: true, marketing: false }, choice.updatedAt);
    const denied = api.createConsentChoice({ analytics: false, marketing: false }, choice.updatedAt);
    api.activateConsentedServices(api.OPTIONAL_SERVICES, denied);
    assert.equal(scripts.length, 0);

    const stop = api.activateConsentedServices(api.OPTIONAL_SERVICES, accepted);
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].src, "https://analytics.vallssolutions.com/js/pa-5gRs7a0cB_ymMrWk9a9Bc.js");
    assert.equal(scripts[0].async, true);
    assert.equal(typeof fakeWindow.plausible, "function");

    stop();
    assert.equal(scripts.length, 0);
    assert.equal(fakeWindow.plausible, undefined);
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else delete globalThis.window;
    if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
    else delete globalThis.document;
  }
});
