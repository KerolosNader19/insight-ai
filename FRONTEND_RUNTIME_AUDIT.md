# Frontend Runtime Audit

Date: June 2, 2026

## Result

The original user-reported issue was real at runtime. `localhost:3000` was being served by a stale Next process and later `.next` was corrupted by running `next build` while `next dev` was active.

After killing the stale process, clearing build artifacts, rebuilding, and restarting services, the customer frontend renders with Tailwind styling on `http://localhost:3000`.

## Root Cause

Two runtime problems were found:

- A stale `next-server` process was bound to port `3000` and returned HTTP `500`.
- Running `next build` while `next dev` was still using `apps/web/.next` caused missing webpack chunks/manifests, including errors like:
  - `Cannot find module './504.js'`
  - missing `routes-manifest.json`
  - page data failures for admin routes

Fix applied:

- Stopped stale port `3000` process.
- Stopped the active dev server before rebuilding.
- Removed stale artifacts:
  - `apps/web/.next`
  - `apps/web/.turbo`
  - `node_modules/.cache`
- Rebuilt web from a clean state.
- Restarted web on `localhost:3000`.
- Restarted API on `localhost:4000`.

## Config Verification

Checked:

- `apps/web/app/layout.tsx`
- `apps/web/app/globals.css`
- `apps/web/postcss.config.js`
- `apps/web/tailwind.config.js`
- `apps/web/package.json`

Findings:

- `globals.css` is imported from `app/layout.tsx`.
- `globals.css` includes `@tailwind base`, `@tailwind components`, and `@tailwind utilities`.
- `postcss.config.js` loads `tailwindcss` and `autoprefixer`.
- `tailwind.config.js` scans `app`, `components`, and shared UI package files.
- `next build` emits CSS successfully.

Runtime CSS proof:

- CSS file: `/_next/static/css/app/layout.css`
- Status: `200`
- Content type: `text/css; charset=UTF-8`
- Size: `57793` bytes
- Contains Tailwind/brand CSS tokens.
- Body background from browser: `rgb(12, 16, 24)`
- Body text color from browser: `rgb(248, 250, 252)`

## Build Validation

Commands run:

- `npm run build -w apps/api`: passed
- `npm run build -w apps/web`: passed after clean `.next` rebuild

Final web build generated `36` app routes, including the newly added:

- `/pricing`
- `/dashboard/billing`

## Routes Tested

Browser-tested routes on `http://localhost:3000`:

- `/`
- `/pricing`
- `/login`
- `/register`
- `/dashboard`
- `/dashboard/analytics`
- `/dashboard/prompts`
- `/dashboard/competitors`
- `/dashboard/recommendations`
- `/dashboard/reports`
- `/dashboard/settings`
- `/dashboard/billing`

All tested routes returned `200` after the clean restart.

## Screenshots

Evidence directory:

- `evidence/frontend-runtime/screenshots/`

Representative screenshots:

- `evidence/frontend-runtime/screenshots/home-clean-after-fix.png`
- `evidence/frontend-runtime/screenshots/home-desktop-en.png`
- `evidence/frontend-runtime/screenshots/home-desktop-ar.png`
- `evidence/frontend-runtime/screenshots/home-mobile-en.png`
- `evidence/frontend-runtime/screenshots/pricing-desktop-en.png`
- `evidence/frontend-runtime/screenshots/pricing-tablet-en.png`
- `evidence/frontend-runtime/screenshots/login-desktop-en.png`
- `evidence/frontend-runtime/screenshots/register-desktop-en.png`
- `evidence/frontend-runtime/screenshots/dashboard-overview-en.png`
- `evidence/frontend-runtime/screenshots/dashboard-analytics-en.png`
- `evidence/frontend-runtime/screenshots/dashboard-prompts-after-clean-build.png`
- `evidence/frontend-runtime/screenshots/dashboard-competitors-en.png`
- `evidence/frontend-runtime/screenshots/dashboard-recommendations-en.png`
- `evidence/frontend-runtime/screenshots/dashboard-reports-en.png`
- `evidence/frontend-runtime/screenshots/dashboard-settings-en.png`
- `evidence/frontend-runtime/screenshots/dashboard-billing-after-clean-build.png`
- `evidence/frontend-runtime/screenshots/dashboard-overview-ar.png`
- `evidence/frontend-runtime/screenshots/dashboard-mobile-en.png`
- `evidence/frontend-runtime/screenshots/notifications-mobile-after-fix.png`
- `evidence/frontend-runtime/screenshots/billing-manage-after-fix.png`

Machine-readable evidence:

- `evidence/frontend-runtime/runtime-audit-results.json`
- `evidence/frontend-runtime/focused-audit-results.json`

## UI Fixes Applied

Route fixes:

- Added `/pricing`.
- Added `/dashboard/billing`.
- Added billing route to dashboard sidebar.
- Updated public pricing links to use `/pricing`.

Runtime fixes:

- Made the notification button visible on mobile.
- Changed billing portal behavior from backend `500` to a handled message when Stripe customer data is unavailable.

Localization fixes:

- Localized auth loading/error text.
- Localized register agency label and placeholders.
- Localized chart labels and empty chart states.
- Localized footer headings and tagline.
- Localized blog and careers visible copy.
- Removed unused hardcoded English feature text from the marketing feature icon data.

## Button Validation

Browser-tested customer buttons:

- Create Brand: passed
- Add Competitor: passed
- Create Prompt: passed
- Run Prompt: passed, produced handled completed/failed state
- Generate Report: passed
- Ask Insight AI: passed, produced provider response or handled error state
- Notifications: initially failed on mobile because hidden; fixed and passed
- Billing Manage: initially produced API `500`; fixed and passed with handled unavailable/deferred state
- Settings Save Agency: passed

## Language And Layout Validation

English:

- Home, pricing, auth, and dashboard routes render styled in LTR.

Arabic:

- Home renders styled with Arabic text.
- Dashboard renders with `dir="rtl"` after Arabic locale is set.
- Arabic screenshot evidence: `home-desktop-ar.png` and `dashboard-overview-ar.png`.

Responsive:

- Desktop screenshots captured at `1440x1000`.
- Tablet pricing screenshot captured.
- Mobile home and dashboard screenshots captured.
- Mobile notifications verified after fix.

## Remaining Blockers

No remaining blockers for the requested customer-facing routes after the clean rebuild and fixes.

Notes:

- Dev-mode HMR and rapid route navigation produced some `net::ERR_ABORTED` entries for hot-update files and in-flight API requests. The focused rerun had no browser console errors and no HTTP `500` responses after the fixes.
- Super admin pages were not treated as part of the customer-facing validation scope in this pass.
