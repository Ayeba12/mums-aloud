/**
 * Sending: the site's own outgoing mail, through the team mailbox's SMTP login (info@mumsaloud.com
 * on Titan Email, the service that comes with the Hostinger domain). Every email goes out from that
 * address, so no Google account is involved. The password lives only in the hosting environment.
 */
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";
import type { EmailMessage } from "./message";
import { SHEET_URL_TOKEN } from "./template";

export type SmtpSettings = { host: string; port: number; user: string; password: string };

/** Titan's defaults; a blank value counts as unset. */
export const smtpSettings = (): SmtpSettings => ({
  host: process.env.SMTP_HOST || "smtp.titan.email",
  port: Number(process.env.SMTP_PORT || 465),
  user: process.env.SMTP_USER || siteConfig.email,
  password: process.env.SMTP_PASSWORD || "",
});

/** Sending is on once the mailbox password is set. */
export const mailConfigured = () => Boolean(smtpSettings().password);

/** The slice of a nodemailer transport the site uses, so tests can hand in a stand-in. */
export type Mailer = {
  sendMail(options: { from: { name: string; address: string }; to: string; replyTo?: string; subject: string; html: string; text: string }): Promise<unknown>;
};
export type CreateMailer = (settings: SmtpSettings) => Mailer;

const defaultMailer: CreateMailer = ({ host, port, user, password }) =>
  nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass: password }, connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000 });

export type SendResult = {
  configured: boolean;
  /** One entry per message, in order: whether it went out. */
  results: boolean[];
  failed: string[];
};

/**
 * Sends the given emails in order, each from the team mailbox with its own reply-to, filling in the
 * sheet's address where a message asks for it. Never throws: a failure is reported per message.
 */
export async function sendEmails(messages: EmailMessage[], { sheetUrl = "" } = {}, createMailer: CreateMailer = defaultMailer): Promise<SendResult> {
  const settings = smtpSettings();
  if (!settings.password) return { configured: false, results: messages.map(() => false), failed: [] };

  const results: boolean[] = [];
  const failed: string[] = [];
  let mailer: Mailer;
  try {
    mailer = createMailer(settings);
  } catch (error) {
    console.error("[mail] could not create the transport", error);
    return { configured: true, results: messages.map(() => false), failed: messages.map((message) => message.subject) };
  }
  for (const message of messages) {
    try {
      await mailer.sendMail({
        from: { name: message.fromName, address: settings.user },
        to: message.to,
        replyTo: message.replyTo,
        subject: message.subject,
        html: message.html.split(SHEET_URL_TOKEN).join(sheetUrl),
        text: message.text.split(SHEET_URL_TOKEN).join(sheetUrl),
      });
      results.push(true);
    } catch (error) {
      console.error(`[mail] not sent: "${message.subject}" to ${message.to}`, error);
      results.push(false);
      failed.push(message.subject);
    }
  }
  return { configured: true, results, failed };
}
