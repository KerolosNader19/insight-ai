# Insight AI – Enterprise Platform Command Center PRD

## Vision

Insight AI is not just a GEO analytics platform.

The long-term vision is to become the operating system for AI Visibility, GEO, AI Search Monitoring, Agency Management, and Revenue Intelligence.

The Super Admin Platform should evolve into a complete command center that allows Insight AI operators to manage:

* Customers
* Agencies
* Organizations
* Revenue
* AI Infrastructure
* GEO Analytics
* Customer Success
* Product Growth
* Investor Metrics

from one centralized dashboard.

---

# Product Goals

The Command Center should answer:

* How much revenue are we generating?
* Which customers are profitable?
* Which customers are at risk?
* What is our AI cost?
* What is our monthly growth?
* Which agencies drive the most value?
* Which industries are growing fastest?
* Which GEO keywords generate the highest visibility?
* Which customers are likely to churn?
* Which customers should be upgraded?

The platform should function similarly to:

* HubSpot
* Salesforce
* Stripe Dashboard
* Semrush
* Ahrefs
* Datadog
* Mixpanel

combined into a single operational layer.

---

# Global Role System

## SUPER_ADMIN

Full platform access.

Can:

* Access all organizations
* Access all brands
* Access all users
* Manage subscriptions
* Manage revenue
* Manage plans
* Manage coupons
* Manage AI providers
* View platform analytics
* Login as any customer
* Manage support
* Configure feature flags

Only platform owners should have this role.

---

# Executive Dashboard

Route:

/admin

Purpose:

Executive overview of company performance.

Metrics:

* Monthly Recurring Revenue (MRR)
* Annual Recurring Revenue (ARR)
* Revenue Growth
* Active Customers
* Trial Customers
* Churn Rate
* Customer Acquisition Rate
* Total Organizations
* Total Brands
* Total Prompt Runs
* Total AI Requests
* Total Reports Generated

Charts:

* Revenue Growth
* Customer Growth
* Organization Growth
* AI Usage Trend
* GEO Usage Trend

---

# Revenue Intelligence Center

Route:

/admin/revenue

Metrics:

* Monthly Revenue
* Annual Revenue
* Revenue Forecast
* Average Revenue Per Account
* Average Revenue Per Agency
* Customer Lifetime Value (LTV)
* Customer Acquisition Cost (CAC)
* Gross Margin

Charts:

* Revenue by Plan
* Revenue by Country
* Revenue by Industry
* Revenue Forecast

---

# Subscription Operations

Route:

/admin/subscriptions

Support:

* Manual Billing
* Instapay
* Vodafone Cash
* Bank Transfer
* Stripe (future)

Subscription Status:

* Trial
* Pending
* Active
* Expired
* Suspended

Admin Actions:

* Activate
* Suspend
* Upgrade
* Downgrade
* Extend
* Cancel

---

# Plans Engine

Route:

/admin/plans

Built-in Plans:

Starter

Professional

Agency

Enterprise

Each Plan Controls:

* Brands Limit
* Competitors Limit
* Team Members
* Prompt Limit
* AI Requests
* Reports
* White Label
* API Access
* Support Priority

Support Custom Plans.

---

# Custom Limits Engine

Admin may override any customer limits.

Example:

Organization:
Orca Agency

Custom Limits:

* Brands = 500
* Users = 100
* Prompts = 100000

Overrides must supersede plan defaults.

---

# Coupon & Promotions System

Route:

/admin/coupons

Features:

* Percentage Discount
* Fixed Discount
* Lifetime Discount
* First Month Discount
* Trial Extension

Support:

* Expiration Date
* Usage Limits
* Organization Restrictions

---

# Customer Health Intelligence

Route:

/admin/customer-health

Every customer receives a Health Score.

Range:

0–100

Factors:

* Login Frequency
* AI Usage
* Prompt Runs
* Report Generation
* Team Activity
* Brand Activity

Risk Categories:

* Healthy
* Attention Needed
* High Risk
* Churn Risk

---

# Churn Prediction Engine

Route:

/admin/churn

Purpose:

Predict customer churn before cancellation.

Signals:

* Usage decline
* Inactive team members
* No report generation
* Low prompt activity
* Subscription expiration

Output:

Probability Score

Examples:

* 15% Risk
* 40% Risk
* 82% Risk

---

# Customer Success Center

Route:

/admin/customer-success

Purpose:

Monitor customer engagement.

Metrics:

* Adoption Rate
* Feature Usage
* Team Usage
* Report Usage
* GEO Activity

Recommendations:

