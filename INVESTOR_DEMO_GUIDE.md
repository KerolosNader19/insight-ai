# Investor Demo Guide

## Demo Status

The demo is suitable for showing the product shell, agency workflow, real stored analytics, RBAC, PDF reports, and responsive/Arabic UI.

The demo is **not suitable for claiming live Groq/Gemini execution** until `GROQ_API_KEY` or `GEMINI_API_KEY` is configured and the E2E prompt run is repeated successfully.

## Local URLs

- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- Health: `http://localhost:4000/health`

## Login

- Owner: `demo@insight-ai.io`
- Password: `Password123!`

Other validation users:
- Manager: `manager@insight-ai.io`
- Analyst: `analyst@insight-ai.io`
- Viewer: `viewer@insight-ai.io`
- Password for all: `Password123!`

## Demo Data

Agency:
- Acme GEO Agency
- Plan: PRO
- Branding color: `#00f5d4`

Primary client brand:
- OrcaTech
- Website: `https://orcatech.sa`
- Industry: Cybersecurity
- Country: Saudi Arabia

Competitors:
- Competitor A
- Competitor B

Prompt:
- `Best cybersecurity company in Saudi Arabia`

Additional agency clients:
- Client A, created by Manager during RBAC validation.
- Client B, created by Owner during RBAC validation.

## What To Show

1. Dashboard overview
   - Stored GEO score, share of voice, mentions, citations.
   - Evidence screenshot: `evidence/screenshots/overview-desktop-en.png`

2. Analytics
   - Stored visibility trend and share of voice.
   - Evidence: `evidence/api/09-analytics-stored-data.json`
   - Screenshot: `evidence/screenshots/analytics-desktop-en.png`

3. Competitors
   - OrcaTech with Competitor A and Competitor B.
   - Screenshot: `evidence/screenshots/competitors-desktop-en.png`

4. Prompts
   - Stored prompt history and failed provider run clearly visible in API evidence.
   - Screenshot: `evidence/screenshots/prompts-desktop-en.png`

5. Reports
   - Generate/download a real PDF.
   - Evidence: `evidence/reports/pdf-inspection.txt`
   - Generated file: `apps/api/generated-reports/orcatech-1780415240934-visibility-report.pdf`

6. Agency settings
   - Team/RBAC workflow.
   - Screenshot: `evidence/screenshots/settings-desktop-en.png`

7. Arabic / RTL
   - Screenshots:
     - `evidence/screenshots/overview-desktop-ar-rtl.png`
     - `evidence/screenshots/overview-mobile-ar-rtl.png`

## Talk Track

Use this wording:

> This MVP already stores real prompt runs, mentions, citations, analytics snapshots, RBAC-controlled agency data, and generated PDF reports. The live AI provider path is implemented, but this local validation environment intentionally has no Groq/Gemini key, so the system blocks instead of inventing analysis.

Avoid saying:

> Live Groq/Gemini prompt execution is validated.

That is not yet true in this environment.

## Required Before A Live Investor Demo

1. Configure `GROQ_API_KEY` or `GEMINI_API_KEY`.
2. Restart `apps/api`.
3. Re-run the OrcaTech prompt.
4. Confirm a `COMPLETED` `AiResponse` with provider raw content, mentions, citations, sentiment, and recommendation records.
5. Regenerate the PDF so recommendations appear in the report.
6. Re-run the three Ask Insight AI questions.

Current provider configuration evidence:
- `evidence/ai/provider-config-check.json`
- Status: `blocked_missing_provider_key`

Use environment variables only:

```env
GROQ_API_KEY=<real key>
GROQ_MODEL=llama-3.1-8b-instant

GEMINI_API_KEY=<real key>
GEMINI_MODEL=gemini-1.5-flash
```

Do not place API keys in source files, docs, screenshots, seed data, or committed evidence.

## Evidence Index

- QA: `evidence/qa-validation.json`
- Screenshots: `evidence/screenshots/browser-validation.json`
- Analytics: `evidence/api/09-analytics-stored-data.json`
- Calculations: `evidence/db/visibility-share-citation-calculations.json`
- RBAC: `evidence/api/11-rbac-validation.json`, `evidence/api/12-rbac-forbidden-recheck.json`
- Reports: `evidence/api/10-report-create-download.json`, `evidence/reports/pdf-inspection.txt`
- Assistant block: `evidence/api/13-assistant-three-questions-no-provider-key.json`
- Provider config check: `evidence/ai/provider-config-check.json`
