import { getRedis } from "./redis";

// Cache helper — cache baca untuk data PUBLIK saja.
// GARANSI TIDAK STALE:
// 1. Hanya data publik yang di-cache (tours, blogs, spots, gallery, vehicles, content, reviews).
// 2. Booking/payment/driver TIDAK PERNAH di-cache — selalu baca DB fresh.
// 3. Setiap admin edit konten → invalidateSiteCache() → cache dihapus sebelum dibaca lagi.
// 4. TTL 60 detik sebagai safety net (jika ada jalur edit yang terlewat).
// 5. Kalau Redis down → fungsi return null → code fallback ke query DB langsung (web tetap jalan).

const DEFAULT_TTL = 60; // detik — safety net

export function cacheKey(tenantId: number, entity: string): string {
  return `site:${tenantId}:${entity}`;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const raw = await redis.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    // Parse error / redis error → anggap miss, baca DB
    return null;
  }
}

export async function cacheSet(key: string, value: unknown, ttl = DEFAULT_TTL): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch {
    // Abaikan — miss berikutnya baca DB
  }
}

export async function cacheDel(key: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.del(key);
  } catch {
    // ignore
  }
}

// Hapus SEMUA cache site milik tenant — dipanggil setelah admin edit konten.
// Pakai SCAN (bukan KEYS) biar gak blocking Redis — production best practice.
export async function invalidateSiteCache(tenantId: number): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    const pattern = `site:${tenantId}:*`;
    let cursor = "0";
    do {
      const [nextCursor, keys] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 100);
      if (keys.length > 0) await redis.del(...keys);
      cursor = nextCursor;
    } while (cursor !== "0");
  } catch {
    // ignore
  }
}
