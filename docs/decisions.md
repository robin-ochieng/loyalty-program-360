# Architecture Decision Records (ADRs)

## ADR-0001 — Storage for KYC Documents

- Date: 2025-09-25
- Context: We need a secure, cost-effective store for uploaded KYC documents.
- Decision: Use Supabase Storage (bucket: `kyc-documents`).
- Consequences: Simplified integration with Supabase DB and auth. Evaluate lifecycle/retention and access policies.

## ADR-0002 — KYC Sidebar Rendering

- Date: 2025-09-25
- Context: Duplicate nav/sidebars appeared when layout and page both rendered sidebars.
- Decision: Render the KYC sidebar only at the page level; (kyc) layout must not render a sidebar.
- Consequences: Avoids duplication and keeps a single source of truth for product selection.
