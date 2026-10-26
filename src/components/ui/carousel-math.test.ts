import { describe, expect, it } from "vitest";
import { centreDistance, centredIndex, centredScrollLeft, loopShift, slideIndex, trackEdges } from "./carousel-math";

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

describe("loopShift", () => {
  it("keeps a three-copy loop on its middle copy", () => {
    expect(loopShift(6, 6)).toBe(0);
    expect(loopShift(11, 6)).toBe(0);
    expect(loopShift(5, 6)).toBe(6);
    expect(loopShift(12, 6)).toBe(-6);
  });

  it("does nothing for an empty row", () => {
    expect(loopShift(3, 0)).toBe(0);
  });
});

describe("centreDistance", () => {
  it("is 0 in the centre and 1 from a full stride away, either side", () => {
    expect(centreDistance(0, 364)).toBe(0);
    expect(centreDistance(182, 364)).toBe(0.5);
    expect(centreDistance(-364, 364)).toBe(1);
  });

  it("never passes 1 and never divides by zero", () => {
    expect(centreDistance(900, 364)).toBe(1);
    expect(centreDistance(50, 0)).toBe(0);
  });
});

describe("centred snapping", () => {
  it("puts a card's middle on the viewport's middle", () => {
    // 348px cards 16px apart in a 1393px viewport: card 7 sits at 7 * 364 + 174 - 696.5.
    expect(centredScrollLeft(7, 348, 16, 1393)).toBeCloseTo(2025.5, 1);
    expect(centredIndex(2025.5, 348, 16, 1393)).toBe(7);
  });

  it("round-trips every index and rounds mid-scroll to the nearest card", () => {
    for (let index = 0; index < 18; index += 1) {
      expect(centredIndex(centredScrollLeft(index, 187, 12, 390), 187, 12, 390)).toBe(index);
    }
    expect(centredIndex(centredScrollLeft(7, 348, 16, 1393) + 150, 348, 16, 1393)).toBe(7);
    expect(centredIndex(centredScrollLeft(7, 348, 16, 1393) + 200, 348, 16, 1393)).toBe(8);
  });
});
