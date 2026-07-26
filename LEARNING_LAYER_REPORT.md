# Learning Layer Report

Generated: 2026-06-08

## Summary

Insight AI now has a database-backed intelligence memory and learning layer. The product can explain not only the current state of GEO intelligence, but also what changed, what stayed stable, what actions were taken, and whether those actions affected tracked metrics.

This implementation reuses the existing GEO intelligence engines and does not add new dashboards, billing features, or admin pages.

## Architecture

The learning layer follows this flow:

1. Existing V3 engines produce evidence-backed outputs.
2. `Intelligence Memory Engine` stores metric snapshots.
3. `Memory Comparison` compares current and previous snapshots.
4. `Change Detection Engine` records material changes only.
5. `Trend Engine` calculates direction and velocity over time.
6. `Rollup Engine` summarizes duplicate validations while preserving raw evidence.
7. `Recommendation Outcome Tracking` stores action state and observed impact.
8. `Recommendation Effectiveness Engine` compares expected vs actual impact.
9. `Entity Normalization Engine` stores explicit aliases and variants.
10. `Insight Confidence Engine` centralizes confidence scoring.
11. `Executive Change Report` packages the learning layer into a PDF.

## Existing Components Reused

Reused intelligence engines:

- GEO Score V3
- Citation Authority Engine
- Prompt Coverage Engine
- Threat Engine V2
- Opportunity Engine V3
- Competitor Intelligence Engine

Reused platform components:

- NestJS authentication and JWT guards
- Existing organization/brand RBAC helpers
- Prisma/Postgres source of truth
- Existing reports module and PDF renderer
- Existing notification flow for generated reports

## Historical Tracking

Snapshots are stored in `IntelligenceSnapshot` with:

- `timestamp`: `capturedAt`
- `evidence`: JSON evidence array
- `confidence`: `confidenceScore`
- `source`: `dataSource`
- `engine`
- `subjectType`
- `subjectId`
- `metricKey`
- `metricValue`
- `sourceHash`

Validated result:

- `POST /geo-intelligence/brands/:brandId/memory/capture`
- Stored `28` snapshots in one capture.
- Captured `6` engines.

Evidence:

- `evidence/intelligence-memory-learning/21-memory-capture-final.json`
- `evidence/intelligence-memory-learning/db-evidence.json`

## Comparison Examples

`GET /geo-intelligence/brands/:brandId/memory/compare?period=month` compared current and previous metric streams.

Validated result:

- Period: `month`
- Comparisons: `28`

Each comparison includes:

- Previous value
- Current value
- Delta
- Direction
- Evidence
- Confidence score

Evidence:

- `evidence/intelligence-memory-learning/22-memory-compare-final.json`

## Change Detection

`POST /geo-intelligence/brands/:brandId/changes/detect` detects material movement from stored snapshots.

Validated result:

- Material changes detected: `0`
- Message: `No material intelligence changes detected.`

This is correct for the validation run because captures were repeated against unchanged intelligence. The engine did not invent a gain, loss, new competitor, lost citation, or threat change.

Evidence:

- `evidence/intelligence-memory-learning/23-change-detect-final.json`
- `evidence/intelligence-memory-learning/24-changes-final.json`

## Trend Examples

`GET /geo-intelligence/brands/:brandId/trends?days=90` calculates trend streams from stored snapshots.

Example:

- Metric: `geoScore`
- Direction: `STABLE`
- Velocity: `SLOW`
- First value: `85`
- Latest value: `85`
- Delta: `0`
- Sample size: `3`
- Confidence score: `75`

Evidence:

- `evidence/intelligence-memory-learning/25-trends-final.json`

## Rollup Examples

`POST /geo-intelligence/brands/:brandId/memory/rollup` deduplicates repeated validation runs without deleting raw data.

Validated result:

- Raw snapshots considered: `84`
- Rollups created: `28`
- Duplicate groups: `28`

Example rollup evidence:

