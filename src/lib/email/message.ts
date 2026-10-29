/** One email as the site renders it and the Google Apps Script sends it. */
export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** The name shown as the sender. */
  fromName: string;
  replyTo?: string;
};
