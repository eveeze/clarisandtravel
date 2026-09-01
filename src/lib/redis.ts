import { Redis } from "ioredis";

let _redis: Redis | null | undefined = undefined;

// Lazy singleton — dipanggil dari queue/worker.
// Langsung dibuat saat pertama dipakai (bukan saat import),
// jadi env REDIS_URL sudah pasti ke-load.
export function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;

  const url = process.env.REDIS_URL;
  if (!url) {
    _redis = null;
    return null;
  }

  try {
    _redis = new Redis(url, {
      maxRetriesPerRequest: null,
      enableOfflineQueue: false,
      lazyConnect: true,
    });
  } catch {
    _redis = null;
  }
  return _redis;
}

export const redisReady = (): boolean => getRedis() !== null;
