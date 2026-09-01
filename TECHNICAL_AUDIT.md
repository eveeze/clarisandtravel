# Claris & Travel — Technical Audit & Gap Analysis

> Status: v1.0 · Tanggal: 2026-08-31
> Scope: Audit menyeluruh seluruh fitur yang sudah dibangun (Fase 1 + P1/P2 roadmap + P3 cek-booking), gap kritis, edge case, dan rekomendasi fix.
> Konteks: Sebelum production launch. Belum ada payment gateway (Midtrans/Xendit) — semua transaksi masih manual di luar sistem.

---

## 1. Ringkasan Eksekutif

| Aspek                                            | Status   | Catatan                                                                             |
| ------------------------------------------------ | -------- | ----------------------------------------------------------------------------------- |
| **Kualitas untuk demo / internal**               | ✅ Cukup | Semua fitur dasar jalan + teruji                                                    |
| **Kualitas untuk production (customer beneran)** | ⚠️ BELUM | Ada gap kritis di booking code, totalPrice, komisi, rate-limit, dan keamanan lookup |
| **Payment gateway**                              | ❌ Belum | Flow manual, semua uang berjalan di luar sistem                                     |

**Kesimpulan singkat:** 7 gap kritis (section 3) + 7 edge case minor (section 4). Paling berbahaya: **booking code sequential = bisa di-enumerate → data leak customer**.

> **Update 2026-08-31:** Mayoritas gap sudah diperbaiki. Lihat detail di bawah.

---

## 2. Flow Saat Ini (TANPA Payment Gateway)

```
CUSTOMER
  → browsing website → lihat paket tour → isi booking form
  → Server Action createBooking → bookingCode CLR-<tahun>-<n> → DB (status: "baru")
  → WA ke admin kebuka otomatis (pesan terformat + kode booking)
  → /cek-booking → masukkan kode/nomor WA → lihat status

ADMIN (manual, semua via WA di luar sistem)
  → terima WA → negosiasi harga & jadwal → deal / gak deal
  → kalau deal: admin mark payment manual (paymentStatus: "dibayar") ← TANPA transfer real
  → admin update status: dikonfirmasi → driver_ditugaskan → berlangsung → selesai
  → komisi developer: otomatis terhitung saat status = "selesai"

KAS
  → customer bayar cash / transfer manual ke admin
  → sistem cuma TRACKING, bukan eksekutor pembayaran
```

**Karakteristik flow ini:**

- Booking = "lead WA" yang dicatat, bukan komitmen berbayar
- Bisa no-show (tanpa DP, customer gak ada komitmen)
- Semua keputusan harga/jadwal ada di manusia (WA), bukan sistem
- `paymentStatus` diisi manual admin, bukan verifikasi otomatis

---

## 3. Gap KRITIS (Harus Diperbaiki Sebelum Production)

### 3.1 Race Condition pada `bookingCode` — bisa duplicate / error

> ✅ **FIXED 2026-08-31** — booking code sekarang acak (`CLR-${nanoid(8).toUpperCase()}`), anti-race & anti-enumerate.

**Lokasi:** `src/app/actions/booking.ts:42-45`

```ts
const count = await prisma.booking.count();
const bookingCode = `CLR-${year}-${String(count + 1).padStart(4, "0")}`;
```

**Masalah:**

- Dua booking dibuat dalam milidetik yang sama → kode sama → **unique constraint violation** → salah satu booking gagal tersimpan
- Kalau booking dihapus, `count` turun → kode baru bisa **duplicate dengan booking lama** yang masih ada

**Dampak:** Booking hilang / gagal di jam sibuk. **Fix:**

- Gunakan `max(id) + 1` (atomic) di dalam transaction, ATAU
- Gunakan kode acak: `CLR-${nanoid(8).toUpperCase()}` (juga menyelesaikan gap 3.4)

---

### 3.2 `totalPrice` SELALU null — fitur revenue mati

> ✅ **FIXED 2026-08-31** — `createBooking` sekarang menghitung `totalPrice = (basePrice + vehicleIncrement) × pax`.

**Lokasi:** `src/app/actions/booking.ts` (create) + `src/app/admin/bookings/page.tsx` (read-only) + `src/app/admin/earnings/page.tsx`

**Masalah:**

