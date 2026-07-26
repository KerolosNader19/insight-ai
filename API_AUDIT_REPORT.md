# API Audit Report

Date: 2026-06-02

## Scope

Reviewed NestJS modules:
- Auth
- Organizations
- Brands
- Prompts
- Analytics
- Assistant
- Reports
- Billing
- Tracking

## Global API Controls

- `ValidationPipe` enabled with `whitelist`, `transform`, and `forbidNonWhitelisted`.
- Helmet and compression enabled.
- CORS is restricted by `ALLOWED_ORIGINS`, defaulting to `http://localhost:3000`.
- JWT guard protects dashboard/business endpoints.

## Fixes Applied

- Added `AiProvidersService` and `AiProvidersModule`.
- Centralized Groq/Gemini search, fallback, GEO analysis, and assistant context answering.
- Added `AskAssistantDto`.
- Tightened DTO validation for UUIDs, URLs, min lengths, billing plans, roles, and branding colors.
- Replaced raw backend `console.log` usage with Nest `Logger` in API runtime code.
- Preserved explicit failures when provider keys are missing.

## Validation

- `npx tsc -p apps/api/tsconfig.json --noEmit --incremental false` passes.
- `npm run build` completes the Nest build successfully through Turbo.
- `npm audit --omit=dev` still reports production advisories in Nest/BullMQ/bcrypt/Swagger transitive lines that require a planned compatibility upgrade.

## Endpoint Review

- `POST /auth/register`: creates user and default agency; validation present.
- `POST /auth/login`: validates credentials and returns user/org/JWT.
- `GET /auth/me`: authenticated identity and memberships.
- `GET/PATCH /organizations/:id`: RBAC-protected; update requires admin-level access.
- `GET/POST/PATCH/DELETE /organizations/:id/members`: team management with owner protections.
- `GET/POST/PATCH/DELETE /brands`: organization-scoped brand management.
- `POST/PATCH/DELETE /brands/:brandId/competitors`: manager-level competitor management.
- `GET/POST/PATCH/DELETE /prompts`: brand-scoped prompt management.
- `POST /prompts/:id/run`: analyst-level execution path; Groq/Gemini enabled by keys.
- `GET /analytics/*`: viewer-level stored-data analytics.
- `POST /assistant/ask`: viewer-level context builder and provider answer path.
- `GET/POST /reports`, `GET /reports/:id/download`: report metadata, PDF generation, download.
- `GET /tracking/queue-status`: deferred infrastructure health surface.
- Billing endpoints remain architecture/deferred surfaces.

## Remaining API Caveats

- Recommendation action/update endpoint is not implemented.
- Provider-backed tests require real or mocked provider credentials.
- Billing service contains Stripe webhook handling but checkout is intentionally deferred.
- Tracking queue is retained for future automation, not the current primary prompt path.
