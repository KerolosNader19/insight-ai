# Real SRO Engine Report

Generated: 2026-06-08

## Summary

Implemented a customer-facing Selection Rate Optimization engine that lets a user enter a URL and target AI-search prompt, then receive an evidence-backed page-level decision:

- SRO Score
- GEO Score
- Citation Readiness
- Entity Readiness
- Selection Probability
- Competitor Page Comparison
- Content Gaps
- Improvement Opportunities
- Executive GEO Scorecard PDF

This is not AI-filler text. The V1 engine uses deterministic page fetch, HTML extraction, schema/FAQ/citation/entity analysis, competitor page scraping, stored evidence, confidence scores, and verified timestamps.

## Agent Decisions

| Specialist | Decision |
|---|---|
| Product Manager | Approved. Page-level SRO directly answers the customer-paid question: “Which page should I fix and why?” Low-value dashboards/admin work rejected. |
| Backend Architect | Approved modular NestJS implementation with dedicated `SroIntelligenceModule`, persisted SRO records, indexed Prisma models, and no disruption to existing auth/org/brand systems. |
| AI Engineer | Approved provider-independent intelligence layer. The scoring is deterministic and explainable now, with a clean path to add Groq/Gemini/local LLM synthesis later. |
| Senior Developer | Implemented within existing Next.js/NestJS architecture, reused auth/RBAC/API patterns, and added a focused dashboard page. |
| Security Engineer | Approved with constraints: JWT guard, brand RBAC, bounded URL input, local/private URL rejection, fetch timeout, max page size, no secrets, no caller-trusted org scope. |
| Code Reviewer | Build/type validation passed after fixing Prisma relation and JSON narrowing issues. No known dead endpoint or disabled SRO button remains. |
| Growth Hacker | High revenue impact. This becomes a pre-sales wedge: “Enter your page and see why AI does or does not recommend it.” |
| Senior Project Manager | Scoped to Phase 1 customer value: SRO, competitor pages, content gaps, prompts, citation briefs, bulk audit API, and scorecard. Enterprise/admin work deferred. |

## Files Added / Changed

- `apps/api/src/sro-intelligence/*`
- `apps/web/app/dashboard/sro/page.tsx`
- `apps/web/app/dashboard/Sidebar.tsx`
- `apps/web/lib/translations.ts`
- `packages/database/prisma/schema.prisma`
- `packages/database/prisma/migrations/20260608060000_sro_page_intelligence/migration.sql`

## API Surface

| Endpoint | Purpose |
|---|---|
| `POST /sro/analyze` | Run page-level SRO analysis for a URL + target prompt. |
| `GET /sro/brands/:brandId/analyses` | List stored SRO analyses. |
| `POST /sro/bulk-audits` | Run multiple URL/prompt analyses for agency audit packages. |
| `POST /sro/persona-fanout` | Generate persona-specific prompt opportunities. |
| `POST /sro/niche-explorer` | Generate industry/country prompt opportunities. |
| `GET /sro/brands/:brandId/citation-outreach` | Generate citation outreach briefs from stored evidence. |
| `GET /sro/brands/:brandId/scorecard` | Return executive scorecard JSON. |
| `POST /sro/scorecard` | Generate scorecard PDF. |
| `GET /sro/scorecards/:reportId/download` | Download scorecard PDF. |

## Validation Evidence

Evidence directory:

- `evidence/real-sro-engine/`

Key evidence:

- API response: `05-sro-analyze.json`
- Stored list: `06-sro-list.json`
- Persona fan-out: `07-persona-fanout.json`
- Niche explorer: `08-niche-explorer.json`
- Citation outreach: `09-citation-outreach.json`
- Scorecard JSON: `10-scorecard-json.json`
- Scorecard report record: `11-scorecard-report.json`
- Downloaded PDF: `12-scorecard-download.pdf`
- DB evidence: `15-db-evidence.json`
- UI screenshots:
  - `screenshots/sro-desktop.png`
  - `screenshots/sro-mobile.png`
  - `screenshots/sro-arabic.png`

Validated live run:

- Brand: `Cloudflare SRO 1780897908191`
- Target URL: `https://www.cloudflare.com/`
- Competitors:
  - `https://www.paloaltonetworks.com/`
  - `https://www.crowdstrike.com/`
- Prompt: `Best cybersecurity company in Saudi Arabia for enterprise buyers`

Observed output:

- SRO Score: `78`
- GEO Score: `82`
- Citation Readiness: `100`
- Entity Readiness: `44`
- Selection Probability: `78`
- Confidence Score: `82`
- Competitor page analyses stored: `2`
- Scorecard PDF: 2 pages, 4.4 KB

## Build Evidence

Passed:

```bash
npx prisma validate --schema=packages/database/prisma/schema.prisma
npx prisma generate --schema=packages/database/prisma/schema.prisma
npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma
npm run build -w apps/api
npm run build -w apps/web
npm run build
```

Final monorepo build:

- `4 successful, 4 total`

## Remaining Gaps

- The SRO V1 scoring is deterministic and evidence-backed, but not yet enhanced with provider synthesis.
- Bulk agency audits run sequentially through the API; BullMQ scheduling can be added later for high-volume agency runs.
- Competitor page scraping uses homepage URLs supplied in the brand record. Future versions should discover matching competitor money pages automatically.
