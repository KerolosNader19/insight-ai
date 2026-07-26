# Market Intelligence Cloud Report

Date: 2026-06-08

## Outcome

Implemented the Market Intelligence Cloud as an API-first market-wide intelligence layer. Insight AI can now roll existing brand, prompt, citation, trend, benchmark, and visibility intelligence into industry/region markets instead of only customer-specific dashboards.

Validated market: `Cybersecurity Saudi Arabia`

Market ID: `8b6f3261-eab2-47b7-b8e9-5d3a014a2daf`

## Implemented Scope

- Market database for industry, region, country, language, and vertical.
- Market brand records for customer brands, competitors, discovered competitors, and market leaders.
- Market prompt marketplace with volume, difficulty, competition, opportunity, growth, commercial value, evidence, and confidence.
- Citation market intelligence with cited domains, authority score, citation frequency, competitor presence, opportunity score, and evidence.
- Market trends for topics, entities, prompts, competitors, citations, and brands.
- Market visibility snapshots and historical index records.
- Market leaderboards for GEO brands, AI visibility, citation winners, growing brands, declining brands, prompts, citations, and trends.
- Market share of voice across industry, regional, prompt, citation, and entity dimensions.
- Market benchmarks comparing a brand against market average and top 10%.
- Market opportunity engine for underserved prompts, citations, entities, and trend-backed opportunities.
- Agency market intelligence across agency-owned brands.
- Insight AI Market Index snapshot.

## Files Changed

- `packages/database/prisma/schema.prisma`
- `packages/database/prisma/migrations/20260608090000_market_intelligence_cloud/migration.sql`
- `apps/api/src/market-intelligence/dto/market-intelligence.dto.ts`
- `apps/api/src/market-intelligence/market-intelligence.service.ts`
- `apps/api/src/market-intelligence/market-intelligence.controller.ts`
- `apps/api/src/market-intelligence/market-intelligence.module.ts`
- `apps/api/src/app.module.ts`

## API Surface

- `POST /markets/sync`
- `GET /markets`
- `GET /markets/:id`
- `GET /industries`
- `GET /leaderboards`
- `GET /visibility-index`
- `GET /prompt-marketplace`
- `GET /share-of-voice`
- `GET /market-trends`
- `GET /trends/market`
- `GET /market-benchmarks`
- `GET /market-opportunities`
- `GET /citation-market-intelligence`
- `GET /competitor-radar`
- `GET /agency-market-intelligence/:organizationId`
- `GET /insight-ai-index`

All endpoints are authenticated with the existing JWT guard.

## Validation Evidence

Evidence directory: `evidence/market-intelligence-cloud`

Screenshots:

- `evidence/market-intelligence-cloud/screenshots/swagger-market-intelligence.png`
- `evidence/market-intelligence-cloud/screenshots/market-index-leaderboard-preview.png`

API responses:

- `01-market-sync.json`
- `02-markets-list.json`
- `03-industries.json`
- `04-leaderboards.json`
- `05-visibility-index.json`
- `06-prompt-marketplace.json`
- `07-share-of-voice.json`
- `08-market-trends.json`
- `09-market-benchmarks.json`
- `10-market-opportunities.json`
- `11-citation-market-intelligence.json`
- `12-competitor-radar.json`
- `13-agency-market-intelligence.json`
- `14-insight-ai-index.json`
- `15-db-evidence.json`
- `validation-summary.json`

Database evidence from `validation-summary.json`:

- Markets: 1
- Market brands: 17
- Market prompts: 29
- Market citation domains: 8
- Market trends: 58
- Visibility snapshots: 17
- Leaderboard snapshots: 12
- Benchmark snapshots: 2
- Market opportunities: 100
- Insight AI index snapshots: 1

Top observed entities:

- Top brand: `CrowdStrike`
- Top prompt: `Best Cybersecurity companies in Saudi Arabia`
- Top citation domain: `sama.gov.sa`
- Insight AI Market Index score: `60`

Note: the sync evidence records raw source rows collected before uniqueness rules collapse duplicates into market-specific records. The database evidence above is the authoritative deduplicated count.

## Specialist Review

Product Manager decision: Approved. Market-level intelligence directly answers buyer questions about who is winning, which prompts matter, and where the open market opportunities are.

Senior Architect decision: Approved with API-first implementation. The market layer uses dedicated Prisma models and does not disrupt existing customer, agency, billing, report, or GEO intelligence systems.

AI Engineer decision: Approved. The implementation rolls up existing evidence-backed GEO, research, prompt, citation, and trend intelligence without adding generic AI-only claims.

Security review: Approved for MVP. Market APIs require JWT authentication. Agency intelligence is scoped by organization membership patterns already used in the app. No secrets are stored or emitted.

Code review summary: Passed build and Prisma validation. The `/trends` root route was already owned by the research module, so the market trend API uses `/market-trends` plus `/trends/market`.

Growth impact summary: High. Market intelligence turns Insight AI from a private dashboard into a proprietary industry intelligence network that can support premium subscriptions, agency sales, and benchmark-driven pre-sales.

## Quality Gates

- `npx prisma validate --schema=packages/database/prisma/schema.prisma`: passed
- `npx prisma generate --schema=packages/database/prisma/schema.prisma`: passed
- `npm run build -w apps/api`: passed
- `npm run build`: passed

