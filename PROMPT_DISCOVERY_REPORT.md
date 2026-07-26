# Prompt Discovery Report

Generated: 2026-06-08

## Summary

Implemented two prompt discovery workflows under the SRO layer:

- Persona Fan-Out Engine
- Niche Explorer

Both persist results in the existing `PromptSuggestion` table and reuse the existing track/reject/approve workflow already present in `GeoIntelligenceService`.

## Persona Fan-Out

Input:

- brand
- core prompt

Generated personas:

- CEO
- CTO
- CISO
- SOC Manager
- Compliance Buyer
- Enterprise Buyer

Each suggestion includes:

- query text
- category
- intent score
- opportunity score
- difficulty score
- expected visibility gain
- confidence score
- evidence
- data source
- last verified date

## Niche Explorer

Input:

- brand
- industry
- country

Generated opportunity types:

- high-intent prompts
- commercial prompts
- comparison prompts
- informational prompts

## Validation Evidence

Evidence files:

- `evidence/real-sro-engine/07-persona-fanout.json`
- `evidence/real-sro-engine/08-niche-explorer.json`
- `evidence/real-sro-engine/15-db-evidence.json`

Observed database evidence:

- `sroPromptSuggestionCount: 12`

## Agent Review

| Specialist | Review |
|---|---|
| Product Manager | Approved because it finds more revenue-relevant prompts without requiring manual brainstorming. |
| Backend Architect | Reused `PromptSuggestion` and existing status workflow instead of creating duplicate prompt tables. |
| AI Engineer | Provider-independent V1 generation; future Groq/Gemini/local query expansion can improve candidates. |
| Security Engineer | Brand-scoped writes require `ANALYST` role. |
| Code Reviewer | No duplicate prompt records due to `brandId_queryText` upsert. |
| Growth Hacker | High pre-sales value because buyers see new AI-search opportunities they can attack. |

## Remaining Gaps

- Prompt discovery is template/deterministic in V1.
- Future versions should combine search suggestions, AI expansion, citation research, and historical conversion intent.
