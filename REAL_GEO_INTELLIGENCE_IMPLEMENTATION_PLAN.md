# Real GEO Intelligence V2 Implementation Plan

## Executive Summary

`REAL_GEO_INTELLIGENCE_V2.md` makes the correct product call: Insight AI now has enough SaaS infrastructure and enough customer-facing surfaces. The limiting factor is intelligence quality.

The current product can store brands, competitors, prompts, AI responses, mentions, citations, audits, recommendations, reports, and revenue-intelligence summaries. However, several insights are still generated from:

- Manually-entered competitors.
- Manually-entered prompts.
- Seeded demo data.
- Template prompt/opportunity generation.
- Regex entity extraction.
- Simple URL extraction.
- Deterministic but incomplete website audit checks.
- Simplified GEO score formulas.
- Report text assembled from stored summaries.

The V2 implementation should therefore focus on provenance, discovery, scoring transparency, and evidence-backed recommendations.

## Current Architecture Audit

### Applications

- `apps/web`: Next.js customer app and dashboard.
- `apps/api`: NestJS API for auth, organizations, brands, prompts, analytics, assistant, reports, billing, notifications, GEO audits, revenue intelligence.
- `packages/database`: Prisma schema, migrations, seed data.
- `apps/workers`: existing deferred worker infrastructure for automated tracking.
- Redis/BullMQ/Playwright remain deferred infrastructure.

### Data Flow Today

1. User creates organization/brand.
2. User manually creates competitors.
3. User manually creates prompts.
4. Prompt run calls Groq/Gemini through `AiProvidersService`.
5. Raw response is stored in `AiResponse`.
6. Mention extraction is regex matching against known brand/competitor names.
7. Citation extraction is URL regex over AI response text.
8. Analytics snapshots are derived from simple mention/citation counts.
9. GEO audit fetches a URL and computes deterministic page readiness scores.
10. Revenue intelligence reads stored prompts/responses/audits/citations and builds battlecards, opportunities, content gaps, citation map, and action plan.
11. Reports render a PDF from analytics plus revenue-intelligence summaries.

## Existing GEO Components To Reuse

### Database Models

Reuse:

- `Brand`: customer entity with `name`, `websiteUrl`, `industry`, `country`.
- `Competitor`: approved competitor list.
- `Prompt`: tracked AI-search prompt.
- `AiEngine`: provider identity.
- `AiResponse`: raw provider answer.
- `Mention`: extracted brand/competitor/entity mentions.
- `Citation`: extracted cited URLs/domains.
- `AnalyticsSnapshot`: historical metric snapshots.
- `Recommendation`: existing action rows, but must be upgraded or replaced for V2 evidence.
- `GeoAudit`: page audit storage.
- `Report`: PDF metadata.
- `Notification`: alert surface.
- `Job`: deferred infrastructure for discovery/monitoring jobs.

### API Modules

Reuse:

- `AuthModule`, `OrganizationsModule`, `BrandsModule`, RBAC helpers.
- `AiProvidersModule` for Groq/Gemini calls.
- `PromptsModule` for prompt execution persistence.
- `AnalyticsModule` for read APIs, with score logic replaced by V2 engines.
- `GeoAuditsModule` for URL/page inspection, with V2 score breakdown added.
- `RevenueIntelligenceModule` as the home for the V2 intelligence orchestration layer.
- `ReportsModule` for PDF generation, with report content upgraded to V2.
- `NotificationsModule` for future alerts.

### UI Surfaces

Reuse:

- `/dashboard/geo-audit` as the audit entry point.
- `/dashboard/why-not-recommended` as the core pre-sales intelligence page.
- `/dashboard/competitors` for approving discovered competitors.
- `/dashboard/prompts` for approving and running discovered prompts.
- `/dashboard/reports` for downloading V2 reports.
- Dashboard shell, auth store, `apiFetch`, i18n, RTL support.

## Existing GEO Systems Assessment

## 1. GEO Audit Engine

Status: partially real.

What works:

- Fetches real website HTML.
- Extracts title, meta description, canonical, JSON-LD types, questions, outbound domains, word count.
- Checks `llms.txt`, `llms-full.txt`, `robots.txt`, and `sitemap.xml`.
- Stores audit records in `GeoAudit`.

Low-confidence / placeholder aspects:

