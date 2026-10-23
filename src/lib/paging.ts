/** Paging maths for the listings: page 1 lives at the listing path, later pages under `page/<n>/`. */

export const LISTING_PAGE_SIZE = 8;

/** Parses a page segment such as "2"; anything that is not a whole number from 1 up is null. */
export function parsePage(segment: string | undefined): number | null {
  if (!segment || !/^\d{1,4}$/.test(segment)) return null;
  const page = Number(segment);
  return page >= 1 ? page : null;
}

export function pageCount(total: number, size = LISTING_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / size));
}

export function pageSlice<T>(items: T[], page: number, size = LISTING_PAGE_SIZE): T[] {
  return items.slice((page - 1) * size, page * size);
}

/** Path for a page of a listing; page 1 is the listing itself, so there is one URL per page. */
export function pageHref(listingPath: string, page: number): string {
  return page <= 1 ? listingPath : `${listingPath}page/${page}/`;
}
