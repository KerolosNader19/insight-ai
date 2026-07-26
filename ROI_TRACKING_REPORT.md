# ROI Tracking Report

Date: 2026-06-08

## Outcome

Implemented ROI tracking through `POST /geo-autopilot/roi/track`.

The MVP tracks impact without fabricating revenue values. It compares:

- GEO score
- SRO selection probability
- citation state
- expected action impact

## Validation Evidence

- API response: `evidence/geo-autopilot/14-roi-tracking.json`
- DB evidence: `evidence/geo-autopilot/17-db-evidence.json`

Stored validation record:

- ROI snapshot ID: `011e131e-16ce-4488-afdb-f9ab9602a875`
- ROI snapshots stored: 1

## Design Decision

No fake dollar values were added. The engine stores baseline/current metric state and deltas so future completed actions can be tied to measured visibility, citation, prompt coverage, and selection-probability changes.

## Specialist Review

- Product Manager decision: approved because customers need proof that work produces movement.
- Architect decision: persisted as `RoiImpactSnapshot`, independent from task records for audit history.
- AI Engineer decision: metric-based impact only; no unsupported revenue claims.
- Security review: brand-scoped and authenticated.
- Code review summary: simple and explainable impact calculation.
- Growth impact summary: strong retention lever because customers can see whether execution worked.
