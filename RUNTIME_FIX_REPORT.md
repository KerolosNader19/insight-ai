# Runtime Fix Report

Date: 2026-06-02

## Summary

The frontend runtime failure was fixed. The app now builds and runs without the `_document.js` `api.createContextKey is not a function` runtime error.

Final status:
- Homepage loads.
- Login and register pages load.
- Dashboard loads after login.
- Dashboard direct routes survive reload because auth hydration is now handled.
- Prompts, recommendations, reports, analytics, and settings pages load.
- English and Arabic/RTL switching works.

## Root Cause

The observed stack pointed to `.next/server/pages/_document.js`, but there is no source `apps/web/pages/_document.tsx`. The failing file was a generated Next dev artifact.

The root cause was a runtime/cache process mismatch:
- Multiple orphaned `next-server (v15.5.18)` processes were still running.
- The active app dependency tree was Next `15.5.19` with React `18.3.1`.
- Stale `.next` dev artifacts from older processes could be served at runtime.
- Deleting or rebuilding `.next` while a dev server was still running produced additional cache corruption such as missing `routes-manifest.json` and missing webpack pack files.

One separate app bug was found during browser validation:
- Dashboard layout redirected to `/login` before persisted Zustand auth finished hydrating.
- This caused direct dashboard route loads, such as `/dashboard/prompts`, to land on the login page even after a valid login.

## Investigation

Checked:
- `apps/web/pages/_document.tsx`: not present.
- `apps/web/app/layout.tsx`
- `apps/web/app/providers.tsx`
- Zustand auth/i18n stores
- React Query provider
- PostHog/analytics usage
- telemetry/provider searches
- dependency tree
- nested `node_modules`
- generated `.next/server/pages/_document.js`

Search results:
- No source usage of `createContextKey`.
- No installed package usage of `createContextKey`.
- No active PostHog provider remains in `apps/web`.
- No custom React context was involved in the failing path.

## Fixes Applied

Files changed:
- `apps/web/store/authStore.ts`
- `apps/web/app/dashboard/layout.tsx`
- `apps/web/app/layout.tsx`

Changes:
- Added `hasHydrated` to the persisted auth store.
- Set `hasHydrated` through Zustand `onRehydrateStorage`.
- Updated dashboard layout to wait for auth hydration before redirecting.
- Added a small loading spinner while auth hydration is pending.
- Added `data-scroll-behavior="smooth"` to root `<html>` to satisfy Next's smooth-scroll runtime warning.

Process/cache cleanup:
- Stopped orphaned Next processes.
- Removed stale web build/cache artifacts:
  - `apps/web/.next`
  - `node_modules/.cache`
  - `apps/web/.turbo`
- Restarted one clean Next dev server.

Dependency changes:
- None in this pass.

## Compatibility Verification

Commands:

```bash
npm ls react react-dom next @tanstack/react-query posthog-js --depth=1
npm run build
npx tsc -p apps/web/tsconfig.json --noEmit --incremental false
```

Results:
- React resolves to `18.3.1`.
- ReactDOM resolves to `18.3.1`.
- Next resolves to `15.5.19`.
- `@tanstack/react-query` resolves cleanly.
- `posthog-js` is not installed in the web app.
- No nested `apps/web/node_modules` exists.
- `npm run build` passed across the monorepo.
- Web TypeScript validation passed.

## Runtime Validation

Final dev server:
- `http://localhost:3000`
- Next `15.5.19`

HTTP route checks:
- `/`: 200
- `/login`: 200
- `/register`: 200
- `/dashboard`: 200
- `/dashboard/prompts`: 200
- `/dashboard/recommendations`: 200
- `/dashboard/reports`: 200
- `/dashboard/analytics`: 200
- `/dashboard/settings`: 200

Browser validation evidence:
- `evidence/web-runtime/browser-validation.json`
- Screenshots in `evidence/web-runtime/screenshots/`

Browser pass result:
- Pages/screenshots: 11
- Failed checks: 0
- Console issues: 0
- Page errors: 0
- Failed requests: 0

Screenshots captured:
- `homepage-en.png`
- `login-page.png`
- `dashboard-after-login.png`
- `dashboard-overview.png`
- `dashboard-prompts.png`
- `dashboard-recommendations.png`
- `dashboard-reports.png`
- `dashboard-analytics.png`
- `dashboard-settings.png`
- `dashboard-arabic-rtl.png`
- `register-page.png`

## Notes

The `_document.js` error was not fixed by editing `_document`; there is no source `_document` file. It was fixed by removing stale generated artifacts, stopping orphaned old Next processes, and restarting a single clean dev server.

The auth hydration fix is permanent application code and prevents dashboard route reloads from racing persisted authentication.
