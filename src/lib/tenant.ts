import { headers } from "next/headers";
import { prisma } from "./prisma";

// Header tenantId di-inject oleh middleware (dari subdomain)
const TENANT_HEADER = "x-tenant-id";

export async function getTenantFromHeaders(): Promise<number> {
  try {
    const h = await headers();
    const id = h.get(TENANT_HEADER);
    if (id && !Number.isNaN(Number(id))) return Number(id);
  } catch {
    // headers() tidak tersedia (test/SSG) — fallback default tenant
  }
  return 1;
}

export function tenantWhere<T extends Record<string, unknown>>(
  tenantId: number,
  extra: T = {} as T,
): T & { tenantId: number } {
  return { ...extra, tenantId };
}

// Ambil tenant aktif dari subdomain (dipakai di route handler / API)
export async function resolveTenantBySlug(slug: string) {
  if (!slug) return null;
  return prisma.tenant.findFirst({
    where: { slug, isActive: true },
  });
}