- Scoring weights do not match V2 required model.
- Authority score is based on shallow page text signals and outbound link count.
- Citation readiness is inferred from outbound links, not actual AI citation evidence.
- Entity coverage is not explicitly measured.
- Recommendations are deterministic templates.
- Audit result does not store per-component score evidence in a normalized way.

V2 action:

- Keep crawler/parser.
- Add V2 score breakdown model.
- Add entity coverage and evidence fields.
- Replace generic recommendations with evidence-backed quick wins and action plan items.

## 2. Prompt Execution

Status: real provider execution with weak analysis.

What works:

- Calls Groq first or Gemini fallback through environment-driven provider layer.
- Stores provider response.
- Stores engine, status, error, timing.
- Refuses to fake provider-backed results when keys are missing.

Low-confidence / placeholder aspects:

- Prompts are manually created.
- `executeSearch` asks the provider to include source URLs, but this is not equivalent to true search-grounded citation discovery.
- Mention extraction is regex over known brand/competitor names only.
- Competitor discovery does not exist.
- Prompt discovery does not exist.

V2 action:

- Add prompt discovery before tracking.
- Add competitor discovery before tracking.
- Add source/citation discovery as its own process.

## 3. Mentions, Citations, Analytics

Status: stored and queryable, but intelligence quality is low-medium.

What works:

- Mentions and citations are persisted.
- Share of voice is derived from stored mentions.
- Citation lists are derived from stored citations.
- Trends read `AnalyticsSnapshot`.

Low-confidence / placeholder aspects:

- Mentions only match known entity strings.
- No aliases, alternate spellings, Arabic/English variants, or fuzzy matching.
- Citations are only URLs present in AI answer text.
- No citation authority/relevance model beyond optional numeric `authorityScore`.
- No citation source type.
- GEO score in `PromptsService.storeAnalysis` is a simplistic formula:
  - brand mention = 45 points
  - owned citations = up to 40 points
  - share of voice multiplier
- No explicit schema/FAQ/content/entity score components in snapshots.

V2 action:

- Add normalized intelligence tables with source provenance.
- Add evidence-backed component scores.
- Add citation discovery beyond AI answer URLs.
- Add entity extraction and aliasing.

## 4. Revenue Intelligence / Battlecards / Opportunities

Status: useful product surface, but V1 logic.

What works:

- Builds competitor battlecards from stored mentions/citations.
- Builds citation opportunities from cited domains.
- Builds visibility opportunities from competitor dominance plus template prompts.
- Builds content gaps from audit checks and battlecard missing topics.
- Builds citation map graph data.
- Builds action plan with impact/difficulty.
- Exposes `/revenue-intelligence/why-not-recommended`.

Low-confidence / placeholder aspects:

- Visibility opportunities include hardcoded template prompts.
- Citation opportunity recommendation text is templated.
- Competitor gap logic requires manually-entered competitors.
- Topics are extracted by stopword removal from prompts.
- Threat scoring is not implemented.
- Lost revenue estimator is not implemented.
- Industry benchmark engine is not implemented.
- No confidence score per insight.
- No provenance object per insight.

V2 action:

- Keep orchestration module.
- Replace template generation with discovery engines.
- Every output must include `evidence`, `confidenceScore`, `dataSources`, and `lastVerifiedAt`.

## 5. Reports

Status: functional, but presentation and intelligence are V1.

What works:

- Generates real PDF files.
- Includes analytics and revenue-intelligence sections.
- Supports report metadata and download.
- PDF pagination was added.

Low-confidence / placeholder aspects:

- PDF rendering is a minimal hand-built PDF.
- Report text still includes older generic recommendations.
- No V2 score breakdown, threat analysis, benchmark percentiles, lost revenue, 60/90-day roadmap.
- Agency branding is present as text fields rather than polished branded layout.

V2 action:

- Reports V2 should consume V2 intelligence records only.
- Remove generic recommendation fallback.
- Add component score breakdown, threats, opportunities, quick wins, 30/60/90-day plan.

## Seeded / Mocked / Placeholder Data Audit

High-risk seed/demo items:

- `packages/database/seed.ts` creates `Competitor A`, `Competitor B`, and `.example` URLs.
- Stored fixture responses are deterministic generated strings, not provider results.
- `StoredFixture` engine is used in historical demo data.
- Seeded recommendations are text templates.
- Seeded citations may use `.example` competitor domains.
- Existing reports seeded as metadata only.

Plan:

