# Intelligence Memory Audit

Generated: 2026-06-08

## Objective

Add a learning layer that lets Insight AI preserve intelligence history, compare current intelligence against prior periods, detect meaningful changes, calculate trends, roll up duplicate validations, track recommendation outcomes, normalize entity aliases, centralize confidence, and generate an executive change report.

This pass did not add dashboards, billing, or admin pages.

## Implementation Summary

Implemented database-backed memory and learning infrastructure for the existing GEO intelligence engines:

- GEO Score V3 snapshots
- Citation Authority snapshots
- Prompt Coverage snapshots
- Threat Engine V2 snapshots
- Opportunity Engine V3 snapshots
- Competitor Intelligence snapshots
- Change detection records
- Recommendation action outcomes
- Entity alias normalization
- Unified confidence summary
- Executive change report PDF

## Database Changes

Migration:

- `packages/database/prisma/migrations/20260608020000_intelligence_memory_learning/migration.sql`

Schema additions:

- `IntelligenceSnapshot`
- `IntelligenceChange`
- `RecommendationOutcome`
- `EntityAlias`
- `ActionOutcomeStatus`

Indexes added for:

- Brand, engine, and capture date lookup
- Brand, metric key, and capture date lookup
- Brand, subject type, and subject id lookup
- Change detection by brand/date, engine/type, and direction
- Recommendation outcomes by brand/status and metric
- Entity aliases by brand/canonical/category

Cascade behavior:

- All learning-layer records cascade on brand deletion.

## APIs Added

GEO intelligence memory:

- `POST /geo-intelligence/brands/:brandId/memory/capture`
- `GET /geo-intelligence/brands/:brandId/memory/compare?period=month`
- `POST /geo-intelligence/brands/:brandId/changes/detect`
- `GET /geo-intelligence/brands/:brandId/changes?days=30`
- `GET /geo-intelligence/brands/:brandId/trends?days=90`
- `POST /geo-intelligence/brands/:brandId/memory/rollup`

Recommendation learning:

- `POST /geo-intelligence/brands/:brandId/action-outcomes`
- `PATCH /geo-intelligence/brands/:brandId/action-outcomes/:outcomeId`
- `GET /geo-intelligence/brands/:brandId/action-outcomes`
- `GET /geo-intelligence/brands/:brandId/recommendation-effectiveness`

Timeline and trust:

- `GET /geo-intelligence/brands/:brandId/timeline?days=30`
- `GET /geo-intelligence/brands/:brandId/confidence`

Entity normalization:

- `POST /geo-intelligence/brands/:brandId/entity-aliases`
- `GET /geo-intelligence/brands/:brandId/entity-aliases`

Reports:

- `POST /reports/change-report`
- Existing `GET /reports/:id/download` now renders `PDF_CHANGE` reports.

## Evidence

Validation was executed against the running NestJS API on `http://localhost:4000` using the seeded demo account and the real `OrcaTech` brand in `Acme GEO Agency`.

Evidence directory:

- `evidence/intelligence-memory-learning/`

Key files:

- `validation-summary-final.json`
- `db-evidence.json`
- `21-memory-capture-final.json`
- `22-memory-compare-final.json`
- `23-change-detect-final.json`
- `25-trends-final.json`
- `26-rollup-final.json`
- `28-action-outcome-complete-final.json`
- `30-recommendation-effectiveness-final.json`
- `32-timeline-final.json`
- `33-confidence-final.json`
- `35-change-report-5c43fc5a-e215-41a2-a6dd-b14967d43cfd.pdf`
- `36-change-report-download-final.json`
- `37-runtime-smoke-final.json`

## Runtime Validation Results

Brand validated:

- Organization: `Acme GEO Agency`
- Brand: `OrcaTech`
- Brand ID: `3dfc86a2-9639-4482-b9d1-1a0ba7b755b7`

Memory capture:

- Stored snapshots per capture: `28`
- Engines captured: `6`
- Engines: `GEO_SCORE_V3`, `CITATION_AUTHORITY_ENGINE`, `PROMPT_COVERAGE_ENGINE`, `THREAT_ENGINE_V2`, `OPPORTUNITY_ENGINE_V3`, `COMPETITOR_INTELLIGENCE_ENGINE`

Memory comparison:

