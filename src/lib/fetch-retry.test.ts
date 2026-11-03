import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchWithRetry } from "./fetch-retry";

const options = { label: "Test", timeoutMs: 1000 };
const ok = () => new Response("ok", { status: 200 });
const status = (code: number) => new Response("x", { status: code });

/** Runs a request while the fake clock skips the pauses between attempts. */
async function run<T>(promise: Promise<T>): Promise<T> {
  const settled = promise.then(
    (value) => ({ value }),
    (error: unknown) => ({ error }),
  );
  await vi.runAllTimersAsync();
  const result = await settled;
  if ("error" in result) throw result.error;
  return result.value;
}

describe("fetchWithRetry", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("answers at once when the first try works", async () => {
    const fetchMock = vi.fn(async () => ok());
    vi.stubGlobal("fetch", fetchMock);
    expect((await run(fetchWithRetry("https://cms.test", {}, options))).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("tries again after a 5xx or a 429, and returns the answer that worked", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(status(500)).mockResolvedValueOnce(status(429)).mockResolvedValueOnce(ok());
    vi.stubGlobal("fetch", fetchMock);
    expect((await run(fetchWithRetry("https://cms.test", { method: "POST", body: "{}" }, options))).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls[2][1]).toMatchObject({ method: "POST", body: "{}" });
  });

  it("tries again after a network error", async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new TypeError("fetch failed")).mockResolvedValueOnce(ok());
    vi.stubGlobal("fetch", fetchMock);
    expect((await run(fetchWithRetry("https://cms.test", {}, options))).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("gives up after three tries, handing back the last answer or error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => status(503)));
    expect((await run(fetchWithRetry("https://cms.test", {}, options))).status).toBe(503);
    expect(fetch).toHaveBeenCalledTimes(3);

    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("getaddrinfo ENOTFOUND"))));
    await expect(run(fetchWithRetry("https://cms.test", {}, options))).rejects.toThrow("ENOTFOUND");
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it("does not retry a timeout or an ordinary answer such as 404", async () => {
    const timeout = Object.assign(new Error("timed out"), { name: "TimeoutError" });
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(timeout)));
    await expect(run(fetchWithRetry("https://cms.test", {}, options))).rejects.toThrow("timed out");
    expect(fetch).toHaveBeenCalledTimes(1);

    vi.stubGlobal("fetch", vi.fn(async () => status(404)));
    expect((await run(fetchWithRetry("https://cms.test", {}, options))).status).toBe(404);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