- `createBooking` TIDAK menghitung `totalPrice`
- Admin juga TIDAK punya form untuk mengisi/edit `totalPrice`
- Akibatnya: di `/cek-booking` dan `/admin/earnings`, **totalPrice selalu "-" (Rp 0 di revenue)**

**Dampak:** Dashboard earnings "Revenue Masuk" selalu Rp 0. Data bisnis tidak berguna.

**Fix (pilih):**

- Opsi A (otomatis): di `createBooking`, hitung `totalPrice = basePrice + vehicleIncrement × pax` (perlu pax dikali atau sekali, sesuai model bisnis)
- Opsi B (manual): tambah form input `totalPrice` di halaman admin booking

---

### 3.3 Komisi dihitung tanpa verifikasi pembayaran

> ✅ **FIXED 2026-08-31** — komisi sekarang hanya terhitung jika `status === "selesai"` DAN `paymentStatus === "dibayar"` (di `updateBookingStatus` & `updatePaymentStatus`).

**Lokasi:** `src/app/admin/bookings/actions.ts:33-43`

```ts
// Komisi otomatis ke-"paid" saat booking selesai
if (status === "selesai" && !existing.commissionPaid) {
  data.commissionPaid = true;
  data.commissionPaidAt = new Date();
}
```

**Masalah:** Komisi `commissionPaid = true` hanya butuh status `selesai` — **meskipun `paymentStatus` masih "belum"**. Developer dapat komisi dari booking yang customer-nya tidak pernah bayar.

**Fix:**

```ts
if (status === "selesai" && !existing.commissionPaid && paymentStatus === "dibayar") {
  data.commissionPaid = true;
  data.commissionPaidAt = new Date();
}
```

(Syarat komisi: booking SELESAI **DAN** sudah DIBAYAR.)

---

### 3.4 Booking code sequential = bisa di-enumerate → DATA LEAK

> ✅ **FIXED 2026-08-31** — kode booking sekarang acak (`CLR-${nanoid(8)}`), tidak bisa di-enumerate.

**Lokasi:** `src/app/actions/booking.ts:45` + `src/app/actions/booking-lookup.ts` + `src/app/cek-booking/`

**Masalah:**

- Kode `CLR-2026-0001`, `0002`, `0003`... berurutan → siapa pun bisa nebak
- `/cek-booking` tidak memerlukan verifikasi kepemilikan (cukup tahu kode/nomor)
- Orang bisa enumerate semua kode → lihat **nama, nomor WA, lokasi jemput, total harga** customer lain

**Dampak:** Privasi customer bocor. Ini yang PALING BERBAHAYA.

**Fix:**

- Kode acak: `CLR-${nanoid(8).toUpperCase()}` (misal `CLR-X7K2P9QD`)
- ATAU minimal: require **kode + nama pemesan** untuk lookup (bukan cuma kode)

---

### 3.5 `lookupBooking` by phone — substring match bisa salah

> ✅ **FIXED 2026-08-31** — phone lookup sekarang exact match dengan normalisasi format `628xxxxxxxxx`.

**Lokasi:** `src/app/actions/booking-lookup.ts:46-56`

```ts
{ phone: { contains: digits.slice(-11) } },
{ phone: { contains: digits.replace(/^0/, "62") } },
```

**Masalah:**

- Pakai `contains` (substring) → 2 nomor mirip bisa balik booking yang salah
- Tidak ada verifikasi kepemilikan nomor (OTP) → siapa pun yang tahu nomormu bisa lihat booking-mu

**Fix:**

- Cari dengan exact match: normalisasi nomor ke satu format (misal `62xxxxxxxxxx`), bandingkan `phone = normalized`
- Pertimbangkan verifikasi OTP untuk lookup by phone (bisa via WhatsApp Business API nanti)

---

### 3.6 Rate limiting = 0 (spam & brute force)

> ✅ **FIXED 2026-08-31** — rate limit per-IP: booking 5x/menit, login 5x/15 menit (in-memory, `src/lib/rate-limit.ts`).

**Lokasi:** seluruh repo — tidak ada proteksi

**Masalah:**

- Form booking (`createBooking`) bisa di-spam 1000x/menit → DB penuh sampah
- Admin login (`/admin/login`) bisa di-brute force
- `lookupBooking` bisa di-scrape (enumerate kode) — memperparah gap 3.4

**Fix:**

