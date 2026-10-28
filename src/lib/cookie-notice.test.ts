import { describe, expect, it, vi } from "vitest";
import { COOKIE_NOTICE_KEY, createNoticeStore } from "./cookie-notice";

const fakeStorage = () => {
  const data = new Map<string, string>();
  return { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => void data.set(key, value), data };
};

describe("cookie notice store", () => {
  it("shows the notice until it is closed, then remembers the closing in storage", () => {
    const storage = fakeStorage();
    const store = createNoticeStore(() => storage);
    expect(store.isDismissed()).toBe(false);
    store.dismiss();
    expect(store.isDismissed()).toBe(true);
    expect(storage.data.get(COOKIE_NOTICE_KEY)).toBe("closed");
    expect([...storage.data.keys()]).toEqual([COOKIE_NOTICE_KEY]);
  });

  it("reads a closing remembered on an earlier visit", () => {
    const storage = fakeStorage();
    storage.setItem(COOKIE_NOTICE_KEY, "closed");
    expect(createNoticeStore(() => storage).isDismissed()).toBe(true);
  });

  it("stays closed for the visit when storage refuses, and tells subscribers", () => {
    const refusing = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    };
    const store = createNoticeStore(() => refusing);
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    expect(store.isDismissed()).toBe(false);
    store.dismiss();
    expect(store.isDismissed()).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    store.dismiss();
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("renders nothing on the server, where there is no storage", () => {
    expect(createNoticeStore(() => null).isDismissed()).toBe(false);
  });
});
