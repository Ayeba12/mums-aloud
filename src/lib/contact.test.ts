import { describe, expect, it } from "vitest";
import { contactTopics, readContactFields, validateContact, type ContactFields } from "./contact";

const good: ContactFields = {
  name: "Ama Mensah",
  email: "ama@example.com",
  phone: "",
  topic: "mamas-escape",
  message: "I would like to know more about joining the community.",
};

describe("validateContact", () => {
  it("accepts a complete message with the phone left blank", () => {
    expect(validateContact(good)).toEqual({});
  });

  it("asks for a name, a real email address and a message with some substance", () => {
    const errors = validateContact({ ...good, name: "A", email: "not-an-email", message: "Hi" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("checks a phone number only when one is given", () => {
    expect(validateContact({ ...good, phone: "+44 7700 900123" })).toEqual({});
    expect(validateContact({ ...good, phone: "call me" }).phone).toMatch(/phone/);
  });

  it("only takes a topic from the list", () => {
    expect(validateContact({ ...good, topic: "anything" }).topic).toBeDefined();
    expect(contactTopics.map((topic) => topic.value)).toContain("partnership");
  });

  it("caps very long messages", () => {
    expect(validateContact({ ...good, message: "x".repeat(4001) }).message).toMatch(/4,000/);
  });
});

describe("readContactFields", () => {
  it("trims every field and treats missing ones as empty", () => {
    const data = new FormData();
    data.set("name", "  Ama ");
    data.set("email", " ama@example.com ");
    data.set("message", " Hello there, I have a question. ");
    expect(readContactFields(data)).toEqual({
      name: "Ama",
      email: "ama@example.com",
      phone: "",
      topic: "",
      message: "Hello there, I have a question.",
    });
  });
});