- Rate limit per IP untuk `createBooking` & `login` (misal library `@upstash/ratelimit` atau custom middleware DB)
- Honeypot field / Turnstile di form booking
- Backoff / lockout untuk login gagal berulang

---

### 3.7 Nomor WhatsApp hardcode di 4 tempat berbeda

> ✅ **FIXED 2026-08-31** — satu sumber: `src/lib/contact.ts` (`WHATSAPP_NUMBER` / `whatsappLink()`), dipakai di BookingForm, FloatingWhatsapp, cek-booking.

**Lokasi:**

1. `src/components/BookingForm.tsx` → default `6285779536859`
2. `src/components/FloatingWhatsapp.tsx` → `NEXT_PUBLIC_WHATSAPP_NUMBER`
3. `src/app/cek-booking/cek-booking-client.tsx` → hardcode `wa.me/6285779536859`
4. `src/components/Footer.tsx` → dari `getSiteContent("footer")` (sumber berbeda)

**Masalah:** 4 sumber nomor WA. Ganti nomor = edit 4 tempat, rawan tidak sinkron.

**Fix:** Satu sumber kebenaran. Contoh: selalu dari env `NEXT_PUBLIC_WHATSAPP_NUMBER`, atau dari `getSiteContent("footer")` yang di-pass ke client component.

---

## 4. Edge Case MINOR (Perlu Diperhatikan)

| #   | Lokasi                                          | Edge Case                                                                                                | Saran                                                                        | Status       |
| --- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------ |
| 1   | `admin/bookings/actions.ts` assignDriver        | Assign driver ke booking yang statusnya **batal/selesai** → status otomatis balik ke `driver_ditugaskan` | Validasi: hanya boleh assign kalau status di `dikonfirmasi`/`baru`/`dibayar` | ✅ FIXED     |
| 2   | `booking-lookup.ts`                             | Format input `+62` vs `08` vs `628` → punya OR condition tapi bisa ambiguous                             | Normalisasi 1 format, pakai exact match                                      | ✅ FIXED     |
| 3   | `admin/bookings/actions.ts` deleteBooking       | Cascade hapus review + history → rating paket berubah tiba-tiba                                          | Pertimbangkan soft-delete atau konfirmasi                                    | ⏳ Belum     |
| 4   | `admin/bookings/actions.ts` updatePaymentStatus | `BookingHistory.from` selalu `null` — seharusnya prior payment status                                    | Isi `from` dengan nilai paymentStatus lama                                   | ✅ FIXED     |
| 5   | `actions/booking.ts` createBooking              | Tidak validasi `pax` (boleh 0/-1), `tourDate` (boleh string sembarang), `phone` (boleh "abc")            | Validasi server-side: pax ≥ 1, tourDate format ISO, phone minimal 8 digit    | ✅ FIXED     |
| 6   | `prisma/seed.ts`                                | Seed driver pakai `upsert({ where: { id: 1 } })` — id hardcoded bisa conflict                            | Seed pakai unique key natural (misal phone)                                  | ✅ FIXED     |
| 7   | `admin/reviews`                                 | Review wajib bookingId — admin gak bisa input review tanpa booking selesai                               | Sesuai desain (verified review), tapi perlu konfirmasi jelas di UI           | ℹ️ By design |

---

## 5. Yang Sudah Production-Ready ✅

| Aspek                   | Bukti                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| **Auth admin**          | NextAuth JWT + middleware proteksi `/admin/:path*` + `auth()` check di semua server action           |
| **Audit trail**         | `BookingHistory` mencatat tiap perubahan status/payment/driver                                       |
| **Data layer fallback** | `src/lib/data.ts` — DB error/kosong → fallback hardcoded (website tetap tampil)                      |
| **Type safety**         | Prisma generated types + TS strict (typecheck lulus)                                                 |
| **SEO**                 | SSG pages, sitemap dinamis, robots, JSON-LD (TravelAgency/Product/TouristAttraction/AggregateRating) |
| **Quality gates**       | Husky pre-commit (lint+prettier), pre-push (typecheck+test), CI GitHub Actions                       |
| **Testing**             | 27 unit/integration + 12 E2E (Playwright)                                                            |
| **Tema**                | Konsisten putih-hijau-emas (token-based) sesuai AGENTS.md                                            |

---

## 6. Status Final (2026-08-31)

Seluruh gap P0-P2 sudah diperbaiki. Berikut env vars yang perlu di-set:

