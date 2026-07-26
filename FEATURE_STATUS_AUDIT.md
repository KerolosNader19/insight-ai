# Insight AI Feature Status Audit

## Summary

This audit reflects the approved MVP direction: build on the existing project, keep future automation infrastructure deferred, make agency management critical, retain subscription architecture, and remove fake analytics from user-facing behavior.

## Feature Status

| Feature | Current Status | MVP Action |
| --- | --- | --- |
| Authentication | Partial backend login, disconnected UI | Implement register, login, me, persisted token, protected dashboard |
| Agency Management | Organization schema exists, no real workflow | Implement agency profile, team listing, role updates/invites baseline |
| RBAC | Enum only, no enforcement | Enforce organization membership and role capabilities in API |
| Subscription Plans | UI and Stripe service scaffold exist | Keep plans UI and plan data; defer live Stripe redirects if not configured |
| Brand Management | Schema and read endpoint only | Implement real CRUD with name, website, industry, country |
| Competitor Management | Schema and static UI | Implement real CRUD scoped to brand |
| Prompt Tracking | Schema and static UI | Implement CRUD and manual run endpoint |
| AI Engine Integration | Worker scrape concept, no API-first execution | Implement API-first Groq/Gemini execution path; keep worker infra deferred |
| Visibility Tracking | Schema exists, no connected flow | Store AI responses, mentions, positions, citations, snapshots |
| Share of Voice | Previously mocked UI/API | Calculate from stored brand and competitor mentions |
| Citation Tracking | Schema plus regex concept | Extract/store URLs/domains from real stored responses |
| Sentiment | Random in FastAPI service | Use AI provider output when available or deterministic neutral default |
| Recommendations | Previously static UI/service | Store recommendations based on real response/citation/mention data |
| Ask Insight AI | Absent | Add assistant endpoint using stored org/brand context |
| PDF Reports | Simulated UI | Generate MVP PDF output and report metadata from stored data |
| Analytics Dashboard | Static values | Replace with database-backed zero/empty-state-safe metrics |
| Playwright/BullMQ/Redis | Present but overkill for Phase 1 | Keep as deferred infrastructure for scheduled automation |
| FastAPI AI Service | Present, currently random analysis | Keep deferred; do not use random analytics for MVP user metrics |
| Marketing App | Separate Vite app with type errors | Defer as secondary; stabilize web app first |

## Verification Findings

- Prisma schema validation passes.
- API TypeScript check passes before MVP changes.
- Web TypeScript check fails due to chart prop mismatch, missing billing plan typing, and marketing component ref typing.
- Marketing TypeScript check fails in `Orb.tsx`.
- Seed script fails type-check due to relation and unique-field drift.

## MVP Acceptance Criteria

- A new agency owner can register, log in, and see their agency workspace.
- Owner/admin can manage agency members and roles.
- Users can create brands, competitors, and prompts.
- Prompt runs store real provider responses or explicit failed states if providers are not configured.
- Dashboard metrics are generated only from stored records.
- Reports download real generated output based on stored records.
- Subscription plan UI remains present without requiring live Stripe for MVP demos.
