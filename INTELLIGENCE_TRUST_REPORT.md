# Intelligence Trust Report

Generated: 2026-06-08

## Trust Standard

Insight AI intelligence should not make claims without:

- Evidence
- Confidence score
- Data source
- Last verified timestamp
- A human-readable explanation of why the score or recommendation exists

If evidence is too thin, engines must return `INSUFFICIENT_DATA`.

## What Changed

- Added `GEO_SCORE_V3` with weighted scoring and improvement potential.
- Added citation authority scoring so citation opportunities are ranked by value, difficulty, and impact.
- Added entity intelligence to expose coverage, gaps, and dominance.
- Added prompt coverage scoring to connect recommendations to actual tracked prompts.
- Added Threat Engine V2 with lost prompts, lost citations, entity dominance, content weakness, impact, evidence, and confidence.
- Added Opportunity Engine V3 with why/evidence/expected gain/difficulty/confidence/revenue potential/quick-win flag.
- Added competitor intelligence cards backed by prompt, citation, entity, and threat evidence.
- Added `PDF_V3` reports that exclude generic filler and include trust notes.

## Confidence Gates

Current gates:

- Engines require sufficient stored prompt, audit, citation, or entity evidence.
- Low-confidence rows are filtered from customer-facing V3 outputs.
- Weak benchmark and low-sample use cases continue to return `INSUFFICIENT_DATA`.
- Placeholder/example domains are filtered from Phase 2 and V3 customer-facing evidence paths.

## Evidence Samples

GEO Score V3:

- Overall: `85`
- Confidence: `88`
- Data source: `GEO_AUDIT + PROMPT_TRACKING + CITATION_AUTHORITY + ENTITY_INTELLIGENCE`
- Expected gain: `+16`

Citation Authority:

- `sama.gov.sa`
- Value score: `47`
- Difficulty score: `51`
- Impact score: `43`
- Evidence rows: `10`

Entity Intelligence:

- Entity: `cybersecurity`
- Entity coverage: `50`
- Entity dominance: `0`
- Evidence rows: `3`

Prompt Coverage:

- Intent: `COMPARISON`
- Prompt importance: `91`
- Prompt opportunity: `72`
- Revenue potential: `HIGH`
- Evidence rows: `3`

Threat Engine V2:

- Competitor: `Palo Alto Networks`
- Threat score: `13`
- Confidence: `79`
- Explanation explicitly states it is a low operational threat because no lost prompts, citation gaps, or entity domination were verified.

## Reports V3

Endpoint:

- `POST /reports/v3`

Generated evidence:

- Create response: `evidence/geo-intelligence-accuracy/10-report-v3-create.json`
- Downloaded PDF: `evidence/geo-intelligence-accuracy/11-report-v3-download.pdf`

Report sections now include:

- Executive summary
- GEO Score V3 breakdown
- Citation authority
- Entity intelligence
- Prompt coverage
- Threat Engine V2
- Opportunity Engine V3
- Competitor intelligence cards
- 30-day evidence-backed plan
- Trust notes

## Trust Audit Result

The V3 path is materially more trustworthy than V2 because the highest-value insights now require cross-engine evidence and explain their reasoning. Generic recommendations have not been removed from legacy V1/V2 code paths, but Reports V3 and V3 engines use evidence-first outputs and confidence gates.

## Remaining Trust Risks

- Some legacy report/recommendation paths still contain older fallback copy. They are retained for backward compatibility but should not be used as the primary customer-facing intelligence standard.
- The current entity engine is deterministic and conservative; it avoids fake intelligence but may miss semantically equivalent entities.
- Redis/BullMQ warnings appeared during local validation because Redis was not running. They did not affect synchronous V3 intelligence validation.
