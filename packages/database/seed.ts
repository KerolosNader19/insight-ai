import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting demo data seeding...');

  // 1. Create Organization
  const passwordHash = await bcrypt.hash('Password123!', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@insight-ai.io' },
    update: {},
    create: {
      email: 'demo@insight-ai.io',
      passwordHash,
      fullName: 'Demo Executive',
      organizations: {
        create: {
          role: 'OWNER',
          organization: {
            create: {
              name: 'Acme AI Corp',
              billingPlan: 'PRO',
            }
          }
        }
      }
    },
    include: { organizations: { include: { organization: true } } }
  });

  const org = user.organizations[0].organization;
  console.log(`✅ Created Demo User & Org: ${org.name}`);

  // 2. Create AI Engines
  const engines = [
    { name: 'ChatGPT', provider: 'OpenAI', model: 'GPT-4o' },
    { name: 'Perplexity', provider: 'Perplexity', model: 'Sonar' },
    { name: 'Gemini', provider: 'Google', model: 'Pro 1.5' },
  ];

  for (const engine of engines) {
    await prisma.aiEngine.upsert({
      where: { name: engine.name },
      update: {},
      create: engine
    });
  }
  console.log('✅ Created AI Engines');

  // 3. Create Brand & Competitors
  const brand = await prisma.brand.create({
    data: {
      organizationId: org.id,
      name: 'Acme Cloud',
      websiteUrl: 'https://acme-cloud.io',
      industry: 'Cloud Infrastructure',
      competitors: {
        create: [
          { name: 'AWS', websiteUrl: 'https://aws.amazon.com' },
          { name: 'Azure', websiteUrl: 'https://azure.com' },
        ]
      }
    },
    include: { competitors: true }
  });
  console.log('✅ Created Demo Brand & Competitors');

  // 4. Create Seed Analytics History (Mocked)
  const engineList = await prisma.aiEngine.findMany();
  for (const engine of engineList) {
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      await prisma.analyticsSnapshot.create({
        data: {
          brandId: brand.id,
          engineId: engine.id,
          snapshotDate: date,
          geoScore: 65 + Math.random() * 15,
          shareOfVoice: 20 + Math.random() * 10,
          avgSentiment: 0.4 + Math.random() * 0.3,
          mentionCount: 5 + Math.floor(Math.random() * 5),
          citationCount: 3 + Math.floor(Math.random() * 3),
        }
      });
    }
  }
  console.log('✅ Seeded 30 days of analytics history');

  console.log('🚀 Seeding complete! Login with: demo@insight-ai.io / Password123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
