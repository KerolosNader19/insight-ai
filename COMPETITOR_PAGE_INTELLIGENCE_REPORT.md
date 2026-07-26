# Competitor Page Intelligence Report

Generated: 2026-06-08

## Summary

Implemented competitor page scraping and comparison as part of the SRO engine. For every tracked competitor with a website URL, the system now inspects the page and compares it against the customer URL.

## What Is Analyzed

- Content depth
- Extracted entities
- JSON-LD schema
- FAQ/question coverage
- Outbound citation domains
- Internal/external link signals
- Authority/proof language

## Stored Data

New Prisma model:

- `CompetitorPageAnalysis`

Stored fields include:

- competitor name and URL
- content depth score
- entity score
- schema score
- FAQ score
- citation score
- authority signal score
- overall score
- confidence score
- extracted entities
- citations/domains
- schema types
- evidence
- last verified timestamp

## Validation Evidence

Evidence files:

- `evidence/real-sro-engine/05-sro-analyze.json`
- `evidence/real-sro-engine/06-sro-list.json`
- `evidence/real-sro-engine/15-db-evidence.json`

Validated competitors:

- Palo Alto Networks: `https://www.paloaltonetworks.com/`
- CrowdStrike: `https://www.crowdstrike.com/`

Stored competitor records:

- `competitorPageAnalysisCount: 2`

Example evidence from the live run:

- CrowdStrike page scored `81` from `2325` words.
- Palo Alto Networks page scored `70` from `1868` words.
- CrowdStrike exposed `40` entities, `4` schema types, and `11` outbound domains.

## Agent Review

| Specialist | Review |
|---|---|
| Product Manager | High value because it answers “which competitor page wins?” |
| Backend Architect | Accepted as a child model of SRO analysis with indexed lookup by brand, competitor, and run. |
| AI Engineer | Deterministic extraction is appropriate for V1; future provider/local model synthesis can enrich the explanation. |
| Security Engineer | URL fetching is bounded and rejects local/private network targets. |
| Code Reviewer | JSON values are narrowed before use; Prisma relations validate. |
| Growth Hacker | Strong pre-sales proof because prospects can see named competitors and concrete page advantages. |

## Remaining Gaps

- Matching competitor landing pages are not discovered automatically yet.
- Some competitor sites may block server-side fetches; failures are stored as failed evidence instead of inferred claims.
