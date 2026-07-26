# GEO Feature Audit

Generated: 2026-06-08

## Sources Reviewed

- Current Insight AI repository.
- `https://github.com/danishashko/geo-aeo-tracker`, cloned to `/tmp/geo-aeo-tracker`.
- Current vendor positioning from Semrush, Ahrefs, Profound, Peec AI, Otterly, and AthenaHQ public materials.

## Executive Finding

Insight AI already has the SaaS foundation and a large amount of GEO infrastructure. The product gap is buyer value. Customers do not pay because a dashboard exists; they pay when the product says:

1. Why you are not recommended.
2. Which competitor is winning.
3. Which citation sources matter.
4. Which page or topic to create.
5. What to do in the next 30 days.

The external GEO/AEO Tracker is valuable because it translates AI visibility into practical SEO/GEO work: SRO analysis, AEO site audit checks, citation opportunities, competitor battlecards, persona fan-out prompts, niche query discovery, automation, and drift alerts.

## Capabilities Extracted From Geo AEO Tracker

| Feature | Purpose | User Value | Input | Output | UI Requirements | Backend Requirements | Database Requirements | Competitive Advantage | Pay Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Multi-model AI visibility tracking | Query multiple AI/search engines for brand visibility. | Shows where the brand appears across ChatGPT, Perplexity, Gemini, Copilot, Google AI, and Grok. | Brand, prompt, selected providers. | AI responses, sources, brand mentions, competitor mentions, visibility score. | Prompt runner, provider selector, response browser. | Provider adapters, parallel runs, extraction. | Prompt runs, responses, mentions, citations. | Broader engine coverage. | High |
| Prompt Hub with tags | Manage tracking prompts. | Lets teams organize prompts by topic, funnel stage, or campaign. | Prompt text, tags. | Prompt library. | Prompt CRUD, tags, filters. | Prompt storage and tagging. | Prompt tags or metadata. | Operational clarity. | Medium |
| Persona Fan-Out | Generate persona-specific prompt variants. | Reveals how different buyers ask AI for recommendations. | Core prompt, personas. | Persona prompt queue. | Core prompt form, persona list, generated queue. | AI prompt expansion or deterministic templates. | Prompt suggestions with persona metadata. | Better prompt coverage than manual brainstorming. | High |
| Niche Explorer | Generate high-intent queries for a market. | Finds prompt opportunities customers did not know to monitor. | Niche, industry, country. | Query bank and trackable prompts. | Niche input, generated prompt list, track all. | AI query expansion, deduping, scoring. | Prompt library, opportunity scores. | Creates demand and new content ideas. | Very High |
| Visibility Analytics | Trend visibility over time. | Shows gains/losses and impact of actions. | Historical runs. | Trends, deltas, CSV export. | Trend chart, provider/prompt filters. | Snapshot comparison. | Analytics snapshots. | Monitoring proof. | High |
| Citation Opportunities | Find URLs/domains cited when brand is absent. | Tells customers where to get mentioned. | AI responses, sources, brand domains, competitors. | Domain and URL opportunity list, priority, CSV. | Domain/URL toggle, search, sort, export. | Citation grouping, competitor mention linkage. | Citation sources/opportunities. | Direct PR/outreach target list. | Very High |
| Competitor Battlecards | Explain competitors side-by-side. | Shows why competitors win and how to respond. | Competitors, responses, AI analysis. | Strengths, weaknesses, sentiment, sections. | Battlecard cards, expandable evidence. | Competitor profiling and LLM synthesis. | Competitor intelligence snapshots. | Sales-ready competitive explanation. | Very High |
| AEO Audit | Check page readiness for AI crawlers and answers. | Gives instant diagnosis before prompt history exists. | URL. | Score, checks, recommendations. | URL input, score, categorized checks. | HTML fetch, robots/llms/sitemap fetch, schema/content/rendering checks. | GeoAudit JSON checks. | Fast pre-sales wedge. | Very High |
| SRO Analysis | Analyze Selection Rate Optimization for a URL and keyword. | Shows how likely AI systems are to select/cite the page and what to change. | Target URL, keyword. | SRO score, grounding data, cross-platform citations, SERP rank, target/competitor page comparison, recommendations. | Stage runner, score, citation grid, SERP table, recommendations. | Gemini grounding, platform citation polling, SERP fetch, page scraping, competitor page scrape, LLM analysis. | SRO runs, platform citations, SERP snapshots, page scrape records, recommendations. | Turns GEO into a page-level optimization workflow. | Very High |
| Bulk SRO | Run SRO analysis across many URL/keyword pairs. | Lets agencies audit a client site quickly. | List of URLs and keywords. | Streamed per-item results. | Bulk upload/table/progress. | Queue/SSE or worker pipeline. | Batch run and item result tables. | Agency-scale paid audit. | High |
| Drift Alerts | Detect visibility changes automatically. | Alerts when visibility drops or competitors move. | Scheduled prompt runs. | Alerts with score deltas. | Alert center, dismiss controls. | Scheduled runs and comparison. | Alerts, deltas. | Retention and ongoing value. | High |
| Automation Templates | Schedule recurring tracking. | Product creates value while user is offline. | Schedule interval. | Recurring prompt runs and alerts. | Toggle, interval picker, last run. | Cron/BullMQ/repeat jobs. | Job history. | Sticky operational workflow. | High |

