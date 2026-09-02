import { prisma } from "./prisma";

// In-memory cache tenant by subdomain (biar gak query DB tiap request middleware)
const cache = new Map<string, { id: number; ttl: number }>();
const CACHE_TTL = 60_000; // 1 menit
const MAX_CACHE = 100;

export async function resolveTenantFromHost(host: string): Promise<number> {
  const parts = host.split(".");
  // Default tenant (tanpa subdomain / "www")
  if (parts.length < 3 || parts[0] === "www") return 1;

  const slug = parts[0];
  const cached = cache.get(slug);
  if (cached && Date.now() < cached.ttl) return cached.id;

  try {
    const tenant = await prisma.tenant.findFirst({
      where: { slug, isActive: true },
      select: { id: true },
    });
    const id = tenant?.id ?? 1;
    if (cache.size >= MAX_CACHE) cache.clear();
    cache.set(slug, { id, ttl: Date.now() + CACHE_TTL });
    return id;
  } catch {
    return 1;
  }
}

// Invalidasi cache (dipanggil saat admin add/edit tenant)
export function invalidateTenantCache(slug?: string) {
  if (slug) cache.delete(slug);
  else cache.clear();
}
