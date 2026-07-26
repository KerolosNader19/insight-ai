# Insight AI – Customer Platform V2 PRD

## Objective

Upgrade the customer-facing platform to investor-demo quality.

Focus on:

* Complete multilingual support
* Subscription differentiation
* Feature gating
* Enterprise customization
* Better GEO workflow
* Better user experience

---

# 1. Full Internationalization (i18n)

Current Issue:

Only page titles and some labels are translated.

Many parts remain English when Arabic is selected.

Examples:

* Prompt names
* Descriptions
* Empty states
* Dashboard cards
* Notifications
* Report labels
* Settings pages
* Modal windows
* Tooltips
* Validation messages
* Success messages
* Error messages

This is unacceptable for production.

---

## Required Fix

Every visible text must support:

* English
* Arabic

No hardcoded strings allowed.

All UI text must come from translation dictionaries.

---

## RTL Support

Arabic mode must include:

* RTL layout
* RTL forms
* RTL tables
* RTL dropdowns
* RTL charts where applicable

Verify every page.

---

# 2. Subscription System Redesign

Current MVP plans are too basic.

We need competitive GEO SaaS pricing.

---

# Free Plan

Price:

$0

Target:

Small businesses

Limits:

* 1 Brand
* 3 Competitors
* 10 Prompts / Month
* 20 AI Runs / Month
* Basic Visibility Tracking
* Basic Dashboard

No:

* Reports
* Recommendations
* Team Members
* White Label

---

# Pro Plan

Price:

$39/month

Target:

Freelancers
Consultants
Small Companies

Includes:

* 3 Brands
* 15 Competitors
* 200 Prompts
* 500 AI Runs
* PDF Reports
* GEO Recommendations
* Citation Tracking
* Sentiment Analysis

Users:

1

Support:

Email Support

---

# Premium Plan

Price:

$79/month

Target:

Growing Companies

Includes:

* 10 Brands
* 50 Competitors
* 1000 Prompts
* 3000 AI Runs
* Advanced Reports
* GEO Recommendations
* Trend Analysis
* Historical Analytics

Users:

5

Support:

Priority Support

---

# Agency Plan

Price:

$149/month

Target:

Marketing Agencies

Includes:

* Unlimited Brands
* Unlimited Competitors
* Unlimited Prompts
* Unlimited AI Runs

Features:

* Multi Client Management
* Team Members
* White Label Reports
* Custom Branding
* Client Workspaces

Users:

20

Support:

Priority Agency Support

---

# Enterprise Plan

Price:

Custom

Target:

Large Companies

No hardcoded limits.

Everything configurable.

Examples:

* Brands
* Competitors
* Users
* Reports
* AI Requests
* GEO Engines

Managed from Super Admin Dashboard.

---

# 3. Enterprise Feature Overrides

Super Admin must be able to override:

Per Organization:

* Brands Limit
* Users Limit
* Competitors Limit
* AI Runs
* Reports
* White Label
* API Access

Enterprise customers receive custom configurations.

---

# 4. GEO Dashboard Improvements

Dashboard should display:

* Visibility Score
* Share of Voice
* Citation Count
* Brand Mentions
* Competitor Mentions
* Sentiment Score
* GEO Trend

No empty widgets.

Use meaningful empty states.

---

# 5. GEO Recommendation Center

Dedicated page.

Explain:

* Why competitors rank higher
* Missing content
* Missing citations
* Missing schema
* Authority gaps

Provide:

Action Plan

Priority Level

Expected Impact

---

# 6. Prompt Center Upgrade

Users can:

Create Prompt

Group Prompts

Tag Prompts

Schedule Prompts

Archive Prompts

Search Prompts

---

# 7. Reports Center Upgrade

Generate:

* PDF Reports
* Executive Reports
* Competitor Reports
* GEO Action Plans

Agency Features:

* White Label Reports
* Custom Logo
* Custom Colors

---

# 8. AI Assistant Upgrade

Ask Insight AI

Examples:

* Why am I not ranking?
* Why is competitor X winning?
* What should I do next month?
* Which GEO opportunities am I missing?

Assistant should use:

* Visibility data
* Competitor data
* Citation data
* GEO recommendations

---

# 9. Notifications Center

Notify users when:

* Visibility increases
* Visibility decreases
* New citations found
* Competitor gains visibility
* Reports generated

Channels:

* In-App
* Email

---

# 10. Billing & Subscription Page

Customer can see:

* Current Plan
* Usage
* Remaining Limits
* Renewal Date

Example:

Brands:
3 / 10

Prompts:
240 / 1000

AI Runs:
1200 / 3000

---

# 11. Usage Monitoring

Customers should see:

* Prompt Usage
* AI Usage
* Report Usage
* Team Usage

Per month.

---

# 12. Customer Success Features

Display:

Health Score

Examples:

Healthy

Needs Attention

At Risk

Show recommendations.

---

# Validation Requirements

Perform a complete audit of:

* Every page
* Every button
* Every modal
* Every form
* Every translation
* Every dashboard widget
* Every subscription restriction

No placeholders.

No untranslated strings.

No dead buttons.

No mock analytics.

All plans must enforce limits correctly.

Enterprise overrides must function correctly.
