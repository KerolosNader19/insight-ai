# Report Generation Test

Date: 2026-06-02

## Scope

Validate real PDF report creation, stored report metadata, download endpoint, generated file path, and report contents.

## Evidence

- API create/download: `evidence/api/10-report-create-download.json`
- Report DB record: `evidence/reports/latest-report-record.json`
- PDF inspection: `evidence/reports/pdf-inspection.txt`
- Generated PDF: `apps/api/generated-reports/orcatech-1780415240934-visibility-report.pdf`
- Fresh provider run attempts: `evidence/ai/provider-run-attempts.json`
- Fresh recommendation/report readiness check: `evidence/ai/recommendation-report-readiness.json`

## API Result

Endpoint:
- `POST /reports`
- `GET /reports/:id/download`

Report:
- ID: `2af79da7-567c-43ba-8e99-c5e0305da331`
- Title: `OrcaTech Visibility Report - Validation`
- Status: `GENERATED`
- File: `orcatech-1780415240934-visibility-report.pdf`
- File path: `/home/omar/Pictures/insight-ai/apps/api/generated-reports/orcatech-1780415240934-visibility-report.pdf`

Download:
- Status: 200.
- Content begins with `%PDF-1.4`.

## File Inspection

`file` output:
- PDF document, version 1.4, 1 page.

Extracted text:

```text
OrcaTech Visibility Report - Validation
Agency: Acme GEO Agency
Brand: OrcaTech
Generated: 2026-06-02T15:47:20.936Z
GEO Score: 48
Share of Voice: 20%
Brand Mentions: 1
Citations: 5
Recommendations: No recommendations stored yet.
```

## Agency / White Label

The generated report includes agency name and stored branding metadata in the report record:
- Agency: Acme GEO Agency
- Branding color: `#00f5d4`
- Logo URL: currently null

Logo rendering is structurally supported through organization metadata, but this validation report has no logo because no logo URL is configured.

## Conclusion

PDF generation and download are validated from stored analytics. Recommendation content is absent because AI-provider recommendation generation is blocked by missing Groq/Gemini credentials.

## Current Live AI Report Regeneration Attempt

After the user reported provider keys were configured, fresh Groq and Gemini prompt run attempts were executed through the API. Both stored `FAILED` `AiResponse` rows because the running API process still does not have `GROQ_API_KEY` or `GEMINI_API_KEY`.

No new provider response was received, so no new provider-backed recommendation was generated during this validation pass. A PDF was not regenerated and labeled as live-AI evidence because that would have reused older stored recommendations rather than satisfying the requirement for real AI-generated recommendation content from the current validation.

Required re-test:
1. Configure provider keys in the environment used by the running API.
2. Restart the API.
3. Re-run the OrcaTech prompt until `AiResponse.status` is `COMPLETED`.
4. Confirm a new `Recommendation` row tied to the new provider-backed snapshot.
5. Generate a new PDF and inspect that it includes the new recommendation title/content.
