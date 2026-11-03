/**
 * `fetch` with two quick retries, for the reads the site cannot render without (WordPress, the
 * podcast feed). Every page is prerendered at build time, and a single failed read there stops the
 * whole build, so a momentary hiccup (a 5xx from the CMS host, a failed DNS lookup) is worth a
 * second and third try a moment later. Only reads use it: retrying them changes nothing.
 *
 * Retried: network errors, 5xx answers and 429. Not retried: timeouts (a host that hangs would only
 * hang again and drag the build out) and every other status, which the caller handles as before.
 */

export const RETRY_DELAYS_MS = [500, 1500];

export type RetryOptions = {
  /** Shown in the log line when a retry happens, e.g. "WordPress". */
  label: string;
  timeoutMs: number;
  delaysMs?: number[];
};

const worthRetrying = (status: number) => status === 429 || status >= 500;
const isTimeout = (error: unknown) => error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWithRetry(url: string, init: RequestInit, { label, timeoutMs, delaysMs = RETRY_DELAYS_MS }: RetryOptions): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    const last = attempt >= delaysMs.length;
    let reason: string;
    try {
      // A fresh timeout per attempt: an aborted signal cannot be reused.
      const response = await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
      if (!worthRetrying(response.status) || last) return response;
      reason = `answered ${response.status}`;
    } catch (error) {
      if (isTimeout(error) || last) throw error;
      reason = (error as Error).message;
    }
    console.warn(`[${label}] ${reason}; trying again (${attempt + 2} of ${delaysMs.length + 1})`);
    await pause(delaysMs[attempt]);
  }
}
