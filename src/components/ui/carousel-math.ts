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
