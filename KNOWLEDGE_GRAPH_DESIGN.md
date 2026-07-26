# Knowledge Graph Design

Generated: 2026-06-08

## Purpose

The knowledge graph gives Insight AI a reusable market intelligence structure for future graph analysis, local RAG, embeddings, and source/entity relationship scoring.

It is intentionally generic and evidence-backed.

## Graph Tables

### KnowledgeGraphNode

Stores:

- `key`
- `type`
- `label`
- `url`
- `domain`
- `industry`
- `country`
- `evidence`
- `metadata`
- `confidenceScore`
- `dataSource`
- `firstSeenAt`
- `lastSeenAt`

Node types currently created:

- `BRAND`
- `COMPETITOR`
- `COMPETITOR_CANDIDATE`
- `INDUSTRY`
- `LOCATION`
- `PROMPT`
- `SERVICE`
- `SOURCE`

### KnowledgeGraphEdge

Stores:

- `fromNodeId`
- `toNodeId`
- `relationship`
- `weight`
- `evidence`
- `metadata`
- `confidenceScore`
- `dataSource`
- `firstSeenAt`
- `lastSeenAt`

Relationship types currently created:

- `operates_in_industry`
- `located_in`
- `competes_with`
- `targeted_by_prompt`
- `citation_opportunity_for`
- `cites_or_mentions`
- `mentioned_with`

## Validation Results

Validated brand:

- `OrcaTech`
- Industry: `Cybersecurity`
- Country: `Saudi Arabia`

Calibrated graph build:

- Status: `COMPLETED`
- Confidence: `73.2`
- Edges created/updated: `56`

Calibrated graph read:

- Status: `COMPLETED`
- Confidence: `69.6`
- Nodes returned: `32`
- Edges returned: `32`

Database node types:

- `BRAND`: `1`
- `COMPETITOR`: `2`
- `COMPETITOR_CANDIDATE`: `5`
- `INDUSTRY`: `1`
- `LOCATION`: `1`
- `PROMPT`: `11`
- `SERVICE`: `3`
- `SOURCE`: `8`

Database edge types:

- `operates_in_industry`: `1`
- `competes_with`: `7`
- `targeted_by_prompt`: `11`
- `mentioned_with`: `4`
- `located_in`: `1`
- `citation_opportunity_for`: `8`

Evidence:

- `evidence/data-acquisition-platform/16-knowledge-graph-build-calibrated.json`
- `evidence/data-acquisition-platform/17-knowledge-graph-read-calibrated.json`
- `evidence/data-acquisition-platform/db-evidence.json`

## Graph Construction Sources

The current graph builder uses:

- Brand profile
- Tracked competitors
- Competitor suggestions
- Tracked prompts
- Prompt suggestions
- Citation opportunities
- Citation sources
- Stored AI responses for deterministic entity extraction

## Future Local AI/Graph Extensions

The graph is ready for:

- Local embedding vectors per node
- Local vector search over node labels/evidence
- Local RAG context retrieval
- Graph centrality calculations
- Source influence scoring
- Competitor/source/entity clustering
- Trend propagation analysis

No external provider-specific fields are required for those future systems.

## Trust Rules

Every node and edge stores evidence and a confidence score.

Low-evidence graph facts are still stored for auditability, but exposed confidence makes the trust level visible.

The confidence calibration was adjusted after validation so deterministic stored-data graph facts no longer appear artificially weaker than provider-expanded research items.

