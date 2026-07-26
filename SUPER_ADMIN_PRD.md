# Insight AI – Super Admin Platform PRD (Phase 2)

## Overview

This document defines the complete Super Admin Platform for Insight AI.

The purpose of this system is to allow the platform owner (Insight AI team) to manage:

* Organizations
* Agencies
* Brands
* Users
* Subscriptions
* Revenue
* Discounts
* Plans
* Reports
* AI Usage
* Feature Flags
* Support
* Platform Analytics

The Super Admin Dashboard is completely separate from customer dashboards.

---

# Goals

The Super Admin Dashboard must allow platform operators to:

* Manage all customers
* Manage all organizations
* Control subscriptions manually
* Track revenue
* Apply discounts
* Manage plans
* Monitor AI costs
* View platform-wide analytics
* Manage support requests
* Control feature access
* Generate business reports

The system should support manual billing during MVP stage before online payments are enabled.

---

# User Role

## SUPER_ADMIN

Highest permission level.

Can:

* View all organizations
* View all brands
* View all users
* Activate subscriptions
* Suspend subscriptions
* Create plans
* Edit plans
* Create coupons
* Manage feature flags
* View revenue
* Access platform analytics
* Login as any customer account
* Manage support tickets
* Generate platform reports

No other role should have access.

---

# Admin Dashboard Structure

## Dashboard Overview

Main metrics:

* Total Organizations
* Total Users
* Total Brands
* Active Subscriptions
* Expired Subscriptions
* Monthly Revenue
* Annual Revenue
* AI Requests Count
* Generated Reports Count
* Total Prompt Runs

Charts:

* Revenue Trend
* New Organizations
* New Users
* AI Requests
* Subscription Growth

---

# Organizations Management

Page:

/admin/organizations

Features:

View all organizations.

Columns:

* Organization Name
* Email
* Plan
* Status
* Brands Count
* Users Count
* Created Date

Actions:

* View
* Edit
* Suspend
* Activate
* Delete
* Login As

---

# Users Management

Page:

/admin/users

Columns:

* Name
* Email
* Organization
* Role
* Status
* Last Login

Actions:

* Edit
* Suspend
* Activate
* Reset Password
* Delete User

---

# Subscription Management

Page:

/admin/subscriptions

For each customer:

* Current Plan
* Start Date
* Expiration Date
* Status

Statuses:

* Active
* Trial
* Pending Payment
* Expired
* Suspended

Actions:

* Activate
* Suspend
* Extend
* Upgrade
* Downgrade

---

# Manual Billing System

MVP Stage Billing:

No Stripe required.

Customers may pay using:

* Instapay
* Vodafone Cash
* Bank Transfer
* Manual Invoice

Admin can manually confirm payments.

Payment Status:

* Pending
* Paid
* Failed
* Refunded

---

# Payment Records

Page:

/admin/payments

Fields:

* Payment ID
* Customer
* Amount
* Currency
* Payment Method
* Date
* Status
* Notes

Admin Actions:

* Mark as Paid
* Mark as Failed
* Refund
* Edit Notes

---

# Plans Management

Page:

/admin/plans

Plans:

Starter

Professional

Agency

Enterprise

Each plan controls:

* Brands Limit
* Users Limit
* Prompts Limit
* AI Requests Limit
* Reports Limit
* White Label Access

Admin can:

* Create Plan
* Edit Plan
* Disable Plan

---

# Custom Limits

Admin can override plan limits per customer.

Example:

Organization:

Orca Agency

Custom Limits:

* Brands: 200
* Users: 50
* Prompts: 50000

Overrides must take priority over plan defaults.

---

# Coupons & Discounts

Page:

/admin/coupons

Coupon Fields:

* Code
* Type
* Value
* Expiration Date
* Usage Limit

Types:

* Percentage
* Fixed Amount

Actions:

* Create
* Disable
* Delete

---

# Trial Management

Admin can create trials.

Trial Types:

* 7 Days
* 14 Days
* 30 Days

Actions:

* Start Trial
* Extend Trial
* End Trial

---

# Revenue Dashboard

Page:

/admin/revenue

Metrics:

* Monthly Revenue
* Annual Revenue
* Active Customers
* Churned Customers
* Average Revenue Per Customer
* Revenue Growth

Charts:

* Monthly Revenue
* Revenue by Plan
* Revenue by Country

---

# AI Usage Monitoring

Page:

/admin/ai-monitoring

Metrics:

* Groq Requests
* Gemini Requests
* Total Tokens
* Failed Requests
* Estimated Cost

Filters:

* By Customer
* By Organization
* By Date Range

---

# Feature Flags

Page:

/admin/features

Features:

* AI Assistant
* Reports
* GEO Recommendations
* Arabic Language
* White Label
* Competitor Tracking
* PDF Reports

Admin can:

* Enable
* Disable

Per Organization.

---

# White Label Management

Page:

/admin/white-label

Settings:

* Logo
* Brand Colors
* Custom Domain
* Report Branding

Per Organization.

---

# Support Center

Page:

/admin/support

Ticket Status:

* Open
* Pending
* Resolved
* Closed

Actions:

* Assign
* Reply
* Close

---

# Audit Logs

Page:

/admin/audit-logs

Track:

* Login Events
* Subscription Changes
* Plan Changes
* User Changes
* Feature Changes
* Revenue Actions

Store:

* Action
* User
* Timestamp
* IP Address

---

# Login As Customer

Critical Feature.

Super Admin can access any organization account.

Flow:

Organization
→ Login As
→ Customer Dashboard

Used for:

* Support
* Debugging
* Demonstrations

---

# Notifications

Admin Notifications:

* New Organization
* Trial Expiring
* Subscription Expiring
* Failed Payment
* New Support Ticket
* AI Usage Limit Reached

---

# Platform Analytics

Page:

/admin/platform

Metrics:

* Organizations Growth
* Users Growth
* Prompt Runs
* AI Requests
* Generated Reports
* GEO Recommendations Generated

---

# Database Tables

Required Tables:

* plans
* subscriptions
* payments
* coupons
* coupon_redemptions
* feature_flags
* support_tickets
* audit_logs
* custom_limits
* organization_settings

---

# API Routes

/admin/dashboard

/admin/organizations

/admin/users

/admin/subscriptions

/admin/payments

/admin/plans

/admin/coupons

/admin/revenue

/admin/features

/admin/support

/admin/platform

/admin/audit-logs

/admin/settings

---

# UI Requirements

Design must match existing Insight AI dashboard.

Requirements:

* Responsive
* Dark Theme
* Arabic Support
* English Support
* RTL Support
* Charts
* Tables
* Filters
* Search
* Pagination

---

# MVP Phase 2 Success Criteria

The system is considered complete when:

* Super Admin can manage all organizations.
* Subscriptions can be activated manually.
* Revenue can be tracked.
* Plans can be managed.
* Discounts can be applied.
* Feature flags work.
* AI usage can be monitored.
* Support tickets can be managed.
* Login As Customer works.
* Full Arabic and English support exists.

This dashboard should become the operational control center for the entire Insight AI platform.
