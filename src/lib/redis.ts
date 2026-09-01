import { Redis } from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis | null };

function createRedis(): Redis | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    return new Redis(url, {
      maxRetriesPerRequest: null,
      enableOfflineQueue: false,
      lazyConnect: true,
    });
  } catch {
    return null;
  }
}

export const redis = globalForRedis.redis ?? createRedis();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

export const redisReady = redis !== null;
