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

## 7. Log Diskusi (append di sini setiap keputusan)

- 2026-08-30: Plan awal dibuat. Belum ada keputusan nominal komisi.
- (isi nanti)

---

## Referensi

- Repo: `/home/eveeze/Project/eveeze/clarisandtravel`
- Vault: `~/opencode-second-brain/projects/clarisandtravel*.md`
