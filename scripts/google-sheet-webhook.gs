/**
 * Course applications -> private Google Sheet.
 * The website (app/api/course/apply/route.ts) POSTs one row after each saved form.
 * Setup steps: scripts/GOOGLE_SHEET_WEBHOOK_README.md
 *
 * The shared secret lives in Project Settings -> Script Properties as SHEET_SECRET,
 * never in this file.
 */

var SHEET_NAME = 'Applications';

// order of the columns in the Sheet; the last four are filled by hand
var COLUMNS = [
  ['timestamp', 'Timestamp'],
  ['name', 'Name'],
  ['whatsapp', 'WhatsApp'],
  ['email', 'Email'],
  ['who', 'Who (doctor/student)'],
  ['bmdc_or_college', 'BMDC no. / College + session'],
  ['id_photo', 'ID photo link'],
  ['status', 'Status'],
  ['payment', 'Payment'],
  ['amount', 'Amount'],
  ['notes', 'Notes'],
];

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var secret = PropertiesService.getScriptProperties().getProperty('SHEET_SECRET');
    if (!secret || body.secret !== secret) return reply({ ok: false, error: 'unauthorized' });

    var row = body.row || {};
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = getSheet();
      var values = COLUMNS.map(function (c) {
        return String(row[c[0]] == null ? '' : row[c[0]]).slice(0, 500);
      });
      var at = sheet.getLastRow() + 1;
      var range = sheet.getRange(at, 1, 1, values.length);
      range.setNumberFormat('@'); // plain text: keeps the leading 0 of phone numbers, no formulas
      range.setValues([values]);
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/** Opening the URL in a browser shows nothing useful on purpose. */
function doGet() {
  return reply({ ok: false, error: 'POST only' });
}

function getSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (c) { return c[1]; }));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor (Run -> testRow) to check the Sheet works. */
function testRow() {
  var sheet = getSheet();
  sheet.appendRow(['TEST', 'Test row, delete me']);
}
