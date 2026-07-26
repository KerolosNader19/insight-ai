# Market Benchmark Report

Date: 2026-06-08

## Outcome

Implemented market benchmarks that compare a customer brand against market average, top 10%, and competitors.

Validated market: `Cybersecurity Saudi Arabia`

## API Evidence

- `GET /market-benchmarks`
- Evidence file: `evidence/market-intelligence-cloud/09-market-benchmarks.json`

## Benchmark Snapshot

Benchmark ID: `f633937d-3b6e-46e1-acfc-e5d19ef8f779`

Customer brand:

- Name: `Cloudflare SRO 1780897908191`
- Rank: 3
- GEO score: 82
- Visibility score: 78
- Prompt share of voice: 49
- Confidence score: 52

Market sample size: 17

Market average:

- GEO score: 13.71
- Visibility score: 13.47
- Citation score: 11.76
- Growth score: 31

Top 10% benchmark:

- GEO score: 81.5
- Visibility score: 79.5
- Citation score: 50
- Growth score: 39

Competitor examples:

- CrowdStrike: rank 1, GEO score 81, citation score 100, visibility score 81
- Palo Alto Networks: rank 2, GEO score 70, citation score 100, visibility score 70

## Evidence

The benchmark response includes the evidence claim:

`Benchmark calculated from 17 market brand row(s).`

## Specialist Review

Product Manager decision: Approved. Benchmarks make the product easier to sell because customers instantly see their position versus the market.

Senior Architect decision: Approved. Benchmarks are stored as immutable snapshots so historical comparison can be added without recalculating old states.

AI Engineer decision: Approved. Benchmark calculations are deterministic from stored market rows.

Security review: Approved. Benchmarks are available through authenticated routes.

Code review summary: Passed Prisma and API build validation.

Growth impact summary: High. Market average and top 10% comparisons are strong pre-sales and renewal hooks.

