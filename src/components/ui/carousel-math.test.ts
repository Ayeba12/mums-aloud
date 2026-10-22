import { describe, expect, it } from "vitest";
import { slideIndex, trackEdges } from "./carousel-math";

describe("slideIndex", () => {
  it("counts slides by width plus gap", () => {
    expect(slideIndex(0, 300, 16)).toBe(0);
    expect(slideIndex(316, 300, 16)).toBe(1);
    expect(slideIndex(640, 300, 16)).toBe(2);
  });

  it("rounds to the nearest slide while a scroll is in flight", () => {
    expect(slideIndex(150, 300, 16)).toBe(0);
    expect(slideIndex(170, 300, 16)).toBe(1);
  });

  it("never goes negative or divides by zero", () => {
    expect(slideIndex(-20, 300, 16)).toBe(0);
    expect(slideIndex(100, 0, 0)).toBe(0);
  });
});

describe("trackEdges", () => {
  it("reports the start and the end of the track", () => {
    expect(trackEdges(0, 390, 1200)).toEqual({ atStart: true, atEnd: false });
    expect(trackEdges(400, 390, 1200)).toEqual({ atStart: false, atEnd: false });
    expect(trackEdges(810, 390, 1200)).toEqual({ atStart: false, atEnd: true });
  });

  it("treats a track that does not overflow as both start and end", () => {
    expect(trackEdges(0, 1200, 1200)).toEqual({ atStart: true, atEnd: true });
  });

  it("allows one pixel of rounding at either edge", () => {
    expect(trackEdges(0.6, 390, 1200).atStart).toBe(true);
    expect(trackEdges(809.4, 390, 1200).atEnd).toBe(true);
  });
});
