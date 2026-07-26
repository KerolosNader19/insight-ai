# Project Handover

## Product

Insight AI is an MVP for agencies and brands that need to understand how AI engines mention, cite, and recommend them. The MVP prioritizes a realistic first-customer workflow over enterprise scale.

## Architecture

- `apps/web`: primary Next.js app for marketing, auth, dashboard, reports, settings, English/Arabic RTL.
- `apps/api`: NestJS REST API for auth, RBAC, agency management, brands, competitors, prompts, analytics, assistant, billing shell, tracking shell, reports.
- `packages/database`: Prisma schema, migrations, and deterministic investor seed data.
- `packages/ui`: small shared UI primitives.
- `apps/workers`: deferred BullMQ/Playwright tracking worker.
- `apps/ai-service`: deferred FastAPI analysis service.
- `apps/marketing`: deferred secondary landing app.

## Current Capabilities

- Login/register against the API.
- Agency/team management with roles: `OWNER`, `ADMIN`, `MANAGER`, `ANALYST`, `VIEWER`.
- Brand and competitor CRUD.
- Prompt CRUD and provider-backed run path.
- Stored-data analytics: GEO score, visibility trend, share of voice, citations, recommendations.
- Ask Insight AI endpoint that builds context from stored analytics and calls Groq/Gemini when configured.
- Real PDF generation and download from stored analytics.
- Subscription plan architecture and plan UI; Stripe checkout is deferred.
- Investor seed data with two agencies, three brands, competitors, prompt history, analytics history, recommendations, and report records.

## Important Truths

- The system must not claim live AI execution unless `GROQ_API_KEY` or `GEMINI_API_KEY` is configured and prompt runs complete with stored provider responses.
- Existing demo analytics are seeded historical records for demos. Runtime analytics are derived from stored database rows.
- Playwright/BullMQ/Redis/AI service are retained as deferred infrastructure, not removed.

## Demo Login

- Owner: `demo@insight-ai.io`
- Manager: `manager@insight-ai.io`
- Analyst: `analyst@insight-ai.io`
- Viewer: `viewer@insight-ai.io`
- Password: `Password123!`

## Handoff Checklist

1. Start Postgres and Redis with `docker compose up -d postgres redis`.
2. Apply migrations with `npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma`.
3. Seed demo data with `npm run db:seed`.
4. Start app with `npm run dev`.
5. Add `GROQ_API_KEY` or `GEMINI_API_KEY` before demonstrating live prompt execution or Ask Insight AI.

## Latest Hardening Verification

- `npm run build` passes for API, web, marketing, and database packages.
- API TypeScript, web TypeScript, and Prisma schema validation pass.
- The React/Vite/Tailwind workspace tree resolves cleanly after removing stale app-local installs.
- Plain `npm audit fix` was run. Remaining production advisories require planned compatibility upgrades, not a blind forced update.

## Known Follow-Ups

- Add provider-backed integration tests once real API keys are available in CI.
- Decide whether to promote or permanently retire `apps/marketing`.
- Upgrade Nest/BullMQ/bcrypt dependency lines in a dedicated compatibility pass if future `npm audit` requires breaking changes.
