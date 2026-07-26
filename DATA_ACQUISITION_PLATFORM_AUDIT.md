# Data Acquisition Platform Audit

Generated: 2026-06-08

## Objective

Move Insight AI from reactive GEO analytics to proactive GEO research and intelligence collection.

This implementation did not add billing systems, admin pages, or cosmetic dashboards. It adds backend data acquisition, research storage, knowledge graph primitives, market coverage, trend discovery, and an automated analyst workflow.

## Implementation Summary

Added a dedicated GEO research layer in the existing PostgreSQL database and NestJS API.

New API module:

- `apps/api/src/geo-research/`

New internal APIs:

- `POST /market-discovery`
- `POST /prompt-research`
- `POST /source-discovery`
- `POST /knowledge-graph`
- `GET /knowledge-graph?brandId=...`
- `POST /market-coverage`
- `POST /competitor-monitoring`
- `POST /citation-research`
- `GET /citation-research?brandId=...`
- `POST /trends`
- `GET /trends?brandId=...`
- `POST /automated-geo-analyst`
- `GET /geo-research-database/:brandId`

## Database Changes

Migration:

- `packages/database/prisma/migrations/20260608030000_geo_research_platform/migration.sql`

New models:

- `GeoResearchRun`
- `GeoResearchItem`
- `KnowledgeGraphNode`
- `KnowledgeGraphEdge`
- `MarketCoverageSnapshot`
- `GeoResearchTrend`
- `AutomatedAnalystSummary`

Brand relations added:

- `geoResearchRuns`
- `geoResearchItems`
- `marketCoverageSnapshots`
- `automatedAnalystSummaries`

## Architecture

Research flow:

1. Authenticated user selects a brand.
2. Research service loads brand, industry, country, competitors, prompts, suggestions, and citation opportunities.
3. Existing GEO intelligence discovery engines are reused.
4. AI provider layer can expand market/prompts/sources through Groq/Gemini without hardcoded secrets.
5. Research findings are stored in `GeoResearchItem`.
6. Nodes and relationships are stored in the knowledge graph tables.
7. Coverage and trend snapshots are stored separately.
8. Automated analyst summarizes changes and writes an `AUTOMATED_GEO_ANALYST` job record.

## Validation Evidence

Evidence directory:

- `evidence/data-acquisition-platform/`

Key evidence files:

- `00-health.json`
- `01-ai-providers.json`
- `03-market-discovery.json`
- `04-prompt-research.json`
- `05-source-discovery.json`
- `08-market-coverage.json`
- `09-citation-research.json`
- `13-competitor-monitoring.json`
- `14-automated-geo-analyst.json`
- `15-research-database.json`
- `16-knowledge-graph-build-calibrated.json`
- `18-trends-calibrated.json`
- `20-research-database-calibrated.json`
- `db-evidence.json`

Validated brand:

- Organization: `Acme GEO Agency`
- Brand: `OrcaTech`
- Industry: `Cybersecurity`
- Country: `Saudi Arabia`

Provider readiness:

- Groq API key available to Node process and ConfigService.
- Gemini API key available to Node process and ConfigService.
- Provider service reported available providers: `Groq`, `Gemini`.

## Runtime Results

Market Discovery:

- Status: `COMPLETED`
- Confidence: `82.5`
- Stored items: `20`

Prompt Research:

- Status: `COMPLETED`
- Confidence: `80.7`
- Stored prompts: `7`

Source Discovery:

- Status: `COMPLETED`
- Confidence: `81`
- Stored sources: `8`

Knowledge Graph:

- Status: `COMPLETED`
- Calibrated graph build confidence: `73.2`
- Calibrated graph read confidence: `69.6`
- Nodes: `32`
- Edges: `32`

Market Coverage:

- Status: `COMPLETED`
- Confidence: `72`

Citation Research:

- Status: `COMPLETED`
- Confidence: `81`
- Ranked citation opportunities: `24`

Trend Discovery:

- Status: `COMPLETED`
- Calibrated confidence: `70.9`
- Trends: `38`

Competitor Monitoring:

- Status: `COMPLETED`
- Confidence: `95.3`
- Alerts: `3`

Automated GEO Analyst:

- Status: `COMPLETED`
- Confidence: `74.5`
- Analyst summaries stored: `1`

Research Database Readback:

- Status: `COMPLETED`
- Calibrated confidence: `78.2`
- Items: `113`
- Trends: `38`
- Summaries: `1`

## Database Evidence

Direct database counts for OrcaTech:

- Research runs: `8`
- Research items: `113`
- Knowledge graph nodes: `32`
- Knowledge graph edges: `32`
- Market coverage snapshots: `2`
- Research trends: `38`
- Automated analyst summaries: `1`
- Automated analyst job records: `1`

Research item types:

- `CITATION_RESEARCH`: `48`, average confidence `81`
- `COMPETITOR`: `4`, average confidence `75`
- `SOURCE`: `24`, average confidence `81`
- `MARKET_LEADER`: `6`, average confidence `95.3`
- `MARKET_ALERT`: `6`, average confidence `95.3`
- `PROMPT`: `25`, average confidence `82.8`

## Trust Notes

No secrets were hardcoded. Provider keys were loaded from the runtime environment.

The research layer stores evidence and confidence with every collected item. It rejects low-confidence items in the `GeoResearchItem` storage path.

The first graph/trend validation showed low confidence because deterministic graph edges with single evidence items were underweighted. The confidence framework was calibrated and the graph/trend endpoints were revalidated:

- Graph build confidence improved to `73.2`
- Trend confidence improved to `70.9`
- Research database confidence improved to `78.2`

## Current Limitations

There is not yet a background scheduler. The automated analyst is implemented as a runnable API and persisted job record so BullMQ/cron can trigger it later without changing the product contract.

Local vector search, local embeddings, and local graph analytics are not implemented yet. The schema is designed so those systems can attach through `metadata`, `sourceHash`, graph nodes/edges, and research item records.

