var INVASION_GITHUB_REPOSITORY = 'ovallsn/vallssolutions';
var INVASION_GITHUB_EVENT = 'invasion_inventory_updated';
var INVASION_SYNC_DELAY_MS = 60 * 1000;
var INVASION_IMAGE_DIRECTORY = 'public/assets/invasion-accounts/';
var INVASION_MAX_IMAGE_BYTES = 1024 * 1024;
var INVASION_MAX_IMAGE_TOTAL_BYTES = 20 * 1024 * 1024;
var INVASION_SCRIPT_PROPERTIES = {
  spreadsheetId: 'INVASION_SPREADSHEET_ID',
  sheetId: 'INVASION_SHEET_ID',
  githubToken: 'INVASION_GITHUB_TOKEN',
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Valls Solutions')
    .addItem('Sincronizar inventario ahora', 'syncInventoryNow')
    .addToUi();
}

function syncInventoryNow() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Open the inventory spreadsheet before syncing.');

  var hasActiveSheetAccess = typeof spreadsheet.getActiveSheet === 'function';
  var sheet = hasActiveSheetAccess ? spreadsheet.getActiveSheet() : null;
  if (hasActiveSheetAccess && !sheet) throw new Error('Select the inventory tab before syncing.');

  var counts = sendInventorySnapshot(sheet || undefined);
  var message = counts && sheet
    ? 'Leídas ' + counts.total + ' cuentas de "' + sheet.getName() + '": ' +
      'Google ' + counts.Google + ' · Tap4fun ' + counts.Tap4fun + ' · Facebook ' + counts.Facebook +
      '. Espera a que termine la publicación.'
    : 'Inventario enviado. Espera a que termine la publicación.';
  spreadsheet.toast(
    message,
    'Valls Solutions',
    10,
  );
}

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
  return firstColumn <= 9 && lastColumn >= 3;
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

function sendInventorySnapshot(sheetOverride) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('Inventory sync is already running.');

  try {
    var properties = PropertiesService.getScriptProperties();
    var token = properties.getProperty(INVASION_SCRIPT_PROPERTIES.githubToken);
    if (!token) throw new Error('Inventory sync configuration is incomplete.');

    var sheet = sheetOverride;
    if (!sheet) {
      var spreadsheetId = properties.getProperty(INVASION_SCRIPT_PROPERTIES.spreadsheetId);
      var sheetId = Number(properties.getProperty(INVASION_SCRIPT_PROPERTIES.sheetId));
      if (!spreadsheetId || !Number.isInteger(sheetId)) {
        throw new Error('Inventory sync configuration is incomplete.');
      }

      var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      sheet = spreadsheet.getSheets().filter(function (candidate) {
        return candidate.getSheetId() === sheetId;
      })[0];
      if (!sheet) throw new Error('Configured inventory tab was not found.');
    }

    var range = sheet.getDataRange();
    var snapshot = extractInventorySnapshot(range.getValues(), range.getDisplayValues());
    if (snapshot.payload.records.length === 0) throw new Error('No rows with Website IDs were found.');
    publishInventorySnapshot_(snapshot, token);
    return summarizeInventoryCounts_(snapshot.payload.records);
  } finally {
    lock.releaseLock();
  }
}

function summarizeInventoryCounts_(records) {
  var counts = { Google: 0, Tap4fun: 0, Facebook: 0, total: 0 };
  records.forEach(function (record) {
    if (Object.prototype.hasOwnProperty.call(counts, record.platform)) {
      counts[record.platform] += 1;
      counts.total += 1;
    }
  });
  return counts;
}

function extractInventorySnapshot(values, displayValues) {
  if (!Array.isArray(values) || !Array.isArray(displayValues) || values.length !== displayValues.length) {
    throw new Error('Could not read inventory rows.');
  }

  var platform = null;
  var columns = null;
  var records = [];
  var imageCells = {};
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
    if (columns.image >= 0 && isInventoryCellImage_(rawRow[columns.image])) {
      imageCells[id] = rawRow[columns.image];
    }
    records.push(record);
  }

  return {
    payload: { version: 1, source: 'google-sheets', records: records },
    imageCells: imageCells,
  };
}

function extractInventoryFromRows(values, displayValues) {
  return extractInventorySnapshot(values, displayValues).payload;
}

function isInventoryCellImage_(value) {
  return Boolean(value && typeof value.getContentUrl === 'function');
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
    image: normalized.indexOf('image'),
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
  githubApiRequest_('post', '/dispatches', token, {
    event_type: INVASION_GITHUB_EVENT,
    client_payload: payload,
  }, [204]);
  return true;
}

function publishInventorySnapshot_(snapshot, token) {
  if (!snapshot || !snapshot.payload || !Array.isArray(snapshot.payload.records)) {
    throw new Error('Inventory snapshot is invalid.');
  }
  var imagePaths = syncInventoryImages(snapshot.imageCells || {}, token);
  var payload = {
    version: snapshot.payload.version,
    source: snapshot.payload.source,
    records: snapshot.payload.records.map(function (record) {
      var published = {};
      Object.keys(record).forEach(function (key) { published[key] = record[key]; });
      if (imagePaths[record.id]) published.image = imagePaths[record.id];
      return published;
    }),
  };
  return postInventorySnapshot(payload, token);
}

