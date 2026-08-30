# Claris & City Tour Jogja — Business Plan & Scaling Roadmap

> Status: v1.0 · Updated: 2026-08-30
> Owner: eveeze (developer) · Klien: keponakan (nomor WA admin)
> Konteks: Website dibuat GRATIS untuk keponakan. Tujuan plan ini = bikin scalable + developer bisa dapet revenue.

---

## 1. Kondisi Bisnis Saat Ini

### Flow Sekarang

```
User (turis)
  → browsing website → lihat paket tour → isi booking form
  → data masuk DB + WhatsApp otomatis ke nomor keponakan
  → keponakan chat manual, negosiasi, deal / gak deal
  → tour jalan, bayar cash / transfer
  → DEVELOPER DAPET: Rp 0
```

### Masalah / Keterbatasan

| Masalah                      | Dampak                           |
| ---------------------------- | -------------------------------- |
| Developer (eveeze) 0 revenue | Capek maintain, gak ada insentif |
| Booking cuma "lead WA"       | Bisa no-show, gak confirmed      |
| Gak ada payment gateway      | Gak ada komitmen dari customer   |
| Data booking gak termanage   | Gak bisa analisis / follow-up    |
| Keponakan single-point       | Kalau booking rame, kewalahan    |
| Gak multi-tenant             | Satu kode = satu bisnis doang    |

---

## 2. Target Bisnis

- **Segmen:** Tour & travel Jogja, target lokal + turis domestik/asing
- **Volume skrg:** (isi nanti dari `/admin/earnings`)
- **Gap yang mau ditutup:**
  1. Booking jadi confirmed (bukan cuma lead)
  2. Developer dapat revenue
  3. Platform scalable ke banyak operator

---

## 3. Roadmap Scaling — 3 Fase

### Fase 1 — Commission Tracking (mudah, langsung jalan)

**Tujuan:** Developer mulai dapat revenue tanpa API eksternal.

| Item      | Detail                                                  |
| --------- | ------------------------------------------------------- |
| Fitur     | Tambah field `commission` di tabel `Booking`            |
| Logic     | Tiap booking sukses → komisi otomatis tercatat          |
| Nominal   | Default Rp 15.000/booking (bisa diubah via env/config)  |
| Dashboard | `/admin/earnings` — total booking, total komisi, status |
| Report    | Laporan bulanan (invoice ke keponakan)                  |
| Cost      | Hampir 0 (backend logic doang)                          |
| Estimasi  | 1-2 hari                                                |

**Rumus:** `Komisi/bulan = jumlah booking × nominal`

---

### Fase 2 — Payment Gateway (confirmed booking)

**Tujuan:** Booking confirmed + developer ambil fee transaksi.

| Item           | Detail                                                         |
| -------------- | -------------------------------------------------------------- |
| Integrasi      | Midtrans / Xendit / QRIS (gratis daftar, fee 2-3%)             |
| Alur           | User booking → bayar DP 50% → verified otomatis → WA keponakan |
| Status booking | `baru` → `menunggu bayar` → `dibayar` → `selesai`              |
| Developer fee  | 1-2% dari total transaksi                                      |
| Keuntungan     | Booking confirmed, gak no-show, komitmen customer              |
| Cost           | Fee gateway 2-3% (ditanggung customer atau keponakan)          |
| Estimasi       | 3-5 hari                                                       |

---

### Fase 3 — Multi-Tenant SaaS (skala nasional)

**Tujuan:** 1 codebase dipake banyak operator → revenue bulanan.

| Item             | Detail                                                  |
| ---------------- | ------------------------------------------------------- |
| Model            | Multi-tenant: 1 codebase, data terpisah per operator    |
| Subdomain        | `jogja.xxx.com`, `malang.xxx.com`, `bali.xxx.com`       |
| Pricing          | Monthly SaaS Rp 200-500rb/operator ATAU per-booking fee |
| Fitur per tenant | Website sendiri, paket sendiri, WA admin sendiri        |
| Admin            | Beda admin per tenant                                   |
| Estimasi         | 1-2 minggu (refactor schema tenantId)                   |

**Contoh revenue:** 10 operator × Rp 300rb = **Rp 3jt/bulan**

---

## 4. Monetization — Ringkasan