- Keep seed data for demo/dev only.
- Add `sourceType` or equivalent provenance to V2 discovery records.
- UI and reports must label seeded/demo data if it is ever shown in demo mode.
- V2 engines must ignore `.example`, `StoredFixture`, and demo-only records for commercial-grade calculations unless explicitly in demo mode.

## Required Database Changes

### 1. Competitor Discovery

Add `CompetitorSuggestion`:

- `id`
- `brandId`
- `name`
- `websiteUrl`
- `description`
- `industry`
- `country`
- `confidenceScore`
- `evidence Json`
- `sources Json`
- `status`: `PENDING`, `APPROVED`, `REJECTED`, `EXPIRED`
- `approvedCompetitorId`
- `discoveredAt`
- timestamps

Indexes:

- `[brandId, status]`
- `[brandId, confidenceScore]`
- unique best-effort `[brandId, name]`

### 2. Prompt Discovery

Add `PromptSuggestion`:

- `id`
- `brandId`
- `queryText`
- `category`: `HIGH_INTENT`, `COMPARISON`, `COMMERCIAL`, `INFORMATIONAL`
- `intentScore`
- `opportunityScore`
- `confidenceScore`
- `difficultyScore`
- `expectedVisibilityGain`
- `evidence Json`
- `sourceCompetitorIds String[]`
- `status`: `PENDING`, `APPROVED`, `REJECTED`, `TRACKED`
- `approvedPromptId`
- timestamps

Indexes:

- `[brandId, status]`
- `[brandId, opportunityScore]`
- unique `[brandId, queryText]`

### 3. Citation Discovery

Add `CitationSource`:

- `id`
- `domain`
- `name`
- `url`
- `sourceType`: `MEDIA`, `ANALYST`, `GOVERNMENT`, `STANDARD`, `VENDOR`, `MARKETPLACE`, `COMMUNITY`, `ACADEMIC`, `OTHER`
- `authorityScore`
- `industryRelevance`
- `geoRelevance`
- `countryRelevance`
- `lastVerifiedAt`
- `evidence Json`
- timestamps

Add `CitationOpportunity`:

- `id`
- `brandId`
- `citationSourceId`
- `competitorId`
- `promptId`
- `aiResponseId`
- `opportunityScore`
- `competitorCitations`
- `brandCitations`
- `missingForBrand`
- `evidence Json`
- `recommendedAction`
- `status`: `OPEN`, `IN_PROGRESS`, `WON`, `DISMISSED`
- timestamps

Indexes:

- `[brandId, opportunityScore]`
- `[brandId, status]`
- `[citationSourceId]`

### 4. GEO Score V2

Add `GeoScoreSnapshot` or extend `AnalyticsSnapshot`.

Preferred: add `GeoScoreSnapshot` to avoid overloading current snapshots.

Fields:

- `id`
- `brandId`
- `engineId`
- `promptId?`
- `geoAuditId?`
- `snapshotDate`
- `overallScore`
- `schemaScore`
- `faqScore`
- `authorityScore`
- `contentScore`
- `citationScore`
- `entityScore`
- `breakdown Json`
- `evidence Json`
- `confidenceScore`
- timestamps

Unique/indexes:

- `[brandId, engineId, snapshotDate]` or no unique if multiple sources are merged.
- `[brandId, snapshotDate]`

### 5. Threat, Opportunities, Quick Wins, Benchmarks, Revenue

Add `GeoInsight` as a flexible normalized output table:

- `id`
- `brandId`
- `type`: `THREAT`, `VISIBILITY_OPPORTUNITY`, `QUICK_WIN`, `LOST_REVENUE`, `BENCHMARK`, `CONTENT_GAP`, `ACTION_PLAN`
- `title`
- `summary`
- `priority`
- `impactScore`
- `difficultyScore`
- `confidenceScore`
- `expectedVisibilityGain`
- `expectedScoreIncrease`
- `estimatedRevenueImpact`
- `evidence Json`
- `actions Json`
- `status`: `OPEN`, `ACTIONED`, `DISMISSED`
- `generatedAt`
- timestamps

Indexes:

- `[brandId, type]`
- `[brandId, priority]`
- `[brandId, confidenceScore]`

Add `IndustryBenchmark`:

- `id`
- `industry`
- `country`
- `sampleSize`
- `avgGeoScore`
- `avgCitationScore`
- `avgVisibilityScore`
- `avgAuthorityScore`
- `percentiles Json`
- `sourceDescription`
- `computedAt`

