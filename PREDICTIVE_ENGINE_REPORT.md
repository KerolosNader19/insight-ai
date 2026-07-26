# Predictive Engine Report

Generated: 2026-06-08

## Scope

Implemented the Predictive GEO Engine as part of the GEO Copilot operating system. The engine forecasts GEO-related metrics using stored intelligence memory only.

The engine does not fabricate growth, revenue, or market assumptions.

## API

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/geo-copilot/forecast` | Generate 30/60/90 day metric forecasts for a brand from historical intelligence memory. |

Request:

```json
{
  "brandId": "3dfc86a2-9639-4482-b9d1-1a0ba7b755b7"
}
```

## Database

Model added: `GeoForecast`

Stored fields:

- `brandId`
- `horizonDays`
- `metricKey`
- `currentValue`
- `predictedValue`
- `delta`
- `direction`
- `assumptions`
- `evidence`
- `confidenceScore`
- `dataSource`
- `createdAt`

## Forecast Logic

The engine uses:

- Latest stored intelligence memory metric value
- Historical samples for that metric
- Velocity per day
- Forecast horizons of 30, 60, and 90 days
- Confidence based on sample availability and consistency

Forecast output includes:

- Current value
- Predicted value
- Delta
- Direction: `UP`, `DOWN`, or `STABLE`
- Assumptions
- Evidence
- Confidence score

If historical evidence is not available, the engine returns an insufficient-data style decision instead of inventing predictions.

## Validation Evidence

Evidence files:

- `evidence/geo-copilot-os/13-forecast.json`
- `evidence/geo-copilot-os/db-evidence.json`
- `evidence/geo-copilot-os/validation-summary.json`

Validated brand:

- OrcaTech

## Runtime Result

From `validation-summary.json`:

| Metric | Result |
| --- | ---: |
| HTTP status | 201 |
| Engine | `PREDICTIVE_GEO_ENGINE` |
| Forecast rows generated | 15 |

From `db-evidence.json`:

| Model | Count |
| --- | ---: |
| `GeoForecast` | 15 |

## Example Forecast Evidence

First forecast sample:

```json
{
  "horizonDays": 30,
  "metricKey": "threatScore.rollup",
  "currentValue": 13,
  "predictedValue": 13,
  "delta": 0,
  "direction": "STABLE",
  "confidenceScore": 90.7
}
```

Evidence attached:

- Current metric value
- Velocity per day
- Number of historical samples
- Source: Predictive GEO Engine

Assumptions attached:

- Forecast uses stored intelligence memory velocity only.
- No fake market growth or revenue assumptions are added.
- Multiple historical samples available.

## Screenshots

No UI screenshots were generated because this phase implemented API/backend forecasting only.

## Remaining Gaps

- Predictions improve as intelligence memory accumulates more real historical changes.
- Local model support can later be added behind the provider layer, but this engine itself does not depend on Groq or Gemini.
