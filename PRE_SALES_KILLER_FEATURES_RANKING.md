# Pre-Sales Killer Features Ranking

## Ranking Method

Features are ranked by:

- Customer willingness to pay.
- Implementation effort.
- Competitive advantage.
- Ability to create a "take my money" moment during pre-sales.

## Ranked Feature List

| Rank | Feature | Willingness To Pay | Effort | Competitive Advantage | Decision |
|---:|---|---|---|---|---|
| 1 | Why You're Not Recommended | Very high | Medium | Very high | Implement first |
| 2 | 30-Day GEO Action Plan | Very high | Low-medium | High | Implement first |
| 3 | Citation Opportunity Finder | Very high | Medium | High | Implement first |
| 4 | AI Search Competitor Battlecard | Very high | Medium | High | Implement first |
| 5 | Executive Audit PDF | Very high | Medium | Medium-high | Implement first |
| 6 | Content Gap Analyzer | High | Medium | High | Implement first as stored-data version |
| 7 | AI Visibility Opportunity Finder | High | Medium | Medium-high | Implement first as opportunity scoring |
| 8 | Agency White-Label Audit | High for agencies | Low | Medium | Already partly supported; improve through reports |
| 9 | AI Citation Map | Medium-high | Medium | Very high visually | Implement as graph data first |
| 10 | AI Search Monitoring Alerts | High | High | Medium-high | Next after core pre-sales page |

## Highest ROI Bundle

The highest ROI move is not to ship ten isolated tools. It is to build a single sales experience:

**Why You're Not Recommended**

This page should combine:

- GEO audit.
- Competitor battlecard.
- Citation opportunities.
- AI visibility opportunities.
- Content gaps.
- Citation map.
- 30-day action plan.
- Executive PDF export.

## Why This Comes First

This bundle directly answers the buyer's most important questions:

1. Why am I losing?
2. Who is winning?
3. Where are they cited?
4. What am I missing?
5. What should I do in the next 30 days?
6. Can I show this to my boss or client?

## Implementation Decision

Phase now implemented:

- Add `/revenue-intelligence/why-not-recommended` API.
- Add `/dashboard/why-not-recommended` page.
- Compute competitor battlecards from stored prompts, mentions, citations, and responses.
- Compute citation opportunities from domains AI already cites.
- Compute visibility opportunities from competitor-dominated prompts and industry/country templates.
- Compute content gaps from GEO audit checks, audit recommendations, prompts, and response evidence.
- Compute citation map graph data.
- Compute prioritized 30-day action plan.
- Upgrade PDF reports to include the intelligence bundle when a brand is selected.

Deferred:

- Scheduled monitoring alerts.
- Deep competitor page scraping.
- Interactive graph canvas.
- Local embeddings for semantic content gaps.
