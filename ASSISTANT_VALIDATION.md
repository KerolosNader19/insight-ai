# Assistant Validation

Date: 2026-06-02

## Scope

Validate Ask Insight AI for the required questions:
- Why am I not appearing in Gemini?
- How can I outrank Competitor A?
- What GEO actions should I take this month?

## Implementation Behavior

The assistant endpoint:
1. Requires authenticated access.
2. Checks brand access through RBAC.
3. Retrieves stored analytics snapshots.
4. Retrieves recommendations.
5. Retrieves citations.
6. Retrieves prompts and latest response statuses.
7. Builds context.
8. Calls Groq first when available, otherwise Gemini.
9. Returns provider answer plus context and prompt.

If no provider key is configured, the endpoint returns HTTP 503. It does not fabricate an answer.

## Evidence

- Single assistant attempt: `evidence/api/07-assistant-no-provider-key.json`
- Required three-question run: `evidence/api/13-assistant-three-questions-no-provider-key.json`
- Provider configuration: `evidence/qa-validation.json`
- Fresh provider configuration: `evidence/ai/provider-config-check.json`
- Fresh required three-question run: `evidence/ai/assistant-run-attempts.json`

## Local Result

Provider configuration:
- `GROQ_API_KEY`: missing
- `GEMINI_API_KEY`: missing

Fresh live API validation after the user reported keys were configured:
- Shell environment: provider keys missing.
- Running API process environment: provider keys missing.
- All three required assistant calls returned HTTP 503.
- No provider answer was received.
- No assistant answer was stored as live-provider evidence.

All three required questions returned:
- Status: 503
- Message: `GROQ_API_KEY or GEMINI_API_KEY is required for Ask Insight AI`

## Conclusion

Ask Insight AI is implemented but **not validated as working end-to-end** in this environment because no Groq/Gemini credential is configured. The blocker is external configuration, and the current behavior is correct for an MVP that must not produce fake analytics or fake recommendations.

## Required Re-Test

After configuring `GROQ_API_KEY` or `GEMINI_API_KEY`:
1. Restart the API.
2. Re-run all three questions.
3. Save the returned prompt, context, provider answer, and API response.
4. Confirm the answer references stored OrcaTech analytics, citations, and competitors.
