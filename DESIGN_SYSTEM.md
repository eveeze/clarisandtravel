# Claris & Travel — Design System

**Direction: "Javanese Tropical"** — Modern minimal tapi dengan identitas Jogja yang tegas: putih hangat + emas + aksen kayu jati. Bukan template AI.

> Sumber: `tailwind.config.ts` (tokens) + panduan di sini. Selalu ikuti file ini, jangan improvisasi warna/font sendiri.

---

## 1. Prinsip Desain

1. **Putih + Emas** — background putih hangat, aksen emas di CTA & highlight. BUKAN hijau tua.
2. **Whitespace luas** — spacing generatif, jangan penuhin semua sudut.
3. **Foto adalah raja** — foto asli besar (Borobudur, Merapi, Malioboro), bukan gradient + blur.
4. **Satu aksen** — emas (`#C8962C`) cuma untuk CTA & highlight. Sisanya kalem.
5. **Hindari pola AI** — jangan glassmorphism biru, jangan gradient ungu, jangan kartu glow.
6. **Konsisten** — 1 background (`paper`), 1 warna CTA (`gold`), 1 tipografi display.

## 2. Tokens Warna

| Token          | Hex       | Penggunaan                                              |
| -------------- | --------- | ------------------------------------------------------- |
| `paper`        | `#FAF8F4` | Background utama halaman (warm putih)                   |
| `volcanic-900` | `#262320` | Section gelap, footer, teks kontras tinggi di atas gold |
| `volcanic-600` | `#403B35` | Hover, border aktif (charcoal hangat)                   |
| `gold-500`     | `#C8962C` | **CTA utama, link, highlight** (1 aksen)                |
| `sand-200`     | `#E6E0D4` | Border, divider                                         |
| `ink-900`      | `#201C18` | Teks utama (di bg terang)                               |
| `ink-500`      | `#746C62` | Teks sekunder                                           |

**Kontras**: teks `ink-900` di atas `paper` / `sand-50` = kontras tinggi (AAA). Teks di atas `volcanic-*` = `sand-50`/`paper-50`.

> **Catatan:** Token `volcanic` sekarang = warm charcoal netral (BUKAN hijau). Warna hijau TIDAK dipakai di website ini.

## 3. Tipografi

| Role        | Font                                     | Penggunaan                                            |
| ----------- | ---------------------------------------- | ----------------------------------------------------- |
| **Display** | **Instrument Serif** (serif)             | Judul, hero, angka besar — dipakai dengan _restraint_ |
| **Body**    | **Space Grotesk** (sans)                 | Paragraf, body text, tombol                           |
| **Utility** | Space Grotesk (uppercase, tracking-wide) | Label, eyebrow, caption                               |

Type scale: `eyebrow 12 / caption 14 / body 16 / lead 20 / h4 22 / h3 28 / h2 36 / h1 48 / display 64+`

## 4. Komponen Pattern

- **Button Primary**: bg `gold-500`, text `volcanic-900`, hover `gold-400`, rounded `xl`, px-6 py-3. Teks: active verb ("Booking Sekarang", "Lihat Paket").
- **Button Ghost**: border `sand-200`, text `ink-900`, hover bg `sand-50`.
- **Card**: bg `paper-50`/`white`, border `sand-200`, rounded `2xl`, shadow halus `0 2px 8px rgba(32,26,21,0.06)`. Gambar di atas, konten di bawah.
- **Section**: `py-20 md:py-28`. Eyebrow (uppercase gold) → heading (Instrument Serif) → lead.
- **Navbar**: sticky, bg `paper/90 backdrop-blur`, border-bottom `sand-200`.
- **Footer**: bg `volcanic-900`, text `sand-50`.

## 5. Signature Element — "Kawung Motif"

Detail khas: **pola batik kawung** (empat oval) dipakai sangat halus sebagai:

- texture background section tertentu (opacity 3-5%),
- motif sudut kartu popular,
- favicon.

Implementasi: inline SVG (stroke gold, opacity rendah). Jangan dipakai di mana-mana — sekali pandang adalah cukup.

## 6. Motion

- `framer-motion`: reveal saat scroll (`whileInView`, once: true, y: 24 → 0, opacity 0 → 1, duration 0.5, ease `[0.22,1,0.36,1]`).
- Hover: scale 1.02 pada card, gold shadow halus.
- **Jangan berlebihan** — animasi yang banyak = terkesan AI.

## 7. Anti-Pattern (JANGAN)

- ❌ Warna hijau di mana pun (volcanic bukan hijau lagi)
- ❌ `bg-white/10 backdrop-blur` glassmorphism
- ❌ Gradient biru tua (`from-primary-900 to-primary-800`)
- ❌ Palet `primary` (sky blue) / `accent` (orange) lama
- ❌ Font Poppins sebagai display
- ❌ "Most Popular" badge gradient
