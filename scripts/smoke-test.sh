#!/bin/bash

# Insight AI - Production Smoke Test Script
# Validates the reachability and status of all core services.

API_URL=${1:-"http://localhost:4000"}
WEB_URL=${2:-"http://localhost:3000"}
NLP_URL=${3:-"http://localhost:8000"}

echo "🔍 Starting Insight AI Smoke Test..."

# 1. API Health
echo -n "Checking API Health... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/health)
if [ "$STATUS" -eq 200 ]; then echo "✅ OK"; else echo "❌ FAILED ($STATUS)"; fi

# 2. Web Frontend
echo -n "Checking Web Frontend... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $WEB_URL)
if [ "$STATUS" -eq 200 ]; then echo "✅ OK"; else echo "❌ FAILED ($STATUS)"; fi

# 3. NLP AI Service
echo -n "Checking NLP Service... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $NLP_URL/health)
if [ "$STATUS" -eq 200 ]; then echo "✅ OK"; else echo "❌ FAILED ($STATUS)"; fi

# 4. Redis Connectivity (via API diagnostic endpoint)
echo -n "Checking Redis Connectivity... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/tracking/queue-status)
if [ "$STATUS" -eq 200 ]; then echo "✅ OK"; else echo "❌ FAILED ($STATUS)"; fi

echo "🏁 Smoke test complete."
