# Insight AI - Technical Handover Documentation

## 1. Project Overview
Insight AI is an enterprise-grade SaaS platform designed for **Generative Engine Optimization (GEO)**. As AI search (ChatGPT, Perplexity, Gemini) replaces traditional search engines, brands need visibility into how they are being cited and recommended.

**Core Value Proposition:**
- Track brand mentions across top AI engines.
- Analyze sentiment and citation authority.
- Provide actionable recommendations to improve "AI Share of Voice."

---

## 2. Product Architecture
Insight AI is built as a **Turborepo monorepo**, ensuring consistency between the frontend, backend, and worker services.

### Technical Stack:
- **Frontend**: Next.js 15 (App Router), React 19, TailwindCSS, GSAP (Animations), Lenis (Smooth Scroll).
- **Backend API**: NestJS (TypeScript) - RESTful architecture.
- **AI Service**: FastAPI (Python) - NLP, Sentiment Analysis, and GEO Scoring.
- **Database**: PostgreSQL with Prisma ORM.
- **Task Queue**: BullMQ + Redis for background scraping and processing.
- **Automation**: Playwright for headless AI engine interaction.

---

## 3. Monorepo Structure
```text
├── apps/
│   ├── web/            # Next.js Marketing + Dashboard
│   ├── api/            # NestJS Backend API
│   ├── ai-service/     # FastAPI NLP/Scoring service
│   ├── workers/        # BullMQ background processors
│   └── marketing/      # Legacy static landing (deprecated)
├── packages/
│   ├── database/       # Prisma schema & client
│   ├── shared/         # Common TypeScript types/utilities
│   ├── ui/             # Shared React component library
│   └── config/         # Shared ESLint/TS configs
```

---

## 4. Frontend Implementation Details

### Internationalization (i18n) & RTL
We implemented a **zero-dependency, lightweight i18n system** optimized for performance:
- **State Management**: `i18nStore.ts` (Zustand) persists language/RTL state.
- **Translations**: Centralized dictionary in `lib/translations.ts`.
- **RTL Support**: Dynamic `dir` and `lang` attribute switching on `<html>` via the `Providers` layer.
- **Fonts**: `Cairo` (Arabic) and `Inter/Outfit` (English) are optimized via `next/font`.

### Global Modal System
A centralized `ModalManager` (Zustand-powered) handles complex dashboard flows:
- **Report Generation**: Simulates processing and PDF export.
- **Prompt Creation**: Form-based modal for adding tracking queries.
- **Confirmation**: Generic delete/warning dialogs.

---

## 5. Current MVP Status & Mocked Logic

| Feature | Status | Implementation Detail |
| :--- | :--- | :--- |
| **Landing Page** | ✅ Complete | Fully responsive, translated, and animated. |
| **Dashboard UI** | ✅ Complete | All routes (Analytics, Prompts, etc.) are functional. |
| **i18n / RTL** | ✅ Complete | Seamless EN/AR support across all views. |
| **Auth Flow** | 🔶 UI Ready | Pages are ready; backend connection is in progress. |
| **AI Scanning** | 🧪 Mocked | Dashboard shows simulated "AI Responses." |
| **Analytics** | 🧪 Simulated | Charts use pre-generated demo datasets. |
| **Report Export** | 🧪 Simulated | Logic triggers processing UI and simulated download. |

---

## 6. AI Tracking Pipeline (Intended Flow)
1. **User** submits a `Prompt`.
2. **API** pushes a job to **BullMQ**.
3. **Workers** use **Playwright** to scrape ChatGPT/Perplexity.
4. **AI-Service** (FastAPI) parses raw text for:
   - Mentions (Brand vs Competitor).
   - Citations (URL extraction).
   - Sentiment (NLP scoring).
5. **Database** updates `AnalyticsSnapshot`.

---

## 7. Next Development Phases

### Phase 1: Authentication & Data Persistence
- Connect `authStore` to NestJS `AuthModule`.
- Implement JWT rotation and persistent user sessions.

### Phase 2: Playwright Scraper Integration
- Finalize the Playwright workers to handle AI engine authentication and response extraction.

### Phase 3: Real-time Analytics
- Replace mock data in `VisibilityTrendChart` with actual time-series data from Prisma.

### Phase 4: Stripe Billing
- Integrate Stripe Checkout for the `Starter`, `Pro`, and `Enterprise` tiers.

---

## 8. Local Setup Instructions
1. **Environment Variables**: Copy `.env.example` to `.env` in `apps/web` and `apps/api`.
2. **Docker**: Run `npm run docker:up` to start Redis and PostgreSQL.
3. **Prisma**: Run `npx turbo run prisma:generate` then `npx turbo run prisma:migrate:dev`.
4. **Startup**: Run `npm run dev` to start all services via Turbo.

---

## 9. Technical Debt & Risks
- **Scraper Fragility**: AI engines (OpenAI, Perplexity) frequently change their UI, requiring robust Playwright selectors and regular maintenance.
- **NLP Cost**: High-volume sentiment analysis may require moving from a local FastAPI model to a managed LLM API (GPT-4o) for better accuracy.
- **Docker in Dev**: The current local Postgres/Redis setup needs hardening for staging/production parity.
