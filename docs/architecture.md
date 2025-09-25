# Architecture

## Project Structure

- `src/app/` — App Router pages, route groups, and layouts
  - `(public)/` — Public auth pages (frontend only)
  - `(kyc)/` — KYC route group
  - `layout.tsx` — Root layout with global Topbar
  - `page.tsx` — Home page
- `src/components/` — Reusable UI components
  - `layout/Topbar.tsx` — Global navigation
  - `kyc/KycSidebar.tsx` — Canonical KYC sidebar
- `src/lib/` — Client libs (e.g., Supabase client)
- `public/` — Static assets (favicon.svg, images)

## Layouts

- Root Layout (`src/app/layout.tsx`):
  - Renders the global Topbar only.
  - Sets metadata (title, description, icons).
- (kyc) Layout (`src/app/(kyc)/layout.tsx`):
  - No sidebar injected; the KYC page renders its own sidebar to avoid duplication.

## KYC Flow

- `/kyc` renders a client component (`KycClient`) with 3 steps.
- Product selection is done in the sidebar; selected items drive required documents and tier preview.
- URL preselection via `?product=<slug>`.
- Planned: Persist to Supabase (clients, documents, client_products) with storage for uploads.

## Supabase Integration (Planned)

- Auth: user sessions and RLS
- Tables: clients, documents, client_products
- Storage bucket: `kyc-documents` for uploads
- Server Actions/Edge Functions for validations and webhooks (future)
