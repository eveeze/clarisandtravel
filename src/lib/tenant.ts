// Konteks tenant. Untuk content pages (SSG), pakai DEFAULT_TENANT_ID.
// headers() dipakai di admin/auth saja (dynamic).
// Multi-tenant subdomain: nanti via middleware + data layer refactor.

export const DEFAULT_TENANT_ID = 1;

// Hanya dipakai di admin/auth — request-scoped (dynamic).
export { getTenantFromHeaders } from "./tenant-headers";
