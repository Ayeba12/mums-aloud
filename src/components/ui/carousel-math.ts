/** Index of the slide nearest to the current scroll position. */
export function slideIndex(scrollLeft: number, slideWidth: number, gap: number): number {
  const stride = slideWidth + gap;
  if (stride <= 0) return 0;
  return Math.max(0, Math.round(scrollLeft / stride));
}

/** Whether the track sits at its start or its end, with a 1px allowance for fractional widths. */
export function trackEdges(scrollLeft: number, clientWidth: number, scrollWidth: number) {
  return {
    atStart: scrollLeft <= 1,
    atEnd: scrollLeft + clientWidth >= scrollWidth - 1,
  };
}

/**
 * Slides to jump so a three-copy loop stays on its middle copy: a whole copy forward while the
 * index is in the first copy, a whole copy back once it reaches the last, nothing in between.
 */
export function loopShift(index: number, count: number): number {
  if (count <= 0) return 0;
  if (index < count) return count;
  if (index >= 2 * count) return -count;
  return 0;
}

/** How far a card sits from the centre, as a share of one stride: 0 in the centre, 1 from a stride away. */
export function centreDistance(offset: number, stride: number): number {
  if (stride <= 0) return 0;
  return Math.min(Math.abs(offset) / stride, 1);
}

/** Scroll position that puts card `index` in the centre of a viewport, with every card snapping to the centre. */
export function centredScrollLeft(index: number, slideWidth: number, gap: number, viewportWidth: number): number {
  return index * (slideWidth + gap) + slideWidth / 2 - viewportWidth / 2;
}

/** Index of the card nearest the centre of the viewport, for a row whose cards snap to the centre. */
export function centredIndex(scrollLeft: number, slideWidth: number, gap: number, viewportWidth: number): number {
  return slideIndex(scrollLeft - slideWidth / 2 + viewportWidth / 2, slideWidth, gap);
}
