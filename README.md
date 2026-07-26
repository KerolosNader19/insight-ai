# Insight AI

Insight AI is a launchable MVP for Generative Engine Optimization (GEO): agency teams can manage clients, brands, competitors, prompts, stored AI-response analytics, recommendations, and white-label PDF reports.

## Current MVP State

Working:
- Next.js dashboard and marketing pages in `apps/web`.
- NestJS REST API in `apps/api`.
- Prisma/Postgres source of truth in `packages/database`.
- Auth, registration, organization membership, and role-based access control.
- Brand, competitor, prompt, analytics, assistant, and report endpoints.
- Stored-data visibility tracking, share of voice, citation tracking, recommendations, and PDF reports.
- English/Arabic UI with RTL support.
- Investor demo seed data.

Provider-ready:
- Groq and Gemini provider abstraction exists in `apps/api/src/ai-providers`.
- Prompt execution, AI recommendation analysis, and Ask Insight AI activate when `GROQ_API_KEY` or `GEMINI_API_KEY` is configured.
- Without keys, the system fails explicitly instead of fabricating AI output.

Deferred infrastructure retained:
- `apps/workers`, BullMQ, Redis, Playwright, and `apps/ai-service` remain for future automated tracking compatibility.
- Stripe architecture and plan UI remain; live Stripe checkout is deferred.
- `apps/marketing` is kept as a secondary/deferred landing app. `apps/web` is the primary MVP surface.

## Quick Start

```bash
npm install
docker compose up -d postgres redis
npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma
npm run db:seed
npm run dev
```

Local URLs:
- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- API docs: `http://localhost:4000/docs`

Demo login:
- `demo@insight-ai.io`
- `Password123!`

## Useful Commands

```bash
npm run build
npm audit --omit=dev
npm run db:seed
npx prisma validate --schema=packages/database/prisma/schema.prisma
npx tsc -p apps/api/tsconfig.json --noEmit --incremental false
npx tsc -p apps/web/tsconfig.json --noEmit --incremental false
```

Last hardening pass result:
- `npm run build` passes.
- Prisma, API TypeScript, and web TypeScript validation pass.
- `npm audit --omit=dev` still reports 21 transitive advisories that require planned Nest/BullMQ/bcrypt/Swagger compatibility upgrades rather than forced upgrades.

## Environment

Required for local DB/API:
- `DATABASE_URL`
- `JWT_SECRET`
- `REDIS_HOST`
- `REDIS_PORT`

Optional provider keys:
- `GROQ_API_KEY`
- `GROQ_MODEL`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`

Optional billing:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Production Hardening Docs

- `CODEBASE_AUDIT.md`
- `UI_AUDIT_REPORT.md`
- `API_AUDIT_REPORT.md`
- `DATABASE_AUDIT_REPORT.md`
- `INVESTOR_DEMO_SETUP.md`
- `AI_PROVIDER_SETUP.md`
- `PROJECT_HANDOVER.md`
- `INVESTOR_BRIEF.md`
