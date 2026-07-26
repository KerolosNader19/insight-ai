# Database Audit Report

Date: 2026-06-02

## Scope

Reviewed `packages/database/prisma/schema.prisma`, migrations, relations, indexes, and seed data.

## Schema Status

Core MVP models:
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
- `Report`

Deferred infrastructure models retained:
- `Screenshot`
- `Job`

## Fixes Applied

Added indexes for:
- organization membership lookup by user and role
- brands by organization/name
- competitors by brand
- prompts by organization/brand/active state
- responses by prompt, engine, captured date, and status
- mentions by response/entity
- citations by response/domain
- snapshots by brand/date and engine/date
- recommendations by snapshot/priority
- reports by organization/date and brand/date
- jobs by organization/status and type/status

Migration added:
- `packages/database/prisma/migrations/20260602002000_mvp_hardening_indexes/migration.sql`

Seed hardening:
- Added deterministic investor demo seed data.
- Added `npm run db:seed`.
- Added `tsx` and `dotenv` to the database package.

## Validation

- `npx prisma validate --schema=packages/database/prisma/schema.prisma` passes.
- `npm run db:seed` completed successfully and wrote `evidence/db/investor-demo-seed-summary.json`.
- `npm run build` completes the database TypeScript build successfully through Turbo.

## Relations And Cascades

- Deleting an organization cascades memberships, brands, prompts, jobs, and reports.
- Deleting a brand cascades competitors, prompts, analytics, and sets report brand to null.
- Deleting a prompt cascades responses.
- Deleting a response cascades mentions, citations, and screenshots.
- Deleting a snapshot cascades recommendations.

## Constraints

- `User.email` unique.
- `Organization.slug` unique.
- `OrganizationMember` unique on organization/user.
- `AiEngine.name` unique.
- `AnalyticsSnapshot` unique on brand/engine/snapshotDate.
- Role and billing plan enums are explicit.

## Remaining Caveats

- There is no database-level uniqueness for brand names within an organization or competitor names within a brand. This is acceptable for MVP but can be tightened later.
- Report file existence is managed by the API file renderer, while seeded report records are metadata records until generated/downloaded.
