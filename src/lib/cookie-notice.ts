/**
 * The cookie notice's memory: once a visitor closes it, one key in localStorage keeps it closed.
 * It holds nothing about the visitor (the value is the word "closed"), and it is the only thing
 * this site stores in a browser, as the cookie policy says.
 */
export const COOKIE_NOTICE_KEY = "mumsaloud:cookie-notice";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function createNoticeStore(getStorage: () => StorageLike | null) {
  // A storage that refuses writes (private windows, blocked site data) must not bring the notice straight back.
  let closedHere = false;
  const listeners = new Set<() => void>();
  return {
    isDismissed(): boolean {
      if (closedHere) return true;
      try {
        return getStorage()?.getItem(COOKIE_NOTICE_KEY) === "closed";
      } catch {
        return false;
      }
    },
    dismiss() {
      closedHere = true;
      try {
        getStorage()?.setItem(COOKIE_NOTICE_KEY, "closed");
      } catch {
        // Storage refused; the in-memory flag covers this visit.
      }
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export const cookieNoticeStore = createNoticeStore(() => (typeof window === "undefined" ? null : window.localStorage));
