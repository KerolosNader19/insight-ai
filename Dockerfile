FROM node:22-slim
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN corepack enable
ENV NEXT_PUBLIC_API_URL=/api

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
RUN cd apps/api && npm run build
RUN cd apps/web && npm run build

RUN mkdir -p /home/nextjs && echo '{"scripts":{"start":"cd /app/packages/database && npx --no-install prisma migrate deploy && cd /app/apps/api && npm run start:prod & cd /app/apps/web && npm run start"}}' > /home/nextjs/package.json
EXPOSE 3000
CMD cd packages/database && npx --no-install prisma migrate deploy && cd apps/api && npm run start:prod & cd apps/web && npm run start
