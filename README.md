# Kenbright360 Loyalty/KYC

Production-ready Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui starter, wired for Supabase with SSR-safe clients, solid DX tooling, and a ready layout for KYC flows.

## Stack

- Next.js 14 App Router, TypeScript (strict), Tailwind v4
- shadcn/ui (generated core components)
- Supabase (`@supabase/supabase-js` + `@supabase/ssr`)
- ESLint + Prettier + Husky + lint-staged

## Quick start

1. Copy `.env.example` to `.env.local` and fill in values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - later: `UPLOADTHING_TOKEN`

2. Install dependencies and run:
   - pnpm i
   - pnpm dev

3. Visit:
   - `http://localhost:3000/api/health` → should return `{ status: "ok" }`
   - `http://localhost:3000/login`
   - `http://localhost:3000/kyc` (requires auth; placeholder gate)

## Scripts

- `dev`, `build`, `start`
- `lint` (Next lint), `format` (Prettier), `typecheck`
- `prepare` (husky)

## Conventions

- Import alias `@/` → `src/`
- Components under `src/components/*`, lib under `src/lib/*`

## Supabase

- Browser client: `src/lib/supabase/client.ts`
- Server client (SSR-safe): `src/lib/supabase/server.ts`
- Types: `src/lib/utils/types.ts` (placeholder)

To generate DB types later:

```
supabase gen types typescript --project-id <id> > src/lib/database.types.ts
```

## Storage & RLS

- Create a private Storage bucket `kyc` (policy TODO)
- Add Row Level Security (RLS) policies for tables (TODO)

## UploadThing

- Packages are installed but not wired. Add `UPLOADTHING_TOKEN` to `.env.local` when integrating.

## CI

- GitHub Actions workflow runs typecheck, lint, and build on PRs and pushes to main.

## Next steps

- Implement Supabase auth (magic link) on `/login`
- Introduce protected routes and session handling
- Flesh out KYC forms (zod schemas, react-hook-form) and file uploads
- Add DB migrations and generate types
- Add E2E tests
