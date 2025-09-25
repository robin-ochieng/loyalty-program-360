# Prompts Log

A living log of prompts and instructions that drive changes in this project. Use it to:

- Capture the exact wording of requests (verbatim)
- Summarize intent and impacted areas
- Track actions taken, artifacts, and follow-ups

Keep entries short and scannable. Newest first.

---

## How to update

1. Add a new entry at the top using the template below.
2. Paste the prompt verbatim (quote it). If it came from chat, keep minimal context only.
3. Fill intent, scope, actions, and status. Link commits/PRs when available.
4. Add 3–5 tags (e.g., kyc, auth, ui, docs, infra).

### Entry template

## [YYYY-MM-DD] Title of the change or request

- Source: <channel/person>
- Prompt (verbatim): "<quoted prompt>"
- Intent: <1–2 sentences>
- Scope: <files, routes, components, services>
- Actions: <bullets of what was done or planned>
- Artifacts: <commit/PR/branch/links>
- Status: Planned | In-Progress | Done | Deferred
- Follow-ups: <next steps if any>
- Tags: #tag1 #tag2 #tag3

---

## Entries

## [2025-09-25] Run KYC frontend-only (disable Supabase)

- Source: Chat (reconstructed from session notes)
- Prompt (verbatim or reconstructed): "Run KYC frontend-only (disconnect Supabase)… add feature flag, shims, mock uploads & inserts."
- Intent: Allow the KYC flow to run without any environment variables or network calls by feature-flagging Supabase usage and providing safe mocks.
- Scope: `src/lib/flags.ts`, `src/lib/supabase/*`, `src/app/(dashboard)/kyc/KycClient.tsx`
- Actions:
  - Added `USE_SUPABASE` feature flag (default false).
  - Implemented client/server Supabase shims returning no-ops when disabled.
  - Short-circuited uploads/inserts in KYC with local mocks and success UI.
- Artifacts: commit "chore: run KYC frontend-only — stub Supabase clients, guard env usage, mock uploads & inserts"; branch `V-0.1`.
- Status: Done
- Follow-ups: Consider env-driven toggle (e.g., `NEXT_PUBLIC_USE_SUPABASE`).
- Tags: #supabase #feature-flag #kyc #frontend

## [2025-09-25] Fix Home hero spacing (full-width under navbar)

- Source: Chat (reconstructed from session notes)
- Prompt (verbatim or reconstructed): "Fix Home hero spacing… full-width under navbar… logo click goes Home."
- Intent: Remove unwanted white gaps and ensure hero spans edge-to-edge under the Topbar; make brand logo link to `/`.
- Scope: `src/app/page.tsx`, `src/components/layout/Topbar.tsx`
- Actions:
  - Adjusted negative margins and container paddings on the hero.
  - Wrapped logo with a Home link.
- Artifacts: commit "Fix Home hero spacing: remove white gaps above and on sides, make hero full-width under navbar."; branch `V-0.1`.
- Status: Done
- Follow-ups: None
- Tags: #ui #homepage #layout

## [2025-09-25] Create documentation folder with structure

- Source: Chat (reconstructed from session notes)
- Prompt (verbatim or reconstructed): "Create a docs/ folder… with overview, features, feature tracking, changelog, stakeholder report, and supporting documentation."
- Intent: Add a structured documentation set to communicate architecture, changes, and roadmap.
- Scope: `docs/*` (overview, features, feature-tracking, changelog, architecture, contributing, roadmap, decisions, stakeholder-report)
- Actions:
  - Authored nine initial docs with clear outlines and content.
  - Included Mermaid diagram in overview.
- Artifacts: commit "Add docs/ folder with overview, features, feature tracking, changelog, stakeholder report, and supporting documentation."; branch `V-0.1`.
- Status: Done
- Follow-ups: Keep changelog and feature-tracking updated per release.
- Tags: #docs #process #architecture

## [2025-09-25] Update favicon and app title

