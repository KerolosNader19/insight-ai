# AI Provider Setup

Date: 2026-06-02

## Implementation

Provider code lives in:
- `apps/api/src/ai-providers/ai-providers.module.ts`
- `apps/api/src/ai-providers/ai-providers.service.ts`

Used by:
- `apps/api/src/prompts/prompts.service.ts`
- `apps/api/src/assistant/assistant.service.ts`

## Environment Variables

Groq:

```bash
GROQ_API_KEY=...
GROQ_MODEL=llama-3.1-8b-instant
```

Gemini:

```bash
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-1.5-flash
```

## Behavior

Prompt execution:
- Uses explicit requested provider when `engine` is passed.
- Otherwise uses available providers with Groq first and Gemini fallback.
- Stores `AiResponse`, provider engine, raw content, status, errors, performance timing.
- On success, calls provider-backed GEO analysis and stores mentions, citations, snapshot, and recommendation.

Ask Insight AI:
- Retrieves stored brand analytics, recommendations, citations, prompts, latest response status.
- Builds provider prompt/context.
- Calls Groq first, then Gemini.
- Returns provider name, prompt, answer, and context.

No key behavior:
- The API returns a service unavailable error.
- No fake provider answer is generated.

## Activation Steps

1. Add `GROQ_API_KEY` or `GEMINI_API_KEY` to `.env`.
2. Restart `apps/api`.
3. Run a prompt from `/dashboard/prompts`.
4. Confirm `AiResponse.status` is `COMPLETED`.
5. Confirm mentions/citations/snapshot/recommendation rows were stored.
6. Ask Insight AI from the API or UI once the assistant UI is exposed.

## Production Notes

- Keep provider prompts deterministic with low temperature.
- Log provider errors without storing secrets.
- Add request timeout/retry policy before high-volume usage.
- Add provider integration tests with mocked HTTP responses and one manual smoke test with real keys.
