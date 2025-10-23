import { APIError } from "encore.dev/api";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 100;

export function checkRateLimit(identifier: string): void {
  const now = Date.now();
  const record = store[identifier];

  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + WINDOW_MS,
    };
    return;
  }

  if (record.count >= MAX_REQUESTS) {
    throw APIError.resourceExhausted(
      "Too many requests. Please try again later."
    );
  }

  record.count++;
}

setInterval(() => {
  const now = Date.now();
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
}, WINDOW_MS);
