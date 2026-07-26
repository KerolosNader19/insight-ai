# Investor Brief

## Summary

Insight AI helps brands and agencies measure and improve visibility inside AI-generated answers. The MVP demonstrates the core business workflow: agencies add clients, track prompts, compare competitors, inspect citations, generate recommendations, and export white-label reports.

## Why It Matters

AI answers are changing discovery. If a brand is missing from ChatGPT, Gemini, Perplexity, or similar answer engines, it can disappear from high-intent research journeys. GEO is the emerging operating layer for making brands visible, trusted, and cited in those answers.

## MVP Proof

The current product shows:
- Agency management and RBAC.
- Client brands and competitor tracking.
- Prompt history and stored response analytics.
- Visibility score, share of voice, citations, sentiment, and recommendations from stored data.
- PDF visibility reports with agency branding metadata.
- English/Arabic UI and RTL readiness.
- Provider-ready Groq/Gemini integration.
- Production build validation across the MVP monorepo.

## Demo Positioning

Use the MVP as a first-customer and investor demo. It is not positioned as enterprise scale yet. The correct claim is:

> Insight AI has the core agency workflow, data model, analytics engine, and reporting layer needed for a launchable MVP. Live Groq/Gemini execution is ready to activate when keys are configured.

Avoid claiming:

> Live AI-provider execution has been validated in this environment.

That requires provider credentials and a successful prompt run.

## Business Model

- Starter: basic prompt tracking and reporting.
- Growth: multi-brand agency workflows, deeper analytics, recommendations.
- Agency: white-label reports, team roles, higher limits.

Stripe integration is architecturally present but checkout is deferred until billing credentials and pricing are finalized.

## Near-Term Roadmap

1. Configure provider keys and validate live Groq/Gemini prompt execution.
2. Run first customer pilots with agency workflow and PDF reporting.
3. Add scheduled prompt execution using retained BullMQ/Redis/Playwright infrastructure.
4. Harden billing checkout and usage limits after pricing is confirmed.
5. Schedule dependency compatibility upgrades for the remaining audit advisories.