Indexes:

- `[industry, country]`
- `[computedAt]`

### 6. Provenance

For V2 credibility, each new table must preserve:

- input source
- provider/model
- prompt/query used
- fetched URLs
- evidence excerpts
- timestamp
- confidence score
- whether data is live, provider-generated, discovered, user-approved, or demo

## Required API Changes

Create a new `geo-intelligence` module or expand `RevenueIntelligenceModule` into subservices.

Recommended API namespace:

`/geo-intelligence`

Endpoints:

### Competitor Discovery

- `POST /geo-intelligence/brands/:brandId/discover-competitors`
- `GET /geo-intelligence/brands/:brandId/competitor-suggestions`
- `POST /geo-intelligence/competitor-suggestions/:id/approve`
- `POST /geo-intelligence/competitor-suggestions/:id/reject`

### Prompt Discovery

- `POST /geo-intelligence/brands/:brandId/discover-prompts`
- `GET /geo-intelligence/brands/:brandId/prompt-suggestions`
- `POST /geo-intelligence/prompt-suggestions/:id/approve`
- `POST /geo-intelligence/prompt-suggestions/:id/reject`

### Citation Discovery

- `POST /geo-intelligence/brands/:brandId/discover-citations`
- `GET /geo-intelligence/brands/:brandId/citation-opportunities`
- `PATCH /geo-intelligence/citation-opportunities/:id`

### GEO Score V2

- `POST /geo-intelligence/brands/:brandId/recalculate-geo-score`
- `GET /geo-intelligence/brands/:brandId/geo-score-v2`
- `GET /geo-intelligence/brands/:brandId/score-breakdown`

### Threats / Opportunities / Quick Wins / Revenue / Benchmarks

- `POST /geo-intelligence/brands/:brandId/generate-insights`
- `GET /geo-intelligence/brands/:brandId/threats`
- `GET /geo-intelligence/brands/:brandId/opportunities-v2`
- `GET /geo-intelligence/brands/:brandId/quick-wins`
- `GET /geo-intelligence/brands/:brandId/lost-revenue`
- `GET /geo-intelligence/brands/:brandId/benchmarks`

### Reports V2

- `POST /reports/v2`
- `GET /reports/:id/download` can remain.

RBAC:

- Discovery/generation requires `ANALYST`.
- Approval of discovered competitors/prompts requires `MANAGER`.
- Reads require `VIEWER`.

## Required UI Changes

Do not add broad dashboard pages. Integrate V2 into existing high-value surfaces.

### `/dashboard/why-not-recommended`

Upgrade existing page to consume V2 endpoints:

- Competitor suggestions and approval.
- Prompt suggestions and approval.
- GEO Score V2 breakdown.
- Threat analysis.
- Citation opportunities with evidence and status.
- Quick wins grouped by `1 Day`, `7 Days`, `30 Days`.
- Lost revenue estimator.
- Industry benchmark percentile.
- Reports V2 export.

### `/dashboard/geo-audit`

Upgrade:

- Show V2 score breakdown:
  - Schema 15%.
  - FAQ 15%.
  - Authority 15%.
  - Content 20%.
  - Citations 20%.
  - Entities 15%.
- Show evidence under each score.
- Remove generic recommendations.

### `/dashboard/competitors`

Add:

- Suggested competitors list.
- Confidence score.
- Evidence.
- Approve/reject.

### `/dashboard/prompts`

Add:

- Suggested prompt list.
- Category and opportunity score.
- Approve/reject/track.

### `/dashboard/reports`

Add:

- Reports V2 generation.
- Show whether report was generated from V2 evidence.

## Required AI Workflows

All AI workflows must return strict JSON and persist raw prompt, raw response, parsed output, provider/model, and confidence.

### 1. Competitor Discovery Workflow

Inputs:

- Brand name.
- Website text excerpts.
- Industry.
- Country.
- Existing competitor list.

Steps:

1. Fetch brand website.
2. Extract services/entities/market language.
3. Ask Groq/Gemini for likely competitors with:
   - website/domain if known
   - rationale
   - confidence
   - evidence category
4. Validate domains:
   - reject `.example`, fake domains, invalid URLs.
   - optionally fetch homepage metadata.
5. Store suggestions.

Output must include:

- competitor name
- website
- confidence
- evidence
- source

