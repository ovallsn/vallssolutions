var INVASION_GITHUB_REPOSITORY = 'ovallsn/vallssolutions';
var INVASION_GITHUB_EVENT = 'invasion_inventory_updated';
var INVASION_SYNC_DELAY_MS = 60 * 1000;
var INVASION_SCRIPT_PROPERTIES = {
  spreadsheetId: 'INVASION_SPREADSHEET_ID',
  sheetId: 'INVASION_SHEET_ID',
  githubToken: 'INVASION_GITHUB_TOKEN',
};

function installInventorySync() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Open the inventory spreadsheet before installing sync.');

  var sheet = spreadsheet.getActiveSheet();
  if (!sheet) throw new Error('Select the inventory tab before installing sync.');

  var properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty(INVASION_SCRIPT_PROPERTIES.githubToken)) {
    throw new Error('Set INVASION_GITHUB_TOKEN in Script Properties before installing sync.');
  }
  properties.setProperties({
    INVASION_SPREADSHEET_ID: spreadsheet.getId(),
    INVASION_SHEET_ID: String(sheet.getSheetId()),
  });

  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    var handler = trigger.getHandlerFunction();
    if (handler === 'handleInventoryEdit' || handler === 'sendInventorySnapshot') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('handleInventoryEdit').forSpreadsheet(spreadsheet).onEdit().create();
  return 'Inventory sync installed for tab: ' + sheet.getName();
}

function handleInventoryEdit(event) {
  if (!event || !event.range) return;

  var properties = PropertiesService.getScriptProperties();
  var expectedSheetId = properties.getProperty(INVASION_SCRIPT_PROPERTIES.sheetId);
  var editedSheetId = String(event.range.getSheet().getSheetId());
  if (!expectedSheetId || editedSheetId !== expectedSheetId) return;
  if (!isInventoryEditRelevant({
    column: event.range.getColumn(),
    numColumns: event.range.getNumColumns(),
  })) return;

  scheduleInventorySync();
}

function isInventoryEditRelevant(range) {
  if (!range || !Number.isInteger(range.column) || !Number.isInteger(range.numColumns)) return false;
  var firstColumn = range.column;
  var lastColumn = firstColumn + range.numColumns - 1;
  return firstColumn <= 8 && lastColumn >= 3;
}

function scheduleInventorySync() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'sendInventorySnapshot') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('sendInventorySnapshot')
    .timeBased()
    .after(INVASION_SYNC_DELAY_MS)
    .create();
}

function sendInventorySnapshot() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('Inventory sync is already running.');

  try {
    var properties = PropertiesService.getScriptProperties();
    var spreadsheetId = properties.getProperty(INVASION_SCRIPT_PROPERTIES.spreadsheetId);
    var sheetId = Number(properties.getProperty(INVASION_SCRIPT_PROPERTIES.sheetId));
    var token = properties.getProperty(INVASION_SCRIPT_PROPERTIES.githubToken);
    if (!spreadsheetId || !Number.isInteger(sheetId) || !token) {
      throw new Error('Inventory sync configuration is incomplete.');
    }

    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheets().filter(function (candidate) {
      return candidate.getSheetId() === sheetId;
    })[0];
    if (!sheet) throw new Error('Configured inventory tab was not found.');

    var range = sheet.getDataRange();
    var payload = extractInventoryFromRows(range.getValues(), range.getDisplayValues());
    if (payload.records.length === 0) throw new Error('No rows with Website IDs were found.');
    postInventorySnapshot(payload, token);
  } finally {
    lock.releaseLock();
  }
}

