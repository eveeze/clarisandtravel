# Claris & Travel — Design System

**Direction: "Javanese Tropical"** — Modern minimal tapi dengan identitas Jogja yang tegas: hijau hutan + pasir hangat + aksen "teak" (kayu jati). Bukan template AI.

> Sumber: `tailwind.config.ts` (tokens) + panduan di sini. Selalu ikuti file ini, jangan improvisasi warna/font sendiri.

---

## 1. Prinsip Desain

1. **Whitespace luas** — spacing generatif, jangan penuhin semua sudut.
2. **Foto adalah raja** — foto asli besar (Borobudur, Merapi, Malioboro), bukan gradient + blur.
3. **Satu aksen** — teak (`#C07A3E`) cuma untuk CTA & highlight. Sisanya kalem.
4. **Hindari pola AI** — jangan glassmorphism biru, jangan gradient ungu, jangan kartu glow.
5. **Konsisten** — 1 background, 1 warna CTA, 1 tipografi display.

## 2. Tokens Warna

| Token | Hex | Penggunaan |
|-------|-----|-----------|
| `ivory` | `#FAF6EE` | Background utama halaman |
| `forest-950` | `#0F211C` | Section gelap, footer, hero overlay |
| `forest-800` | `#1B3A2F` | Section gelap sekunder |
| `forest-600` | `#2F5D4A` | Hover, border aktif |
| `teak-500` | `#C07A3E` | **CTA utama, link, highlight** (1 aksen) |
| `clay-700` | `#9C4A2E` | Aksen dalam, harga |
| `sand-50` | `#F7F2E8` | Card surface |
| `sand-200` | `#E8DECB` | Border, divider |
| `ink-900` | `#201A15` | Teks utama (di bg terang) |
| `ink-500` | `#5C544A` | Teks sekunder |

**Kontras**: teks `ink-900` di atas `ivory` / `sand-50` = kontras tinggi (AAA). Teks di atas `forest-*` = `ivory`/`sand-50`.

## 3. Tipografi

| Role | Font | Penggunaan |
|------|------|-----------|
| **Display** | **Fraunces** (serif) | Judul, hero, angka besar — dipakai dengan *restraint* |
| **Body** | **Sora** (sans) | Paragraf, body text, tombol |
| **Utility** | Sora (uppercase, tracking-wide) | Label, eyebrow, caption |

Type scale (px): `eyebrow 12 / caption 14 / body 16 / lead 20 / h4 22 / h3 28 / h2 36 / h1 48 / display 64+`

## 4. Komponen Pattern

- **Button Primary**: bg `teak-500`, text `ivory`, hover `teak-600`, rounded `xl`, px-6 py-3. Teks: active verb ("Booking Sekarang", "Lihat Paket").
- **Button Ghost**: border `sand-200`, text `ink-900`, hover bg `sand-50`.
- **Card**: bg `sand-50`, border `sand-200`, rounded `2xl`, shadow halus `0 2px 8px rgba(32,26,21,0.06)`. Gambar di atas, konten di bawah.
- **Section**: `py-20 md:py-28`. Eyebrow (uppercase teak) → heading (Fraunces) → lead.
- **Navbar**: sticky, bg `ivory/90 backdrop-blur`, border-bottom `sand-200`.
- **Footer**: bg `forest-950`, text `sand-200`.

## 5. Signature Element — "Kawung Motif"

Detail khas: **pola batik kawung** (empat oval) dipakai sangat halus sebagai:
- texture background section tertentu (opacity 3-5%),
- motif sudut kartu popular,
- favicon.

Implementasi: inline SVG (stroke teak/forest, opacity rendah). Jangan dipakai di mana-mana — sekali pandang adalah cukup.

## 6. Motion

- `framer-motion`: reveal saat scroll (`whileInView`, once: true, y: 24 → 0, opacity 0 → 1, duration 0.5, ease `[0.22,1,0.36,1]`).
- Hover: scale 1.02 pada card, CTA shadow halus.
- **Jangan berlebihan** — animasi yang banyak = terkesan AI.

## 7. Anti-Pattern (JANGAN)

- ❌ `bg-white/10 backdrop-blur` glassmorphism
- ❌ Gradient biru tua (`from-primary-900 to-primary-800`)
- ❌ Palet `primary` (sky blue) / `accent` (orange) lama
- ❌ Font Poppins sebagai display
- ❌ "Most Popular" badge gradient
