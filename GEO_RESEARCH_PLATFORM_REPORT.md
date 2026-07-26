# GEO Research Platform Report

Generated: 2026-06-08

## Summary

Insight AI now has the foundation of a GEO Research Platform. It can collect market intelligence from existing stored evidence, AI provider research, prompt discovery, citation discovery, source discovery, and graph relationships.

The platform is no longer limited to customer-entered competitors/prompts. It can create research records, track sources, identify trends, build a graph, and generate analyst summaries.

## Research Database

The dedicated research layer stores:

- Prompts
- Competitors
- Sources
- Citations
- Market leaders
- Market alerts
- Trends
- Market coverage snapshots
- Automated analyst summaries
- Knowledge graph nodes and relationships

Primary tables:

- `GeoResearchRun`
- `GeoResearchItem`
- `KnowledgeGraphNode`
- `KnowledgeGraphEdge`
- `MarketCoverageSnapshot`
- `GeoResearchTrend`
- `AutomatedAnalystSummary`

## Market Discovery Engine

Input:

- Brand
- Website
- Industry
- Country

Output:

- Competitors
- Market leaders
- Industry authorities
- Industry publications
- Trusted domains

Validated result:

- Stored `20` research items
- Confidence `82.5`

Evidence:

- `evidence/data-acquisition-platform/03-market-discovery.json`

## Prompt Research Engine

Sources:

- Existing tracked prompts
- Existing prompt suggestions
- AI provider query expansion
- Competitor and industry context

Output:

- Prompt library records with category, importance, opportunity, difficulty, revenue potential, evidence, and confidence.

Validated result:

- Stored `7` prompt research rows in the direct prompt research run
- Total prompt research items in DB: `25`
- Average prompt confidence: `82.8`

Evidence:

- `evidence/data-acquisition-platform/04-prompt-research.json`
- `evidence/data-acquisition-platform/db-evidence.json`

## Source Discovery Engine

Sources:

- Citation opportunities
- Citation sources
- Existing prompt/citation evidence
- Provider-backed source expansion

Output:

- Trusted domains
- Publications
- Directories
- Government/academic/authority-style sources where available
- Authority, relevance, citation potential, evidence, and confidence

Validated result:

- Stored `8` source rows in the source discovery run
- Total source research items in DB: `24`
- Average source confidence: `81`

Evidence:

- `evidence/data-acquisition-platform/05-source-discovery.json`

## Citation Research Engine

Output:

- Ranked citation opportunities
- Citation scores
- Difficulty
- Competitor citation context
- Evidence and confidence

Validated result:

- Ranked `24` citation opportunities
- Confidence `81`

Evidence:

- `evidence/data-acquisition-platform/09-citation-research.json`
- `evidence/data-acquisition-platform/10-citation-research-read.json`

## Market Coverage Engine

Answers:

- What topics dominate this market?
- What services dominate this market?
- What entities dominate this market?
- What sources dominate this market?
- What gaps exist?

Validated result:

- Status `COMPLETED`
- Confidence `72`
- Stored `2` market coverage snapshots

Evidence:

- `evidence/data-acquisition-platform/08-market-coverage.json`

## Competitor Monitoring Engine

Monitors:

- New competitors
- Competitor growth
- Competitor threat movement
- Competitor-related changes

Validated result:

- Alerts: `3`
- Confidence: `95.3`
- Stored market alert rows: `6`

Evidence:

- `evidence/data-acquisition-platform/13-competitor-monitoring.json`

## Trend Discovery Engine

Detects:

- Emerging topics
- Emerging entities
- Emerging prompts
- Emerging competitors

Classifies:

- `EARLY`
- `GROWING`
- `MAINSTREAM`

Validated result after confidence calibration:

- Trends: `38`
- Confidence: `70.9`

Evidence:

- `evidence/data-acquisition-platform/18-trends-calibrated.json`
- `evidence/data-acquisition-platform/19-trends-read-calibrated.json`

## Automated GEO Analyst

The automated analyst asks:

- What changed?
- What new opportunities appeared?
- What threats emerged?
- What citations increased?
- What competitors grew?

Current implementation:

- Runnable through `POST /automated-geo-analyst`
- Persists `AutomatedAnalystSummary`
- Persists an `AUTOMATED_GEO_ANALYST` job record
- Ready for BullMQ/cron scheduling

Validated result:

- Status `COMPLETED`
- Confidence `74.5`
- Automated summaries: `1`
- Automated analyst jobs: `1`

Evidence:

- `evidence/data-acquisition-platform/14-automated-geo-analyst.json`
- `evidence/data-acquisition-platform/db-evidence.json`

## Local AI Readiness

The new layer is provider-independent at the business logic level:

- AI calls go through `AiProvidersService`.
- Research rows store `dataSource`, `sourceHash`, `metadata`, `evidence`, and `confidenceScore`.
- Knowledge graph nodes/edges can later connect to local embeddings, local vector search, and local graph analytics.
- Provider responses are not treated as truth unless they become evidence-backed stored rows.

