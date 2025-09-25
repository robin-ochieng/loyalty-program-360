# Features

## Current

- Auth (frontend-only):
  - Sign In / Sign Up
  - Forgot Password / Reset Password (mocked)
- Home page with hero, benefits, tiers, and product highlights
- KYC flow (3 steps)
  - Step 1: Personal Information (with vehicle plate number when Motor selected)
  - Step 2: Product Selection (sidebar-driven; URL preselect via `?product=`)
  - Step 3: Document Upload (required docs adjust by selected products)
- Loyalty tiers: Bronze → Silver → Gold → Platinum (based on number of products selected)

## Planned

- Points system and rewards catalog
- Redemption flows and loyalty wallet
- Admin console (product management, KYC review, reporting)
- Full Supabase integration (auth, policies, RLS, server actions)
- Email notifications and activity logs
