/** Validation for the contact and partnership forms, shared by the server actions and their tests. */

export const contactTopics = [
  { value: "general", label: "A general question" },
  { value: "mamas-escape", label: "Mama's Escape (the community)" },
  { value: "partnership", label: "Partnership or commissioning" },
  { value: "training", label: "Training, workshops or events" },
  { value: "coaching", label: "Working with Bokun" },
  { value: "press", label: "Press or something else" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["value"];

export type ContactFields = { name: string; email: string; organisation: string; phone: string; topic: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s()./-]{5,}$/;

export const CONTACT_LIMITS = { name: 120, email: 254, organisation: 160, phone: 40, message: 4000 } as const;

export function readContactFields(formData: FormData): ContactFields {
  const text = (key: string) => String(formData.get(key) ?? "").trim();
  return {
    name: text("name"),
    email: text("email"),
    organisation: text("organisation"),
    phone: text("phone"),
    topic: text("topic"),
    message: text("message"),
  };
}

/** Field-level problems, in the form's own words; an empty object means the message can go. */
export function validateContact(fields: ContactFields, options: { requireOrganisation?: boolean } = {}): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.length < 2) errors.name = "Please tell us your name.";
  else if (fields.name.length > CONTACT_LIMITS.name) errors.name = "That name is longer than we can take.";
  if (!EMAIL.test(fields.email) || fields.email.length > CONTACT_LIMITS.email) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }
  if (options.requireOrganisation && fields.organisation.length < 2) errors.organisation = "Please tell us your organisation.";
  else if (fields.organisation.length > CONTACT_LIMITS.organisation) errors.organisation = "That organisation name is longer than we can take.";
  if (fields.phone && (!PHONE.test(fields.phone) || fields.phone.length > CONTACT_LIMITS.phone)) {
    errors.phone = "Please check the phone number, or leave it blank.";
  }
  if (!contactTopics.some((topic) => topic.value === fields.topic)) errors.topic = "Please choose what your message is about.";
  if (fields.message.length < 10) errors.message = "Please write a little more, so we can help.";
  else if (fields.message.length > CONTACT_LIMITS.message) errors.message = "Please keep your message under 4,000 characters.";
  return errors;
}
