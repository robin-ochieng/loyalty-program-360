# Database & RLS Overview

This document summarizes the initial relational model and security posture for Kenbright360.

## Entities

| Table                    | Purpose                                                     | Key Fields                              |
| ------------------------ | ----------------------------------------------------------- | --------------------------------------- |
| profiles                 | 1:1 with `auth.users`; extended user attributes             | full_name, phone_number, date_of_birth  |
| products                 | Static catalog of insurable products                        | code (unique), category, requires flags |
| clients                  | A KYC submission / individual client record owned by a user | user_id, kyc_completed                  |
| client_products          | Junction of client -> chosen products                       | status                                  |
| documents                | Uploaded KYC artifacts                                      | document_type, file_url                 |
| v_client_products (view) | Read-optimized join for client product listing              | product_code, status                    |

## Row Level Security (RLS)

RLS is enabled on: profiles, clients, client_products, documents.
Policies restrict visibility and mutation to the owning `auth.uid()` (either directly via user_id or through the parent client).

## Storage

Bucket: `kyc-documents` (private). Current suggested temporary policies allow all authenticated users read/write (to be tightened to path-based restrictions per user in future).

## Signup Flow

1. User signs up via Supabase email/password (email confirmation disabled for now).
2. On success, frontend inserts a `profiles` row (best-effort, non-blocking if it fails).
3. All subsequent KYC submissions attach `user_id` to `clients`.
4. Documents and selected products reference the new client row.

## Future Hardening

- Add path-based storage policies restricting `storage.objects` to only objects where the path prefix starts with the user's UUID.
- Add constraints for phone number uniqueness if business rules require.
- Consider adding a `status` or `review_state` to `clients` (Draft, Submitted, Approved, Rejected).
- Add audit triggers to log changes for compliance.
- Introduce soft-delete (`deleted_at`) columns if recoverability is needed.

## Seed Strategy

Products are idempotently upserted by unique code in `supabase/schema.sql`. Running the file twice is safe.

## Running the Schema

Paste `supabase/schema.sql` into the Supabase SQL Editor and run. Confirm tables and policies in the dashboard.

## Next Migrations

- Add indexes for frequent filter fields once usage patterns emerge.
- Split large tables if document metadata grows heavily (e.g., separate document_versions table).

---

Generated on initial RLS setup iteration.
