import { headers } from "next/headers";

// Request-scoped tenant (dipakai di admin/auth yang memang dynamic).
// JANGAN dipakai di data layer public — bikin halaman jadi dynamic render.
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
