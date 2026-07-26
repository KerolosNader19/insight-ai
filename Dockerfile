FROM node:22-slim
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/
COPY apps/api/package.json apps/api/
COPY apps/marketing/package.json apps/marketing/
COPY apps/workers/package.json apps/workers/
COPY packages/config/package.json packages/config/
COPY packages/database/package.json packages/database/
COPY packages/shared/package.json packages/shared/
COPY packages/ui/package.json packages/ui/
RUN npm install --include=dev --legacy-peer-deps

COPY . .
RUN npx --no-install prisma generate --schema=packages/database/prisma/schema.prisma
RUN cd apps/web && npx --no-install next build .

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 --home /home/nextjs nextjs
RUN chown -R nextjs:nodejs /app /home/nextjs
USER nextjs
ENV NODE_PATH=/app/node_modules
EXPOSE 3000
CMD cd apps/web && node ../node_modules/next/dist/bin/next start -p ${PORT:-3000}