function extractInventoryFromRows(values, displayValues) {
  if (!Array.isArray(values) || !Array.isArray(displayValues) || values.length !== displayValues.length) {
    throw new Error('Could not read inventory rows.');
  }

  var platform = null;
  var columns = null;
  var records = [];
  var seen = {};
  var platforms = { google: 'Google', tap4fun: 'Tap4fun', facebook: 'Facebook' };

  for (var rowIndex = 0; rowIndex < displayValues.length; rowIndex += 1) {
    var row = displayValues[rowIndex] || [];
    var rawRow = values[rowIndex] || [];
    var section = String(row[0] || '').trim().match(/^Gifters\s+(Google|Tap4fun|Facebook)$/i);
    if (section) {
      platform = platforms[section[1].toLowerCase()];
      columns = null;
      continue;
    }

    var headerIndexes = getInventoryHeaderIndexes(row);
    if (headerIndexes) {
      if (!platform) throw new Error('Inventory table is missing a platform heading.');
      columns = headerIndexes;
      continue;
    }
    if (!platform || !columns) continue;

    var id = String(row[columns.websiteId] || '').trim();
    if (!id) continue;

    var idMatch = id.match(/^INV-(GOO|TAP|FB)-(\d{3})$/);
    if (!idMatch || Number(idMatch[2]) < 1) throw new Error('Invalid Website ID at row ' + (rowIndex + 1) + '.');
    var expectedPlatform = { GOO: 'Google', TAP: 'Tap4fun', FB: 'Facebook' }[idMatch[1]];
    if (expectedPlatform !== platform) throw new Error('Website ID platform mismatch at row ' + (rowIndex + 1) + '.');
    if (seen[id]) throw new Error('Duplicate Website ID at row ' + (rowIndex + 1) + '.');
    seen[id] = true;

    var vipLevel = readInventoryNumber_(rawRow, row, columns.vipLevel, rowIndex, 'VIP Level', true);
    if (vipLevel > 99) throw new Error('Invalid VIP Level at row ' + (rowIndex + 1) + '.');
    var record = { id: id, platform: platform, vipLevel: vipLevel };
    var optionalColumns = [
      ['power', columns.power, 'Power'],
      ['diamonds', columns.diamonds, 'Diamonds'],
      ['resources', columns.resources, 'Resources'],
      ['zonePasses', columns.zonePasses, 'Zone Pass'],
    ];
    optionalColumns.forEach(function (entry) {
      if (entry[1] === -1) return;
      var number = readInventoryNumber_(rawRow, row, entry[1], rowIndex, entry[2], false);
      if (number !== null) record[entry[0]] = number;
    });
    records.push(record);
  }

  return { version: 1, source: 'google-sheets', records: records };
}

function getInventoryHeaderIndexes(row) {
  var normalized = row.map(function (value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
  });
  var websiteId = normalized.indexOf('website id');
  if (websiteId < 0) return null;
  return {
    websiteId: websiteId,
    power: normalized.indexOf('power'),
    vipLevel: normalized.indexOf('vip level'),
    diamonds: normalized.indexOf('diamonds'),
    resources: normalized.indexOf('resources'),
    zonePasses: normalized.indexOf('zone pass'),
  };
}

function readInventoryNumber_(rawRow, displayRow, column, rowIndex, label, required) {
  if (column < 0) {
    if (required) throw new Error('Missing ' + label + ' column.');
    return null;
  }
  var rawValue = rawRow[column];
  var displayValue = String(displayRow[column] == null ? '' : displayRow[column]).trim();
  if (displayValue === '' && (rawValue === '' || rawValue == null)) {
    if (required) throw new Error('Missing ' + label + ' at row ' + (rowIndex + 1) + '.');
    return null;
  }

  var number = typeof rawValue === 'number' ? rawValue : parseGameNumber(displayValue);
  if (!Number.isSafeInteger(number) || number < 0) {
    throw new Error('Invalid ' + label + ' at row ' + (rowIndex + 1) + '.');
  }
  return number;
}

function parseGameNumber(value) {
  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value) || value < 0) throw new Error('Invalid numeric value.');
    return value;
  }

  var text = String(value == null ? '' : value).trim().replace(/\s/g, '').toUpperCase();
  if (!text) throw new Error('Empty numeric value.');
  var suffixMatch = text.match(/([KMBT])$/);
  var suffix = suffixMatch ? suffixMatch[1] : '';
  var multiplier = { '': 1, K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[suffix];
  var numeric = suffix ? text.slice(0, -1) : text;
  if (!/^[+-]?[\d.,]+$/.test(numeric)) throw new Error('Invalid numeric value.');

  var comma = numeric.lastIndexOf(',');
  var dot = numeric.lastIndexOf('.');
  if (comma >= 0 && dot >= 0) {
    numeric = comma > dot
      ? numeric.replace(/\./g, '').replace(',', '.')
      : numeric.replace(/,/g, '');
  } else {
    var separator = comma >= 0 ? ',' : dot >= 0 ? '.' : '';
    if (separator) {
      var occurrences = numeric.split(separator).length - 1;
      var digitsAfter = numeric.length - numeric.lastIndexOf(separator) - 1;
      var isGrouping = occurrences > 1 || !suffix && digitsAfter === 3;
      if (isGrouping) numeric = numeric.split(separator).join('');
      else numeric = numeric.replace(separator, '.');
    }
  }

  var parsed = Number(numeric);
  var result = Math.round(parsed * multiplier);
  if (!Number.isFinite(result) || !Number.isSafeInteger(result) || result < 0) {
    throw new Error('Numeric value is out of range.');
  }
  return result;
}

function postInventorySnapshot(payload, token) {
  var response = UrlFetchApp.fetch(
    'https://api.github.com/repos/' + INVASION_GITHUB_REPOSITORY + '/dispatches',
    {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer ' + token,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      payload: JSON.stringify({ event_type: INVASION_GITHUB_EVENT, client_payload: payload }),
      muteHttpExceptions: true,
    },
  );
  var status = response.getResponseCode();
  if (status !== 204) throw new Error('GitHub inventory dispatch failed with HTTP ' + status + '.');
  return true;
}
