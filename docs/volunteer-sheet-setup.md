# Volunteer applications: the Google Sheet and the emails

When someone sends the Volunteer With Us form, three things should happen:

1. A new row appears in a Google Sheet with everything they typed.
2. They get a confirmation email in the site's design, with a photo and a copy of their answers.
3. The team gets a notification email with every detail, a Reply button and a link to the sheet.

The website renders both emails. One small script inside the Google Sheet records the row and sends them. Nothing else is needed: no email service, no extra account, no cost. This guide sets it up in about fifteen minutes.

## Before you start

Decide which Google account owns the sheet. **The emails are sent from that account.**

- If admin@mumsaloud.com is a Google Workspace account, use it. The emails then come from admin@mumsaloud.com.
- If it is not (for example a Hostinger mailbox), use the Google account you work from. The emails then come from that address, shown as "Mums Aloud". Replies still go to admin@mumsaloud.com, because every email sets it as the reply address.

The script file is in the code at `web/integrations/google-apps-script/volunteer-sheet.gs`. The secret is in `web/.env.local` as `VOLUNTEER_WEBHOOK_SECRET` (Claude generated it; it is not in GitHub).

## Step 1. Create the sheet

1. Go to https://sheets.new while signed in to the chosen account.
2. Name it **Mums Aloud volunteer applications** (click "Untitled spreadsheet" at the top left).
3. Leave it empty. The script writes the column headings itself.

## Step 2. Add the script

1. In the sheet, open **Extensions > Apps Script**. A code editor opens in a new tab.
2. Delete the few lines already there (`function myFunction() { }`).
3. Open `web/integrations/google-apps-script/volunteer-sheet.gs`, copy all of it, and paste it into the editor.
4. Click the project name at the top left ("Untitled project") and call it **Volunteer applications**. Press the save icon.

## Step 3. Add the secret

1. In the editor's left bar, click the gear (**Project Settings**).
2. Under **Script Properties**, click **Add script property**.
3. Property: `SECRET`. Value: the `VOLUNTEER_WEBHOOK_SECRET` from `web/.env.local`, pasted exactly.
4. **Save script properties**.

The website sends this value with every application, and the script refuses anything without it.

## Step 4. Grant the permissions once

1. Back in the editor (the **<>** icon), choose `authorise` in the function list next to the Run button, then press **Run**.
2. Google asks for permission to see the sheet and send email as you. Click **Review permissions**, pick the account, and allow.
3. If Google says "Google hasn't verified this app", click **Advanced**, then **Go to Volunteer applications (unsafe)**. It is your own script, in your own account.
4. The log at the bottom says `Ready. Sheet: Mums Aloud volunteer applications. Emails left today: ...`. The sheet now has a bold header row on a tab called **Applications**.

## Step 5. Publish the script as a web app

1. **Deploy > New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Description: `Volunteer form`. **Execute as: Me**. **Who has access: Anyone**. ("Anyone" lets the website post without a Google login; the secret keeps everyone else out.)
4. **Deploy**, then copy the **Web app URL**. It ends in `/exec`.

Open that URL in a browser tab. It should show `{"ok":true,"service":"Mums Aloud volunteer applications","accepts":"POST"}`.

## Step 6. Tell the website

In Vercel, **Project > Settings > Environment Variables**, for Production and Preview:

| Name | Value |
| --- | --- |
| `VOLUNTEER_WEBHOOK_URL` | the Web app URL from step 5 |
| `VOLUNTEER_WEBHOOK_SECRET` | the same secret as the script property |
| `VOLUNTEER_NOTIFY_EMAIL` | optional: where the team's notification goes. Leave it out for admin@mumsaloud.com |

Then **Deployments > the latest > Redeploy**.

## Step 7. Test it

1. Open the site's Volunteer With Us page and send the form with your own email address.
2. The form says "Thank you. Your application is with our team, and a confirmation email is on its way to you."
3. The sheet shows a new row within a few seconds.
4. Two emails arrive: the confirmation at the address you typed, the notification at admin@mumsaloud.com (or the notify address). The first time, check the spam folder and mark them as not spam.
5. Delete the test row from the sheet.

If the form instead says the online form is not open yet, the URL is missing on Vercel or the deployment has not been redeployed. If it says something went wrong, the secrets differ or the deployment was not made for "Anyone". Google keeps a log under **Executions** in the editor's left bar.

## Changing the script later

Edits do not go live until you make a new version: **Deploy > Manage deployments**, click the pencil, set **Version** to **New version**, **Deploy**. The URL stays the same, so nothing changes on Vercel.

## Good to know

- **Limits.** A personal Gmail account can send 100 emails a day this way, a Google Workspace account 1,500. Each application sends two.
- **Personal data.** The sheet holds names, email addresses and phone numbers. Share it only with the team, and delete rows in line with the privacy notice (six months after a decision, unless the person becomes a volunteer).
- **What the emails look like.** Previews, with made-up details: the site's `/style-guide/emails/volunteer-applicant/` and `/style-guide/emails/volunteer-admin/`. Gmail and Outlook show Georgia and Arial in place of the site's fonts; Apple Mail shows the real ones. The logo and photo load from the site, so some inboxes ask before showing images.
- **Fallbacks.** Until the URL is set, applications go to `CONTACT_WEBHOOK_URL` if that is set, and otherwise the visitor is offered a prefilled email to admin@mumsaloud.com. Nothing is lost silently.
- **The same script could take the Contact and Partnership forms later**, into other tabs, if the team wants them in a sheet as well.
