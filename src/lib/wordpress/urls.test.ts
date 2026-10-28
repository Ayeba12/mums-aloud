import { describe, expect, it } from "vitest";
import { uploadUrl, WORDPRESS_ORIGIN } from "./urls";

describe("WordPress URLs", () => {
  it("builds media addresses on the WordPress origin, whatever the path's leading slashes", () => {
    expect(WORDPRESS_ORIGIN).toMatch(/^https:\/\/[a-z.]+$/);
    expect(uploadUrl("2025/08/guide.pdf")).toBe(`${WORDPRESS_ORIGIN}/wp-content/uploads/2025/08/guide.pdf`);
    expect(uploadUrl("/2024/10/portrait.jpeg")).toBe(`${WORDPRESS_ORIGIN}/wp-content/uploads/2024/10/portrait.jpeg`);
  });
});
