# Citation Outreach Report

Generated: 2026-06-08

## Summary

Implemented citation outreach briefs generated from stored citation opportunities and competitor page citation/link evidence.

## Output Per Brief

- domain
- opportunity score
- authority level
- difficulty
- expected GEO impact
- why AI may trust the source
- how competitors are connected
- suggested outreach angle
- evidence
- confidence score
- data source
- last verified date

## Validation Evidence

Evidence files:

- `evidence/real-sro-engine/09-citation-outreach.json`
- `evidence/real-sro-engine/10-scorecard-json.json`
- `evidence/real-sro-engine/15-db-evidence.json`

Live output examples:

- `youtube.com`
- `linkedin.com`
- `paloaltonetworks.de`

Example evidence:

- `youtube.com appears in 2 competitor page citation/link signal(s).`
- source: `Competitor Page Scraper V1`
- confidence score: `75`

## Agent Review

| Specialist | Review |
|---|---|
| Product Manager | Approved because it tells customers where to get mentioned, not merely that citations matter. |
| Backend Architect | Uses existing citation opportunity data plus SRO competitor page evidence. |
| AI Engineer | Evidence-backed source ranking avoids hallucinated outreach targets. |
| Security Engineer | No external outreach is sent; the endpoint only generates scoped recommendations. |
| Code Reviewer | JSON citation arrays are narrowed to strings before map usage. |
| Growth Hacker | Very high agency value: agencies can turn this into PR/link-building retainers. |

## Remaining Gaps

- Domain authority is currently derived from stored scores or deterministic page evidence.
- Future versions should integrate authoritative domain metrics and local citation graph influence.
