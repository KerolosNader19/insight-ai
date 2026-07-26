# GEO Intelligence Accuracy Audit

Generated: 2026-06-08

## Scope

This pass focused only on intelligence quality and trustworthiness. No new dashboard, admin, billing, or cosmetic UI surface was added.

Audited engines:

- GEO Score Engine V2
- Citation Discovery and citation opportunities
- Prompt discovery and prompt runs
- Competitor Threat Engine
- Visibility Opportunity Engine V2
- Reports V2
- Why You're Not Recommended data path

## Weak Areas Found

- GEO scores had component scores, but the customer could not see weighted points, improvement potential, or a clear "why score is not higher" explanation.
- Citation opportunities exposed authority/relevance fields indirectly but did not calculate citation value, difficulty, and impact together.
- Entity coverage was not synthesized from AI responses, so content/entity gaps were too shallow.
- Prompt-level importance, opportunity, and revenue potential were not calculated from stored prompt outcomes.
- Threat explanations could be weak for low-level threats; one validation sample had evidence but no explicit `why` text.
- Reports V2 still had sections that could read like general action lists rather than traceable intelligence.

## Improvements Made

- Added GEO Score Engine V3:
  - Overall score
  - Weighted component breakdown
  - Component points
  - Evidence per component
  - Improvement potential
  - Why score is not higher
  - Confidence and source metadata

- Added Citation Authority Engine:
  - Domain authority
  - Industry relevance
  - GEO relevance
  - Citation frequency
  - Competitor presence
  - Citation value score
  - Citation difficulty score
  - Citation impact score

- Added Entity Intelligence Engine:
  - Extracts tracked brand, service, technology, location, industry, and competitor terms from stored prompt responses.
  - Calculates entity coverage, entity gaps, and competitor entity dominance.

- Added Prompt Coverage Engine:
  - Stores prompt-level interpretation from existing prompt/run data.
  - Calculates prompt importance, opportunity, difficulty, and revenue potential without fake dollar estimates.

- Added Threat Engine V2:
  - Explains lost prompts, lost citations, dominated entities, weak content areas, impact, evidence, and confidence.
  - Low threats now explicitly explain why they are low rather than returning empty reasoning.

- Added Opportunity Engine V3:
  - Every opportunity includes why it exists, evidence, expected gain, difficulty, confidence, revenue potential, and quick-win status.

- Added Competitor Intelligence Engine:
  - Builds evidence-backed competitor cards with GEO score proxy, citation strength, visibility strength, prompt dominance, content strength, and entity coverage.

- Added Reports V3:
  - `POST /reports/v3`
  - `PDF_V3` report generation
  - Report download now respects `PDF`, `PDF_V2`, and `PDF_V3` types.
  - V3 sections include evidence, confidence, reasoning, and expected impact.

## Before vs After Examples

Before:

- GEO score showed component numbers but not weighted contribution or improvement potential.
- Threat reason could be limited to "competitor is visible" without deeper context.
- Citation opportunities recommended domains with limited surfaced rationale.

After:

- GEO Score V3 sample:
  - Overall: `85`
  - Confidence: `88`
  - Expected gain: `+16`
  - Entity component: `7.5/15`, improvement potential `+7.5`
  - Citation component: `15.2/20`, improvement potential `+4.8`

- Citation Authority sample:
  - Domain: `sama.gov.sa`
  - Citation value: `47`
  - Difficulty: `51`
  - Impact: `43`
  - Evidence rows: `10`

- Prompt Coverage sample:
  - Prompt: `Compare OrcaTech, Palo Alto Networks, Check Point, and Cyberoam for cybersecurity in Saudi Arabia. Include source URLs.`
  - Intent: `COMPARISON`
  - Brand appearing: `true`
  - Competitors appearing: `Palo Alto Networks`, `Check Point`, `Cyberoam`
  - Revenue potential: `HIGH`

- Threat V2 sample:
  - Competitor: `Palo Alto Networks`
  - Threat score: `13`
  - Confidence: `79`
  - Explanation: low operational threat because it appears in stored evidence, but no lost prompts, citation gaps, or entity domination were verified.

## Validation Evidence

Evidence directory: `evidence/geo-intelligence-accuracy/`

- `02-geo-score-v3-recalculate.json`
- `03-geo-score-v3.json`
- `04-citation-authority.json`
- `05-entity-intelligence.json`
- `06-prompt-coverage.json`
- `07-threats-v2.json`
- `08-opportunities-v3.json`
- `09-competitor-intelligence.json`
- `10-report-v3-create.json`
- `11-report-v3-download.pdf`
- `12-database-evidence.json`
- `validation-summary.json`

## Validation Results

- GEO Score V3: `COMPLETED`, confidence `88`
- Citation Authority Engine: `COMPLETED`, confidence `83`, 8 rows
- Entity Intelligence Engine: `COMPLETED`, confidence `65`, 5 rows
- Prompt Coverage Engine: `COMPLETED`, confidence `81`, 2 rows
- Threat Engine V2: `COMPLETED`, confidence `79`, 3 rows
- Opportunity Engine V3: `COMPLETED`, confidence `82`, 11 rows
- Competitor Intelligence Engine: `COMPLETED`, confidence `84`, 3 rows
- Reports V3: generated and downloaded as PDF

## Database Evidence

For OrcaTech:

- V3 GEO score snapshots: `6`
- V3 report records: `4`
- Citation sources: `11`
- Citation opportunities: `8`

## Remaining Accuracy Gaps

- Entity extraction is deterministic and evidence-backed, but still text-match based. Later versions should add embeddings or local NLP for entity normalization.
- Benchmark quality still depends on sample size. Low sample sizes must continue returning `INSUFFICIENT_DATA`.
- Repeated validation runs create repeated V3 score/report rows. This is useful for history but should eventually be summarized by an intelligence-memory rollup.
