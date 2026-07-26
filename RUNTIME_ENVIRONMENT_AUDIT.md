# Runtime Environment Audit

Date: 2026-06-02

## Executive Result

The runtime configuration bug was identified and fixed, but live AI validation is still blocked because the provider variables are not present in the environment file available to the running API.

No secrets were printed, hardcoded, copied from another project, or written to evidence.

## Exact Env File Used By The API

Before the fix:
- Running API cwd: `/home/omar/Pictures/insight-ai/apps/api`
- `ConfigModule.forRoot({ isGlobal: true })` used Nest's default `.env` lookup.
- That means the API looked for `/home/omar/Pictures/insight-ai/apps/api/.env`.
- `apps/api/.env` does not exist.
- The repo-root env file exists at `/home/omar/Pictures/insight-ai/.env`, but it was not explicitly loaded by the API.

After the fix:
- `apps/api/src/app.module.ts` explicitly loads:
  - `/home/omar/Pictures/insight-ai/.env`
  - the process-cwd `.env` as fallback
- `AiProvidersService` now reads values through Nest `ConfigService`.
- A redacted diagnostic endpoint was added at `GET /health/ai-providers`.

## Provider Variable Verification

Evidence:
- `evidence/runtime/env-file-presence-after-fix.txt`
- `evidence/runtime/after-fix-ai-provider-health.json`
- `evidence/runtime/post-fix-ai-flow.json`

Current `/home/omar/Pictures/insight-ai/.env`:
- `GROQ_API_KEY`: absent
- `GROQ_MODEL`: absent
- `GEMINI_API_KEY`: absent
- `GEMINI_MODEL`: absent
- `DATABASE_URL`: present
- `JWT_SECRET`: present

Current `/home/omar/Pictures/insight-ai/apps/api/.env`:
- file missing

After restart, `GET /health/ai-providers` returned:
- Node process `GROQ_API_KEY`: false
- Node process `GEMINI_API_KEY`: false
- `ConfigService` `GROQ_API_KEY`: false
- `ConfigService` `GEMINI_API_KEY`: false
- `AiProvidersService` available providers: empty

## Flow Trace

Environment:
- Only repo-root `.env` is available in this project.
- Provider keys are not present in that file.

ConfigModule:
- Before: default cwd lookup missed repo-root `.env`.
- After: explicit root env path is loaded.

ConfigService:
- After fix, `ConfigService` is reachable and checked through `/health/ai-providers`.
- It reports provider keys as absent.

AI Provider Service:
- Before: read raw `process.env`.
- After: reads `ConfigService`.
- It reports no available providers.

Prompt Execution:
- Groq explicit run returned stored failure: `GROQ_API_KEY is not configured`.
- Gemini explicit run returned stored failure: `GEMINI_API_KEY is not configured`.

AI Response Storage:
- Groq response ID: `4ba4cc9d-835a-426a-a853-c9981e92b911`
- Gemini response ID: `15a7fbd0-05ef-45bd-acbf-510e114a5183`
- Both rows were stored with `status = FAILED`.

## Where Values Were Lost

There were two separate issues:

1. API env-file lookup issue, now fixed.
   The API was started from `apps/api`, so default Nest env lookup targeted `apps/api/.env`, which does not exist. The root `.env` was not guaranteed to be loaded.

2. Provider variables are still not present in this project's runtime env.
   After explicitly loading the root `.env`, the API can verify env visibility through Node, `ConfigService`, and `AiProvidersService`. All three layers still report missing provider keys because `/home/omar/Pictures/insight-ai/.env` does not contain them.

## Fix Applied

Files changed:
- `apps/api/src/app.module.ts`
- `apps/api/src/ai-providers/ai-providers.service.ts`
- `apps/api/src/app.controller.ts`

Changes:
- Added explicit `ConfigModule` `envFilePath` for repo-root `.env`.
- Injected `ConfigService` into `AiProvidersService`.
- Replaced provider `process.env` reads with `ConfigService` reads.
- Added `AiProvidersService.diagnostics()`.
- Added redacted `GET /health/ai-providers` endpoint showing Node, ConfigService, and provider-service visibility.

Validation:
- `npx tsc -p apps/api/tsconfig.json --noEmit --incremental false` passed.
- `npm run build -w apps/api` passed.
- API restarted successfully in watch mode for validation.

## After-Fix Runtime Evidence

Evidence:
- `evidence/runtime/post-fix-ai-flow.json`
- `evidence/runtime/post-fix-db-records.json`
- `evidence/runtime/runtime-report-c3d7c1b3-9788-4263-b25e-c4f2047a4389.pdf`
- `evidence/runtime/runtime-report-text.txt`

Prompt execution:
- Groq HTTP status: 201
- Groq stored status: `FAILED`
- Groq error: `GROQ_API_KEY is not configured`
- Gemini HTTP status: 201
- Gemini stored status: `FAILED`
- Gemini error: `GEMINI_API_KEY is not configured`

Stored database records:
- Groq `AiResponse`: `4ba4cc9d-835a-426a-a853-c9981e92b911`
- Gemini `AiResponse`: `15a7fbd0-05ef-45bd-acbf-510e114a5183`
- Both have `rawContentLength: 0`, `mentionCount: 0`, and `citationCount: 0`.

Ask Insight AI:
- All three required questions returned HTTP 503.
- Message: `GROQ_API_KEY or GEMINI_API_KEY is required for Ask Insight AI`.

Analytics:
- Stored-data share of voice endpoint still works.
- Current stored OrcaTech share: `26.32%`.
- Total stored mentions: `38`.

PDF regeneration:
- A PDF was generated and downloaded successfully.
- Generated evidence PDF: `evidence/runtime/runtime-report-c3d7c1b3-9788-4263-b25e-c4f2047a4389.pdf`
- PDF text was extracted to `evidence/runtime/runtime-report-text.txt`.
- This PDF is not proof of a fresh live-AI recommendation because no provider response was received during this pass.

## Successful Provider Response Proof

Unavailable in this runtime.

The application is now correctly wired to read provider values through Nest runtime configuration, but the values are absent from the loaded environment. A successful provider response cannot be produced without placing real provider keys into the environment read by the API and restarting the API.

Required final step:

```env
GROQ_API_KEY=<real key>
GROQ_MODEL=llama-3.1-8b-instant

GEMINI_API_KEY=<real key>
GEMINI_MODEL=gemini-1.5-flash
```

Place these in `/home/omar/Pictures/insight-ai/.env` or in the process environment used to start `apps/api`, then restart the API and rerun the prompt validation.