### 2. Prompt Discovery Workflow

Inputs:

- Brand profile.
- Website entities/services.
- Approved competitors.
- Country/region.

Steps:

1. Generate prompt candidates with strict categories.
2. Deduplicate against existing prompts.
3. Score by:
   - commercial intent
   - market relevance
   - competitor coverage
   - country relevance
   - content readiness
4. Store suggestions.

No hardcoded prompt templates except as fallback seed patterns used by the AI prompt, not returned directly as facts.

### 3. Citation Discovery Workflow

Inputs:

- Brand.
- Competitors.
- Prompt history.
- AI response citations.
- Competitor domains.

Steps:

1. Extract citation domains from stored AI responses.
2. For competitors, query AI provider for trusted sources in the industry/country.
3. Validate domains with live fetch/head requests when possible.
4. Classify source type.
5. Score authority/relevance:
   - domain recurrence in responses
   - competitor association
   - industry relevance from source content/title
   - country relevance
   - source type
6. Store `CitationSource` and `CitationOpportunity`.

### 4. GEO Score V2 Workflow

Inputs:

- Latest `GeoAudit`.
- Stored prompt visibility.
- Stored citations.
- Entity extraction.
- Citation opportunities.

Formula:

- Schema = 15%.
- FAQ Coverage = 15%.
- Authority Signals = 15%.
- Content Coverage = 20%.
- Citation Presence = 20%.
- Entity Coverage = 15%.

Each component must include:

- raw score
- weighted contribution
- evidence
- explanation
- confidence

### 5. Competitor Threat Workflow

Inputs:

- Approved competitors.
- Prompt dominance.
- citations.
- content coverage.
- GEO score components.

Output:

