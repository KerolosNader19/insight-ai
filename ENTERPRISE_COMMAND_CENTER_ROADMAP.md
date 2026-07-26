# Enterprise Command Center Implementation Roadmap

## Scope Decision

The Enterprise Command Center PRD is broader than the current MVP. The implementation is split into four phases so the product remains investor-demo ready now without pulling in enterprise complexity before the SaaS foundation is proven.

Phase 2 is the only phase implemented in this pass.

## Phase 2: Investor Demo Ready

Goal: give a super admin a credible command center for demonstrating platform control, customer operations, subscription visibility, revenue overview, support operations, audit visibility, feature flags, and AI/platform usage from real stored data.

Implemented capabilities:

- Super admin platform role and guarded `/admin` area.
- Executive dashboard with organizations, users, brands, subscriptions, revenue, prompt runs, AI requests, and report metrics.
- Organization management: list, view, suspend, activate, delete, and login-as.
- User management: list, update, suspend, activate, reset password, and delete.
- Subscription operations with manual subscription creation and update.
- Payment operations with manual payment creation and update.
- Plans management for starter, professional, agency, and enterprise plans.
- Coupons and promotions management.
- Revenue dashboard using stored subscription and payment data.
- AI monitoring dashboard using stored AI response and recommendation data.
- Platform analytics dashboard using stored organization, user, brand, prompt, response, report, and recommendation data.
- Feature flags management.
- Support ticket management.
- Audit log viewer.
- Platform settings and white-label settings UI.
- Arabic and English admin shell support with RTL layout.
- Demo seed data for super admin, plans, subscriptions, payments, support tickets, feature flags, custom limits, settings, and audit logs.

Validation completed:

- Prisma validation passed.
- Prisma migration deployed.
- Database seed completed.
- API build passed.
- Web build passed.
- Root `npm run build` passed.
- API super admin smoke passed for login, dashboard, non-admin block, organization list, and login-as.
- Browser smoke passed for 15 admin pages with no console errors or failed admin responses.

## Phase 3: Operational SaaS

Goal: turn the investor-ready admin surface into dependable SaaS operations for daily customer management.

Planned capabilities:

- Customer health center with health scores based on real usage.
- Churn risk center based on activity decline, inactive teams, no reports, low prompt activity, and subscription expiration.
- Customer success workspace with adoption, feature usage, team usage, report usage, GEO activity, retention actions, and upsell prompts.
- Stronger plan enforcement across brands, competitors, prompts, reports, team members, AI requests, white-label, and API access.
- Pagination, filtering, and export support across all admin tables.
- Support ticket comments, internal notes, assignment, escalation, and SLA states.
- Route normalization for PRD route names such as `/admin/audit`.
- Expanded audit events for every sensitive admin action.
- Admin RBAC split if needed, while preserving `SUPER_ADMIN` as the top-level role.

Estimated changes:

- Database: customer health snapshots, churn signals, support comments, support assignments, admin action metadata, usage limit counters, plan enforcement history.
- API: health scoring endpoints, churn endpoints, customer success endpoints, paginated list endpoints, support workflow endpoints, plan enforcement guards.
- UI: new customer health, churn, and customer success pages; table filtering; export controls; stronger empty/loading/error states.
- Infrastructure: scheduled jobs for health and churn calculations, background usage aggregation, optional email hooks for support workflows.

## Phase 4: Revenue Intelligence

Goal: add investor-grade revenue and cost intelligence from stored platform usage and billing data.

Planned capabilities:

- Revenue forecasting.
- ARPA, LTV, CAC, gross margin, agency revenue, and plan-mix analytics.
- Organization financials with revenue, AI cost, profit, margin, usage, and report profitability.
- AI cost intelligence by provider, organization, user, prompt, and report.
- Customer success recommendations for retention, reactivation, and upsell.
- Investor metrics dashboard and board-report exports.

Estimated changes:

- Database: revenue forecast snapshots, organization financial snapshots, AI cost ledger, provider token usage ledger, CAC inputs, investor report records.
- API: revenue intelligence endpoints, AI cost analytics endpoints, organization financial endpoints, investor reporting endpoints.
- UI: revenue intelligence dashboards, AI cost drilldowns, organization financial pages, investor dashboard, forecast charts.
- Infrastructure: scheduled financial aggregation, provider usage normalization, optional accounting/Stripe import jobs once Stripe is enabled.

## Phase 5: Enterprise Platform

Goal: evolve the platform into a full enterprise command system with advanced controls, intelligence, and integrations.

Planned capabilities:

- AI provider control center with provider health, routing, cost limits, model preferences, failover policies, and rate limits.
- Market intelligence across industries, brands, keywords, categories, and competitive movement.
- CRM and sales pipeline modules.
- Advanced white-label and agency hierarchy controls.
- Enterprise security, SSO, data residency, advanced audit exports, and compliance workflows.
- Warehouse-grade analytics and BI export integrations.

Estimated changes:

- Database: provider routing policies, rate limit policies, market intelligence entities, CRM accounts/deals/activities, investor datasets, compliance exports.
- API: provider control APIs, market intelligence APIs, CRM/sales APIs, enterprise security APIs, data export APIs.
- UI: provider command center, market intelligence explorer, CRM, sales, investors, compliance, and enterprise settings areas.
- Infrastructure: queue-backed automation, data warehouse/ETL layer, provider health monitors, SSO/OIDC integration, object storage lifecycle rules, observability dashboards.

## Phase 2 Change Summary

Database changes:

- Added `PlatformRole` with `USER` and `SUPER_ADMIN`.
- Added `platformRole` and `lastLoginAt` to users.
- Added organization status support.
- Added plans, subscriptions, payments, coupons, coupon redemptions, feature flags, support tickets, audit logs, custom limits, and organization settings.
- Added seed data for realistic investor demo operations.

API changes:

- Added guarded admin module and super admin guard.
- Added admin endpoints for dashboard, organizations, users, subscriptions, payments, plans, coupons, revenue, AI monitoring, feature flags, support, platform analytics, audit logs, and settings.
- Added super admin login-as support.
- Updated login to return platform role and block inactive users.

UI changes:

- Added `/admin` shell with role gate, responsive navigation, language switcher, logout, and RTL support.
- Added admin pages for dashboard, organizations, users, subscriptions, payments, plans, coupons, revenue, AI monitoring, features, support, platform, audit logs, settings, and white-label.
- Added forms and actions for operational workflows required by the Phase 2 command center.

Infrastructure changes:

- Added Prisma migration for super admin command-center data model.
- Updated seed workflow for investor demo data.
- Existing API, web, database, Redis, BullMQ, Playwright, and AI-service infrastructure remains compatible and deferred where not required for Phase 2.

## Deferred Infrastructure Compatibility

The existing Playwright, BullMQ, Redis, and AI service foundations are preserved. They are treated as deferred infrastructure for future automated AI tracking, background aggregation, scheduled health scoring, advanced cost calculation, and enterprise automation.

No Phase 3, Phase 4, or Phase 5 product scope was implemented in this pass beyond preserving compatible foundations and adding Phase 2-ready baseline data surfaces.
