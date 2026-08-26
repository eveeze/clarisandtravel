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
- `npx prisma migrate dev --name <name>` — update schema
- `npx prisma db seed` — seed data
- `npx prisma studio` — DB browser

## Data Layer
Semua akses data lewat `src/lib/data.ts` — baca dari DB, **fallback ke hardcoded** kalau DB kosong/error. Jangan akses Prisma langsung dari komponen client.

## Prinsip
- Server Component sebisa mungkin (data fetching langsung di server)
- `"use client"` hanya untuk interaktivitas (useState, useEffect, onClick, framer-motion)
- Form mutations via Server Actions (`"use server"`)
- Auth di-middleware (`src/middleware.ts`), bukan di layout
- Image: `next/image`, priority di hero, lazy loading default