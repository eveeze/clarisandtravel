// Rate limiter sederhana (in-memory, sliding window) untuk server actions.
// Ambil IP dari headers (x-forwarded-for), cocok di Vercel/serverless.
// Catatan: in-memory = per-instance. Untuk scale besar ganti ke storage terpusat
// (Upstash Redis / DB). Cukup untuk trafik kecil.

import { headers } from "next/headers";

type Bucket = { timestamps: number[] };

const globalForRateLimit = globalThis as unknown as {
  __rateLimits?: Map<string, Bucket>;
};

function store(): Map<string, Bucket> {
  if (!globalForRateLimit.__rateLimits) {
    globalForRateLimit.__rateLimits = new Map();
  }
  return globalForRateLimit.__rateLimits;
}

export type RateLimitResult = {
  limited: boolean;
  remaining: number;
  resetAt: number;
};

export async function rateLimit(scope: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : "local";

  const now = Date.now();
  const key = `${scope}:${ip}`;
  const map = store();

  let bucket = map.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    map.set(key, bucket);
  }

  // Buang entry yang sudah lewat window
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= limit) {
    return { limited: true, remaining: 0, resetAt: bucket.timestamps[0] + windowMs };
  }

  bucket.timestamps.push(now);
  return { limited: false, remaining: limit - bucket.timestamps.length, resetAt: now + windowMs };
}
