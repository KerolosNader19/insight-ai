# GEO Execution Engine Report

Date: 2026-06-08

## Outcome

Implemented the GEO Execution Engine as an API-first execution layer. It converts existing SRO, GEO audit, prompt discovery, and citation intelligence into customer-usable assets: FAQ blocks, comparison page plans, service page plans, content briefs, schema packs, llms.txt packs, citation outreach briefs, and 90-day content calendars.

No new dashboard or cosmetic UI was added.

## Specialist Decisions

- Product Manager decision: approved because the feature moves Insight AI from analysis to customer deliverables a buyer can immediately publish, assign, or export.
- Architect decision: implemented as a focused NestJS module using existing auth/RBAC and Prisma patterns; no new project, queue, or dashboard surface was introduced.
- AI Engineer decision: asset generation is evidence-backed and provider-independent. It consumes stored intelligence from SRO, GEO audit, prompt discovery, and citation discovery instead of coupling business logic to Groq/Gemini.
- Security review: all routes require JWT auth and brand-level RBAC. Generation requires `ANALYST`; reads/exports require `VIEWER`. Asset access is scoped through brand membership.
- Code review summary: scoped implementation, no unrelated refactors, Prisma migration added, exports use deterministic local rendering for Markdown/PDF/DOCX.
- Growth impact summary: high. This creates sellable outputs: pages to create, schema to deploy, briefs for writers, citation outreach, and prioritized execution.

## Files Changed

- `apps/api/src/geo-execution/geo-execution.controller.ts`
- `apps/api/src/geo-execution/geo-execution.service.ts`
- `apps/api/src/geo-execution/geo-execution.module.ts`
- `apps/api/src/geo-execution/dto/geo-execution.dto.ts`
- `apps/api/src/app.module.ts`
- `packages/database/prisma/schema.prisma`
- `packages/database/prisma/migrations/20260608070000_geo_execution_engine/migration.sql`

## API Surface

- `GET /geo-execution/brands/:brandId/assets`
- `POST /geo-execution/faq`
- `POST /geo-execution/comparison-page`
- `POST /geo-execution/service-page`
- `POST /geo-execution/content-brief`
- `POST /geo-execution/schema`
- `POST /geo-execution/llms`
- `POST /geo-execution/citation-outreach`
- `POST /geo-execution/content-calendar`
- `GET /geo-execution/brands/:brandId/priorities`
- `GET /geo-execution/assets/:assetId/export?format=markdown|pdf|docx`

## Database Changes

Added `GeoExecutionAsset` to store generated execution outputs with:

- input and output JSON
- Markdown body
- evidence
- confidence score
- revenue impact
- GEO impact
- difficulty score
- priority score
- source and last verified timestamp

Indexes were added for organization history, brand/type history, priority ranking, and status.

## Runtime Validation

Validation used the existing SRO validation brand:

- Brand ID: `7c51d959-ea7b-48ca-80f0-e25aad4a50e7`
- Target prompt: `Best cybersecurity company in Saudi Arabia`
- URL: `https://www.cloudflare.com/application-services/products/cloudflare-one/`
- Existing evidence base: latest SRO analysis, competitor analyses, stored prompt suggestions, and citation intelligence.

Generated asset IDs:

- FAQ: `23d007d4-c583-436c-8b97-b2d424b32563`
- Comparison page: `a420ecc7-ddcb-4eef-9664-e550ef4ba339`
- Service page: `7956d017-e999-4d51-9d31-f840a62c823d`
- Content brief: `8d366425-52e6-4ab2-8ab2-11e2892924c3`
- Schema pack: `9afbaf1a-5d0b-47d9-8175-53dbaf3fffa6`
- llms.txt pack: `9f18f140-6b93-4fdb-8935-0da4e7e20112`
- Citation outreach: `69e78df4-7781-40f2-b4a3-d6d814418c10`
- Content calendar: `f2a4838d-2e00-49c2-9039-e8112c5404de`

## Evidence

- API response evidence: `evidence/geo-execution-engine/01-faq-generator.json` through `10-asset-list.json`
- DB evidence: `evidence/geo-execution-engine/11-db-evidence.json`
- Validation summary: `evidence/geo-execution-engine/validation-summary.json`
- API route screenshot: `evidence/geo-execution-engine/screenshots/swagger-geo-execution.png`
- Export preview screenshot: `evidence/geo-execution-engine/screenshots/faq-export-preview.png`

Database validation confirmed 8 stored `GeoExecutionAsset` records, one for each execution asset type, with average confidence score of 86.

## Export Evidence

- Markdown: `evidence/geo-execution-engine/exports/faq-generator.md`
- PDF: `evidence/geo-execution-engine/exports/faq-generator.pdf`
- DOCX: `evidence/geo-execution-engine/exports/faq-generator.docx`
- Content brief Markdown: `evidence/geo-execution-engine/exports/content-brief.md`
- Schema pack Markdown: `evidence/geo-execution-engine/exports/schema-pack.md`
- llms pack Markdown: `evidence/geo-execution-engine/exports/llms-pack.md`

File validation:

- `faq-generator.pdf`: PDF document, version 1.4, 3 pages
- `faq-generator.docx`: Microsoft Word 2007+
- Markdown exports: ASCII text

## Quality Gates

- `npx prisma validate --schema=packages/database/prisma/schema.prisma`: passed
- `npx prisma generate --schema=packages/database/prisma/schema.prisma`: passed
- `npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma`: passed
- `npm run build -w apps/api`: passed
- `npm run build`: passed

## Remaining Gaps

- The engine is API-first. No dedicated UI was added by design because this mission explicitly said not to create new dashboards.
- Export rendering is intentionally lightweight. A later polish pass can replace the minimal PDF/DOCX renderer with branded templates without changing the stored asset model.
