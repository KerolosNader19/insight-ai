# Market Opportunity Report

Date: 2026-06-08

## Outcome

Implemented a market opportunity engine that identifies underserved prompts, citations, entities, topics, and trend-backed opportunities across a market.

Validated market: `Cybersecurity Saudi Arabia`

## API Evidence

- `GET /market-opportunities`
- Evidence file: `evidence/market-intelligence-cloud/10-market-opportunities.json`
- Stored opportunities: 100

## Opportunity Fields

Each opportunity stores:

- Type
- Title
- Description
- Opportunity score
- Difficulty score
- Expected impact
- Evidence
- Confidence score
- Status
- Data source
- Last verified date

## Observed Opportunity Examples

Examples from validation:

- `Capture growing citation_research: saudiaramco.com`
- `Capture growing citation_research: paloaltonetworks.com`
- `Capture growing citation_research: stc.com.sa`
- `Capture growing citation_research: checkpoint.com`
- `Capture growing citation_research: sama.gov.sa`

Example evidence:

- `sama.gov.sa appeared 6 time(s) in recent research vs 0 in the previous window.`
- Source: `Trend Discovery Engine`
- Opportunity score: 100
- Confidence score: 77

## Customer Value

The opportunity engine answers:

- Which prompts are underserved?
- Which citation domains are gaining trust?
- Which entities or topics are emerging?
- Which opportunities have the highest expected impact?
- Which opportunities are still open in the market?

## Specialist Review

Product Manager decision: Approved. Market opportunities are among the highest willingness-to-pay features because they tell customers what to pursue before competitors do.

Senior Architect decision: Approved. Opportunities are persisted and statused so future workflows can track open, accepted, ignored, and completed opportunities.

AI Engineer decision: Approved. Opportunities are generated from stored market trends, citations, prompts, and brand gaps with evidence.

Security review: Approved. Opportunity APIs require authentication.

Code review summary: Passed build validation. Opportunity generation uses deterministic scoring and stored evidence.

Growth impact summary: Very high. This feature converts market intelligence into actionable demand capture.

