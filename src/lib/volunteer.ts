/** Validation for the volunteer application, shared by the server action and its tests. */

export type VolunteerFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
};
export type VolunteerErrors = Partial<Record<keyof VolunteerFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s()./-]{5,}$/;

export const VOLUNTEER_LIMITS = { name: 120, email: 254, phone: 40, skills: 4000, availability: 200 } as const;

export function readVolunteerFields(formData: FormData): VolunteerFields {
  const text = (key: string) => String(formData.get(key) ?? "").trim();
  return {
    firstName: text("firstName"),
    lastName: text("lastName"),
    email: text("email"),
    phone: text("phone"),
    skills: text("skills"),
    availability: text("availability"),
  };
}

/** Field-level problems, in the form's own words; an empty object means the application can go. */
export function validateVolunteer(fields: VolunteerFields): VolunteerErrors {
  const errors: VolunteerErrors = {};
  if (fields.firstName.length < 1) errors.firstName = "Please tell us your first name.";
  else if (fields.firstName.length > VOLUNTEER_LIMITS.name) errors.firstName = "That name is longer than we can take.";
  if (fields.lastName.length < 1) errors.lastName = "Please tell us your last name.";
  else if (fields.lastName.length > VOLUNTEER_LIMITS.name) errors.lastName = "That name is longer than we can take.";
  if (!EMAIL.test(fields.email) || fields.email.length > VOLUNTEER_LIMITS.email) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }
  if (fields.phone && (!PHONE.test(fields.phone) || fields.phone.length > VOLUNTEER_LIMITS.phone)) {
    errors.phone = "Please check the phone number, or leave it blank.";
  }
  if (fields.skills.length < 10) errors.skills = "Please tell us a little about your skills and experience.";
  else if (fields.skills.length > VOLUNTEER_LIMITS.skills) errors.skills = "Please keep this under 4,000 characters.";
  if (fields.availability.length < 2) errors.availability = "Please tell us when you are usually available.";
  else if (fields.availability.length > VOLUNTEER_LIMITS.availability) errors.availability = "Please keep your availability to a line or two.";
  return errors;
}
