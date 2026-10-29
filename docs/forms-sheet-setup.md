# The forms: the Google Sheet and the emails

Three forms on the site deliver through one Google Sheet in your Google account: **Volunteer With Us**, **Contact** and the **Partnership** enquiry. (The newsletter is separate: it goes to MailerLite.) When someone sends one of them, three things happen:

1. A new row appears on the form's own tab of the sheet: Applications, Contact or Partnership.
2. The sender gets a confirmation email in the site's design, with a photo and a copy of what they sent.
3. The team gets a notification email with every detail, a Reply button and a link to the tab.

Two parts do this. A small script inside the sheet records the row. The website itself sends the two emails, from **info@mumsaloud.com** through the mailbox's own mail service (Titan Email, which comes with the Hostinger domain). No Google account sends anything, and no extra email service is needed.

This was set up on 29 October 2026. The steps below are kept for a new account or a rebuild.

## Before you start

- The Google account that owns the sheet only stores the rows. Any account will do; today it is ayebaplanet@gmail.com.
- The emails come from the team mailbox. You need its password for step 6; it goes into Vercel only.
- The script file is in the code at `web/integrations/google-apps-script/forms-sheet.gs`. The secret is in `web/.env.local` as `FORMS_WEBHOOK_SECRET` (it is not in GitHub).

## Step 1. Create the sheet

1. Go to https://sheets.new while signed in to the chosen account. Open the file once it has an address of the form `/spreadsheets/d/.../edit`; the "new sheet" page can create two files, so check Drive afterwards and bin any empty twin.
2. Name it **Mums Aloud volunteer applications** (click "Untitled spreadsheet" at the top left).
3. Leave it empty. The script creates the three tabs and their column headings itself.

## Step 2. Add the script

1. In the sheet, open **Extensions > Apps Script**. A code editor opens in a new tab.
2. Delete the few lines already there (`function myFunction() { }`).
3. Open `web/integrations/google-apps-script/forms-sheet.gs`, copy all of it, and paste it into the editor.
4. Click the project name at the top left ("Untitled project") and call it **Volunteer applications**. Press the save icon.

## Step 3. Add the secret

1. In the editor's left bar, click the gear (**Project Settings**).
2. Under **Script Properties**, click **Add script property**.
3. Property: `SECRET`. Value: the `FORMS_WEBHOOK_SECRET` from `web/.env.local`, pasted exactly.
4. **Save script properties**.

The website sends this value with every submission, and the script refuses anything without it.

## Step 4. Grant the permissions once

1. Back in the editor (the **<>** icon), choose `authorise` in the function list next to the Run button, then press **Run**.
2. Google asks for permission to see the sheet. Click **Review permissions**, pick the account, and allow.
3. If Google says "Google hasn't verified this app", click **Advanced**, then **Go to Volunteer applications (unsafe)**. It is your own script, in your own account.
4. The log at the bottom says `Ready. Sheet: Mums Aloud volunteer applications. Tabs: Applications, Contact, Partnership.` The sheet now has the three tabs, each with a bold header row.

## Step 5. Publish the script as a web app

1. **Deploy > New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Description: `Website forms`. **Execute as: Me**. **Who has access: Anyone**. ("Anyone" lets the website post without a Google login; the secret keeps everyone else out.)
4. **Deploy**, allow access once more if asked, then copy the **Web app URL**. It ends in `/exec`.

Open that URL in a browser tab. It should show `{"ok":true,"service":"Mums Aloud forms","sheets":["Applications","Contact","Partnership"],"accepts":"POST"}`.

## Step 6. Tell the website

In Vercel, **Project > Settings > Environment Variables**, for Production:

| Name | Value |
| --- | --- |
| `FORMS_WEBHOOK_URL` | the Web app URL from step 5 |
| `FORMS_WEBHOOK_SECRET` | the same secret as the script property |
| `FORMS_NOTIFY_EMAIL` | optional: where the team's notifications go. Leave it out for info@mumsaloud.com |
| `SMTP_PASSWORD` | the info@mumsaloud.com mailbox password (Titan Email). Mark it Secret. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` | optional: they default to `smtp.titan.email`, `465` and info@mumsaloud.com |

Then **Deployments > the latest > Redeploy**. Production only is deliberate: preview deployments then never write real rows or send real emails.

The older names `VOLUNTEER_WEBHOOK_URL`, `VOLUNTEER_WEBHOOK_SECRET` and `VOLUNTEER_NOTIFY_EMAIL` still work (Vercel uses them today), so nothing needs renaming.

## Step 7. Test it

1. Send each form on the site with your own email address: the Volunteer With Us form, the Contact form, the Partnership form.
2. Each says thank you and that a confirmation email is on its way.
3. The matching tab shows a new row within a few seconds.
4. Two emails arrive per form, both from info@mumsaloud.com: the confirmation at the address you typed, the notification at info@mumsaloud.com (or the notify address). The first time, check the spam folder and mark them as not spam.
5. Delete the test rows.

If a form instead says the online form is not open yet, neither the script URL nor the mailbox password is set on Vercel, or the deployment has not been redeployed. If it says something went wrong, the secrets differ, the deployment was not made for "Anyone", or the script is an old version that does not know the tab. If the row appears but no email arrives, the mailbox password is wrong: the site then says "we will reply by email" instead of promising a confirmation. Google keeps a log under **Executions** in the editor's left bar; Vercel's function logs show mail errors.

## Changing the script later

Edits do not go live until you make a new version: **Deploy > Manage deployments**, click the pencil, set **Version** to **New version**, **Deploy**. The URL stays the same, so nothing changes on Vercel. The code in GitHub is the master copy; paste the whole file again rather than editing in Google.

## Good to know

- **Limits.** Titan Email allows a few hundred outgoing emails a day per mailbox. Each submission sends two. The newsletter stays on MailerLite; never send a mailing through this route.
- **Personal data.** The sheet holds names, email addresses, phone numbers and messages. Share it only with the team, and delete rows in line with the privacy notice.
- **What the emails look like.** Previews, with made-up details, on the site: `/style-guide/emails/volunteer-applicant/`, `volunteer-admin`, `contact-sender`, `contact-team`, `partnership-sender`, `partnership-team`. Gmail and Outlook show Georgia and Arial in place of the site's fonts; Apple Mail shows the real ones. The logo and photo load from the site, so some inboxes ask before showing images.
- **Fallbacks.** A submission counts as delivered when the row is saved or the team was emailed. Until either is set up, the forms go to `CONTACT_WEBHOOK_URL` if that is set, and otherwise the visitor is offered a prefilled email to info@mumsaloud.com. Nothing is lost silently.
- **If the mailbox password changes** in Titan, update `SMTP_PASSWORD` in Vercel and redeploy.