## Category A: Already Existing In Insight AI

- Authentication, organizations, agency accounts, RBAC, team management.
- Billing system, subscription plans, feature gating architecture.
- Brands, competitors, prompts, prompt execution, stored AI responses.
- Mentions, citations, analytics snapshots, recommendations, reports.
- GEO dashboard, AI assistant, Arabic/English support.
- GEO Audit Engine with URL analysis and stored audit history.
- Why You're Not Recommended page with battlecards, citation opportunities, content gaps, action plan, citation map.
- Citation Authority, Entity Intelligence, Prompt Coverage, Threat Engine, Opportunity Engine, Competitor Intelligence, Reports V3.
- Intelligence Memory, Learning Layer, Change Detection, Trend Analysis, GEO Copilot, Agency Copilot, Predictive Engine.

## Category B: Partially Implemented

- SRO-style page selection analysis: Insight AI audits pages, but does not yet fully combine AI grounding, cross-platform citations, SERP rank, competitor page scrape, and page-level LLM synthesis.
- Prompt discovery: exists, but needs stronger persona/fan-out and buyer-intent categorization.
- Citation opportunities: exists, but should add outreach briefs, source category, source authority, and “why AI trusts this source.”
- Competitor gap analysis: exists, but should incorporate competitor page scraping and content-pattern comparison.
- Monitoring alerts: notifications exist; autonomous scheduled drift detection is in progress and needs runtime validation before being treated as complete.
- Bulk audits: reports exist, but batch URL/keyword SRO audit is not a productized workflow.

## Category C: Missing And High Value

1. Full SRO Analysis Engine.
2. Bulk SRO / Agency Audit Batch.
3. Persona Fan-Out Prompt Discovery.
4. Niche Explorer with track-all prompt insertion.
5. SERP plus AI citation correlation.
6. Competitor page scrape comparison.
7. Citation outreach briefs.
8. Action plan with owner/status/effectiveness loop shown clearly in customer workflows.

## Category D: Future Enterprise Features

- Large search-backed prompt database.
- Social/source influence beyond websites: Reddit, YouTube, TikTok, forums, app marketplaces.
- AI crawler log analytics.
- Local LLM and local embedding pipeline.
- Local RAG over customer pages, AI responses, and competitor content.
- CMS publishing workflow with approval controls.
- Enterprise SSO, regional controls, advanced audit logs.

## Highest ROI Ranking

| Rank | Feature | Customer Willingness To Pay | Implementation Effort | Competitive Advantage | Decision |
| ---: | --- | --- | --- | --- | --- |
| 1 | SRO-enhanced GEO Audit | Very High | Low-Medium | Instant “why AI won’t select this page” diagnosis | Implement first |
| 2 | Citation Opportunity Finder | Very High | Medium | Gives exact domains to target | Expand next |
| 3 | Competitor Gap Battlecard | Very High | Medium | Explains why customer loses | Expand next |
| 4 | 30/60/90 GEO Roadmap | Very High | Medium | Converts intelligence into buying plan | Build into reports |
| 5 | Niche/Prompt Opportunity Finder | High | Medium | Creates new attack surface | Add after audit |
| 6 | AI Search Monitoring Alerts | High | Medium | Retention engine | Operationalize after scheduler validation |
| 7 | Bulk SRO Agency Audit | High | Medium-High | Agency sales wedge | Phase 2 |

## Implementation Started

The existing `GeoAuditsService` was upgraded with external tracker-derived AEO/SRO checks:

- AI bot access from `robots.txt`.
- `llms-full.txt` readiness.
- HTML language tag.
- page size.
- server-rendered content availability.
- client-side rendering risk.
- noscript fallback quality.
- JavaScript footprint.
- rendering-specific recommendations.
