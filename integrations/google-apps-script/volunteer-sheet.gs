/**
 * Mums Aloud: volunteer applications into this Google Sheet, plus the two emails.
 *
 * The website renders the row and both emails (the applicant's confirmation and the team's
 * notification) and posts them here with a shared secret. This script checks the secret, appends
 * the row (writing the header row the first time) and sends the emails exactly as given.
 *
 * Setup: web/docs/volunteer-sheet-setup.md. In short: paste this into Extensions > Apps Script of
 * the sheet, add SECRET under Project Settings > Script properties, run `authorise` once, then
 * Deploy > New deployment > Web app (execute as Me, access Anyone) and copy the URL into Vercel.
 */

var SHEET_NAME = "Applications";

/** The website's POST. Always answers JSON; a wrong secret is refused. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret) return json_({ ok: false, error: "SECRET is not set under Project Settings > Script properties" });
    if (!body.secret || body.secret !== secret) return json_({ ok: false, error: "Wrong secret" });

    lock.waitLock(15000);
    var sheet = sheet_();
    var row = body.row || {};
    var headers = headers_(sheet, Object.keys(row));
    sheet.appendRow(headers.map(function (header) { return row[header] == null ? "" : String(row[header]); }));
    var rowNumber = sheet.getLastRow();
    lock.releaseLock();

    var sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
    var sent = 0;
    var failures = [];
    (body.emails || []).forEach(function (message) {
      try {
        send_(message, sheetUrl);
        sent += 1;
      } catch (err) {
        failures.push(String(err));
      }
    });
    return json_({ ok: true, row: rowNumber, sent: sent, failures: failures });
  } catch (err) {
    try { lock.releaseLock(); } catch (ignored) {}
    return json_({ ok: false, error: String(err) });
  }
}

/** Opening the web app URL in a browser shows this, so you can tell the deployment is live. */
function doGet() {
  return json_({ ok: true, service: "Mums Aloud volunteer applications", accepts: "POST" });
}

/**
 * Run this once from the editor (select `authorise`, press Run) and accept the permissions:
 * the sheet and sending email. The web app then runs with them.
 */
function authorise() {
  var sheet = sheet_();
  headers_(sheet, [
    "Submitted (ISO)", "Submitted (London)", "First name", "Last name", "Email", "Phone",
    "Skills & experience", "Availability", "Source"
  ]);
  var quota = MailApp.getRemainingDailyQuota();
  Logger.log("Ready. Sheet: " + SpreadsheetApp.getActiveSpreadsheet().getName() + ". Emails left today: " + quota);
}

/** The Applications tab, created on first use. */
function sheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

/** The header row as it is, with any new column names added at the end; written and frozen when the sheet is empty. */
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

/** Sends one email as the website rendered it, filling in this sheet's address where asked. */
function send_(message, sheetUrl) {
  if (!message || !message.to) throw new Error("Email without a recipient");
  var options = {
    to: message.to,
    subject: message.subject || "Mums Aloud",
    htmlBody: String(message.html || "").split("{{SHEET_URL}}").join(sheetUrl),
    body: String(message.text || "").split("{{SHEET_URL}}").join(sheetUrl),
    name: message.fromName || "Mums Aloud"
  };
  if (message.replyTo) options.replyTo = message.replyTo;
  MailApp.sendEmail(options);
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
