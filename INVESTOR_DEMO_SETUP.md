# Investor Demo Setup

Date: 2026-06-02

## Command

```bash
npm run db:seed
```

This runs `packages/database/seed.ts` with `tsx` and loads `.env`.

## Seeded Accounts

Password for all users:

```text
Password123!
```

Acme GEO Agency:
- Owner: `demo@insight-ai.io`
- Manager: `manager@insight-ai.io`
- Analyst: `analyst@insight-ai.io`
- Viewer: `viewer@insight-ai.io`

Gulf Growth Agency:
- Owner: `gulf-owner@insight-ai.io`
- Analyst: `gulf-analyst@insight-ai.io`

## Seeded Agencies And Brands

Acme GEO Agency:
- Plan: PRO
- Brands:
  - OrcaTech
  - DesertPay

Gulf Growth Agency:
- Plan: ENTERPRISE
- Brands:
  - MedinaHealth

## Seeded Totals

Evidence file:
- `evidence/db/investor-demo-seed-summary.json`

Totals from the verified seed run:
- Agencies: 2
- Brands: 3
- Prompts: 7
- Responses: 42
- Mentions: 114
- Citations: 114
- Analytics snapshots: 42
- Recommendations: 9
- Report records: 6

## Demo Flow

1. Login as `demo@insight-ai.io`.
2. Show Overview for stored GEO score, mentions, citations, and share of voice.
3. Open Competitors and switch between OrcaTech and DesertPay.
4. Open Analytics to show stored trend/citation/share data.
5. Open Prompts to show prompt history and run a prompt.
6. If provider keys are absent, explain that the product fails explicitly rather than fabricating AI output.
7. Open Reports and generate/download a PDF.
8. Open Settings and show Owner/Manager/Analyst/Viewer team model.
9. Switch to Arabic using the language selector for RTL proof.

## Provider Demo Requirement

For a live AI-provider demo, set one or both:
- `GROQ_API_KEY`
- `GEMINI_API_KEY`

Then restart the API and run a prompt. Without a key, prompt execution and Ask Insight AI correctly return provider configuration errors.
