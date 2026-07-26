# Insight AI MVP Restructure Plan

## Summary

Insight AI will be transformed from a broad prototype into a launchable GEO and AI visibility MVP using the existing Turborepo foundation. The MVP keeps the current Next.js web app, NestJS API, Prisma/PostgreSQL database, premium dashboard UI, i18n support, subscription architecture, and deferred infrastructure for future automated tracking.

The implementation priority is:

1. Real authentication and agency management.
2. Brand and competitor management.
3. Prompt tracking with stored AI responses.
4. Database-backed visibility, share of voice, citations, recommendations, and reports.
5. Deferred but compatible infrastructure for Playwright, BullMQ, Redis, workers, and the FastAPI AI service.

## Current State

The repository already contains:

- `apps/web`: Next.js App Router web app with marketing pages, login/register pages, dashboard routes, Zustand stores, i18n, charts, and modal UI.
- `apps/api`: NestJS API with auth, users, organizations, brands, prompts, analytics, tracking, and billing modules.
- `packages/database`: Prisma schema and migrations for users, organizations, brands, prompts, AI responses, mentions, citations, analytics snapshots, and recommendations.
- `apps/workers`: BullMQ/Playwright tracking worker intended for automated prompt execution.
- `apps/ai-service`: FastAPI service for response analysis.
- Subscription UI and Stripe service scaffolding.

## What Works

- Prisma schema validates.
- API TypeScript currently type-checks.
- Basic login service exists.
- Dashboard and marketing UI render structure exists.
- i18n and RTL support are implemented in the web app.
- Billing plan UI exists and should stay.
- Tracking worker and AI service provide useful future infrastructure concepts.

## What Is Mocked Or Incomplete

- Register UI does not call the API, and the API lacks a register controller route.
- Auth tokens do not include organization context, and dashboard access is not protected.
- RBAC is not implemented beyond a simple role enum.
- Agency/team management is mostly absent.
- Brand, competitor, and prompt pages use static arrays and modal simulations.
- Analytics endpoints return hardcoded values or empty arrays.
- Reports simulate downloads and do not generate stored report artifacts.
- Recommendations are static UI data.
- `packages/database/seed.ts` does not match the current Prisma schema.
- Web and marketing type-checks fail.

## Keep

- Existing monorepo, app/package structure, and premium visual direction.
- `apps/web` as the primary MVP interface.
- `apps/api` as the single MVP business API.
- PostgreSQL and Prisma as the source of truth.
- Existing subscription architecture and plans UI, with Stripe checkout/portal deferred if credentials are not configured.
- Playwright, BullMQ, Redis, workers, and FastAPI AI service as deferred infrastructure for automated tracking.
- Dashboard route categories: overview, analytics, prompts, competitors, recommendations, reports, settings.

## Simplify Or Defer

- Defer production worker automation until the API-based prompt execution path is stable.
- Defer complex feature flags, growth metrics, advanced telemetry, and notification automation.
- Defer full Stripe billing activation while keeping plans, plan metadata, and future service boundaries.
- Defer enterprise-only features such as SSO and custom AI models.
- Treat `apps/marketing` as secondary to the Next.js web app during MVP stabilization.

## Phase 1 Architecture

- Browser uses `apps/web`.
- `apps/web` persists auth token and calls `apps/api`.
- `apps/api` derives organization scope from the JWT user and database membership.
- Agency management is represented by `Organization` plus `OrganizationMember`.
- Brands, competitors, prompts, responses, mentions, citations, recommendations, and reports are stored in PostgreSQL.
- Metrics are calculated from stored data only. Empty datasets return zeros and empty charts rather than fake values.
- Prompt execution supports an API-first path using Groq first and Gemini fallback when keys are configured. If keys are missing, the system stores a clear failed response state instead of fake analytics.
- Deferred infrastructure remains compatible: future scheduler/worker jobs can call the same prompt execution service.

## Phase 1 Deliverables

- Working register/login/me flow.
- Working agency profile/team/member endpoints and UI surface.
- Working roles: `OWNER`, `ADMIN`, `MANAGER`, `ANALYST`, `VIEWER`.
- Working brand CRUD with required brand name, website, industry, and country.
- Working competitor CRUD per brand.
- Working prompt CRUD and manual prompt run endpoint.
- Analytics summary/trend/share-of-voice endpoints from stored data only.
- Reports metadata and downloadable MVP PDF output from stored data only.
- Fixed seed script and type-check blockers.
