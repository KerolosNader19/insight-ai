.PHONY: install build dev lint test docker-up docker-down seed

install:
	npm install

build:
	npm run build

dev:
	npm run dev

lint:
	npm run lint

test:
	npm test

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

seed:
	npx ts-node packages/database/seed.ts

setup: install docker-up
	npx prisma generate --schema=packages/database/prisma/schema.prisma
	npx prisma migrate dev --schema=packages/database/prisma/schema.prisma
	@echo "🚀 Insight AI Setup Complete. Run 'make dev' to start."
