# Phase 4: Local AI Infrastructure

Goal: reduce cost and external dependency while improving privacy.

## Build

- Local LLM provider adapter.
- Local embeddings.
- Local vector store.
- Local RAG over pages, AI responses, citations, audits, and reports.
- Local entity extraction and content gap classifiers.
- Hybrid provider routing:
  - Groq/Gemini for MVP and live web tasks.
  - local models for repeat analysis, clustering, and explanation.

## Success Criteria

- Core GEO analysis can run without external LLM calls.
- Customer data can remain inside controlled infrastructure.
- Provider layer remains separate from intelligence logic.
