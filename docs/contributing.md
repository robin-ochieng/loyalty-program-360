# Contributing

## Branching

- Use short, descriptive branches: `feat/`, `fix/`, `chore/`, `docs/`.

## Commits

- Prefer clear, imperative messages (ex: "Add KYC sidebar component").
- Reference the area (kyc, auth, docs) when helpful.

## Linting & Checks

- Run checks locally before pushing:

```bash
# With pnpm
pnpm dev
pnpm lint
pnpm typecheck

# Or with npm
npm run dev
npm run lint
npm run typecheck
```

Husky + lint-staged will also run typecheck and lint on pre-commit.

## PR Process

- Keep PRs focused and small when possible.
- Include screenshots (for UI changes) and a short summary.
- Ensure build, lint, and typecheck pass in CI.
