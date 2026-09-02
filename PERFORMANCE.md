# Performance & Best Practices

> Panduan performa & arsitektur untuk Claris & City Tour. Update kalau ada perubahan penting.

---

## 1. Aturan Emas: SSG dulu, Dynamic hanya kalau perlu

| Pola                   | Kapan                                        | Efek                             |
| ---------------------- | -------------------------------------------- | -------------------------------- |
| **SSG** (static)       | Konten publik (tours, blogs, spots, gallery) | HTML pre-render → klik INSTAN    |
| **ISR** (`revalidate`) | Konten yang jarang berubah                   | Static + auto-update berkala     |
| **Dynamic**            | Admin, booking, payment, cek-booking         | Wajib real-time, gak bisa static |

**JANGAN** memanggil `headers()` / `cookies()` / `searchParams` (non-suspense) di Server Component data publik — itu bikin halaman jadi **dynamic render** (lambat, query DB tiap klik).

> ✅ Aturan ini sudah diterapkan: `data.ts` pakai `DEFAULT_TENANT_ID` (bukan headers). Halaman public = SSG. Cek hasil build: `○` = static, `●` = SSG.

---

## 2. Data Layer — `src/lib/data.ts`

**Aturan:**

- SEMUA akses data publik lewat sini (bukan Prisma langsung dari komponen).
- Query yang butuh 1 item → langsung `findFirst`/`findUnique` by slug (JANGAN fetch semua lalu filter di JS).
- Cache baca (Redis) cuma untuk data publik. Booking/payment SELALU DB fresh.
- Fallback ke hardcoded kalau DB error (biar web gak blank).

**Cache key:** `site:{tenantId}:{entity}` — invalidate via `invalidateSiteCache(tenantId)` setelah admin edit.

---

## 3. Tenancy — `src/lib/tenant.ts` & `tenant-resolver.ts`

- `DEFAULT_TENANT_ID = 1` — dipakai data layer public (SSG-friendly, no headers).
- `getTenantFromHeaders()` — HANYA di admin/auth (request-scoped, dynamic). Ada di `tenant-headers.ts`.
- `resolveTenantFromHost()` — dipakai middleware `proxy.ts`, pakai in-memory cache (bukan query DB tiap request).
- Admin actions baca tenant dari headers → semua content query di-scope per tenant.

---

## 4. Redis Cache — `src/lib/cache.ts` & `redis.ts`

**Desain no-stale:**

1. Hanya data publik di-cache (60s TTL safety net).
2. Tiap admin edit → `invalidateSiteCache()` (pakai SCAN, bukan KEYS).
3. Booking/payment/review TIDAK di-cache.
4. Redis down → return null → fallback DB (web tetap jalan).
5. Koneksi lazy singleton + error handler (anti crash).

**Env:** `REDIS_URL` (Upstash free).

---

## 5. Query Optimization Checklist

- [x] `getTourPackageBySlug` langsung DB query (bukan fetch semua)
- [x] `getBlogPostBySlug` langsung DB query
- [x] Redis cache data publik
- [ ] Index DB untuk kolom yang sering di-`where` (review: pakai `@@index` sudah ada utk tenantId, status, tourDate)
- [ ] Hindari `include` berlebihan — select field yang dipakai doang
- [ ] Gunakan `Prisma.select` (bukan full object) di list yang besar

---

## 6. Routing & Rendering (Next.js 16)

- Detail pages pakai `generateStaticParams()` → SSG.
- Middleware/proxy: minimal, cache tenant resolution.
- `next/image` → selalu kasih `sizes`, `priority` di hero, `fill` pakai `sizes`.
- Jangan taruh `"use client"` kalau bisa Server Component.

---

## 7. Format & Testing

- Server Actions untuk mutasi (auth check tiap action).
- Rate limit: booking 5x/min, login 5x/15min, lookup 10x/min.
- Input validation server-side (regex phone, pax 1-50, dll).
- Unit test (Vitest) mock `@/lib/prisma` — tanpa DB real.
- E2E (Playwright) butuh dev server.

---

## Referensi

- `AGENTS.md` — arsitektur & perintah
- `DESIGN_SYSTEM.md` — tema putih+emas
- `DATA_CONTRACT.md` — kontrak data
- `TECHNICAL_AUDIT.md` — gap analysis & status fix
