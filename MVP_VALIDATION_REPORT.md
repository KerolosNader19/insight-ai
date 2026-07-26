# MVP Validation Report

Date: 2026-06-02

## Executive Status

The MVP is **not fully validated as complete** because this environment does not have `GROQ_API_KEY` or `GEMINI_API_KEY` configured. The product now refuses to fake provider-backed AI responses, recommendations, or assistant answers.

Validated as working:
- Stored-data analytics: visibility, share of voice, citations, dashboard summaries.
- PDF report generation and download.
- Agency management, clients/brands, role-based access control.
- Dashboard page loading, screenshots, English/Arabic RTL, desktop/tablet/mobile smoke validation.
- TypeScript, Prisma, production build, API/web health.

Blocked until provider credentials are configured:
- Successful Groq/Gemini prompt execution.
- AI-generated GEO recommendations.
- Ask Insight AI provider answer generation.

## Provider Configuration

Evidence:
- `evidence/qa-validation.json`
- `evidence/ai/provider-config-check.json`
- `evidence/ai/provider-run-attempts.json`
- `evidence/ai/provider-db-records-after-attempt.json`

```json
{
  "GROQ_API_KEY": false,
  "GROQ_MODEL": null,
  "GEMINI_API_KEY": false,
  "GEMINI_MODEL": null,
  "validationStatus": "blocked_missing_provider_key"
}
```

Latest requested AI-provider validation on 2026-06-02 could not proceed because `.env` does not contain `GROQ_API_KEY`, `GROQ_MODEL`, `GEMINI_API_KEY`, or `GEMINI_MODEL`. No keys were hardcoded, printed, or written to evidence files.

Fresh validation attempt after the user reported keys were configured:
- Shell environment still reports all four provider variables missing.
- Live API processes also report all four provider variables missing.
- Groq run attempt stored `AiResponse` `4a49a55d-f06d-43eb-b5f9-a7fd6d836df8` with status `FAILED` and error `GROQ_API_KEY is not configured`.
- Gemini run attempt stored `AiResponse` `8d49858a-8a82-4282-a48b-937415320a5b` with status `FAILED` and error `GEMINI_API_KEY is not configured`.
- Both run attempts produced `rawContentLength: 0`, `mentionCount: 0`, and `citationCount: 0`.

Required before live AI validation:

```env
GROQ_API_KEY=<real key>
GROQ_MODEL=llama-3.1-8b-instant

GEMINI_API_KEY=<real key>
GEMINI_MODEL=gemini-1.5-flash
```

## End-To-End Prompt Execution

Scenario created:
- Brand: OrcaTech
- Competitors: Competitor A, Competitor B
- Prompt: `Best cybersecurity company in Saudi Arabia`

Evidence:
- Login: `evidence/api/01-login.json`
- Brand: `evidence/api/02-create-orcatech-brand.json`
- Competitors: `evidence/api/03-create-competitors.json`
- Prompt: `evidence/api/04-create-prompt.json`
- Run attempt: `evidence/api/05-run-prompt-no-provider-key.json`
- DB records: `evidence/db/orcatech-stored-fixture-records.json`

Result:
- API accepted the run request with HTTP 201.
- Provider selected: Gemini.
- Stored response status: `FAILED`.
- Stored error: `GEMINI_API_KEY is not configured`.
- No provider response, mentions, citations, sentiment, or AI recommendation could be produced from this run.

This is an honest block, not a pass.

Live provider re-validation remains pending. Once one real provider key is configured, repeat this same OrcaTech prompt run and replace the failed-provider evidence with:
- provider response body metadata
- `AiResponse.status = COMPLETED`
- stored mentions
- stored citations
- updated analytics snapshot/share of voice
- generated recommendation row
- regenerated PDF containing recommendation content

Current live-provider evidence is therefore a configuration block, not a successful AI validation.

## Stored-Data Analytics Validation

Evidence:
- API analytics: `evidence/api/09-analytics-stored-data.json`
- DB calculations: `evidence/db/visibility-share-citation-calculations.json`

Validated from stored database records:
- OrcaTech appears in one stored response at position 2.
- OrcaTech does not appear in a second stored response.
- Visibility frequency: 1 brand mention / 2 stored fixture responses = 50%.
- GEO score from stored snapshot: 48.
- Share of voice:
  - OrcaTech: 20%
  - Competitor A: 40%
  - Competitor B: 40%
- Citation domains:
  - `orcatech.sa`: 1
  - `competitor-a.example`: 2
  - `competitor-b.example`: 2

Note: `StoredFixture` data validates calculations and UI/report consumption. It does not replace provider-backed execution evidence.

## Citation Tracking

Evidence:
- API citation rows: `evidence/api/09-analytics-stored-data.json`
- DB grouped citation counts: `evidence/db/visibility-share-citation-calculations.json`

Stored URLs and domains were extracted and persisted. Competitor citation counts are derived by matching citation URLs to competitor website prefixes.

