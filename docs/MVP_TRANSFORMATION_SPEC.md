# Insight AI MVP Transformation Specification

Version: 1.0
Author: Omar Hany
Project: Insight AI

## Purpose

This document defines the transformation of the current Insight AI codebase into a realistic, low-cost, launchable MVP focused on GEO (Generative Engine Optimization) and AI Visibility Tracking.

The existing project already contains substantial frontend, backend, dashboard, analytics, reporting, multilingual, and SaaS infrastructure.

The objective is NOT to rebuild the product.

The objective is to audit, simplify, connect, stabilize, and transform the existing implementation into a production-capable MVP suitable for:

- Investor demonstrations
- Early adopters
- First paying customers
- Future scaling

The following requirements are mandatory.


You are taking over an existing project called Insight AI.

IMPORTANT:

Do NOT build a new project from scratch.

You must use the existing codebase as the foundation and transform it into a realistic, low-cost, launchable MVP.

The current codebase already contains:

* Next.js frontend
* NestJS backend
* PostgreSQL + Prisma
* Dashboard
* Authentication
* Organization structure
* Multi-language support
* GEO dashboards
* Reports UI
* Recommendation UI
* Analytics UI
* Marketing website
* Agency management concepts

However, much of the current implementation is over-engineered for an MVP and contains demo/mock functionality.

Your mission is to simplify, stabilize, connect, and prepare the product for real users.

━━━━━━━━━━━━━━━━━━━━━━

PRODUCT VISION

Insight AI is a GEO (Generative Engine Optimization) platform that helps brands and agencies understand how they appear inside AI engines such as:

* ChatGPT
* Gemini
* Perplexity
* Grok

Future:

* Claude
* DeepSeek

━━━━━━━━━━━━━━━━━━━━━━

MVP GOAL

The MVP must focus ONLY on:

1. Agency Management
2. Brand Management
3. Prompt Tracking
4. AI Visibility Tracking
5. AI Share of Voice
6. Citation Tracking
7. GEO Recommendations
8. AI Assistant
9. PDF Reports

Everything else should be postponed.

━━━━━━━━━━━━━━━━━━━━━━

CRITICAL REQUIREMENT

Before writing any code:

Analyze the ENTIRE existing project.

Create a document:

MVP_RESTRUCTURE_PLAN.md

This document must contain:

1. What currently exists
2. What works
3. What is mocked
4. What is incomplete
5. What should be removed
6. What should be simplified
7. What should be kept
8. Proposed final MVP architecture

Do not start coding until this analysis is complete.

━━━━━━━━━━━━━━━━━━━━━━

SIMPLIFICATION REQUIREMENTS

Remove or postpone:

* Enterprise-only features
* Complex experimentation systems
* Feature flag systems
* Advanced telemetry systems
* Complex BullMQ workflows not needed for MVP
* Unused microservices
* Unused workers
* Over-engineered abstractions
* Unused UI sections
* Fake dashboards

Keep only what directly supports the MVP.

━━━━━━━━━━━━━━━━━━━━━━

AUTHENTICATION

Implement:

Organizations

Roles:

* Owner
* Admin
* Manager
* Analyst
* Viewer

RBAC must actually work.

━━━━━━━━━━━━━━━━━━━━━━

AGENCY MANAGEMENT

Agency Account

Can manage:

* Multiple clients
* Multiple brands
* Team members

Structure:

Agency
├── Brand A
├── Brand B
├── Brand C

Each brand has:

* Prompts
* Competitors
* Reports
* Recommendations

━━━━━━━━━━━━━━━━━━━━━━

BRAND MANAGEMENT

Required fields:

* Brand Name
* Website
* Industry
* Country

Competitors:

* Add
* Edit
* Remove

━━━━━━━━━━━━━━━━━━━━━━

PROMPT TRACKING

Users can create prompts.

Examples:

* Best cybersecurity company in Saudi Arabia
* Best web development company in Egypt

Store:

* Prompt
* Engine
* Date
* Result

━━━━━━━━━━━━━━━━━━━━━━

AI ENGINE INTEGRATION

DO NOT build custom AI models.

Use APIs.

Priority order:

1. Groq API
2. Gemini API

For MVP:

Send prompt
Receive response
Store response

━━━━━━━━━━━━━━━━━━━━━━

VISIBILITY TRACKING

Determine:

* Brand mentioned or not
* Position inside response
* Competitor mentions
* Frequency

Store all results.

━━━━━━━━━━━━━━━━━━━━━━

AI SHARE OF VOICE

Calculate:

Brand mentions
Competitor mentions

Display:

* Charts
* Percentages
* Trends

━━━━━━━━━━━━━━━━━━━━━━

CITATION TRACKING

Extract:

* URLs
* Domains
* Sources

Display:

* Most cited domains
* Competitor citations
* Missing citations

━━━━━━━━━━━━━━━━━━━━━━

SENTIMENT ANALYSIS

Use:

* Gemini
* Groq

Determine:

* Positive
* Neutral
* Negative

Store results.

━━━━━━━━━━━━━━━━━━━━━━

GEO RECOMMENDATION ENGINE

This is one of the most important MVP features.

Generate:

Issues Found
Recommended Actions

Use AI APIs.

No custom ML required.

━━━━━━━━━━━━━━━━━━━━━━

ASK INSIGHT AI

Build a working assistant.

User can ask:

* Why am I not appearing in Gemini?
* How can I outrank competitor X?

Assistant should use:

* Visibility data
* Citation data
* Competitor data

Generate recommendations.

Use:

* Groq
* Gemini fallback

━━━━━━━━━━━━━━━━━━━━━━

REPORTS

Generate PDF reports.

Include:

* Visibility Score
* Share of Voice
* Competitors
* Citations
* Recommendations

Agency mode:

Support logo upload.

Support white-label branding.

━━━━━━━━━━━━━━━━━━━━━━

UI / UX REQUIREMENTS

Keep the existing premium UI.

Do NOT redesign everything.

Instead:

* Fix broken pages
* Fix broken buttons
* Connect actions
* Remove dead UI
* Remove placeholders
* Remove fake interactions

Every visible button must work.

━━━━━━━━━━━━━━━━━━━━━━

DATABASE REVIEW

Review Prisma schema.

Remove unnecessary tables.

Keep only tables needed for MVP.

Generate:

DATABASE_REFACTOR_PLAN.md

Before modifying schema.

━━━━━━━━━━━━━━━━━━━━━━

DELIVERABLES

Before coding:

1. MVP_RESTRUCTURE_PLAN.md
2. DATABASE_REFACTOR_PLAN.md
3. FEATURE_STATUS_AUDIT.md

Then begin implementation.

━━━━━━━━━━━━━━━━━━━━━━

FINAL GOAL

Transform the existing project into:

A clean, realistic, low-cost SaaS MVP that can be:

* Demonstrated to investors
* Tested with early users
* Sold to first customers
* Scaled later

Do not optimize for enterprise scale.

Optimize for:

* simplicity
* maintainability
* low infrastructure cost
* fast launch
* real functionality
