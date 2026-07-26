# Implementation Roadmap

Generated: 2026-06-08

## Phase 1: Pre-Sales Product

Goal: make a prospect willing to pay after one audit.

Build:

- SRO-enhanced GEO Audit.
- Why You're Not Recommended as the core sales experience.
- Citation Opportunity Finder.
- Competitor Battlecards.
- 30-day GEO Action Plan.
- Executive Audit PDF.

Current implementation:

- Existing GEO audit was upgraded with AI crawler and rendering checks.
- Existing Why You're Not Recommended page already aggregates battlecards, citations, gaps, and action plan.

Success:

- A prospect enters a URL and receives a credible diagnosis plus a 30-day plan.

## Phase 2: Beta Product

Goal: turn audits into repeated workflows.

Build:

- Full SRO pipeline: grounding, cross-platform citations, SERP rank, page scrape, competitor page scrape, LLM synthesis.
- Persona Fan-Out Prompt Discovery.
- Niche Explorer with track/reject workflow.
- Citation outreach briefs.
- Bulk SRO agency audits.
- Monitoring alerts.

Success:

- Beta customers run weekly audits and complete recommended tasks.

## Phase 3: Commercial Product

Goal: paid SaaS and agency delivery.

Build:

- Multi-client agency operations.
- White-label reports.
- Scheduled monitoring.
- Task owner/status/effectiveness.
- Plan-based limits.
- Report automation.

Success:

- Agencies can sell GEO retainers using Insight AI deliverables.

## Phase 4: Local AI Infrastructure

Goal: reduce external API cost and prepare for privacy-sensitive customers.

Build:

- Local LLM provider adapter.
- Local embeddings.
- Local RAG over customer pages, AI responses, citations, and reports.
- Local page/content classifier.
- Hybrid Groq/Gemini/local routing.

Success:

- Core analysis can run without depending entirely on external LLMs.

## Phase 5: Enterprise Platform

Goal: enterprise adoption after product-market proof.

Build:

- SSO/SAML.
- Advanced audit logs.
- Regional data controls.
- AI crawler log analytics.
- CMS publishing integrations.
- Revenue attribution.
- Enterprise API.

Success:

- Enterprise teams use Insight AI for AI search operations across many brands and markets.

## Immediate Highest-ROI Implementation

Implemented now:

1. Expanded existing `GeoAuditsService`.
2. Added SRO/AEO checks for AI crawler access, `llms-full.txt`, server-rendered content, CSR risk, noscript fallback, JS weight, page size, and language.
3. Added rendering/crawler recommendations with expected impact.

Next implementation target:

- Full SRO Analysis Engine storing URL + keyword scans with platform citations, SERP position, target page scrape, competitor page scrape, content gaps, and recommendations.
