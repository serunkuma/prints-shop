# Agent & Developer Working Rules

Status: Current

## Who This Is For

This file is for AI coding agents (Claude Code, Cursor, Copilot, Windsurf) and human developers working on the prints-shop repository.

## Immutable Principles

These principles cannot be overridden by task-level instructions:

1. **Shopify is the source of truth for commerce data.** Never store product prices, inventory, or variant data in Sanity. Prices live in Shopify. Always.

2. **Sanity is the source of truth for editorial content.** Homepage sections, artist bios, series descriptions, and all narrative content come from Sanity. Never hardcode editorial content in React components or route files.

3. **Secrets never in the repository.** `.env` is in `.gitignore`. No API keys, tokens, or passwords in source code or committed files.

4. **Parallel data fetching.** When a route needs both Shopify and Sanity data, always use `Promise.all()`. Never `await` them sequentially — it doubles response time for no reason.

5. **No `console.log` in committed code.** Use `console.error` only for actual error handling. Remove all debug logging before committing.

6. **All images need `alt` text.** No exceptions. `alt=""` is only acceptable for purely decorative images with no informational content.

7. **AGENTS.md is always read first.** Before making any change, read `AGENTS.md` in full. It is the source of truth for architecture decisions.

## Working With Shopify

- Use the Storefront API for all read operations (browsing, product display, cart)
- The Storefront API is public (uses a public token) — do not put Admin API credentials in Hydrogen
- Cart mutations (add, update quantity, remove) go through Remix actions in `app/routes/cart.tsx`
- Checkout: always redirect to Shopify hosted checkout. Do not attempt to build a custom checkout — this is a Shopify Plus feature only.
- Product handles in the URL must match Shopify's handle exactly (lowercase, hyphenated)

## Working With Sanity

- All GROQ queries live in `app/lib/queries.ts` (or `app/lib/queries/` as a directory if they grow large)
- Never write inline GROQ strings in route loader functions — import named query constants
- Use `context.sanity.fetch()` in route loaders (the `hydrogen-sanity` package provides this)
- When a Sanity document is optional (e.g. `productSupplement` may not exist for every product), handle the `null` case gracefully
- The Sanity Studio for this project is in `studio/` — schema changes go in `studio/schemaTypes/`
- Deploy Studio separately with `cd studio && npx sanity deploy` after schema changes

## Working With Tailwind

- All design tokens are defined in `tailwind.config.ts` — use token names, not raw hex values in component files
- No inline styles unless there is a dynamic value that cannot be handled by Tailwind classes
- Mobile-first: write the base style for mobile, then override with `md:` and `lg:` prefixes
- Do not use arbitrary values like `bg-[#C8A876]` — if a colour is needed, add it to the Tailwind config first

## File Editing Rules

- Never edit files in `sources/` — this directory is frozen historical input
- Route files (`app/routes/`) follow React Router v7 conventions — read the framework docs before adding new routes
- Never add `package.json` dependencies without checking if the functionality can be achieved with existing dependencies first
- The `studio/` directory is a separate Sanity project — changes there require a Studio redeploy

## Testing Before Committing

Before committing any change:

```bash
# Type check
npm run typecheck

# Build check (catches route issues and import errors)
npm run build

# Preview the build
npm run preview
```

There is currently no automated test suite (Phase 1 constraint). Add unit tests for utility functions as the codebase grows.

## Git Conventions

- Branch names: `feature/short-description`, `fix/short-description`, `chore/short-description`
- Commit messages: imperative mood, present tense — "Add cart drawer" not "Added cart drawer"
- Every push to a non-main branch creates an Oxygen preview deployment — use the preview URL for QA before merging
- Do not push directly to `main` — use pull requests so the preview deployment can be verified first

## Adding New Sanity Schema Types

1. Create the schema file in `studio/schemaTypes/`
2. Register it in `studio/schemaTypes/index.ts`
3. Update AGENTS.md (Section 6) to document the new type
4. Update `sources/04_sanity_schemas.md` with the new schema
5. Deploy the Studio: `cd studio && npx sanity deploy`
6. Write the GROQ query in `app/lib/queries.ts`
7. Use it in the relevant route loader

## Adding New Routes

1. Create the file in `app/routes/` following React Router v7 filename conventions
2. Export a `loader` function for server-side data fetching
3. Export a `meta` function for SEO tags
4. Export an `ErrorBoundary` component for error states
5. Update the route map in `sources/05_hydrogen_routes.md`
6. Update `docs/system/` route documentation

## When Something Breaks in Production

1. Check Oxygen deployment logs: Shopify admin → Hydrogen → prints-shop → Production → View logs
2. Check if the issue is a Shopify API error (product unavailable, API rate limit)
3. Check if the issue is a Sanity query error (document not found, schema mismatch)
4. If the deploy itself is broken: roll back immediately (see `sources/07_deployment.md` for rollback procedure)
5. Fix in a branch, verify on preview URL, then merge to main

*Last updated: 2026-06-10*
