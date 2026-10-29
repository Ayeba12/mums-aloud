import { describe, expect, it } from "vitest";
import { cascadeDelay, motion } from "./motion";

describe("motion", () => {
  it("staggers things that arrive together one step apart", () => {
    expect(cascadeDelay(0)).toBe(0);
    expect(cascadeDelay(1)).toBeCloseTo(motion.stagger);
    expect(cascadeDelay(3)).toBeCloseTo(3 * motion.stagger);
  });

  it("never makes the last of a long row wait longer than the cap", () => {
    expect(cascadeDelay(40)).toBe(motion.maxDelay);
    expect(cascadeDelay(-2)).toBe(0);
  });

  it("keeps the parallax drift inside the enlarged photo, so no edge shows", () => {
    // Enlarging by s leaves (s - 1) / 2 of the photo's height spare at each end.
    expect(motion.parallax / 100).toBeLessThanOrEqual((motion.parallaxScale - 1) / 2);
  });

  it("stays calm: short rises, sub-second fades", () => {
    expect(motion.rise).toBeLessThanOrEqual(24);
    expect(motion.duration).toBeLessThan(1);
    expect(motion.lineDuration).toBeLessThan(1);
  });
});