function syncInventoryImages(imageCells, token) {
  var ids = Object.keys(imageCells || {}).sort();
  if (ids.length === 0) return {};

  var images = [];
  var totalBytes = 0;
  ids.forEach(function (id) {
    if (!/^INV-(?:GOO|TAP|FB)-\d{3}$/.test(id)) throw new Error('Invalid Website ID for image sync.');
    var cellImage = imageCells[id];
    if (!isInventoryCellImage_(cellImage)) throw new Error('Image cell is not an in-cell image.');
    var contentUrl = cellImage.getContentUrl();
    if (typeof contentUrl !== 'string' || !/^https:\/\/(?:[a-z0-9-]+\.)*(?:googleusercontent\.com|google\.com)(?:\/|$)/i.test(contentUrl)) {
      throw new Error('Google image URL is invalid.');
    }

    var response = UrlFetchApp.fetch(contentUrl, { muteHttpExceptions: true });
    if (response.getResponseCode() !== 200) throw new Error('Google image download failed with HTTP ' + response.getResponseCode() + '.');
    var validated = validateInventoryImage_(response, totalBytes);
    totalBytes = validated.totalBytes;
    images.push({ id: id, extension: validated.extension, bytes: validated.bytes });
  });

  var reference = githubApiRequest_('get', '/git/ref/heads/main', token, null, [200]);
  if (!reference.object || !reference.object.sha) throw new Error('GitHub main branch reference is invalid.');
  var head = githubApiRequest_('get', '/git/commits/' + encodeURIComponent(reference.object.sha), token, null, [200]);
  if (!head.tree || !head.tree.sha) throw new Error('GitHub main commit tree is invalid.');
  var treeResult = githubApiRequest_('get', '/git/trees/' + encodeURIComponent(head.tree.sha) + '?recursive=1', token, null, [200]);
  if (treeResult.truncated) throw new Error('GitHub image tree is too large to verify safely.');

  var currentFiles = {};
  (treeResult.tree || []).forEach(function (entry) {
    if (entry.path && entry.sha) currentFiles[entry.path] = entry.sha;
  });

  var treeEntries = [];
  var paths = {};
  images.forEach(function (image) {
    var path = INVASION_IMAGE_DIRECTORY + image.id + '.' + image.extension;
    var blob = githubApiRequest_('post', '/git/blobs', token, {
      content: Utilities.base64Encode(image.bytes),
      encoding: 'base64',
    }, [201]);
    if (!blob.sha) throw new Error('GitHub image upload did not return a blob.');
    paths[image.id] = '/' + path.replace(/^public\//, '');
    if (currentFiles[path] !== blob.sha) {
      treeEntries.push({ path: path, mode: '100644', type: 'blob', sha: blob.sha });
    }
  });

  if (treeEntries.length > 0) {
    var tree = githubApiRequest_('post', '/git/trees', token, {
      base_tree: head.tree.sha,
      tree: treeEntries,
    }, [201]);
    if (!tree.sha) throw new Error('GitHub image tree was not created.');
    var commit = githubApiRequest_('post', '/git/commits', token, {
      message: 'Update Invasion account images',
      tree: tree.sha,
      parents: [reference.object.sha],
    }, [201]);
    if (!commit.sha) throw new Error('GitHub image commit was not created.');
    githubApiRequest_('patch', '/git/refs/heads/main', token, {
      sha: commit.sha,
      force: false,
    }, [200]);
  }

  return paths;
}

function validateInventoryImage_(response, totalBytes) {
  var headers = response.getHeaders ? response.getHeaders() : {};
  var contentType = '';
  Object.keys(headers || {}).some(function (key) {
    if (key.toLowerCase() !== 'content-type') return false;
    contentType = String(headers[key] || '').split(';')[0].trim().toLowerCase();
    return true;
  });

  var bytes = response.getBlob().getBytes();
  if (!bytes || bytes.length === 0) throw new Error('Downloaded image is empty.');
  if (bytes.length > INVASION_MAX_IMAGE_BYTES) throw new Error('Each image must be 1 MB or smaller.');
  var combinedBytes = totalBytes + bytes.length;
  if (combinedBytes > INVASION_MAX_IMAGE_TOTAL_BYTES) throw new Error('Images in one sync must total 20 MB or less.');

  var png = contentType === 'image/png' && bytes.length >= 8 &&
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(function (value, index) {
      return (bytes[index] & 255) === value;
    });
  var jpeg = contentType === 'image/jpeg' && bytes.length >= 3 &&
    (bytes[0] & 255) === 0xff && (bytes[1] & 255) === 0xd8 && (bytes[2] & 255) === 0xff;
  var webp = contentType === 'image/webp' && bytes.length >= 12 &&
    inventoryBytesText_(bytes, 0, 4) === 'RIFF' && inventoryBytesText_(bytes, 8, 12) === 'WEBP';

  if (!png && !jpeg && !webp) {
    if (contentType !== 'image/png' && contentType !== 'image/jpeg' && contentType !== 'image/webp') {
      throw new Error('Unsupported image format. Use JPEG, PNG, or WebP.');
    }
    throw new Error('Image file signature does not match its content type.');
  }

  return {
    extension: png ? 'png' : jpeg ? 'jpg' : 'webp',
    bytes: bytes,
    totalBytes: combinedBytes,
  };
}

function inventoryBytesText_(bytes, start, end) {
  var text = '';
  for (var index = start; index < end; index += 1) text += String.fromCharCode(bytes[index] & 255);
  return text;
}

function githubApiRequest_(method, path, token, payload, expectedStatuses) {
  var options = {
    method: method,
    contentType: 'application/json',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer ' + token,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    muteHttpExceptions: true,
  };
  if (payload !== null && payload !== undefined) options.payload = JSON.stringify(payload);
  var response = UrlFetchApp.fetch(
    'https://api.github.com/repos/' + INVASION_GITHUB_REPOSITORY + path,
    options,
  );
  var status = response.getResponseCode();
  if (expectedStatuses.indexOf(status) < 0) throw new Error('GitHub inventory sync failed with HTTP ' + status + '.');
  var body = response.getContentText ? response.getContentText() : '';
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch (error) {
    throw new Error('GitHub inventory sync returned an invalid response.');
  }
}
