# AI Visibility Index Report

Date: 2026-06-08

## Outcome

Implemented industry-wide AI visibility indexing with market, industry, regional, and trend ranking support.

Validated market: `Cybersecurity Saudi Arabia`

## API Evidence

- `GET /visibility-index`
- Evidence file: `evidence/market-intelligence-cloud/05-visibility-index.json`
- Snapshot count: 17 market visibility snapshots

## Index Inputs

The visibility index uses market brand rows produced from:

- Customer GEO and SRO snapshots
- Competitor page analysis
- Prompt visibility signals
- Citation share
- Entity share
- Growth score
- Evidence and confidence per row

## Leaderboard Evidence

Related leaderboard evidence:

- `evidence/market-intelligence-cloud/04-leaderboards.json`

Observed leaderboard records include:

- Top GEO brand rows
- Top AI visible brand rows
- Top citation winner rows
- Top growing brand rows
- Top declining brand rows

## Customer Comparison

Benchmark evidence shows the customer brand `Cloudflare SRO 1780897908191` ranked third in the market benchmark response:

- GEO score: 82
- Visibility score: 78
- Prompt share of voice: 49
- Market sample size: 17

Evidence file:

- `evidence/market-intelligence-cloud/09-market-benchmarks.json`

## Specialist Review

Product Manager decision: Approved. Customers can now answer how they rank against their market, which is a core commercial value proposition.

Senior Architect decision: Approved. Visibility snapshots are stored separately from calculated leaderboards, allowing historical index tracking.

AI Engineer decision: Approved. The index uses existing evidence-backed signals rather than standalone AI text.

Security review: Approved. Index APIs require authentication and expose market summaries, not secrets.

Code review summary: Passed build validation after Prisma client regeneration.

Growth impact summary: High. AI visibility rank and market rank are premium metrics that can anchor sales conversations.

