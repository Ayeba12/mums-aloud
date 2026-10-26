import { describe, expect, it } from "vitest";
import { siteConfig } from "./site";

/** Each network's own host, so a profile can never point at a look-alike domain. */
const hosts: Record<keyof typeof siteConfig.social, string> = {
  instagram: "www.instagram.com",
  facebook: "www.facebook.com",
  youtube: "www.youtube.com",
};

describe("siteConfig.social", () => {
  it("links each shown profile to its own network over https, with a handle to display", () => {
    for (const [key, social] of Object.entries(siteConfig.social) as [keyof typeof hosts, (typeof siteConfig.social)[keyof typeof hosts]][]) {
      if (!social.href) {
        expect(social.handle, `${key} has a handle but no URL`).toBe("");
        continue;
      }
      const url = new URL(social.href);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).toBe(hosts[key]);
      expect(social.handle, `${key} shows without a handle`).not.toBe("");
    }
  });

  it("carries the Instagram and Facebook profiles found on 26 Oct 2026", () => {
    expect(siteConfig.social.instagram.href).toBe("https://www.instagram.com/mumsaloud/");
    expect(siteConfig.social.instagram.handle).toBe("@mumsaloud");
    expect(siteConfig.social.facebook.href).toBe("https://www.facebook.com/mumsaloud/");
  });
});