- threat score
- level: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`
- why they are stealing visibility
- evidence prompts/sources
- recommended response

### 6. Visibility Opportunity V2 Workflow

Inputs:

- Prompt suggestions.
- competitor dominance.
- citation gaps.
- content gaps.
- benchmarks.

Output:

- opportunity
- impact score
- difficulty score
- confidence score
- expected visibility gain
- evidence

### 7. Quick Wins Workflow

Inputs:

- V2 score breakdown.
- site audit evidence.
- content/citation gaps.

Output:

- 1-day actions
- 7-day actions
- 30-day actions
- expected gain
- difficulty
- evidence

### 8. Lost Revenue Estimator Workflow

Inputs:

- visibility share.
- prompt opportunity score.
- competitor dominance.
- optional customer-provided average deal size and conversion rate later.

For MVP:

- estimate lost visibility and lead impact qualitatively/relative, not fake dollar precision.
- if no customer revenue inputs exist, label output as directional.

Output:

- missed visibility percentage
- lost opportunity count
- lead impact level
- assumptions
- confidence

### 9. Industry Benchmark Workflow

Inputs:

- existing brands in same industry/country.
- public/seed-excluded historical snapshots.
- eventually anonymized customer corpus.

MVP limitation:

- only compute benchmarks when sample size is sufficient.
- if sample size is below threshold, return `INSUFFICIENT_DATA` instead of fake percentile.

Output:

- percentile metrics
- sample size
- confidence

### 10. Reports V2 Workflow

Inputs:

- V2 score snapshots.
- threats.
- opportunities.
- quick wins.
- citation analysis.
- action plans.
- benchmark/lost revenue if confidence threshold met.

Output:

- PDF with evidence-backed sections only.
- no generic recommendation fallback.

## Required Discovery Engines

### Competitor Discovery Engine

Priority: P0.

Implementation effort: Medium.

Core challenge:

- Avoid hallucinated competitors.
- Validate website/domain.
- Store confidence and approval state.

### Prompt Discovery Engine

Priority: P0.

Implementation effort: Medium.

Core challenge:

- Generate useful prompts without hardcoded examples.
- Categorize and score prompts with evidence.

### Real Citation Discovery Engine

Priority: P0.

Implementation effort: Medium-high.

Core challenge:

- Find actual domains AI trusts.
- Validate domains.
- Score source authority/relevance without using fake lists.

### GEO Score Engine V2

Priority: P0.

Implementation effort: Medium.

Core challenge:

- Merge audit evidence and prompt/citation evidence into transparent weighted scoring.

### Competitor Threat Engine

Priority: P1.

Implementation effort: Medium.

Core challenge:

- Generate actionable threat scores grounded in prompt dominance, citation advantage, and content coverage.

### Visibility Opportunity Engine V2

Priority: P1.

Implementation effort: Medium.

Core challenge:

- Avoid generic opportunities; require prompt/citation/content evidence.

### Quick Wins Engine

Priority: P1.

Implementation effort: Low-medium.

Core challenge:

- Turn evidence into time-bounded actions without templates masquerading as intelligence.

### Lost Revenue Estimator

Priority: P2.

Implementation effort: Low-medium.

Core challenge:

- Must be directional and assumption-labeled unless real customer revenue inputs exist.

### Industry Benchmark Engine

Priority: P2.

Implementation effort: Medium.

Core challenge:

- Avoid fake percentile claims when sample size is too small.

### Reports V2

Priority: P1.

Implementation effort: Medium.

Core challenge:

- Upgrade report quality while only including evidence-backed insights.

## Priority Ranking

| Rank | Engine | Priority | Customer Value | Effort | Reason |
|---:|---|---|---|---|---|
| 1 | Competitor Discovery Engine | P0 | Very high | Medium | Removes setup friction and makes intelligence feel automatic |
| 2 | Prompt Discovery Engine | P0 | Very high | Medium | Users do not know which prompts matter |
| 3 | Real Citation Discovery Engine | P0 | Very high | Medium-high | Shows trusted domains and concrete source targets |
| 4 | GEO Score Engine V2 | P0 | Very high | Medium | Makes scoring credible and explainable |
| 5 | Competitor Threat Engine | P1 | High | Medium | Creates urgency and clear competitive narrative |
| 6 | Visibility Opportunity Engine V2 | P1 | High | Medium | Converts evidence into attackable opportunities |
| 7 | Quick Wins Engine | P1 | High | Low-medium | Gives immediate action path |
| 8 | Reports V2 | P1 | High | Medium | Converts intelligence into sales/agency artifact |
| 9 | Lost Revenue Estimator | P2 | Medium-high | Low-medium | Creates urgency but must avoid fake precision |
| 10 | Industry Benchmark Engine | P2 | Medium-high | Medium | Valuable only with enough benchmark corpus |

Note: The user requested implementation order places Reports V2 last. The plan preserves that order after approval even though Reports V2 has P1 customer value.

## Implementation Order After Approval

Do not implement until this plan is approved.

### Step 1: Competitor Discovery Engine

Tasks:

- Add Prisma models/enums for `CompetitorSuggestion`.
- Add discovery service.
- Add endpoint to generate suggestions.
- Add approve/reject endpoints.
- Add UI approval panel in `/dashboard/competitors` and `/dashboard/why-not-recommended`.
- Validate real-domain filtering and confidence/provenance storage.

### Step 2: Prompt Discovery Engine

Tasks:

- Add `PromptSuggestion`.
- Generate prompts from brand, website entities, country, industry, and approved/discovered competitors.
- Categorize and score.
- Approve suggestion into `Prompt`.

### Step 3: Real Citation Discovery Engine

Tasks:

- Add `CitationSource` and `CitationOpportunity`.
- Extract domains from real AI responses.
- Discover trusted domains through AI provider + validation.
- Score authority/relevance.
- Store source evidence and opportunities.

### Step 4: GEO Score Engine V2

Tasks:

- Add `GeoScoreSnapshot`.
- Implement weighted model.
- Store component explanations.
- Update audit and revenue-intelligence reads.

### Step 5: Competitor Threat Engine

Tasks:

- Add threat insights as `GeoInsight`.
- Score competitors by visibility, citations, prompt dominance, content coverage.
- Expose threat endpoint and UI section.

### Step 6: Visibility Opportunity Engine V2

Tasks:

- Generate opportunities from stored V2 suggestions, threats, citation gaps, and content gaps.
- Persist `GeoInsight` rows.
- Include impact/difficulty/confidence/expected gain.

### Step 7: Quick Wins Engine

Tasks:

- Generate 1-day, 7-day, 30-day actions.
- Persist as `GeoInsight`.
- Ensure every quick win references evidence.

### Step 8: Lost Revenue Estimator

Tasks:

- Compute directional lost visibility/lead opportunity.
- Require assumptions and confidence.
- Avoid dollar values unless user supplies conversion/deal inputs.

### Step 9: Industry Benchmark Engine

Tasks:

- Add `IndustryBenchmark`.
- Compute only when sufficient sample size exists.
- Return insufficient-data state otherwise.

### Step 10: Reports V2

Tasks:

- Add V2 report type.
- Render score breakdown, threat analysis, opportunity analysis, citation analysis, quick wins, 30/60/90-day plan.
- Remove generic recommendations from V2 reports.
- Include evidence and confidence in report sections.

## Implementation Effort Estimate

| Area | Estimate |
|---|---:|
| Database migrations and Prisma generation | 0.5-1 day |
| Competitor Discovery Engine | 1-1.5 days |
| Prompt Discovery Engine | 1 day |
| Citation Discovery Engine | 1.5-2 days |
| GEO Score Engine V2 | 1 day |
| Threat + Opportunity + Quick Wins | 1.5-2 days |
| Lost Revenue + Benchmark | 1-1.5 days |
| Reports V2 | 1-1.5 days |
| UI integration | 1.5-2 days |
| Validation/evidence | 1 day |

Total: approximately 10-14 focused engineering days, depending on provider reliability and how strict domain validation becomes.

## Validation Requirements

Each completed engine must prove:

- Inputs used.
- Provider prompt/response if AI used.
- Domains fetched/validated if web discovery used.
- Database records created.
- Confidence scores and evidence populated.
- UI renders real data.
- Reports include only evidence-backed insights.

Required evidence after implementation:

- API response JSON files.
- Database record snapshots.
- Generated report PDF.
- Browser screenshots for changed customer surfaces.
- Build/type-check logs.

## Non-Negotiable Quality Rules

- No `.example` domains in V2 insights.
- No `StoredFixture` responses counted as commercial evidence.
- No hardcoded competitors.
- No hardcoded recommendations.
- No fake benchmarks.
- No fake revenue dollar estimates.
- Every insight must include evidence and confidence.
- If data is insufficient, return `INSUFFICIENT_DATA` instead of fabricating an answer.

## Approved Additional V2 Requirements

These requirements apply to every V2 engine and every customer-visible V2 insight.

### Requirement 1: Evidence First

Every insight shown to a customer must include:

- `evidence`
- `confidenceScore`
- `dataSource`
- `lastVerifiedAt`

No V2 insight may be displayed without supporting evidence. API responses should expose evidence directly, and UI/report surfaces must render either the evidence or an explicit insufficient-data state.

### Requirement 2: Trust Layer

Insight AI must never pretend certainty. If confidence is low or source data is too sparse, the engine must return:

`INSUFFICIENT_DATA`

instead of generating assumptions.

Examples:

- Benchmark sample too small.
- Not enough prompts.
- Not enough citations.
- Not enough competitors.
- Not enough visibility history.

### Requirement 3: GEO Intelligence Memory

Historical intelligence must be stored so users can answer:

> What changed since last month?

Track:

- GEO score changes.
- Threat changes.
- Citation changes.
- Opportunity changes.

Implementation note: all V2 tables must retain timestamps and generated evidence; recurring outputs should be persisted as `GeoInsight`/snapshot rows rather than only returned at request time.

### Requirement 4: Insight Explanation Engine

Every score must answer `WHY?`.

Each score must include:

- component breakdown
- positive drivers
- negative drivers
- evidence
- confidence

No black-box scores.

### Requirement 5: AI Provider Independence

V2 engines must follow:

Provider Layer -> Intelligence Layer -> Insight Layer

Business logic must not depend directly on Groq/Gemini request details. Engines should call a provider abstraction that can later route to:

- local LLMs
- local embedding models
- local RAG pipelines

### Requirement 6: Commercial Readiness

Every engine must be evaluated using:

> Would a customer pay for this?

If customer value does not outweigh effort, the feature should not be prioritized. The approved first implementation cut remains:

1. Competitor Discovery Engine
2. Prompt Discovery Engine
3. Real Citation Discovery Engine
4. GEO Score Engine V2

## Recommended First Technical Cut After Approval

Start with schema and shared primitives:

1. Add enums and models for:
   - `CompetitorSuggestion`
   - `PromptSuggestion`
   - `CitationSource`
   - `CitationOpportunity`
   - `GeoScoreSnapshot`
   - `GeoInsight`
   - `IndustryBenchmark`
2. Add shared `Evidence` JSON shape conventions in code comments/types.
3. Add `GeoIntelligenceModule`.
4. Implement Competitor Discovery Engine first, exactly as requested.