| Strategi                         | Kapan             | Revenue                   |
| -------------------------------- | ----------------- | ------------------------- |
| **Komisi per booking** (Rp 15rb) | Fase 1 (sekarang) | 50 booking = Rp 750rb/bln |
| **Fee transaksi 1-2%**           | Fase 2            | Scaling dengan volume     |
| **SaaS bulanan per operator**    | Fase 3            | Rp 200-500rb × N operator |

---

## 5. Keputusan Terbuka (Perlu Diskusi)

- [ ] Nominal komisi per booking: Rp 10rb / 15rb / 25rb? (configurable)
- [ ] Pembayaran DP: 50%? Atau full di muka?
- [ ] Payment gateway pilih: Midtrans / Xendit / QRIS langsung?
- [ ] Fase 2 & 3 mulai kapan?
- [ ] Siapa yang tanggung fee gateway: customer / keponakan / split?
- [ ] Target jumlah operator untuk Fase 3?

---

## 6. Teknis Implementasi

### Schema tambahan (Fase 1)

```prisma
model Booking {
  // ...field existing
  commission     Int      @default(15000)  // Rp
  commissionPaid Boolean  @default(false)
  paidAt         DateTime?
}
```

### Dashboard Earnings (Fase 1)

- `/admin/earnings` — total booking per bulan, total komisi, status paid
- Filter per tanggal, export CSV

### Env config

```
# Komisi per booking (Rupiah)
BOOKING_COMMISSION=15000
```

---

## 8. Competitor Blueprint — Cara Kerja Platform Besar (yang kita tiru)

> Analisa langsung dari Traveloka (live fetch) + pola Klook/GetYourGuide/Viator.
> Prinsip: **tiru pola yang bikin customer PERCAYA & KONVERSI**, skip yang overkill buat bisnis 1 kota.

### 8.1 Traveloka — apa yang mereka lakukan

| Aspek                    | Yang mereka lakukan                                               | Bisa kita tiru?                                  |
| ------------------------ | ----------------------------------------------------------------- | ------------------------------------------------ |
| **Social proof raksasa** | "50M+ Downloads, 1M+ Reviews", rating 4.6/4.7, logo "Trusted by"  | ✅ (versi lokal: "1.000+ turis", rating paket)   |
| **Kategori produk**      | Flights / Hotels / Trains / Bus / Things to Do                    | ✅ (sudah: Paket, Destinasi, Blog, Galeri)       |
| **Filter & search**      | Filter kota, tanggal, harga                                       | ✅ (sudah ada filter tourist type + search)      |
| **"Bookings" retrieve**  | Cek booking tanpa login (masuk nomor)                             | ✅ **belum** — fitur keren buat track status     |
| **Deals/Promos**         | Banner promo, flash sale, kupon                                   | ✅ bisa — section promo dari DB                  |
| **Risk reversal**        | "Easy refund & reschedule", "Instant notifications"               | ✅ WAJIB — teks jaminan                          |
| **Payment partners**     | Logo BCA/Mandiri/dll di footer                                    | ✅ (pakai Midtrans/Xendit → logo mereka)         |
| **Cross-sell**           | Travel insurance, TPayLater (pay later)                           | ⏳ nanti (asuransi jadi add-on)                  |
| **Newsletter**           | Subscribe email buat promo                                        | ⏳ opsional                                      |
| **App-only deals**       | Dorong user install app                                           | ❌ skip (gak perlu app)                          |
| **SEO long-tail**        | Halaman per kota/destinasi ("sewa mobil jogja", "tour borobudur") | ✅ **PENTING** — halaman SEO per paket/destinasi |

### 8.2 Klook / GetYourGuide / Viator — pola yang bikin konversi

