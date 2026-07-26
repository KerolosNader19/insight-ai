# Codebase Audit

Date: 2026-06-02

## Summary

The repository remains a Turborepo foundation with `apps/web`, `apps/api`, `packages/database`, shared packages, and deferred automation infrastructure. The hardening pass removed abandoned scaffold, reduced dependencies, centralized AI provider logic, added seed tooling, and updated stale docs.

Final verification:
- `npm run build` passes across API, web, marketing, and database packages.
- `npm ls react react-dom next zustand vite tailwindcss --depth=2` resolves cleanly.
- `npx prisma validate --schema=packages/database/prisma/schema.prisma` passes.
- API and web TypeScript checks pass.

## Removed

- `tmp_v4_backup/`: ignored Tailwind backup experiment.
- `apps/api/src/auth/auth.service.spec.ts.bak`: stale backup test file.
- `apps/marketing/vite.config.ts.timestamp-1778691782024-6a8d734191a34.mjs`: generated Vite timestamp artifact.
- `apps/web/components/dashboard/ModalManager.tsx`: unused simulated modal manager from old dashboard flows.
- `apps/web/components/dashboard/OnboardingWizard.tsx`: unused onboarding component with simulated delay.
- `apps/web/store/modalStore.ts`: unused modal store.
- `apps/web/lib/analytics.ts`: unused PostHog wrapper.
- `apps/marketing/src/components/ui/`: unused generated UI kit, 53 files.
- `apps/marketing/src/hooks/use-mobile.ts`: only used by removed UI kit.
- `apps/marketing/components.json` and `apps/marketing/info.md`: obsolete shadcn scaffold docs.
- App-local `node_modules` directories in `apps/web` and `apps/marketing` to avoid workspace shadowing.
- Stale app-local React 19/Vite 7 installs that were shadowing the intended workspace React 18/Vite 5 toolchain.

## Dependency Cleanup

Removed from `apps/web`:
- `axios`
- `framer-motion`
- `posthog-js`
- `tailwind-merge`

Removed from `apps/marketing`:
- unused shadcn/Radix dependency family
- `@react-three/drei`
- `cmdk`
- `date-fns`
- `embla-carousel-react`
- `input-otp`
- `next-themes`
- `react-day-picker`
- `react-hook-form`
- `react-resizable-panels`
- `react-router`
- `react-router-dom`
- `sonner`
- `vaul`
- `zod`
- `kimi-plugin-inspect-react`

Added:
- `packages/database`: `tsx` and `dotenv` for reliable demo seeding.
- Root `tailwindcss@3.4.19` pin so both frontend workspaces resolve the same Tailwind major.

## Architecture Improvements

- Added `apps/api/src/ai-providers` with a shared `AiProvidersService`.
- Prompt execution, GEO analysis, and Ask Insight AI now share provider logic.
- Groq-first/Gemini-fallback behavior is centralized.
- Assistant endpoint now uses a validation DTO.
- API DTOs now use stricter validation for UUIDs, URLs, minimum lengths, hex colors, and enums.
- Database schema now includes explicit indexes for MVP query paths.
- Investor seed data is deterministic and executable through `npm run db:seed`.

## Deferred But Intentionally Kept

- `apps/workers`
- BullMQ
- Redis
- Playwright
- `apps/ai-service`
- Stripe service and billing module
- `apps/marketing`

These are future-compatible infrastructure, not dead code.

## Remaining Caveats

- `npm audit --omit=dev` still reports moderate/high transitive advisories tied to Nest/BullMQ/bcrypt/Swagger dependency lines that require breaking upgrades through `npm audit fix --force`.
- After plain `npm audit fix`, full `npm audit` reports 38 advisories including dev tooling, and `npm audit --omit=dev` reports 21 production advisories. The remaining fixes require planned compatibility upgrades rather than a blind forced update.
- The audit no longer reports the prior critical Next issue after updating `next` to `^15.5.19`, but npm still flags a bundled `postcss` advisory through Next metadata. Handle this in a dedicated framework upgrade pass.
- `apps/marketing` production build passes but emits a large chunk warning from the deferred animation/3D landing stack.
- `packages/database/tsconfig.tsbuildinfo` is a tracked generated artifact and continues to be noisy when TypeScript runs.