* Upsell
* Retention
* Re-engagement

---

# Organization Financials

Route:

/admin/organization-financials

Per Organization:

Revenue

AI Cost

Profit

Margin

Usage

Example:

Revenue:
$99

AI Cost:
$11

Margin:
88%

---

# AI Cost Intelligence

Route:

/admin/ai-costs

Track:

Groq

Gemini

OpenAI

Claude

DeepSeek

Metrics:

* Requests
* Tokens
* Cost
* Cost Per Organization
* Cost Per User
* Cost Per Prompt

---

# AI Provider Control Center

Route:

/admin/ai-providers

Manage:

* Groq
* Gemini
* Claude
* OpenAI
* DeepSeek

Configuration:

* Primary Provider
* Fallback Provider
* Cost Limits
* Rate Limits

Provider Health:

* Online
* Degraded
* Offline

---

# GEO Market Intelligence

Route:

/admin/market-intelligence

Track:

Most Competitive Industries

Most Tracked Industries

Most Mentioned Brands

Most Competitive GEO Keywords

Top GEO Categories

Examples:

* Cybersecurity
* AI
* SaaS
* FinTech
* Web Development

---

# Platform Analytics

Route:

/admin/platform

Metrics:

* Organizations
* Users
* Brands
* Reports
* GEO Recommendations
* AI Requests

Charts:

* Daily Activity
* Monthly Activity
* Growth Trends

---

# Internal CRM

Route:

/admin/crm

Lead Stages:

* Lead
* Contacted
* Demo Scheduled
* Trial
* Negotiation
* Paid
* Lost

Fields:

* Name
* Company
* Country
* Email
* Phone
* Notes

---

# Sales Pipeline

Route:

/admin/sales

Metrics:

* Total Leads
* Qualified Leads
* Active Deals
* Closed Deals
* Lost Deals

Forecast:

Expected Revenue

---

# Investor Dashboard

Route:

/admin/investors

Metrics:

* MRR
* ARR
* Growth
* Churn
* Retention
* Revenue
* Customer Count

Generate:

Investor Reports

Investor PDFs

Board Reports

---

# White Label Command Center

Route:

/admin/white-label

Manage:

* Custom Domains
* Logos
* Branding
* Agency Themes
* Agency Reports

---

# Feature Flag System

Route:

/admin/features

Features:

* AI Assistant
* GEO Recommendations
* PDF Reports
* Arabic
* White Label
* API Access

Enable per:

* Organization
* Plan
* Country

---

# Support Operations

Route:

/admin/support

Ticket States:

* Open
* Pending
* Resolved
* Closed

Support Features:

* Assign Agent
* Internal Notes
* Escalation

---

# Audit Logs

Route:

/admin/audit

Track:

* Logins
* Subscription Changes
* Revenue Changes
* Plan Changes
* User Actions
* Support Actions
* Admin Actions

Store:

* User
* Action
* IP
* Timestamp

---

# Login As Customer

Critical Feature

Flow:

Organization
→ Login As
→ Customer Dashboard

Used For:

* Support
* QA
* Demonstrations

---

# Abuse Detection

Route:

/admin/security

Detect:

* Prompt Spam
* AI Abuse
* Token Abuse
* Excessive Reports
* Automated Usage

---

# Ask Insight Admin AI

Route:

/admin/assistant

Internal AI Assistant.

Questions:

"Which customers are at risk?"

"Show highest revenue agencies."

"Which organizations consume the most AI?"

"Which plans should be optimized?"

The assistant must analyze platform data directly.

---

# Database Additions

Required Tables:

* plans
* subscriptions
* payments
* coupons
* coupon_redemptions
* feature_flags
* support_tickets
* audit_logs
* customer_health
* churn_predictions
* crm_leads
* sales_pipeline
* ai_usage_costs
* organization_financials
* investor_reports

---

# Technical Requirements

Frontend:

* Next.js

Backend:

* NestJS

Database:

* PostgreSQL

ORM:

* Prisma

Cache:

* Redis

Jobs:

* BullMQ

Charts:

* Recharts

Auth:

* JWT + RBAC

AI:

* Groq
* Gemini

---

# Success Criteria

The Command Center is complete when:

* Platform revenue is fully visible.
* Manual billing is operational.
* Customer health is measurable.
* AI costs are measurable.
* Churn prediction exists.
* CRM exists.
* Investor reporting exists.
* Support operations exist.
* White Label management exists.
* Platform-wide analytics exist.
* Super Admin can operate the entire company from a single dashboard.

This dashboard should become the operational brain of Insight AI.