| Pola                                 | Klook                  | GetYourGuide          | Viator                     | Kita tiru?                                 |
| ------------------------------------ | ---------------------- | --------------------- | -------------------------- | ------------------------------------------ |
| **Rating + jumlah review**           | ✅ per activity        | ✅ bintang 1-5        | ✅ "2.500 reviews, 4.9"    | ✅ **WAJIB**                               |
| **Badge "Best Seller" / "Verified"** | ✅                     | ✅ "Must-do"          | ✅ "Badge of Excellence"   | ✅ **WAJIB** (ganti jadi "Paling Laris")   |
| **Free cancellation**                | ✅ "free cancel"       | ✅ "cancel up to 24h" | ✅ "free cancellation 24h" | ✅ **WAJIB**                               |
| **Instant confirmation**             | ✅                     | ✅                    | ✅                         | ✅ **WAJIB** (setelah payment)             |
| **Itinerary detail**                 | ✅                     | ✅                    | ✅ (steps)                 | ✅ sudah ada                               |
| **Inclusion/Exclusion**              | ✅ "includes/excludes" | ✅                    | ✅                         | ✅ **tambah** — "harga sudah termasuk apa" |
| **Meeting point / pickup**           | ✅                     | ✅                    | ✅                         | ✅ tambah di detail paket                  |
| **Voucher/QR**                       | ✅ mobile voucher      | ✅                    | ✅                         | ✅ setelah bayar                           |
| **Verified reviews**                 | ✅ (bukti beli)        | ✅                    | ✅                         | ✅ hanya review dari customer beneran      |
| **Pricing breakdown**                | ✅ "from Rp X"         | ✅                    | ✅                         | ✅ sudah ada base price + armada           |
| **Lowest price guarantee**           | —                      | —                     | ✅                         | ⏳ opsional                                |

### 8.3 Blueprint "Traveloka-nya Jogja" — fitur yang kita bangun

**Fase Trust (paling penting, biar customer percaya):**

- [ ] Rating + review per paket (hanya dari customer beneran, admin yang masukin dari testimoni)
- [ ] Badge "Paling Laris" / "Populer" (sudah ada isPopular, tinggal tampilkan rating)
- [ ] Teks jaminan: "Bisa reschedule 48 jam sebelum H-1, refund 100% kalau batal dari kami"
- [ ] Harga "ALL-IN" — keterangan "harga sudah termasuk" (parkir, biaya masuk, dll)
- [ ] Profil pemilik/guide (foto, nama, cerita) — halaman "Tentang" di-upgrade
- [ ] Review Google Maps embed
- [ ] SEO long-tail: halaman per destinasi yang fokus keyword

**Fase Operasional:**

- [ ] Status booking lengkap: `baru → dibayar → dikonfirmasi → driver_ditugaskan → berlangsung → selesai → batal`
- [ ] Tabel `Driver` + assign ke booking
- [ ] Cek booking by nomor (retrieve, tanpa login) — kayak "Bookings" Traveloka
- [ ] Reminder otomatis H-1 via WhatsApp

**Fase Payment (setelah trust dasar):**

- [ ] Midtrans/Xendit (DP 50%) → status otomatis "dibayar" via webhook
- [ ] Voucher/QR digital setelah bayar
- [ ] Logo payment partner di footer

### 8.4 Yang TIDAK kita tiru (overkill buat bisnis 1 kota)

- App mobile + app-only deals
- TPayLater / cicilan / pay later
- Flash sale real-time
- Multi-language (kecuali EN-ID sudah cukup)
- Affiliate / referal program (nanti kalau multi-tenant)

---

## 9. Roadmap Eksekusi (Update)

| Prioritas | Fitur                                               | Effort     | Impact           |
| --------- | --------------------------------------------------- | ---------- | ---------------- |
| P1        | Commission tracking + `/admin/earnings`             | 1 hari     | 💰               |
| P1        | **Review + rating per paket** (data asli)           | 2 hari     | ⭐⭐⭐⭐⭐ trust |
| P1        | **Jaminan reschedule/refund** (teks) + harga ALL-IN | 0.5 hari   | ⭐⭐⭐⭐         |
| P2        | Profil pemilik/guide + Google review embed          | 1 hari     | ⭐⭐⭐⭐         |
| P2        | **SEO long-tail per destinasi**                     | 2 hari     | 📈 trafik        |
| P2        | Status booking lengkap + tabel Driver               | 2-3 hari   | 📈 operasional   |
| P3        | Cek booking by nomor (retrieve)                     | 1 hari     | ⭐⭐⭐ UX        |
| P3        | **Midtrans payment** (DP 50% + voucher)             | 4-5 hari   | 💰💰             |
| P4        | Reminder WhatsApp H-1                               | 1 hari     | ⭐⭐⭐           |
| P4        | Multi-tenant SaaS                                   | 1-2 minggu | 💰💰💰           |

---

## 7. Log Diskusi (append di sini setiap keputusan)

- 2026-08-30: Plan awal dibuat. Belum ada keputusan nominal komisi.
- (isi nanti)

---

## Referensi

- Repo: `/home/eveeze/Project/eveeze/clarisandtravel`
- Vault: `~/opencode-second-brain/projects/clarisandtravel*.md`
