# Agency Workflow Test

Date: 2026-06-02

## Scope

Validate agency management, client creation, team roles, and RBAC restrictions.

## Evidence

- Main RBAC run: `evidence/api/11-rbac-validation.json`
- Forbidden recheck with valid payloads: `evidence/api/12-rbac-forbidden-recheck.json`

## Agency

- Agency: Acme GEO Agency
- Organization ID: `deb65fb8-0665-473d-8d95-adbf165b2bbc`
- Plan: PRO
- Branding color: `#00f5d4`

## Users

- Owner: `demo@insight-ai.io`
- Manager: `manager@insight-ai.io`
- Analyst: `analyst@insight-ai.io`
- Viewer: `viewer@insight-ai.io`

All validation users use `Password123!` locally.

## Clients Created

Client A:
- Created by Manager.
- API status: 201.
- Brand, competitor, and prompt creation by Manager succeeded.

Client B:
- Created by Owner.
- API status: 201.

Evidence: `evidence/api/11-rbac-validation.json`

## RBAC Results

Owner:
- Updated agency settings.
- Status: 200.
- Result: full agency access confirmed.

Manager:
- Created Client A brand.
- Created Client A competitor.
- Created Client A prompt.
- Statuses: 201.
- Blocked from agency settings update.
- Status: 403.
- Result: management access confirmed without admin/owner powers.

Analyst:
- Read analytics.
- Status: 200.
- Ran a prompt.
- Status: 201.
- Prompt result failed only because `GEMINI_API_KEY` is missing.
- Blocked from brand creation.
- Status: 403.
- Result: analysis-only access confirmed.

Viewer:
- Read brands.
- Status: 200.
- Blocked from brand creation.
- Status: 403.
- Blocked from prompt execution.
- Status: 403.
- Result: read-only access confirmed.

## Conclusion

Agency management and RBAC are validated for MVP use. The Analyst prompt run proves authorization works, while provider execution remains blocked by missing AI credentials.
