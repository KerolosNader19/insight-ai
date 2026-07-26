import { Worker, Job } from 'bullmq';
import { chromium, BrowserContext, Page } from 'playwright';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const REDIS_CONNECTION = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

/**
 * Main Tracking Worker
 * Responsible for browser automation and raw response capture.
 */
const trackingWorker = new Worker(
  'prompt-execution',
  async (job: Job) => {
    const { promptId, engineName, brandName, competitors } = job.data;
    
    const prompt = await prisma.prompt.findUnique({ where: { id: promptId } });
    if (!prompt) throw new Error(`Prompt ${promptId} not found`);

    console.log(`[Worker] Executing prompt: "${prompt.queryText}" on ${engineName}`);

    const browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-blink-features=AutomationControlled'] // Basic stealth
    });
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    const page = await context.newPage();

    try {
      // 1. Navigate and Execute
      const startTime = Date.now();
      const rawContent = await executeEngineLogic(page, engineName, prompt.queryText);
      const endTime = Date.now();

      // 2. Capture Screenshots
      const screenshotBuffer = await page.screenshot({ fullPage: true });
      // Deferred infrastructure: upload to S3/GCS before enabling screenshot reports.
      const screenshotUrl = `https://storage.insight-ai.io/screenshots/${job.id}.png`;

      // 3. Store Raw Response
      const engine = await prisma.aiEngine.findFirst({ where: { name: engineName } });
      if (!engine) throw new Error(`Engine ${engineName} not found in DB`);

      const response = await prisma.aiResponse.create({
        data: {
          promptId,
          engineId: engine.id,
          rawContent,
          screenshotUrl,
          performance_ms: endTime - startTime,
        }
      });

      // 4. Trigger NLP Analysis via Queue (or direct call for MVP)
      console.log(`[Worker] Triggering analysis for response ${response.id}`);
      const analysis = await analyzeWithAIService(rawContent, brandName, competitors);

      // 5. Store Analysis Results
      await storeAnalysisResults(response.id, analysis, prompt.brandId, engine.id);

      return { responseId: response.id, status: 'success' };
    } catch (error) {
      console.error(`[Worker] Job ${job.id} failed:`, error);
      await prisma.job.update({
        where: { id: job.id as string },
        data: { status: 'FAILED', error: (error as any).message }
      });
      throw error;
    } finally {
      await browser.close();
    }
  },
  { 
    connection: REDIS_CONNECTION,
    concurrency: 5 // Limit parallel browsers
  }
);

/**
 * Engine-specific automation logic
 */
async function executeEngineLogic(page: Page, engine: string, query: string): Promise<string> {
  switch (engine.toLowerCase()) {
    case 'perplexity':
      await page.goto('https://www.perplexity.ai');
      await page.fill('textarea[placeholder*="Ask"]', query);
      await page.keyboard.press('Enter');
      await page.waitForSelector('.prose', { timeout: 30000 });
      return await page.textContent('.prose') || '';

    case 'chatgpt':
      await page.goto('https://chat.openai.com');
      // Note: Requires auth in production. This is a simplified structural example.
      await page.fill('#prompt-textarea', query);
      await page.keyboard.press('Enter');
      await page.waitForSelector('.markdown', { timeout: 30000 });
      return await page.textContent('.markdown') || '';

    case 'gemini':
      await page.goto('https://gemini.google.com');
      await page.fill('div[contenteditable="true"]', query);
      await page.keyboard.press('Enter');
      await page.waitForSelector('.message-content', { timeout: 30000 });
      return await page.textContent('.message-content') || '';

    default:
      throw new Error(`Engine ${engine} not supported`);
  }
}

async function analyzeWithAIService(content: string, brand: string, competitors: string[]) {
  const res = await axios.post(`${AI_SERVICE_URL}/analyze`, {
    content,
    brand_name: brand,
    competitors
  });
  return res.data;
}

async function storeAnalysisResults(responseId: string, analysis: any, brandId: string, engineId: string) {
  // 1. Create Mentions
  for (const m of analysis.mentions) {
    await prisma.mention.create({
      data: {
        responseId,
        entityId: m.entity, // For MVP, using string. In prod, link to Brand/Competitor IDs
        entityType: m.type,
        sentimentScore: m.sentiment,
        position: m.position,
        contextSnippet: m.context
      }
    });
  }

  // 2. Create Citations
  for (const c of analysis.citations) {
    await prisma.citation.create({
      data: {
        responseId,
        url: c.url,
        title: c.title,
        domain: c.domain,
        authorityScore: c.authority
      }
    });
  }

  // 3. Create/Update Analytics Snapshot
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const snapshot = await prisma.analyticsSnapshot.upsert({
    where: {
      brandId_engineId_snapshotDate: {
        brandId,
        engineId,
        snapshotDate: today
      }
    },
    update: {
      geoScore: analysis.geo_score,
      avgSentiment: analysis.overall_sentiment,
      mentionCount: { increment: analysis.mentions.length },
      citationCount: { increment: analysis.citations.length }
    },
    create: {
      brandId,
      engineId,
      snapshotDate: today,
      geoScore: analysis.geo_score,
      avgSentiment: analysis.overall_sentiment,
      mentionCount: analysis.mentions.length,
      citationCount: analysis.citations.length
    }
  });

  // 4. Store Recommendations
  for (const r of analysis.recommendations) {
    await prisma.recommendation.create({
      data: {
        snapshotId: snapshot.id,
        type: r.type,
        priority: r.priority,
        title: r.title,
        content: r.content
      }
    });
  }
}

console.log('🚀 Phase 4 Tracking Worker active');

// Graceful Shutdown
process.on('SIGTERM', async () => {
  console.log('Worker shutting down...');
  await trackingWorker.close();
  await prisma.$disconnect();
  process.exit(0);
});

export { trackingWorker };
