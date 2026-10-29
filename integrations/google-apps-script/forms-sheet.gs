/**
 * Mums Aloud: the website's forms into this Google Sheet.
 *
 * One tab per form: Applications (Volunteer With Us), Contact, Partnership. The website posts each
 * submission here as one row with a shared secret. This script checks the secret, appends the row
 * to the named tab (writing the header row the first time) and answers with the tab's address, which
 * the website puts in the team's notification email. The emails themselves are sent by the website
 * from the team mailbox, so this script needs no email permission.
 *
 * Setup: web/docs/forms-sheet-setup.md. In short: paste this into Extensions > Apps Script of
 * the sheet, add SECRET under Project Settings > Script properties, run `authorise` once, then
 * Deploy > New deployment > Web app (execute as Me, access Anyone) and copy the URL into Vercel.
 * After changing this file: Deploy > Manage deployments > edit > Version: New version > Deploy.
 */

var SHEETS = ["Applications", "Contact", "Partnership"];

var HEADERS = {
  Applications: ["Submitted (ISO)", "Submitted (London)", "First name", "Last name", "Email", "Phone", "Skills & experience", "Availability", "Source"],
  Contact: ["Submitted (ISO)", "Submitted (London)", "Name", "Email", "Organisation", "Phone", "About", "Message", "Source"],
  Partnership: ["Submitted (ISO)", "Submitted (London)", "Name", "Email", "Organisation", "Phone", "About", "Message", "Source"]
};

/** The website's POST. Always answers JSON; a wrong secret or an unknown tab is refused. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret) return json_({ ok: false, error: "SECRET is not set under Project Settings > Script properties" });
    if (!body.secret || body.secret !== secret) return json_({ ok: false, error: "Wrong secret" });
    var name = body.sheet || SHEETS[0];
    if (SHEETS.indexOf(name) === -1) return json_({ ok: false, error: "Unknown sheet: " + name });

    lock.waitLock(15000);
    var sheet = sheet_(name);
    var row = body.row || {};
    var headers = headers_(sheet, Object.keys(row));
    sheet.appendRow(headers.map(function (header) { return row[header] == null ? "" : String(row[header]); }));
    var rowNumber = sheet.getLastRow();
    lock.releaseLock();

    var sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl() + "#gid=" + sheet.getSheetId();
    return json_({ ok: true, sheet: name, row: rowNumber, sheetUrl: sheetUrl });
  } catch (err) {
    try { lock.releaseLock(); } catch (ignored) {}
    return json_({ ok: false, error: String(err) });
  }
}

/** Opening the web app URL in a browser shows this, so you can tell the deployment is live. */
function doGet() {
  return json_({ ok: true, service: "Mums Aloud forms", sheets: SHEETS, accepts: "POST" });
}

/**
 * Run this once from the editor (select `authorise`, press Run) and accept the permission to use
 * the sheet. The web app then runs with it. It also creates the three tabs with their header rows.
 */
function authorise() {
  SHEETS.forEach(function (name) { headers_(sheet_(name), HEADERS[name]); });
  Logger.log("Ready. Sheet: " + SpreadsheetApp.getActiveSpreadsheet().getName() + ". Tabs: " + SHEETS.join(", ") + ".");
}

/** A form's tab, created on first use. */
function sheet_(name) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

/** The header row as it is, with any new column names added at the end; written and frozen when the tab is empty. */
function headers_(sheet, wanted) {
  var existing = sheet.getLastRow() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String) : [];
  var headers = existing.filter(function (header) { return header !== ""; });
  var added = false;
  wanted.forEach(function (header) {
    if (headers.indexOf(header) === -1) {
      headers.push(header);
      added = true;
    }
  });
  if (existing.length === 0 || added) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return headers;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
