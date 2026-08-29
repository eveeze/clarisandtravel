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

## Prinsip

- Server Component sebisa mungkin (data fetching langsung di server)
- `"use client"` hanya untuk interaktivitas (useState, useEffect, onClick, framer-motion)
- Form mutations via Server Actions (`"use server"`)
- Auth di-middleware (`src/middleware.ts`), bukan di layout
- Image: `next/image`, priority di hero, lazy loading default