## GEO Recommendations

Status: blocked for current live validation.

Implementation now calls Groq/Gemini for analysis and recommendation text after a successful provider response. Since no provider keys are configured, the recommendation endpoint correctly returns an empty stored list for OrcaTech in `evidence/api/09-analytics-stored-data.json`.

Fresh evidence:
- `evidence/ai/recommendation-report-readiness.json`

The database contains older recommendation records from prior stored/demo data. The current Groq/Gemini provider attempts did not create a new recommendation because both provider calls failed before returning content. Those older rows were not used as proof of live AI generation.

## Ask Insight AI

Status: blocked for current live validation.

Evidence:
- Single assistant attempt: `evidence/api/07-assistant-no-provider-key.json`
- Required three questions: `evidence/api/13-assistant-three-questions-no-provider-key.json`
- Fresh required three-question run: `evidence/ai/assistant-run-attempts.json`

All assistant calls returned HTTP 503 with `GROQ_API_KEY or GEMINI_API_KEY is required for Ask Insight AI`.

## PDF Reports

Status: passed for real PDF generation from stored data.

Evidence:
- Create/download API: `evidence/api/10-report-create-download.json`
- Report DB record: `evidence/reports/latest-report-record.json`
- PDF inspection: `evidence/reports/pdf-inspection.txt`
- Generated file: `apps/api/generated-reports/orcatech-1780415240934-visibility-report.pdf`

PDF text includes:
- Brand: OrcaTech
- Agency: Acme GEO Agency
- GEO Score: 48
- Share of Voice: 20%
- Brand Mentions: 1
- Citations: 5

Recommendations are absent because provider-backed recommendation generation is blocked by missing keys.

Current live AI report regeneration was not performed because no new provider-backed recommendation was generated during this validation pass. Regenerating a report from older stored recommendations would not satisfy the user's requirement for real AI-generated recommendation evidence from the current configured-provider validation.

## Agency And RBAC

Status: passed for implemented roles and API restrictions.

Evidence:
- `evidence/api/11-rbac-validation.json`
- `evidence/api/12-rbac-forbidden-recheck.json`

Validated users:
- Owner: `demo@insight-ai.io`
- Manager: `manager@insight-ai.io`
- Analyst: `analyst@insight-ai.io`
- Viewer: `viewer@insight-ai.io`

Validated clients:
- Client A created by Manager.
- Client B created by Owner.

RBAC proof:
- Owner updated agency settings: 200.
- Manager created brand, competitor, prompt: 201.
- Manager blocked from agency settings update: 403.
- Analyst read analytics: 200.
- Analyst prompt run authorized: 201, then provider failed due key config.
- Analyst blocked from brand creation: 403.
- Viewer read brands: 200.
- Viewer blocked from brand creation: 403.
- Viewer blocked from prompt run: 403.

## Dashboard And UI

Status: passed smoke validation.

Evidence:
- Screenshot manifest: `evidence/screenshots/browser-validation.json`
- Screenshots:
  - `evidence/screenshots/overview-desktop-en.png`
  - `evidence/screenshots/analytics-desktop-en.png`
  - `evidence/screenshots/prompts-desktop-en.png`
  - `evidence/screenshots/competitors-desktop-en.png`
  - `evidence/screenshots/recommendations-desktop-en.png`
  - `evidence/screenshots/reports-desktop-en.png`
  - `evidence/screenshots/settings-desktop-en.png`
  - `evidence/screenshots/overview-tablet-en.png`
  - `evidence/screenshots/overview-mobile-en.png`
  - `evidence/screenshots/overview-desktop-ar-rtl.png`
  - `evidence/screenshots/overview-mobile-ar-rtl.png`

Playwright reported:
- 11 screenshots captured.
- 0 console issues.
- 0 failed requests.

Static web audit found no remaining matches for `console.log`, `href="#"`, `mock`, `fake`, `simulate`, `setTimeout`, old modal wiring, or old onboarding wiring in `apps/web`.

## QA

Evidence: `evidence/qa-validation.json`

Passed:
- API TypeScript check.
- Web TypeScript check.
- Prisma schema validation.
- Production build: `npm run build`.
- API health: `GET /health`.
- Web health: `GET /`.

## Final Success Criteria

- Prompt execution works: **blocked locally** by missing Groq/Gemini key.
- Visibility tracking works: **passed from stored data**.
- Share of voice works: **passed from stored data**.
- Citation tracking works: **passed from stored data**.
- GEO recommendations work: **blocked locally** by missing Groq/Gemini key.
- Ask Insight AI works: **blocked locally** by missing Groq/Gemini key.
- PDF reports work: **passed from stored data**.
- Agency management works: **passed**.
- RBAC works: **passed**.
- Dashboard works: **passed smoke validation**.
- Mobile works: **passed screenshot smoke validation**.
- Arabic works: **passed RTL screenshot smoke validation**.
- Investor demo works: **partially ready**; full AI demo requires provider credentials.
