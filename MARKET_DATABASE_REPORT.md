# Market Database Report

Date: 2026-06-08

## Outcome

Created the Market Database layer for storing industry-wide GEO intelligence independently from any single customer brand.

Validated market:

- Name: `Cybersecurity Saudi Arabia`
- Industry: `Cybersecurity`
- Region: `GCC`
- Country: `Saudi Arabia`
- Language: `en`
- Vertical: `Cybersecurity`
- Market ID: `8b6f3261-eab2-47b7-b8e9-5d3a014a2daf`

## Database Models Added

- `Market`
- `MarketBrand`
- `MarketPrompt`
- `MarketCitationDomain`
- `MarketTrend`
- `MarketVisibilitySnapshot`
- `MarketLeaderboardSnapshot`
- `MarketBenchmarkSnapshot`
- `MarketOpportunity`
- `InsightAiMarketIndexSnapshot`

Each market intelligence record stores evidence, confidence score, data source, and last verified timestamp.

## Database Evidence

Evidence file: `evidence/market-intelligence-cloud/15-db-evidence.json`

Summary file: `evidence/market-intelligence-cloud/validation-summary.json`

Deduplicated database counts:

- Markets: 1
- Market brands: 17
- Market prompts: 29
- Market citation domains: 8
- Market trends: 58
- Visibility snapshots: 17
- Leaderboard snapshots: 12
- Benchmark snapshots: 2
- Market opportunities: 100
- Insight AI index snapshots: 1

## Market Data Sources

The market sync uses existing product intelligence:

- Customer brands
- Tracked competitors
- AI-discovered competitors
- Prompt records
- Prompt suggestions
- Citation opportunities
- Citation sources
- GEO research trends
- GEO score snapshots
- SRO analysis
- Competitor page intelligence

## Validation

API evidence:

- `evidence/market-intelligence-cloud/01-market-sync.json`
- `evidence/market-intelligence-cloud/02-markets-list.json`
- `evidence/market-intelligence-cloud/03-industries.json`

Screenshot evidence:

- `evidence/market-intelligence-cloud/screenshots/swagger-market-intelligence.png`

## Specialist Review

Product Manager decision: Approved. A reusable market database is required before customers can compare themselves to a real market.

Senior Architect decision: Approved. Dedicated market tables preserve customer data while enabling market-level rollups and historical snapshots.

AI Engineer decision: Approved. The database stores source evidence and confidence so future local AI and graph analysis can reuse the same records.

Security review: Approved. Market records are accessed through authenticated APIs. No API keys or secrets are stored in market evidence.

Code review summary: Passed Prisma validation and migration deployment.

Growth impact summary: High. Market records create the base data asset for paid benchmark products and proprietary indexes.

