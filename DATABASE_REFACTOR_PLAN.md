# Insight AI Database Refactor Plan

## Summary

The MVP database should preserve the current Prisma foundation while tightening it around real agency, brand, prompt, response, analytics, recommendation, and report workflows. The schema should remain compatible with future automated tracking through workers and queues.

## Keep

- `User`
- `Organization`
- `OrganizationMember`
- `Brand`
- `Competitor`
- `Prompt`
- `AiEngine`
- `AiResponse`
- `Mention`
- `Citation`
- `AnalyticsSnapshot`
- `Recommendation`
- `Job` as deferred infrastructure compatibility
- `Screenshot` as deferred tracking artifact compatibility

## Required Changes

- Expand `Role` to exactly:
  - `OWNER`
  - `ADMIN`
  - `MANAGER`
  - `ANALYST`
  - `VIEWER`
- Add MVP brand field:
  - `Brand.country` as required data with a practical default for existing rows.
- Make `AiEngine.name` unique so engines can be seeded and looked up safely.
- Add report metadata:
  - `Report` model scoped to organization and optionally brand.
  - Stores title, type, date range, status, generated file name/path, and timestamps.
- Add agency compatibility fields:
  - `Organization.logoUrl`
  - `Organization.brandingColor`
- Preserve `billingPlan` and `stripeCustomerId` for subscription architecture.

## Data Integrity Rules

- All user-facing data must be organization-scoped.
- Brand CRUD must verify the active user belongs to the brand's organization.
- Competitor and prompt operations must verify ownership through the parent brand.
- Analytics must be calculated from stored responses, mentions, citations, and snapshots only.
- Empty analytics must return zero/empty results, not demo values.

## Migration Strategy

- Add new enum values before relying on them in application code.
- Add `Brand.country` with a default value to avoid breaking existing rows.
- Add unique index for `AiEngine.name`.
- Add `Report` table with cascading organization and brand relationships.
- Keep worker-compatible tables rather than dropping infrastructure.

## Seed Strategy

- Seed a realistic agency owner and organization.
- Seed AI engines using unique names.
- Seed at least one brand with country, industry, competitors, prompts, stored AI responses, mentions, citations, recommendations, and one report metadata row.
- Avoid random analytics values. Seed deterministic records so metrics can be validated.