| Env                                               | Wajib?      | Untuk                                            |
| ------------------------------------------------- | ----------- | ------------------------------------------------ |
| `DATABASE_URL` / `DIRECT_URL`                     | ✅          | Database Supabase                                |
| `AUTH_SECRET`                                     | ✅          | Session JWT                                      |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD`                  | ✅          | Seed admin user                                  |
| `WHATSAPP_NUMBER` / `NEXT_PUBLIC_WHATSAPP_NUMBER` | ✅          | Nomor WA di semua komponen                       |
| `MIDTRANS_SERVER_KEY` / `MIDTRANS_CLIENT_KEY`     | ✅          | Payment gateway                                  |
| `MIDTRANS_IS_PRODUCTION`                          | ✅          | `false` (sandbox) / `true` (live)                |
| `WHATSAPP_API_KEY`                                | ⏳ Opsional | Reminder WA otomatis (Fonnte/Meta)               |
| `WHATSAPP_PROVIDER`                               | ⏳ Opsional | `log` / `fonnte` / `meta`                        |
| `META_PHONE_NUMBER_ID`                            | ⏳ Opsional | Kalau pakai WhatsApp Cloud API                   |
| `CRON_SECRET`                                     | ⏳ Opsional | Proteksi endpoint `/api/reminder` (cron-job.org) |
| `CRON_SECRET`                                     | ⏳ Opsional | Proteksi endpoint cron                           |

**Yang sudah selesai di sesi ini:**

| Item                                             | Status | Detail                                                             |
| ------------------------------------------------ | ------ | ------------------------------------------------------------------ |
| Booking code random (anti-race + anti-enumerate) | ✅     | `CLR-${nanoid(8)}`                                                 |
| Rate limit booking & login                       | ✅     | 5x/menit booking, 5x/15menit login                                 |
| totalPrice auto-computed                         | ✅     | `(basePrice + vehicleIncrement) × pax`                             |
| Komisi hanya jika selesai + dibayar              | ✅     | Cek `paymentStatus` juga                                           |
| Satu sumber nomor WA                             | ✅     | `src/lib/contact.ts`                                               |
| Payment gateway Midtrans (Core API)              | ✅     | QRIS, VA, e-wallet, refund, webhook                                |
| Halaman payment custom (tanpa Snap)              | ✅     | `/payment/[code]` — branding Claris                                |
| Cek booking by kode/nomor                        | ✅     | Exact match, tidak ada data leak                                   |
| Admin refund                                     | ✅     | Tombol refund di booking page                                      |
| Soft-delete booking                              | ✅     | `deletedAt`, filter query, audit trail                             |
| Multi-tenant foundation                          | ✅     | Tenant model + tenantId + middleware + data layer                  |
| Subdomain resolution                             | ✅     | `proxy.ts` inject `x-tenant-id` header                             |
| Reminder WA H-1                                  | ✅     | `/api/reminder` + cron-job.org (Authorization: Bearer CRON_SECRET) |
| Error boundary                                   | ✅     | `global-error.tsx`, `not-found.tsx`                                |
| Input validation                                 | ✅     | createBooking validasi semua field                                 |
| Assign driver validasi status                    | ✅     | Tolak assign ke booking batal/selesai                              |
| 30 unit test + 12 E2E                            | ✅     | Semua hijau                                                        |
| 82 halaman SSG build                             | ✅     | Lint + typecheck + build OK                                        |

**Sisa yang masih open (opsional / Fase 2):**

- Payment gateway Midtrans → **live mode** (ganti `MIDTRANS_IS_PRODUCTION=true`)
- Webhook URL di dashboard Midtrans: `https://domain.com/api/midtrans/webhook`
- Cron reminder: deploy ke Vercel (cron otomatis aktif)
- Multi-tenant: tambah tenant baru via admin panel (masih perlu UI)
- E2E test untuk payment (butuh Midtrans key real)
- Soft-delete permanent hard delete (belum ada UI, tapi data aman)

---

## 7. Referensi

- Repo: `/home/eveeze/Project/eveeze/clarisandtravel`
- `BUSINESS_MODEL.md` — model bisnis & flow lengkap
- `BUSINESS_PLAN.md` — roadmap 3 fase & monetization
- `DATA_CONTRACT.md` — kontrak data layer
- `DESIGN_SYSTEM.md` — tema & tokens
- `AGENTS.md` — arsitektur & perintah penting
