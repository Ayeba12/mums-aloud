import { describe, expect, it } from "vitest";
import { buttonRow, shell } from "./template";

describe("email buttons", () => {
  const row = buttonRow([
    { label: "Reply to Amara", href: "mailto:amara@example.com" },
    { label: "Open the applications sheet", href: "https://example.com", variant: "secondary" },
  ]);

  it("lays buttons out as wrapping blocks, not table cells that cannot wrap", () => {
    expect(row).not.toContain("<td");
    expect(row.match(/class="btn-wrap"/g)).toHaveLength(2);
    expect(row.match(/class="btn"/g)).toHaveLength(2);
    expect(row).toContain("white-space:nowrap");
  });

  it("stacks the buttons full width on phones", () => {
    const html = shell({ title: "t", preheader: "p", origin: "https://example.com", body: row, footerNote: "n" });
    expect(html).toMatch(/@media \(max-width:480px\)\{\.btn-wrap\{display:block !important;[^}]*\}\.btn\{display:block !important;/);
  });
});
