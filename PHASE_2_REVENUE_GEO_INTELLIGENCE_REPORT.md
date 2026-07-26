# Phase 2 Revenue GEO Intelligence Report

Generated: 2026-06-08

## Implemented

- Competitor Threat Engine: `GET /geo-intelligence/brands/:brandId/threats`
- Visibility Opportunity Engine V2: `GET /geo-intelligence/brands/:brandId/opportunities-v2`
- Quick Wins Engine: `GET /geo-intelligence/brands/:brandId/quick-wins`
- Lost Revenue Estimator: `GET /geo-intelligence/brands/:brandId/lost-revenue`
- Industry Benchmark Engine: `GET /geo-intelligence/brands/:brandId/benchmarks`
- Money Page V2 aggregate: `GET /geo-intelligence/brands/:brandId/money-page-v2`
- Reports V2: `POST /reports/v2`
- Customer UI integration: `/dashboard/why-not-recommended`

## Trust Layer

Every Phase 2 engine response includes evidence, confidence score, data source, and last verified timestamp. Engines return `INSUFFICIENT_DATA` when the stored signal is not strong enough to support a claim. Placeholder competitors and example domains are filtered from customer-facing Phase 2 intelligence.

## Validation Evidence

Evidence directory: `evidence/phase-2-geo-intelligence/`

- API responses:
  - `01-threats.json`
  - `02-opportunities-v2.json`
  - `03-quick-wins.json`
  - `04-lost-revenue.json`
  - `05-benchmarks.json`
  - `06-money-page-v2.json`
- Report generation:
  - `07-report-v2-create.json`
  - `08-report-v2-download.json`
  - `08-report-v2-download.pdf`
- Database evidence:
  - `09-database-evidence.json`
- UI screenshots:
  - `10-ui-desktop-en.png`
  - `11-ui-mobile-en.png`
  - `12-ui-desktop-ar.png`
  - `13-ui-screenshot-evidence.json`

## Current Validation Result

- Threats: `COMPLETED`, 3 competitors, confidence 79.
- Opportunities V2: `COMPLETED`, 11 opportunities, confidence 81.
- Quick Wins: `COMPLETED`, 6 actions across 1-day, 7-day, and 30-day groups, confidence 81.
- Lost Revenue Estimator: `COMPLETED`, 50% missed visibility, medium competitor capture, confidence 85. No fake dollar values are generated.
- Benchmarks: `COMPLETED`, sample size 3, confidence 85.
- Money Page V2: visible in English desktop, English mobile, and Arabic RTL desktop screenshots.
- Reports V2: generated PDF stored in API report output and persisted as `PDF_V2`.

## Database Evidence Summary

For OrcaTech, validation found:

- 17 stored AI responses
- 50 stored mentions
- 50 stored citations
- 5 V2 report records
- Persisted Phase 2 memory rows in `GeoInsight` for threats, visibility opportunities, quick wins, lost revenue, and benchmarks

## Quality Checks

- `npm run build -w apps/api`: passed.
- `npm run build -w apps/web`: passed after clearing stale `.next` artifacts.
- `npx prisma validate --schema=packages/database/prisma/schema.prisma`: passed.

## Remaining Follow-Up

- Repeated validation calls intentionally create historical `GeoInsight` rows. A future rollup/deduplication job should summarize repeated engine runs for cleaner long-term intelligence memory.
- Redis/BullMQ were not required for these synchronous customer-facing endpoints during validation.
