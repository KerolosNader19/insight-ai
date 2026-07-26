# Automated GEO Analyst Plan

Generated: 2026-06-08

## Purpose

The Automated GEO Analyst turns proactive data acquisition into periodic intelligence summaries.

It should continuously ask:

- What changed?
- What new opportunities appeared?
- What threats emerged?
- What citations increased?
- What competitors grew?

## Current Implementation

Endpoint:

- `POST /automated-geo-analyst`

Current behavior:

1. Runs market discovery.
2. Runs market coverage.
3. Runs trend discovery.
4. Runs competitor monitoring.
5. Runs citation research.
6. Runs existing intelligence change detection.
7. Stores an `AutomatedAnalystSummary`.
8. Stores a completed `AUTOMATED_GEO_ANALYST` job row.

Validated result:

- Status: `COMPLETED`
- Confidence: `74.5`
- Summaries stored: `1`
- Job rows stored: `1`

Evidence:

- `evidence/data-acquisition-platform/14-automated-geo-analyst.json`
- `evidence/data-acquisition-platform/db-evidence.json`

## Why No Hidden Scheduler Was Added

The current repo already has Redis/BullMQ infrastructure, but no dedicated scheduler module is wired for recurring jobs.

To avoid pretending continuous automation exists, this phase implements the analyst as a durable API and persisted job workflow. A worker, cron, or BullMQ repeatable job can now call it without changing the API contract or database model.

## Recommended Scheduling Plan

Phase 1:

- Run weekly via external cron or deployment scheduler.
- Call `POST /automated-geo-analyst` for each active brand.
- Store summaries and completed job records.

Phase 2:

- Add BullMQ repeatable jobs for active brands.
- Use plan limits to control frequency.
- Add retry/backoff for provider failures.

Phase 3:

- Add source freshness rules.
- Run high-priority brands daily and low-priority brands weekly.
- Generate notifications when confidence-backed alerts appear.

## Analyst Output Contract

Each summary stores:

- Brand
- Industry
- Country
- Period start
- Period end
- Summary text
- Changes
- Opportunities
- Threats
- Citations
- Evidence
- Confidence score
- Data source

## Trust Rules

The analyst must not fabricate events.

If discovery engines return insufficient evidence, the summary should preserve that status instead of rewriting it into a confident claim.

Current implementation stores raw engine outputs inside summary JSON fields so downstream UI/reporting can show exact evidence and confidence.

## Future Local AI Readiness

The analyst orchestration is provider-independent:

- Provider layer handles Groq/Gemini today.
- Research items and graph records persist evidence independently of provider output.
- Local LLMs, local embeddings, and local graph retrieval can replace provider expansion later.

