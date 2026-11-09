/**
 * Admin panel payments -> the course block of the monthly finance Sheet.
 * Setup steps: scripts/GOOGLE_SHEET_WEBHOOK_README.md
 *
 * SAFETY: this script only ever writes to the tab named in the request (the current month), only
 * on rows 4-63, and only in the columns listed below. It never deletes a row and never touches
 * columns A-AD, the formula columns (Total Received, Balance Due, Status) or Notes. A student with
 * no money on record has only their own course cells emptied, found by the hidden ID.
 *
 * The shared secret lives in Project Settings -> Script Properties as SHEET_SECRET.
 */

var FIRST = 4, LAST = 63;
var NAME = 32 /* AF */, DATE = 44 /* AR */, METHOD = 45 /* AS */, NOTES = 47 /* AU */, ID = 48 /* AV */;
var METHODS = ['bKash', 'Nagad', 'Rocket', 'Bank', 'Cash', 'Other'];

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var secret = PropertiesService.getScriptProperties().getProperty('SHEET_SECRET');
    if (!secret || body.secret !== secret) return reply({ ok: false, error: 'unauthorized' });
    if (!/^[A-Z][a-z]+ \d{4}$/.test(String(body.tab))) return reply({ ok: false, error: 'bad tab name' });

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(body.tab);
    if (!sheet) return reply({ ok: false, error: 'Tab "' + body.tab + '" not found. Duplicate last month and name it exactly that.' });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      return reply(upsert_(sheet, body.students || []));
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function doGet() {
  return reply({ ok: false, error: 'POST only' });
}

/**
 * Updates a student's line, found by ID; a new student takes the first completely empty line.
 * A line with a note is never treated as empty, so a note can't end up beside the wrong student.
 */
function upsert_(sheet, students) {
  prepare_(sheet);
  var count = LAST - FIRST + 1;
  var ids = sheet.getRange(FIRST, ID, count, 1).getValues();
  var names = sheet.getRange(FIRST, NAME, count, 1).getValues();
  var notes = sheet.getRange(FIRST, NOTES, count, 1).getValues();
  var updated = 0, added = 0, removed = 0, full = 0;

  students.forEach(function (s) {
    if (!s.id) return;
    var i = -1, k;
    for (k = 0; k < count; k++) if (String(ids[k][0]) === String(s.id)) { i = k; break; }
    var isNew = i < 0;
    if (s.remove) {
      if (isNew) return;
      clear_(sheet, FIRST + i);
      ids[i][0] = '';
      names[i][0] = '';
      removed++;
      return;
    }
    if (isNew) {
      if (!s.add) return;
      for (k = 0; k < count; k++) if (!ids[k][0] && !names[k][0] && !notes[k][0]) { i = k; break; }
      if (i < 0) { full++; return; }
    }
    write_(sheet, FIRST + i, s);
    ids[i][0] = s.id;
    names[i][0] = s.name;
    if (isNew) added++; else updated++;
  });

  if (full) return { ok: false, error: 'No empty student lines left (' + full + ' not added).' };
  return { ok: true, updated: updated, added: added, removed: removed };
}

/** Empties only the cells write_ fills. Dropdowns, formulas, Notes and columns A-AD stay. */
function clear_(sheet, row) {
  sheet.getRange(row, NAME, 1, 10).clearContent();
  sheet.getRange(row, DATE, 1, 2).clearContent();
  sheet.getRange(row, ID, 1, 1).clearContent();
}

function write_(sheet, row, s) {
  sheet.getRange(row, NAME + 1, 1, 1).setNumberFormat('@'); // keeps the leading 0 of the phone number
  sheet.getRange(row, NAME + 4, 1, 1).setNumberFormat('@'); // same for a BMDC number
  sheet.getRange(row, DATE, 1, 1).setNumberFormat('@');
  sheet.getRange(row, NAME, 1, 10).setValues([[
    s.name, s.whatsapp, s.email, s.who, s.bmdc, s.plan, s.fee, s.previous, s.received, s.refund,
  ]]);
  sheet.getRange(row, DATE, 1, 2).setValues([[s.secondDate, s.method]]);
  sheet.getRange(row, ID, 1, 1).setValue(s.id);
}

/** First run on a tab: adds the hidden ID column and the full payment method list. */
function prepare_(sheet) {
  if (sheet.getMaxColumns() < ID) sheet.insertColumnsAfter(sheet.getMaxColumns(), ID - sheet.getMaxColumns());
  if (sheet.getRange(3, ID).getValue() !== 'ID') {
    sheet.getRange(3, ID).setValue('ID');
    sheet.hideColumns(ID);
    sheet.getRange(FIRST, METHOD, LAST - FIRST + 1, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(METHODS, true).setAllowInvalid(true).build()
    );
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Safe test, run once from the editor: makes a copy of the current tab called "SCRIPT TEST",
 * writes a fake student there twice, and logs the result. Delete that copy afterwards.
 */
function testOnCopy() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var copy = book.getActiveSheet().copyTo(book).setName('SCRIPT TEST');
  var s = {
    id: 'test-1', add: true, name: 'TEST STUDENT', whatsapp: '01700000000', email: 'test@example.com', who: 'Doctor',
    bmdc: '00000', plan: 'Installment', fee: 24000, previous: 0, received: 12000, refund: 0, secondDate: '8 Dec 2026', method: 'bKash',
  };
  Logger.log(JSON.stringify(upsert_(copy, [s])));
  s.received = 24000;
  s.secondDate = '';
  Logger.log(JSON.stringify(upsert_(copy, [s])));
}
