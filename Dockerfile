FROM node:22-slim
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=development

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

EXPOSE 3000
CMD rm -rf apps/web/.next && cd apps/web && npm run dev