- Period: `month`
- Metric comparisons: `28`

Change detection:

- Detected material changes: `0`
- Result: `No material intelligence changes detected.`
- This is correct for the validation run because repeated captures were taken from unchanged underlying intelligence. The engine did not fabricate movement.

Trend detection:

- Example stream: `geoScore`
- Direction: `STABLE`
- Velocity: `SLOW`
- First value: `85`
- Latest value: `85`
- Sample size: `3`
- Confidence: `75`

Rollup:

- Raw snapshots considered: `84`
- Rollups created: `28`
- Duplicate groups: `28`
- Raw historical rows were preserved.

Recommendation outcome tracking:

- Expected metric: `opportunityScore`
- Baseline value: `35`
- Actual value: `35`
- Actual impact: `0`
- Effectiveness: `0`
- This is honest behavior: no score improvement occurred between the captured baseline and completion check.

Timeline:

- Timeline events: `58`
- Event sources: rollups and recommendation outcomes

Confidence:

- Unified confidence score: `97`
- Sample size: `142`
- Evidence count: `863`
- Source diversity: `8`

Executive change report:

- Report ID: `5c43fc5a-e215-41a2-a6dd-b14967d43cfd`
- PDF path: `evidence/intelligence-memory-learning/35-change-report-5c43fc5a-e215-41a2-a6dd-b14967d43cfd.pdf`
- Size: `9285` bytes
- Content type: `application/pdf`

## Database Evidence

Direct Prisma evidence for `OrcaTech`:

- Intelligence snapshots: `140`
- Intelligence changes: `0`
- Recommendation outcomes: `2`
- Entity aliases: `1`
- Change reports: `1`

Snapshots by engine:

- `PROMPT_COVERAGE_ENGINE`: `6`
- `OPPORTUNITY_ENGINE_V3`: `33`
- `CITATION_AUTHORITY_ENGINE`: `24`
- `COMPETITOR_INTELLIGENCE_ENGINE`: `9`
- `GEO_SCORE_V3`: `3`
- `MEMORY_ROLLUP`: `56`
- `THREAT_ENGINE_V2`: `9`

## Before vs After

Before:

- GEO intelligence was computed from current engine output only.
- Repeated validations created repeated intelligence without a historical explanation layer.
- Recommendations did not have a feedback loop for expected vs actual impact.
- Entity intelligence treated variants such as `SOC` and `Security Operations Center` independently.
- Reports explained the current state, not what changed.

After:

- Current intelligence can be snapshotted with evidence, confidence, source, and capture time.
- Current and prior snapshots can be compared by period.
- Changes are recorded only when movement is material.
- Trends report direction, velocity, sample size, evidence, and confidence.
- Rollups summarize repeated validations while preserving raw rows.
- Recommendations can be tracked as pending, in progress, completed, or ignored.
- Recommendation effectiveness is calculated from stored baseline and actual metrics.
- Entity aliases normalize variants without fake inference.
- The executive change report explains what changed, why, impact, recommended actions, timeline, and confidence.

## Trust Behavior

The implementation preserves the trust layer:

- Memory capture returns `INSUFFICIENT_DATA` if no V3 engine returns a usable metric.
- Memory comparison requires at least two snapshots.
- Trend detection requires at least two snapshots in the selected period.
- Change detection does not create change rows for stable metrics.
- Recommendation effectiveness reports pending or zero-impact outcomes instead of inventing uplift.

## Runtime Notes

The first API runtime was started before Redis was running locally, producing Redis `ECONNREFUSED` logs from queue infrastructure. The learning-layer validation still succeeded because these routes are database-backed. Redis was then started with the existing compose service.

After Redis was started, the API was restarted cleanly and a final smoke test returned:

- Health: `ok`
- Brand: `OrcaTech`
- Confidence endpoint: `COMPLETED`
- Confidence score: `97`

## Files Changed

- `packages/database/prisma/schema.prisma`
- `packages/database/prisma/migrations/20260608020000_intelligence_memory_learning/migration.sql`
- `apps/api/src/geo-intelligence/geo-intelligence.controller.ts`
- `apps/api/src/geo-intelligence/geo-intelligence.service.ts`
- `apps/api/src/reports/reports.controller.ts`
- `apps/api/src/reports/reports.service.ts`
