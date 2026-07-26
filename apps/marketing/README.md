# Insight AI Marketing App

This Vite app is retained as a deferred secondary landing experience. The primary MVP product and marketing surface is `apps/web`.

## Status

- Builds successfully as part of the monorepo.
- Uses React, Vite, GSAP, Lenis, Three.js, and Recharts.
- No shadcn/Radix generated UI kit remains after the production hardening pass.

## Commands

```bash
npm run dev -w apps/marketing
npm run build -w apps/marketing
```

## Notes

Do not add new product workflows here without first deciding whether `apps/marketing` should be promoted back into the primary MVP surface. Current dashboard, auth, reports, and investor demo workflows live in `apps/web`.