- `metricKey`: `geoScore.rollup`
- `metricValue`: `85`
- `payload.originalCount`: `3`
- `payload.preservedHistory`: `true`

Evidence:

- `evidence/intelligence-memory-learning/26-rollup-final.json`
- `evidence/intelligence-memory-learning/db-evidence.json`

## Action Outcome Tracking

Recommendations can now be tracked through:

- `PENDING`
- `IN_PROGRESS`
- `COMPLETED`
- `IGNORED`

Validated action:

- Title: `Add FAQ schema to OrcaTech cybersecurity service pages`
- Expected metric: `opportunityScore`
- Expected impact: `5`
- Baseline value: `35`
- Actual value: `35`
- Actual impact: `0`
- Effectiveness: `0`

The zero effectiveness is intentionally not rewritten into a positive claim. No observed metric improvement occurred in this validation window.

Evidence:

- `evidence/intelligence-memory-learning/27-action-outcome-create-final.json`
- `evidence/intelligence-memory-learning/28-action-outcome-complete-final.json`
- `evidence/intelligence-memory-learning/30-recommendation-effectiveness-final.json`

## Intelligence Timeline

`GET /geo-intelligence/brands/:brandId/timeline?days=30` returns a combined timeline of:

- Change events
- Recommendation outcome events
- Memory rollup events

Validated result:

- Timeline events: `58`

Evidence:

- `evidence/intelligence-memory-learning/32-timeline-final.json`

## Entity Normalization

`EntityAlias` stores explicit, evidence-backed aliases.

Validated alias:

- Canonical: `Security Operations Center`
- Alias: `SOC`
- Category: `TECHNOLOGY`

This supports deterministic normalization without fake AI inference.

Evidence:

- `evidence/intelligence-memory-learning/31-entity-aliases-final.json`
- `evidence/intelligence-memory-learning/db-evidence.json`

## Unified Confidence Framework

The centralized confidence calculation uses:

- Sample size
- Evidence count
- Source diversity
- Freshness
- Consistency

Validated result:

- Confidence score: `97`
- Sample size: `142`
- Evidence count: `863`
- Source diversity: `8`

Evidence:

- `evidence/intelligence-memory-learning/33-confidence-final.json`
- `evidence/intelligence-memory-learning/37-runtime-smoke-final.json`

## Executive Change Report

Endpoint:

- `POST /reports/change-report`

Report sections:

- What Changed
- Why It Changed
- Trend Direction and Velocity
- Impact
- Recommended Actions
- Timeline
- Confidence

Validated output:

- Report ID: `5c43fc5a-e215-41a2-a6dd-b14967d43cfd`
- File: `evidence/intelligence-memory-learning/35-change-report-5c43fc5a-e215-41a2-a6dd-b14967d43cfd.pdf`
- Size: `9285` bytes
- Content type: `application/pdf`

Evidence:

- `evidence/intelligence-memory-learning/34-change-report-create-final.json`
- `evidence/intelligence-memory-learning/36-change-report-download-final.json`

## Customer Value

This layer moves Insight AI from static intelligence to learning intelligence:

- "What is my GEO score?" becomes "What changed in my GEO score?"
- "What are my recommendations?" becomes "Which recommendations actually worked?"
- "Who is a threat?" becomes "Is the threat increasing or decreasing?"
- "What are my citations?" becomes "Which citation signals changed over time?"
- "Can I trust this?" becomes "Here is the evidence, confidence, source, and last verified date."

## Remaining Gaps

No material change event was generated during validation because the underlying OrcaTech intelligence did not change between captures. This is the correct trust behavior, but future validation should include a real prompt/citation/audit change to show an `UP` or `DOWN` change row.

The API process initially emitted Redis connection errors because it was started before local Redis was running. Redis was started afterward with `docker compose up -d redis`; restart the API process to clear the stale queue connection loop during long-running development sessions.

After the restart, runtime smoke evidence showed:

- `/health`: `ok`
- Confidence endpoint: `COMPLETED`
- Confidence score: `97`