- Source: Chat (reconstructed from session notes)
- Prompt (verbatim or reconstructed): "Update favicon to rounded SVG and set app title to Kenbright360."
- Intent: Apply branding via favicon and metadata updates.
- Scope: `public/favicon.svg`, `src/app/layout.tsx`
- Actions:
  - Added branded rounded SVG favicon.
  - Updated metadata: title, description, and icons path.
- Artifacts: commit "Update favicon to rounded SVG and set app title to Kenbright360."; branch `V-0.1`.
- Status: Done
- Follow-ups: Provide light/dark variants if needed.
- Tags: #branding #metadata #assets

## [2025-09-25] KYC sidebar only on KYC routes

- Source: Chat (reconstructed from session notes)
- Prompt (verbatim or reconstructed): "Update layouts so the sidebar is ONLY visible on the KYC page… Fix it so the KYC route has ONE global top nav, ONE KYC sidebar…"
- Intent: Eliminate duplicate nav/sidebars and scope the KYC sidebar strictly to KYC pages.
- Scope: `src/app/(kyc)/layout.tsx`, `src/components/kyc/KycSidebar.tsx`, `src/app/(dashboard)/kyc/KycClient.tsx`, `src/app/(kyc)/kyc/page.tsx`
- Actions:
  - Removed layout-injected sidebar in (kyc) group.
  - Created canonical `KycSidebar` and integrated it at the page level.
  - Verified single global Topbar across app.
- Artifacts: commit "Restore canonical KYC sidebar from TXT; ensure single global navbar + single KYC sidebar on /kyc; remove layout-injected sidebar; integrate KycSidebar; keep Home clean"; branch `V-0.1`.
- Status: Done
- Follow-ups: Centralize product definitions shared between sidebar and client.
- Tags: #kyc #ui #routing

## [2025-09-25] Add public auth flows (frontend-only)

- Source: Chat (reconstructed from session notes)
- Prompt (verbatim or reconstructed): "Add the Auth (Sign In/Sign Up) and Forgot/Reset Password pages FRONTEND-ONLY… update navbar with links… ensure clean build."
- Intent: Provide basic public authentication pages without backend dependency and keep builds clean.
- Scope: `src/app/(public)/*`, `src/components/layout/Topbar.tsx`
- Actions:
  - Added Sign In, Sign Up, Forgot Password, Reset Password pages (client-side only).
  - Linked from Topbar; fixed Suspense/lint issues.
- Artifacts: included in subsequent build commits; branch `V-0.1`.
- Status: Done
- Follow-ups: Wire real auth later behind a feature flag.
- Tags: #auth #frontend #routing

## [2025-09-25] Scaffold production-ready Next.js app

- Source: Chat (reconstructed from session notes)
- Prompt (verbatim or reconstructed): "Set up a production-ready Next.js + TypeScript project for ‘Kenbright360 Loyalty/KYC’… Do, don’t just suggest."
- Intent: Initialize a robust App Router project with strict TypeScript, Tailwind, shadcn/ui, linting, and CI.
- Scope: Project root, `src/app`, Tailwind config, shadcn/ui setup, ESLint/Prettier, Husky + lint-staged, GitHub Actions CI.
- Actions:
  - Scaffolded Next.js App Router project (TS strict, React 19).
  - Configured Tailwind v4 and shadcn/ui.
  - Added ESLint/Prettier, Husky, lint-staged, and CI workflow.
- Artifacts: initial setup commits; branch `V-0.1`.
- Status: Done
- Follow-ups: Keep ESLint migration in mind as `next lint` deprecates.
- Tags: #infra #nextjs #setup #ci

## [2025-09-25] Initialize prompts log

- Source: VS Code request
- Prompt (verbatim): "on the docs folder create a file that contains and will be updating the prompts on this project"
- Intent: Create a dedicated, append-only log to track project prompts with a clear template and usage guide.
- Scope: docs/prompts.md
- Actions:
  - Added prompts log with usage instructions and a reusable template.
  - Seeded with this initial entry.
- Artifacts: Branch V-0.1; commit: (added in same change)
- Status: Done
- Follow-ups:
  - Optional: Backfill notable past prompts from conversation history for continuity.
  - Optionally link entries to changelog items in `docs/changelog.md`.
- Tags: #docs #process #tracking
