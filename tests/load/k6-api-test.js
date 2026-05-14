import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users
    { duration: '1m', target: 20 },  // Stay at 20 users
    { duration: '30s', target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must be under 500ms
  },
};

export default function () {
  const BASE_URL = __ENV.API_URL || 'http://localhost:4000';
  
  // 1. Health Check
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, { 'status is 200': (r) => r.status === 200 });

  // 2. Fetch Analytics (Simulate Dashboard Load)
  const analyticsRes = http.get(`${BASE_URL}/analytics/geo-score?brandId=test-id&range=30d`, {
    headers: { Authorization: `Bearer ${__ENV.AUTH_TOKEN}` },
  });
  check(analyticsRes, { 'analytics status is 200': (r) => r.status === 200 });

  sleep(1);
}
