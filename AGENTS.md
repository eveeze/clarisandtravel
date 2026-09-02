# Claris & City Tour Jogja — AGENTS.md

## Project Overview

Website landing page + booking system untuk Tour & Travel Jogja. Next.js 15 full-stack (App Router, Server Components, Server Actions), Prisma ORM, Supabase Postgres, NextAuth v5 (admin auth).

## Arsitektur

```
Next.js 15 (Vercel)
├── Server Components ── src/lib/data.ts (data layer, DB + fallback)
├── Server Actions ──── src/app/actions/ (mutations)
├── Client Components ── src/components/ (interactive UI)
├── Admin Panel ──────── src/app/admin/ (NextAuth protected)
├── Prisma ORM ───────── prisma/schema.prisma (7+ model)
└── Supabase Postgres ── host DB (free 500MB)
```

## Command Penting

- `npm run dev` — development server
- `npm run build` — build + type check
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run typecheck` — TypeScript check (`tsc --noEmit`)
- `npm run format` / `npm run format:check` — Prettier
- `npm run test` — unit & integration tests (Vitest)
- `npm run test:e2e` — E2E tests (Playwright)
- `npx playwright install` — install Playwright browsers (sekali)
- `npx prisma migrate dev --name <name>` — update schema
- `npx prisma db seed` — seed data
- `npx prisma studio` — DB browser

## Quality Gates (Husky)

- **pre-commit**: `lint-staged` (eslint + prettier) untuk file staged
- **pre-push**: `npm run typecheck && npm run test`
- **CI (GitHub Actions)**: lint → typecheck → test → build → E2E di `.github/workflows/ci.yml`

## Testing

- Unit/Integration: `vitest` (`src/**/*.test.ts`) — mock Prisma via `vi.mock("@/lib/prisma")`, tanpa DB asli
- E2E: `@playwright/test` di `e2e/` — butuh dev server (auto-start via webServer config)
- Coverage: `npm run test:coverage`

## Data Layer

Semua akses data lewat `src/lib/data.ts` — baca dari DB, **fallback ke hardcoded** kalau DB kosong/error. Jangan akses Prisma langsung dari komponen client.

## 📋 Dokumen Bisnis (baca sebelum ubah fitur bisnis)

- `BUSINESS_MODEL.md` — business model canvas, alur lengkap (customer/internal/payment), data model, revenue, KPI, risiko.
- `BUSINESS_PLAN.md` — scaling roadmap 3 fase, monetization, analisa platform besar (Traveloka/Klook/GetYourGuide/Viator), keputusan terbuka.

> Fitur baru yang berkaitan booking/payment/review/driver → baca dulu kedua dokumen ini biar selaras dengan model bisnis.

## Prinsip

- Server Component sebisa mungkin (data fetching langsung di server)
- `"use client"` hanya untuk interaktivitas (useState, useEffect, onClick, framer-motion)
- Form mutations via Server Actions (`"use server"`)
- Auth di-middleware (`src/middleware.ts`), bukan di layout
- Image: `next/image`, priority di hero, lazy loading default

## 🎨 TEMA (WAJIB IKUTI — JANGAN GANTI TANPA PERSETUJUAN)

> **Tema website: PUTIH + EMAS.** Bukan hitam, bukan hijau.
> Klien (eveeze) suka tema ini. AI agent yang mengerjakan repo ini WAJIB
> menjaga konsistensi tema di semua elemen baru/touched. DILARANG:
>
> - ❌ Pakai warna hitam/netral gelap (`bg-ink-900`, `bg-black`) untuk tombol/hover/fill
> - ❌ Pakai warna hijau di mana pun (token `volcanic` SUDAH diganti jadi charcoal hangat netral)

Palet resmi (definisi di `tailwind.config.ts`):

| Token                  | Hex                                             | Penggunaan                                |
| ---------------------- | ----------------------------------------------- | ----------------------------------------- |
| `paper` / `sand-*`     | putih/warm putih                                | background utama, surface                 |
| `volcanic-500/600/700` | **charcoal hangat** (#4F4942, #403B35, #35312C) | teks gelap, hover fill, section gelap     |
| `gold-400/500`         | **emas**                                        | CTA, aksen, highlight                     |
| `ink-*`                | abu gelap netral                                | hanya untuk teks kecil/body, BUKAN tombol |

Aturan elemen interaktif (tombol, hover, fill, active):

- Hover/fill tombol → **`gold-400`** (emas) ATAU **`volcanic-600`** (charcoal hangat), jangan terlalu gelap.
- Tombol utama → `bg-gold-500 text-volcanic-900` (teks charcoal di emas).
- Di section gelap (`bg-volcanic-900`) → pakai variant `onDark` (fill `gold-400`, bukan charcoal) biar tombol gak blend dengan background.
- Ganti tema = edit `tailwind.config.ts` (satu sumber), jangan hardcode hex di komponen.

Referensi lengkap: `DESIGN_SYSTEM.md`
