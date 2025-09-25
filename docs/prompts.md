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
