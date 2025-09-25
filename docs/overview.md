# Kenbright360 - Overview

Kenbright360 is a Loyalty & KYC (Know Your Customer) platform that centralizes onboarding, document verification, and loyalty engagement across a suite of insurance and financial products.

## Purpose

- Provide a smooth customer onboarding KYC workflow.
- Aggregate multiple products (Motor, Medical, Home, Pension, etc.) under one profile.
- Power loyalty tiers (Bronze → Platinum) based on product adoption and engagement.

## Tech Stack

- Framework: Next.js (App Router), TypeScript (strict)
- UI: Tailwind CSS, shadcn/ui, lucide-react
- Auth (frontend flows): Sign In/Up, Forgot/Reset password (mocked for now)
- Data Layer: Supabase (scaffolded) — Storage used for KYC document uploads; DB integration planned
- Tooling: ESLint, Prettier, Husky + lint-staged, GitHub Actions CI

## Architecture Summary

- App Router structure with a single global Topbar (`src/app/layout.tsx`).
- KYC route group `src/app/(kyc)` with page-level sidebar (no sidebar in layout to avoid duplication).
- Public routes under `src/app/(public)` for auth flows.
- KYC client component handles multi-step flow, product-driven requirements, and document uploads.

### Routing Diagram

```mermaid
flowchart TB
  A[Home /] --> B[Auth /auth]
  B --> B1[Forgot Password /forgot-password]
  B --> B2[Reset Password /reset-password]
  A --> C[KYC /kyc]

  subgraph Layouts
    L1[Root Layout: Global Topbar only]
    L2[(kyc) Route Group Layout: no sidebar]
  end

  C --- L2
  A & B & B1 & B2 --- L1
```

---

Last updated: 2025-09-25
