# Agency Copilot Report

Generated: 2026-06-08

## Scope

Implemented the agency-facing Copilot intelligence workflow for existing agency organizations. The workflow identifies client risk, client growth, opportunities, threats, and a weekly agency executive summary.

No new agency dashboard or admin UI was added.

## API

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/geo-copilot/agency-summary` | Generate agency-wide weekly summary from client brand intelligence, tasks, forecasts, and threat data. |

Request:

```json
{
  "organizationId": "568b6d21-4478-4d6c-ae9a-5205e5bf7084",
  "days": 7
}
```

## Database

Model added: `AgencyCopilotSummary`

Stored fields:

- `organizationId`
- `periodStart`
- `periodEnd`
- `summary`
- `atRiskClients`
- `fastGrowingClients`
- `opportunities`
- `threats`
- `evidence`
- `confidenceScore`
- `dataSource`
- `createdAt`

## Validation Evidence

Evidence files:

- `evidence/geo-copilot-os/15-agency-summary.json`
- `evidence/geo-copilot-os/db-evidence.json`
- `evidence/geo-copilot-os/validation-summary.json`

Validated organization:

- Acme GEO Agency

Validated client brands included:

- OrcaTech
- DesertPay
- Runtime Brand 1780438046715

## Runtime Result

From `validation-summary.json`:

| Metric | Result |
| --- | ---: |
| HTTP status | 201 |
| Engine | `AGENCY_COPILOT` |
| Confidence score | 81.9 |
| At-risk clients | 3 |
| Fast-growing clients | 0 |
| Opportunities | 5 |
| Threats | 3 |

From `db-evidence.json`:

| Model | Count |
| --- | ---: |
| `AgencyCopilotSummary` | 1 |

## Example Agency Decision

The agency summary identified OrcaTech as at risk because it had open Copilot tasks and flat forecast movement. The evidence attached to the row states:

- Number of open tasks
- Latest forecast delta
- Source: Agency Copilot

The summary also surfaced the highest opportunity tasks across client brands so an agency operator can decide where to spend the week.

## Trust Behavior

The agency summary does not invent revenue values. It ranks clients from stored operational evidence:

- Open tasks
- Forecast deltas
- Stored opportunity tasks
- Threat snapshots
- Confidence scores

## Screenshots

No UI screenshots were generated because the approved scope was backend/API Copilot workflow only.

## Remaining Gaps

- A scheduled weekly agency digest can be connected through BullMQ later.
- A UI could render the stored summaries later, but this phase intentionally avoided new dashboards.
